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

    public class FoldersController  :  Controller
    {
        private readonly IFoldersService _foldersService;
        
        public FoldersController(IFoldersService foldersService)
        {
            _foldersService = foldersService;          
        }


        [HttpGet("{id}", Name = "GetFolder")]
        public FolderInfo GetById(string id)
        {
            //var item = _context.TodoItems.FirstOrDefault(t => t.Id == id);

            
            FolderInfo folder = new FolderInfo
            {
                FolderId = Guid.NewGuid(),
                ParentFolderId = Guid.NewGuid(),
                OwnerId = Guid.NewGuid(),
                Name = "Hardcoded Folder",
                CreationDate = DateTime.Now,
                Level = 0,
                HasPublicAccess = false
             };


            return folder;
        }
        
        [HttpGet("{id}", Name = "GetFolders")]
        public IEnumerable<FolderInfo> GetFoldersContent(string  FolderId)
        {
           
            FolderInfo folder1 = new FolderInfo
            {
                FolderId = Guid.NewGuid(),
                ParentFolderId = Guid.NewGuid(),
                OwnerId = Guid.NewGuid(),
                Name = "Hardcoded Folder1",
                CreationDate = DateTime.Now,
                Level = 1,
                HasPublicAccess = false
            };


            FolderInfo folder2 = new FolderInfo
            {
                FolderId = Guid.NewGuid(),
                ParentFolderId = Guid.NewGuid(),
                OwnerId = Guid.NewGuid(),
                Name = "Hardcoded Folder2",
                CreationDate = DateTime.Now,
                Level = 1,
                HasPublicAccess = false
            };


            return new[] { folder1, folder2 };
            
        }


        [HttpGet("{id}", Name = "GetFolders")]
        public IEnumerable<FileInfo> GetFilesContent(string FolderId)
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





    }
}
