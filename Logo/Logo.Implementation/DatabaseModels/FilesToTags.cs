using System;

namespace Logo.Implementation.DatabaseModels
{
    public class FilesToTags
    {
        public Guid FileId { get; set; }
        public int TagId { get; set; }

        public File File { get; set; }
        public Tag Tag { get; set; }
    }
}
