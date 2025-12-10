using DMS_DOTNETREACT.Models;
using Microsoft.EntityFrameworkCore;

namespace DMS_DOTNETREACT.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<TestModel> TestModels => Set<TestModel>();
}

