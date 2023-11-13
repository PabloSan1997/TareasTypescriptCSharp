﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TareasServer.Models;
using TareasServer.Services;

namespace TareasServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareasController : ControllerBase
    {
        private readonly ITareaService _tarea;
        private readonly Respuesta _respuesta;
        public TareasController(ITareaService tarea)
        {
            _tarea = tarea;
            _respuesta = new Respuesta();
        }
        [HttpGet]
        [Authorize]
        public async Task<ActionResult> LeerTareas()
        {
            var name = User.Identity.Name;
            var id_usuario = Guid.Parse(name);
            var tareas = await _tarea.LeerTareas(id_usuario);
            if (tareas == null)
            {
                return NotFound(_respuesta.GenerarRespuesta(404, "No se encontraron elementos", null));
            }
            

            return Ok(_respuesta.GenerarRespuesta(200, "elementos", tareas));
        }
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> AgregarTarea([FromBody] TareaCrear nuevaTarea)
        {
            var id_usuario = Guid.Parse(User.Identity.Name);
            if (!ModelState.IsValid) return BadRequest(_respuesta.GenerarRespuesta(400, "Solicitud invalida", null));
            var nueva = await _tarea.AgregarTarea(id_usuario, nuevaTarea);
            return Ok(_respuesta.GenerarRespuesta(201, "Se agrego nueva tarea", nueva));

        }
        [HttpDelete]
        [Authorize(Roles = "admin")]
        [Route("{id_tarea}")]
        public async Task<ActionResult> EliminarTarea(Guid id_tarea)
        {
            var id_usuario = Guid.Parse(User.Identity.Name);
            await _tarea.EliminarTarea(id_usuario, id_tarea);
            return NoContent();
        }
        [HttpPut]
        [Authorize(Roles = "admin")]
        [Route("{id_tarea}")]
        public async Task<ActionResult> EditarTarea(Guid id_tarea, [FromBody] TareaEditar tareaEditar)
        {
            if (!ModelState.IsValid) return BadRequest(_respuesta.GenerarRespuesta(400, "Solicitud invalida", null));
            var id_usuario = Guid.Parse(User.Identity.Name);
            var tarea = await _tarea.EditarTarea(id_usuario, id_tarea, tareaEditar);
            if (tarea == null) return BadRequest(_respuesta.GenerarRespuesta(400, "Solicitud invalida", null));
            return Ok(_respuesta.GenerarRespuesta(200, "Elemento editado", tarea));
        }
    }
}
