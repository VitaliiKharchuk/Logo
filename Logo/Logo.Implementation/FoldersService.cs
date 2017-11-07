using System;
using System.Linq;
using Logo.Contracts;
using Logo.Contracts.Services;
using Logo.Implementation.DatabaseModels;


namespace Logo.Implementation
{
    public class FoldersService : IFoldersService
    {
        private readonly LogoDbContext _dbContext;

        public FoldersService(LogoDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public FolderInfo CreateFolder(string folderName, Guid ownerId, Guid ? parentFolderId)
        {
            FolderInfo folder = new FolderInfo
            {
                FolderId = Guid.NewGuid(),
                OwnerId = ownerId,
                ParentFolderId = parentFolderId,
                Name = folderName,
                CreationDate = DateTime.Now,
                UploadDate = null,
                Level =  parentFolderId == null ? 0 : GetFolder(ownerId).Level + 1,
                HasPublicAccess = false
            };

            return folder;
        }

        public FolderInfo GetFolder(Guid folderId)
        {
            var folder = _dbContext.Folders.FirstOrDefault(x => x.FolderId.Equals(folderId));


            if (folder == null)
            {
                throw new InvalidOperationException("Folder not found.");
                //return null;
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

        public void AddFolder(FolderInfo folder)
        {
            _dbContext.Add
                  (new Folder
                  {
                      FolderId = folder.FolderId,
                      OwnerId = folder.OwnerId,
                      ParentFolderId = folder.ParentFolderId,
                      Name = folder.Name,
                      CreationDate = folder.CreationDate,
                      UploadDate = folder.UploadDate,
                      Level = folder.Level,
                      HasPublicAccess = folder.HasPublicAccess
                  });

            _dbContext.SaveChanges();
        }

        public void DeleteFolder(Guid folderId)
        {
            var folder = GetFolder(folderId);
            _dbContext.Remove(folder);
            _dbContext.SaveChanges();
        }
    }
}



