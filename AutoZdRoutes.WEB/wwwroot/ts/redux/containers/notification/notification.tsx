//Контейнер сообщений должен управляться внешними компонентами через ref(*) методами класса addMessage и removeMessage,
//т.к. принимать массив сообщений через props, означало бы хранение этого массива во вне (storage или state) и его чистить по необходимости,
        //а также при удалении (нажатием на крестики-close) пришлось бы это учитывать во внешнем хранилище через "подъем функции в props"..., а это прописывать логику работы с хранилищем в родительских компонентах
//Как это работает -->
        //Новые сообщения появляются вверху, через время опускаются вниз по мере удаления старых и плавно исчезают
        //Также есть возможность их удалить в ручную пользователем раньше автоматического исчезновения
//*---можно попытаться сделать по другому, принимать в пропсах массив сообщений и далее getDerivedStateFromProps() сравнивал текущий State с props...
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as styles from "./style.scss"  // Параметры задержек только здесь!!!
const style = styles as ClassNotification;
import { setTimeout } from "timers";
class Message {
    constructor(_body: string = "", _date: number=Date.now(), _visible: boolean = true) {
        this.body = _body;
        this.visible = _visible;
        this.date = _date;
    }
    body: string;
    visible?: boolean; // отображено полностью, еще не помечено на удаление,меняется сразу же на false в componentDidUpdate
    date?: number;
    public static countClosed: number = 0; //общее кол-во отрендеренных сообщений
}
enum OperationEnum {
    empty,
    add,
    remove
}
interface IProps {
}
interface IState {
    messages: Message[];
    operation?: OperationEnum;
    itemMessage?: Message
}
export default class Notifications extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state={
            messages: new Array<Message>(),
            operation: OperationEnum.empty
        };
    }
    //----------------------------------------------------------------------
    componentDidUpdate = (prevProps: IProps, prevState: IState) => {
        if (this.state.operation == OperationEnum.add)
            setTimeout(() => {
                this.domMessages.forEach(el => el && el.classList.add(style.Close));
            }, 100);
        //#Solve: почему в этом же потоке класс цепляется до построения дерева
    }
    //----------------------------------------------------------------------
    //addElement: HTMLDivElement;
    domMessages: HTMLDivElement[] = new Array<HTMLDivElement>();
    public addMessage = (text: string) => {
        let newMessage = new Message(text);
        this.setState(prevstate => ({
            messages: [newMessage, ...prevstate.messages.map(mes => ({ ...mes, visible: false }))],
            operation: OperationEnum.add,
            itemMessage: newMessage
        }))
    };
    public removeMessage = (date) => {
        this.setState(prevstate => ({
            messages: prevstate.messages.filter(mes => mes.date != date),
            operation: OperationEnum.remove
        }))
    };
    keyMessage = 0;
    render() {
        this.domMessages = new Array<HTMLDivElement>();
        return (
            <React.Fragment>
                <div className={style.WrapFixed}>
                    {
                        this.state.messages.map((mes, i) => {
                            let convert = (obj: number) => obj > 9 ? obj.toString() : `0${obj}`;
                            let addClass = !mes.visible ? style.Close : "";
                            let date = new Date(mes.date);
                            let hours = convert(date.getHours());
                            let min: any = convert(date.getMinutes());
                            let sec: any = convert(date.getSeconds());
                            return (
                                <div key={mes.date} className={style.Notification + ' ' + addClass} ref={el => { el && el.setAttribute('key', mes.date.toString()); el && this.domMessages.push(el); }}>
                                    <div className={style.Message}>{mes.body}</div>
                                    <div className={style.clBtn} onClick={() => { this.removeMessage(mes.date); }}></div>
                                    <div>{`время: ${hours}:${min}:${sec}`}</div>
                                </div>)
                            //#Solve:в ref el оказываются Null-ы при изменении состояния даже с учетом key
                        })
                    }
                </div>
            </React.Fragment>
            )
    }
}