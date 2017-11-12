
using System;

namespace Logo.Contracts.Services
{
    public interface IUsersService
    {
        UserInfo GetUser(UserCredentials userCredentials);
        bool ValidateUserCredentials(UserCredentialsWithName userFullInformation);
        void AddUser(UserCredentialsWithName userFullInformation);
    }
}