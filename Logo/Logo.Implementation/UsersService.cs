using System;
using Logo.Contracts;
using Logo.Contracts.Services;

namespace Logo.Implementation
{
    public class UsersService : IUsersService
    {
        ////private readonly LogoDatabaseContext _dbContext;

        ////public UsersService(LogoDatabaseContext dbContext)
        ////{
        ////    _dbContext = dbContext;
        ////}

        ////public UserInfo GetUser(string email, string password)
        ////{
        ////    var userFromDatabase = _dbContext.Users.FirstOrDefault(x => x.Email == email && x.Password == password);

        ////    if (userFromDatabase == null)
        ////    {
        ////        throw new InvalidOperationException("User not found.");
        ////    }

        ////    return new UserInfo
        ////    {
        ////        Id = userFromDatabase.UserID,
        ////        Email = userFromDatabase.Email,
        ////        Name = userFromDatabase.Name
        ////    };
        ////}
        
        public UserInfo GetUser(string email, string password)
        {
            throw new NotImplementedException();
        }
    }
}