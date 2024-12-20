using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class tableReanem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskItems_Hidtas_HidtaId",
                table: "TaskItems");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskItems_Projects_ProjectId",
                table: "TaskItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskItems",
                table: "TaskItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Projects",
                table: "Projects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Hidtas",
                table: "Hidtas");

            migrationBuilder.RenameTable(
                name: "TaskItems",
                newName: "tblTaskItem");

            migrationBuilder.RenameTable(
                name: "Projects",
                newName: "tblProject");

            migrationBuilder.RenameTable(
                name: "Hidtas",
                newName: "tblHidta");

            migrationBuilder.RenameIndex(
                name: "IX_TaskItems_ProjectId",
                table: "tblTaskItem",
                newName: "IX_tblTaskItem_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_TaskItems_HidtaId",
                table: "tblTaskItem",
                newName: "IX_tblTaskItem_HidtaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblTaskItem",
                table: "tblTaskItem",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblProject",
                table: "tblProject",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblHidta",
                table: "tblHidta",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblTaskItem_tblHidta_HidtaId",
                table: "tblTaskItem",
                column: "HidtaId",
                principalTable: "tblHidta",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tblTaskItem_tblProject_ProjectId",
                table: "tblTaskItem",
                column: "ProjectId",
                principalTable: "tblProject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblTaskItem_tblHidta_HidtaId",
                table: "tblTaskItem");

            migrationBuilder.DropForeignKey(
                name: "FK_tblTaskItem_tblProject_ProjectId",
                table: "tblTaskItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblTaskItem",
                table: "tblTaskItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblProject",
                table: "tblProject");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblHidta",
                table: "tblHidta");

            migrationBuilder.RenameTable(
                name: "tblTaskItem",
                newName: "TaskItems");

            migrationBuilder.RenameTable(
                name: "tblProject",
                newName: "Projects");

            migrationBuilder.RenameTable(
                name: "tblHidta",
                newName: "Hidtas");

            migrationBuilder.RenameIndex(
                name: "IX_tblTaskItem_ProjectId",
                table: "TaskItems",
                newName: "IX_TaskItems_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_tblTaskItem_HidtaId",
                table: "TaskItems",
                newName: "IX_TaskItems_HidtaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskItems",
                table: "TaskItems",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Projects",
                table: "Projects",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Hidtas",
                table: "Hidtas",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskItems_Hidtas_HidtaId",
                table: "TaskItems",
                column: "HidtaId",
                principalTable: "Hidtas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskItems_Projects_ProjectId",
                table: "TaskItems",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
