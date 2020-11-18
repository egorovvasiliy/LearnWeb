import { typeLogInWsChat, typeChangeVisibleWsChat, typeSetUsersWsChat, typeSetMessagesWsChat, typeConnectUserWsChat, typeRemoveUserWsChat, typeUpdateStatusUserWsChat, typeSendMessageWsChat, WsChatAction, typeSetCurrentUserWsChat, typeSetWebSocket } from '../types'
//----------ActionsCreators----------------------------------------------
export const loginWsChat_ActCr = (_isIn:boolean, _user?: IUser): WsChatAction => {
    return {
        type: typeLogInWsChat,
        isIn: _isIn,
        user: _user
    }
}
export const changeVisibleWsChat_ActCr = (val: boolean): WsChatAction => {
    return {
        type: typeChangeVisibleWsChat,
        val:val
    }
}
export const SetCurrentUserWsChat_ActCr = (user: IUser): WsChatAction => {
    return {
        type: typeSetCurrentUserWsChat,
        user: user
    }
}
export const SetUsersWsChat_ActCr = (users: Array<IUser>): WsChatAction => {
    return {
        type: typeSetUsersWsChat,
        users: users
    }
}
export const SetMessagesWsChat_ActCr = (messages: Array<IMessage>): WsChatAction => {
    return {
        type: typeSetMessagesWsChat,
        messages: messages
    }
}
export const ConnectUserWsChat_ActCr = (user: IUser): WsChatAction => {
    return {
        type: typeConnectUserWsChat,
        user: user
    }
}
export const RemoveUserWsChat_ActCr = (id:string): WsChatAction => {
    return {
        type: typeRemoveUserWsChat,
        id: id
    }
}
export const UpdateStatusUserWsChat_ActCr = (user: IUser): WsChatAction => {
    return {
        type: typeUpdateStatusUserWsChat,
        user: user
    }
}
export const SendMessageWsChat_ActCr = (mes: IMessage): WsChatAction => {
    return {
        type: typeSendMessageWsChat,
        messages: mes
    }
}
export const SetWebSocket_ActCr = (val: WebSocket): WsChatAction => {
    return {
        type: typeSetWebSocket,
        webSocket: val
    }
}