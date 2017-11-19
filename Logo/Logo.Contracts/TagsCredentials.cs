using System;
using System.Collections.Generic;
using System.Text;

namespace Logo.Contracts
{
    public class TagsCredentials
    {        
        public Guid ObjectId { get; set; }
        public string Text { get; set; }
        public Enum ObjectType { get; set; }        
    }
}
