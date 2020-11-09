using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace AutoZdRoutes.WEB.Hubs
{
    //[Authorize]
    public class NotifyHub:Hub<INotifyClient>
    {
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await base.OnDisconnectedAsync(ex);
        }
        //[Authorize(Policy ="Test")]
        public async Task Send(string message)
        {
            try
            {
                await this.Clients.All.SendMessage(message);
            }
            catch (Exception ex) {
                var x = ex;
            }
        }
    }
}
