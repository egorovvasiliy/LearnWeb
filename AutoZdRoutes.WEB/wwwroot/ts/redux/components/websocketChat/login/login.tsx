import * as React from 'react';
import * as styles from './style.css';
const style = styles as ClassLogin;
interface IProps {
    isAuth: boolean,
    LogOutClick: (name:string)=>void,
    LoginClick: (name: string) => void,
    name: string
}
const LoginWSChat = (props: IProps) => {
    let { isAuth, LogOutClick, LoginClick,name } = props;
    return isAuth ?
        <React.Fragment>
            <div className={style.wrapVerticalAlign}>
                <input onClick={() => { LogOutClick(name) }} type="button" value="Выйти" className={style.closeInput} />
            </div>
        </React.Fragment>
        :
        <React.Fragment>
            <form style={{ borderLeft:'none' }} className={style.wrapCenter} name="login" method="post" action="#">
                <div className="Centered" style={{ borderLeft: 'none' }}>
                    <b>Введите имя</b>
                    <input ref={el => window.inputValueLoginNameWS = el} type="text" name="login" required />
                </div>
                <div className="Centered" style={{ borderLeft: 'none', marginTop: "33px", marginLeft: "20px" }}>
                    <input type="submit" value="Войти" style={{ minWidth: "75px" }} onClick={(e) => { e.preventDefault(); LoginClick(window.inputValueLoginNameWS.value) }} />
                </div>
            </form>
        </React.Fragment>
    }
export {LoginWSChat}