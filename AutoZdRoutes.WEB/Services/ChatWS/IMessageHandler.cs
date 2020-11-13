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
    public class ActionRequestWS
    {
        public ActionRequestTypes type { get; set; }
        public Object payload { get; set; }
    }
    public class ActionResponseWS
    {
        public ActioResponseTypes type { get; set; }
        public Object payload { get; set; }
    }
    interface IMessageHandler {
        void Handle(WebSocket socket, List<СonnectionModel> connectionsList, ActionRequestWS action);
        async Task SendAll(ActionResponseWS response, List<СonnectionModel>connectionsList)
        {
            var response_string = JsonSerializer.Serialize(response);
            var bytesResponse = Encoding.UTF8.GetBytes(response_string, 0, response_string.Length);
            foreach (var con in connectionsList)
            {
                await con.Socket.SendAsync(new ArraySegment<byte>(bytesResponse, 0, bytesResponse.Length), WebSocketMessageType.Text, true, CancellationToken.None);//#Solve:!!! длина буфера
            }
        }
        async Task Send(ActionResponseWS response, WebSocket socket)
        {
            var response_string = JsonSerializer.Serialize(response);
            var bytesResponse = Encoding.UTF8.GetBytes(response_string, 0, response_string.Length);
            await socket.SendAsync(new ArraySegment<byte>(bytesResponse, 0, bytesResponse.Length), WebSocketMessageType.Text, true, CancellationToken.None);//#Solve:!!! длина буфера
        }
    }
    class InitUserMessageHandler : IMessageHandler
    {
        public void Handle(WebSocket current_socket, List<СonnectionModel> connectionsList, ActionRequestWS action)
        {
            var jsonString = action.payload.ToString();
            var init_user = JsonSerializer.Deserialize<User>(jsonString);
            init_user.Id = Guid.NewGuid().ToString();
            var currentConnection = connectionsList.FirstOrDefault(con => con.Socket == current_socket);
            currentConnection.User = init_user;
            //---------------------------------------------------------------------------------------------
            var response = new ActionResponseWS() { type = ActioResponseTypes.userIn, payload = init_user };
            (this as IMessageHandler).SendAll(response, connectionsList.Where(con => con.Socket != current_socket).ToList());
            var users = connectionsList.Select(con => con.User).ToArray();
            var response2 = new ActionResponseWS() { type = ActioResponseTypes.setActiveUsers, payload = users };
            (this as IMessageHandler).Send(response2, current_socket);
        }
    }
    class UpdateStatusMessageHandler : IMessageHandler
    {
        public void Handle(WebSocket socket, List<СonnectionModel> connectionsList, ActionRequestWS action)
        {
        }
    }
    class MessageAllSend : IMessageHandler {
        public void Handle(WebSocket socket, List<СonnectionModel> connectionsList, ActionRequestWS action) { 
        }
    }
}