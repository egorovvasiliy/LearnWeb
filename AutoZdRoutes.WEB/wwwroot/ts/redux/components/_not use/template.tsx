import * as React from "react"
import * as ReactDOM from "react-dom"
// Шаблон для создания компонентов
interface IProps {
    click?: (e: React.ChangeEvent<HTMLElement>) => void
}
interface IState {
}
export default class Template extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    click = (e) => {
        //e.persist(); //Раскомментировать, если понадобится объект события
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
        }
    }
    render() {
        return (
            <React.Fragment>

            </React.Fragment>
            )
    }
}