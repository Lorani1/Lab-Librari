﻿using System.ComponentModel.DataAnnotations;

namespace backend.Entity
{
    public class Autori
    {
        [Key]
        public int Autori_ID { get; set; }
        public string Emri {  get; set; }

        public string Mbiemri { get; set; }

        public string nofka { get; set; }

        public string Data_E_Lindjes { get; set; }

        public string Nacionaliteti { get; set; }

    }
}
