using Shared;
using System.Collections.Generic;
using System.Windows;

namespace TPOTLetters
{
    public partial class MainWindow : Window
    {
        private string rtfFilePath = @"C:\Users\Nick\Desktop\TPOT Dev\ConversionTests\Rtf\TPOTLinksSample.rtf";
        private IViewSubscriber rtfViewModel;
        private IViewSubscriber htmlViewModel;
        private List<IViewSubscriber> viewModels = new List<IViewSubscriber>(0);
        private IConversionService conversionService;

        public MainWindow()
        {
            InitializeComponent();
            Setup();
        }

        private void Setup()
        {
            DataContext = new MainViewModel();
            conversionService = RtfConversionService.Instance;

            btnConvert.Click += (s, e) =>
            {
                conversionService.QueueFile(rtfFilePath);
                conversionService.RunConversions();
            };

            rtfViewModel = new RtfEditorViewModel();
            //htmlViewModel = new HtmlEditorViewModel();
            //rtfTextEditor.DataContext = rtfViewModel;
            //htmlTextEditor.DataContext = htmlViewModel;

            //conversionService.Register(htmlViewModel/*, rtfViewModel*/);
            conversionService.Register(htmlTextEditor.ViewModel);
        }
    }
}
