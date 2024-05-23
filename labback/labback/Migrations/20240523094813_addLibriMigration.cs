using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace labback.Migrations
{
    /// <inheritdoc />
    public partial class addLibriMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ShtepiteBotuese",
                columns: table => new
                {
                    ShtepiaBotueseID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShtepiteBotuese", x => x.ShtepiaBotueseID);
                });

            migrationBuilder.CreateTable(
                name: "Librat",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Isbn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Titulli = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kategoria = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lloji = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VitiPublikimit = table.Column<int>(type: "int", nullable: false),
                    NrFaqeve = table.Column<int>(type: "int", nullable: false),
                    NrKopjeve = table.Column<int>(type: "int", nullable: false),
                    Gjuha = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InStock = table.Column<int>(type: "int", nullable: false),
                    ProfilePicturePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShtepiaBotueseID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Librat", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Librat_ShtepiteBotuese_ShtepiaBotueseID",
                        column: x => x.ShtepiaBotueseID,
                        principalTable: "ShtepiteBotuese",
                        principalColumn: "ShtepiaBotueseID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Librat_ShtepiaBotueseID",
                table: "Librat",
                column: "ShtepiaBotueseID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Librat");

            migrationBuilder.DropTable(
                name: "ShtepiteBotuese");
        }
    }
}
