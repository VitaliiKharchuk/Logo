using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Logo.Contracts.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;

namespace Logo.Web.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpPost]
        public string GetAuthorizationToken([FromBody]string email, [FromBody]string password)
        {
            var user = _usersService.GetUser(email, password);

            var handler = new JwtSecurityTokenHandler();

            var identity = new ClaimsIdentity(
                new[]
                {
                    new Claim("UserId", user.Id.ToString("D"))
                });

            var symmetricKey = Encoding.ASCII.GetBytes("9%&NvuFeT#.bc~+[#CX6C5U3+(3$H");

            var securityToken = handler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = "Logo",
                Audience = "http://logo-service.azurewebsites.net/",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(symmetricKey), SecurityAlgorithms.HmacSha256Signature),
                Subject = identity
            });

            return handler.WriteToken(securityToken);
        }


        [HttpPost]
        public void AddUser([FromBody]string email, [FromBody]string password, [FromBody] string login)
        {
            if (_usersService.ValidateUserCredentials(email, password, login))
            {
                _usersService.AddUser(id: Guid.NewGuid(), email: email, password: password, name: login);
            }

        }
    }
}