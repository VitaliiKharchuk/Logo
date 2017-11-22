﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Logo.Contracts
{
    public class ObjectCredentials
    {
        public Guid? ParentObjectId { get; set; }
        
        public string Name { get; set; }

        public DateTime ? CreationDate { get; set; }

        public int Size { get; set; }
    }
}
