using AdvertisingService.DTOs;

namespace AdvertisingService.Services
{
    public interface IServiceService
    {
        Task<ServiceDto> CreateAsync(ServiceCreateDto dto);
        Task<IEnumerable<ServiceDto>> GetAllAsync();
        Task<ServiceDto?> GetByIdAsync(int id);
        Task<ServiceDto?> UpdateAsync(int id, ServiceUpdateDto dto);
        Task DeleteAsync(int id);
    }
}
