using System.IO;
using System.Linq;
using System.Xml.Linq;

namespace IntellisenseDemo
{
    public class ScriptureSaver : IScriptureSaver
    {
        private string _favoriteScripturesPath;

        public ScriptureSaver(string favoriteScripturesPath)
        {
            FavoriteScripturesPath = favoriteScripturesPath;
        }

        public string FavoriteScripturesPath { get => _favoriteScripturesPath; set => _favoriteScripturesPath = value; }

        public static ScriptureSaver Create(string filePath)
        {
            return new ScriptureSaver(filePath);
        }

        public void Save(string text)
        {
            string tag = Tagify("Verse", text);
            File.AppendAllLines(_favoriteScripturesPath, Enumerable.Repeat(tag, 1));
        }

        public void Save(Verse text)
        {
            throw new System.NotImplementedException();
        }

        private string Tagify(string name, string text)
        {
            return new XElement(name, text).ToString();
        }
    }
}