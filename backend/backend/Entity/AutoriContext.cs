using backend.Entity;
using Microsoft.EntityFrameworkCore;

namespace backend.Enitity
{
    public class AutoriContext : DbContext
    {
        public AutoriContext(DbContextOptions<AutoriContext> options) : base(options) { }

        public DbSet<Autori> Autori { get; set; }
    }
}
