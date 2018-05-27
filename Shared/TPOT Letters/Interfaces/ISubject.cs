using System.Collections.Generic;

namespace Shared
{
    public interface ISubject<T>
    {
        T Content { get; set; }
        List<ISubscriber<T>> Subscribers { get; set; }

        void Register(ISubscriber<T> subscriber);
        void Unregister(ISubscriber<T> subscriber);
    }
}
