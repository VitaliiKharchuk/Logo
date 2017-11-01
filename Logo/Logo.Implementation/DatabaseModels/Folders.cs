using System;
using System.Collections.Generic;

namespace Logo.Implementation.DatabaseModels
{
    public partial class Folders
    {
        public Folders()
        {
            Files = new HashSet<Files>();
            FoldersToUsers = new HashSet<FoldersToUsers>();
            InverseParentFolder = new HashSet<Folders>();
        }

        public Guid FolderId { get; set; }
        public Guid? ParentFolderId { get; set; }
        public Guid OwnerId { get; set; }
        public string Name { get; set; }
        public DateTime? CreationDate { get; set; }
        public DateTime? UploadDate { get; set; }
        public int Level { get; set; }
        public bool? HasPublicAccess { get; set; }

        public Users Owner { get; set; }
        public Folders ParentFolder { get; set; }
        public ICollection<Files> Files { get; set; }
        public ICollection<FoldersToUsers> FoldersToUsers { get; set; }
        public ICollection<Folders> InverseParentFolder { get; set; }
    }
}
