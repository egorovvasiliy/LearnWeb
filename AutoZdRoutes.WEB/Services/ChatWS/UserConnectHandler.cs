using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;

namespace AutoZdRoutes.WEB.Services
{
    class UserConnectHandler : IMessageHandler
    {
        public void Handle(WebSocket current_socket, List<СonnectionModel> connectionsList, ActionWS action)
        {
            var userName = action.payload.ToString();
            var currentUser = connectionsList.FirstOrDefault(con => con.Socket == current_socket).User;
            currentUser.Id = Guid.NewGuid().ToString();
            currentUser.Name = userName;
            currentUser.Status = "Hey there I am using WhatsApp";
            //---------------------------------------------------------------------------------------------
            var responseForAll = new ActionWS() { type = ActionsWSTypes.userConnect, payload = currentUser };
            (this as IMessageHandler).SendAll(responseForAll, connectionsList);
            //----------------------------------------------------------------------------------------------
            var responseForCurrent1 = new ActionWS() { type = ActionsWSTypes.initCurrentUser, payload = currentUser };
            (this as IMessageHandler).Send(responseForCurrent1, current_socket);
            //----------------------------------------------------------------------------------------------
            var current_users = connectionsList.Select(con => con.User).ToArray();
            var responseForCurrent2 = new ActionWS() { type = ActionsWSTypes.setActiveUsers, payload = current_users };
            (this as IMessageHandler).Send(responseForCurrent2, current_socket);
        }
    }
}