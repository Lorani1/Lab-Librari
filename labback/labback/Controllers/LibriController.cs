using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Threading.Tasks;
using labback.Models;
using Microsoft.Extensions.Logging;

namespace labback.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibriController : Controller
    {
        private readonly LibriContext _libriContext;
        private readonly Microsoft.AspNetCore.Hosting.IHostingEnvironment _hostingEnvironment;
        private readonly ILogger<LibriController> _logger;

        public Microsoft.AspNetCore.Hosting.IHostingEnvironment HostingEnvironment => _hostingEnvironment;

        public LibriController(LibriContext libriContext, Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, ILogger<LibriController> logger)
        {
            _libriContext = libriContext;
            _hostingEnvironment = hostingEnvironment;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetLibrat()
        {
            var librat = await _libriContext.Librat.ToListAsync();
            var baseUrl = $"{Request.Scheme}://{Request.Host}/foto/";

            foreach (var libri in librat)
            {
                libri.ProfilePictureUrl = $"{baseUrl}{libri.ProfilePicturePath}";
            }

            return Ok(librat);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLibri(int id)
        {
            var libri = await _libriContext.Librat.FindAsync(id);
            if (libri == null)
            {
                return NotFound();
            }

            var baseUrl = $"{Request.Scheme}://{Request.Host}/foto/";
            libri.ProfilePictureUrl = $"{baseUrl}{libri.ProfilePicturePath}";

            return Ok(libri);
        }

        [HttpPost]
        public async Task<ActionResult<Libri>> PostLibri([FromForm] LibriDTO model, IFormFile profilePicture)
        {
            if (ModelState.IsValid)
            {
                if (profilePicture != null && profilePicture.Length > 0)
                {
                    string uploadsFolder = Path.Combine(HostingEnvironment.WebRootPath, "foto");

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(profilePicture.FileName);
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await profilePicture.CopyToAsync(fileStream);
                    }

                    var libri = new Libri
                    {
                        Isbn = model.Isbn,
                        Titulli = model.Titulli,
                        Kategoria = model.Kategoria,
                        Lloji = model.Lloji,
                        VitiPublikimit = model.VitiPublikimit,
                        NrFaqeve = model.NrFaqeve,
                        NrKopjeve = model.NrKopjeve,
                        Gjuha = model.Gjuha,
                        InStock = model.InStock,
                        ProfilePicturePath = uniqueFileName,
                        ShtepiaBotueseID = model.ShtepiaBotueseID,
                    };

                    _libriContext.Librat.Add(libri);
                    await _libriContext.SaveChangesAsync();
                    return CreatedAtAction(nameof(GetLibri), new { id = libri.ID }, libri);
                }
                else
                {
                    ModelState.AddModelError("ProfilePicture", "Profile picture is required.");
                    return BadRequest(ModelState);
                }
            }

            return BadRequest(ModelState);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutLibri(int id, [FromForm] LibriDTO model, IFormFile profilePicture)
        {
            try
            {
                var libri = await _libriContext.Librat.FindAsync(id);
                if (libri == null)
                {
                    return NotFound();
                }

                if (ModelState.IsValid)
                {
                    libri.Isbn = model.Isbn;
                    libri.Titulli = model.Titulli;
                    libri.Kategoria = model.Kategoria;
                    libri.Lloji = model.Lloji;
                    libri.VitiPublikimit = model.VitiPublikimit;
                    libri.NrFaqeve = model.NrFaqeve;
                    libri.NrKopjeve = model.NrKopjeve;
                    libri.Gjuha = model.Gjuha;
                    libri.InStock = model.InStock;
                    libri.ShtepiaBotueseID = model.ShtepiaBotueseID;

                    if (profilePicture != null && profilePicture.Length > 0)
                    {
                        string uploadsFolder = Path.Combine(HostingEnvironment.WebRootPath, "foto");
                        if (!Directory.Exists(uploadsFolder))
                        {
                            Directory.CreateDirectory(uploadsFolder);
                        }

                        if (!string.IsNullOrEmpty(libri.ProfilePicturePath))
                        {
                            var oldFilePath = Path.Combine(uploadsFolder, libri.ProfilePicturePath);
                            if (System.IO.File.Exists(oldFilePath))
                            {
                                System.IO.File.Delete(oldFilePath);
                            }
                        }

                        string uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(profilePicture.FileName);
                        string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await profilePicture.CopyToAsync(fileStream);
                        }

                        libri.ProfilePicturePath = uniqueFileName;
                    }

                    _libriContext.Entry(libri).State = EntityState.Modified;
                    await _libriContext.SaveChangesAsync();

                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                // Log the exception
                _logger.LogError(ex, "An error occurred while updating the book record.");
                return StatusCode(500, "Internal server error");
            }

            return BadRequest(ModelState);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLibri(int id)
        {
            var libri = await _libriContext.Librat.FindAsync(id);
            if (libri == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(libri.ProfilePicturePath))
            {
                string uploadsFolder = Path.Combine(HostingEnvironment.WebRootPath, "foto");
                var filePath = Path.Combine(uploadsFolder, libri.ProfilePicturePath);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }

            _libriContext.Librat.Remove(libri);
            await _libriContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
