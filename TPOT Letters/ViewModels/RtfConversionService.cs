using DesignPatterns;
using Shared;
using System.Collections.Generic;
using System.Diagnostics;

namespace TPOTLetters
{
    internal class RtfConversionService : IConversionService, ISingleton
    {
        private ILetterConverter converter;
        private readonly List<IViewSubscriber> subscribers = new List<IViewSubscriber>();
        public List<string> files { get; set; } = new List<string>(0);
        public static IConversionService Instance => Singleton<RtfConversionService>.Instance;
        public ISelector Selector { get; set; }

        private RtfConversionService()
        {
            converter = GetDefaultConverter();
        }

        public void QueueFile(string filePath)
        {
            if (files.Contains(filePath))
            {
                return;
            }

            files.Add(filePath);
        }

        //public RtfConversionService(string[] filePaths)
        //{
        //    converter = GetDefaultConverter();
        //}

        //public RtfConversionService(ILetterConverter letterConverter)
        //{
        //    converter = letterConverter ?? GetDefaultConverter();
        //}

        //public RtfConversionService(string filePath, ConverterType type)
        //{
        //    converter = RtfConverters.GetConverter(filePath, type);
        //}

        public void Register(params IViewSubscriber[] subscribers)
        {
            if (subscribers.Length == 0)
            {
                return;
            }

            this.subscribers.AddRange(subscribers);
        }

        public void RunConversions()
        {
            foreach (string file in files)
            {
                converter.FilePath = file;
                converter.Convert();
                Update();
            }
        }

        public void Update()
        {
            Debug.WriteLine(converter.Result);
            foreach (var subscriber in subscribers)
            {
                subscriber.Update(text: converter.Result);
            }
        }


        private static ILetterConverter GetDefaultConverter()
        {
            return RtfConverters.GetConverter(ConverterType.RtfPipe);
        }
    }
}