using System.Windows;
using System.Windows.Controls;

namespace TPOTLetters
{
    public partial class RtfBoxControl : UserControl
    {
        public RtfBoxControl()
        {
            InitializeComponent();
            DataContext = new RtfEditorViewModel();
        }

        private void rtfTextBox_Click(object sender, RoutedEventArgs args)
        {
            Hyperlink.NavigateToUrl(args);
        }
    }    
}
