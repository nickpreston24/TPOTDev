using Shared;
using System.Collections.Generic;
using System.IO;
using System.Windows;

namespace TPOTLetters
{
    public class RtfEditorViewModel : ViewModelBase, IRtfEditor
    {
        private string text;
        private Letter letter;
        private readonly RtfBoxControl rtfTextEditor;

        public string Content
        {
            get { return text; }
            set
            {
                SetValue(ref text, value);
            }
        }


        // INotifyable Property _File        
        private string _File;
        public string File
        {
            get { return _File; }
            set { SetValue(ref _File, value); }
        }


        public List<ISubscriber<string>> Subscribers { get; set; } = new List<ISubscriber<string>>(1);

        public RtfEditorViewModel()
        {
        }

        public RtfEditorViewModel(RtfBoxControl rtfTextEditor)
        {
            this.rtfTextEditor = rtfTextEditor;
        }

        public void Load(Letter letter)
        {
            this.letter = letter;

            if (!System.IO.File.Exists(letter.FilePath))
            {
                return;
            }

            var fileStream = new FileStream(letter.FilePath, FileMode.Open);
            rtfTextEditor.rtfTextBox.Selection.Load(fileStream, DataFormats.Rtf);

            Content = rtfTextEditor.rtfTextBox.GetRTF();
        }

        public void Update(string rtfText)
        {
            Content = rtfText;
        }

        public void Register(ISubscriber<string> subscriber) => Subscribers.Add(subscriber);

        public void Unregister(ISubscriber<string> subscriber) => Subscribers.Remove(subscriber);
    }
}