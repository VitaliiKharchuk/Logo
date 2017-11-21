using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logo.Web.Models
{
    public class LoadedFile
    {
        public string FileName { get; set; }

        public  Guid ?  ParentFolderId { get; set; }
       
        public byte[] FileContent { get; set; }
    }
}
