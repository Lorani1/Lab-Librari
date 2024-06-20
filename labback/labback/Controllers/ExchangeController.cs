using labback.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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
        public async Task<ActionResult<IEnumerable<object>>> GetExchanges()
        {
            var exchanges = await _context.Exchanges
                .Include(e => e.Klient)
                .Include(e => e.Libri)
                .Select(e => new
                {
                    e.ExchangeId,
                    Klient = new { e.KlientId, e.Klient.Email, e.Klient.Emri },
                    Libri = new { e.LibriId, e.Libri.Isbn, e.Libri.Titulli },
                    e.Status,
                    e.ExchangeDate,
                    e.ReturnDate
                })
                .ToListAsync();

            return exchanges;
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
        [HttpPost]
        public async Task<ActionResult<Exchange>> PostExchange(ExchangeDTO exchangeDTO)
        {
            try
            {
                // Retrieve Klient by nrPersonal
                var klient = await _context.Klients.FirstOrDefaultAsync(k => k.NrPersonal == exchangeDTO.NrPersonal);

                if (klient == null)
                {
                    return BadRequest("Invalid nrPersonal.");
                }

                // Retrieve Libri by ID
                var libri = await _context.Librat.FindAsync(exchangeDTO.LibriId);

                if (libri == null)
                {
                    return BadRequest("Invalid Libri ID.");
                }

                // Check if any exchange with the same LibriId has a ReturnDate equal to today's date
                bool hasReturnToday = await _context.Exchanges
                                                     .AnyAsync(e => e.LibriId == exchangeDTO.LibriId &&
                                                                    e.ReturnDate.Date == DateTime.Now.Date);

                if (hasReturnToday && libri.InStock == 0)
                {
                    // Set InStock to 1 if an exchange with today's return date is found and InStock is 0
                    libri.InStock = 1;
                    _context.Entry(libri).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                }

                // Check if the client already has an active exchange with the same LibriId
                bool existingActiveExchange = await _context.Exchanges
                                                            .AnyAsync(e => e.KlientId == klient.ID &&
                                                                           e.LibriId == exchangeDTO.LibriId &&
                                                                           e.Status == "Active");

                if (existingActiveExchange)
                {
                    return BadRequest("The client already has an active exchange for this book.");
                }

                // Count the number of active exchanges for the given LibriId
                int activeExchangeCount = await _context.Exchanges
                    .CountAsync(e => e.LibriId == exchangeDTO.LibriId && e.Status == "Active");

                // Compare the count of active exchanges with the number of copies (nrKopjeve)
                if (activeExchangeCount >= libri.NrKopjeve)
                {
                    // Update the inStock property to 0 and save changes
                    libri.InStock = 0;

                    _context.Entry(libri).State = EntityState.Modified;
                    await _context.SaveChangesAsync();

                    return BadRequest("The book is out of stock.");
                }

                // Create new Exchange
                var exchange = new Exchange
                {
                    KlientId = klient.ID,
                    LibriId = libri.ID,
                    Status = "Pending Approval", // Initial status
                    ExchangeDate = DateTime.Now,
                    ReturnDate = DateTime.Now.AddDays(14), // 14 days from ExchangeDate
                    IsApproved = false // Initially not approved
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
        [HttpPut("{id}")]
        public async Task<ActionResult<Exchange>> UpdateExchange(int id, ExchangeDTO exchangeDTO)
        {
            if (id != exchangeDTO.ExchangeId)
            {
                return BadRequest("Exchange ID mismatch.");
            }

            var exchange = await _context.Exchanges.FindAsync(id);
            if (exchange == null)
            {
                return NotFound();
            }

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

            // Update exchange properties
            exchange.KlientId = klient.ID;
            exchange.LibriId = libri.ID;
            exchange.Status = exchangeDTO.Status;
            exchange.ExchangeDate = exchangeDTO.ExchangeDate;
            exchange.ReturnDate = exchangeDTO.ReturnDate;

            _context.Entry(exchange).State = EntityState.Modified;

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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExchange(int id)
        {
            var exchange = await _context.Exchanges.FindAsync(id);
            if (exchange == null)
            {
                return NotFound();
            }

            // Find all related notifications and delete them
            var notifications = _context.Notifications.Where(n => n.exchangeId == id);
            _context.Notifications.RemoveRange(notifications);

            _context.Exchanges.Remove(exchange);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/Exchange/Approve/{id}
        [HttpPut("Approve/{id}")]
        public async Task<IActionResult> ApproveExchange(int id)
        {
            var exchange = await _context.Exchanges
                .Include(e => e.Libri) // Include related Libri entity
                .FirstOrDefaultAsync(e => e.ExchangeId == id);

            if (exchange == null)
            {
                return NotFound();
            }

            if (exchange.Libri == null)
            {
                return BadRequest("Libri not found for the exchange.");
            }

            exchange.Status = "Approved";

            try
            {
                await _context.SaveChangesAsync();

                // Create a notification for the klient
                var notification = new Notification
                {
                    message = $"Your exchange for Libri {exchange.Libri.Titulli} has been approved.",
                    isRead = false,
                    klientId = exchange.KlientId,
                    exchangeId = exchange.ExchangeId,
                    notificationTime = DateTime.Now // Set the current date and time
                };

                _context.Notifications.Add(notification);
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

        // GET: api/Exchange/CountByLibri/{libriId}
        [HttpGet("CountByLibri/{libriId}")]
        public async Task<ActionResult<int>> CountExchangesByLibri(int libriId)
        {
            try
            {
                int count = await _context.Exchanges
                    .CountAsync(e => e.LibriId == libriId);

                return Ok(count);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error counting exchanges: {ex.Message}");
            }
        }


        [HttpGet("PendingApprovalLast24To48Hours")]
        public async Task<ActionResult<IEnumerable<Exchange>>> GetPendingApprovalExchangesLast24To48Hours()
        {
            try
            {
                // Calculate the date range (24 to 48 hours ago)
                var startTime = DateTime.Now.AddHours(-48);
                var endTime = DateTime.Now.AddHours(-24);

                var exchanges = await _context.Exchanges
                    .Where(e => e.ExchangeDate >= startTime && e.ExchangeDate <= endTime && !e.IsApproved)
                    .ToListAsync();

                return Ok(exchanges);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving exchanges: {ex.Message}");
            }
        }
        // GET: api/Exchange/ByLoggedInKlient
        [HttpGet("ByLoggedInKlient")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<object>>> GetExchangesByLoggedInKlient()
        {
            try
            {
                // Get the logged-in klient's ID from claims
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null)
                {
                    return Unauthorized();
                }

                // Query exchanges for the logged-in klient
                var exchanges = await _context.Exchanges
                    .Include(e => e.Klient)
                    .Include(e => e.Libri)
                    .Where(e => e.KlientId.ToString() == userId)
                    .Select(e => new
                    {
                        e.ExchangeId,
                        Klient = new { e.KlientId, e.Klient.Email, e.Klient.Emri },
                        Libri = new { e.LibriId, e.Libri.Isbn, e.Libri.Titulli },
                        e.Status,
                        e.ExchangeDate,
                        e.ReturnDate
                    })
                    .ToListAsync();

                return exchanges;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving exchanges: {ex.Message}");
            }
        }

        // PUT: api/Exchange/EndExchange/{id}
        [HttpPut("EndExchange/{id}")]
        public async Task<IActionResult> EndExchange(int id)
        {
            try
            {
                var exchange = await _context.Exchanges.FindAsync(id);

                if (exchange == null)
                {
                    return NotFound();
                }

                // Update the status to "Ended"
                exchange.Status = "Ended";
                _context.Entry(exchange).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error ending exchange: {ex.Message}");
            }
        }


    }
}
