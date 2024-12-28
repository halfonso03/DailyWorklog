using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class requestorHidta2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblRequestor_tblHidta_HidtaId",
                table: "tblRequestor");

            migrationBuilder.RenameColumn(
                name: "HidtaId",
                table: "tblRequestor",
                newName: "hidtaId");

            migrationBuilder.RenameIndex(
                name: "IX_tblRequestor_HidtaId",
                table: "tblRequestor",
                newName: "IX_tblRequestor_hidtaId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblRequestor_tblHidta_hidtaId",
                table: "tblRequestor",
                column: "hidtaId",
                principalTable: "tblHidta",
                principalColumn: "id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblRequestor_tblHidta_hidtaId",
                table: "tblRequestor");

            migrationBuilder.RenameColumn(
                name: "hidtaId",
                table: "tblRequestor",
                newName: "HidtaId");

            migrationBuilder.RenameIndex(
                name: "IX_tblRequestor_hidtaId",
                table: "tblRequestor",
                newName: "IX_tblRequestor_HidtaId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblRequestor_tblHidta_HidtaId",
                table: "tblRequestor",
                column: "HidtaId",
                principalTable: "tblHidta",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
