using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using UserRegistrationAPI.Data;
using UserRegistrationAPI.Models;

namespace UserRegistrationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // API Đăng ký
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            // Kiểm tra nếu số điện thoại đã tồn tại
            if (await _context.Users.AnyAsync(u => u.Phone == request.Phone))
            {
                return BadRequest("Số điện thoại đã tồn tại");
            }

            // Tạo người dùng mới
            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Address = request.Address,
                Phone = request.Phone,
                Password = request.Password
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("Đăng ký thành công");
        }

        // API Đăng nhập
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Phone == request.Phone && u.Password == request.Password);

            if (user == null)
            {
                return Unauthorized("Số điện thoại hoặc mật khẩu không đúng");
            }

            return Ok("Đăng nhập thành công");
        }
    }
}
