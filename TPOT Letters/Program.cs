using System;

namespace TpotLetters
{
    class Program
    {
        static void Main(string[] args)
        {
            string path = @"..\..\tpotSampleLetter.rtf";
            var reader = LetterManager.GetReader(path);
            Console.WriteLine(reader.RawText);
            //Console.WriteLine(reader.SpecialText);
            Console.ReadLine();
        }
    }

}
