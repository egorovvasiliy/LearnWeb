using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoZdRoutes.WEB.Hubs
{
    public interface INotifyClient
    {
        Task SendMessage(string message);
    }
}
