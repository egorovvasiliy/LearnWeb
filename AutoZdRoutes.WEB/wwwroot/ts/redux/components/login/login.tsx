import * as React from 'react';
import * as styles from './style.css';
const styleLogin = styles as ClassLogin;
interface IProps {
    isAuth: boolean,
    LogOutClickAsync: any,
    LoginClickAsync: any 
}
const Login = (props: IProps) => {
    let { isAuth, LogOutClickAsync, LoginClickAsync } = props;
    return isAuth ?
        <React.Fragment>
            <div className={styleLogin.wrapCenter}>
                <input ref={el => window.inputSubmitLogout = el} onClick={LogOutClickAsync} type="button" value="Выйти / Сменить пользователя" className={styleLogin.closeInput} />
            </div>
        </React.Fragment>
        :
        <React.Fragment>
            <form ref={el => window.inputFormLogin = el} className={styleLogin.wrapCenter} name="login" method="post" action="#">
                <div className="Centered">
                    <b>Введите логин</b>
                    <input ref={el => window.inputValueLoginName = el} type="text" name="login" required />
                </div>
                <div className="Centered" style={{ marginLeft: "20px" }}>
                    <b>Введите пароль</b>
                    <input ref={el => window.inputValueLoginPass = el} type="password" name="password" minLength={6} required />
                </div>
                <div className="Centered" style={{ marginLeft: "20px" }}>
                    <input ref={el => window.inputSubmitLogin=el} type="submit" value="Войти" style={{ minWidth: "75px" }} onClick={LoginClickAsync} />
                    <input type="reset" value="Очистить" style={{ marginTop: "10px" }} />
                </div>
            </form>
        </React.Fragment>
    }
export {Login}
