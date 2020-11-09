import { IsValidatedToken, RunLogoutAsync } from '../../authorization';
import { cookieToken, cookieUserName, cookieUserRole } from '../../constants';
import { getCookie } from '../../cookies';
import { LoadToGlobalMap2gis } from '../../doubleGis';
import { GetTypesStationAsync } from '../../maps';
import { GetState } from '../reducers/rootreducer';
import { typeSetPreloader,GlobalAction, typeDispatch} from '../types'
import { login_ActCr } from './authActions';
import { getStations_ActTh, setStations_ActCr, setTypesStation_ActCr } from './mapsActions';
//----------ActionsCreators----------------------------------------------
export const setPreloader_ActCr = (val?: boolean): GlobalAction =>
    ({
        type: typeSetPreloader,
        isloading: val
    })
//-------------------------------
const logoutFromBadToken = async () => {
    let token = getCookie(cookieToken);
    if (token && !await IsValidatedToken(token))
        await RunLogoutAsync();
}
/** Функция вызывается, когда на сервере действие не прошло аутент. или авториз., что приводит к редиректу на главную стр. и вызову доп.скрипта window.nonAuthorizeFlag=true*/
const notifyAuthorize = (isAuth: boolean) => {
    if (window.nonAuthorizeFlag) {
        if (!isAuth) {
            setTimeout(() => {
                window.changeIndexTab(5);
            }, 1000);
        }
        window.SendNotification("У Вас недостаточно прав для совершения данной операции");
        window.nonAuthorizeFlag = false;
    }
}
const LoginFromCookie = (dispatch: typeDispatch) => {
    let token = getCookie(cookieToken);
    let userName = getCookie(cookieUserName);
    let userRole = getCookie(cookieUserRole);
    if (token && userName && userRole) {
        dispatch(login_ActCr(getCookie(cookieUserName), getCookie(cookieUserRole)));
    }
}
export const didMountApp_ActTh = () =>

    async (dispatch: typeDispatch, getState: GetState) => {
        dispatch(setPreloader_ActCr(true));
        //---------------------
        await logoutFromBadToken();
        notifyAuthorize(getState().auth.isAuth);
        LoginFromCookie(dispatch);
        //---------------------
        let map = await LoadToGlobalMap2gis();
        map.on('zoomend', e => {
            if (getState().maps.visibleStaionsOnMap)
                dispatch(getStations_ActTh(getState().maps.selectedTypeStationId));
        });
        map.on('movestart', x => {
            dispatch(setStations_ActCr(new Array()));
        });
        map.on('moveend', e => {
            if (getState().maps.visibleStaionsOnMap)
                dispatch(getStations_ActTh(getState().maps.selectedTypeStationId));
        });
        //---------------------
        let typesStation = await GetTypesStationAsync();
        dispatch(setTypesStation_ActCr(typesStation));
        dispatch(setPreloader_ActCr(false));
        //---------------------
    };