using System;
using System.Collections.Generic;

namespace Logo.Implementation.DatabaseModels
{
    public partial class Users
    {
        public Users()
        {
            Files = new HashSet<Files>();
            FilesToUsers = new HashSet<FilesToUsers>();
            Folders = new HashSet<Folders>();
            FoldersToUsers = new HashSet<FoldersToUsers>();
        }

        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public ICollection<Files> Files { get; set; }
        public ICollection<FilesToUsers> FilesToUsers { get; set; }
        public ICollection<Folders> Folders { get; set; }
        public ICollection<FoldersToUsers> FoldersToUsers { get; set; }
    }
}
