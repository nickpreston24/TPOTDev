using RtfPipe;
using System.Diagnostics;

namespace Shared
{
    /// <summary>
    /// RtfPipeConverter
    /// https://github.com/erdomke/RtfPipe
    /// </summary>
    internal class RtfPipeConverter : LetterConverterBase
    {
        public RtfPipeConverter()
        {
        }

        public RtfPipeConverter(string filepath) : base(filepath)
        {
        }

        public override string Convert(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return string.Empty;
            }

            Debug.WriteLine(text);

            html = Rtf.ToHtml(text);
            return html;
        }
    }
}
