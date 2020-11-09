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
    public class AdminController : LayoutController
    {
        [Authorize(Roles ="admin")]
        public IActionResult Index() => View();
    }
}
