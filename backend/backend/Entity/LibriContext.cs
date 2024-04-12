using backcrud.Entity;
using Microsoft.EntityFrameworkCore;

namespace backcrud.Models
{
    public class LibriContext : DbContext

    {

        public LibriContext(DbContextOptions<LibriContext> options) : base(options)
        {


        }
        public DbSet<Libri> Librat { get; set; }
    }
}
