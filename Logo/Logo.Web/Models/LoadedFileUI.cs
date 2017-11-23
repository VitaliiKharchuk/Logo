using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Logo.Web.Models
{
    public class LoadedFileUI
    {
        //public string FileName { get; set; }

        public  Guid ? ParentFolderId { get; set; }

        public DateTime ? CreationDate { get; set; }

        //public byte[] FileContent { get; set; }    
    }
}
