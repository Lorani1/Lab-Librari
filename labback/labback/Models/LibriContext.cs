using Microsoft.EntityFrameworkCore;

namespace labback.Models
{
    public class LibriContext : DbContext
    {
        public LibriContext(DbContextOptions<LibriContext> options) : base(options)
        {
        }

        public DbSet<Libri> Librat { get; set; }
        public DbSet<ShtepiaBotuese> ShtepiteBotuese { get; set; }
        public DbSet<Zhanri> zhanri { get; set; }
        public DbSet<Exchange> Exchanges { get; set; }
        public DbSet<Klient> Klients { get; set; }
        public DbSet<Qyteti> Qytetet { get; set; }
        public DbSet<Autori> Autori { get; set; }
        public DbSet<AutoriLibri> AutoriLibris { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Roli> Roli { get; set; }

        public DbSet<pozita> Pozitat { get; set; }
        public DbSet<Stafi> Stafis { get; set; }

        public DbSet<RatingComment> RatingComments { get; set; }
        public DbSet<Notification> Notifications { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<RatingComment>()
            .HasOne(rc => rc.Klient)
            .WithMany(k => k.RatingComments)
            .HasForeignKey(rc => rc.KlientID)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RatingComment>()
                .HasOne(rc => rc.Libri)
                .WithMany(l => l.RatingComments)
                .HasForeignKey(rc => rc.LibriID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RatingComment>()
                .HasIndex(rc => new { rc.KlientID, rc.LibriID })
                .IsUnique();

            modelBuilder.Entity<Libri>()
                .HasOne(l => l.ShtepiaBotuese)
                .WithMany()
                .HasForeignKey(l => l.ShtepiaBotueseID);

            modelBuilder.Entity<Libri>()
                .HasOne(l => l.zhanri)
                .WithMany()
                .HasForeignKey(l => l.zhanriId);

            modelBuilder.Entity<Exchange>()
                .HasOne(e => e.Klient)
                .WithMany()
                .HasForeignKey(e => e.KlientId);

            modelBuilder.Entity<Klient>()
                .HasOne(k => k.Qyteti)
                .WithMany()
                .HasForeignKey(k => k.QytetiID);

            modelBuilder.Entity<Exchange>()
                .HasOne(e => e.Libri)
                .WithMany()
                .HasForeignKey(e => e.LibriId);

            modelBuilder.Entity<Stafi>()
                .HasOne(s => s.pozita)
                .WithMany()
                .HasForeignKey(s => s.pozita_ID);

            modelBuilder.Entity<AutoriLibri>()
                .HasKey(al => new { al.Autori_ID, al.ID });

            // Define navigation properties
            modelBuilder.Entity<AutoriLibri>()
                .HasOne(al => al.Autoret)
                .WithMany(a => a.AutoriLibris)
                .HasForeignKey(al => al.Autori_ID);

            modelBuilder.Entity<AutoriLibri>()
                .HasOne(al => al.Librat)
                .WithMany(l => l.AutoriLibris)
                .HasForeignKey(al => al.ID);

            modelBuilder.Entity<RefreshToken>()
                .HasOne(rt => rt.Klient)
                .WithMany(k => k.RefreshTokens)
                .HasForeignKey(rt => rt.KlientID);

            modelBuilder.Entity<Notification>()
               .HasOne(n => n.klient)
               .WithMany()
               .HasForeignKey(n => n.klientId)
               .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Notification>()
                 .HasOne(n => n.exchange)
                 .WithMany(e => e.Notifications)
                 .HasForeignKey(n => n.exchangeId)
                 .OnDelete(DeleteBehavior.NoAction);


            // Define the relationship between Klient and Roli
            modelBuilder.Entity<Klient>()
                .HasOne(k => k.Roli)
                .WithMany(r => r.Klients)
                .HasForeignKey(k => k.RoliID);

            // Seed initial roles
            modelBuilder.Entity<Roli>().HasData(
                new Roli { ID = 1, Name = "user" },
                new Roli { ID = 2, Name = "admin" }
            );
        }
    }
}