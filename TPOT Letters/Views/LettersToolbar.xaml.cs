using System.Windows.Controls;

namespace TPOTLetters
{
    public partial class LettersToolbar : UserControl
    {
        public LettersToolbar()
        {
            InitializeComponent();
            DataContext = new LettersToolbarViewModel();
        }

        private void CommandBinding_Executed(object sender, System.Windows.Input.ExecutedRoutedEventArgs e)
        {

        }
    }
}
