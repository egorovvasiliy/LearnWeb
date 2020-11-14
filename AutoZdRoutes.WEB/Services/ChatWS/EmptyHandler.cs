using System.Collections.Generic;
using System.Net.WebSockets;

namespace AutoZdRoutes.WEB.Services
{
    class EmptyHandler : IMessageHandler
    {
        public void Handle(WebSocket current_socket, List<СonnectionModel> connectionsList, ActionWS action)
        {
        }
    }
}