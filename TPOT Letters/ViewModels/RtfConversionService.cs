using Shared;
using System.Diagnostics;
using System.Linq;

namespace TPOTLetters
{
    internal class RtfConversionService : IConversionService, ISingleton
    {
        private ILetterConverter letterConverter;
        private ISubject<string> subject;

        public static RtfConversionService Instance => Singleton<RtfConversionService>.Instance;
        public ISelector Selector { get; set; }

        private RtfConversionService()
        {
            letterConverter = GetDefaultConverter();
        }

        public void RegisterSubscribers(ISubject<string> subject, params ISubscriber<string>[] subscribers)
        {
            this.subject = subject;

            foreach (var subscriber in subscribers ?? Enumerable.Empty<ISubscriber<string>>())
            {
                subject.Register(subscriber);
            }
        }

        public void RunConversions()
        {
            //todo: listen to the RTF box control text by:
            //Binding the RTF box control's streamed content directly to a property.
            //Having that same text loaded to an observable.
            //Observing that instance with this service.
            //Updating all subscribers to this service with the newly translated html.

            string text = subject.Content;
            letterConverter.Convert(text);
            UpdateSubscribers();
        }

        public void UpdateSubscribers()
        {
            Debug.WriteLine(letterConverter.Result);
            foreach (var subscriber in subject.Subscribers)
            {
                subscriber.Update(text: letterConverter.Result);
            }
        }

        private static ILetterConverter GetDefaultConverter()
        {
            return RtfConverters.GetConverter(ConverterType.RtfPipe);
        }
    }
}