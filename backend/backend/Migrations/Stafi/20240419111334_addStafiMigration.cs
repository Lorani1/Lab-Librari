using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations.Stafi
{
    /// <inheritdoc />
    public partial class addStafiMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "stafis",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    emri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    mbiemri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    nrPersonal = table.Column<long>(type: "bigint", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    adresa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    orari = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    nrTelefonit = table.Column<long>(type: "bigint", nullable: true),
                    gjinia = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_stafis", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "stafis");
        }
    }
}
