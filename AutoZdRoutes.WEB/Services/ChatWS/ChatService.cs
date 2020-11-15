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
    public enum ActionsWSTypes
    {
        userConnect,
        userDisconnect,
        updateStatus,
        message,
        initCurrentUser,
        setActiveUsers
    }
    public class ActionWS
    {
        public ActionsWSTypes type { get; set; }
        public Object payload { get; set; }
    }
    public class User {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
    }
    public class UpdateStatus
    {
        public string IdUser { get; set; }
        public string Text { get; set; }
    }
    public class Message
    {
        public User User { get; set; }
        public string Text { get; set; }
        public double Date { get; set; }
    }
    public class СonnectionModel {
        public СonnectionModel() {
        }
        public User User { get; set; }
        public WebSocket Socket { get; set; }
    }
    public class ChatService
    {
        List<СonnectionModel> connections = new List<СonnectionModel>(); //#Solve: потокобезопасность...
        public async Task Echo(WebSocket webSocket)
        {
            OnConnected(webSocket);
            var buffer = new byte[1024];
            WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            while (!result.CloseStatus.HasValue) //#Solve:что если кол-во обращений к текущему webSocket пришло больше одного за время итерации цикла
            {
                if (result.MessageType == WebSocketMessageType.Text) {
                    var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                    IMessageHandler messageHandler= new EmptyHandler();
                    try
                    {
                        var actionWs = JsonSerializer.Deserialize<ActionWS>(message);
                        switch (actionWs.type)
                        {
                            case ActionsWSTypes.userConnect:
                                messageHandler = new UserConnectHandler();
                                break;
                            case ActionsWSTypes.updateStatus:
                                messageHandler = new UpdateStatusHandler();
                                break;
                            case ActionsWSTypes.message:
                                messageHandler = new MessageHandler();
                                break;
                            default:
                                break;
                        }
                        messageHandler.Handle(webSocket, connections, actionWs);
                    }
                    catch (Exception ex)
                    {
                        var x = ex;
                    }
                }
                result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            }
            await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
            OnDisconnected(webSocket);
        }
        public void OnConnected(WebSocket socket)
        {
            //позже дополнительным запросом client установит имя,GUID и известит об этом всех, в т.ч. себя
            connections.Add(new СonnectionModel(){
                Socket=socket,
                User=new User()
            });
        }
        public void OnDisconnected(WebSocket socket)
        {
            var connection = connections.FirstOrDefault(con => con.Socket == socket);
            connections.Remove(connection);
            //-----------------------------------------
            var response = new ActionWS() { type = ActionsWSTypes.userDisconnect, payload = connection.User };
            var response_string = JsonSerializer.Serialize(response);
            var bytesResponse = Encoding.UTF8.GetBytes(response_string, 0, response_string.Length);
            foreach (var con in connections) {
                con.Socket.SendAsync(new ArraySegment<byte>(bytesResponse, 0, bytesResponse.Length), WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }
       //public async Task SendMessageAsync(WebSocket socket, string message)
       //{
       //    if (socket.State != WebSocketState.Open)
       //        return;
       //    await socket.SendAsync(buffer: new ArraySegment<byte>(array: Encoding.ASCII.GetBytes(message),
       //                                                          offset: 0,
       //                                                          count: message.Length),
       //                           messageType: WebSocketMessageType.Text,
       //                           endOfMessage: true,
       //                           cancellationToken: CancellationToken.None);
       //}
       //public async Task SendMessageToAllAsync(string message)
       //{
       //    foreach (var pair in socketsList)
       //    {
       //        if (pair.Value.State == WebSocketState.Open)
       //            await SendMessageAsync(pair.Value, message);
       //    }
       //}
       //public async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
       //{
       //    string message = Encoding.UTF8.GetString(buffer, 0, result.Count);
       //    await SendMessageToAllAsync(message);
       //}
    }
}