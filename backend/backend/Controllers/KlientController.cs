using labback.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections;
using System.Threading.Tasks;


namespace labback.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KlientController : ControllerBase
    {
        private readonly KlientContext _klientContext;


        public KlientController(KlientContext klientContext)
        {
            _klientContext = klientContext;

        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Klient>>> GetKlients()
        {
            if (_klientContext.Klients == null)
            {
                return NotFound();
            }
            return await _klientContext.Klients.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Klient>> GetKlient(int id)
        {
            if (_klientContext.Klients == null)
            {
                return NotFound();
            }
            var klient = await _klientContext.Klients.FindAsync(id);
            if (klient == null)
            {
                return NotFound();
            }
            return klient;
        }
       

      
        [HttpPost]
        public async Task<ActionResult<Klient>> PostKlient(RegistrationEntity model)
        {
            Klient klient = new Klient
            {
                Emri = model.Emri,
                Mbiemri = model.Mbiemri,
                NrPersonal = model.NrPersonal,
                Email = model.Email,
                Adresa = model.Adresa,
                Statusi = model.Statusi,
                NrTel = model.NrTel,
                Password = model.Password
            };

            _klientContext.Klients.Add(klient);
            await _klientContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetKlient), new { id = klient.ID }, klient);
        }



        [HttpPut("{id}")]
        public async Task<ActionResult> PutKlient(int id, Klient klient)
        {
            if (id != klient.ID)
            {
                return BadRequest();
            }

            _klientContext.Entry(klient).State = EntityState.Modified;
            try
            {
                await _klientContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }
        [HttpPost("login")]
        public async Task<ActionResult<Klient>> Login(LoginEntity model)
        {
            var klient = await _klientContext.Klients.FirstOrDefaultAsync(k => k.Email == model.Email && k.Password == model.Password);

            if (klient == null)
            {
                return NotFound("Invalid email or password.");
            }

            // You can customize the response based on successful login, such as returning a JWT token or setting a session.
            return Ok(klient);
        }


        [HttpDelete("{id}")]

        public async Task<ActionResult> DeleteKlient(int id)
        {
            if (_klientContext.Klients == null)
            {
                return NotFound();
            }
            var klient = await _klientContext.Klients.FindAsync(id);
            if (klient == null)
            {
                return NotFound();
            }
            _klientContext.Klients.Remove(klient);
            await _klientContext.SaveChangesAsync();
            return Ok();
        }
    }
}
