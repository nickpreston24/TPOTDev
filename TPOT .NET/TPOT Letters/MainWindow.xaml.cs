using System.IO;
using System.Windows;

namespace TPOTLetters
{
    public partial class MainWindow : Window
    {
        //private string rtfFilePath = @"C:\Users\Nick\Desktop\TPOT Dev\ConversionTests\Rtf\Sample.rtf";
        private string documentPath = @"..\..\Docs\SampleLetter.docx";
        private IRtfEditor rtfViewModel;
        private RtfConversionService conversionService;

        public MainWindow()
        {
            InitializeComponent();
            Setup();
        }

        private void Setup()
        {
            if (!File.Exists(documentPath))
            {
                throw new FileNotFoundException(documentPath);
            }

            DataContext = new MainViewModel();
            conversionService = RtfConversionService.Instance;

            //btnConvert.Click += (s, e) => conversionService.RunConversions();

            rtfViewModel = new RtfEditorViewModel(rtfTextEditor);
            rtfViewModel.Load(new Letter { FilePath = documentPath });

            //htmlViewModel = new HtmlEditorViewModel();
            //rtfTextEditor.DataContext = rtfViewModel;
            //htmlTextEditor.DataContext = htmlViewModel;

            //conversionService.Register(htmlViewModel/*, rtfViewModel*/);
            conversionService.RegisterSubscribers(rtfViewModel, htmlTextEditor.ViewModel);
        }
    }
}
