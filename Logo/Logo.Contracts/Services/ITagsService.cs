using System;
using System.Collections.Generic;
using System.Text;

namespace Logo.Contracts.Services
{
    public interface ITagsService
    {
        void CreateTag(TagsCredentials tagsCredentials);

        IEnumerable<TagInfo> GetFileTags(Guid fileId);

        IEnumerable<TagInfo> GetFolderTags(Guid folderId);

        IEnumerable<TagInfo> GetAllTags();
    }
}
