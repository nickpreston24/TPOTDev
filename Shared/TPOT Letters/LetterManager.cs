namespace TpotLetters
{
    public class LetterManager
    {
        public static ILetterReader GetReader(string path)
        {
            return new RtfLetterReader(path);
        }
    }

}
