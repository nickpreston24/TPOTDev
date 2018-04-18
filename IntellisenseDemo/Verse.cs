namespace IntellisenseDemo
{
    public class Verse
    {
        private string text;

        public Verse(string text)
        {
            this.text = text;
        }

        public bool IsLegit { get; internal set; } = true; //todo: use pattern matching to determine whether this is a direct quote or not.
    }
}