using System;
using System.IO;

namespace TpotLetters
{
    public class RtfLetterReader : ITPOTContentReader
    {
        public string RawText { get; set; } = null;
        public string SpecialText { get; set; } = null;
        private static string _filePath;
        System.Windows.Forms.RichTextBox richTextBox = new System.Windows.Forms.RichTextBox();

        public RtfLetterReader(string filePath)
        {
            _filePath = filePath;
            Read();
        }

        public void Read()
        {
            try
            {
                if (!File.Exists(_filePath))
                {
                    throw new FileNotFoundException(_filePath);
                }

                RawText = File.ReadAllText(_filePath);
                richTextBox.Text = RawText;
                SpecialText = richTextBox.Text;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
