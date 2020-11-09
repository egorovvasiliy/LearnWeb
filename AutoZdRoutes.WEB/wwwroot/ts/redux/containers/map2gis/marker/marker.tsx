import * as React from 'react';
import * as style from './style.scss'
const typesStation = {
    'bus_stop': 'bus_stop',
    'bus_station': 'bus-station',
    'airport': 'airport',
}
interface IProps {
    typeStation: string,
    title: string,
    x: number,
    y: number,
    click,
    isActive: boolean
}
const Marker = (props: IProps) => {
    let styleMarker = style as ClassMarker;
    let { typeStation, title, x, y, click, isActive} = props;
    let _src = typesStation[typeStation] ? "/icons/" + typesStation[typeStation] + ".png" : "/icons/pointMap.png";
    return <div className={styleMarker.MarkerDiv} style={{ left: x, top: y }}>
        {isActive ? <div className={styleMarker.blink + " " + styleMarker.markerFlag}>↓</div> : null}
        <img onClick={click} className={styleMarker.markerClass} src={_src}/>
    </div>
}
export { Marker}