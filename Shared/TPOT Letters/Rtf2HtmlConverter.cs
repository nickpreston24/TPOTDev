using Itenso.Rtf;
using Itenso.Rtf.Converter.Html;
using Itenso.Rtf.Support;
using System.IO;

namespace Shared.TPOT_Letters
{
    public class Rtf2HtmlConverter
    {
        private IRtfDocument rtfDocument;
        private string filePath;

        public Rtf2HtmlConverter(string filepath)
        {
            filePath = filepath;
        }

        public string Convert()
        {
            try
            {
                string lines = File.ReadAllText(filePath);
                rtfDocument = RtfInterpreterTool.BuildDoc(lines);
                var htmlConverter = new RtfHtmlConverter(rtfDocument);
                return htmlConverter.Convert();
            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}
