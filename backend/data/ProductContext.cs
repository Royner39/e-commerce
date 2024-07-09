using Microsoft.EntityFrameworkCore;
using backend.models;

namespace backend.data
{
    public class ProductContext : DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options)
            : base(options)
        {
            Database.Migrate();
        }

        public DbSet<Product> Product { get; set; }
    }
}
