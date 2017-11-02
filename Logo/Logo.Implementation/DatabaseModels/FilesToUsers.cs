using System;

namespace Logo.Implementation.DatabaseModels
{
    public class FilesToUsers
    {
        public Guid FileId { get; set; }
        public Guid UserId { get; set; }

        public File File { get; set; }
        public User User { get; set; }
    }
}
