import { WSChatBuilder } from "./wsMessageBuilder";

enum ActionResponseTypes {
    userIn,
    userOut,
    updateStatus,
    message,
    setActiveUsers
};

interface IActionWS {
    type: ActionResponseTypes,
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
            this.builder.onOpen && this.builder.onOpen();
            let user: IUser = {
                Name: this.builder.name,
                Status: 'Hey there I am using WhatsApp'
            };
            let payload: IActionWS = {
                type: ActionResponseTypes.userIn,
                payload: user
            };
            this.socket.send(JSON.stringify(payload));
        };
        this.socket.onclose = e => {
            this.builder.onClose && this.builder.onClose();
        }
        this.socket.onmessage = (e) => {
            this.OnMessage(e);
        }
    }
    OnMessage = (e: MessageEvent) => {
        let actionWs = (<IActionWS>JSON.parse(e.data));
        console.log('actionWs', actionWs)
        if (actionWs) {
            switch (actionWs.type) {
                case ActionResponseTypes.setActiveUsers: {
                    const users = actionWs.payload;
                    this.builder.setActiveUsers(users);
                    break;
                }
                case ActionResponseTypes.userIn: {
                    const user = actionWs.payload;
                    this.builder.connectUser(user);
                    break;
                }
                case ActionResponseTypes.userOut: {
                    const user = actionWs.payload;
                    this.builder.removeUser(user);
                    break;
                }
                case ActionResponseTypes.updateStatus: {
                    const user = actionWs.payload;
                    this.builder.connectUser(user);
                    break;
                }
                case ActionResponseTypes.message: {
                    const { id,message} = actionWs.payload;
                    this.builder.reciveMessageFromUser(id, message);
                    break;
                }
                default: {
                    break;
                } 
            }
        }
    };
}