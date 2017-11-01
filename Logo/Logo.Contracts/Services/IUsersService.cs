namespace Logo.Contracts.Services
{
    public interface IUsersService
    {
        UserInfo GetUser(string email, string password);
    }
}