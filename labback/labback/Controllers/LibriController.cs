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
                        VitiPublikimit = model.VitiPublikimit,
                        NrFaqeve = model.NrFaqeve,
                        NrKopjeve = model.NrKopjeve,
                        Gjuha = model.Gjuha,
                        InStock = model.InStock,
                        ProfilePicturePath = uniqueFileName,
                        ShtepiaBotueseID = model.ShtepiaBotueseID,
                        zhanriId = model.zhanriId,
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
                    libri.VitiPublikimit = model.VitiPublikimit;
                    libri.NrFaqeve = model.NrFaqeve;
                    libri.NrKopjeve = model.NrKopjeve;
                    libri.Gjuha = model.Gjuha;
                    libri.InStock = model.InStock;
                    libri.ShtepiaBotueseID = model.ShtepiaBotueseID;
                    libri.zhanriId = model.zhanriId;

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

                return BadRequest(ModelState);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the book record.");
                return StatusCode(500, "Internal server error");
            }
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
        [HttpGet("count")]
        public IActionResult GetBookCount()
        {
            try
            {
                var bookCount = _libriContext.Librat.Count();
                return Ok(new { count = bookCount });
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        //Autori-Libri Many To Many Relationship Methods

        [HttpGet("getAutoret/{id}")]
        public async Task<IActionResult> getAutoretPrejLibrit(int id)
        {
            var libri = await _libriContext.Librat
                .Include(l => l.AutoriLibris)
                .ThenInclude(al => al.Autoret)
                .FirstOrDefaultAsync(l => l.ID == id);

            if (libri == null)
            {
                return NotFound();
            }

            var autori = libri.AutoriLibris.Select(al => new AutoriDTO
            {
                Emri = al.Autoret.Emri,
                Mbiemri = al.Autoret.Mbiemri,
                Nofka = al.Autoret.nofka,
                Gjinia = al.Autoret.gjinia,
                Data_E_Lindjes = al.Autoret.Data_E_Lindjes,
                Nacionaliteti = al.Autoret.Nacionaliteti
            }).ToList();

            return Ok(autori);
        }

        [HttpPost("{id}/ShtoAutorin/{autori_ID}")]
        public async Task<ActionResult> AddAuthorToBook(int id, int autori_ID)
        {
            var book = await _libriContext.Librat.FindAsync(id);
            if (book == null)
                return NotFound("Book not found.");

            var author = await _libriContext.Autori.FindAsync(autori_ID);
            if (author == null)
                return NotFound("Author not found.");

            var autoriLibri = new AutoriLibri
            {
                ID = id,
                Autori_ID = autori_ID
            };

            _libriContext.AutoriLibris.Add(autoriLibri);
            await _libriContext.SaveChangesAsync();

            return Ok();
        }


        [HttpDelete("{id}/delete/{autori_ID}")]
        public async Task<ActionResult> RemoveAuthorFromBook(int id, int autori_ID)
        {
            var autoriLibri = await _libriContext.AutoriLibris
                .FirstOrDefaultAsync(al => al.ID == id && al.Autori_ID == autori_ID);

            if (autoriLibri == null)
                return NotFound("Relationship not found.");

            _libriContext.AutoriLibris.Remove(autoriLibri);
            await _libriContext.SaveChangesAsync();

            return Ok();
        }

    }
}
