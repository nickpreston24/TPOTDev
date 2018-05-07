using Shared;

namespace TPOTLetters
{
    internal class HtmlEditorViewModel : ViewModelBase, IHtmlSubscriber
    {
        private string convertedHtml;

        public string ConvertedHtml
        {
            get { return convertedHtml; }
            set { SetValue(ref convertedHtml, value); }
        }

        public HtmlEditorViewModel()
        {
        }

        public void Update(string html)
        {
            convertedHtml = html;
        }
    }
}