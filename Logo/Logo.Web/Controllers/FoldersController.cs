using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Logo.Contracts.Services;
using Logo.Implementation;
using Logo.Contracts;
using Logo.Web.Models;
using Microsoft.AspNetCore.Authorization;

namespace Logo.Web.Controllers
{
    [Route("api/[controller]")]
    [Authorize (Policy = "Bearer")]
    [ServiceFilter(typeof(ApiExceptionFilter))]

    public class FoldersController : Controller
    {
        private readonly IFoldersService _foldersService;

        public FoldersController(IFoldersService foldersService)
        {
        
            _foldersService = foldersService;
        }

        [HttpGet]   //only for   testing
        [Route("[action]")]
        public IEnumerable<FolderInfo> GetAllFolders()
        {
            return _foldersService.GetAllFolders();
        }

        [HttpGet]
        [Route("GetFolders/{id?}")]
        public IEnumerable<FolderInfo> GetFoldersContent(Guid id)
        {
            return _foldersService.GetFoldersInFolder(id);
      
        }

        [HttpGet]
        [Route("GetFiles/{id?}")]
        public IEnumerable<FileInfo> GetFilesContent(string id)
        {
            FileInfo file1 = new FileInfo
            {
                FileId = Guid.NewGuid(),
                ParentFolderId = Guid.NewGuid(),
                OwnerId = Guid.NewGuid(),
                Name = "Hardcoded File1",
                CreationDate = DateTime.Now,
                HasPublicAccess = false
            };

            FileInfo file2 = new FileInfo
            {
                FileId = Guid.NewGuid(),
                ParentFolderId = Guid.NewGuid(),
                OwnerId = Guid.NewGuid(),
                Name = "Hardcoded File1",
                CreationDate = DateTime.Now,
                HasPublicAccess = false
            };

            return new[] { file1, file2 };
        }

        [HttpPost]
        [Route("add-folder")]
        public IActionResult  CreateFolder([FromBody]  FolderCredentials folderCredentials)
        {
            try
            {
                Guid ownerId = new Guid(HttpContext.User.Claims.ToList().Where(item => item.Type == "UserId").Select(item => item.Value).FirstOrDefault());

                _foldersService.CreateFolder(new FolderCredentialsWithOwner
                {
                    folderCredentials = folderCredentials,
                    ownerId = ownerId
                });

            }

            catch (Exception ex)
            {
                return Ok(ex);    // 
            }

            return Ok();
        }


        [HttpPost]
        [Route("Rename")]
        public IActionResult RenameFolder([FromBody] UpdatedFolder  updatedFolder)
        {

            try
            {
                _foldersService.RenameFolder(updatedFolder);
            }

            catch (Exception ex)
            {
                return Ok(ex);    // 
            }


            return Ok();
        }


        [HttpGet]
        [Route("Delete/{id?}")]
        public IActionResult DeleteFolder(Guid id)
        {
            try
            {
                _foldersService.DeleteFolder(id);
            }

            catch(Exception ex)
            {
                return Ok(ex);    // 
            }

            return Ok();
        }


        [HttpGet]   //only for   testing
        [Route("throw")]
        public object Throw()
        {
            try
            {
                throw new InvalidOperationException("This is an unhandled exception");
            }

            catch(Exception ex)
            {
                return ex;
            }
        }




        [HttpGet]  //only  for   testing
        [Route("getInfo")]
        public IActionResult GetInfo()
        {
            
            var id =  HttpContext.User.Claims.ToList().Where(item => item.Type == "UserId").Select(item => item.Value).First();
            return Ok(id);
        }

    }
}
