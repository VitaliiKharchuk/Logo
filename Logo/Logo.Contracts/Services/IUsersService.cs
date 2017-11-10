
using System;

namespace Logo.Contracts.Services
{
    public interface IUsersService
    {
        UserInfo GetUser(UserCredentials userCredentials);
        bool ValidateUserCredentials(UserData userFullInformation);
        void AddUser(UserData userFullInformation);
    }
}