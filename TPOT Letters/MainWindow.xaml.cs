using System.Windows;

namespace TPOTLetters
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private MainViewModel mainViewModel;

        public MainWindow()
        {
            InitializeComponent();
            mainViewModel = new MainViewModel();
            AssignContexts();
        }

        private void AssignContexts()
        {
            DataContext = mainViewModel;
            rtfTextEditor.DataContext = new RtfEditorViewModel();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            mainViewModel.RunConversion();
        }
    }
}
