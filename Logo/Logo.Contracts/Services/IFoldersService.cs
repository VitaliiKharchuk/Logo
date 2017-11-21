using System;
using System.Collections.Generic;


namespace Logo.Contracts.Services
{
    public interface IFoldersService
    {
        IEnumerable<FolderInfo> GetRootFolders(Guid ownerId);
        FolderInfo GetFolder(Guid folderId);
        void CreateFolder(ObjectCredentialsWithOwner folderCredentials);
        void RenameFolder(UpdatedObject updatedFolder);
        void DeleteFolder(Guid folderId);

        IEnumerable<FileInfo> GetRootFiles(Guid ownerId);
        FileInfo GetFile(Guid folderId);
        void CreateFile(ObjectCredentialsWithOwner folderCredentials);
        void RenameFile(UpdatedObject updatedFolder);
        void DeleteFile(Guid folderId);


        IEnumerable<ObjectCredentials> GetPathToRoot(Guid FolderId);

        IEnumerable<FolderInfo> GetFoldersInFolder(Guid folderId);
        IEnumerable<FileInfo> GetFilesInFolder(Guid folderId);

        IEnumerable<FolderInfo> GetAllFolders();  //only  for   testing
        IEnumerable<FileInfo> GetAllFiles();  //only  for   testing
    }

}
