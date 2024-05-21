using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace labback.Migrations.Libri
{
    /// <inheritdoc />
    public partial class libriTest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Librat",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Isbn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Titulli = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Kategoria = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Lloji = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VitiPublikimit = table.Column<int>(type: "int", nullable: false),
                    NrFaqeve = table.Column<int>(type: "int", nullable: false),
                    NrKopjeve = table.Column<int>(type: "int", nullable: false),
                    Gjuha = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InStock = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Librat", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Librat");
        }
    }
}
