namespace AdvertisingService.DTOs
{
    public class ServiceUpdateDto
    {
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal Price { get; set; }
    }
}
