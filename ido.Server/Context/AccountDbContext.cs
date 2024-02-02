using ido.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ido.Server.Context
{
    public class AccountDbContext : DbContext
    {
        public AccountDbContext(DbContextOptions<AccountDbContext> options):base (options) { 
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Models.Task> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>().ToTable("accounts");
            modelBuilder.Entity<Models.Task>().ToTable("tasks");

        }
    }
}
