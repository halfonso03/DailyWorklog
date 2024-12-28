using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class initialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblHidta",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblHidta", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tblProject",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblProject", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tblRequestor",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    first_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    last_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblRequestor", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tblTaskItem",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    task_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    hidta_id = table.Column<int>(type: "int", nullable: false),
                    project_id = table.Column<int>(type: "int", nullable: false),
                    requestor_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblTaskItem", x => x.id);
                    table.ForeignKey(
                        name: "FK_tblTaskItem_tblHidta_hidta_id",
                        column: x => x.hidta_id,
                        principalTable: "tblHidta",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblTaskItem_tblProject_project_id",
                        column: x => x.project_id,
                        principalTable: "tblProject",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblTaskItem_tblRequestor_requestor_id",
                        column: x => x.requestor_id,
                        principalTable: "tblRequestor",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblTaskItem_hidta_id",
                table: "tblTaskItem",
                column: "hidta_id");

            migrationBuilder.CreateIndex(
                name: "IX_tblTaskItem_project_id",
                table: "tblTaskItem",
                column: "project_id");

            migrationBuilder.CreateIndex(
                name: "IX_tblTaskItem_requestor_id",
                table: "tblTaskItem",
                column: "requestor_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblTaskItem");

            migrationBuilder.DropTable(
                name: "tblHidta");

            migrationBuilder.DropTable(
                name: "tblProject");

            migrationBuilder.DropTable(
                name: "tblRequestor");
        }
    }
}
