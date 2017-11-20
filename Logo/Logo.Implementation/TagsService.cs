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

        public Tag CreateTag(TagsCredentials tagsCredentials)
        {
            Tag tag = new Tag { Name = tagsCredentials.Text, TagId = Guid.NewGuid() };
            _dbContext.Add(tag);
            _dbContext.SaveChanges();

            return tag;
        }

        public void CreateTagToFolder(TagsCredentials tagsCredentials)
        {

            Tag tag = CreateTag(tagsCredentials);

            FoldersToTags foldersToTags = new FoldersToTags
            {
                FolderId = tagsCredentials.ObjectId,
                TagId = tag.TagId
            };

            _dbContext.Add(foldersToTags);
            _dbContext.SaveChanges();
        }

        public void CreateTagToFile(TagsCredentials tagsCredentials)
        {
            Tag tag = CreateTag(tagsCredentials);

            FilesToTags foldersToTags = new FilesToTags
            {
                FileId = tagsCredentials.ObjectId,
                TagId = tag.TagId
            };

            _dbContext.Add(foldersToTags);
            _dbContext.SaveChanges();
        }

        public void DeleteTagsFromFile(Guid fileId)
        {
            var fileToTag = _dbContext.FilesToTags
                .Where(t => t.FileId == fileId)
                .FirstOrDefault();

            if (fileToTag != null)
                _dbContext.FilesToTags.Remove(fileToTag);

            _dbContext.SaveChanges();
        }


        public void DeleteTagsFromFolder(Guid folderId)
        {
            var folderToTags = _dbContext.FoldersToTags
                  .Where(t => t.FolderId == folderId)
                  .FirstOrDefault();

            if (folderToTags != null)
                _dbContext.FoldersToTags.Remove(folderToTags);

            _dbContext.SaveChanges();
        }

        public IEnumerable<string> GetFileTags(Guid fileId)
        {
            return _dbContext.FilesToTags.Where(t => t.FileId == fileId)
            .Select(t => t.Tag.Name)
            .ToList();
        }

        public IEnumerable<string> GetFolderTags(Guid folderId)
        {
            return _dbContext.FoldersToTags.Where(t => t.FolderId == folderId)
            .Select(t => t.Tag.Name)
            .ToList();
        }

        public IEnumerable<string> GetAllTags()
        {
            return _dbContext.Tags
             .Select(t => t.Name)
             .ToList();
        }
    }
}
