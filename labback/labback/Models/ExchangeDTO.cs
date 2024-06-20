namespace labback.Models
{
    public class ExchangeDTO
    {
        public int ExchangeId { get; set; }
        public int KlientId { get; set; } // Use email for KlientId in frontend
        public int LibriId { get; set; } // Use title and ISBN for LibriId in frontend
        public int NrPersonal { get; set; }

        public string Status { get; set; }
        public DateTime ExchangeDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public bool IsApproved { get; set; } // New property
    }
}
