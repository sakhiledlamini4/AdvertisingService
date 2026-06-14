using AdvertisingService.Data;
using AdvertisingService.Models;
using Dapper;

namespace AdvertisingService.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IDbConnectionFactory _factory;

        public UserRepository(IDbConnectionFactory factory)
        {
            _factory = factory;
        }

        public async Task<int> CreateAsync(User user)
        {
            const string sql = @"
INSERT INTO Users (FirstName, LastName, Email, PasswordHash, CreatedDate)
VALUES (@FirstName, @LastName, @Email, @PasswordHash, @CreatedDate);
SELECT CAST(SCOPE_IDENTITY() as int);
";

            using var conn = _factory.CreateConnection();
            return await conn.QuerySingleAsync<int>(sql, user);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            const string sql = "SELECT TOP(1) * FROM Users WHERE Email = @Email";
            using var conn = _factory.CreateConnection();
            return await conn.QueryFirstOrDefaultAsync<User>(sql, new { Email = email });
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            const string sql = "SELECT * FROM Users WHERE Id = @Id";
            using var conn = _factory.CreateConnection();
            return await conn.QueryFirstOrDefaultAsync<User>(sql, new { Id = id });
        }
    }
}
