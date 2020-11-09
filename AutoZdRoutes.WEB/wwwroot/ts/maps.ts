import { urlApi, urlWeb } from "./constants"
//--------------------------------------------
export const GetScheduleOnStationAsync = async (y_code: string) => {
    let response = await fetch(urlWeb + `/Maps/GetScheduleOnStation?idStation=${y_code}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).
        catch(ex => {
            window.SendNotification("Не получилось");
            return new Array<IStations>();
        }) as Response;
    if (response.ok === true) {
        return await response.json();
    }
    else {
        window.SendNotification("Не удалось получить данные с сервера");
    }
}
export const GetStationsAsync = async (type_id: number) => {
    let boundsMap = window.map2gis.getBounds();
    let southWestMap = boundsMap._southWest;
    let northEastMap = boundsMap._northEast;
    let response = await fetch(urlWeb + `/Maps/getstations`, {
        method: "POST",
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sw_lat: southWestMap.lat,
            sw_lng: southWestMap.lng,
            ne_lat: northEastMap.lat,
            ne_lng: northEastMap.lng,
            type_id: type_id
        })
    }).
        catch(ex => {
            window.SendNotification("Не получилось");
            return new Array<IStations>();
        }) as Response;
    let stations=new Array<IStations>();
    if (response.ok === true) {
        stations= await response.json();
        return stations;
    }
    else {
        window.SendNotification("Не удалось получить данные с сервера");
        return new Array<IStations>();
    }
}
export const GetTypesStationAsync = async () => {
    let response = await fetch(urlWeb + `/Maps/GetTypesStation`, {
        headers: {
            accept: 'application/json',
        }
    }).
        catch(ex => {
            window.SendNotification("Не получилось");
            return new Array<string>();
        }) as Response;
    let types = new Array<ITypeStations>();
    if (response.ok === true) {
        types = await response.json();
    }
    else {
        window.SendNotification("Не удалось получить данные с сервера");
    }
    return types;
}
export const LoadPointsToJsonAsync = async () => {
    let response = await fetch(urlWeb + `/Maps/LoadPointsToFile`, {
        method: "POST"
    })
        .catch((ex) => { "Не получилось" }) as Response;
    if (response.ok) {
        window.SendNotification("Все ок");
    }
    else {
        window.SendNotification("Не получилось");
    }
}
export const LoadPointsToBDFromJsonAsync = async () => {
    let response = await fetch(urlApi + `/Test/LoadPointsToBD`, {
        method: "POST"
    }).catch((ex) => { "Не получилось" }) as Response;
    if (!response.ok) {
        window.SendNotification("Не получилось");
    }
}