
using System;
using System.Collections.Generic;

namespace Logo.Contracts.Services
{
    public interface IUsersService
    {
        UserInfo GetUserByEmail(string  email);
        UserInfo GetUserById(Guid userId);
        bool ValidateUserCredentials(UserCredentialsWithName userFullInformation);
        void AddUser(UserCredentialsWithName userFullInformation);
        IEnumerable <UserFullInformation> GetAllUsers();  //only  for   testing
    }
}