namespace Shared
{
    public interface ILetterConverter
    {
        string FilePath { get; set; }
        string Convert();
        string Result { get; }
    }
}
