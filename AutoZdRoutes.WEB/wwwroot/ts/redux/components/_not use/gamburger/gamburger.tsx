import * as React from "react"
import * as ReactDOM from "react-dom"
import "./gamburger.css"
//import { hot } from 'react-hot-loader/root'
interface IProps { count: number}
interface IState { status: boolean}
class MyGamb extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = { status: true };
        this.press = this.press.bind(this);
    }
    press() {
    }
    render() {
        let count = this.props.count;
        return (
            <div className={"icon nav-icon-" + count}>
                {[...Array(3)].map((x,i) => <span key={i}></span> )}
            </div>)
    }
}
//export default hot(MyGamb)
export default MyGamb