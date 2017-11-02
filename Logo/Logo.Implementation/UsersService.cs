using System;
using System.Linq;
using Logo.Contracts;
using Logo.Contracts.Services;
using Logo.Implementation.DatabaseModels;

namespace Logo.Implementation
{
    public class UsersService : IUsersService
    {
        private readonly LogoDbContext _dbContext;

        public UsersService(LogoDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public UserInfo GetUser(string email, string password)
        {
            var userFromDatabase = _dbContext.Users.FirstOrDefault(x => x.Email == email && x.Password == password);

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
    }
}