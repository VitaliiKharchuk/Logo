
using System;
using System.Collections.Generic;

namespace Logo.Contracts.Services
{
    public interface IUsersService
    {
        UserInfo GetUser(UserCredentials userCredentials);
        bool ValidateUserCredentials(UserCredentialsWithName userFullInformation);
        void AddUser(UserCredentialsWithName userFullInformation);
        IEnumerable <UserFullInformation> GetAllUsers();  //only  for   testing
    }
}