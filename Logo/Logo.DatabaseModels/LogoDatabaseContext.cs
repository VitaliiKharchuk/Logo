using System.Data.Entity;

namespace Logo.DatabaseModels
{
    public class LogoDatabaseContext : DbContext
    {
        public LogoDatabaseContext()
            : base("name=LogoDatabaseContext")
        {
        }

        public virtual DbSet<File> Files { get; set; }
        public virtual DbSet<Folder> Folders { get; set; }
        public virtual DbSet<Tag> Tags { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<File>()
                .HasMany(e => e.Tags)
                .WithMany(e => e.Files)
                .Map(m => m.ToTable("FilesToTags").MapLeftKey("FileID").MapRightKey("TagID"));

            modelBuilder.Entity<Folder>()
                .HasMany(e => e.Files)
                .WithOptional(e => e.Folder)
                .HasForeignKey(e => e.ParentFolderID);

            modelBuilder.Entity<Folder>()
                .HasMany(e => e.Folders1)
                .WithOptional(e => e.Folder1)
                .HasForeignKey(e => e.ParentFolderID);

            modelBuilder.Entity<Folder>()
                .HasMany(e => e.Users)
                .WithMany(e => e.Folders)
                .Map(m => m.ToTable("FoldersToUsers").MapLeftKey("FolderID").MapRightKey("UserID"));
        }
    }
}
