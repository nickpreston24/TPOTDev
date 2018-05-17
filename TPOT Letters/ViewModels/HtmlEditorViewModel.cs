using Shared;

namespace TPOTLetters
{
    public class HtmlEditorViewModel : TextAwareViewModel, IViewSubscriber
    {
        // INotifyable Property _html        
        private string html;
        public string Html
        {
            get { return html; }
            set { SetValue(ref html, value); }
        }
        //private string convertedHtml;
        //public string Html
        //{
        //    get { return GetValue(() => html); }
        //    set { SetValue(ref convertedHtml, value); }
        //}

        public HtmlEditorViewModel()
        {

        }

        public override void Update(string html)
        {
            Html = html;
        }
    }
}