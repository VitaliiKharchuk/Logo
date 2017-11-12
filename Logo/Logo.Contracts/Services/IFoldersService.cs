using System;
using System.Collections.Generic;
using System.Text;

namespace Logo.Contracts.Services
{
    public interface IFoldersService
    {
        FolderInfo CreateFolder( string folderName, Guid ownerId, Guid ? parentFolderId);
        FolderInfo GetFolder(Guid folderId);
        void AddFolder(FolderInfo folder);
        void DeleteFolder(Guid folderId);



        IEnumerable<FolderInfo> GetAllFolders();  //only  for   testing

        IEnumerable<FolderInfo> GetFoldersInFolder(Guid FolderId);
        IEnumerable<FileInfo> GetFilesInFolder(Guid FolderId);


    }
}
