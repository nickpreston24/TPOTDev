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
                //case ConverterType.Intenso:
                //    return new IntensoRtf2HtmlConverter();
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
                //case ConverterType.Intenso:
                //    return new IntensoRtf2HtmlConverter(filePath);
                default:
                    return new RtfPipeConverter(filePath);
            }
        }
    }

}
