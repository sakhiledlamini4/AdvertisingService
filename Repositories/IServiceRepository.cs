using AdvertisingService.Models;

namespace AdvertisingService.Repositories
{
    public interface IServiceRepository
    {
        Task<int> CreateAsync(ServiceItem service);
        Task<IEnumerable<ServiceItem>> GetAllAsync();
        Task<ServiceItem?> GetByIdAsync(int id);
        Task<int> UpdateAsync(ServiceItem service);
        Task<int> DeleteAsync(int id);
    }
}
