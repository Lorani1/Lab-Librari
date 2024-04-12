using Microsoft.EntityFrameworkCore;

namespace backend.Entity
{
    public class StafiContext : DbContext
    {
        public StafiContext(DbContextOptions<StafiContext> options) : base(options)
        {

        }
        public DbSet<Stafi> stafis { get; set; }
    }
}
