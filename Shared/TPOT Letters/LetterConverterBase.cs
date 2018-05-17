using RtfPipe;
using System.IO;

namespace Shared
{
    abstract class LetterConverterBase : ILetterConverter
    {
        protected string lines;
        protected string html;

        protected IRtfDocument rtfDocument;
        protected string filePath;

        public string Result { get { return html; } }
        public string FilePath { get => filePath; set => filePath = value; }

        protected LetterConverterBase()
        {
        }

        public LetterConverterBase(string filepath)
        {
            FilePath = filepath;
        }

        protected void ReadFile()
        {
            lines = File.ReadAllText(filePath);
        }

        public abstract string Convert();
    }
}
