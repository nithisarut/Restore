using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [AllowAnonymous]
    public class FallbackController : BaseApiController
    {
        // public IActionResult Index()
        // {
        //     return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"),
        //         "text/HTML");
        // }  
        //ถ้าอยากเทสบนเรครื่องให้คอมเม้นอันนี้ไว้
    }
}
