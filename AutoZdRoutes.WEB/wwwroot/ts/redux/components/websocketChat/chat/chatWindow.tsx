import * as React from 'react';
import * as styles from './style.scss';
const style = styles as ClassChatWindow;
import { defaultName, IWsChatState } from '../../../types'
import { WSChatService, ActionsWSTypes, IActionWS } from '../../../../wsChatService/wsChatService';
import { GetCurrentTimeDateToString } from '../../../../date';
interface IProps {
}
const ChatWindow = (props: IProps & IWsChatState) => {
    let { isAuth, currentUser, users, messages } = props;
    const wsService = window.wsService as WSChatService;//#Solve: позже сокет запишу в store, вынесу его из компонента и буду работать с ним через props
    const updateStatus = (_text: string) => {
        let body: IActionWS = {
            type: ActionsWSTypes.updateStatus,
            payload: _text
        }
        wsService.socket.send(JSON.stringify(body));//#Solve: позже сокет запишу в store, вынесу его из компонента и буду работать с ним через props
    };
    const sendMessage = (_text: string) => {
        let body: IActionWS = {
            type: ActionsWSTypes.message,
            payload: _text
        }
        wsService.socket.send(JSON.stringify(body));//#Solve: позже сокет запишу в store, вынесу его из компонента и буду работать с ним через props
    };
    return isAuth ?
        <div className={style.Login}>
            <div style={{ display: "flex", flexDirection: 'column', flex: 1 }}>
                <div className={style.BorderBottom}>
                    <b>Ваше имя в чате: <span style={{ color: 'darkblue' }} className={style.Status}>{currentUser ? currentUser.Name : defaultName}</span></b><br />
                    <div style={{ display: 'inline-flex' }}>
                        <b>{`Статус:`}</b>
                        <input type="image" src={"icons/update.png"} onClick={e => { updateStatus(window.inputValueStatusWS.value) }}/>
                        <input className={style.Status} defaultValue={currentUser ? currentUser.Status : ""} ref={el => window.inputValueStatusWS = el} type="text" size={30} maxLength={30}/>
                    </div>
                </div>
                <div className={style.BorderBottom}>
                    <b>В чате участвуют:</b><br />
                    {users.map(u => <div key={u.Id}>
                        <span style={{ fontWeight: 'normal', color: 'red' }} className={style.Status}>{`${u.Name}:`}</span>
                        <span style={{ fontWeight: 'normal'}} className={style.Status}>{u.Status}</span>
                    </div>)}
                </div>
            {/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
                <div className={style.WindowMessages}>
                    {
                        messages.map((mes, i) =>
                            <div key={i}>
                                <div style={{ color: mes.User.Id == currentUser.Id ? 'darkcyan' :'#7f7fbb' }}>{`${mes.User.Id == currentUser.Id? 'Вы' : mes.User.Name}:${GetCurrentTimeDateToString(mes.Date)}`}</div>
                            <div>{mes.Text}</div>
                        </div>
                    )}
                </div>
            </div>
            {/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
            <div style={{ paddingBottom:"10px" }}>
                <div style={{ display: 'inline-flex' }}>
                    <b>{`Введите сообщение:`}</b>
                    <input type="image" src={"icons/send.png"} onClick={e => { sendMessage(window.inputValueMessageWS.value); window.inputValueMessageWS.value = "..." }} />
                    <input className={style.Status} onFocusCapture={(e) => { if (window.inputValueMessageWS.value=="...") window.inputValueMessageWS.value = "" }} defaultValue={"..."} ref={el => window.inputValueMessageWS = el} type="text" size={30} />
                </div>
            </div>
            {/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        </div>
        :
        <div className={style.Logout}>Для просмотра чата нужно ввести логин</div>
}
export { ChatWindow}