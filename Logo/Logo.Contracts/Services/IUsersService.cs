
using System;

namespace Logo.Contracts.Services
{
    public interface IUsersService
    {
        UserInfo GetUser(UserCredentials userCredentials);
        bool ValidateUserCredentials(UserFullInformation userFullInformation);
        void AddUser( UserFullInformation userFullInformation  );
    }
}