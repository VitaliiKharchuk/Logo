using System.Collections.Generic;
using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;
using Logo.Contracts.Services;
using Logo.Web.Models;
using Logo.Contracts;
using System.Linq;


using Logo.Implementation;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Logo.Web.Controllers
{

    [Authorize("Bearer")]
    [Route("api/[controller]")]
    [ServiceFilter(typeof(ApiExceptionFilter))]
    public class FilesController : Controller
    {
        IFilesService _filesService;
        IFoldersService _foldersService;
        IHttpContextAccessor _httpContextAccessor;
        public FilesController(IFilesService filesService, IFoldersService foldersService, IHttpContextAccessor httpContextAccessor)
        {
            _filesService = filesService;
            _foldersService = foldersService;
            _httpContextAccessor = httpContextAccessor;
        }


        [HttpPost]
        [Route("upload-file")]
        public IActionResult UploadFile([FromBody] LoadedFileUI file)
        {
            try
            {
                Guid ownerId = new Guid(HttpContext.User.Claims.ToList()
                                      .Where(item => item.Type == "UserId")
                                      .Select(item => item.Value)
                                      .FirstOrDefault());

                Guid fileId = _foldersService.CreateFile(new ObjectCredentialsWithOwner
                {
                    OwnerId = ownerId,
                    ObjectCredentials = new ObjectCredentials
                    {
                        Name = file.FileName,
                        ParentObjectId = file.ParentFolderId,
                        //CreationDate = file.CreationDate,
                        //Size = file.FileContent.Length

                        CreationDate = DateTime.Now,
                        Size = -1

                    }
                });

                //byte[] arr = System.IO.File.ReadAllBytes(file.FileName);  //for  testing

                _filesService.SimpleUploadStreamAsync(new LoadedFileBack
                {
                    FileNameInBlob = fileId,
                    Stream = new MemoryStream(file.FileContent)
                });
            }

            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }

            return Ok();
        }


        [HttpGet]
        [Route("download-file/{fileId?}")]
        public IActionResult DownloadedFile(Guid fileId)
        {

            

            try
            {
                Guid ownerId = new Guid(HttpContext.User.Claims.ToList()
                                      .Where(item => item.Type == "UserId")
                                      .Select(item => item.Value)
                                      .FirstOrDefault());
            }

            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }

            Contracts.FileInfo fileInfo = _foldersService.GetFile(fileId);

            byte[] arr = _filesService.SimpleDownloadAsync(fileId.ToString()).GetAwaiter().GetResult();

            return Ok(new LoadedFileUI
            {
                FileContent = arr,
                FileName = fileInfo.Name,
                CreationDate = fileInfo.UploadDate

            });
        }

        [HttpPost("upload-request")]
        public IActionResult Upload([FromBody] LoadedFileUI loadedFile)
        {
            Guid ownerId = new Guid(HttpContext.User.Claims.ToList()
                                  .Where(item => item.Type == "UserId")
                                  .Select(item => item.Value)
                                  .FirstOrDefault());

            var files = Request.Form.Files;

            foreach (var file in files)   //  only  one  file
            {
                // to do save

                Guid fileId = _foldersService.CreateFile(new ObjectCredentialsWithOwner
                {
                    OwnerId = ownerId,
                    ObjectCredentials = new ObjectCredentials
                    {
                        Name = file.FileName,
                        ParentObjectId = loadedFile.ParentFolderId,
                        CreationDate = loadedFile.CreationDate,                        
                        Size = file.Length

                    }
                });

                MemoryStream ms = new MemoryStream();
                file.CopyTo(ms);

                _filesService.SimpleUploadStreamAsync(new LoadedFileBack
                {
                    Stream = ms,
                  FileNameInBlob = fileId
                } );
            }

            return Ok();
        }

    }
        
}
