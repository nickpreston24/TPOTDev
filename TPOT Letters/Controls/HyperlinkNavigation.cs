using System;
using System.Diagnostics;
using System.Windows;

namespace TPOTLetters
{
    public class Hyperlink
    {
        public static bool NavigateToUrl(RoutedEventArgs args)
        {
            object source = args?.OriginalSource;

            try
            {
                if (source is System.Windows.Documents.Hyperlink link)
                {
                    Process.Start(link?.NavigateUri?.ToString());
                }
            }
            catch (Exception)
            {
                throw;
            }

            return true;
        }
    }
}
