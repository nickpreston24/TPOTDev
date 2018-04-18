using System.Diagnostics;
using System.Windows;
using System.Windows.Input;

namespace IntellisenseDemo
{
    /// <summary>
    /// * Log bible scripture pasted into textboxes/rtfboxes/etc.
    /// * Let the user recall stored verses by intellisense, pattern matching, etc.
    /// </summary>
    public partial class MainWindow : Window
    {
        private IScriptureSaver scriptureSaver;

        public MainWindow()
        {
            InitializeComponent();
            InitializeControls();
            CapsLockControl.TurnOffCapsLock();
            scriptureSaver = ScriptureSaver.Create("Verses.xml");
        }

        private void InitializeControls()
        {
            tbScripture.KeyDown += tbScripture_KeyDown;
            tbScripture.TextInput += tbScripture_TextInput;
        }

        //dunno why this doesn't work...
        private void tbScripture_TextInput(object sender, TextCompositionEventArgs textInputArgs)
        {
            Debug.WriteLine(textInputArgs.Text);
        }

        private void tbScripture_KeyDown(object sender, System.Windows.Input.KeyEventArgs keyEventArgs)
        {
            var key = keyEventArgs.Key;

            if (key.Equals(Key.Enter))
            {
                var text = tbScripture.Text;

                if (new Verse(text).IsLegit)
                {
                    scriptureSaver.Save(text);
                }
            }
        }

        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            Process.Start("Verses.xml", string.Format("/select, \"{0}\"", "Verses.xml"));
        }
    }

   
}
