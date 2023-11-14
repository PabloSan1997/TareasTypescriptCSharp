using Microsoft.EntityFrameworkCore;
using TareasServer.Models;

namespace TareasServer
{
    public class TareasContext : DbContext
    {
        public DbSet<Usuario> usuarios { get; set; }
        public DbSet<Tarea> tareas { get; set; }
        public TareasContext(DbContextOptions<TareasContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>(u =>
            {
                u.ToTable("usuario");
                u.HasKey(p => p.Id_usuario);
                u.Property(p => p.Password).IsRequired();
                u.Property(p => p.Rol).IsRequired().HasMaxLength(100);
                u.Property(p => p.Name).IsRequired().HasMaxLength(100);
            });
            modelBuilder.Entity<Tarea>(t =>
            {
                t.ToTable("tarea");
                t.HasKey(p => p.Id_tarea);
                t.Property(p => p.Estado).HasDefaultValue(false);
                t.Property(p => p.TareaTitle).IsRequired().HasMaxLength(100);
                t.Property(p => p.TareaDescription).IsRequired().HasMaxLength(1000);
                t.Property(p => p.Creada).IsRequired();
                t.HasOne(p => p.Usuario).WithMany(p => p.Tareas).HasForeignKey(p => p.Id_usuario);
            });
        }
    }
}
