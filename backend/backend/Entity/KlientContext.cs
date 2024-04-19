using labback.Entity;
using Microsoft.EntityFrameworkCore;

namespace labback.Entity
{
    public class KlientContext : DbContext
    {
        public KlientContext(DbContextOptions<KlientContext> options) : base(options)
        {

        }
        public DbSet<Klient> Klients { get; set; }
    }
}
