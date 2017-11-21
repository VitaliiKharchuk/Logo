using System.Collections.Generic;
using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;
using Logo.Contracts.Services;
using Logo.Web.Models;
using Logo.Contracts;
using System.Linq;

namespace Logo.Web.Controllers
{

    [Authorize("Bearer")]
    [Route("api/[controller]")]
    //[ServiceFilter(typeof(ApiExceptionFilter))]
    public class FilesController : Controller
    {
        IFilesService _filesService;
        IFoldersService _foldersService;

        public  FilesController (IFilesService filesService, IFoldersService foldersService)
        {
            _filesService = filesService;
            _foldersService = foldersService;
        }


        [HttpPost]
        [Route ("upload-file")]
        public IActionResult UploadFile([FromBody] LoadedFile file)
        {                        
            Guid ownerId = new Guid(HttpContext.User.Claims.ToList()
                                  .Where(item => item.Type == "UserId")
                                  .Select(item => item.Value)
                                  .FirstOrDefault());

            _foldersService.CreateFile(new ObjectCredentialsWithOwner
            {
                OwnerId = ownerId,
                ObjectCredentials = new ObjectCredentials
                {
                    Name = file.FileName,
                    ParentObjectId = file.ParentFolderId
                }
            }, new MemoryStream(file.FileContent));   

            return Ok();
        }






       




    }
}
