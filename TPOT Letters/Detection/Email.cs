using System;

namespace TPOTLetters
{
    public class Email
    {
        public EmailHeader Header { get; }
    }

    public class EmailHeader
    {
        //Email regex from: 
        //http://emailregex.com/
        //^(?(")(".+?(?<!\\)"@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-\w]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$
        //const string emailRgx = @"^\s*To:\s*(?<Email>(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-\w]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9])))$";
        const string toEmailRgx = @"^\s*[Tt]o:\s*(?<Email>(.*))$";
        const string fromEmailRgx = @"^\s*From:\s*(?<Email>(.*))$";

        [Pattern(@"^\s*From:\s*(?<FullName>[a-zA-Z]+)")]
        public string FullName { get; set; }
        //[Pattern("^To:(?<Email>.*)$")] //.* will be a real email regex.
        [Pattern(toEmailRgx)]
        public string Email { get; set; }
        [Pattern(@"^\s*Subject:\s*(?<Subject>[\w\s,!-?]+)")]
        public string Subject { get; set; }
        [Pattern(@"^\s*Sent:\s*(?<Sent>.*)")]
        public DateTime Sent { get; set; }
    }

}
