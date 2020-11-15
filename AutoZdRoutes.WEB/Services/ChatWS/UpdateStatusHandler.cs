using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;

namespace AutoZdRoutes.WEB.Services
{
    class UpdateStatusHandler : IMessageHandler
    {
        public void Handle(WebSocket current_socket, List<СonnectionModel> connectionsList, ActionWS action)
        {
            var new_status_text = action.payload.ToString().Substring(0,30);
            var currentConnection = connectionsList.FirstOrDefault(con => con.Socket == current_socket);
            //-----------------------------------
            var currentUser = connectionsList.FirstOrDefault(con => con.Socket == current_socket).User;
            currentUser.Status = new_status_text;
            //-----------------------------------
            var newStatus = new UpdateStatus() { IdUser= currentConnection.User.Id, Text=new_status_text};
            //---------------------------------------------------------------------------------------------
            var response = new ActionWS() { type = ActionsWSTypes.updateStatus, payload = newStatus };
            (this as IMessageHandler).SendAll(response, connectionsList);
        }
    }
}