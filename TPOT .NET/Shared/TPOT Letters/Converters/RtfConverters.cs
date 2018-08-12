namespace Shared
{
    public static class RtfConverters
    {
        public static ILetterConverter GetConverter(ConverterType type)
        {
            switch (type)
            {
                case ConverterType.RtfPipe:
                    return new RtfPipeConverter();
                default:
                    return new RtfPipeConverter();
            }
        }

        public static ILetterConverter GetConverter(string filePath, ConverterType type)
        {
            switch (type)
            {
                case ConverterType.RtfPipe:
                    return new RtfPipeConverter(filePath);
                default:
                    return new RtfPipeConverter(filePath);
            }
        }
    }

}
