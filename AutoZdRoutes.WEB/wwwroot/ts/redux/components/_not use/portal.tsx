import * as React from "react"
import * as ReactDOM from "react-dom"
// Шаблон для порталов. Пока не используется
interface IProps {
    el: Element;
}
interface IState {
}
export default class Portal extends React.Component<IProps,IState> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //modalRoot.appendChild(this.props.el);
    }
    componentWillUnmount() {
        //modalRoot.removeChild(this.props.el);
    }
    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.props.el
        );
    }
}