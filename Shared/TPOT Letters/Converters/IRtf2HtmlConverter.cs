using System;

namespace Shared
{
    public interface ILetterConverter//<T> : IObservable<T>
    {
        string FilePath { get; set; }
        string Convert();
        string Result { get; }
    }
}
