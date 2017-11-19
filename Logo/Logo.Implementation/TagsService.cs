using System;
using System.Collections.Generic;
using Logo.Implementation.DatabaseModels;
using System.Linq;
using Logo.Contracts;
using Logo.Contracts.Services;

namespace Logo.Implementation
{
    public class TagsService : ITagsService
    {
        LogoDbContext _dbContext;

        public TagsService(LogoDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void CreateTag(TagsCredentials tagsCredentials)
        {
            Tag tag = new Tag { Name = tagsCredentials.Text, TagId = Guid.NewGuid() };
            _dbContext.Add(tag);

            _dbContext.SaveChanges();

            if (tagsCredentials.ObjectType.Equals(ObjectType.File))
            {
                FilesToTags filesToTags = new FilesToTags
                {
                    FileId = tagsCredentials.ObjectId,
                    TagId = tag.TagId
                };
                _dbContext.Add(filesToTags);
            }

            else
            {
                FoldersToTags foldersToTags = new FoldersToTags
                {
                    FolderId = tagsCredentials.ObjectId,
                    TagId = tag.TagId
                };

                _dbContext.Add(foldersToTags);
            }

            _dbContext.SaveChanges();
        }

        public IEnumerable<TagInfo> GetFileTags(Guid fileId)
        {
            return _dbContext.FilesToTags.Where(t => t.FileId == fileId)
            .Select(t => new TagInfo()
            {
                TagName = t.Tag.Name
            })
            .ToList();
        }

        public IEnumerable<TagInfo> GetFolderTags(Guid folderId)
        {
            return _dbContext.FoldersToTags.Where(t => t.FolderId == folderId)
            .Select(t => new TagInfo()
            {
                TagName = t.Tag.Name
            })
            .ToList();
        }

        public IEnumerable<TagInfo> GetAllTags()
        {
            return _dbContext.Tags.Select(t => new TagInfo()
            {
                TagName = t.Name
            })
            .ToList();
        }


    }
}
