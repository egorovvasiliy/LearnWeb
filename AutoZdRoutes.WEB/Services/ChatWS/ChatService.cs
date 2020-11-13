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
    public enum ActionRequestTypes
    {
        userIn,
        updateStatus,
        message
    }
    public enum ActioResponseTypes
    {
        userIn,
        userOut,
        updateStatus,
        message,
        setActiveUsers
    }
    public class User {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
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
            var buffer = new byte[1024 * 4];//#Solve:как подобрать требуемый размер,почему один буфер на прием и отправку
            WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);//#Solve: какое точное смысловое значение этого result
            while (!result.CloseStatus.HasValue) //#Solve:что если кол-во обращений к текущему webSocket пришло больше одного за время итерации цикла
            {
                if (result.MessageType == WebSocketMessageType.Text) {
                    var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                    IMessageHandler messageHandler;
                    messageHandler = new InitUserMessageHandler();
                    try
                    {
                        var action = JsonSerializer.Deserialize<ActionRequestWS>(message);
                        switch (action.type)
                        {
                            case ActionRequestTypes.userIn:
                                messageHandler = new InitUserMessageHandler();
                                break;
                            case ActionRequestTypes.updateStatus:
                                messageHandler = new UpdateStatusMessageHandler();
                                break;
                            default:
                                break;
                        }
                        messageHandler.Handle(webSocket, connections, action);
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
            connections.Add(new СonnectionModel(){Socket=socket});
        }
        public void OnDisconnected(WebSocket socket)
        {
            var connection = connections.FirstOrDefault(con => con.Socket == socket);
            connections.Remove(connection);
            //-----------------------------------------
            var response = new ActionResponseWS() { type = ActioResponseTypes.userOut, payload = connection.User };
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