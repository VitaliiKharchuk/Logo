using System;
using System.Collections.Generic;

namespace Logo.Implementation.DatabaseModels
{
    public partial class Tags
    {
        public Tags()
        {
            FilesToTags = new HashSet<FilesToTags>();
        }

        public int TagId { get; set; }
        public string Name { get; set; }

        public ICollection<FilesToTags> FilesToTags { get; set; }
    }
}
