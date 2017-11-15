using System;
using System.Linq;
using Logo.Contracts;
using Logo.Contracts.Services;
using Logo.Implementation.DatabaseModels;
using System.Collections.Generic;


namespace Logo.Implementation
{
    public class FoldersService : IFoldersService
    {
        private readonly LogoDbContext _dbContext;
        private readonly int maxRootLevel = 9;   //[0..9]
        private readonly int maxNameLong = 50;   //[0..9]


        public FoldersService(LogoDbContext dbContext)
        {
            _dbContext = dbContext;
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

        public void CreateFolder(FolderCredentialsWithOwner folderCredentialsWithOwner)
        {
            if  (folderCredentialsWithOwner.folderCredentials.Name.Length > maxNameLong)
                throw new InvalidOperationException("Long  name");


            if (IsParentContainseFolder(folderCredentialsWithOwner))
                throw new InvalidOperationException("Folder with   this  name  already  exists.");

            FolderInfo rootFolder = null;
            if (folderCredentialsWithOwner.folderCredentials.ParentFolderId != null)
            {
                rootFolder = GetFolder((Guid)folderCredentialsWithOwner.folderCredentials.ParentFolderId);   //   get   parent  of  curent folder

                if (rootFolder.Level == maxRootLevel)
                    throw new InvalidOperationException("Attachment  level  is  maximum");
            }

            _dbContext.Add
                (new Folder
                {
                    FolderId = Guid.NewGuid(),
                    OwnerId = folderCredentialsWithOwner.ownerId,
                    ParentFolderId = folderCredentialsWithOwner.folderCredentials.ParentFolderId,
                    Name = folderCredentialsWithOwner.folderCredentials.Name,
                    CreationDate = DateTime.Now,
                    UploadDate = null,
                    Level = folderCredentialsWithOwner.folderCredentials.ParentFolderId == null ? 0 : rootFolder.Level + 1,
                    HasPublicAccess = false

                });

            _dbContext.SaveChanges();
        }

        public void RenameFolder(UpdatedFolder updatedFolder)
        {

            if (updatedFolder.updatedName.Length > maxNameLong)
                throw new InvalidOperationException("Long  name");


            FolderInfo folder = GetFolder( updatedFolder.folderId);

            if (folder == null)
            {
                throw new InvalidOperationException("Folder not found.");
            }

            if (IsParentContainseFolder(new FolderCredentialsWithOwner
            {
 
                folderCredentials = new FolderCredentials
                {
                    ParentFolderId = folder.ParentFolderId,
                    Name = updatedFolder.updatedName,
                  
                },

                ownerId = folder.OwnerId,


            }))
            {
                throw new InvalidOperationException("Folder with   this  name  already  exists.");
            }

            _dbContext.Folders.Where( f => f.FolderId == updatedFolder.folderId).FirstOrDefault().Name =   updatedFolder.updatedName;

            _dbContext.SaveChanges();
        }
 
        public void DeleteFolder(Guid folderId)  //  need    recursive  deleting   
        {
            var folder = GetFolder(folderId);

            if (folder == null)
            {
                throw new InvalidOperationException("Folder  doesn't exist");
            }

            List<FolderInfo> folders = GetFoldersInFolder(folderId).ToList();
            List<FileInfo> files = GetFilesInFolder(folderId).ToList();


            foreach (var fileInfo in files)       // delete all  files in  current  dirictory
            {
                var file = _dbContext.Files.FirstOrDefault(x => x.FileId == fileInfo.FileId);
                _dbContext.Files.Remove(file);
            }

            foreach (var folderinfo in folders)   //deep   recursive to   sub -  directives   and   delete   them
            {
                DeleteFolder(folderinfo.FolderId);
            }

            var folderRoot = _dbContext.Folders.FirstOrDefault(x => x.FolderId == folderId);         // delete  root  directory   
            _dbContext.Folders.Remove(folderRoot);

            _dbContext.SaveChanges();
        }


        public bool IsParentContainseFolder(FolderCredentialsWithOwner folderCredentialsWithOwner)
        {
            return _dbContext.Folders
                   .Where(x => x.ParentFolderId.Equals(folderCredentialsWithOwner.folderCredentials.ParentFolderId)
                   && x.OwnerId.Equals(folderCredentialsWithOwner.ownerId))
                   .Any(s => s.Name.Equals(folderCredentialsWithOwner.folderCredentials.Name));
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
                   HasPublicAccess = y.HasPublicAccess
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
                HasPublicAccess = y.HasPublicAccess
            }).ToList();

        }

        public IEnumerable<FileInfo> GetFilesInFolder(Guid FolderId)
        {
            return _dbContext.Files.Where(x => x.ParentFolderId.Equals(FolderId)).Select(y => new FileInfo()
            {
                FileId = y.FileId,
                ParentFolderId = y.ParentFolderId,
                OwnerId = y.OwnerId,
                Name = y.Name,
                CreationDate = y.CreationDate,
                UploadDate = y.UploadDate,
                Size = y.Size,
                Type = y.Type,
                HasPublicAccess = y.HasPublicAccess
            }).ToList();
        }
    }
}



