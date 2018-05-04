using Shared;
using System.Collections.Generic;

namespace TPOTLetters
{
    internal class HtmlConversionService
    {
        private ILetterConverter converter;
        private List<IHtmlSubscriber> subscribers = new List<IHtmlSubscriber>();
        private string filePath;
        public string FilePath { get => filePath; set => filePath = value; }

        public HtmlConversionService()
        {
            converter = GetDefaultConverter();
            converter.FilePath = filePath;
        }

        public HtmlConversionService(ILetterConverter letterConverter)
        {
            converter = letterConverter ?? GetDefaultConverter();
            converter.FilePath = filePath;
        }

        public HtmlConversionService(string filePath, ConverterType type)
        {
            converter = RtfConverters.GetConverter(filePath, type);
        }

        public void Register(IHtmlSubscriber[] htmlSubscribers)
        {
            subscribers.AddRange(htmlSubscribers);
        }

        public void RunConversion()
        {
            converter.Convert();
            Update();
        }

        private void Update()
        {
            foreach (var subscriber in subscribers)
            {
                subscriber.Update(html: converter.Result);
            }
        }

        private static ILetterConverter GetDefaultConverter()
        {
            return RtfConverters.GetConverter(ConverterType.RtfPipe);
        }
    }
}