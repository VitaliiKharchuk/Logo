using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Logo.DatabaseModels
{
    public class File
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public File()
        {
            Tags = new HashSet<Tag>();
        }

        public Guid FileID { get; set; }

        public Guid? ParentFolderID { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        public DateTime? CreationDate { get; set; }

        public DateTime? UploadDate { get; set; }

        public int? Size { get; set; }

        [StringLength(100)]
        public string Url { get; set; }

        public virtual Folder Folder { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Tag> Tags { get; set; }
    }
}
