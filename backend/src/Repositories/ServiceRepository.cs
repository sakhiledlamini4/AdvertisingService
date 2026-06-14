using AdvertisingService.Data;
using AdvertisingService.Models;
using Dapper;

namespace AdvertisingService.Repositories
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly IDbConnectionFactory _factory;

        public ServiceRepository(IDbConnectionFactory factory)
        {
            _factory = factory;
        }

        public async Task<int> CreateAsync(ServiceItem service)
        {
            const string sql = @"
INSERT INTO Services ([Name], Description, Price, CreatedDate, UpdatedDate)
VALUES (@Name, @Description, @Price, @CreatedDate, @UpdatedDate);
SELECT CAST(SCOPE_IDENTITY() as int);
";
            using var conn = _factory.CreateConnection();
            return await conn.QuerySingleAsync<int>(sql, service);
        }

        public async Task<IEnumerable<ServiceItem>> GetAllAsync()
        {
            const string sql = "SELECT * FROM Services ORDER BY CreatedDate DESC";
            using var conn = _factory.CreateConnection();
            return await conn.QueryAsync<ServiceItem>(sql);
        }

        public async Task<ServiceItem?> GetByIdAsync(int id)
        {
            const string sql = "SELECT * FROM Services WHERE Id = @Id";
            using var conn = _factory.CreateConnection();
            return await conn.QueryFirstOrDefaultAsync<ServiceItem>(sql, new { Id = id });
        }

        public async Task<int> UpdateAsync(ServiceItem service)
        {
            const string sql = @"
UPDATE Services
SET [Name] = @Name,
    Description = @Description,
    Price = @Price,
    UpdatedDate = @UpdatedDate
WHERE Id = @Id";
            using var conn = _factory.CreateConnection();
            return await conn.ExecuteAsync(sql, service);
        }

        public async Task<int> DeleteAsync(int id)
        {
            const string sql = "DELETE FROM Services WHERE Id = @Id";
            using var conn = _factory.CreateConnection();
            return await conn.ExecuteAsync(sql, new { Id = id });
        }
    }
}
