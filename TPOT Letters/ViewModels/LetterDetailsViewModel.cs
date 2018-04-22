using System.Collections.ObjectModel;

namespace TPOTLetters
{
    public class LetterDetailsViewModel : ViewModelBase
    {
        public ObservableCollection<TPOTLetter> Letters { get; set; }

        public LetterDetailsViewModel()
        {
            Letters = new ObservableCollection<TPOTLetter> {
                new TPOTLetter
                {
                    Date = new System.DateTime(2016,11,5)
                    , Name = "Bob"
                    , Letter= "How is one saved.rtf"
                    , Subject = "How is one saved?"
                }
            };
        }

    }
}
