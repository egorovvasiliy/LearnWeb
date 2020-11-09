//-----------------
import { typeLogin, typeLogout, defaultName, defaultRole, AuthAction, IAuthState } from '../types'
//-----------------
const initialState = (): IAuthState => ({
        isAuth: false,
        username: defaultName,
        userrole: defaultRole
    })
export function authReducer(state: IAuthState = initialState(), action: AuthAction): IAuthState {
    switch (action.type) {
        case typeLogin:
            return { ...state, isAuth: true, username: action.username, userrole: action.userrole }
        case typeLogout:
            return { ...state, isAuth: false, username: defaultName, userrole: defaultRole }
        default:
            return state;
    }
}