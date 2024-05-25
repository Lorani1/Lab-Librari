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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

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
        }
    }
}