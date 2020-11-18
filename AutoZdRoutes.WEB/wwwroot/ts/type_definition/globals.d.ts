declare interface Window {
    dispatch: any,
    test:any,
    //connectionNotifyHub: signalR.HubConnection,
    initCenter: { lat: number, lng: number },
    map2gis: {
        getBounds: Function,
        invalidateSize: Function,
        latLngToLayerPoint: Function,
        layerPointToContainerPoint: Function
    },
    nonAuthorizeFlag:boolean,
    changeIndexTab: Function,
    singletonFunction: any,
    SendNotification: (mes: string) => void,
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any,
}
declare module '*.css';
declare module '*.scss';