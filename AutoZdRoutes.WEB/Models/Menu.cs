//Модель меню шапки
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoZdRoutes.WEB.Models
{
    public enum MenuType {
        DropDown,
        DropRight,  //--Не применяется
        Button,
        None
    }
    public enum HandlerType
    {
        Action,
        Script,
        None
    }
    public class Menu
    {
        public Menu(int _id,string _name, MenuType _mtype = MenuType.DropDown, HandlerType _htype=HandlerType.None, string _handler="") {
            this.id = _id; 
            this.name = _name;
            this.typeMenu = _mtype;
            this.typeHandler = _htype;
            this.handler = _handler;
        }
        public int id;
        public int parent_id;
        public string name;
        public MenuType typeMenu;
        public HandlerType typeHandler;
        public string handler; // 1) url(Controller/Action) vs 2) Script({MethodName}+"()")
        public byte sort_index;
        public List<Menu> children;
    }
}
