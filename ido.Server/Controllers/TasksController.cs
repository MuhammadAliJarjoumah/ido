using ido.Server.Context;
using ido.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ido.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AccountDbContext _accountDbContext;
        private readonly ILogger<TasksController> _logger;

        public TasksController(AccountDbContext accountDbContext, ILogger<TasksController> logger)
        {
            _accountDbContext = accountDbContext;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            var tasks = await _accountDbContext.Tasks.Include(t => t.Estimate).ToListAsync();
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<IActionResult> AddTask(Models.Task task)
        {
            task.Id = Guid.NewGuid();
            _accountDbContext.Tasks.Add(task);
            await _accountDbContext.SaveChangesAsync();
            return Ok(task);
        }

        [HttpPut("{taskId}")]
        public async Task<IActionResult> UpdateTask(Guid taskId, Models.Task updatedTask)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var existingTask = await _accountDbContext.Tasks.FirstOrDefaultAsync(t => t.Id == taskId);

                if (existingTask == null)
                {
                    return NotFound();
                }

                // Update properties
                existingTask.Title = updatedTask.Title;
                existingTask.Category = updatedTask.Category;
                existingTask.DueDate = updatedTask.DueDate;
                existingTask.Importance = updatedTask.Importance;
                existingTask.Status = updatedTask.Status;

                if (updatedTask.EstimateId != 0)
                {
                    existingTask.EstimateId = updatedTask.EstimateId;
                }

                await _accountDbContext.SaveChangesAsync();

                _logger.LogInformation($"Task with ID {taskId} updated successfully.");

                return Ok(existingTask);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error updating task with ID {taskId}: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPatch("{taskId}")]
        public async Task<IActionResult> PatchTask(Guid taskId, [FromBody] JsonPatchDocument<Models.Task> patchDocument)
        {
            try
            {
                var existingTask = await _accountDbContext.Tasks.FirstOrDefaultAsync(t => t.Id == taskId);

                if (existingTask == null)
                {
                    return NotFound();
                }

                patchDocument.ApplyTo(existingTask, (op) => ModelState.AddModelError("JsonPatch", op.ErrorMessage));


                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await _accountDbContext.SaveChangesAsync();

                _logger.LogInformation($"Task with ID {taskId} patched successfully.");

                return Ok(existingTask);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error patching task with ID {taskId}: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
    }
}
