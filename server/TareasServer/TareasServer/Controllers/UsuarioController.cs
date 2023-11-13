using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TareasServer.Models;
using TareasServer.Services;

namespace TareasServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        private readonly Respuesta _respuesta;
        public UsuarioController(IUsuarioService userService)
        {
            _usuarioService = userService;
            _respuesta = new Respuesta();
        }
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody] UsuarioLogin loginUsuario)
        {
            if (!ModelState.IsValid)
            {
                var res = _respuesta.GenerarRespuesta(400, "Error en la solicitud", ModelState);
                return BadRequest(res);
            }
            var message = await _usuarioService.LoginUsuario(loginUsuario);
            if (!message.Permiso)
            {
                var res1 = _respuesta.GenerarRespuesta(400, "Error en la solicitud", message);
                return BadRequest(res1);
            }
            return Ok(_respuesta.GenerarRespuesta(200, "solicitud exitosa", message));
        }
        [HttpPost]
        [Route("Crear")]
        public async Task<ActionResult> AgregarUsuario([FromBody] UsuarioCrear nuevoUsuario)
        {
            if (!ModelState.IsValid)
            {
                var res1 = _respuesta.GenerarRespuesta(400, "Error en la solicitud", ModelState);
                return BadRequest(res1);
            }
            var ver = await _usuarioService.VerUsuario(nuevoUsuario.Name);
            if (ver != null)
            {
                var res2 = _respuesta.GenerarRespuesta(400, "Usuario o contraseña incorrectos", null);
                return BadRequest(res2);
            }
            var nuevo = await _usuarioService.CreateUser(nuevoUsuario);
            var res3 = _respuesta.GenerarRespuesta(201, "Usuario agregado con exito", nuevo);
            return Ok(res3);
        }
    }
}
