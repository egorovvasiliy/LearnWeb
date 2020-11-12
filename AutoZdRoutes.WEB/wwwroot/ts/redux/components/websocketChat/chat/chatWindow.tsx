import * as React from 'react';
import * as styles from './style.scss';
const style = styles as ClassChatWindow;
interface IProps {
    users: Array<IUser>,
    isLogin: boolean,
    name:string
}
const ChatWindow = (props: IProps) => {
    let { users,isLogin,name } = props;
    return isLogin ?
        <React.Fragment>
            <div className={style.Login}>
                Вы вошли в чат под именем {name}
            </div>
        </React.Fragment>
        :
        <React.Fragment>
            <div className={style.Logout}>Для просмотра чата нужно ввести логин</div>
        </React.Fragment>
    }
export { ChatWindow}