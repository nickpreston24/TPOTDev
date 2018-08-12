using System;
using System.Diagnostics;
using System.Windows.Input;

namespace TPOTLetters
{
    public class ForwardCommand : ICommand
    {
        public event EventHandler CanExecuteChanged;

        public bool CanExecute(object parameter) => parameter != null;

        public void Execute(object parameter) => Debug.WriteLine("Going forward!");
    }
}
