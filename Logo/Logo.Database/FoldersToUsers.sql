CREATE TABLE [dbo].[FoldersToUsers]
(
	[FolderID] uniqueidentifier FOREIGN KEY REFERENCES Folders(FolderID),
	[UserID] uniqueidentifier FOREIGN KEY REFERENCES Users(UserID),
	CONSTRAINT FolderUserKey PRIMARY KEY ([FolderID], [UserID])
)
