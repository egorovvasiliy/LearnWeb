import * as React from "react"
import * as ReactDOM from "react-dom"
import * as styles from "./style.scss"
const style = styles as ClassMenu;
import Item from "./item"
/*
Этот компонент представляет собой элемент многоуровневого меню (дерева).
Особенность интерфейса - горизонтальное раскрытие вложенности с сохранением видимости(+некоторое затенение и углубление) всех родительских меню.
Древовидную форму меню обеспечивает наличие в коде ссылок на элементы Menu(см. div с классом RightMenu).
Допускается встраивать в состав меню любой пользовательский компонент(в качестве children).
DOM-дерево компонента выглядит следующим образом:
    div с классом LeftMenu содержит список дочерних элементов компонента Menu, обернутых в Item (либо вложенный компонент меню...либо другого рода компоненты-листья дерева)
    div с классом RightMenu содержит в себе уже "внуков" (дочерние элемента на уровень ниже), проиндексированных и скрытых.
    При нажатии на элемент в div.LeftMenu либо выполняется какое-то действие, либо(*) активным становится один из компонентов внутри div.RightMenu.
        *-сам же элемент становится не активным, получает (затененное) оформление.
*/
interface IProps {
    id?: number,
    name?: string,
    img?: string,
    click?: Function,
    parentMenu?: Menu,
    click_id?: number,
}
interface IState {
    leftMenuState: StateEnum, 
    select_id: number, // Идентификатор выбранного элемента Children
    parentMenu?: Menu,
    flexWrap: boolean
}
enum StateEnum { //см. div.LeftMenu
    Empty,
    Active,
    Hide
}  
interface ClassMenu {
    WrapMenu,
    wrapItem0, wrapItem1, wrapItem2,
    closerMenu,
    CurrentMenu,
    OuterCenter,
    InnerCenter,
    LeftMenu,
    RightMenu,
    ShowBorderRightMenu,
    itemImage0, itemImage1,
    CenterContent: string
}
//***************************************************************************************************************
export default class Menu extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            select_id: undefined,
            leftMenuState: StateEnum.Empty,
            flexWrap:false
        }
    }
    childsMenu: Array<Menu>;
    setStateLeftMenuFromChild = (_val:StateEnum) => { 
        this.setState({
            leftMenuState: _val
        });
    }
    setStateLeftMenu = (_val: StateEnum,_id: number = undefined) => {
        this.setState({
            leftMenuState: _val,
            select_id: _id
        });
    }
    press = (_id) => {
        if (_id == this.state.select_id) //отжать текущую кнопку
        {
            this.close();
        }
        else if (_id>-1) {//переключение элементов одного уровня
            this.childsMenu[_id] && this.childsMenu[_id].close();
            this.setState({
                select_id: _id,
                leftMenuState: StateEnum.Active
            });
            if (this.props.parentMenu)
                this.props.parentMenu.setStateLeftMenuFromChild(StateEnum.Hide);
        }
    }
    close = (isClosedHead?: boolean) => {
        if (isClosedHead == undefined || !isClosedHead) {
            isClosedHead = true;
            if (this.props.parentMenu)
                this.props.parentMenu.setStateLeftMenuFromChild(StateEnum.Active);
        }
        this.setState({
            select_id: undefined,
            leftMenuState: StateEnum.Empty
        })
        this.childsMenu.forEach(subMenu => {
            subMenu.close(isClosedHead);
        })
    }
    menuHtmlElement: HTMLDivElement;
    flexWrap: boolean;
    componentDidMount = () => {
        window.addEventListener('resize', e => {
            if (this.menuHtmlElement) {
                let isWrap = this.menuHtmlElement.clientWidth > (e.currentTarget as Window).innerWidth - 30;
                console.log(this.props.name, this.state.parentMenu, this.menuHtmlElement.clientWidth);
                if (this.state.parentMenu) {
                    this.flexWrap = this.state.parentMenu.flexWrap && isWrap;
                    console.log(this.props.name, this.state.parentMenu.flexWrap, this.menuHtmlElement.clientWidth);
                }
                else 
                    this.flexWrap = isWrap;
                this.setState(state => ({
                    flexWrap: this.flexWrap
                }))
            }
        });
    }
//***************************************************************************************************************
    render() {
        let classLeftMenu, classRightMenu: string;
        //---------------------------------------------------------------------------------------------------------------
        switch (this.state.leftMenuState) {
            case StateEnum.Empty: {
                classLeftMenu = style.LeftMenu;
                classRightMenu = style.RightMenu;
                break;
            }
            case StateEnum.Active: {
                classLeftMenu = style.LeftMenu + " " + style.CurrentMenu;
                classRightMenu = style.RightMenu + " " + style.ShowBorderRightMenu;
                break;
            }
            case StateEnum.Hide: {
                classLeftMenu = style.LeftMenu;
                classRightMenu = style.RightMenu + " " + style.ShowBorderRightMenu;
                break;
            }
        }
        //---------------------------------------------------------------------------------------------------------------
        let grandChilds = [];
        let indMenuWithChilds = 0;
        let childs = React.Children.map(this.props.children, (child: any, i) => {
            let clickFunc: Function;
            let _id: number;
            let _selectIdFromParent: number;
            if (child.type.name == Menu.name) {
                if ((child as Menu).props.click) {  // наличие в props "click" предполагает, что у этого элемента меню не должно быть потомков, и оно действует как кнопка
                    clickFunc = (child as Menu).props.click;
                }
                else {
                    clickFunc = this.press; //для передачи id нажатой кнопки, чтобы раскрыть подменю
                }
                if (child.props.children)//!!!! Проверить!!!
                {
                    _id = indMenuWithChilds++;
                    _selectIdFromParent = this.state.select_id;
                    grandChilds.push(child.props.children);
                }
                else {
                    _id = -1; //Здесь важно, чтобы эти id были не равны,т.к. они сравниваются в Item-компоненте
                    _selectIdFromParent = null;
                }
                return <Item id={_id} selectIdFromParent={_selectIdFromParent} name={(child as Menu).props.name} img={(child as Menu).props.img} click={clickFunc} />
            }
            else
                return <div style={{ maxWidth: "none" }} className={style.CenterContent + " " + style.wrapItem0}>{child}</div>
        });
        //---------------------------------------------------------------------------------------------------------------
        this.childsMenu = new Array<Menu>();
        let resultTreeMenu = (
            <div ref={el => { this.menuHtmlElement = el }} className={style.WrapMenu} style={{ display: this.props.click_id === this.props.id ? "flex" : "none", flexWrap: this.state.flexWrap ? "wrap" : "nowrap" }}>
                <div className={style.OuterCenter}>
                    <div className={classLeftMenu + " " + style.InnerCenter} data-hide={this.state.leftMenuState == StateEnum.Hide}>
                        {childs}
                        {this.state.select_id > -1 ?
                            <div className={style.closerMenu} onClick={e => { this.close() }}>x</div> : null
                        }
                    </div>
                </div>
                <div className={classRightMenu}>
                    {grandChilds.map((child, i) => (<Menu key={i} id={i} click_id={this.state.select_id} parentMenu={this} ref={el => { el && this.childsMenu.push(el)}}>{child}</Menu>))}
                </div>
            </div>
        );
        let resultSimpleMenu = (
            <div className={style.WrapMenu} style={{ display: this.props.click_id === this.props.id ? "flex" : "none" }}>
                {childs}
            </div>
        );
//---------------------------------------------------------------------------------------------------------------
        if (grandChilds[0])
            return resultTreeMenu;
        else
            return resultSimpleMenu;
    }
}
const test = 0;
export { test}