using Microsoft.EntityFrameworkCore;
using TareasServer.Models;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace TareasServer.Services
{
    public class UsuarioService: IUsuarioService
    {
        private readonly TareasContext _context;
        private string secretKey;
        public UsuarioService(TareasContext ct, IConfiguration configuration)
        {
            _context = ct;
            secretKey = configuration.GetValue<string>("ApiSettings:secret");
        }
        public async Task<Usuario> VerUsuario(string name)
        {
           var data = await _context.usuarios.FirstOrDefaultAsync(p=>p.Name==name);
            return data;
        }
        public async Task<Usuario> CreateUser(UsuarioCrear nuevoUsuario)
        {
            var password = BCrypt.Net.BCrypt.EnhancedHashPassword(nuevoUsuario.Password, 8);
            var verUsuario = new Usuario()
            {
                Name = nuevoUsuario.Name,
                Password = password,
                Rol = nuevoUsuario.Rol
            };
            await _context.usuarios.AddAsync(verUsuario);
            await _context.SaveChangesAsync();
            return verUsuario;
        }
        public async Task<UsuarioLoginResponse> LoginUsuario(UsuarioLogin logUsario) 
        {
            var buscar = await _context.usuarios.FirstOrDefaultAsync(p=>p.Name==logUsario.Name);
            if (buscar == null) return new UsuarioLoginResponse() 
            { 
                Token="",
                Message="Usuario o contraseña incorrecto",
                Permiso=false
            };
            bool checar = BCrypt.Net.BCrypt.EnhancedVerify(logUsario.Password, buscar.Password);
            if (!checar) return new UsuarioLoginResponse()
            {
                Token = "",
                Message = "Usuario o contraseña incorrecto",
                Permiso = false
            };
            var tokenHeandle = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);
            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, buscar.Id_usuario.ToString()),
                    new Claim(ClaimTypes.Role, buscar.Rol)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHeandle.CreateToken(tokenDescription);
            return new UsuarioLoginResponse()
            {
                Token = tokenHeandle.WriteToken(token),
                Message = "",
                Permiso = true
            };
        }
    }
    public interface IUsuarioService
    {
        Task<Usuario> CreateUser(UsuarioCrear nuevoUsuario);
        Task<UsuarioLoginResponse> LoginUsuario(UsuarioLogin logUsario);
        Task<Usuario> VerUsuario(string name);
    }
}
