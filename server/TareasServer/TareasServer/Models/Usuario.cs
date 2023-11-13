namespace TareasServer.Models
{
    public class Usuario
    {
        public Guid Id_usuario { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Rol { get; set; }
        public virtual ICollection<Tarea> Tareas { get; set; }
    }
    public class UsuarioTareas
    {
        public string Name { get; set; }
        public virtual ICollection<Tarea> Tareas { get; set; }

    }
    public class UsuarioTareasMostrar
    {
        public string Name { get; set; }
        public virtual ICollection<TareaMostrar> Tareas { get; set; }

    }
    public class UsuarioCrear
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string Rol { get; set; }
    }
    public class UsuarioLogin
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }
    public class UsuarioLoginResponse
    {
        public string Token { get; set; }
        public bool Permiso { get; set; }
        public string Message { get; set; }
    }
}
