

using labback.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace labback.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutoriController : ControllerBase
    {

        public readonly LibriContext _LibriContext;
        public AutoriController(LibriContext LibriContext) {

            _LibriContext = LibriContext;
        }
        //Read
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Autori>>> getAutoret()
        {
            if (_LibriContext.Autori == null) {
                return NotFound("Autoret nuk ekzitojn!");
            }

            return await _LibriContext.Autori.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Autori>> getAutoret(int id)
        {
            if (_LibriContext.Autori == null)
            {
                return NotFound("Autoret nuk ekzitojn!");
            }
            var autori = await _LibriContext.Autori.FindAsync(id);
            if (autori == null)
                return NotFound("Nuk ekziston sipas asaj ID");

            return autori;
        }

        [HttpPost]
        public async Task<ActionResult<Autori>> addAutori(Autori autori) {
            _LibriContext.Autori.Add(autori);
            await _LibriContext.SaveChangesAsync();

            return CreatedAtAction(nameof(getAutoret), new { id = autori.Autori_ID }, autori);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> putAutori(int id, Autori autori)
        {
            if (id != autori.Autori_ID)
                return BadRequest();

            _LibriContext.Entry(autori).State= EntityState.Modified;
            try {
                await _LibriContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                throw;
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteAutori(int id)
        {
            if (_LibriContext.Autori == null)
                return NotFound();
            var autori = await _LibriContext.Autori.FindAsync(id);
            if (autori == null)
                return NotFound();
            _LibriContext.Autori.Remove(autori);
            await _LibriContext.SaveChangesAsync();

            return Ok();

        }

        //AUTORI-LIBRI CONNECTION CODES
        //Merr Te Gjitha Librat qe ka ndihmuar ose shkruar Autori
        [HttpGet("librat/{Autori_ID}")]
        public async Task<ActionResult<IEnumerable<Libri>>> LibratPrejAutorit(int Autori_ID)
        {

            var librat = await _LibriContext.AutoriLibris
            .Where(al => al.Autori_ID == Autori_ID)
            .Include(al => al.Librat)
            .Select(al => al.Librat)
            .ToListAsync();

            return librat;
        }

        [HttpGet("librat/{Autori_ID}/count")]
        public async Task<ActionResult<int>> GetLibratCountPrejAutorit(int Autori_ID)
        {
            var libratCount = await _LibriContext.AutoriLibris
                .CountAsync(al => al.Autori_ID == Autori_ID);

            return libratCount;
        }



    }
}
