using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TareasServer.Migrations
{
    /// <inheritdoc />
    public partial class creartablas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "usuario",
                columns: table => new
                {
                    Id_usuario = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Rol = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuario", x => x.Id_usuario);
                });

            migrationBuilder.CreateTable(
                name: "tarea",
                columns: table => new
                {
                    Id_tarea = table.Column<Guid>(type: "uuid", nullable: false),
                    Id_usuario = table.Column<Guid>(type: "uuid", nullable: false),
                    TareaTitle = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    TareaDescription = table.Column<string>(type: "character varying(900)", maxLength: 900, nullable: false),
                    Creada = table.Column<DateTime>(type: "timestamp without time zone", nullable: false, defaultValue: new DateTime(2023, 11, 13, 14, 37, 26, 165, DateTimeKind.Local).AddTicks(6564)),
                    Estado = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tarea", x => x.Id_tarea);
                    table.ForeignKey(
                        name: "FK_tarea_usuario_Id_usuario",
                        column: x => x.Id_usuario,
                        principalTable: "usuario",
                        principalColumn: "Id_usuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tarea_Id_usuario",
                table: "tarea",
                column: "Id_usuario");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tarea");

            migrationBuilder.DropTable(
                name: "usuario");
        }
    }
}
