using System.IO;
using System.Windows.Documents;

namespace System.Windows.Controls
{
    class EnhancedRichTextBox : RichTextBox
    {
        public string File
        {
            get { return (string)GetValue(FileProperty); }
            set { SetValue(FileProperty, value); }
        }

        public static DependencyProperty FileProperty =
            DependencyProperty.Register("File", typeof(string), typeof(EnhancedRichTextBox),
            new PropertyMetadata(new PropertyChangedCallback(OnFileChanged)));

        private static void OnFileChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            EnhancedRichTextBox rtf = d as EnhancedRichTextBox;
            if (d == null)
            {
                return;
            }

            ReadFile(rtf.File, rtf.Document);
        }

        private static void ReadFile(string inFilename, FlowDocument inFlowDocument)
        {
            if (System.IO.File.Exists(inFilename))
            {
                TextRange range = new TextRange(inFlowDocument.ContentStart, inFlowDocument.ContentEnd);
                FileStream fStream = new FileStream(inFilename, FileMode.Open, FileAccess.Read, FileShare.Read);

                range.Load(fStream, DataFormats.Rtf);
                fStream.Close();
            }
        }
    }
}
