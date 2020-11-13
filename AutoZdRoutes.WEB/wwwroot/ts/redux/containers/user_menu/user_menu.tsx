//#region Import
import * as React from 'react';
import * as ReactDOM from "react-dom"
import { connect, ConnectedProps } from 'react-redux'
//-----------materialUI------------------------------------------------
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select'
import InputIcon from '@material-ui/icons/Input';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Switch from '@material-ui/core/Switch';
//--------------------------------------------------------------------
import Menu from '../../components/menu/Menu';
import RadioButtonBinary from "../../components/menu/radioButtonBin"
import { LoadPointsToJsonAsync, LoadPointsToBDFromJsonAsync } from "../../../maps"
import { Login } from "../../components/login/login"
import { Label_Login } from "../../components/label_Login"
import { Register } from '../../components/register';
import { urlWeb, urlWs } from "../../../constants"
import { GenerateRandomCallFunc } from '../../../testNotify'
import { LoginWSChat as LoginWebSocket } from '../../components/websocketChat/login/login'
//--------------------------------------------
import { RootState } from '../../reducers/rootreducer';
import { adminRole, ISettingsState} from '../../types';
import { runLoging_ActTh, runLogOut_ActTh, runRegister_ActTh } from '../../actions/authActions';
import { changeColorAction } from '../../actions/settingsActions';
import { changeVisibleMap_ActCr, changeVisibleStationsTab_ActCr, setTypeStation_ActCr, changeVisibleStaionsOnMap_ActCr } from '../../actions/mapsActions';
//--------------------------------
import * as styles from './style.scss';
import { changeVisibleWsChat_ActCr, ConnectUserWsChat_ActCr, loginWsChat_ActCr, RemoveUserWsChat_ActCr, SendMessageWsChat_ActCr, SetMessagesWsChat_ActCr, SetUsersWsChat_ActCr, UpdateStatusUserWsChat_ActCr } from '../../actions/wsChatActions';
const style = styles as ClassUserMenu;
import { WSChatService } from '../../../wsChatService/wsChatService';
import { WSChatBuilder } from '../../../wsChatService/wsMessageBuilder';
//#endregion
//---------------------------------------------
//#region secondary
const SaveSettingsAsync = async (jsonPayload: ISettingsState) => {
    let response = await fetch(urlWeb + `/Settings/Save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonPayload)
    }).catch((ex) => { "Не получилось" }) as Response;
    if (!response.ok) {
        window.SendNotification("Не получилось");
    }
}
interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}
//--------Сторонний импорт----------------------
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}
function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
//----------------------------------------------
//#endregion

const mapStateToProps = (store: RootState) => {
    return {
        username: store.auth.username,
        userrole: store.auth.userrole,
        isAuth: store.auth.isAuth,
        settings: store.settings,
        stations: store.maps.stations,
        typesStation: store.maps.typesStation,
        selectedTypeStationId: store.maps.selectedTypeStationId,
        visibleMap: store.maps.visibleMap,
        displayStationsOnMap: store.maps.visibleStaionsOnMap,
        visibleStationsTab: store.maps.visibleStationsTab,
        isAuthWs: store.wsChat.isAuth,
        visibleWsChat: store.wsChat.visibleChat,
        userNameWsChat: store.wsChat.currentUser,
        usersWsChat: store.wsChat.users,
        messagesWsChat: store.wsChat.messages
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeColorMenu: (color: string) => { dispatch(changeColorAction(color)) },
        changeDisplayStationsOnMap: (val: boolean) => {
            dispatch(changeVisibleStaionsOnMap_ActCr(val));
            //далее saga при необходимости перезальет станции
        }, 
        runLogin: (e: Event) => { dispatch(runLoging_ActTh(e)) },
        runLogOut: (e: Event) => { dispatch(runLogOut_ActTh(e)) },
        runRegister: (e: Event) => { dispatch(runRegister_ActTh(e)) },
        SetTypeStation: (_typeId: number) => {
            dispatch(setTypeStation_ActCr(_typeId));
            //далее saga при необходимости перезальет станции
        },
        changeVisibleMap: () => {
            dispatch(changeVisibleMap_ActCr());
        },
        changeVisibleStationsTab: () => {
            dispatch(changeVisibleStationsTab_ActCr());
        },
        changeVisibleWsChat: (val: boolean) => {
            dispatch(changeVisibleWsChat_ActCr(val));
        },
        loginWsChat: (user:IUser) => {
            dispatch(loginWsChat_ActCr(true, user));
        },
        logoutWsChat: () => {
            dispatch(loginWsChat_ActCr(false));
        },
        SetUsersWsChat: (users: Array<IUser>) => {
            dispatch(SetUsersWsChat_ActCr(users))
        },
        SetMessagesWsChat: (messages: Array<IMessage>) => {
            dispatch(SetMessagesWsChat_ActCr(messages))
        },
        ConnectUserWsChat: (user: IUser) => {
            dispatch(ConnectUserWsChat_ActCr(user))
        },
        RemoveUserWsChat: (id: string) => {
            dispatch(RemoveUserWsChat_ActCr(id))
        },
        UpdateStatusUserWsCha: (user: IUser) => {
            dispatch(UpdateStatusUserWsChat_ActCr(user))
        },
        SendMessageWsChat: (message: IMessage) => {
            dispatch(SendMessageWsChat_ActCr(message))
        }
    }
}
const connector = connect(mapStateToProps, mapDispatchToProps);
type TPropsFromRedux = ConnectedProps<typeof connector>;
//----------------------------------------------
type TState ={
    valueTab: number
}
type PropsType = TPropsFromRedux & {
};
//-------------------------------------------------------------------------------------------------
class _UserMenu extends React.Component<PropsType, TState> {
    constructor(props) {
        super(props);
        this.state = {
            valueTab: 0
        };
        window.changeIndexTab = this.handleChangeIndex;
    }
    //-----------------------
    inputNotifyTest: HTMLInputElement;
    //-----------------------------------------------------------------------------------------------
    handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({
            valueTab: newValue
        })
    };
    handleChangeIndex = (index: number) => {
        this.setState({
            valueTab: index
        })
    };
    SelectTypeStation = (e) => {
        e.preventDefault();
        let typeId = e.target.value as number;//можно использовать ref-ы
        this.props.SetTypeStation(typeId);
    }
    wsService: WSChatService;
    configureWSChatBuilder = (_name:string) => {
        let builder = new WSChatBuilder();
        builder.name = _name;
        builder.urlWs = urlWs;
        builder.onOpen = () => { this.props.loginWsChat({ Name: _name, Status: 'Hey there I am using WhatsApp'}); }
        builder.onClose = () => { this.props.logoutWsChat(); }
        builder.setActiveUsers = (_users) => { this.props.SetUsersWsChat(_users) }
        builder.connectUser = (_user: IUser) => {
            this.props.ConnectUserWsChat(_user);
            window.SendNotification(`В чат вошел: ${_user.Name}`);
        };
        builder.removeUser = (_user: IUser) => {
            this.props.RemoveUserWsChat(_user.Id);
            window.SendNotification(`Чат покинул: ${_user.Name}`);
        };
        builder.updateStatusUser = (_id: string, _newStatus: string)=>{
        };
        builder.reciveMessageFromUser = (_id: string, _message: string) => {
        };
        builder.sendMessage = (_text: string) => {
        };
        return builder;
    }
    loginWSChat = (_name: string) => {
        this.wsService = new WSChatService(this.configureWSChatBuilder(_name));
    }
    logoutWSChat = (name: string) => {
        this.wsService.socket.close();
        this.props.logoutWsChat();
        this.props.SetUsersWsChat(new Array<IUser>());
        this.props.SetMessagesWsChat(new Array<IMessage>())
    }
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
    render() {
        return (
            <div className="userMenu">
                <AppBar position="static" title="Заголовок" style={{ background: this.props.settings.designSite.colorMenu, 'marginLeft': 'auto' }}>
                    <Tabs
                        value={this.state.valueTab}
                        onChange={this.handleChange}
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Карта" {...a11yProps(0)} />
                        <Tab label="Настройки" {...a11yProps(1)} />
                        <Tab label="WebSocketChat" {...a11yProps(2)} />
                        <Tab label="Empty2" {...a11yProps(3)} />
                        {this.props.userrole != adminRole ?
                            <Tab label="StopUser" {...a11yProps(4)} />
                            :
                            <Tab label="Админка" {...a11yProps(4)} />
                        }
                        <Tab title="login" icon={<InputIcon />} {...a11yProps(6)} style={{ marginLeft: 'auto', minWidth: 'unset' }} />
                        {this.props.isAuth ?
                            <Tab style={{ display: "none" }}></Tab> :
                            <Tab title="Register" icon={<PersonAdd />} {...a11yProps(7)} style={{ minWidth: 'unset', margin: 'auto 30px' }} />
                        }
                        <Label_Login username={this.props.username} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    index={this.state.valueTab}
                    onChangeIndex={this.handleChangeIndex}
                >
                    {/*Карта-------------------------------------------------------------------------*/}
                    <TabPanel value={this.state.valueTab} index={0}>
                        <Menu name="Карта">
                            <Menu name="Объекты" img="objects">
                                <Menu name="Станции" img="point">
                                    <Menu name="Режим отображения" img="visibility">
                                        <div>
                                            <div>Отображать<br />на карте:</div>
                                            <Switch checked={this.props.displayStationsOnMap} size="small" defaultValue={0} value={+this.props.displayStationsOnMap} onChange={() => { this.props.changeDisplayStationsOnMap(!this.props.displayStationsOnMap)}} color="default" />
                                        </div>
                                        <div>
                                            <div>Таблица<br />станций:</div>
                                            <Switch checked={this.props.visibleStationsTab} size="small" defaultValue={0} value={+this.props.visibleStationsTab} onChange={(e) => { this.props.changeVisibleStationsTab() }} color="default" />
                                        </div>
                                        <FormControl>
                                            <InputLabel id="demo-simple-select-label">Фильтр</InputLabel>
                                            <Select variant="outlined"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={this.props.selectedTypeStationId}
                                                defaultValue={0}
                                                onChange={(e) => { this.SelectTypeStation(e) }}
                                            >
                                                {this.props.typesStation.map(t => (<MenuItem key={t.type_id} value={t.type_id}>{t.description}</MenuItem>))}
                                            </Select>
                                        </FormControl>
                                    </Menu>
                                    <Menu name="Скачать в JSON с сервера" img="dwnljson" click={async () => {
                                        await LoadPointsToJsonAsync();
                                    }} />
                                    <Menu name="Залить в БД" img="uploadToBD" click={async () => {
                                        await LoadPointsToBDFromJsonAsync();
                                    }}/>

                                </Menu>
                                <Menu name="Расписание" img="planning">
                                </Menu>
                                <Menu name="Маршруты" img="route">
                                </Menu>
                            </Menu>
                            <Menu name="Редактирование" img="edit">
                            </Menu>
                            <RadioButtonBinary nameFalse={"Скрыть"} nameTrue="Показать" value={this.props.visibleMap} change={() => { this.props.changeVisibleMap() }} />
                        </Menu>
                    </TabPanel>
                    {/*Настройки----------------------------------------------------------------------*/}
                    <TabPanel value={this.state.valueTab} index={1}>
                        <Menu name="Настройки">
                            <Menu name="Меню" img="settings">
                                <Menu name="Оформление сайта" img="design">
                                    <Menu name="Цвет шапки" img="cap_color">
                                        <div>
                                            <p>Укажите цвет шапки:
                                                <input type="color" defaultValue="#ff0000" onChange={(e) => {this.props.changeColorMenu(e.target.value) }} />
                                            </p>
                                        </div>
                                        <Menu name="Сбросить" img="drop"/>
                                    </Menu>
                                    <Menu name="Шрифт" img="font">
                                        <Menu name="Цвет" img="color_menu">
                                        </Menu>
                                        <Menu name="Тип" img="typeFont">
                                        </Menu>
                                    </Menu>
                                </Menu>
                                <div>
                                    Всплывающие подсказки:
                                    <RadioButtonBinary nameFalse="Запретить" nameTrue="Разрешить" />
                                </div>
                            </Menu>
                            <Menu name="Тесты" img="test">
                                <Menu name="Случайные уведомления" img="select">
                                    <div style={{ display: "flex", flexFlow: "wrap" }}>
                                        <div style={{ flexFlow: "wrap", padding:"0px 20px" }}>
                                            <div>Min.сообщений:</div>
                                            <input className="InputNumber" name="minCountMessage" type="number" defaultValue={3} step={1} min="1" max="20" />
                                        </div>
                                        <div style={{ flexFlow: "row wrap", padding: "0px 20px"}}>
                                            <div>Max.сообщений:</div>
                                            <input className="InputNumber" name="maxCountMessage" type="number" defaultValue={3} step={1} min="1" max="20" />
                                        </div>
                                        <div style={{ flexFlow: "row wrap", padding: "0px 20px"}}>
                                            <div>Min.задержка:</div>
                                            <input className="InputNumber" name="minDelaySec" type="number" defaultValue={3} step={1} min="1" max="20" />
                                        </div>
                                        <div style={{ flexFlow: "row wrap", padding: "0px 20px"}}>
                                            <div>Max.задержка:</div>
                                            <input className="InputNumber" name="maxDelaySec" type="number" defaultValue={3} step={1} min="1" max="20" />
                                        </div>
                                    </div>
                                </Menu>
                            </Menu>
                            <Menu name="Сохранить" img="save" click={async () => {
                                await SaveSettingsAsync(this.props.settings);
                            }} />
                            <Menu name="По умолчанию" img="default" click={async () => {
                                await SaveSettingsAsync(this.props.settings);
                            }} />
                            <Menu name="Личные" img="users_settings" click={async () => {
                                await SaveSettingsAsync(this.props.settings);

                            }} />
                        </Menu>
                    </TabPanel>
                    {/*WebSocketChat*/}
                    <TabPanel value={this.state.valueTab} index={2}>
                        <div className={style.wrapChatMenu}>
                            <LoginWebSocket isAuth={this.props.isAuthWs} name={this.props.userNameWsChat.Name} LoginClick={this.loginWSChat} LogOutClick={this.logoutWSChat} />
                            <RadioButtonBinary className={style.FormChatRB} value={this.props.visibleWsChat} nameTrue={"Показать чат"} nameFalse={"Скрыть чат"} change={(e) => {this.props.changeVisibleWsChat(!this.props.visibleWsChat) }} />
                        </div>
                    </TabPanel>
                    {/*Empty*/}
                    <TabPanel value={this.state.valueTab} index={3}>
                    </TabPanel>

                    {/*Админка-------------------------------------------------------------------------*/}
                    {this.props.userrole != adminRole ?
                        <TabPanel value={this.state.valueTab} index={4}>
                            <Menu name="StopUser">
                                <Menu name="Bootstrap-админка" img="admin" click={() => {
                                    document.location.href = urlWeb + "/admin";
                                }} />
                            </Menu>
                        </TabPanel>
                        :
                        <TabPanel value={this.state.valueTab} index={4}>
                            <Menu name="Админка">
                                <Menu name="Bootstrap-админка" img="admin" click={() => {
                                    document.location.href = urlWeb + "/admin";
                                }} />
                                <Menu name="Тесты сайта" img="test">
                                    <Menu name="Уведомления" img="notify">
                                        <Menu name="Случайные" img="randMes" click={() => GenerateRandomCallFunc(window.SendNotification)} />
                                        <div>
                                            <label style={{ display: 'block' }}>Введите текст:</label>
                                            <input style={{ margin: '5px' }} type="text" ref={el => this.inputNotifyTest = el} />
                                            <button onClick={(e) => { window.SendNotification(this.inputNotifyTest.value) }}>Отправить</button>
                                        </div>
                                    </Menu>
                                </Menu>
                            </Menu>
                        </TabPanel>
                    }
                    {/*Auth----------------------------------------------------------------------------*/}
                    <TabPanel value={this.state.valueTab} index={5}>
                        <Login isAuth={this.props.isAuth} LoginClickAsync={this.props.runLogin} LogOutClickAsync={this.props.runLogOut} />
                    </TabPanel>
                    {/*Register-------------------------------------------------------------------------*/}
                    {!this.props.isAuth ?
                        <TabPanel value={this.state.valueTab} index={6}>
                            <Register isAuth={this.props.isAuth} RegisterClick={this.props.runRegister} LogOutClickAsync={this.props.runLogOut} />
                        </TabPanel> :
                        <TabPanel value={1000} index={1000}></TabPanel>  //Другие пустые варианты ввиде Null SwipeableViews "не проглатывает"
                     }
                </SwipeableViews>
            </div>
        );
    }
}
const UserMenu = connector(_UserMenu);
export { UserMenu }