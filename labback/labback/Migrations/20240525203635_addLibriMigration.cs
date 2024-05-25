using System;
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
                name: "Qytetet",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Qytetet", x => x.ID);
                });

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
                name: "zhanri",
                columns: table => new
                {
                    zhanriId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_zhanri", x => x.zhanriId);
                });

            migrationBuilder.CreateTable(
                name: "Klients",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mbiemri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NrPersonal = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Statusi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NrTel = table.Column<int>(type: "int", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProfilePicturePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
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

            migrationBuilder.CreateTable(
                name: "Librat",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Isbn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Titulli = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kategoria = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VitiPublikimit = table.Column<int>(type: "int", nullable: false),
                    NrFaqeve = table.Column<int>(type: "int", nullable: false),
                    NrKopjeve = table.Column<int>(type: "int", nullable: false),
                    Gjuha = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InStock = table.Column<int>(type: "int", nullable: false),
                    ProfilePicturePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShtepiaBotueseID = table.Column<int>(type: "int", nullable: false),
                    zhanriId = table.Column<int>(type: "int", nullable: false)
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
                    table.ForeignKey(
                        name: "FK_Librat_zhanri_zhanriId",
                        column: x => x.zhanriId,
                        principalTable: "zhanri",
                        principalColumn: "zhanriId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Exchanges",
                columns: table => new
                {
                    ExchangeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KlientId = table.Column<int>(type: "int", nullable: false),
                    LibriId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExchangeDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReturnDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exchanges", x => x.ExchangeId);
                    table.ForeignKey(
                        name: "FK_Exchanges_Klients_KlientId",
                        column: x => x.KlientId,
                        principalTable: "Klients",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Exchanges_Librat_LibriId",
                        column: x => x.LibriId,
                        principalTable: "Librat",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exchanges_KlientId",
                table: "Exchanges",
                column: "KlientId");

            migrationBuilder.CreateIndex(
                name: "IX_Exchanges_LibriId",
                table: "Exchanges",
                column: "LibriId");

            migrationBuilder.CreateIndex(
                name: "IX_Klients_QytetiID",
                table: "Klients",
                column: "QytetiID");

            migrationBuilder.CreateIndex(
                name: "IX_Librat_ShtepiaBotueseID",
                table: "Librat",
                column: "ShtepiaBotueseID");

            migrationBuilder.CreateIndex(
                name: "IX_Librat_zhanriId",
                table: "Librat",
                column: "zhanriId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Exchanges");

            migrationBuilder.DropTable(
                name: "Klients");

            migrationBuilder.DropTable(
                name: "Librat");

            migrationBuilder.DropTable(
                name: "Qytetet");

            migrationBuilder.DropTable(
                name: "ShtepiteBotuese");

            migrationBuilder.DropTable(
                name: "zhanri");
        }
    }
}
