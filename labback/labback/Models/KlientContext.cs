using labback.Models;
using Microsoft.EntityFrameworkCore;

namespace labback.Models
{
    public class KlientContext : DbContext
    {
        public KlientContext(DbContextOptions<KlientContext> options) : base(options)
        {

        }
        public DbSet<Klient> Klients { get; set; }
        public DbSet<Qyteti> Qytetet { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Klient>()
                .HasOne(k => k.Qyteti)
                .WithMany()
                .HasForeignKey(k => k.QytetiID);
        }
    }
}
