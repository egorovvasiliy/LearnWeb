using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoZdRoutes.WEB.Hubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace webPortal.Controllers
{
    public class SettingsController : LayoutController
    {
        public SettingsController(IHubContext<NotifyHub, INotifyClient> hubContext) : base(hubContext) { 
        }
        //Здесь будут храниться временные методы
        [Authorize]
        public IActionResult GetColorMenu()
        {   
            //this.hubContext.
            return View();
        }
    }
}
