using labback.Models;
using labback;
using System.ComponentModel.DataAnnotations;

public class RatingComment
{
    [Key]
    public int RatingsCommentID { get; set; }

    public int Rating { get; set; }
    public string Comment { get; set; }

    // Foreign key for Klient
    public int KlientID { get; set; }
    public Klient Klient { get; set; }

    // Foreign key for Libri
    public int LibriID { get; set; }
    public Libri Libri { get; set; }
}