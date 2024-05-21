using labback.Models;
using Microsoft.EntityFrameworkCore;

namespace labback.Models
{
    public class LibriContext : DbContext

    {

        public LibriContext(DbContextOptions<LibriContext> options) : base(options)
        {


        }
        public DbSet<Libri> Librat { get; set; }
    }
}
