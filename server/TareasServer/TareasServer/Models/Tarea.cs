using System.Text.Json.Serialization;

namespace TareasServer.Models
{
    public class Tarea
    {
        public Guid Id_tarea { get; set; }
        public Guid Id_usuario { get; set; }
        public string TareaTitle { get; set; }
        public string TareaDescription { get; set; }
        public DateTime Creada { get; set; }
        public bool Estado { get; set; }
        [JsonIgnore]
        public virtual Usuario Usuario { get; set; }
    }
    public class TareaCrear
    {
        public string TareaTitle { get; set; }
        public string TareaDescription { get; set; }
    }
    public class TareaEditar
    {
        public string TareaTitle { get; set; }
        public string TareaDescription { get; set; }
        public bool Estado { get; set; }
    }
    public class TareaMostrar
    {
        public Guid Id_tarea { get; set; }
        public string TareaTitle { get; set; }
        public string TareaDescription { get; set; }
        public DateTime Creada { get; set; }
        public bool Estado { get; set; }
    }
}
