using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Logo.DatabaseModels
{
    public class Folder
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Folder()
        {
            Files = new HashSet<File>();
            Folders1 = new HashSet<Folder>();
            Users = new HashSet<User>();
        }

        public Guid FolderID { get; set; }

        public Guid? ParentFolderID { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        public DateTime? CreationDate { get; set; }

        public DateTime? UploadDate { get; set; }

        public int Level { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<File> Files { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Folder> Folders1 { get; set; }

        public virtual Folder Folder1 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<User> Users { get; set; }
    }
}
