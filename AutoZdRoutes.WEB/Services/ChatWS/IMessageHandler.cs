using System;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace AutoZdRoutes.WEB.Services
{
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
}