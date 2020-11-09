//см. ~/css/app_menu.css
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as style from "./style.scss"
const styleMenu = style as ClassMenu;
interface IProps {
    name: string;
    click?: Function;
    id?: number;
    selectIdFromParent?: number;
    img: string;
}
interface IState {
    isSelected: boolean;
}
export default class Item extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: this.props.id === this.props.selectIdFromParent
        }
    }   
    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        return {
            isSelected: nextProps.id == nextProps.selectIdFromParent
        }
    }
    press = (e) => {
        //e.persist(); //Раскомментировать, если понадобится объект события
        //-------------------------------------------------
        if (this.props.click)
            this.props.click(this.props.id);
        this.div.classList.add(styleMenu.wrapItem2)          //Подмигивание кнопки-листа --- немного антипаттерна реакту
        setTimeout(() => {                            //
            this.div.classList.remove(styleMenu.wrapItem2);  //
        },200);                                       
    }
    div: HTMLDivElement;
    render() {
        let urlImg = "/icons/" + this.props.img + ".png";
        let classWrapItem, classItemName: string;
        if (this.state.isSelected) {
            classWrapItem = styleMenu.wrapItem1;
            classItemName = styleMenu.itemName1;
        }
        else {
            classWrapItem = styleMenu.wrapItem0;
            classItemName = styleMenu.itemName0;
        }
        return (
            <div onClick={this.press} className={classWrapItem} ref={el => { this.div = el }}>
                <img className={styleMenu.itemImage} src={urlImg} />
                <div className={classItemName}>{this.props.name}</div> 
            </div>
        )
    }
}