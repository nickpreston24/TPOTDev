using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;

namespace TPOTApps.Shared
{
    public class TPOTHtmlFormatter : IHtmlFormatter
    {
        private static string filePath;

        private static List<KeyValuePair<string, string>> replacements = new List<KeyValuePair<string, string>>()
            {
                //new KeyValuePair<string,string>( "<span><p>", "<p>" ),
                //new KeyValuePair<string,string>( "</span><p>", "</p>" ),

                //Links:
                new KeyValuePair<string,string>( @"<u><span.+>(\w*)<(\w*)>", "<a href=&quot;$1&quot; target=&quot;_blank&quot;>$2</a>" ),
                //greater and less thans:
                new KeyValuePair<string,string>( "&lt;", "<" ),
                new KeyValuePair<string,string>( "&gt;", ">" ),
            };

        public TPOTHtmlFormatter(string filepath)
        {
            filePath = filepath;
        }

        /// <summary>
        /// Standard TPOT post format (html)
        /// </summary>
        /// <returns></returns>
        public string Format()
        {
            var htmlBuilder = new StringBuilder();

            foreach (string line in Read())
            {
                string cachedLine = line;
                string updatedHtml = "";

                foreach (var pair in replacements)
                {
                    try
                    {
                        updatedHtml = Regex.Replace(line, pair.Key, pair.Value);
                        cachedLine = updatedHtml;
                    }
                    catch (Exception ex)
                    {
                        Debug.WriteLine(string.Format("{0}: {1}", MethodBase.GetCurrentMethod().Name, ex.ToString()));
                        continue;
                    }
                }

                htmlBuilder.AppendLine(cachedLine);
            }

            return htmlBuilder.ToString();
        }

        private static IEnumerable<string> Read()
        {
            using (var reader = new StreamReader(filePath))
            {
                string line = "";

                while ((line = reader.ReadLine()) != null)
                {
                    yield return line;
                }
            }
        }
    }
}

