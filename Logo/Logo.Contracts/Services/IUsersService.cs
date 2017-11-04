namespace Logo.Contracts.Services
{
    public interface IUsersService
    {
        UserInfo GetUser(UserCredentials userCredentials);
    }
}