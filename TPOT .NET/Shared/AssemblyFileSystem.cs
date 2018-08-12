using System;
using System.IO;
using System.Linq;
using System.Reflection;

namespace Shared
{
    public abstract class AssemblyFiles
    {
        private static string _searchExtension = "*.*";

        public AssemblyFiles(string extension)
        {
            _searchExtension = extension
                ?? throw new ArgumentNullException(nameof(extension));
        }

        public DirectoryInfo ExecutingDirectory => GetExecutingDirectory();
        public string ExecutingDirectoryName => GetExecutingDirectoryName();
        public FileInfo FirstFile => ExecutingDirectory.GetFiles(_searchExtension, SearchOption.AllDirectories)
            .FirstOrDefault();
        public string FirstFilePath => ExecutingDirectory.GetFiles(_searchExtension, SearchOption.AllDirectories)
                    .Select(fi => fi.FullName)
                    .FirstOrDefault();

        public static DirectoryInfo GetExecutingDirectory()
        {
            var location = new Uri(Assembly.GetEntryAssembly().GetName().CodeBase);
            var directory = new FileInfo(location.AbsolutePath).Directory;
            string dirPath = directory.FullName;
            System.Diagnostics.Debug.WriteLine("directory: " + dirPath);
            return directory;
        }

        public static string GetExecutingDirectoryName()
        {
            string codeBase = Assembly.GetExecutingAssembly().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);
            string dirPath = Path.GetDirectoryName(path);
            System.Diagnostics.Debug.WriteLine("directory name: " + dirPath);
            return dirPath;
            //var location = new Uri(Assembly.GetEntryAssembly().GetName().CodeBase);
            //return new FileInfo(location.AbsolutePath).Directory.FullName;
        }
    }
}