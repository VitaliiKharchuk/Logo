using System;
using System.Collections.Generic;

namespace Logo.Implementation.DatabaseModels
{
    public partial class FilesToTags
    {
        public Guid FileId { get; set; }
        public int TagId { get; set; }

        public Files File { get; set; }
        public Tags Tag { get; set; }
    }
}
