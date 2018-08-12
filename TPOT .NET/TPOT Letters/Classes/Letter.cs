using System.IO;
using System.Text.RegularExpressions;

namespace TPOTLetters
{
    public class Letter
    {
        public string Html { get; set; }
        public string FilePath { get; set; }
        public string HtmlFilePath => Regex.Replace(Path.ChangeExtension(FilePath, ".html"), "\\Rtf\\", "\\Html\\");
    }
}