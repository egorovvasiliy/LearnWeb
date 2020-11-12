import * as React from 'react';
import * as styles from './style.css';
const style = styles as ClassLogin;
interface IProps {
    isAuth: boolean,
    LogOutClick: (name:string)=>void,
    LoginClick: (name: string) => void
}
const Login = (props: IProps) => {
    let { isAuth, LogOutClick, LoginClick } = props;
    return isAuth ?
        <React.Fragment>
            <div className={style.wrapVerticalAlign}>
                <input ref={el => window.inputSubmitLogout = el} onClick={() => { LogOutClick("Empty") }} type="button" value="Выйти" className={style.closeInput} />
            </div>
        </React.Fragment>
        :
        <React.Fragment>
            <form ref={el => window.inputFormLogin = el} style={{ borderLeft:'none' }} className={style.wrapCenter} name="login" method="post" action="#">
                <div className="Centered" style={{ borderLeft: 'none' }}>
                    <b>Введите имя</b>
                    <input ref={el => window.inputValueLoginName = el} type="text" name="login" required />
                </div>
                <div className="Centered" style={{ borderLeft: 'none', marginTop: "33px", marginLeft: "20px" }}>
                    <input ref={el => window.inputSubmitLogin = el} type="submit" value="Войти" style={{ minWidth: "75px" }} onClick={ ()=> {LoginClick("Empty")}} />
                </div>
            </form>
        </React.Fragment>
    }
export {Login}