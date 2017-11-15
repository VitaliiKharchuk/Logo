using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;

namespace Logo.Web.Controllers
{
    [Route("api/[controller]")]
    
    public class FilesController : Controller
    {
        [Authorize("Bearer")]
        [HttpGet]
        public IEnumerable<string>  Get()
        {
            return new[] { "file1", "file2" };            
        }

        [Authorize]
        [Route("getlogin")]
        public IActionResult GetLogin()
        {
            return Ok($"Ваш логин: {User.Identity.Name}");
        }



    }
}
