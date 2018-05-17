using Shared;

namespace TPOTLetters
{
    public abstract class TextAwareViewModel : ViewModelBase, IViewSubscriber
    {
        public abstract void Update(string html);
    }
}
