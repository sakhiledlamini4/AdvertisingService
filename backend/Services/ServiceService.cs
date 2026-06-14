using AdvertisingService.DTOs;
using AdvertisingService.Models;
using AdvertisingService.Repositories;

namespace AdvertisingService.Services
{
    public class ServiceService : IServiceService
    {
        private readonly IServiceRepository _repo;

        public ServiceService(IServiceRepository repo)
        {
            _repo = repo;
        }

        public async Task<ServiceDto> CreateAsync(ServiceCreateDto dto)
        {
            var item = new ServiceItem
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = null
            };

            var id = await _repo.CreateAsync(item);
            item.Id = id;

            return ToDto(item);
        }

        public async Task<IEnumerable<ServiceDto>> GetAllAsync()
        {
            var items = await _repo.GetAllAsync();
            return items.Select(ToDto);
        }

        public async Task<ServiceDto?> GetByIdAsync(int id)
        {
            var item = await _repo.GetByIdAsync(id);
            return item == null ? null : ToDto(item);
        }

        public async Task<ServiceDto?> UpdateAsync(int id, ServiceUpdateDto dto)
        {
            var existing = await _repo.GetByIdAsync(id);
            if (existing == null) return null;

            existing.Name = dto.Name;
            existing.Description = dto.Description;
            existing.Price = dto.Price;
            existing.UpdatedDate = DateTime.UtcNow;

            await _repo.UpdateAsync(existing);
            return ToDto(existing);
        }

        public async Task DeleteAsync(int id)
        {
            await _repo.DeleteAsync(id);
        }

        private static ServiceDto ToDto(ServiceItem s) => new ServiceDto
        {
            Id = s.Id,
            Name = s.Name,
            Description = s.Description,
            Price = s.Price,
            CreatedDate = s.CreatedDate,
            UpdatedDate = s.UpdatedDate
        };
    }
}
