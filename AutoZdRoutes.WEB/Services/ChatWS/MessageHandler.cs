using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;

namespace AutoZdRoutes.WEB.Services
{
    class MessageHandler : IMessageHandler
    {
        public void Handle(WebSocket current_socket, List<СonnectionModel> connectionsList, ActionWS action)
        {
            var text = action.payload.ToString();
            var currentConnection = connectionsList.FirstOrDefault(con => con.Socket == current_socket);
            //-----------------------------------
            var newMes = new Message() { UserName= currentConnection.User.Name, Text=text};
            //---------------------------------------------------------------------------------------------
            var response = new ActionWS() { type = ActionsWSTypes.message, payload = newMes };
            (this as IMessageHandler).SendAll(response, connectionsList);
        }
    }
}