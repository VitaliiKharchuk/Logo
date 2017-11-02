using Logo.Implementation;
using Logo.Implementation.DatabaseModels;
using Logo.Web.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Logo.Tests
{
    [TestClass]
    public class UsersControllerTest
    {
        [TestMethod]
        public void GetTokenTest()
        {
            var connectionString = "";
            using (var logoDb = new LogoDbContext(connectionString))
            {
                var usersService = new UsersService(logoDb);

                var usersController = new UsersController(usersService);

                var token = usersController.GetAuthorizationToken("anntytova@gmail.com", "qwerty");

                Assert.IsFalse(string.IsNullOrEmpty(token));
            }
        }
    }
}
