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
    }
}
