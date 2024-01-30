// ApplicationDbContext
#nullable disable
using Microsoft.EntityFrameworkCore;

using ido.Server.Models ; // Replace with your actual namespace and models

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
}
#nullable enable
