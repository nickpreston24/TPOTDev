using System;
using System.Diagnostics;
using System.Windows.Input;

namespace TPOTLetters
{
    public class CopyCommand : ICommand
    {
        public event EventHandler CanExecuteChanged;

        public bool CanExecute(object parameter)
        {

            Debug.WriteLine(parameter);

            /*parameter != null*/
            return true;
        }

        public void Execute(object parameter) => Debug.WriteLine("Copy!");
    }
}
