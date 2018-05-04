using Shared;

namespace TPOTLetters
{
    internal class HtmlEditorViewModel : ViewModelBase
    {
        private string convertedHtml;
        private ILetterConverter converter;

        public string ConvertedHtml
        {
            get { return convertedHtml; }
            set { SetValue(ref convertedHtml, value); }
        }

        public HtmlEditorViewModel()
        {
            converter = RtfConverters.GetConverter(ConverterType.RtfPipe);
        }

        void Update()
        {
            convertedHtml = converter.Result;
        }
    }
}