using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using labback.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);


var jwtKey = "5yGJ7c3QnD9e8LsR2P1Yk6T4F8bHwAeS";
var key = Encoding.UTF8.GetBytes(jwtKey);


builder.Services.AddDbContext<StafiContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("local")));

builder.Services.AddDbContext<LibriContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("local")));

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
        options.JsonSerializerOptions.WriteIndented = true;
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<PasswordService>();
builder.Services.AddLogging(); // Add logging


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "yourdomain.com", 
            ValidAudience = "yourdomain.com", 
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("http://localhost:3002") 
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});


builder.Services.AddSingleton(jwtKey);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseCors("AllowSpecificOrigin"); 
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "foto")),
    RequestPath = "/foto"
});

app.MapControllers();

app.Run();
