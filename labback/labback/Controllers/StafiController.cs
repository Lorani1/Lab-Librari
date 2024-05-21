using labback.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace labback.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class StafiController : ControllerBase
    {
        private readonly StafiContext _stafiContext;

        public StafiController(StafiContext klientContext)
        {
            _stafiContext = klientContext;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Stafi>>> GetStafi()
        {
            if (_stafiContext.stafis == null)
            {
                return NotFound();
            }
            return await _stafiContext.stafis.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Stafi>> GetStafi(int id)
        {
            if (_stafiContext.stafis == null)
            {
                return NotFound();
            }
            var klient = await _stafiContext.stafis.FindAsync(id);
            if (klient == null)
            {
                return NotFound();
            }
            return klient;
        }

        [HttpPost]
        public async Task<ActionResult<Stafi>> PostKlient(Stafi stafi)
        {
            _stafiContext.stafis.Add(stafi);
            await _stafiContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetStafi), new { id = stafi.ID }, stafi);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutStafi(int id, Stafi stafi)
        {
            if (id != stafi.ID)
            {
                return BadRequest();
            }

            _stafiContext.Entry(stafi).State = EntityState.Modified;
            try
            {
                await _stafiContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> DeleteStafi(int id)
        {
            if (_stafiContext.stafis == null)
            {
                return NotFound();
            }
            var klient = await _stafiContext.stafis.FindAsync(id);
            if (klient == null)
            {
                return NotFound();
            }
            _stafiContext.stafis.Remove(klient);
            await _stafiContext.SaveChangesAsync();
            return Ok();
        }
    }
}