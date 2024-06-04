using System.ComponentModel.DataAnnotations;

namespace labback.Models
{
    public class pozita
    {
        [Key] public int pozita_ID { get; set; }
        public string roli {  get; set; }

    }
}
