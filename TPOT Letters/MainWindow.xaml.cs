using Shared;
using System.Collections.Generic;
using System.Linq;
using System.Windows;

namespace TPOTLetters
{
    public partial class MainWindow : Window
    {
        private HtmlConversionService htmlConversionService;

        private IViewModel mainViewModel;
        private IViewModel rtfViewModel;
        private IViewModel htmlViewModel;
        private List<IViewModel> viewModels = new List<IViewModel>(0);

        public MainWindow()
        {
            InitializeComponent();
            Setup();
        }

        private void Setup()
        {
            mainViewModel = new MainViewModel();
            rtfViewModel = new RtfEditorViewModel();
            htmlViewModel = new HtmlEditorViewModel();

            DataContext = mainViewModel;
            rtfTextEditor.DataContext = rtfViewModel;
            htmlTextEditor.DataContext = htmlViewModel;

            viewModels.AddRange(new IViewModel[]
            {
                mainViewModel,
                rtfViewModel,
                htmlViewModel,
            });

            var letters = new Letter[]
            {
                new Letter { FilePath = @"Sample.rtf" },
                new Letter { FilePath = @"..\..\..\ConversionTests\Rtf\TPOTLinksSample.rtf" },
            };

            var letter = letters.First();
            htmlConversionService = new HtmlConversionService(letter.FilePath, ConverterType.RtfPipe);
            htmlConversionService.Register(viewModels.OfType<IHtmlSubscriber>().ToArray());
        }

        private void LaunchBrowser_Click(object sender, RoutedEventArgs e)
        {
            htmlConversionService.RunConversion();
        }
    }
}
