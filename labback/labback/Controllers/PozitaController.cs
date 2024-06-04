using labback.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace labback.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PozitaController : ControllerBase
    {
        private readonly LibriContext _LibriContext;

        public PozitaController(LibriContext klientContext)
        {
            _LibriContext = klientContext;
        }

        [HttpGet("KejtPozitat")]
        public async Task<ActionResult<IEnumerable<pozita>>> GetPozitat()
        {
            if (_LibriContext.Pozitat == null)
            {
                return NotFound();
            }
            return await _LibriContext.Pozitat.ToListAsync();
        }

        [HttpGet("{pozita_ID}")]
        public async Task<ActionResult<pozita>> GetPozita(int pozita_ID)
        {
            if (_LibriContext.Pozitat == null)
            {
                return NotFound();
            }
            var klient = await _LibriContext.Pozitat.FindAsync(pozita_ID);
            if (klient == null)
            {
                return NotFound();
            }
            return klient;
        }

        [HttpPost("add/ShtoPozita")]
        public async Task<ActionResult<pozita>> PostPozita(pozita pozitat)
        {
            _LibriContext.Pozitat.Add(pozitat);
            await _LibriContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPozitat), new { id = pozitat.pozita_ID }, pozitat);
        }


        [HttpPut("update/{pozita_ID}")]
        public async Task<ActionResult> PutPozita(int pozita_ID, pozita Pozita)
        {
            if (pozita_ID != Pozita.pozita_ID)
            {
                return BadRequest();
            }

            _LibriContext.Entry(Pozita).State = EntityState.Modified;
            try
            {
                await _LibriContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }


        [HttpDelete("delete/{pozita_ID}")]

        public async Task<ActionResult> DeletePozita(int pozita_ID)
        {
            if (_LibriContext.Pozitat == null)
            {
                return NotFound();
            }
            var klient = await _LibriContext.Pozitat.FindAsync(pozita_ID);
            if (klient == null)
            {
                return NotFound();
            }
            _LibriContext.Pozitat.Remove(klient);
            await _LibriContext.SaveChangesAsync();
            return Ok();
        }
    }
}
