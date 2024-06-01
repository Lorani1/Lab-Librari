﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using labback.Models;

#nullable disable

namespace labback.Migrations
{
    [DbContext(typeof(LibriContext))]
    [Migration("20240601123012_ini")]
    partial class ini
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Qyteti", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Qytetet");
                });

            modelBuilder.Entity("labback.Libri", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Gjuha")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("InStock")
                        .HasColumnType("int");

                    b.Property<string>("Isbn")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Kategoria")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NrFaqeve")
                        .HasColumnType("int");

                    b.Property<int>("NrKopjeve")
                        .HasColumnType("int");

                    b.Property<string>("ProfilePicturePath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ShtepiaBotueseID")
                        .HasColumnType("int");

                    b.Property<string>("Titulli")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VitiPublikimit")
                        .HasColumnType("int");

                    b.Property<int>("zhanriId")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("ShtepiaBotueseID");

                    b.HasIndex("zhanriId");

                    b.ToTable("Librat");
                });

            modelBuilder.Entity("labback.Models.Autori", b =>
                {
                    b.Property<int>("Autori_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Autori_ID"));

                    b.Property<string>("Data_E_Lindjes")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Mbiemri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nacionaliteti")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("gjinia")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("nofka")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Autori_ID");

                    b.ToTable("Autori");
                });

            modelBuilder.Entity("labback.Models.AutoriLibri", b =>
                {
                    b.Property<int>("Autori_ID")
                        .HasColumnType("int");

                    b.Property<int>("ID")
                        .HasColumnType("int");

                    b.HasKey("Autori_ID", "ID");

                    b.HasIndex("ID");

                    b.ToTable("AutoriLibris");
                });

            modelBuilder.Entity("labback.Models.Exchange", b =>
                {
                    b.Property<int>("ExchangeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ExchangeId"));

                    b.Property<DateTime>("ExchangeDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("KlientId")
                        .HasColumnType("int");

                    b.Property<int>("LibriId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ReturnDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ExchangeId");

                    b.HasIndex("KlientId");

                    b.HasIndex("LibriId");

                    b.ToTable("Exchanges");
                });

            modelBuilder.Entity("labback.Models.Klient", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Adresa")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Mbiemri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NrPersonal")
                        .HasColumnType("int");

                    b.Property<int>("NrTel")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProfilePicturePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("QytetiID")
                        .HasColumnType("int");

                    b.Property<int>("RoliID")
                        .HasColumnType("int");

                    b.Property<string>("Statusi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("QytetiID");

                    b.HasIndex("RoliID");

                    b.ToTable("Klients");
                });

            modelBuilder.Entity("labback.Models.RefreshToken", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Expires")
                        .HasColumnType("datetime2");

                    b.Property<int>("KlientID")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Revoked")
                        .HasColumnType("datetime2");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("KlientID");

                    b.ToTable("RefreshTokens");
                });

            modelBuilder.Entity("labback.Models.Roli", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Roli");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            Name = "user"
                        },
                        new
                        {
                            ID = 2,
                            Name = "admin"
                        });
                });

            modelBuilder.Entity("labback.Models.ShtepiaBotuese", b =>
                {
                    b.Property<int>("ShtepiaBotueseID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ShtepiaBotueseID"));

                    b.Property<string>("Adresa")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ShtepiaBotueseID");

                    b.ToTable("ShtepiteBotuese");
                });

            modelBuilder.Entity("labback.Models.Zhanri", b =>
                {
                    b.Property<int>("zhanriId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("zhanriId"));

                    b.Property<string>("description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("zhanriId");

                    b.ToTable("zhanri");
                });

            modelBuilder.Entity("labback.Libri", b =>
                {
                    b.HasOne("labback.Models.ShtepiaBotuese", "ShtepiaBotuese")
                        .WithMany()
                        .HasForeignKey("ShtepiaBotueseID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("labback.Models.Zhanri", "zhanri")
                        .WithMany()
                        .HasForeignKey("zhanriId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ShtepiaBotuese");

                    b.Navigation("zhanri");
                });

            modelBuilder.Entity("labback.Models.AutoriLibri", b =>
                {
                    b.HasOne("labback.Models.Autori", "Autoret")
                        .WithMany("AutoriLibris")
                        .HasForeignKey("Autori_ID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("labback.Libri", "Librat")
                        .WithMany("AutoriLibris")
                        .HasForeignKey("ID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Autoret");

                    b.Navigation("Librat");
                });

            modelBuilder.Entity("labback.Models.Exchange", b =>
                {
                    b.HasOne("labback.Models.Klient", "Klient")
                        .WithMany()
                        .HasForeignKey("KlientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("labback.Libri", "Libri")
                        .WithMany()
                        .HasForeignKey("LibriId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Klient");

                    b.Navigation("Libri");
                });

            modelBuilder.Entity("labback.Models.Klient", b =>
                {
                    b.HasOne("Qyteti", "Qyteti")
                        .WithMany()
                        .HasForeignKey("QytetiID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("labback.Models.Roli", "Roli")
                        .WithMany("Klients")
                        .HasForeignKey("RoliID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Qyteti");

                    b.Navigation("Roli");
                });

            modelBuilder.Entity("labback.Models.RefreshToken", b =>
                {
                    b.HasOne("labback.Models.Klient", "Klient")
                        .WithMany("RefreshTokens")
                        .HasForeignKey("KlientID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Klient");
                });

            modelBuilder.Entity("labback.Libri", b =>
                {
                    b.Navigation("AutoriLibris");
                });

            modelBuilder.Entity("labback.Models.Autori", b =>
                {
                    b.Navigation("AutoriLibris");
                });

            modelBuilder.Entity("labback.Models.Klient", b =>
                {
                    b.Navigation("RefreshTokens");
                });

            modelBuilder.Entity("labback.Models.Roli", b =>
                {
                    b.Navigation("Klients");
                });
#pragma warning restore 612, 618
        }
    }
}