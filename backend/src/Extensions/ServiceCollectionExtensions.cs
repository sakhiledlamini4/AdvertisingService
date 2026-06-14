using AdvertisingService.Data;
using AdvertisingService.Middleware;
using AdvertisingService.Repositories;
using AdvertisingService.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace AdvertisingService.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddProjectServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddControllers();

            services.AddSingleton<IDbConnectionFactory, SqlConnectionFactory>();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IServiceRepository, ServiceRepository>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IServiceService, ServiceService>();

            // Authentication
            var key = config["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key required");
            var issuer = config["Jwt:Issuer"];
            var audience = config["Jwt:Audience"];

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = true;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = !string.IsNullOrEmpty(issuer),
                    ValidateAudience = !string.IsNullOrEmpty(audience),
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
                };
            });

            // Swagger with JWT support
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "AdvertisingService API", Version = "v1" });
                var jwtScheme = new OpenApiSecurityScheme
                {
                    Scheme = "bearer",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Description = "Enter 'Bearer {token}'"
                };
                c.AddSecurityDefinition("Bearer", jwtScheme);
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    { jwtScheme, Array.Empty<string>() }
                });
            });

            return services;
        }
    }
}
