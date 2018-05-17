using RtfPipe;

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

        public override string Convert()
        {
            ReadFile();
            html = Rtf.ToHtml(lines);
            return html;
        }
    }
}
