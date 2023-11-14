using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TareasServer.Migrations
{
    /// <inheritdoc />
    public partial class cambiarlongitudtiempo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TareaDescription",
                table: "tarea",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(900)",
                oldMaxLength: 900);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Creada",
                table: "tarea",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldDefaultValue: new DateTime(2023, 11, 13, 14, 37, 26, 165, DateTimeKind.Local).AddTicks(6564));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TareaDescription",
                table: "tarea",
                type: "character varying(900)",
                maxLength: 900,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(1000)",
                oldMaxLength: 1000);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Creada",
                table: "tarea",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(2023, 11, 13, 14, 37, 26, 165, DateTimeKind.Local).AddTicks(6564),
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");
        }
    }
}
