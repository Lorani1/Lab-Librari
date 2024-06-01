using labback.Models;
public class RatingCommentDto
{
    public int RatingsCommentID { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
    public int KlientID { get; set; }
    public string KlientName { get; set; } // To show the name of the client
    public int LibriID { get; set; }
    public string LibriTitle { get; set; } // To show the title of the bookTo show the title of the book
                                           // To show the title of the book
}
