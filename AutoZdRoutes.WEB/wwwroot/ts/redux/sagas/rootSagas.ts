import { put, takeEvery, call, select, takeLatest, all } from 'redux-saga/effects'
import { typeSetStations, ISetStationsAction, typeSetTypeStation, typeChangeVisibleStationsTab, typeChangeVisibleScheduleTab, typeChangeVisibleMap, typeChangeVisibleStaionsOnMap, typeSelectIdStation } from '../types'
import { RootState } from '../reducers/rootreducer'
import { ResizeSplitTabSchedule, ResizeSplitTabStations } from '../../crutch/forSplit';
import { getScheduleOnStation_ActTh, getStations_ActTh, selectIdStation_ActCr, SetScheduleOnStation_ActCr, setStations_ActCr } from '../actions/mapsActions';
//-----------------------------------------------------------------------
//function* w_printStations(action: ISetStationsAction) { //Заглушена
//    const getStore = (state) => state;
//    const store: RootState = yield select(getStore);
//}
//function* watchGetStations() {
//    yield takeLatest(typeSetStations, w_printStations);
//}
//------------------------------------------------------------------------
function* w_SelectIdStation() {
    const getStore = (state) => state;
    const store: RootState = yield select(getStore);
    const yandex_code = store.maps.stations.find(st => st.id == store.maps.selectedStationId).yandex_code;
    if (store.maps.visibleScheduleTab)
        yield put(getScheduleOnStation_ActTh(yandex_code) as any);
}
function* watchSelectIdStation() {
    yield takeEvery(typeSelectIdStation, w_SelectIdStation);
}
//------------------------------------------------------------------------
function* w_SetTypeStations() {
    const getStore = (state) => state;
    const store: RootState = yield select(getStore);
    if (store.maps.visibleStaionsOnMap)
        yield put(getStations_ActTh(store.maps.selectedTypeStationId) as any);
}
function* watchSetTypeStation() {
    yield takeEvery(typeSetTypeStation, w_SetTypeStations);
}
//------------------------------------------------------------------------
function* w_ChangeVisibleStationsTab() {
    const getStore = (state) => state;
    const store: RootState = yield select(getStore);
    if (store.maps.visibleStationsTab)
        ResizeSplitTabStations('60%', '40%')
    else
        ResizeSplitTabStations('100%', '0%')
}
function* watchChangeVisibleStationsTab() {
    yield takeEvery(typeChangeVisibleStationsTab, w_ChangeVisibleStationsTab);
}
//------------------------------------------------------------------------
function* w_ChangeVisibleScheduleTab() {
    const getStore = (state) => state;
    const store: RootState = yield select(getStore);
    const yandex_code = store.maps.stations.find(st => st.id == store.maps.selectedStationId).yandex_code;
    if (store.maps.visibleScheduleTab) {
        ResizeSplitTabSchedule('60%', '40%');
        yield put(getScheduleOnStation_ActTh(yandex_code) as any);
    }
    else
        ResizeSplitTabSchedule('100%', '0%')
}
function* watchChangeVisibleScheduleTab() {
    yield takeEvery(typeChangeVisibleScheduleTab, w_ChangeVisibleScheduleTab);
}
//------------------------------------------------------------------------
function* w_ChangeVisibleStaionsOnMap() {
    const getStore = (state) => state;
    const store: RootState = yield select(getStore);
    if (store.maps.visibleStaionsOnMap) {
        yield put(getStations_ActTh(store.maps.selectedTypeStationId) as any);
    }
}
function* watchChangeVisibleStaionsOnMap() {
    yield takeEvery(typeChangeVisibleStaionsOnMap, w_ChangeVisibleStaionsOnMap);
}
//------------------------------------------------------------------------
export function* rootSaga() {
    yield all([
        watchChangeVisibleScheduleTab(),
        watchChangeVisibleStationsTab(),
        watchChangeVisibleStaionsOnMap(),
        watchSetTypeStation(),
        watchSelectIdStation()
    ])
}