using AutoZdRoutes.WEB.Hubs;
using JWT.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace AutoZdRoutes.WEB.Services
{
    public class ActionWS
    {
        public ActionsWSTypes type { get; set; }
        public Object payload { get; set; }
    }
    interface IMessageHandler {
        void Handle(WebSocket socket, List<СonnectionModel> connectionsList, ActionWS action);
        async Task SendAll(ActionWS body, List<СonnectionModel>connectionsList)
        {
            var response_string = JsonSerializer.Serialize(body);
            var bytesResponse = Encoding.UTF8.GetBytes(response_string, 0, response_string.Length);
            foreach (var con in connectionsList)
            {
                await con.Socket.SendAsync(new ArraySegment<byte>(bytesResponse, 0, bytesResponse.Length), WebSocketMessageType.Text, true, CancellationToken.None);//#Solve:!!! длина буфера
            }
        }
        async Task Send(ActionWS body, WebSocket socket)
        {
            var response_string = JsonSerializer.Serialize(body);
            var bytesResponse = Encoding.UTF8.GetBytes(response_string, 0, response_string.Length);
            await socket.SendAsync(new ArraySegment<byte>(bytesResponse, 0, bytesResponse.Length), WebSocketMessageType.Text, true, CancellationToken.None);//#Solve:!!! длина буфера
        }
    }
    class EmptyHandler : IMessageHandler
    {
        public void Handle(WebSocket current_socket, List<СonnectionModel> connectionsList, ActionWS action)
        {
        }
    }
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
    class UpdateStatusHandler : IMessageHandler
    {
        public void Handle(WebSocket current_socket, List<СonnectionModel> connectionsList, ActionWS action)
        {
            var new_status_text = action.payload.ToString();
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
    class MessageToAllHandler : IMessageHandler {
        public void Handle(WebSocket socket, List<СonnectionModel> connectionsList, ActionWS action) { 
        }
    }
}