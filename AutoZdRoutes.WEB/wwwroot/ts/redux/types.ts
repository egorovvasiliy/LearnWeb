//#region Auth
export const defaultName = "Аноним";
export const defaultRole = "defaultRole";
export const adminRole = "admin";
//----------
export const typeLogin = "typeLogin" as const;
export const typeLogout = "typeLogout" as const;
export interface IAuthState {
    isAuth: boolean,
    username: string,
    userrole:string
}
interface ILoginAction {
    type: typeof typeLogin,
    username: string,
    userrole: string
}
interface ILogoutAction {
    type: typeof typeLogout
}
export type AuthAction = ILoginAction | ILogoutAction;
//#endregion Auth
//---------------------------------------------------
//#region wsChat
//----------
export const typeLogInWsChat = "typeLogInWsChat" as const;
export const typeSetCurrentUserWsChat = "typeSetCurrentUserWsChat" as const;
export const typeSetUsersWsChat = "typeSetUsersWsChat" as const;
export const typeSetMessagesWsChat = "typeSetMessagesWsChat" as const;
export const typeChangeVisibleWsChat = "typeChangeVisibleWsChat" as const;
export const typeConnectUserWsChat = "typeConnectUserWsChat" as const;
export const typeRemoveUserWsChat = "typeRemoveUserWsChat" as const;
export const typeUpdateStatusUserWsChat = "typeUpdateStatusUserWsChat" as const;
export const typeSendMessageWsChat = "typeSendMessageWsChat" as const;
export interface IWsChatState {
    isAuth: boolean,
    currentUser: IUser,
    visibleChat: boolean,
    users: Array<IUser>,
    messages: Array<IMessage>
}
interface ILoginWsChatAction {
    type: typeof typeLogInWsChat,
    isIn: boolean,
    user: IUser,
}
interface IChangeVisibleWsChatAction {
    type: typeof typeChangeVisibleWsChat,
    val:boolean
}
interface ISetCurrentUserWsChat {
    type: typeof typeSetCurrentUserWsChat,
    user: IUser
}
interface ISetUsersWsChat {
    type: typeof typeSetUsersWsChat,
    users: Array<IUser>
}
interface ISetMessagesWsChat {
    type: typeof typeSetMessagesWsChat,
    messages: Array<IMessage>
}
interface IConnectUserWsChat {
    type: typeof typeConnectUserWsChat,
    user: IUser
}
interface IRemoveUserWsChat {
    type: typeof typeRemoveUserWsChat,
    id: string
}
interface IUpdateStatusUserWsChat {
    type: typeof typeUpdateStatusUserWsChat,
    user: IUser
}
interface ISendMessageWsChat {
    type: typeof typeSendMessageWsChat,
    messages: IMessage
}
export type WsChatAction = ILoginWsChatAction | IChangeVisibleWsChatAction | IConnectUserWsChat
    | IRemoveUserWsChat | IUpdateStatusUserWsChat | ISendMessageWsChat | ISetUsersWsChat
    | ISetMessagesWsChat | ISetCurrentUserWsChat;
//#endregion Auth
//---------------------------------------------------
//#region Maps
export const typeSetTypesStation = "typeSetTypesStation" as const;
export const typeSetStations = "typeSetStations" as const;
export const typeSetTypeStation = "typeSetTypeStation" as const;
export const typeSelectIdStation = "typeSelectIdStation" as const;
export const typeSetScheduleOnStation = "typeSetScheduleOnStation" as const;
export const typeVisibleMap = "typeVisibleMap" as const;
export const typeChangeVisibleStaionsOnMap = "typeChangeVisibleStaionsOnMap" as const;
export const typeVisibleTabStaions = "typeVisibleTabStaions" as const;
export const typeChangeVisibleMap = "typeChangeVisibleMap" as const;
export const typeChangeVisibleStationsTab = "typeChangeVisibleStationsTab" as const;
export const typeChangeVisibleScheduleTab = "typeChangeVisibleScheduleTab" as const;
//-------------
export interface IMapsState {
    stations: IStations[],
    selectedStationId:number,
    visibleMap: boolean,
    visibleStaionsOnMap: boolean,
    visibleStationsTab: boolean,
    visibleScheduleTab: boolean,
    typesStation: ITypeStations[],
    selectedTypeStationId: number,
    sheduleOnStation:ISheduleOnStation[]
}
//------------
export interface ISelectedIdStationAction {
    type: typeof typeSelectIdStation,
    id: number
}
export interface IDisplayStaionsOnMapAction {
    type: typeof typeChangeVisibleStaionsOnMap,
    displayStaionsOnMap: boolean
}
export interface ISelectedTypeStationAction {
    type: typeof typeSetTypeStation,
    selectedTypeStationId: number
}
export interface IvisibleMapAction {
    type: typeof typeVisibleMap,
    selectedTypeStation: boolean
}
export interface IVisibleTabStaionsAction {
    type: typeof typeVisibleTabStaions,
    visibleTabStaions: boolean
}
export interface ISetTypesStationsAction {
    type: typeof typeSetTypesStation,
    typesStation: ITypeStations[]
}
export interface ISetStationsAction {
    type: typeof typeSetStations,
    stations: IStations[]
}
export interface IChangeVisibleMapAction {
    type: typeof typeChangeVisibleMap,
    visibleMap: boolean
}
export interface IChangeVisibleStationTabAction {
    type: typeof typeChangeVisibleStationsTab,
    val: boolean
}
export interface IChangeVisibleScheduleTabAction {
    type: typeof typeChangeVisibleScheduleTab,
    val: boolean
}
export interface ISetScheduleOnStationAction {
    type: typeof typeSetScheduleOnStation,
    val: ISheduleOnStation[]
}
export type MapsAction = IChangeVisibleMapAction | IChangeVisibleStationTabAction
    | ISetStationsAction | ISetTypesStationsAction | ISelectedTypeStationAction
    | IDisplayStaionsOnMapAction | ISelectedIdStationAction | IChangeVisibleScheduleTabAction | ISetScheduleOnStationAction
//#endregion Maps
//---------------------------------------------------
//#region Settings
export const typeChangeTestNotfy = "typeChangeTestNotfy" as const;
export const typeChangeColor = "typeChangeColor" as const;
export interface ISettingsState {
    designSite: {
        colorMenu: string,
        font: {
            type: string,
            color: string
        }
    },
    test: {
        randomMessage: {
            minCountMessage: number,
            maxCountMessage: number,
            minDelaySec: number,
            maxDelaySec: number
        }
    }
}
interface IChangeTestNotifyAction {
    type: typeof typeChangeTestNotfy,
    randomMessagesSettings: {
        minCountMessage: number,
        maxCountMessage: number,
        minDelaySec: number,
        maxDelaySec: number
    }
}
interface IChangeColorAction {
    type: typeof typeChangeColor,
    color:string
}
export type SettingsAction = IChangeTestNotifyAction | IChangeColorAction;
//#endregion Settings
//----------------------------------------------------
//#region Global
export const typeSetPreloader = "setPreloader" as const;
export interface IGlobalState{
    isloading: boolean
}
export interface GlobalAction {
    type: typeof typeSetPreloader,
    isloading: boolean
}
//#endregion Preloader
//----------------------------------------------------
export type Actions = AuthAction | MapsAction | SettingsAction | GlobalAction;
export type typeDispatch = (action: Actions | any) => Actions //#Solve: any для Thunk....-на Function ругается connect(mapStateToProps, mapDispatchToProps)