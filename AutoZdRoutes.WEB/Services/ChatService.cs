using AutoZdRoutes.WEB.Hubs;
using JWT.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AutoZdRoutes.WEB.Services
{
    public class ChatService
    {
        Dictionary<string, WebSocket> socketsDictionary = new Dictionary<string, WebSocket>(); //#Solve: потокобезопасность...
        public async Task Echo(WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];//#Solve:как подобрать требуемый размер,почему один буфер на прием и отправку
            WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);//#Solve: какое точное смысловое значение этого result
            while (!result.CloseStatus.HasValue) //#Solve:что если кол-во обращений к текущему webSocket пришло больше одного за время итерации цикла
            {
                await SendAllAsync(result, buffer);
                result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            }
            await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
        }
        public void OnConnected(WebSocket socket)
        {
            socketsDictionary.Add(Guid.NewGuid().ToString(), socket);
        }
        public void OnDisconnected(WebSocket socket)
        {
            var key = socketsDictionary.FirstOrDefault(p => p.Value == socket).Key;
            socketsDictionary.Remove(key);
        }
        public async Task SendMessageAsync(WebSocket socket, string message)
        {
            if (socket.State != WebSocketState.Open)
                return;
            await socket.SendAsync(buffer: new ArraySegment<byte>(array: Encoding.ASCII.GetBytes(message),
                                                                  offset: 0,
                                                                  count: message.Length),
                                   messageType: WebSocketMessageType.Text,
                                   endOfMessage: true,
                                   cancellationToken: CancellationToken.None);
        }
        public async Task SendMessageToAllAsync(string message)
        {
            foreach (var pair in socketsDictionary)
            {
                if (pair.Value.State == WebSocketState.Open)
                    await SendMessageAsync(pair.Value, message);
            }
        }
        public async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            string message = Encoding.UTF8.GetString(buffer, 0, result.Count);
            await SendMessageToAllAsync(message);
        }
        async Task SendAllAsync(WebSocketReceiveResult result, byte[] buffer)
        {
            foreach (var keyValue in socketsDictionary)
            {
                var socket = keyValue.Value;
                await socket.SendAsync(new ArraySegment<byte>(buffer, 0, result.Count), result.MessageType, result.EndOfMessage, CancellationToken.None);
            }
        }
    }
}