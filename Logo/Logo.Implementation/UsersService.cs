using System;
using System.Linq;
using Logo.Contracts;
using Logo.Contracts.Services;
using Logo.Implementation.DatabaseModels;
using System.Threading.Tasks;
using System.Net.Mail;

using System.Security.Cryptography;

namespace Logo.Implementation
{
    public class UsersService : IUsersService 
    {
        private readonly LogoDbContext _dbContext;
        private readonly FoldersService _folderService;


        public UsersService(LogoDbContext dbContext)
        {
            _dbContext = dbContext;
            _folderService = new FoldersService(_dbContext);
        }

        public UserInfo GetUser(UserCredentials userCredentials)
        {
            var userFromDatabase = _dbContext.Users.FirstOrDefault(x => x.Email == userCredentials.Email && x.Password == userCredentials.Password);

            if (userFromDatabase == null)
            {
                throw new InvalidOperationException("User not found.");
                //return null;
            }
           
            return new UserInfo
            {
                Id = userFromDatabase.UserId,
                Email = userFromDatabase.Email,
                Name = userFromDatabase.Name
            };
        }

        public void AddUser(Guid UserId, string email, string password, string name)
        {
            _dbContext.Add(new User { UserId = UserId, Email = email, Password = password, Name = name });  // create  user

            FolderInfo rootUserFolder = _folderService.CreateFolder("root" + UserId.ToString()  , UserId, null);   //  create  root  folder  for  user
            _folderService.AddFolder(rootUserFolder);

             _dbContext.SaveChanges();
        }

        public bool ValidateUserCredentials(string email, string password, string name)
        {
            return (IsValidEmail(email) && !String.IsNullOrEmpty(password) && password.Length <= 32 && !String.IsNullOrEmpty(name) && name.Length <= 50  &&  _dbContext.Users.FirstOrDefault(x => x.Email == email && x.Password == password) == null) ? true : false;
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