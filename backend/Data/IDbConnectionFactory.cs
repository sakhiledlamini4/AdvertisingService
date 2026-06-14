using System.Data;

namespace AdvertisingService.Data
{
    public interface IDbConnectionFactory
    {
        IDbConnection CreateConnection();
    }
}
