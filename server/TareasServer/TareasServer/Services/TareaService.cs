using Microsoft.EntityFrameworkCore;
using TareasServer.Models;

namespace TareasServer.Services
{
    public class TareaService : ITareaService
    {
        private readonly TareasContext _context;
        public TareaService(TareasContext context)
        {
            _context = context;
        }
        public async Task<UsuarioTareasMostrar> LeerTareas(Guid id_usuario)
        {
            var usuario = await _context.usuarios.Include(p => p.Tareas).FirstOrDefaultAsync(p => p.Id_usuario == id_usuario);
            var tareasMostrar = usuario.Tareas.Select(t=>ConvertirTarea(t)).ToList();
            var mostrar = new UsuarioTareasMostrar()
            {
                Name=usuario.Name,
                Tareas=tareasMostrar
            };
            return mostrar;
        }
        public async Task<TareaMostrar> AgregarTarea(Guid id_usuario, TareaCrear nuevaTarea)
        {
            var tarea = new Tarea()
            {
                TareaTitle = nuevaTarea.TareaTitle,
                TareaDescription = nuevaTarea.TareaDescription,
                Id_usuario = id_usuario
            };
            await _context.tareas.AddAsync(tarea);
            await _context.SaveChangesAsync();
            var mostrar = ConvertirTarea(tarea);
            return mostrar;
        }
        public async Task EliminarTarea(Guid id_usuario, Guid id_tarea)
        {
            var user = await _context.usuarios.Include(p => p.Tareas).AsNoTracking().FirstOrDefaultAsync(p => p.Id_usuario == id_usuario);
            if (user != null)
            {
                var tarea = user.Tareas.FirstOrDefault(p => p.Id_tarea == id_tarea);
                if (tarea != null)
                {
                    _context.tareas.Remove(tarea);
                    await _context.SaveChangesAsync();
                }
            }
        }
        public async Task<TareaMostrar> EditarTarea(Guid id_usuario, Guid id_tarea, TareaEditar tareaEditar)
        {
            var user = await _context.usuarios.Include(p => p.Tareas).AsNoTracking().FirstOrDefaultAsync(p => p.Id_usuario == id_usuario);
            if (user != null)
            {
                var tarea = user.Tareas.FirstOrDefault(p => p.Id_tarea == id_tarea);
                if (tarea != null)
                {
                    tarea.TareaTitle = tareaEditar.TareaTitle;
                    tarea.Estado = tareaEditar.Estado;
                    tarea.TareaDescription = tareaEditar.TareaDescription;
                    _context.tareas.Update(tarea);
                    await _context.SaveChangesAsync();
                    var mostrar = ConvertirTarea(tarea);
                    return mostrar;
                }
                return null;
            }
            return null;
        }
        private TareaMostrar ConvertirTarea(Tarea tarea)
        {
            var tareaMostrar = new TareaMostrar()
            {
                Id_tarea = tarea.Id_tarea,
                TareaDescription = tarea.TareaDescription,
                TareaTitle = tarea.TareaTitle,
                Creada = tarea.Creada,
                Estado = tarea.Estado
            };
            return tareaMostrar;
        }
    }
    public interface ITareaService
    {
        Task<UsuarioTareasMostrar> LeerTareas(Guid id_usuario);
        Task<TareaMostrar> AgregarTarea(Guid id_usuario, TareaCrear nuevaTarea);
        Task EliminarTarea(Guid id_usuario, Guid id_tarea);
        Task<TareaMostrar> EditarTarea(Guid id_usuario, Guid id_tarea, TareaEditar tareaEditar);

    }

}
