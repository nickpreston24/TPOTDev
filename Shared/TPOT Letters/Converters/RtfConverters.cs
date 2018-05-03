namespace Shared
{
    public static class RtfConverters
    {
        public static IRtf2HtmlConverter GetConverter(string filePath, ConverterType type)
        {
            switch (type)
            {
                case ConverterType.RtfPipe:
                    return new RtfPipeConverter(filePath);
                case ConverterType.Intenso:
                    return new IntensoRtf2HtmlConverter(filePath);
                default:
                    return new RtfPipeConverter(filePath);
            }
        }
    }

}
