﻿using Itenso.Rtf;
using System.IO;

namespace Shared
{
    internal abstract class Rtf2HtmlConverterBase : ILetterConverter
    {
        protected string lines;
        protected string html;

        protected IRtfDocument rtfDocument;
        protected string filePath;

        public string Result { get { return html; } }
        public string FilePath { get => filePath; set => filePath = value; }

        public Rtf2HtmlConverterBase()
        {

        }

        public Rtf2HtmlConverterBase(string filepath)
        {
            FilePath = filepath;
            lines = File.ReadAllText(filePath);
        }

        public abstract string Convert();
    }
}
