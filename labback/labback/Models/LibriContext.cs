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



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Libri>()
                .HasOne(l => l.ShtepiaBotuese) // Navigation property
                .WithMany()        // Navigation property on ShtepiaBotuese representing the collection of Libri
                .HasForeignKey(l => l.ShtepiaBotueseID); // Foreign key
        }


    }
}

