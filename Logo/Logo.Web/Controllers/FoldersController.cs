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
    [Authorize(Policy = "Bearer")]
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

        [HttpGet]   //only for   testing
        [Route("[action]")]
        public IEnumerable<FileInfo> GetAllFiles()
        {
            return _foldersService.GetAllFiles();
        }


        [HttpGet]
        [Route("get-folders/{id?}")]
        public IEnumerable<FolderInfo> GetFoldersContent(Guid id)
        {
            return _foldersService.GetFoldersInFolder(id);

        }

        [HttpGet]
        [Route("get-files/{id?}")]
        public IEnumerable<FileInfo> GetFilesContent(Guid id)
        {
            return _foldersService.GetFilesInFolder(id);
        }



        [HttpPost]
        [Route("add-folder")]
        public IActionResult CreateFolder([FromBody]  ObjectCredentials folderCredentials)
        {
            try
            {
                Guid ownerId = new Guid(HttpContext.User.Claims.ToList()
                                   .Where(item => item.Type == "UserId")
                                   .Select(item => item.Value)
                                   .FirstOrDefault());

                _foldersService.CreateFolder(new ObjectCredentialsWithOwner
                {
                    ObjectCredentials = folderCredentials,
                    OwnerId = ownerId
                });
            }

            catch (Exception ex)
            {
                return Ok(ex);    // 
            }

            return Ok();
        }

        [HttpPost]
        [Route("add-file")]
        public IActionResult CreateFile([FromBody]  ObjectCredentials folderCredentials)
        {
            try
            {
                Guid ownerId = new Guid(HttpContext.User.Claims.ToList()
                                   .Where(item => item.Type == "UserId")
                                   .Select(item => item.Value)
                                   .FirstOrDefault());

                _foldersService.CreateFile(new ObjectCredentialsWithOwner
                {
                    ObjectCredentials = folderCredentials,
                    OwnerId = ownerId
                });
            }

            catch (Exception ex)
            {
                return Ok(ex);    // 
            }

            return Ok();
        }



        [HttpPost]
        [Route("rename-folder")]
        public IActionResult RenameFolder([FromBody] UpdatedObject updatedFolder)
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



        [HttpPost]
        [Route("rename-file")]
        public IActionResult RenameFile([FromBody] UpdatedObject updatedFolder)
        {
            try
            {
                _foldersService.RenameFile(updatedFolder);
            }

            catch (Exception ex)
            {
                return Ok(ex);    // 
            }

            return Ok();
        }


        [HttpGet]
        [Route("delete-folder/{id?}")]
        public IActionResult DeleteFolder(Guid id)
        {
            try
            {
                _foldersService.DeleteFolder(id);
            }

            catch (Exception ex)
            {
                return Ok(ex);    // 
            }

            return Ok();
        }

        [HttpGet]
        [Route("delete-file/{id?}")]
        public IActionResult DeleteFile(Guid id)
        {
            try
            {
                _foldersService.DeleteFile(id);
            }

            catch (Exception ex)
            {
                return Ok(ex);    // 
            }

            return Ok();
        }


        [HttpGet]
        [Route("get-root-folders/{ownerId?}")]
        public   IEnumerable<FolderInfo>   GetRootFolders(Guid  ownerId)
        {
            return _foldersService.GetRootFolders(ownerId);
            
        }

        [HttpGet]
        [Route("get-root-files/{ownerId?}")]
        public IEnumerable<FileInfo> GetRootFiles(Guid ownerId)
        {
            return _foldersService.GetRootFiles(ownerId);            
        }





    }
}
