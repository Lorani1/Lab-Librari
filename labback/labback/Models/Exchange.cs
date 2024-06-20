namespace labback.Models
{
    public class Exchange
    {
        public int ExchangeId { get; set; }

        // Foreign key for Klient
        public int KlientId { get; set; }
        public Klient Klient { get; set; }

        // Foreign key for Libri
        public int LibriId { get; set; }
        public Libri Libri { get; set; }

        public string Status { get; set; } // Consider using enum for status

        public DateTime ExchangeDate { get; set; }
        public DateTime ReturnDate { get; set; } // Automatically set to 14 days after ExchangeDate
        public bool IsApproved { get; set; } // New property

        public ICollection<Notification> Notifications { get; set; }
    }
}
