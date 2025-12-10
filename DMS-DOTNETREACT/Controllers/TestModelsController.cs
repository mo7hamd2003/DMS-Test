using DMS_DOTNETREACT.Data;
using DMS_DOTNETREACT.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DMS_DOTNETREACT.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestModelsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TestModel>>> GetAll(CancellationToken cancellationToken)
    {
        var items = await db.TestModels.AsNoTracking().OrderByDescending(t => t.Id).ToListAsync(cancellationToken);
        return Ok(items);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TestModel>> Get(int id, CancellationToken cancellationToken)
    {
        var item = await db.TestModels.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id, cancellationToken);
        if (item is null)
        {
            return NotFound();
        }

        return Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<TestModel>> Create(TestModel model, CancellationToken cancellationToken)
    {
        model.CreatedAt = DateTime.UtcNow;
        db.TestModels.Add(model);
        await db.SaveChangesAsync(cancellationToken);
        return CreatedAtAction(nameof(Get), new { id = model.Id }, model);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var item = await db.TestModels.FindAsync([id], cancellationToken: cancellationToken);
        if (item is null)
        {
            return NotFound();
        }

        db.TestModels.Remove(item);
        await db.SaveChangesAsync(cancellationToken);
        return NoContent();
    }
}

