using Itenso.Rtf;

namespace Shared
{
    internal abstract class Rtf2HtmlConverterBase : IRtf2HtmlConverter
    {
        protected IRtfDocument rtfDocument;
        protected string filePath;
        public string FilePath { get => filePath; set => filePath = value; }

        public Rtf2HtmlConverterBase(string filepath)
        {
            FilePath = filepath;
        }

        public abstract string Convert();
    }
}
