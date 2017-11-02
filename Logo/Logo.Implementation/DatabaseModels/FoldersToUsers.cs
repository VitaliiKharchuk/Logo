using System;

namespace Logo.Implementation.DatabaseModels
{
    public class FoldersToUsers
    {
        public Guid FolderId { get; set; }
        public Guid UserId { get; set; }

        public Folder Folder { get; set; }
        public User User { get; set; }
    }
}
