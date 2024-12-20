using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class columnRename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblTaskItem_tblHidta_HidtaId",
                table: "tblTaskItem");

            migrationBuilder.DropForeignKey(
                name: "FK_tblTaskItem_tblProject_ProjectId",
                table: "tblTaskItem");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "tblTaskItem",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "tblTaskItem",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "RequestorId",
                table: "tblTaskItem",
                newName: "requestor_id");

            migrationBuilder.RenameColumn(
                name: "ProjectId",
                table: "tblTaskItem",
                newName: "project_id");

            migrationBuilder.RenameColumn(
                name: "HidtaId",
                table: "tblTaskItem",
                newName: "hidta_id");

            migrationBuilder.RenameIndex(
                name: "IX_tblTaskItem_ProjectId",
                table: "tblTaskItem",
                newName: "IX_tblTaskItem_project_id");

            migrationBuilder.RenameIndex(
                name: "IX_tblTaskItem_HidtaId",
                table: "tblTaskItem",
                newName: "IX_tblTaskItem_hidta_id");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "tblProject",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "tblProject",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "tblHidta",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "tblHidta",
                newName: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblTaskItem_tblHidta_hidta_id",
                table: "tblTaskItem",
                column: "hidta_id",
                principalTable: "tblHidta",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tblTaskItem_tblProject_project_id",
                table: "tblTaskItem",
                column: "project_id",
                principalTable: "tblProject",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblTaskItem_tblHidta_hidta_id",
                table: "tblTaskItem");

            migrationBuilder.DropForeignKey(
                name: "FK_tblTaskItem_tblProject_project_id",
                table: "tblTaskItem");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "tblTaskItem",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "tblTaskItem",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "requestor_id",
                table: "tblTaskItem",
                newName: "RequestorId");

            migrationBuilder.RenameColumn(
                name: "project_id",
                table: "tblTaskItem",
                newName: "ProjectId");

            migrationBuilder.RenameColumn(
                name: "hidta_id",
                table: "tblTaskItem",
                newName: "HidtaId");

            migrationBuilder.RenameIndex(
                name: "IX_tblTaskItem_project_id",
                table: "tblTaskItem",
                newName: "IX_tblTaskItem_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_tblTaskItem_hidta_id",
                table: "tblTaskItem",
                newName: "IX_tblTaskItem_HidtaId");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "tblProject",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "tblProject",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "tblHidta",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "tblHidta",
                newName: "Id");

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
    }
}
