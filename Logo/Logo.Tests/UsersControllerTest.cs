using System.Collections.Generic;
using System.Net.Http;
using Logo.Contracts;
using Logo.Implementation;
using Logo.Implementation.DatabaseModels;
using Logo.Web.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

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

                var model = new UserCredentials
                {
                    Email = "anntytova@gmail.com",
                    Password = "qwerty"
                };

                var token = usersController.GetAuthorizationToken(model);

                Assert.IsFalse(string.IsNullOrEmpty(token.ToString()));
            }
        }
    }
}
