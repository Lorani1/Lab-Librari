﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace labback.Migrations
{
    /// <inheritdoc />
    public partial class @new : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Autori",
                columns: table => new
                {
                    Autori_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mbiemri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    nofka = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    gjinia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Data_E_Lindjes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nacionaliteti = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Autori", x => x.Autori_ID);
                });

            migrationBuilder.CreateTable(
                name: "Pozitat",
                columns: table => new
                {
                    pozita_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    roli = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pozitat", x => x.pozita_ID);
                });

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
                name: "Roli",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roli", x => x.ID);
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
                name: "Stafis",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    emri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    mbiemri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    nrPersonal = table.Column<long>(type: "bigint", nullable: true),
                    adresa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    orari = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    active = table.Column<int>(type: "int", nullable: false),
                    data_E_Punesimit = table.Column<DateTime>(type: "datetime2", nullable: true),
                    data_E_doreheqjes = table.Column<DateTime>(type: "datetime2", nullable: true),
                    nrTelefonit = table.Column<long>(type: "bigint", nullable: true),
                    gjinia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    pozita_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stafis", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Stafis_Pozitat_pozita_ID",
                        column: x => x.pozita_ID,
                        principalTable: "Pozitat",
                        principalColumn: "pozita_ID",
                        onDelete: ReferentialAction.Cascade);
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
                    ProfilePicturePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QytetiID = table.Column<int>(type: "int", nullable: false),
                    RoliID = table.Column<int>(type: "int", nullable: false)
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
                    table.ForeignKey(
                        name: "FK_Klients_Roli_RoliID",
                        column: x => x.RoliID,
                        principalTable: "Roli",
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
                    VitiPublikimit = table.Column<int>(type: "int", nullable: false),
                    NrFaqeve = table.Column<int>(type: "int", nullable: false),
                    NrKopjeve = table.Column<int>(type: "int", nullable: false),
                    Gjuha = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InStock = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                name: "RefreshTokens",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Expires = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Revoked = table.Column<DateTime>(type: "datetime2", nullable: true),
                    KlientID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.ID);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Klients_KlientID",
                        column: x => x.KlientID,
                        principalTable: "Klients",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AutoriLibris",
                columns: table => new
                {
                    Autori_ID = table.Column<int>(type: "int", nullable: false),
                    ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AutoriLibris", x => new { x.Autori_ID, x.ID });
                    table.ForeignKey(
                        name: "FK_AutoriLibris_Autori_Autori_ID",
                        column: x => x.Autori_ID,
                        principalTable: "Autori",
                        principalColumn: "Autori_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AutoriLibris_Librat_ID",
                        column: x => x.ID,
                        principalTable: "Librat",
                        principalColumn: "ID",
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
                    ReturnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsApproved = table.Column<bool>(type: "bit", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "RatingComments",
                columns: table => new
                {
                    RatingsCommentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KlientID = table.Column<int>(type: "int", nullable: false),
                    LibriID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RatingComments", x => x.RatingsCommentID);
                    table.ForeignKey(
                        name: "FK_RatingComments_Klients_KlientID",
                        column: x => x.KlientID,
                        principalTable: "Klients",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RatingComments_Librat_LibriID",
                        column: x => x.LibriID,
                        principalTable: "Librat",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    notificationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    isRead = table.Column<bool>(type: "bit", nullable: false),
                    klientId = table.Column<int>(type: "int", nullable: false),
                    exchangeId = table.Column<int>(type: "int", nullable: false),
                    notificationTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.notificationId);
                    table.ForeignKey(
                        name: "FK_Notifications_Exchanges_exchangeId",
                        column: x => x.exchangeId,
                        principalTable: "Exchanges",
                        principalColumn: "ExchangeId");
                    table.ForeignKey(
                        name: "FK_Notifications_Klients_klientId",
                        column: x => x.klientId,
                        principalTable: "Klients",
                        principalColumn: "ID");
                });

            migrationBuilder.InsertData(
                table: "Roli",
                columns: new[] { "ID", "Name" },
                values: new object[,]
                {
                    { 1, "user" },
                    { 2, "admin" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AutoriLibris_ID",
                table: "AutoriLibris",
                column: "ID");

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
                name: "IX_Klients_RoliID",
                table: "Klients",
                column: "RoliID");

            migrationBuilder.CreateIndex(
                name: "IX_Librat_ShtepiaBotueseID",
                table: "Librat",
                column: "ShtepiaBotueseID");

            migrationBuilder.CreateIndex(
                name: "IX_Librat_zhanriId",
                table: "Librat",
                column: "zhanriId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_exchangeId",
                table: "Notifications",
                column: "exchangeId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_klientId",
                table: "Notifications",
                column: "klientId");

            migrationBuilder.CreateIndex(
                name: "IX_RatingComments_KlientID_LibriID",
                table: "RatingComments",
                columns: new[] { "KlientID", "LibriID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RatingComments_LibriID",
                table: "RatingComments",
                column: "LibriID");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_KlientID",
                table: "RefreshTokens",
                column: "KlientID");

            migrationBuilder.CreateIndex(
                name: "IX_Stafis_pozita_ID",
                table: "Stafis",
                column: "pozita_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AutoriLibris");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "RatingComments");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "Stafis");

            migrationBuilder.DropTable(
                name: "Autori");

            migrationBuilder.DropTable(
                name: "Exchanges");

            migrationBuilder.DropTable(
                name: "Pozitat");

            migrationBuilder.DropTable(
                name: "Klients");

            migrationBuilder.DropTable(
                name: "Librat");

            migrationBuilder.DropTable(
                name: "Qytetet");

            migrationBuilder.DropTable(
                name: "Roli");

            migrationBuilder.DropTable(
                name: "ShtepiteBotuese");

            migrationBuilder.DropTable(
                name: "zhanri");
        }
    }
}
