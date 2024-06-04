using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace labback.Models
{
    public class Stafi
    {
        [Key]
        public int ID { get; set; }
        public string? emri { get; set; }
        public string? mbiemri { get; set; }
        public long? nrPersonal { get; set; }
        public string? adresa { get; set; }
        public string? orari { get; set; }
        public int active { get; set; }

        public DateTime? data_E_Punesimit { get; set; }
        public DateTime? data_E_doreheqjes { get; set; }

        public long? nrTelefonit { get; set; }
        public string gjinia { get; set; }
        public int pozita_ID {  get; set; }
        public pozita pozita { get; set; }
      
    }
  
}
