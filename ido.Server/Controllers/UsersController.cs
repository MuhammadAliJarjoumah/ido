using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ido.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

[ApiController]
[Microsoft.AspNetCore.Components.Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(string email, string password)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email && u.Password == password);

        if (user == null)
        {
            return Unauthorized();
        }

        // Authentication successful, return some sort of token here
        var token = GenerateToken(user); // Replace with your actual token generation logic
        return Ok(token);
    }

    private string GenerateToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("Maj@IDo"); // Replace with your secret key
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
            new Claim(ClaimTypes.Name, user.Email.ToString())
                // Add other claims as needed
            }),
            Expires = DateTime.UtcNow.AddDays(7), // Token expiry date
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}