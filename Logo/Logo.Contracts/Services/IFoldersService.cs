using System;
using System.Collections.Generic;


namespace Logo.Contracts.Services
{
    public interface IFoldersService
    {
        FolderInfo GetFolder(Guid folderId);
        void CreateFolder(ObjectCredentialsWithOwner folderCredentials);
        void RenameFolder(UpdatedObject updatedFolder);
        void DeleteFolder(Guid folderId);

        FileInfo GetFile(Guid folderId);
        void CreateFile(ObjectCredentialsWithOwner folderCredentials);
        void RenameFile(UpdatedObject updatedFolder);
        void DeleteFile(Guid folderId);

        IEnumerable<FolderInfo> GetFoldersInFolder(Guid folderId);
        IEnumerable<FileInfo> GetFilesInFolder(Guid folderId);

        IEnumerable<FolderInfo> GetAllFolders();  //only  for   testing
        IEnumerable<FileInfo> GetAllFiles();  //only  for   testing
    }

}
