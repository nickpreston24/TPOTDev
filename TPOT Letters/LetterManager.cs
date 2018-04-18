namespace TpotLetters
{
    public class LetterManager
    {
        public static ITPOTContentReader GetReader(string path)
        {
            return new RtfLetterReader(path);
        }
    }

}
