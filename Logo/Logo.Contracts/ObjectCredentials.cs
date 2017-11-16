using System;
using System.Collections.Generic;
using System.Text;

namespace Logo.Contracts
{
    public class ObjectCredentials
    {
        public Guid? ParentObjectId { get; set; }

        //public Guid OwnerId { get; set; }

        public string Name { get; set; }
    }
}
