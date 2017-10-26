CREATE TABLE [dbo].[Folders]
(
	[FolderID] uniqueidentifier NOT NULL  DEFAULT newid() PRIMARY KEY,
	[ParentFolderID] uniqueidentifier FOREIGN KEY REFERENCES Folders(FolderID),
	[Name] nvarchar(50) NOT NULL,
	[CreationDate] datetime,
	[UploadDate] datetime,
	[Level] int NOT NULL,
	[HasPublicAccess] bit DEFAULT 0,
	CONSTRAINT FK_Folder_ParentID_NonSelf CHECK (FolderID <> ParentFolderID)
)
