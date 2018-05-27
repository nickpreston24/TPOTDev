using Shared;

namespace TPOTLetters
{
    public abstract class TextAwareViewModel : ViewModelBase, ISubscriber<string>
    {
        public abstract string Content { get; set; }
        public ISubject<string> Subject { get; set; }

        public abstract void Update(string html);
    }
}
