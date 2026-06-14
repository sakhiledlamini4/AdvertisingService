using AdvertisingService.DTOs;
using AdvertisingService.Services;
using Microsoft.AspNetCore.Mvc;

namespace AdvertisingService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IUserService _userService;

        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            await _userService.RegisterAsync(request);
            return Created(string.Empty, new ApiResponse<object> { Success = true, Message = "User registered successfully", Data = null });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var auth = await _userService.LoginAsync(request);
            return Ok(new ApiResponse<AuthResponse> { Success = true, Message = "Login successful", Data = auth });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Stateless JWT: logout on server requires token blacklist which is not implemented here.
            // To implement blacklisting: store revoked tokens in cache/db with expiration and check on each request.
            return Ok(new ApiResponse<object> { Success = true, Message = "Logout successful", Data = null });
        }
    }
}
