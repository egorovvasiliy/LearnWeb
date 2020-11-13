//#region Import
import * as style from './app.scss'
const styleApp = style as ClassApp;
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider, connect, ConnectedProps } from 'react-redux'
import {Backdrop, CircularProgress} from '@material-ui/core';
//#region infoSplit
//!!!!node_modules\react-collapse-pane\dist\components\SplitPane\index.d.ts <---- Пришлось поправить в библиотеке ((import * as React from 'react'))
//.SplitPane{
//    position: relative!important;
//}
//#endregion infoSplit
import { SplitPane } from "react-collapse-pane"
//----------
import { rootStore } from '../redux/store/store'
import { RootState } from '../redux/reducers/rootreducer';
import { typeDispatch} from '../redux/types'
//----------
import { ChatWindow } from '../redux/components/websocketChat/chat/chatWindow'
import { UserMenu } from '../redux/containers/user_menu/user_menu'
import { Map2gis } from '../redux/containers/map2gis/map2gis'
import { TableStations } from '../redux/containers/tables/tableStations'
import { TableSchedule } from '../redux/containers/tables/tableSchedule'
import Notifications from '../redux/containers/notification/notification'
import {setStations_ActCr } from '../redux/actions/mapsActions';
import { didMountApp_ActTh } from '../redux/actions/globalActions'
import { InitializeAppRun } from '../initialize';
import { ResizeSplitTabStations, ResizeSplitTabSchedule } from '../crutch/forSplit';
//#endregion Import
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
const mapStateToProps = (store: RootState) => {
    return {
        stations: store.maps.stations,
        visibleMap: store.maps.visibleMap,
        visibleStationsTab: store.maps.visibleStationsTab,
        visibleScheduleTab: store.maps.visibleScheduleTab,
        isLoading: store.global.isloading,
        selectedStationId: store.maps.selectedStationId,
        selectedTypeStation: store.maps.typesStation.find(tst => tst.type_id == store.maps.selectedTypeStationId),
        isAuthWsChat: store.wsChat.isAuth,
        visibleChat: store.wsChat.visibleChat,
        currentUserWsChat: store.wsChat.currentUser
    }
};
const mapDispatchToProps = (dispatch: typeDispatch) => {
    window.dispatch = dispatch; //Для отладки
    return {
        clearStations: () => {
            dispatch(setStations_ActCr(new Array()))
        },
        didMountApp: () => {
            dispatch(didMountApp_ActTh());
        }
    }
}
const connector = connect(mapStateToProps, mapDispatchToProps);
type TPropsFromRedux = ConnectedProps<typeof connector>;
interface IState {
}
class App extends React.Component<TPropsFromRedux, IState> {
    constructor(props) {
        super(props);
        this.initializeApp();
    }
    initializeApp = () => {
        InitializeAppRun();
        //-----#Solve:Наверное, правильнее разместить эти эффекты в Saaga---------------------
        window.addEventListener('resize', () => {
            !this.props.visibleStationsTab && ResizeSplitTabStations();
            !this.props.visibleScheduleTab && ResizeSplitTabSchedule();
        })
    }
    componentDidMount = async () => {
        this.props.didMountApp();
        ResizeSplitTabStations();
    }
    componentDidUpdate = async (prevProps: TPropsFromRedux, prevState, snapshot) => {
        window.map2gis && window.map2gis.invalidateSize();// Необходимо при динамическом изменении - например добавлении таблицы, которая меняет размер карты
    };
    render() {
        let divChat = this.props.visibleChat ? <ChatWindow name={this.props.currentUserWsChat.Name} isLogin={this.props.isAuthWsChat} users={new Array()} /> : null;
        return (
            <React.Fragment>
                <header className={styleApp.WrapMenu}>
                    <UserMenu />
                </header>
                <div className={styleApp.Content}>
                    <SplitPane split="horizontal" initialSizes={[2, 1]}
                        hooks={{
                            onDragStarted: () => { this.props.clearStations() },
                            onSaveSizes: (sizes) => { window.map2gis.invalidateSize(); }
                        }}
                        resizerOptions={{
                            css: {
                                backgroundColor: 'rgb(52, 58, 64)',
                                height: '2px'
                            },
                            hoverCss: {
                                backgroundColor: 'gray',
                                height: '5px'
                            },
                            grabberSize: '1rem'
                        }}
                    >
                        <SplitPane split="vertical" initialSizes={[10000, 1]}
                            hooks={{
                                onDragStarted: () => { this.props.clearStations() },
                                onSaveSizes: (sizes) => { window.map2gis.invalidateSize(); }
                            }}>
                            <div className={styleApp.WrapChatAndMap}>
                                {divChat}
                                <Map2gis />
                            </div>
                            <TableSchedule/>
                        </SplitPane>
                        <TableStations/>
                    </SplitPane>
                    <Notifications ref={el => {
                        el ? window.SendNotification = el.addMessage : null; //#Solve: в ref el оказываются Null-ы при обновлении компонента
                    }} />
                </div>
                <Backdrop open={this.props.isLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </React.Fragment>)
    }
}
const AppContainer = connector(App);
//----------
ReactDOM.render(
    <Provider store={rootStore}>
        <AppContainer />
    </Provider>,
    document.getElementById("app")
)
