using System;
using System.Collections.Generic;
using System.Text;

namespace Logo.Contracts
{
    public class FolderCredentials
    {
        public Guid? ParentFolderId { get; set; }

        //public Guid OwnerId { get; set; }

        public string Name { get; set; }
    }
}
