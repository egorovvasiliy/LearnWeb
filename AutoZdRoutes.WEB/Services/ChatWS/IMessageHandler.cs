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
    interface IMessageHandler {
        void Handle(WebSocket socket, WebSocketReceiveResult result, byte[] buffer, List<СonnectionModel> socketsList, ActionWS action);
    }
    class SetNameMessageHandler : IMessageHandler
    {
        public void Handle(WebSocket socket, WebSocketReceiveResult result, byte[] buffer, List<СonnectionModel> socketsList, ActionWS action)
        {
            var jsonString = action.payload.ToString();
            var user = JsonSerializer.Deserialize<User>(jsonString);//#Solve:Лучше,конечно, создать отдельный класс модели
            var con = socketsList.FirstOrDefault(con => con.Socket == socket);
            con.User = user;
        }
    }
    class UpdateStatusMessageHandler : IMessageHandler
    {
        public void Handle(WebSocket socket, WebSocketReceiveResult result, byte[] buffer, List<СonnectionModel> socketsList, ActionWS action)
        {
        }
    }
    class MessageAllSend : IMessageHandler {
        public void Handle(WebSocket socket, WebSocketReceiveResult result, byte[] buffer, List<СonnectionModel> socketsList, ActionWS action) { 
        }
        async Task Run(WebSocketReceiveResult result, byte[] buffer)
        {
            //foreach (var keyValue in socketsDictionary)
            //{
            //    var socket = keyValue.Value;
            //    await socket.SendAsync(new ArraySegment<byte>(buffer, 0, result.Count), result.MessageType, result.EndOfMessage, CancellationToken.None);
            //}
        }
    }
    public class ActionWS
    {
        public ActionTypes type { get; set; }
        public Object payload { get; set; }
    }
}