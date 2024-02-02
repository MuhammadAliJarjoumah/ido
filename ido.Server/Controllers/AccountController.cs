using ido.Server.Context;
using ido.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ido.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountDbContext _authContext;
        public AccountController(AccountDbContext accountDbContext)
        {
            _authContext = accountDbContext;
        }
        [HttpPost("authinticate")]
        public async Task<IActionResult> Authenticate([FromBody] Account accountObj)
        {
            if (accountObj == null)
                return BadRequest();
            var account = await _authContext.Accounts.FirstOrDefaultAsync(x => x.Email == accountObj.Email && x.Password == accountObj.Password);
            if (account == null)
                return NotFound(new { Message = "User Not Found!" });

            return Ok(new
            {
                Message = "Login Success"
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAccount([FromBody] Account accountObj)
        {
            if (accountObj == null)
                return BadRequest();
            await _authContext.Accounts.AddAsync(accountObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "Account Registered"
            });
        }
    }
}
