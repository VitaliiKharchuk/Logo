using System;
using System.Linq;
using Logo.Contracts;
using Logo.Contracts.Services;
using Logo.Implementation.DatabaseModels;
using System.Collections.Generic;
using System.IO;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;

namespace Logo.Implementation
{

    public enum FileExtentions
    {
        jpg,
        png,
        mov,
        avi,
        mkv
    }


    public class FoldersService : IFoldersService
    {
        private readonly LogoDbContext _dbContext;
        private readonly ITagsService _tagsService;
        private readonly IFilesService _filesService;


        private readonly int maxRootLevel = 9;   //[0..9]
        private readonly int maxNameLong = 50;   //[0..9]


        public FoldersService(LogoDbContext dbContext, ITagsService tagsService, IFilesService filesService)
        {
            _dbContext = dbContext;
            _tagsService = tagsService;
            _filesService = filesService;
        }

        public FolderInfo GetFolder(Guid folderId)
        {
            var folder = _dbContext.Folders.FirstOrDefault(x => x.FolderId.Equals(folderId));

            if (folder == null)
            {
                throw new InvalidOperationException("Folder not found.");
            }

            return new FolderInfo
            {
                FolderId = folder.FolderId,
                OwnerId = folder.OwnerId,
                ParentFolderId = folder.ParentFolderId,
                Name = folder.Name,
                CreationDate = folder.CreationDate,
                UploadDate = folder.UploadDate,
                Level = folder.Level,
                HasPublicAccess = folder.HasPublicAccess
            };
        }



        public Contracts.FileInfo GetFile(Guid fileId)
        {
            var file = _dbContext.Files.FirstOrDefault(x => x.FileId.Equals(fileId));

            if (file == null)
            {
                throw new InvalidOperationException("File not found.");
            }

            return new Contracts.FileInfo
            {

                FileId = file.FileId,
                ParentFolderId = file.ParentFolderId,
                OwnerId = file.OwnerId,
                Name = file.Name,
                CreationDate = file.CreationDate,
                UploadDate = file.UploadDate,
                Size = file.Size,
                Type = file.Type,
                HasPublicAccess = file.HasPublicAccess
            };
        }


        public void CreateFolder(ObjectCredentialsWithOwner folderCredentialsWithOwner)
        {
            if (folderCredentialsWithOwner.ObjectCredentials.Name.Length > maxNameLong)
                throw new InvalidOperationException("Long  name of  folder");


            if (IsParentContainseFolder(folderCredentialsWithOwner) || IsParentContainseFile(folderCredentialsWithOwner))
                throw new InvalidOperationException("Folder or  file  with   this  name  already  exists.");

            FolderInfo rootFolder = null;
            if (folderCredentialsWithOwner.ObjectCredentials.ParentObjectId != null)
            {
                rootFolder = GetFolder((Guid)folderCredentialsWithOwner.ObjectCredentials.ParentObjectId);   //   get   parant  of  curent folder

                if (rootFolder.Level == maxRootLevel)
                    throw new InvalidOperationException("Attachment  level  is  maximum");
            }
            
            _dbContext.Add
                (new Folder
                {
                    FolderId = Guid.NewGuid(),
                    OwnerId = folderCredentialsWithOwner.OwnerId,
                    ParentFolderId = folderCredentialsWithOwner.ObjectCredentials.ParentObjectId,
                    Name = folderCredentialsWithOwner.ObjectCredentials.Name,
                    CreationDate = DateTime.Now,
                    UploadDate = null,
                    Level = folderCredentialsWithOwner.ObjectCredentials.ParentObjectId == null ? 0 : rootFolder.Level + 1,
                    HasPublicAccess = false
                });

            
            _dbContext.SaveChanges();
        }

        public Guid CreateFile(ObjectCredentialsWithOwner fileCredentialsWithOwner)
        {
            if (fileCredentialsWithOwner.ObjectCredentials.Name.Length > maxNameLong)
                throw new InvalidOperationException("Long  name of file");

            if (IsParentContainseFolder(fileCredentialsWithOwner) || IsParentContainseFile(fileCredentialsWithOwner))
                throw new InvalidOperationException("Folder or  file  with   this  name  already  exists.");

            string fileExtention = Path.GetExtension(fileCredentialsWithOwner.ObjectCredentials.Name);
            if (
                      fileExtention == "." + FileExtentions.avi.ToString("g")    //   gavnocode!    rewrite need
                   || fileExtention == "." + FileExtentions.jpg.ToString("g")
                   || fileExtention == "." + FileExtentions.mkv.ToString("g")
                   || fileExtention == "." + FileExtentions.mov.ToString("g")
                   || fileExtention == "." + FileExtentions.png.ToString("g")
                )

            {

                Guid fileId = Guid.NewGuid();   //this value   is  name of file in   blockblob

                _dbContext.Add
                    (new DatabaseModels.File
                    {
                        FileId = fileId,
                        OwnerId = fileCredentialsWithOwner.OwnerId,
                        ParentFolderId = fileCredentialsWithOwner.ObjectCredentials.ParentObjectId,
                        Name = fileCredentialsWithOwner.ObjectCredentials.Name,
                        CreationDate = fileCredentialsWithOwner.ObjectCredentials.CreationDate,
                        UploadDate = DateTime.Now,
                        Size = fileCredentialsWithOwner.ObjectCredentials.Size,     
                        Type = -1, //Enum.TryParse(FileExtentions.avi, Path.GetExtension(fileCredentialsWithOwner.ObjectCredentials.Name, )  ,      //need  implementation
                        HasPublicAccess = false
                    });


                //byte[] array = System.IO.File.ReadAllBytes(fileCredentialsWithOwner.ObjectCredentials.Name);
                //MemoryStream fs = new MemoryStream(array);

                
                _dbContext.SaveChanges();

                return fileId;
            }

            else
                throw new InvalidOperationException("Extention of file is unsuitable");
        }

