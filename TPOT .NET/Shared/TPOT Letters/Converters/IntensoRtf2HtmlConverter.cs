using Itenso.Rtf.Support;
using System.IO;

namespace Shared
{
    /// <summary>
    /// IntensoConverter
    /// From: https://www.codeproject.com/Articles/27431/Writing-Your-Own-RTF-Converter
    /// </summary>
    internal class IntensoRtf2HtmlConverter : Rtf2HtmlConverterBase
    {
        public IntensoRtf2HtmlConverter()
        {
        }

        public IntensoRtf2HtmlConverter(string filePath) : base(filePath)
        {
        }

        public override string Convert()
        {
            try
            {
                string lines = File.ReadAllText(filePath);
                rtfDocument = RtfInterpreterTool.BuildDoc(lines);
                var htmlConverter = new Itenso.Rtf.Converter.Html.RtfHtmlConverter(rtfDocument);
                html = htmlConverter.Convert();
                return html;
            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}
