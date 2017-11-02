using System;
using System.Collections.Generic;

namespace Logo.Implementation.DatabaseModels
{
    public class Folder
    {
        public Folder()
        {
            Files = new HashSet<File>();
            FoldersToUsers = new HashSet<FoldersToUsers>();
            ChildFolders = new HashSet<Folder>();
        }

        public Guid FolderId { get; set; }
        public Guid? ParentFolderId { get; set; }
        public Guid OwnerId { get; set; }
        public string Name { get; set; }
        public DateTime? CreationDate { get; set; }
        public DateTime? UploadDate { get; set; }
        public int Level { get; set; }
        public bool? HasPublicAccess { get; set; }

        public User Owner { get; set; }
        public Folder ParentFolder { get; set; }
        public ICollection<File> Files { get; set; }
        public ICollection<FoldersToUsers> FoldersToUsers { get; set; }
        public ICollection<Folder> ChildFolders { get; set; }
    }
}
