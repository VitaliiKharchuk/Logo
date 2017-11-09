using System;
using System.Linq;
using Logo.Contracts;
using Logo.Contracts.Services;
using Logo.Implementation.DatabaseModels;
using System.Threading.Tasks;
using System.Net.Mail;

using System.Security.Cryptography;
using Microsoft.Extensions.Logging;

namespace Logo.Implementation
{
    public class UsersService : IUsersService 
    {
        private readonly LogoDbContext _dbContext;
        private readonly IFoldersService _folderService;
        private ILogger<ApiExceptionFilter> _logger;


        public UsersService(LogoDbContext dbContext,  IFoldersService foldersService, ILogger<ApiExceptionFilter> logger)
        {
            _dbContext = dbContext;
            _folderService = foldersService;
            _logger = logger;

            this._logger.LogError("some  error");
        }

        public UserInfo GetUser(UserCredentials userCredentials)
        {
            var userFromDatabase = _dbContext.Users.FirstOrDefault(x => x.Email == userCredentials.Email && x.Password == userCredentials.Password);

            if (userFromDatabase == null)
            {
                throw new InvalidOperationException("User not found.");
               
            }

            return new UserInfo
            {
                Id = userFromDatabase.UserId,
                Email = userFromDatabase.Email,
                Name = userFromDatabase.Name
            };
        }

        public void AddUser(UserFullInformation userFullInformation)
        {

            _dbContext.Add(new User
            {
                UserId = userFullInformation.UserId,
                Email = userFullInformation.Email,
                Password = userFullInformation.Password,
                Name = userFullInformation.Name
            });

            //FolderInfo rootUserFolder = _folderService.CreateFolder("Root", userFullInformation.UserId, null);   //  create  root  folder  for  user
            //_folderService.AddFolder(rootUserFolder);

            _dbContext.SaveChanges();
        }

        public bool ValidateUserCredentials(UserFullInformation userFullInformation)
        {
            var user = _dbContext.Users.FirstOrDefault(x => x.Email == userFullInformation.Email && x.Password == userFullInformation.Password);

            return (user == null &&
                IsValidEmail(userFullInformation.Email) && userFullInformation.Email.Length <= 254 &&
                !String.IsNullOrEmpty(userFullInformation.Password) && userFullInformation.Password.Length <= 32 &&
                !String.IsNullOrEmpty(userFullInformation.Name) && userFullInformation.Name.Length <= 50
                ) ? true : false;
        }

        public bool IsValidEmail(string emailaddress)
        {
            if (String.IsNullOrEmpty(emailaddress) || emailaddress.Length > 255)
                return false;
            try
            {
                MailAddress m = new MailAddress(emailaddress);
                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }


    }
}