/* SQL Server database and table creation script */

IF DB_ID(N'AdvertisingDb') IS NULL
BEGIN
    CREATE DATABASE [AdvertisingDb];
END
GO

USE [AdvertisingDb];
GO

IF OBJECT_ID(N'dbo.Users', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Users]
    (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [FirstName] NVARCHAR(200) NOT NULL,
        [LastName] NVARCHAR(200) NOT NULL,
        [Email] NVARCHAR(256) NOT NULL UNIQUE,
        [PasswordHash] NVARCHAR(500) NOT NULL,
        [CreatedDate] DATETIME NOT NULL DEFAULT(GETUTCDATE())
    );
END
GO

IF OBJECT_ID(N'dbo.Services', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Services]
    (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [Name] NVARCHAR(250) NOT NULL,
        [Description] NVARCHAR(MAX) NOT NULL,
        [Price] DECIMAL(18,2) NOT NULL,
        [CreatedDate] DATETIME NOT NULL DEFAULT(GETUTCDATE()),
        [UpdatedDate] DATETIME NULL
    );
END
GO
