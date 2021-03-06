# 1.	Описание:
-	Сбор информации с API Яндекс.Расписаний:
https://yandex.ru/dev/rasp/doc/concepts/about-docpage/
-	Хранение информации в БД msSql.
-	Отображение данных на портале ASP.Net Core средствами API 2Gis.
https://api.2gis.ru/doc/maps/ru/quickstart/
- В перспективе построение оптимального маршрута между двумя автобусными станциями

# 2.	Используемые в проекте исходные данные:
- https://yandex.ru/dev/rasp/doc/reference/stations-list.html
  170 000 строк в БД
- https://yandex.ru/dev/rasp/doc/reference/schedule-on-station.html
# 3.	Авторизация и аутентификация:
- На основе JWT.
- Солянка с asp.net identity core
# 4.	Детали:
- Многоуровневое меню на данный момент намеренно наполнено лишними элементами, не имеющими полезной нагрузки, для демонстрации работы.
# 5.	Структура БД(MSSQL):
- Список объектов, стран,...,районов,...,станций был загружен в БД. Таблица со станциями проиндексирована по полям ([latitude],[longitude]) для быстрой загрузки объектов на текущей области карты.
# 6.	Frontend:
 - typescript+React+Redux+scss(вшитые модулями в компоненты(почти всегда)) (начал использовать Saaga,хотя это несколько запутало проект), компоненты(контейнеры) как на классах, так и на хуках
 - сборка : webpack
# 7.	Видео:
- чат на вебсокетах:
https://www.youtube.com/watch?v=ha2BLEyWzp4&feature=youtu.be
-----------------------------------------------------------------------------------------------------------------------
- вход,выход пользователей портала(ограничение доступа по ролям пользователей admin/user):
- в конце видео работа с bootstrap-menu, а также компонент выпадающих случайных сообщений(пример-CSS):
https://www.youtube.com/watch?v=ajVelfvTHYQ&feature=youtu.be
- Регистрация на портале с подтверждением по почте
https://www.youtube.com/watch?v=Wseghea8PvM&feature=youtu.be
-----------------------------------------------------------------------------------------------------------------------
- адаптивность портала
https://www.youtube.com/watch?v=t5Rqi6yeH1s&feature=youtu.be
# 8.	Мое решение тестового задания(на аналитику) по mssql:
https://github.com/egorovvasiliy/LearnWeb/blob/main/SampleSql.txt
# 9.	Реализуемые в проекте паттерны:
- Стратегия: https://github.com/egorovvasiliy/LearnWeb/blob/main/AutoZdRoutes.WEB/Services/ChatWS/ChatService.cs
- Декоратор сокета: https://github.com/egorovvasiliy/LearnWeb/blob/main/AutoZdRoutes.WEB/wwwroot/ts/wsChatService/wsChatService.ts
- Цепочка обязанностей: middleware в классе Startup.
- Композит: 
https://github.com/egorovvasiliy/LearnWeb/blob/main/AutoZdRoutes.WEB/wwwroot/ts/redux/components/menu/menu.tsx
https://github.com/egorovvasiliy/LearnWeb/blob/main/AutoZdRoutes.BLL/Model/ParsingApi/Stations/Locality.cs
