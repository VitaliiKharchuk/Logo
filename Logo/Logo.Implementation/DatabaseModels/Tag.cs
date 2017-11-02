using System.Collections.Generic;

namespace Logo.Implementation.DatabaseModels
{
    public class Tag
    {
        public Tag()
        {
            FilesToTags = new HashSet<FilesToTags>();
        }

        public int TagId { get; set; }
        public string Name { get; set; }

        public ICollection<FilesToTags> FilesToTags { get; set; }
    }
}
