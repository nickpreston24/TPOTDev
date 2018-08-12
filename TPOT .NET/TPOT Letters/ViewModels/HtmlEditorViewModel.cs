using Shared;
using System.Diagnostics;

namespace TPOTLetters
{
    public class HtmlEditorViewModel : TextAwareViewModel, ISubscriber<string>
    {
        private string html;
        public override string Content
        {
            get { return html; }
            set
            {
                SetValue(ref html, value);
                Debug.WriteLine("html set");
            }
        }

        public HtmlEditorViewModel()
        {
        }

        public override void Update(string html)
        {
            Content = html;
        }
    }
}