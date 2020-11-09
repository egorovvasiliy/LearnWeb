import {
    typeSetTypeStation,typeSetStations, typeChangeVisibleMap,
    typeChangeVisibleStationsTab, MapsAction, Actions,
    typeChangeVisibleStaionsOnMap,typeSelectIdStation, typeSetTypesStation, typeChangeVisibleScheduleTab, typeSetScheduleOnStation
} from '../types'
import { GetStationsAsync, GetScheduleOnStationAsync } from '../../maps'
import { setPreloader_ActCr } from './globalActions';
import { GetState } from '../reducers/rootreducer';
//----------ActionsCreators----------------------------------------------
type disp = (action: Actions) => Actions;
export const selectIdStation_ActCr = (_id: number): MapsAction =>
    ({
        type: typeSelectIdStation,
        id: _id
    })
export const changeVisibleStaionsOnMap_ActCr = (val:boolean): MapsAction =>
    ({
        type: typeChangeVisibleStaionsOnMap,
        displayStaionsOnMap: val
    })
export const setTypeStation_ActCr = (_typeId: number): MapsAction => 
    ({
        type: typeSetTypeStation,
        selectedTypeStationId: _typeId
    })
export const setTypesStation_ActCr = (_typesStation: ITypeStations[]): MapsAction =>
    ({
        type: typeSetTypesStation,
        typesStation: _typesStation
    })
export const setStations_ActCr = (_stations: IStations[]): MapsAction =>
    ({
        type: typeSetStations,
        stations: _stations
    })
export const getStations_ActTh = (type_id:number) =>
    async (dispatch: disp) => {
        dispatch(setPreloader_ActCr(true));
        try {
            let stations = await GetStationsAsync(type_id);
            dispatch(setStations_ActCr(stations));
        }
        catch (ex) {
        }
        finally {
            dispatch(setPreloader_ActCr(false));
        }
    }
//-----------------------------------
export const changeVisibleMap_ActCr = (val?:boolean): MapsAction =>
    ({
        type: typeChangeVisibleMap,
        visibleMap: val
    })
export const changeVisibleStationsTab_ActCr = (val?: boolean): MapsAction =>
    ({
        type: typeChangeVisibleStationsTab,
        val: val
    })
export const changeVisibleSheduleTab_ActCr = (val?: boolean): MapsAction =>
    ({
        type: typeChangeVisibleScheduleTab,
        val: val
    })
export const SetScheduleOnStation_ActCr = (val?: ISheduleOnStation[]): MapsAction =>
    ({
        type: typeSetScheduleOnStation,
        val: val || new Array<ISheduleOnStation>()
    })
export const getScheduleOnStation_ActTh = (y_code: string) =>
    async (dispatch: disp, getState: GetState) => {
        dispatch(setPreloader_ActCr(true));
        try {
            let responseJson: IResponseSheduleOnStation = await GetScheduleOnStationAsync(y_code);
            dispatch(SetScheduleOnStation_ActCr(responseJson.schedule));
            if (!getState().maps.visibleScheduleTab)
                dispatch(changeVisibleSheduleTab_ActCr(true));
        }
        catch (ex) {
        }
        finally {
            dispatch(setPreloader_ActCr(false));
        }
    }