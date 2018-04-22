using System;

namespace TPOTLetters
{
    internal class DependentPropertiesAttribute : Attribute
    {
        public DependentPropertiesAttribute(params string[] properties) => Properties = properties;

        public string[] Properties { get; }
    }

}
