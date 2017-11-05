
using System;

namespace Logo.Contracts.Services
{
    public interface IUsersService
    {
        UserInfo GetUser(string email, string password);
        bool ValidateUserCredentials(string email, string password, string login);
        void AddUser(Guid id, string email, string password, string name);

    }
}