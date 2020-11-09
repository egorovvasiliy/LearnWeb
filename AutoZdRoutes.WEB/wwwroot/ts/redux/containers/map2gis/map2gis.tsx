import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/rootreducer'
import * as style from "./style.scss"
const styleMap = style as ClassMap;
import { Marker } from './Marker/Marker'
import { selectIdStation_ActCr } from '../../actions/mapsActions';
//--------------------------------------------------------------------------
export const Map2gis = () => {
    const state = useSelector((store: RootState) => store.maps);
    const dispatch = useDispatch();
    const stations = state.stations;
    return <div id="map" className={styleMap.Map} style={{ display: state.visibleMap ? "block" : "none" }}>
        <div className={styleMap.myleaflet}>
            {stations.map((st) => {
                let pointOverOrigin = window.map2gis.latLngToLayerPoint({ lat: st.latitude, lng: st.longitude });
                let pointOverContainer: { x: number, y: number } = window.map2gis.layerPointToContainerPoint(pointOverOrigin);
                return <Marker isActive={state.selectedStationId == st.id} key={st.id} title={st.title} typeStation={st.station_type} x={pointOverContainer.x} y={pointOverContainer.y} click={() => dispatch(selectIdStation_ActCr(st.id))} />
            })}
        </div>
    </div>
}