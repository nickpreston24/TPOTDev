namespace Shared
{
    public interface ISubscriber<T>
    {
        T Content { get; set; }
        void Update(string text); //receives update of content        
    }
}
