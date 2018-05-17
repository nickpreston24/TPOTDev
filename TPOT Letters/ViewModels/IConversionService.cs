using Shared;

namespace TPOTLetters
{
    internal interface IConversionService
    {
        void QueueFile(string filePath);
        void RunConversions();
        void Update();
        void Register(params IViewSubscriber[] subscribers);
    }
}