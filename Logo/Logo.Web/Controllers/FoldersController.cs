using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Logo.Contracts.Services;
using Logo.Implementation;
using Logo.Contracts;


namespace Logo.Web.Controllers
{
    [Route("api/[controller]")]
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
            return  _foldersService.GetFoldersInFolder(id);
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
        public void CreateFolder([FromBody]  FolderCredentials folderCredentials)
        {
            FolderInfo folderInfo = _foldersService.CreateFolder(folderCredentials.Name, folderCredentials.OwnerId, folderCredentials.ParentFolderId);
            _foldersService.AddFolder(folderInfo);
        }
    }
}
