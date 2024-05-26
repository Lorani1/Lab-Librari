using labback.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System;

namespace labback.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KlientController : ControllerBase
    {
        private readonly LibriContext _LibriContext;
        private readonly ILogger<KlientController> _logger;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public KlientController(LibriContext LibriContext, ILogger<KlientController> logger, IWebHostEnvironment hostingEnvironment)
        {
            _LibriContext = LibriContext;
            _logger = logger;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> GetKlients()
        {
            var klients = await _LibriContext.Klients.Include(k => k.Qyteti).ToListAsync();
            var baseUrl = $"{Request.Scheme}://{Request.Host}/foto/";

            foreach (var klient in klients)
            {
                klient.ProfilePictureUrl = $"{baseUrl}{klient.ProfilePicturePath}";
            }

            return Ok(klients);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetKlient(int id)
        {
            var klient = await _LibriContext.Klients.Include(k => k.Qyteti).FirstOrDefaultAsync(k => k.ID == id);
            if (klient == null)
            {
                return NotFound();
            }

            var baseUrl = $"{Request.Scheme}://{Request.Host}/foto/";
            klient.ProfilePictureUrl = $"{baseUrl}{klient.ProfilePicturePath}";

            return Ok(klient);
        }

        [HttpPost]
        public async Task<ActionResult<Klient>> PostKlient([FromForm] RegistrationModel model)
        {
            if (ModelState.IsValid)
            {
                if (model.ProfilePicturePath != null && model.ProfilePicturePath.Length > 0)
                {
                    string uploadsFolder = Path.Combine(_hostingEnvironment.WebRootPath, "foto");
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(model.ProfilePicturePath.FileName);
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await model.ProfilePicturePath.CopyToAsync(fileStream);
                    }

                    Klient klient = new Klient
                    {
                        Emri = model.Emri,
                        Mbiemri = model.Mbiemri,
                        NrPersonal = model.NrPersonal,
                        Email = model.Email,
                        Adresa = model.Adresa,
                        Statusi = model.Statusi,
                        NrTel = model.NrTel,
                        Password = BCrypt.Net.BCrypt.HashPassword(model.Password),
                        ProfilePicturePath = uniqueFileName,
                        QytetiID = model.QytetiID,
                    };

                    _LibriContext.Klients.Add(klient);
                    await _LibriContext.SaveChangesAsync();

                    // Include the Qyteti entity in the response
                    klient = await _LibriContext.Klients.Include(k => k.Qyteti).FirstOrDefaultAsync(k => k.ID == klient.ID);
                    klient.ProfilePictureUrl = $"{Request.Scheme}://{Request.Host}/foto/{klient.ProfilePicturePath}";

                    return CreatedAtAction(nameof(GetKlient), new { id = klient.ID }, klient);
                }
                else
                {
                    ModelState.AddModelError("ProfilePicturePath", "Profile picture is required.");
                    return BadRequest(ModelState);
                }
            }

            return BadRequest(ModelState);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutKlient(int id, [FromForm] RegistrationModel model)
        {
            var klient = await _LibriContext.Klients.FindAsync(id);
            if (klient == null)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                klient.Emri = model.Emri;
                klient.Mbiemri = model.Mbiemri;
                klient.NrPersonal = model.NrPersonal;
                klient.Email = model.Email;
                klient.Adresa = model.Adresa;
                klient.Statusi = model.Statusi;
                klient.NrTel = model.NrTel;
                klient.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);
                klient.QytetiID = model.QytetiID;

                if (model.ProfilePicturePath != null && model.ProfilePicturePath.Length > 0)
                {
                    string uploadsFolder = Path.Combine(_hostingEnvironment.WebRootPath, "foto");
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    if (!string.IsNullOrEmpty(klient.ProfilePicturePath))
                    {
                        var oldFilePath = Path.Combine(uploadsFolder, klient.ProfilePicturePath);
                        if (System.IO.File.Exists(oldFilePath))
                        {
                            System.IO.File.Delete(oldFilePath);
                        }
                    }

                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(model.ProfilePicturePath.FileName);
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await model.ProfilePicturePath.CopyToAsync(fileStream);
                    }

                    klient.ProfilePicturePath = uniqueFileName;
                }

                _LibriContext.Entry(klient).State = EntityState.Modified;
                await _LibriContext.SaveChangesAsync();

                return NoContent();
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKlient(int id)
        {
            var klient = await _LibriContext.Klients.FindAsync(id);
            if (klient == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(klient.ProfilePicturePath))
            {
                string uploadsFolder = Path.Combine(_hostingEnvironment.WebRootPath, "foto");
                var filePath = Path.Combine(uploadsFolder, klient.ProfilePicturePath);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }

            _LibriContext.Klients.Remove(klient);
            await _LibriContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginModel model)
        {
            try
            {
                _logger.LogInformation("Login attempt with email: {Email}", model.Email);

                var klient = await _LibriContext.Klients.FirstOrDefaultAsync(k => k.Email == model.Email);
                if (klient == null || !BCrypt.Net.BCrypt.Verify(model.Password, klient.Password))
                {
                    _logger.LogWarning("Login failed: Invalid email or password");
                    return NotFound("Invalid email or password");
                }

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Environment.GetEnvironmentVariable("JWT_SECRET");
                if (string.IsNullOrEmpty(key))
                {
                    throw new ArgumentNullException(nameof(key), "JWT_SECRET environment variable is not set");
                }

                var keyBytes = Encoding.UTF8.GetBytes(key);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, klient.ID.ToString()),
                        new Claim(ClaimTypes.Email, klient.Email)
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return Ok(new { token = tokenString, klient });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during login: {Message}", ex.Message);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
