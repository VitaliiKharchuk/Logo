using System;
using System.Collections.Generic;


namespace Logo.Contracts.Services
{
    public interface IFoldersService
    {
        FolderInfo GetFolder(Guid folderId);
        void CreateFolder(FolderCredentials folderCredentials);
        void RenameFolder(Guid folderId, string updatedFolderName);
        void DeleteFolder(Guid folderId);

        IEnumerable<FolderInfo> GetAllFolders();  //only  for   testing
        IEnumerable<FolderInfo> GetFoldersInFolder(Guid folderId);
        IEnumerable<FileInfo> GetFilesInFolder(Guid folderId);
    }
}
