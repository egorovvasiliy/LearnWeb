//-----------------
import {
    IWsChatState, defaultName, WsChatAction, typeLogInWsChat, typeChangeVisibleWsChat, typeSetUsersWsChat,
    typeConnectUserWsChat, typeRemoveUserWsChat, typeUpdateStatusUserWsChat, typeSendMessageWsChat,
    typeSetMessagesWsChat
} from '../types'
//-----------------
const initialState = (): IWsChatState => ({
    isAuth: false,
    currentUser: { Name: defaultName, Status: '', Id:'' },
    visibleChat: false,
    users: new Array<IUser>(),
    messages: new Array<IMessage>()
})
export function wsChatReducer(state: IWsChatState = initialState(), action: WsChatAction): IWsChatState {
    switch (action.type) {
        case typeLogInWsChat:
            return {
                ...state, isAuth: action.isIn, currentUser: action.isIn ? action.user : { Name: defaultName }
            };
        case typeChangeVisibleWsChat:
            return { ...state, visibleChat: action.val }
        case typeSetMessagesWsChat: {
            return { ...state, messages: action.messages }
        }
        case typeSetUsersWsChat: {
            return { ...state, users: action.users }
        }
        case typeConnectUserWsChat: {
            let new_users = [...state.users, action.user];
            return { ...state, users: new_users }
        }
        case typeRemoveUserWsChat: {
            let new_users = [...state.users].filter(u => u.Id != action.id);
            return { ...state, users: new_users }
        }
        case typeUpdateStatusUserWsChat: {
            let new_users = [...state.users].map(u => u.Id != action.user.Id ? u : action.user);
            return { ...state, users: new_users }
        }
        case typeSendMessageWsChat: {
            let new_messages = [...state.messages, action.messages];
            return { ...state, messages: new_messages }
        }
        default:

            return state;
    }
}