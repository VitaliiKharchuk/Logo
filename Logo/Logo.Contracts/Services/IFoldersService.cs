using System;
using System.Collections.Generic;
using System.Text;

namespace Logo.Contracts.Services
{
    public interface IFoldersService
    {
        FolderInfo CreateFolder(FolderCredentials folderCredentials);
        FolderInfo GetFolder(Guid folderId);
        void AddFolder(FolderInfo folder);
        void DeleteFolder(Guid folderId);
        bool ContainseFolder(FolderCredentials folderCredentials);


        IEnumerable<FolderInfo> GetAllFolders();  //only  for   testing
        IEnumerable<FolderInfo> GetFoldersInFolder(Guid FolderId);
        IEnumerable<FileInfo> GetFilesInFolder(Guid FolderId);


    }
}
