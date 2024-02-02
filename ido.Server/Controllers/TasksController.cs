using ido.Server.Context;
using ido.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        public TasksController(AccountDbContext accountDbContext)
        {
            _accountDbContext = accountDbContext;
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
            var existingTask = await _accountDbContext.Tasks.FirstOrDefaultAsync(t => t.Id == taskId);

            if (existingTask == null)
            {
                return NotFound(); 
            }

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

            return Ok(existingTask);
        }
    }
}
