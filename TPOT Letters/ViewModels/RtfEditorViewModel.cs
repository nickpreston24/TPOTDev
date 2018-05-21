using Shared;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Windows;
using System.Windows.Controls;

namespace TPOTLetters
{
    public class RtfEditorViewModel : ViewModelBase,/* UserControl,*/ IRtfEditor
    {
        private string text;
        private Letter letter;
        private readonly RtfBoxControl rtfTextEditor;
        //public RichTextFile RtfFile { get; set; } = new RichTextFile();

        //public string RtfFilePath
        //{
        //    get { return (string)GetValue(FileProperty); }
        //    set { SetValue(FileProperty, value); }
        //}

        //public static readonly DependencyProperty FileProperty =
        //    DependencyProperty.Register(nameof(RtfFilePath), typeof(string), typeof(RtfEditorViewModel),
        //    new PropertyMetadata(new PropertyChangedCallback(OnFileChanged)));

        //private static void OnFileChanged(DependencyObject dependencyObject, DependencyPropertyChangedEventArgs e)
        //{
        //    if (dependencyObject == null)
        //    {
        //        return;
        //    }

        //    //todo: I want to load new rtf content/text after this changes!
        //    //var rtf = dependencyObject as RtfEditorViewModel;
        //    //ReadFile(rtf.RtfFilePath, rtf.Document);
        //}

        public string Content
        {
            get { return text; }
            set
            {
                SetValue(ref text, value);
                Debug.WriteLine("rtf set");
            }
        }

        public List<ISubscriber<string>> Subscribers { get; set; } = new List<ISubscriber<string>>(1);

        public RtfEditorViewModel()
        {
        }

        public RtfEditorViewModel(RtfBoxControl rtfTextEditor) => this.rtfTextEditor = rtfTextEditor;

        public void Load(Letter letter)
        {
            this.letter = letter;

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