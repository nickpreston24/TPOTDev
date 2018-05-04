namespace Shared
{
    public interface IHtmlSubscriber//<T> : IObservable<T>
    {
        void Update(string html);
    }
}
