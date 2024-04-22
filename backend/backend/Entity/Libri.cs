namespace backcrud.Entity
{
    public class Libri

    {

        public int ID { get; set; }
        public string? Isbn { get; set; }
        public string? Titulli { get; set; }
        public string? Kategoria { get; set; }
        public string? Lloji { get; set; }
        public int VitiPublikimit { get; set; }
        public int NrFaqeve { get; set; }
        public int NrKopjeve { get; set; }
        public string? Gjuha { get; set; }
        public string ImagePath { get; set; }
        public int InStock { get; set; }
    }
}
