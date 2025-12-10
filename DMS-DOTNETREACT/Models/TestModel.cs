using System.ComponentModel.DataAnnotations;

namespace DMS_DOTNETREACT.Models;

public class TestModel
{
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    public string? Note { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

