CREATE TABLE [dbo].[Users]
(
	[UserID] uniqueidentifier NOT NULL DEFAULT newid() PRIMARY KEY,
	[Name] nvarchar(50) NOT NULL,
	[Password] nvarchar(50) NOT NULL,
	[Email] nvarchar(50) NOT NULL
)
