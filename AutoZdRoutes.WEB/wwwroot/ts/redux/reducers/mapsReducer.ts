import {
    IMapsState, MapsAction, typeChangeVisibleMap, typeChangeVisibleStationsTab,
    typeSetTypesStation,typeSetStations,
    typeSetTypeStation, typeChangeVisibleStaionsOnMap, typeSelectIdStation, typeChangeVisibleScheduleTab, typeSetScheduleOnStation
} from '../types'
//--------------------------------------------------------
const initialState: IMapsState = {
    visibleMap: true,
    visibleStaionsOnMap: false,
    visibleStationsTab: false,
    visibleScheduleTab:false,
    stations: new Array<IStations>(),
    typesStation: new Array<ITypeStations>(),
    selectedTypeStationId: 0,
    selectedStationId: 0,
    sheduleOnStation: new Array<ISheduleOnStation>()
}
export function mapsReducer(state = initialState, action: MapsAction): IMapsState {
    switch (action.type) {
        case typeChangeVisibleStaionsOnMap: {
            return {
                ...state, visibleStaionsOnMap: action.displayStaionsOnMap
            }
        }
        case typeSetTypesStation: {
            return {
                ...state, typesStation: [...action.typesStation, { type_id:0, type_name:'Все', description:'Все' }]
            }
        }
        case typeSetStations: {
            return {
                ...state, stations: action.stations
            }
        }
        case typeChangeVisibleMap: {
            return {
                ...state, visibleMap: !state.visibleMap
            };
        }
        case typeChangeVisibleStationsTab: {
            return {
                ...state, visibleStationsTab: !state.visibleStationsTab
            };
        }
        case typeChangeVisibleScheduleTab: {
            return {
                ...state, visibleScheduleTab: action.val
            };
        }
        case typeSetTypeStation: {
            return {
                ...state, selectedTypeStationId: action.selectedTypeStationId
            };
        }
        case typeSelectIdStation: {
            return {
                ...state, selectedStationId:action.id
            }
        }
        case typeSetScheduleOnStation: {
            return {
                ...state, sheduleOnStation: action.val
            }
        } 
        default:
            return state
    }
}