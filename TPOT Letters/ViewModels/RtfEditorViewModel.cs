using Shared;
using System.Linq;

namespace TPOTLetters
{
    public class RtfEditorViewModel : ViewModelBase, IViewSubscriber
    {
        private string rawRtf;
        public string RawRtf
        {
            get { return rawRtf; }
            set
            {
                SetValue(ref rawRtf, value);
            }
        }
        public void Update(string rtfText)
        {
            RawRtf = rtfText;
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
            //htmlConversionService = new RtfConversionService(letter.FilePath, ConverterType.RtfPipe);
            //htmlConversionService.Register(Subscriber);
        }

    }
}