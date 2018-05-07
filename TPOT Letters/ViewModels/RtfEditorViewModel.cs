using Shared;
using System.IO;
using System.Linq;

namespace TPOTLetters
{
    public class RtfEditorViewModel : ViewModelBase
    {
        HtmlConversionService htmlConversionService = new HtmlConversionService();
        private IHtmlSubscriber subscriber;
        public IHtmlSubscriber Subscriber { get => subscriber; set => subscriber = value; }

        private string rawRtf = "I have text";
        public string RawRtf
        {
            get { return rawRtf; }
            set
            {
                SetValue(ref rawRtf, value);
                htmlConversionService.RunConversion();
            }
        }

        public RtfEditorViewModel()
        {
            Setup();
        }

        private void Setup()
        {
            var letters = new Letter[]
            {
                new Letter { FilePath = @"..\..\..\ConversionTests\Rtf\TPOTLinksSample.rtf" },
                new Letter { FilePath = @"Sample.rtf" },
            };

            var letter = letters.First();
            //rawRtf = File.ReadAllText(letter.FilePath);

            htmlConversionService = new HtmlConversionService(letter.FilePath, ConverterType.RtfPipe);
            htmlConversionService.Register(Subscriber);
        }
    }
}