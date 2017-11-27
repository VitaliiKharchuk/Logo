using Logo.Contracts;
using Logo.Contracts.Services;
using Logo.Implementation;
using Logo.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;
using System.Net;
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

         
        [HttpGet]
        [Route("download-file/{fileId?}")]
        public IActionResult DownloadedFile(Guid fileId)
        {
            byte[] arr = null;
            try
            {
                Guid ownerId = new Guid(HttpContext.User.Claims.ToList()
                                      .Where(item => item.Type == "UserId")
                                      .Select(item => item.Value)
                                      .FirstOrDefault());

                Contracts.FileInfo fileInfo = _foldersService.GetFile(fileId);

                arr = _filesService.SimpleDownloadAsync(fileId.ToString()).GetAwaiter().GetResult();

                Request.HttpContext.Response.Headers.Add("Content-Extention",String.Format( "image/{0}", _foldersService.GetFileExstention(fileInfo.Name)));
                Request.HttpContext.Response.Headers.Add("File-Name", fileInfo.Name);
            }

            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }

            
            ObjectResult objectResult = new ObjectResult(arr)
            {
                StatusCode = (int)HttpStatusCode.OK
            };

            return objectResult;
        }

        /*
        

        [HttpPost]
        [Route("upload-request")]
        public IActionResult Upload(LoadedFileUI file)
        {

            try
            {
                if (file == null) throw new Exception("File is null");
                if (file.FileContent.Length == 0) throw new Exception("File is empty");

                Guid ownerId = new Guid(HttpContext.User.Claims.ToList()
                                    .Where(item => item.Type == "UserId")
                                    .Select(item => item.Value)
                                    .FirstOrDefault());

                Guid fileId = _foldersService.CreateFile(new ObjectCredentialsWithOwner
                {
                    OwnerId = ownerId,
                    ObjectCredentials = new ObjectCredentials
                    {
                        Name = file.FileContent.FileName,
                        ParentObjectId = file.ParentFolderId,
                        CreationDate = file.CreationDate,
                        Size = file.FileContent.Length,
                        Tags = file.Tags
                    }
                });

                using (Stream stream = file.FileContent.OpenReadStream())
                {
                    stream.Position = 0;
                    _filesService.SimpleUploadStreamAsync(new LoadedFileBack()
                    {
                        Stream = stream,
                        FileNameInBlob = fileId
                    });

                    byte[] resizedImage = _filesService.ResizeImage(stream);

                    _foldersService.SetThumbnail(fileId, resizedImage);

                }
            }

            catch(Exception ex)
            {
                return Json(new { success = false, message = ex.Message });

            }

            return Ok();
        }
        */

            [HttpPost]
            [Route("upload-request")]
            public  async Task <IActionResult> Upload(LoadedFileUI file)
            {
                
                try
                {
                    if (file == null) throw new Exception("Не  выбран  файл");
                    if (file.FileContent.Length == 0) throw new Exception("Файл  пустой");

                    Guid ownerId = new Guid(HttpContext.User.Claims.ToList()
                                        .Where(item => item.Type == "UserId")
                                        .Select(item => item.Value)
                                        .FirstOrDefault());

                    Guid fileId = _foldersService.CreateFile(new ObjectCredentialsWithOwner
                    {
                        OwnerId = ownerId,
                        ObjectCredentials = new ObjectCredentials
                        {
                            Name = file.FileContent.FileName,
                            ParentObjectId = file.ParentFolderId,
                            CreationDate = DateTime.Now,
                            Size = file.FileContent.Length,
                            Tags = file.Tags
                        }
                    });

                    using (Stream stream = new MemoryStream())
                    {
                        await file.FileContent.OpenReadStream().CopyToAsync(stream);

                        stream.Position = 0;
                        await _filesService.SimpleUploadStreamAsync(new LoadedFileBack()
                        {
                            Stream = stream,
                            FileNameInBlob = fileId
                        });

                        stream.Position = 0;
                        byte[] resizedImage = _filesService.ResizeImage(stream);

                        _foldersService.SetThumbnail(fileId, resizedImage);
                    }
                }


                catch (Exception ex)
                {
                    return Json(new { success = false, message = ex.Message });
                }
           
                 return Ok();
            }
        }
    }
