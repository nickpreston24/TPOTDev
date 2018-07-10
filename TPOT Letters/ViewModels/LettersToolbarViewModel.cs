using System.Windows.Input;

namespace TPOTLetters
{
    public class LettersToolbarViewModel
    {
        public static RoutedCommand HelloWorldRoutedCommand = new RoutedCommand()
        {
            InputGestures = { new KeyGesture(Key.H, ModifierKeys.Control) }
        }; //should access anywhere, but not working.  Maybe just on windows?

        private CopyCommand copy;
        public CopyCommand Copy { get => copy ?? new CopyCommand(); }

        public LettersToolbarViewModel()
        {
            if (Copy.CanExecute(this))
            {
                Copy.Execute(this);
            }
        }
    }
}
