namespace TPOTLetters
{
    internal class RtfEditorViewModel : ViewModelBase
    {
        //private const string filePath = @"C:\Users\Nick\Desktop\TPOT Dev\ConversionTests\Rtf\TPOTLinksSample.rtf";

        private string rawRtf;
        public string RawRtf
        {
            get { return rawRtf; }
            set { SetValue(ref rawRtf, value); }
        }

        public RtfEditorViewModel()
        {
        }        
    }
}