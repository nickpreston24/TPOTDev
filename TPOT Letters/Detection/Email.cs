using System;

namespace TPOTLetters
{
    public class Email
    {

    }

    interface IHeader //todo: represent headers or email-specific headers with this interface.
    {
    }

    public class EmailHeader : IHeader
    {
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string Subject { get; set; }
        public DateTime Time { get; set; }


    }

    public class EmailHeaderRegex
    {
        public static string NameRegex = @"^From:\s*(?<FullName>[a-zA-Z]+)"; //wip
        public static string EmailRegex = @"^To:(?<Email>.*)$";//.* will be a real email regex.               
        //public static string FullHeaderRegex = @"^From:\s*(?<FullName>[a-zA-Z]+).*\r\nSent:"; //wip
        public static string FullHeaderRegex = @"^From:\s*(?<FullName>[a-zA-Z]+).*$\n^S.*$"; //Sent:\s*(.*)\nTo:\s*'.*'.*\nCc:\s*\w+\s\w+.*\nSubject:.*
    }

}
