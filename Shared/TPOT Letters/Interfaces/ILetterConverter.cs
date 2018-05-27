namespace Shared
{
    public interface ILetterConverter
    {
        string Convert(string text);
        string Result { get; }
    }
}
