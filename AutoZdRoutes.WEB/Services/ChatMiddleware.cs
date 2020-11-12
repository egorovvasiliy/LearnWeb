using AutoZdRoutes.WEB.Hubs;
using JWT.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace AutoZdRoutes.WEB.Services
{
    public class ChatMiddleware
    {
        private readonly RequestDelegate _next;
        ChatService chatservice { get; set; }

        public ChatMiddleware(RequestDelegate next,ChatService _chatservice)
        {
            this._next = next;
            chatservice = _chatservice;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Path == "/ws")
            {
                if (context.WebSockets.IsWebSocketRequest)
                {
                    using (WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync())
                    {
                        chatservice.OnConnected(webSocket);
                        await chatservice.Echo(webSocket);
                    }
                }
                else
                {
                    context.Response.StatusCode = 400;
                }
            }
            await _next.Invoke(context);
        }
    }
}