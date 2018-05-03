using RtfPipe;
using System.IO;

namespace Shared
{
    /// <summary>
    /// RtfPipeConverter
    /// https://github.com/erdomke/RtfPipe
    /// </summary>
    internal class RtfPipeConverter : Rtf2HtmlConverterBase
    {
        public RtfPipeConverter(string filepath) : base(filepath)
        {
        }

        public override string Convert()
        {
            string lines = File.ReadAllText(filePath);
            string html = Rtf.ToHtml(lines);
            return html;
        }
    }
}
