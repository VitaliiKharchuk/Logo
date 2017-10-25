CREATE TABLE [dbo].[FilesToTags]
(
	[FileID] uniqueidentifier FOREIGN KEY REFERENCES [Files](FileID),
	[TagID] INT FOREIGN KEY REFERENCES Tags(TagID),
	CONSTRAINT FileTagKey PRIMARY KEY (FileID, TagID)
)
