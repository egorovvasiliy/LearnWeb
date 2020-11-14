import * as React from 'react';
import * as styles from './style.scss';
const style = styles as ClassChatWindow;
import { IWsChatState } from '../../../types'
interface IProps {
}
const ChatWindow = (props: IProps & IWsChatState) => {
    let { isAuth, currentUser, users, messages } = props;
    return isAuth ?
        <div className={style.Login}>
            <div className={style.BorderBottom}>
                <b>Ваше имя в чате: <span className={style.Status}>{currentUser.Name}</span></b><br/>
                <div style={{ display: 'inline-flex' }}>
                    <b>{`Статус:`}</b>
                    <input type="image" src={"icons/update.png"} onClick={e => { window.SendNotification(window.inputValueStatusWS.value) }} />
                    <input className={style.Status} defaultValue={currentUser.Status} ref={el => window.inputValueStatusWS = el} type="text" size={30} />
                </div>
            </div>
            <div className={style.BorderBottom}>
                <b>В чате участвуют:</b><br />
                {users.map(u => <div key={u.Id}>
                    {`${u.Name}: `}
                    <span style={{ fontWeight:'normal' }} className={style.Status}>{u.Status}</span>
                </div>)}
            </div>
        </div>
        :
        <div className={style.Logout}>Для просмотра чата нужно ввести логин</div>
    }
export { ChatWindow}