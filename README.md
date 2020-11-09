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
- Список объектов, стран,...,районов,...,станций был загружен в БД. Таблица со станциями проиндексирована по полям ([latitude],[longitude]) для обновления объектов на текущей области карты.
6. Frontend:
 - React+Redux (начал использовать Saaga,хотя это несколько усложнило проект), компоненты(контейнеры) как на классах, так и на хуках
7. Ссылка на видео-демонстрацию работы сайта.
https://github.com/egorovvasiliy/LearnWeb/blob/main/SampleVideo.mp4
