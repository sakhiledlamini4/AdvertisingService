using AdvertisingService.DTOs;

namespace AdvertisingService.Services
{
    public interface IUserService
    {
        Task RegisterAsync(RegisterRequest request);
        Task<AuthResponse> LoginAsync(LoginRequest request);
    }
}
