using labback.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace labback { 

public class Libri
{


        public int ID { get; set; }
        public string Isbn { get; set; }
        public string Titulli { get; set; }
        public string Kategoria { get; set; }
        public int VitiPublikimit { get; set; }
        public int NrFaqeve { get; set; }
        public int NrKopjeve { get; set; }
        public string Gjuha { get; set; }
        public int InStock { get; set; }
        public string ProfilePicturePath { get; set; }
        [NotMapped]
        public string ProfilePictureUrl { get; set; }


        public int ShtepiaBotueseID { get; set; } // Foreign key
        public ShtepiaBotuese ShtepiaBotuese { get; set; } // Navigation property

        public int zhanriId { get; set; } // Foreign key
        public Zhanri zhanri { get; set; } // Navigation property

    }

}