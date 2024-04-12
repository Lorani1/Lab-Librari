using backcrud.Entity;
using backcrud.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace labback.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibriController : ControllerBase
    {
        private readonly LibriContext _libriContext;

        public LibriController(LibriContext libriContext)
        {
            _libriContext = libriContext;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Libri>>> GetLibrat()
        {
            if (_libriContext.Librat == null)
            {
                return NotFound();
            }
            return await _libriContext.Librat.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Libri>> GetLibri(int id)
        {
            if (_libriContext.Librat == null)
            {
                return NotFound();
            }
            var libri = await _libriContext.Librat.FindAsync(id);
            if (libri == null)
            {
                return NotFound();
            }
            return libri;
        }

        [HttpPost]
        public async Task<ActionResult<Libri>> PostLibri(Libri libri)
        {
            _libriContext.Librat.Add(libri);
            await _libriContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLibri), new { id = libri.ID }, libri);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutLibri(int id, Libri libri)
        {
            if (id != libri.ID)
            {
                return BadRequest();
            }

            _libriContext.Entry(libri).State = EntityState.Modified;
            try
            {
                await _libriContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> DeleteLibri(int id)
        {
            if (_libriContext.Librat == null)
            {
                return NotFound();
            }
            var libri = await _libriContext.Librat.FindAsync(id);
            if (libri == null)
            {
                return NotFound();
            }
            _libriContext.Librat.Remove(libri);
            await _libriContext.SaveChangesAsync();
            return Ok();
        }
    }
}
