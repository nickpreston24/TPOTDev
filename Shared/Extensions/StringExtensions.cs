using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;

namespace System
{
    public static class StringExtensions
    {
        public static T ExtractObject<T>(this string text, string regexPattern, RegexOptions options = RegexOptions.Singleline, bool matchExact = false, bool showWarnings = true)
        {
            var defaultObject = default(T); //default ("null") return value;
            try
            {
                PropertyInfo[] properties = typeof(T).GetProperties(BindingFlags.Instance | BindingFlags.Public);
                if (string.IsNullOrWhiteSpace(text))
                    return defaultObject;
                Regex regex = new Regex(regexPattern, options);
                Match match = regex.Match(text);
                if (!match.Success)
                {
                    if (showWarnings)
                    {
                        Debug.WriteLine($"No matches found! Could not extract a '{typeof(T).Name}' instance from regex pattern:\n{regexPattern}.\n");
                        Debug.WriteLine(text);
                        Debug.WriteLine("Properties without a mapped Group:");
                        properties.Select(p => p.Name).ToList()
                                  .Except(regex.GetGroupNames()/*.ToList()*/)
                                  .ToList().ForEach(l => Debug.Write(l + '\t'));
                        Debug.WriteLine("\n");
                    }
                    return defaultObject;
                }
                //
                /// If the user cares to match ALL parsed groups
                /// to their respective properties:
                ////
                else if (matchExact && match.Groups.Count - 1 != properties.Length) //Optional
                {
                    if (showWarnings)
                    {
                        Debug.WriteLine($"{MethodBase.GetCurrentMethod().Name}() WARNING: Number of Matched Groups ({match.Groups.Count}) does not equal the number of properties for the given class '{typeof(T).Name}'({typeof(T).GetProperties().Length})!  Check the class type and regex pattern for errors and try again.");
                    }
                    Debug.WriteLine("Values Parsed:");
                    for (int i = 1; i < match.Groups.Count; i++)
                        Debug.Write($"{match.Groups[i].Value}\t");
                    Debug.WriteLine("\n");
                    if (matchExact)
                    {
                        Debug.WriteLine($"Could not create an exact match! Returning default {typeof(T).Name}");
                        return defaultObject;
                    }
                }

                //
                /// If the user does not care for an exact match 
                /// and will take whatever gets parsed (correctly):
                ////
                object instance = Activator.CreateInstance(typeof(T));
                foreach (PropertyInfo prop in properties) //Assign matching group values to new instance
                {
                    string value = match?.Groups[prop.Name]?.Value?.Trim();
                    if (!string.IsNullOrWhiteSpace(value))
                        prop.SetValue(instance, TypeDescriptor.GetConverter(prop.PropertyType).ConvertFrom(value), null);
                    else prop.SetValue(instance, null, null);
                }
                return (T)instance; //goal
            }
            catch (Exception ex)
            {
                string errMsg = $"{MethodBase.GetCurrentMethod().Name}: {ex.ToString()}";
                Debug.WriteLine(errMsg);
                return defaultObject;
            }
        }

        public static string Wrap(this string text, string pre, string post) => string.Concat(pre, text, post);
    }
}
