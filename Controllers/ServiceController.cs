using AdvertisingService.DTOs;
using AdvertisingService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdvertisingService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public ServicesController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ServiceCreateDto dto)
        {
            var created = await _serviceService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, new ApiResponse<ServiceDto> { Success = true, Message = "Service created", Data = created });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _serviceService.GetAllAsync();
            return Ok(new ApiResponse<IEnumerable<ServiceDto>> { Success = true, Message = "Services retrieved", Data = items });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _serviceService.GetByIdAsync(id);
            if (item == null) return NotFound(new ApiResponse<object> { Success = false, Message = "Service not found", Data = null });
            return Ok(new ApiResponse<ServiceDto> { Success = true, Message = "Service retrieved", Data = item });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ServiceUpdateDto dto)
        {
            var updated = await _serviceService.UpdateAsync(id, dto);
            if (updated == null) return NotFound(new ApiResponse<object> { Success = false, Message = "Service not found", Data = null });
            return Ok(new ApiResponse<ServiceDto> { Success = true, Message = "Service updated", Data = updated });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _serviceService.DeleteAsync(id);
            return Ok(new ApiResponse<object> { Success = true, Message = "Service deleted successfully", Data = null });
        }
    }
}
