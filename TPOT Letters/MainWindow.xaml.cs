using System;
using System.Windows;

namespace TPOTLetters
{
    public partial class MainWindow : Window
    {
        private readonly string filePath = @"C:\Users\Nick\Desktop\TPOT Dev\ConversionTests\Rtf";
        private MainViewModel mainViewModel;
        private object rtfViewModel;
        private HtmlEditorViewModel htmlViewModel;

        public MainWindow()
        {
            InitializeComponent();
            mainViewModel = new MainViewModel();
            rtfViewModel = new RtfEditorViewModel();
            htmlViewModel = new HtmlEditorViewModel();

            AssignContexts();
            RegisterConverter();
        }

        private void RegisterConverter()
        {
            
        }

        private void AssignContexts()
        {
            DataContext = mainViewModel;
            rtfTextEditor.DataContext = rtfViewModel;
            htmlTextEditor.DataContext = htmlViewModel;
        }

        private void LaunchBrowser_Click(object sender, RoutedEventArgs e)
        {
            mainViewModel.RunConversion();
        }
    }
}
