import { RunLoginAsync, RunLogoutAsync, RunRegisterAsync } from '../../authorization';
import { cookieUserName, cookieUserRole, urlWeb } from '../../constants';
import { getCookie } from '../../cookies';
import { typeLogin, typeLogout, AuthAction, typeDispatch } from '../types'
import { setPreloader_ActCr } from './globalActions';
//----------ActionsCreators----------------------------------------------
export const login_ActCr = (_username: string, _userrole:string): AuthAction => {
    return {
        type: typeLogin,
        username: _username,
        userrole: _userrole
    }
}
const logout_ActCr = (): AuthAction => {
    return {
        type: typeLogout
    }
}
export const runLoging_ActTh = (e?:Event) =>
    async (dispatch: typeDispatch) => {
        dispatch(setPreloader_ActCr(true));
        let response = await RunLoginAsync(e);
        if (response.code == 200)
            dispatch(login_ActCr(getCookie(cookieUserName), getCookie(cookieUserRole)));
        else {
            window.SendNotification(response.message);
        }
        dispatch(setPreloader_ActCr(false));
        if (document.URL.indexOf('Home/Index/401') > 0)
            document.location.assign(urlWeb);
    }
export const runLogOut_ActTh = (e?: Event) =>
    async (dispatch: typeDispatch) => {
        dispatch(setPreloader_ActCr(true));
        await RunLogoutAsync();
        dispatch(logout_ActCr());
        dispatch(setPreloader_ActCr(false));
    }
export const runRegister_ActTh = (e: Event) =>
    async (dispatch: typeDispatch) => {
        dispatch(setPreloader_ActCr(true));
        await RunRegisterAsync(e);
        dispatch(setPreloader_ActCr(false));
    }