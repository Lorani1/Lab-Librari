﻿namespace labback.Models
{
    public class Klient
    {
        public int ID { get; set; }
        public string Emri { get; set; }
        public string Mbiemri { get; set; }
        public int NrPersonal { get; set; }
        public string Email { get; set; }
        public string Adresa { get; set; }
        public string Statusi { get; set; }
        public int NrTel { get; set; }
        public string Password { get; set; }

        
        public int QytetiID { get; set; }
        public Qyteti Qyteti { get; set; } 
    }
}