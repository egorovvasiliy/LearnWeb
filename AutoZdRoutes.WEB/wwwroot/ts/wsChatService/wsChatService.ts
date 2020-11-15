import { AppClient } from "./AppClient";
export enum ActionsWSTypes {
    userConnect,
    userDisconnect,
    updateStatus,
    message,
    initCurrentUser,
    setActiveUsers
}
export interface IActionWS {
    type: ActionsWSTypes,
    payload: any
}
export class WSChatService {
    constructor(_appClient: AppClient) {
        this.appClient = _appClient;
        this.openWebSocket();
    }

    appClient: AppClient;
    socket: WebSocket;
    GetSocket = () => {
        if (!this.socket)
            this.socket = new WebSocket(this.appClient.urlWs);
        return this.socket;
    }
    openWebSocket = () => {
        this.socket = this.GetSocket();
        this.socket.onopen = (e) => {
            let body: IActionWS = {
                type: ActionsWSTypes.userConnect,
                payload: this.appClient.name
            };
            this.socket.send(JSON.stringify(body));
        };
        this.socket.onclose = e => {
            this.appClient.onClose && this.appClient.onClose();
        }
        this.socket.onmessage = (e) => {
            this.OnMessage(e);
        }
    }
    OnMessage = (e: MessageEvent) => {
        console.log('OnMessageSocket');
        let actionWs = (<IActionWS>JSON.parse(e.data));
        console.log('actionWebSocket', actionWs);
        if (actionWs) {
            switch (actionWs.type) {
                case ActionsWSTypes.initCurrentUser: {
                    this.appClient.initCurrentUser(actionWs.payload);
                    break;
                }
                case ActionsWSTypes.setActiveUsers: {
                    this.appClient.setActiveUsers(actionWs.payload);
                    break;
                }
                case ActionsWSTypes.userConnect: {
                    this.appClient.connectUser(actionWs.payload);
                    break;
                }
                case ActionsWSTypes.userDisconnect: {
                    this.appClient.removeUser(actionWs.payload);
                    break;
                }
                case ActionsWSTypes.updateStatus: {
                    this.appClient.updateStatusUser(actionWs.payload);
                    break;
                }
                case ActionsWSTypes.message: {
                    this.appClient.sendMessage(actionWs.payload);
                    break;
                }
                default: {
                    break;
                } 
            }
        }
    };
}