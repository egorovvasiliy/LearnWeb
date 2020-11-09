using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace webPortal.Controllers
{
    public class HomeController : LayoutController
    {
        public IActionResult Index(int id) => View(id); // при id=401 - redirect от  NonAuthorizedMiddleware.cs
    }
}
