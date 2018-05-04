using Shared;
using System.Diagnostics;

namespace TPOTLetters
{
    public class MainViewModel : ViewModelBase
    {
        private static IRtf2HtmlConverter converter;

        private Letter letter;
        public Letter Letter
        {
            get { return letter; }
            set { SetValue(ref letter, value); }
        }

        public MainViewModel()
        {
            //var manager = new TPOTFileManager(".rtf");
            //letter = new Letter
            //{
            //    FilePath = manager.FirstFilePath,
            //};

            letter = new Letter { FilePath = @"..\..\..\ConversionTests\Rtf\TPOTLinksSample.rtf" };
            //C:\Users\Nick\Desktop\TPOT Dev\ConversionTests\Rtf
            converter = RtfConverters.GetConverter(letter.FilePath, ConverterType.RtfPipe);
        }

        internal void RunConversion()
        {
            if (string.IsNullOrWhiteSpace(Letter.FilePath))
            {
                return;
            }

            try
            {
                Letter.Html = converter.Convert();
                Debug.WriteLine(letter.HtmlFilePath);
                Process.Start(Letter.HtmlFilePath, string.Format("/select, \"{0}\"", Letter.HtmlFilePath));
            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}
