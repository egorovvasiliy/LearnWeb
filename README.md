1.	Описание:
-	Сбор информации с API Яндекс.Расписаний:
https://yandex.ru/dev/rasp/doc/concepts/about-docpage/
-	Хранение информации в БД msSql.
-	Отображение данных в на портале ASP.Net Core средствами API 2Gis.
https://api.2gis.ru/doc/maps/ru/quickstart/
- В перспективе построение оптимального маршрута между двумя автобусными станциями

2. Используемые в проекте исходные данные:
- https://yandex.ru/dev/rasp/doc/reference/stations-list.html
  170 000 строк в БД
- https://yandex.ru/dev/rasp/doc/reference/schedule-on-station.html
3. Авторизация и аутентификация:
- На основе JWT.
- Солянка с asp.net identity core
4. Детали:
- Многоуровневое меню на данный момент намеренно наполнено лишними элементами, не имеющими полезной нагрузки, для демонстрации работы.
5. Структура БД(MSSQL):
- Список объектов, стран,...,районов,...,станций был загружен в БД. Таблица со станциями проиндексирована по полям ([latitude],[longitude]) для быстрой загрузки объектов на текущей области карты.
6. Frontend:
 - typescript+React+Redux+scss(вшитые модулями в компоненты(почти всегда)) (начал использовать Saaga,хотя это несколько запутало проект), компоненты(контейнеры) как на классах, так и на хуках
 - сборка : webpack
7. Видео:
- * чат на вебсокетах:
https://www.youtube.com/watch?v=ha2BLEyWzp4&feature=youtu.be
- * вход,выход пользователей портала(ограничение доступа по ролям пользователей admin/user):
https://www.youtube.com/watch?v=ajVelfvTHYQ&feature=youtu.be

...скоро заменю это видео
- * https://www.youtube.com/watch?v=F_tB7JsLFWQ&feature=youtu.be
- ** в конце видео показано все, что есть в БД
9. Ссылка на решение тестового задания(на аналитику) по mssql:
https://github.com/egorovvasiliy/LearnWeb/blob/main/SampleSql.txt
