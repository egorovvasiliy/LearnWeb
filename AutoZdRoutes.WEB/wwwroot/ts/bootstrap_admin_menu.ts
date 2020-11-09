//#Title - Обработка меню шапки
// Демонстрация кода: #jquery
//#Location - View/Admin/Index.chtml
//------------------------------------------------------------------------Обработка событий-------------------
//------------------------------------------------------------------------------------------------------------
//---------------Скрыть все открытые меню, перед открытием нового
$('.extensionMenu.collapse').on('show.bs.collapse', (e) => {
    $('.extensionMenu.collapse').collapse('hide');
});
//---------------Скрыть все открытые DropDown, перед открытием нового
$('li.dropdown').on('show.bs.dropdown', () => {
    $('.extensionMenu.collapse').collapse('hide');
    $(".subMenu+ul").removeClass("show");
 });
//-----------Многоуровневый Right-DropDown-------отсутствует по умолчанию в bootstrap----
$(".subMenu").get().forEach((anchorSubMenu) => {
    anchorSubMenu.onclick = (e) => {
        let mainUl = anchorSubMenu.parentElement.parentElement;
        let allUl = mainUl.querySelectorAll(".subMenu+ul");
        let currentUl = anchorSubMenu.nextElementSibling;
        for (let i = 0; i < allUl.length; i++) {      //достаточно закрыть все на одном уровне
            if (allUl[i] != currentUl)
            $("#" + allUl[i].id).removeClass("show");
        }
        $("#" + currentUl.id).toggleClass("show");
    };
});
//--Оставляем открытым Item-DropDown,который при нажатии закрывается по умолчанию
$(".subMenu").on("click.bs.dropdown", (e) => {
    e.stopPropagation();
});