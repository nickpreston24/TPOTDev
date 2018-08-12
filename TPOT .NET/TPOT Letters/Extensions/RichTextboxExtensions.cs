using System.IO;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;

namespace TPOTLetters
{
    public static class RichTextboxExtensions
    {
        public static string GetText(this RichTextBox textbox)
        {
            var textRange = new TextRange(textbox.Document.ContentStart, textbox.Document.ContentEnd);
            return textRange.Text;
        }

        public static string GetXaml(this RichTextBox textBox)
        {
            var textRange = new TextRange(textBox.Document.ContentStart,
                               textBox.Document.ContentEnd);
            var memoryStream = new MemoryStream();
            textRange.Save(memoryStream, DataFormats.Xaml);
            string xamlText = Encoding.Default.GetString(memoryStream.ToArray());
            return xamlText;
        }

        public static string GetRTF(this RichTextBox textBox)
        {
            string rtfFromRtb = string.Empty;
            using (var memoryStream = new MemoryStream())
            {
                var textRange = new TextRange(textBox.Document.ContentStart, textBox.Document.ContentEnd);
                textRange.Save(memoryStream, DataFormats.Rtf);
                memoryStream.Seek(0, SeekOrigin.Begin);
                using (var streamReader = new StreamReader(memoryStream))
                {
                    rtfFromRtb = streamReader.ReadToEnd();
                }
            }

            return rtfFromRtb;
        }

    }
}
