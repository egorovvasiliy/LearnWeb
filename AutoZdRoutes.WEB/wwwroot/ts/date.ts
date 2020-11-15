export const ConvertDate = (_date:number|Date) => {
    let convert = (obj: number) => obj > 9 ? obj.toString() : `0${obj}`;
    let date = new Date(_date);
    return {
        hours:convert(date.getHours()),
        min: convert(date.getMinutes()),
        sec: convert(date.getSeconds())
    }
}
export const GetCurrentTimeDateToString = (_date: number | Date) => {
    let date = ConvertDate(_date);
    return `${date.hours}:${date.min}:${date.sec}`
}