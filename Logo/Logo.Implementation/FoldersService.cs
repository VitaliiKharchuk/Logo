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

        public void CreateFolder(FolderCredentials folderCredentials)
        {
            if (IsParentContainseFolder(folderCredentials))
                throw new InvalidOperationException("Folder with   this  name  already  exists.");

            FolderInfo rootFolder = null;
            if (folderCredentials.ParentFolderId != null)
            {
                rootFolder = GetFolder((Guid)folderCredentials.ParentFolderId);

                if (rootFolder.Level == maxRootLevel)
                    throw new InvalidOperationException("Attachment  level  is  maximum");
            }

            _dbContext.Add
                (new Folder
                {
                    FolderId = Guid.NewGuid(),
                    OwnerId = folderCredentials.OwnerId,
                    ParentFolderId = folderCredentials.ParentFolderId,
                    Name = folderCredentials.Name,
                    CreationDate = DateTime.Now,
                    UploadDate = null,
                    Level = folderCredentials.ParentFolderId == null ? 0 : rootFolder.Level + 1,
                    HasPublicAccess = false

                });

            _dbContext.SaveChanges();
        }

        public void RenameFolder(Guid folderId, string updatedFolderName)
        {
            FolderInfo folder = GetFolder(folderId);

            if (folder == null)
            {
                throw new InvalidOperationException("Folder not found.");
            }

            if (IsParentContainseFolder(new FolderCredentials
            {
                Name = updatedFolderName,
                OwnerId = folder.OwnerId,
                ParentFolderId = folder.ParentFolderId
            }))
            {
                throw new InvalidOperationException("Folder with   this  name  already  exists.");
            }

            _dbContext.Folders.FirstOrDefault().Name = updatedFolderName;

            _dbContext.SaveChanges();
        }



        public void DeleteFolder(Guid folderId)  //  need    recursive  deleting   
        {
            var folder = GetFolder(folderId);

            if (folder == null)
            {
                throw new InvalidOperationException("Folder  doesn't exist");
            }

            _dbContext.Remove(folder);

            _dbContext.SaveChanges();
        }

        public bool IsParentContainseFolder(FolderCredentials folderCredentials)
        {
            return _dbContext.Folders.Where(x => x.ParentFolderId.Equals(folderCredentials.ParentFolderId) && x.OwnerId.Equals(folderCredentials.OwnerId)).Any(s => s.Name.Equals(folderCredentials.Name));
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



