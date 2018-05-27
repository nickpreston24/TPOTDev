using System.Windows.Controls;

namespace TPOTLetters
{
    /// <summary>
    /// Interaction logic for HtmlBoxControl.xaml
    /// </summary>
    public partial class HtmlBoxControl : UserControl
    {
        public HtmlEditorViewModel ViewModel { get; }
        public HtmlBoxControl()
        {
            InitializeComponent();
            DataContext = ViewModel = new HtmlEditorViewModel();
        }
    }
}
