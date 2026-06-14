using AdvertisingService.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProjectServices(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<AdvertisingService.Middleware.ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
