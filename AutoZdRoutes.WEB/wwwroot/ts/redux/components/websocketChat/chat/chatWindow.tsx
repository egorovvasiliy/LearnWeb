import * as React from 'react';
import * as styles from './style.scss';
const style = styles as ClassChatWindow;
import { defaultName, IWsChatState } from '../../../types'
import { WSChatService, ActionsWSTypes, IActionWS } from '../../../../wsChatService/wsChatService';
interface IProps {
}
const ChatWindow = (props: IProps & IWsChatState) => {
    let { isAuth, currentUser, users, messages } = props;
    const wsService = window.wsService as WSChatService;
    const updateStatus = (_text: string) => {
        let payload: IActionWS = {
            type: ActionsWSTypes.updateStatus,
            payload: _text
        }
        wsService.socket.send(JSON.stringify(payload));
    };
    const sendMessage = (_text: string) => {
        let payload: IActionWS = {
            type: ActionsWSTypes.message,
            payload: {
                IdUser: currentUser.Id,
                Text: _text
            }
        }
    };
    return isAuth ?
        <div className={style.Login}>
            <div className={style.BorderBottom}>
                <b>Ваше имя в чате: <span className={style.Status}>{currentUser ? currentUser.Name : defaultName}</span></b><br />
                <div style={{ display: 'inline-flex' }}>
                    <b>{`Статус:`}</b>
                    <input type="image" src={"icons/update.png"} onClick={e => { updateStatus(window.inputValueStatusWS.value) }} />
                    <input className={style.Status} defaultValue={currentUser?currentUser.Status:""} ref={el => window.inputValueStatusWS = el} type="text" size={30} />
                </div>
            </div>
            <div className={style.BorderBottom}>
                <b>В чате участвуют:</b><br />
                {users.map(u => <div key={u.Id}>
                    {`${u.Name}: `}
                    <span style={{ fontWeight: 'normal' }} className={style.Status}>{u.Status}</span>
                </div>)}
            </div>
            <div className={style.BorderBottom}>Все сообщения здесь</div>
            <div>
                <div style={{ display: 'inline-flex' }}>
                    <b>{`Введите сообщение:`}</b>
                    <input type="image" src={"icons/send.png"} onClick={e => { sendMessage(window.inputValueStatusWS.value) }} />
                    <input className={style.Status} defaultValue={"..."} ref={el => window.inputValueMessageWS = el} type="text" size={30} />
                </div>
            </div>
        </div>
        :
        <div className={style.Logout}>Для просмотра чата нужно ввести логин</div>
}
export { ChatWindow}