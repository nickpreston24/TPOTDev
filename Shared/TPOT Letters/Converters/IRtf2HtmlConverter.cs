namespace Shared
{
    public interface IRtf2HtmlConverter
    {
        string FilePath { get; set; }
        string Convert();
    }
}
