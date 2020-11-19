//см. ~/css/app_menu.css
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as styles from "./style.scss"
const style = styles as ClassMenu;
interface IProps {
    name: string;
    onClick?: Function;
    id?: number;
    selectIdFromParent?: number;
    img: string;
}
interface IState {
    isSelected: boolean;
}
/** Ярлык для элементов меню*/
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
        if (this.props.onClick)
            this.props.onClick(this.props.id);
        this.div.classList.add(style.wrapItem2)          // Подмигивание кнопки-листа --- немного антипаттерна реакту
        setTimeout(() => {                            
            this.div.classList.remove(style.wrapItem2);  
        },200);                                       
    }
    div: HTMLDivElement;
    render() {
        let urlImg = "/icons/" + this.props.img + ".png";
        let classWrapItem, classItemName: string;
        if (this.state.isSelected) {
            classWrapItem = style.wrapItem1;
            classItemName = style.itemName1;
        }
        else {
            classWrapItem = style.wrapItem0;
            classItemName = style.itemName0;
        }
        return (
            <div onClick={this.press} className={classWrapItem} ref={el => { this.div = el }}>
                <img className={style.itemImage} src={urlImg} />
                <div className={classItemName}>{this.props.name}</div> 
            </div>
        )
    }
}