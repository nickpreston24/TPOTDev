using Shared;

namespace TPOTLetters
{
    internal interface IRtfEditor : ISubject<string>
    {
        void Load(Letter letter);
    }
}