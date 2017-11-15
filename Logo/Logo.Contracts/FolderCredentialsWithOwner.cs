using System;
using System.Collections.Generic;
using System.Text;

namespace Logo.Contracts
{
    public class FolderCredentialsWithOwner
    {        
        public FolderCredentials folderCredentials { get; set; }

        public Guid ownerId { get; set; }

    }
}
