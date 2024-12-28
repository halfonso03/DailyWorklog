using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class requestorHidta : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HidtaId",
                table: "tblRequestor",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_tblRequestor_HidtaId",
                table: "tblRequestor",
                column: "HidtaId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblRequestor_tblHidta_HidtaId",
                table: "tblRequestor",
                column: "HidtaId",
                principalTable: "tblHidta",
                principalColumn: "id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblRequestor_tblHidta_HidtaId",
                table: "tblRequestor");

            migrationBuilder.DropIndex(
                name: "IX_tblRequestor_HidtaId",
                table: "tblRequestor");

            migrationBuilder.DropColumn(
                name: "HidtaId",
                table: "tblRequestor");
        }
    }
}
