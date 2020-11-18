import { ActionsSocket } from "./ActionsSocket";
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
/**Отправка информации о сокете на сервер, а также обработка сообщений сокета*/
export const ChatSocketDecorator = (socket: WebSocket,userName:string, actionsSocket: ActionsSocket) => {
    const OnMessage = (e: MessageEvent) => {
        let actionWs = (<IActionWS>JSON.parse(e.data));
        //console.log('actionWebSocket', actionWs);
        if (actionWs) {
            switch (actionWs.type) {
                case ActionsWSTypes.initCurrentUser: {
                    actionsSocket.initCurrentUser(actionWs.payload);
                    break;
                }
                case ActionsWSTypes.setActiveUsers: {
                    actionsSocket.setActiveUsers(actionWs.payload);
                    break;
                }
                case ActionsWSTypes.userConnect: {
                    actionsSocket.connectUser(actionWs.payload);
                    break;
                }
                case ActionsWSTypes.userDisconnect: {
                    actionsSocket.removeUser(actionWs.payload);
                    break;
                }
                case ActionsWSTypes.updateStatus: {
                    actionsSocket.updateStatusUser(actionWs.payload);
                    break;
                }
                case ActionsWSTypes.message: {
                    actionsSocket.sendMessage(actionWs.payload);
                    break;
                }
                default: {
                    break;
                }
            }
        }
    };
    socket.onopen = (e) => {
        //после установки соединения сразу направляем серверу необходимую информацию о себе
        let body: IActionWS = {
            type: ActionsWSTypes.userConnect,
            payload: userName
        };
        socket.send(JSON.stringify(body));
    };
    socket.onclose = e => {
        actionsSocket.onClose && actionsSocket.onClose();
    }
    socket.onmessage = (e) => {
        OnMessage(e);
    }
    return socket;
}