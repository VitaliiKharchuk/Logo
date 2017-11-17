using System;
using System.Collections.Generic;
using System.Text;

using Logo.Implementation.DatabaseModels;
using System.Linq;

namespace Logo.Implementation
{
    public class TagsService
    {
        LogoDbContext _dbContext;

        static  private  int _idTag = 0;

        public  TagsService (LogoDbContext dbContext )
        {
            _dbContext = dbContext;
        }

        public   void  CreateTag( Guid fileId , string  text)
        {

            File file = _dbContext.Files.Where(f => f.FileId == fileId).FirstOrDefault();


            Tag tag = new Tag { TagId = _idTag++ , Name = text };


            FilesToTags filesToTags = new FilesToTags {FileId = fileId,   File = file ,  Tag = tag, TagId = _idTag};

            

            _dbContext.Add(tag);

            _dbContext.SaveChangesAsync();
        }


        public  void  AddTag(Guid fileId, int tagId)
        {

            FilesToTags filesToTags = new FilesToTags { FileId = fileId, TagId = tagId };
        }

        public IEnumerable<Tag>  GetFileTags  (Guid fileId)
        {         
            return _dbContext.FilesToTags.Where(t => t.FileId == fileId).Select(t => t.Tag).ToList();
        }



    }
}
