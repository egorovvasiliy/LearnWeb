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
        void Handle(WebSocket socket, WebSocketReceiveResult result, byte[] buffer, List<СonnectionModel> connectionsList, ActionRequestWS action);
        async Task SendAll(WebSocketReceiveResult result, byte[] buffer, List<СonnectionModel>connectionsList)
        {
            foreach (var con in connectionsList)
            {
                await con.Socket.SendAsync(new ArraySegment<byte>(buffer, 0, result.Count), result.MessageType, result.EndOfMessage, CancellationToken.None);
            }
        }
    }
    class InitUserMessageHandler : IMessageHandler
    {
        public void Handle(WebSocket socket, WebSocketReceiveResult result, byte[] buffer, List<СonnectionModel> connectionsList, ActionRequestWS action)
        {
            var jsonString = action.payload.ToString();
            var init_user = JsonSerializer.Deserialize<User>(jsonString);//#Solve:Лучше,конечно, создать отдельный класс модели
            var con = connectionsList.FirstOrDefault(con => con.Socket == socket);
            con.User = init_user;
            var response = new ActionResponseWS() { type = ActioResponseTypes.userIn, payload = init_user };
            var response_string = JsonSerializer.Serialize(response);
            var bytesResponse= Encoding.UTF8.GetBytes(response_string, 0, response_string.Length);
            (this as IMessageHandler).SendAll(result, bytesResponse, connectionsList);
        }
    }
    class UpdateStatusMessageHandler : IMessageHandler
    {
        public void Handle(WebSocket socket, WebSocketReceiveResult result, byte[] buffer, List<СonnectionModel> connectionsList, ActionRequestWS action)
        {
        }
    }
    class MessageAllSend : IMessageHandler {
        public void Handle(WebSocket socket, WebSocketReceiveResult result, byte[] buffer, List<СonnectionModel> connectionsList, ActionRequestWS action) { 
        }
    }
}