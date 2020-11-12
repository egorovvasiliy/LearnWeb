declare interface IStations {
    id: number,
    latitude: number,
    longitude: number,
    station_type: string,
    title: string,
    transport_type: string,
    yandex_code:string
}
declare interface ITypeStations {
    type_id: number,
    type_name: string,
    description: string
}
declare interface ThreadSchedule{
    uid: string,
    title: string,
    number: string,
    short_title: string,
    transport_type: string,
    vehicle: string,
    express_type: string
}
declare interface IResponseSheduleOnStation {
    schedule: ISheduleOnStation[]
}
declare interface ISheduleOnStation {
    arrival: string,
    type_name: string,
    description: string,
    thread: ThreadSchedule,
    is_fuzzy: boolean,
    days: string,
    departure: string
}
declare interface IUser {
    name: string,
    id:string
}