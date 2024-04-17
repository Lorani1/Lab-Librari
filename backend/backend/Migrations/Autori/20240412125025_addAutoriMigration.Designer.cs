﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Enitity;

#nullable disable

namespace backend.Migrations.Autori
{
    [DbContext(typeof(AutoriContext))]
    [Migration("20240412125025_addAutoriMigration")]
    partial class addAutoriMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("backend.Entity.Autori", b =>
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

                    b.Property<string>("nofka")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Autori_ID");

                    b.ToTable("Autori");
                });
#pragma warning restore 612, 618
        }
    }
}