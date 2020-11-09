import { urlWeb} from "./constants"
class JsonResponse {
    constructor(mes: string) {
        this.message = mes;
    }
    code: number;
    message: string;
    errors: Array<JsonResponse>;
}
export const IsValidatedToken = async (_token: string) => {
    try {
        let response = await fetch(`/account/ValidateToken`, {
            method: "Head"
        });
        return response.status === 200;
    }
    catch (ex) {
        return false;
    }
}
export const RunLoginAsync = async (e?:Event) => {
    e && e.preventDefault();
    let [_username, _password] = [window.inputValueLoginName.value, window.inputValueLoginPass.value]
    let submit = window.inputSubmitLogin; //e.target;
    let loginForm = window.inputFormLogin;
    loginForm.reportValidity();
    if (loginForm.checkValidity()) {
        submit.disabled = true;
        try {
            let response = await fetch(urlWeb + `/account/login`, {
                method: "POST",
                headers: {
                    accept: "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: _username,
                    password: _password
                })
            });
            return await response.json() as JsonResponse;
        }
        catch (ex) {
            new JsonResponse(ex);
        }
        finally {
            submit.disabled = false;
        }
    }
}
export const RunLogoutAsync = async (e?: Event) => {
    e && e.preventDefault();
    let submit = window.inputSubmitLogout; //e.target;
    if(submit) submit.disabled = true;
    try {
        let response = await fetch(urlWeb + `/account/logout`, {
            method: "POST",
            headers: {
                accept: "application/json",
            }
        });
        if (response.ok === true) {
            let json: JsonResponse = await response.json();
            //if (json.code == 200)//Иначе не успех
            //    document.location.assign(urlWeb);//#Solve: возможно обойтись без этого , если куки сразу приходят
            window.SendNotification(json.message);
        }
        else {
            window.SendNotification("Ошибка на сервере авторизации");
        }
    }
    catch (ex) {
        window.SendNotification("не удалось связаться с сервером авторизации");
    }
    finally {
        if (submit) submit.disabled = false;
    }
}
export const RunRegisterAsync = async (e:Event) => {
    e.preventDefault();
    let [_username, _password, _password_conf] = [window.inputValueRegisterName.value, window.inputValueRegisterPass.value, window.inputValueRegisterPassConf.value];
    let submit = window.inputSubmitRegister; // e.target
    let registerForm = window.inputFormRegister;
    registerForm.reportValidity();
    if (registerForm.checkValidity()) {
        try {
            submit.disabled = true;
            let response = await fetch(urlWeb + `/Account/Register`, {
                method: "POST",
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: _username,
                    Password: _password,
                    ConfirmPassword: _password_conf
                })
            });
            if (response.ok === true) {
                let json:JsonResponse = await response.json();
                if ((json as JsonResponse).code == 400) {
                    window.SendNotification("Ошибка400:" + (json as JsonResponse).errors.reduce((previousValue, currentItem, index, arr) => new JsonResponse(previousValue.message + currentItem.message)).message);
                    return;
                }
                document.location.assign(`${urlWeb}/Account/SuccessRegister?email=${_username}`);
            }
            else {
                const errorData = await response.json();
                window.SendNotification(errorData.errorText);
            }
        }
        catch (ex) {
            window.SendNotification("Произошла ошибка на сервере авторизации");
        }
        finally {
            submit.disabled = false;
        }
    }
}