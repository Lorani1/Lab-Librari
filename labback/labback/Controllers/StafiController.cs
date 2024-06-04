using labback.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace labback.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StafiController : ControllerBase
    {
        private readonly LibriContext _LibriContext;

        public StafiController(LibriContext klientContext)
        {
            _LibriContext = klientContext;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Stafi>>> GetAllStafi()
        {
            if (_LibriContext.Stafis == null)
            {
                return NotFound("Stafi set is null.");
            }
            return await _LibriContext.Stafis.Include(s => s.pozita).ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Stafi>> GetStafiById(int id)
        {
            if (_LibriContext.Stafis == null)
            {
                return NotFound("Stafi set is null.");
            }
            var stafi = await _LibriContext.Stafis.Include(s => s.pozita).FirstOrDefaultAsync(s => s.ID == id);
            if (stafi == null)
            {
                return NotFound();
            }
            return stafi;
        }

        [HttpPost("add")]
        public async Task<ActionResult<Stafi>> AddStafi(Stafi stafi)
        {
            var existingPozita = await _LibriContext.Pozitat.FirstOrDefaultAsync(p => p.pozita_ID == stafi.pozita_ID);

            if (existingPozita == null)
            {
                return BadRequest("Invalid Pozita ID");
            }

            stafi.pozita = existingPozita;

            // Handle data_E_Punesimit and data_E_doreheqjes based on active status
            if (stafi.active == 1)
            {
                stafi.data_E_Punesimit = DateTime.Now;
                stafi.data_E_doreheqjes = null;
            }
            else
            {
                stafi.data_E_doreheqjes = DateTime.Now;
                stafi.data_E_Punesimit = null;
            }

            _LibriContext.Stafis.Add(stafi);
            await _LibriContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStafiById), new { id = stafi.ID }, stafi);
        }


        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateStafi(int id, Stafi stafi)
        {
            if (id != stafi.ID)
            {
                return BadRequest("ID mismatch.");
            }

            var existingPozita = await _LibriContext.Pozitat.FirstOrDefaultAsync(p => p.pozita_ID == stafi.pozita_ID);

            if (existingPozita == null)
            {
                return BadRequest("Invalid Pozita ID");
            }

            var existingStafi = await _LibriContext.Stafis.FindAsync(id);
            if (existingStafi == null)
            {
                return NotFound();
            }

            stafi.pozita = existingPozita;

            // Handle data_E_Punesimit and data_E_doreheqjes based on active status
            if (stafi.active == 1)
            {
                stafi.data_E_Punesimit = DateTime.Now;
                stafi.data_E_doreheqjes = null;
            }
            else
            {
                stafi.data_E_doreheqjes = DateTime.Now;
                stafi.data_E_Punesimit = null;
            }

            _LibriContext.Entry(existingStafi).CurrentValues.SetValues(stafi);
            try
            {
                await _LibriContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StafiExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStafi(int id)
        {
            if (_LibriContext.Stafis == null)
            {
                return NotFound("Stafi set is null.");
            }
            var stafi = await _LibriContext.Stafis.FindAsync(id);
            if (stafi == null)
            {
                return NotFound();
            }
            _LibriContext.Stafis.Remove(stafi);
            await _LibriContext.SaveChangesAsync();
            return Ok();
        }

        private bool StafiExists(int id)
        {
            return _LibriContext.Stafis.Any(e => e.ID == id);
        }
    }
}