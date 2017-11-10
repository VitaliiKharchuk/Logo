using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Logo.Contracts.Services;
using Logo.Implementation;

namespace Logo.Web.Controllers
{
    [Route("api/[controller]")]
    [ServiceFilter(typeof(ApiExceptionFilter))]

    public class FoldersController  :  Controller
    {
        private readonly IFoldersService _foldersService;
        
        public FoldersController(IFoldersService foldersService)
        {
            _foldersService = foldersService;          
        }

        [HttpPost]
        public   void   CreateFolder([FromBody] Guid  parentFolderId, [FromBody] string folderName)
        {        
           // Guid OwnerId  =  Request.Headers.Values.;       
        }



    }
}
