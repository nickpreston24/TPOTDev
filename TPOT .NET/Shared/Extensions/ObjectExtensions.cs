using Newtonsoft.Json;
using System.Collections.Generic;
using System.Diagnostics;

namespace System
{
    public static class ObjectExtensions
    {
        /// <summary>
        /// Dump an object's properties to Debug in JSON format
        /// Note: JSON nuget package required
        /// Null values will be ignored by default
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="item">Instance of any passed object</param>
        /// <param name="displayName">Custom Name of passed object</param>        
        /// <returns></returns>
        public static T Dump<T>(this T item, string displayName = "", bool ignoreNulls = false)
        {
            if (item != null)
            {
                if (string.IsNullOrWhiteSpace(displayName))
                    displayName = item.GetType().Name;
                var prettyJson = JsonConvert.SerializeObject(
                    item,
                    Formatting.Indented,
                    new JsonSerializerSettings
                    {
                        Converters = new List<JsonConverter> { new Newtonsoft.Json.Converters.StringEnumConverter() },
                        NullValueHandling = (ignoreNulls) ? NullValueHandling.Ignore : NullValueHandling.Include,
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    });
                Debug.WriteLine(string.Format("{0}:\n{1}", displayName, prettyJson));
            }
            else if (item == null)
            {
                if (!string.IsNullOrWhiteSpace(displayName))
                    Debug.WriteLine(string.Format("Object '{0}'{1}", displayName, " is null.")); //Optional
            }
            return item;
        }
    }
}
