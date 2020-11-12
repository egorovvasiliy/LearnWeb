import { typeLogInWsChat,typeChangeVisibleWsChat, WsChatAction, typeDispatch } from '../types'
//----------ActionsCreators----------------------------------------------
export const loginWsChat_ActCr = (_isIn:boolean, _username?: string): WsChatAction => {
    return {
        type: typeLogInWsChat,
        isIn: _isIn,
        username: _username
    }
}
export const changeVisibleWsChatt_ActCr = (val: boolean): WsChatAction => {
    return {
        type: typeChangeVisibleWsChat,
        val:val
    }
}