namespace TareasServer.Models
{
    public class Respuesta
    {
        public int StatusCode { get; set; }
        public string StatusMessage { get; set; }
        public object Results { get; set; }
        public Respuesta GenerarRespuesta(int statusCode, string statusMessage, object results)
        {
            return new Respuesta()
            {
                StatusCode = statusCode,
                StatusMessage = statusMessage,
                Results = results
            };
        }
    }
}