        public void RenameFolder(UpdatedObject updatedFolder)
        {

            if (updatedFolder.updatedName.Length > maxNameLong)
                throw new InvalidOperationException("Long  name");


            FolderInfo folder = GetFolder(updatedFolder.ObjectId);



            ObjectCredentialsWithOwner folderCredentialsWithOwner = new ObjectCredentialsWithOwner
            {
                ObjectCredentials = new ObjectCredentials
                {
                    ParentObjectId = folder.ParentFolderId,
                    Name = updatedFolder.updatedName,
                },

                OwnerId = folder.OwnerId
            };


            if (IsParentContainseFolder(folderCredentialsWithOwner) || IsParentContainseFile(folderCredentialsWithOwner))
            {
                throw new InvalidOperationException("Folder with  or file with   this  name  already  exists.");
            }

            _dbContext.Folders.Where(f => f.FolderId == updatedFolder.ObjectId).FirstOrDefault().Name = updatedFolder.updatedName;

            _dbContext.SaveChanges();
        }


        public void RenameFile(UpdatedObject updatedFile)
        {
            if (updatedFile.updatedName.Length > maxNameLong)
                throw new InvalidOperationException("Long  name of fie");

            Contracts.FileInfo file = GetFile(updatedFile.ObjectId);

            ObjectCredentialsWithOwner fileCredentialsWithOwner = new ObjectCredentialsWithOwner
            {
                ObjectCredentials = new ObjectCredentials
                {
                    ParentObjectId = file.ParentFolderId,
                    Name = updatedFile.updatedName,
                },

                OwnerId = file.OwnerId
            };


            if (IsParentContainseFolder(fileCredentialsWithOwner) || IsParentContainseFile(fileCredentialsWithOwner))
            {
                throw new InvalidOperationException("Folder with  or file with   this  name  already  exists.");
            }

            _dbContext.Files.Where(f => f.FileId == updatedFile.ObjectId).FirstOrDefault().Name = updatedFile.updatedName;

            _dbContext.SaveChanges();
        }




        public void DeleteFolder(Guid folderId)  //  need    recursive  deleting   
        {
            var folder = GetFolder(folderId);
            _tagsService.DeleteTagsFromFolder(folderId);

            
            List<FolderInfo> folders = GetFoldersInFolder(folderId).ToList();
            List<Contracts.FileInfo> files = GetFilesInFolder(folderId).ToList();

            foreach (var fileInfo in files)       // delete all  files in  current  dirictory
            {
                DeleteFile(fileInfo.FileId);
            }

            foreach (var folderinfo in folders)   //deep   recursive to   sub -  directives   and   delete   them
            {
                DeleteFolder(folderinfo.FolderId);
            }

            var folderRoot = _dbContext.Folders.FirstOrDefault(x => x.FolderId == folderId);         // delete  root  directory   
            _dbContext.Folders.Remove(folderRoot);

            _dbContext.SaveChanges();
        }


      
        public void DeleteFile(Guid fileId)  
        {
            _tagsService.DeleteTagsFromFile(fileId);
            var  file = _dbContext.Files.FirstOrDefault(x => x.FileId == fileId);
            _dbContext.Files.Remove(file);

            _dbContext.SaveChanges();
        }

        public bool IsParentContainseFolder(ObjectCredentialsWithOwner folderCredentialsWithOwner)
        {
            return _dbContext.Folders
                   .Where(x => x.ParentFolderId.Equals(folderCredentialsWithOwner.ObjectCredentials.ParentObjectId)
                   && x.OwnerId.Equals(folderCredentialsWithOwner.OwnerId))
                   .Any(s => s.Name.Equals(folderCredentialsWithOwner.ObjectCredentials.Name));
        }

        public bool IsParentContainseFile(ObjectCredentialsWithOwner objectCredentialsWithOwner)
        {
            return _dbContext.Files
                   .Where(x => x.ParentFolderId.Equals(objectCredentialsWithOwner.ObjectCredentials.ParentObjectId)
                   && x.OwnerId.Equals(objectCredentialsWithOwner.OwnerId))
                   .Any(s => s.Name.Equals(objectCredentialsWithOwner.ObjectCredentials.Name));
        }

