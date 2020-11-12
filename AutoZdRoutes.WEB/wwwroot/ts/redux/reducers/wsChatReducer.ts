//-----------------
import { IWsChatState, defaultName, WsChatAction, typeLogInWsChat, typeChangeVisibleWsChat } from '../types'
//-----------------
const initialState = (): IWsChatState => ({
        isAuth: false,
        username: defaultName,
        visibleChat:false
})
export function wsChatReducer(state: IWsChatState = initialState(), action: WsChatAction): IWsChatState {
    switch (action.type) {
        case typeLogInWsChat:
            return { ...state, isAuth: action.isIn, username: action.isIn ? action.username : defaultName };
        case typeChangeVisibleWsChat:
            return { ...state, visibleChat: action.val }
        default:
            return state;
    }
}