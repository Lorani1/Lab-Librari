using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using labback.Models;

var builder = WebApplication.CreateBuilder(args);




// Add services to the container.
builder.Services.AddDbContext<StafiContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("local")));

builder.Services.AddDbContext<AutoriContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("local")));

builder.Services.AddDbContext<LibriContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("local")));

builder.Services.AddDbContext<KlientContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("local")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<PasswordService>();


builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});

app.UseHttpsRedirection();

app.UseAuthorization();


app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "foto")),
    RequestPath = "/foto"
});


app.MapControllers();

app.Run();
