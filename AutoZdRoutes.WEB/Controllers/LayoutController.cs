using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoZdRoutes.WEB.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace webPortal.Controllers
{
    public abstract class LayoutController : Controller
    {
        protected IHubContext<NotifyHub, INotifyClient> hubContext;
        public LayoutController()
        {
        }
        public LayoutController(IHubContext<NotifyHub, INotifyClient> hubContext)
        {
            this.hubContext = hubContext;
        }
    }
}