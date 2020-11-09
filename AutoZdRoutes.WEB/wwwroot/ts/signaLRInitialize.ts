//build:WebPack
//Location:_Layout.cshtml
import * as signalR from "@microsoft/signalr";
let connectionNotify = new signalR.HubConnectionBuilder()
    .withUrl("/notify")
    .build();
window.connectionNotifyHub = connectionNotify;
connectionNotify.start().catch(err => { window.SendNotification("signal-см.ошибку в console"); console.log(err); });