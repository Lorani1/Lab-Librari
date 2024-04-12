
using backend.Enitity;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutoriController : ControllerBase
    {

        public readonly AutoriContext _autoriContext;
        public AutoriController(AutoriContext autoriContext) {

            _autoriContext = autoriContext;
        }
        //Read
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Autori>>> getAutoret()
        {
            if (_autoriContext.Autori == null) {
                return NotFound("Autoret nuk ekzitojn!");
            }

            return await _autoriContext.Autori.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Autori>> getAutoret(int id)
        {
            if (_autoriContext.Autori == null)
            {
                return NotFound("Autoret nuk ekzitojn!");
            }
            var autori = await _autoriContext.Autori.FindAsync(id);
            if (autori == null)
                return NotFound("Nuk ekziston sipas asaj ID");

            return autori;
        }

        [HttpPost]
        public async Task<ActionResult<Autori>> addAutori(Autori autori) {
            _autoriContext.Autori.Add(autori);
            await _autoriContext.SaveChangesAsync();

            return CreatedAtAction(nameof(getAutoret), new { id = autori.Autori_ID }, autori);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> putAutori(int id, Autori autori)
        {
            if (id != autori.Autori_ID)
                return BadRequest();

            _autoriContext.Entry(autori).State= EntityState.Modified;
            try {
                await _autoriContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                throw;
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteAutori(int id)
        {
            if (_autoriContext.Autori == null)
                return NotFound();
            var autori = await _autoriContext.Autori.FindAsync(id);
            if (autori == null)
                return NotFound();
            _autoriContext.Autori.Remove(autori);
            await _autoriContext.SaveChangesAsync();

            return Ok();

        }



    }
}
