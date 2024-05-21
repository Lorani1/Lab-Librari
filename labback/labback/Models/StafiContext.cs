using Microsoft.EntityFrameworkCore;

namespace labback.Models
{
    public class StafiContext : DbContext
    {
        public StafiContext(DbContextOptions<StafiContext> options) : base(options)
        {

        }
        public DbSet<Stafi> stafis { get; set; }
    }
}
