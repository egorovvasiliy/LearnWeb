import * as React from "react"
import * as ReactDOM from "react-dom"

interface IProps {
    nameTrue: string,
    nameFalse: string,
    value?: boolean,
    change?: (e: React.ChangeEvent<HTMLElement>) => void
}
interface IState {
    nameTrue: string,
    nameFalse: string,
    value: boolean
}
export default class RadioButtonBinary extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            nameTrue: this.props.nameTrue,
            nameFalse: this.props.nameFalse,
            value: this.props.value
        }
    }
    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        return {
            nameTrue: nextProps.nameTrue,
            nameFalse: nextProps.nameFalse,
            value: nextProps.value
        }
    }
    render() {
        return (
            <form style={{ mixBlendMode: "luminosity" }}>
                <input name="RadioButton" type="radio" defaultChecked={!this.state.value} onChange={this.props.change} />{this.state.nameFalse}
                <br />
                <input name="RadioButton" type="radio" defaultChecked={this.state.value} onChange={this.props.change} />{this.state.nameTrue}
            </form>
        )
    }
}