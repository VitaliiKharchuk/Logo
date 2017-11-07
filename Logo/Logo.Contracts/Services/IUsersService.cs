
using System;

namespace Logo.Contracts.Services
{
    public interface IUsersService
    {
        UserInfo GetUser(UserCredentials userCredentials);
        bool ValidateUserCredentials(string email, string password, string login);
        void AddUser(  Guid  Id, string email, string  password,  string name  );
    }
}