import { WSChatBuilder } from "./wsMessageBuilder";
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
    constructor(_builder: WSChatBuilder) {
        this.builder = _builder;
        this.openWebSocket();
    }

    builder: WSChatBuilder;
    socket: WebSocket;
    GetSocket = () => {
        if (!this.socket)
            this.socket = new WebSocket(this.builder.urlWs);
        return this.socket;
    }
    openWebSocket = () => {
        this.socket = this.GetSocket();
        this.socket.onopen = (e) => {
            let body: IActionWS = {
                type: ActionsWSTypes.userConnect,
                payload: this.builder.name
            };
            this.socket.send(JSON.stringify(body));
        };
        this.socket.onclose = e => {
            this.builder.onClose && this.builder.onClose();
        }
        this.socket.onmessage = (e) => {
            this.OnMessage(e);
        }
    }
    OnMessage = (e: MessageEvent) => {
        console.log('OnMessage');
        let actionWs = (<IActionWS>JSON.parse(e.data));
        console.log('actionWs', actionWs);
        if (actionWs) {
            switch (actionWs.type) {
                case ActionsWSTypes.initCurrentUser: {
                    this.builder.initCurrentUser(actionWs.payload);
                    break;
                }
                case ActionsWSTypes.setActiveUsers: {
                    this.builder.setActiveUsers(actionWs.payload);
                    break;
                }
                case ActionsWSTypes.userConnect: {
                    this.builder.connectUser(actionWs.payload);
                    break;
                }
                case ActionsWSTypes.userDisconnect: {
                    this.builder.removeUser(actionWs.payload);
                    break;
                }
                case ActionsWSTypes.updateStatus: {
                    this.builder.updateStatusUser(actionWs.payload);
                    break;
                }
                case ActionsWSTypes.message: {
                    this.builder.sendMessage(actionWs.payload);
                    break;
                }
                default: {
                    break;
                } 
            }
        }
    };
}