import * as React from 'react';
export const Register = (props: { isAuth: boolean, LogOutClickAsync: any, RegisterClick: any }) => {
    let { isAuth, LogOutClickAsync, RegisterClick } = props;
    return isAuth ?
        <React.Fragment>
            <div style={{ display: "flex", flexWrap: "wrap", margin: "auto" }}>
                <input ref={el => window.inputSubmitLogout = el} onClick={LogOutClickAsync} type="button" value="Выйти/сменить пользователя" />
            </div>
        </React.Fragment>
        :
        <React.Fragment>
            <form ref={el => window.inputFormRegister = el}name="login" method="post" action="#" style={{ display: "flex", flexWrap: "wrap", margin: "auto" }}>
                <div className="Centered">
                    <b>Введите логин</b>
                    <input ref={el => window.inputValueRegisterName = el} type="text" name="email" required />
                </div>
                <div className="Centered" style={{ marginLeft: "20px" }}>
                    <b>Введите пароль</b>
                    <input ref={el => window.inputValueRegisterPass = el} type="password" name="password" minLength={6} required />
                </div>
                <div className="Centered" style={{ marginLeft: "20px" }}>
                    <b>Введите пароль повторно</b>
                    <input ref={el => window.inputValueRegisterPassConf = el} type="password" name="confirmPassword" minLength={6} required />
                </div>
                <div className="Centered" style={{ marginLeft: "20px" }}>
                    <input ref={el => window.inputSubmitRegister = el} type="submit" value="Зарегистрироваться" style={{ minWidth: "75px" }} onClick={RegisterClick} />
                    <input type="reset" value="Очистить" style={{ marginTop: "10px" }} />
                </div>
            </form>
        </React.Fragment>
}