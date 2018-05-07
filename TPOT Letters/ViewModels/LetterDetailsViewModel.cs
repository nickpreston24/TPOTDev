using System.Collections.ObjectModel;

namespace TPOTLetters
{
    public class LetterDetailsViewModel : ViewModelBase
    {
        public ObservableCollection<LetterContents> Letters { get; set; }

        public LetterDetailsViewModel()
        {
            Letters = new ObservableCollection<LetterContents> {
                new LetterContents
                {
                    Date = new System.DateTime(2016,11,5)
                    , Name = "Bob"
                    , Text= "How is one saved.rtf"
                    , Subject = "How is one saved?"
                }
            };
        }
    }
}