        public IEnumerable<FolderInfo> GetAllFolders()   //only  for  testing
        {
            return _dbContext.Set<Folder>().Select(
               y => new FolderInfo()
               {
                   FolderId = y.FolderId,
                   ParentFolderId = y.ParentFolderId,
                   OwnerId = y.OwnerId,
                   Name = y.Name,
                   CreationDate = y.CreationDate,
                   UploadDate = y.UploadDate,
                   Level = y.Level,
                   HasPublicAccess = y.HasPublicAccess,

                   //TagList = _tagsService.GetFolderTags(y.FolderId)

               });
        }

        public IEnumerable<Contracts.FileInfo> GetAllFiles()   //only  for  testing
        {
            return _dbContext.Set<DatabaseModels.File>().Select(
               y => new Contracts.FileInfo()
               {
                   FileId = y.FileId,
                   ParentFolderId = y.ParentFolderId,
                   OwnerId = y.OwnerId,
                   Name = y.Name,
                   CreationDate = y.CreationDate,
                   UploadDate = y.UploadDate,
                   Size = y.Size,
                   Type = y.Type,
                   HasPublicAccess = y.HasPublicAccess,
                  // TagList = _tagsService.GetFolderTags(y.FileId)
               });
        }



        public IEnumerable<FolderInfo> GetFoldersInFolder(Guid FolderId)
        {
            return _dbContext.Folders.Where(x => x.ParentFolderId.Equals(FolderId)).Select(y => new FolderInfo()
            {
                FolderId = y.FolderId,
                ParentFolderId = y.ParentFolderId,
                OwnerId = y.OwnerId,
                Name = y.Name,
                CreationDate = y.CreationDate,
                UploadDate = y.UploadDate,
                Level = y.Level,
                HasPublicAccess = y.HasPublicAccess,
                TagList = new  string[] { "FolderTag1" ,  "FolderTag2" , "FolderTag3"  }

            }).ToList();
        }

        public IEnumerable<Contracts.FileInfo> GetFilesInFolder(Guid FileId)
        {
            return _dbContext.Files.Where(x => x.ParentFolderId.Equals(FileId)).Select(y => new Contracts.FileInfo()
            {
                FileId = y.FileId,
                ParentFolderId = y.ParentFolderId,
                OwnerId = y.OwnerId,
                Name = y.Name,
                CreationDate = y.CreationDate,
                UploadDate = y.UploadDate,
                Size = y.Size,
                Type = y.Type,
                HasPublicAccess = y.HasPublicAccess,
                TagList = new string[] { "FileTag1", "FileTag2", "FileTag3" }
                // TagList = _tagsService.GetFileTags(FileId)
            }).ToList();
        }


        public IEnumerable<FolderInfo> GetRootFolders(Guid ownerId)
        {

            return  _dbContext.Folders.Where(x => x.ParentFolderId ==  null && x.OwnerId == ownerId).Select(y => new FolderInfo()
            {
                FolderId = y.FolderId,
                ParentFolderId = y.ParentFolderId,
                OwnerId = y.OwnerId,
                Name = y.Name,
                CreationDate = y.CreationDate,
                UploadDate = y.UploadDate,
                Level = y.Level,
                HasPublicAccess = y.HasPublicAccess,
                //TagList = _tagsService.GetFolderTags(y.FolderId)

                TagList = new string[] { "FolderTag1", "FolderTag2", "FolderTag3" }

            }).ToList();
        }

       public  IEnumerable<Contracts.FileInfo> GetRootFiles(Guid ownerId)
       {
            return _dbContext.Files.Where(x => x.ParentFolderId == null && x.OwnerId == ownerId).Select(y => new Contracts.FileInfo()
            {
                FileId = y.FileId,
                ParentFolderId = y.ParentFolderId,
                OwnerId = y.OwnerId,
                Name = y.Name,
                CreationDate = y.CreationDate,
                UploadDate = y.UploadDate,
                Size = y.Size,
                Type = y.Type,
                HasPublicAccess = y.HasPublicAccess,

                TagList = new string [] { "FileTag1", "FileTag2", "FileTag3" }
                //TagList = _tagsService.GetFolderTags(y.FileId)

            }).ToList();
       }


       public IEnumerable<ObjectCredentials> GetPathToRoot(Guid  FolderId)
       {
            List<ObjectCredentials> parentList = new List<ObjectCredentials>();

            FolderInfo folderInfo = GetFolder(FolderId);

            parentList.Add(new ObjectCredentials
            {
                Name = folderInfo.Name,
                ParentObjectId = folderInfo.ParentFolderId
            });


            while(folderInfo.ParentFolderId !=  null)
            {

                FolderInfo parentFolder = GetFolder((Guid) folderInfo.ParentFolderId);
                parentList.Add(new ObjectCredentials
                {
                    Name = parentFolder.Name,
                    ParentObjectId = parentFolder.FolderId
                });

                folderInfo = parentFolder; 


            }

            return parentList;       
       }





    }
}



