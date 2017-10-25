using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Logo.Web.Controllers
{
    [Route("api/[controller]")]
    public class FilesController : Controller
    {
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new[] { "file1", "file2" };
        }
    }
}
