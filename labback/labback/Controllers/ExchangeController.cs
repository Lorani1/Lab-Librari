using labback.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace labback.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExchangeController : ControllerBase
    {
        private readonly LibriContext _context;

        public ExchangeController(LibriContext context)
        {
            _context = context;
        }

        // GET: api/Exchange
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exchange>>> GetExchanges()
        {
            return await _context.Exchanges.ToListAsync();
        }

        // GET: api/Exchange/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Exchange>> GetExchange(int id)
        {
            var exchange = await _context.Exchanges.FindAsync(id);

            if (exchange == null)
            {
                return NotFound();
            }

            return exchange;
        }

        // POST: api/Exchange
        [HttpPost]
        public async Task<ActionResult<Exchange>> PostExchange(ExchangeDTO exchangeDTO)
        {
            try
            {
                // Retrieve Klient by ID
                var klient = await _context.Klients.FindAsync(exchangeDTO.KlientId);

                if (klient == null)
                {
                    return BadRequest("Invalid klient ID.");
                }

                // Retrieve Libri by ID
                var libri = await _context.Librat.FindAsync(exchangeDTO.LibriId);

                if (libri == null)
                {
                    return BadRequest("Invalid Libri ID.");
                }

                // Create new Exchange
                var exchange = new Exchange
                {
                    KlientId = klient.ID,
                    LibriId = libri.ID,
                    Status = "Active", // Initial status
                    ExchangeDate = DateTime.Now,
                    ReturnDate = DateTime.Now.AddDays(14) // 14 days from ExchangeDate
                };

                _context.Exchanges.Add(exchange);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetExchange), new { id = exchange.ExchangeId }, exchange);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error creating exchange: {ex.Message}");
            }
        }

        // PUT: api/Exchange/{id}
        // PUT: api/Exchange/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<Exchange>> UpdateExchange(int id, Exchange updatedExchange)
        {
            if (id != updatedExchange.ExchangeId)
            {
                return BadRequest("Exchange ID mismatch.");
            }

            _context.Entry(updatedExchange).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExchangeExists(id))
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

        private bool ExchangeExists(int id)
        {
            return _context.Exchanges.Any(e => e.ExchangeId == id);
        }


        // DELETE: api/Exchange/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExchange(int id)
        {
            var exchange = await _context.Exchanges.FindAsync(id);
            if (exchange == null)
            {
                return NotFound();
            }

            _context.Exchanges.Remove(exchange);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}