CREATE TABLE [dbo].[Files]
(
	[FileID] uniqueidentifier NOT NULL  DEFAULT newid() PRIMARY KEY,
	[ParentFolderID] uniqueidentifier FOREIGN KEY REFERENCES Folders(FolderID),
	[Name] nvarchar(50) NOT NULL,
	[CreationDate] datetime,
	[UploadDate] datetime,
	[Size] int,
	[Url] nvarchar(100)
)
