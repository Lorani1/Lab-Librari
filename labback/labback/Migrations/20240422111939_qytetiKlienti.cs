using Microsoft.EntityFrameworkCore.Migrations;

namespace labback.Migrations
{
    public partial class qytetiKlienti: Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Qytetet",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Qytetet", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Klients",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Mbiemri = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    NrPersonal = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Statusi = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    NrTel = table.Column<int>(type: "int", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    QytetiID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klients", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Klients_Qytetet_QytetiID",
                        column: x => x.QytetiID,
                        principalTable: "Qytetet",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Klients_QytetiID",
                table: "Klients",
                column: "QytetiID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Klients");

            migrationBuilder.DropTable(
                name: "Qytetet");
        }
    }
}
