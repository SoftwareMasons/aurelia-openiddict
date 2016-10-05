using Microsoft.EntityFrameworkCore;
using resources.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace resources.Data
{
    public class ApplicationDbContext : DbContext
    {
        public virtual DbSet<TodoItem> TodoItems { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<TodoItem>().ToTable("ToDoItems");
            builder.Entity<TodoItem>().Property(c => c.Id).UseSqlServerIdentityColumn();
            builder.Entity<TodoItem>().Property(c => c.UserId).HasMaxLength(128);
            builder.Entity<TodoItem>().Property(c => c.Description).HasMaxLength(1024);
            builder.Entity<TodoItem>().Property(c => c.Completed).HasDefaultValue(false);
        }
    }
}
