import { combineReducers } from "redux"
import { authReducer } from "./authReducer"
import { settingsReducer } from "./settingsReducer"
import { mapsReducer } from "./mapsReducer"
import { globalReducer } from "./globalReducer"
//-------------------------------------------------------------------
let combRed = {
    auth: authReducer,
    settings: settingsReducer,
    maps: mapsReducer,
    global: globalReducer
};
export const rootReducer = combineReducers(combRed);
export type RootState = ReturnType<typeof rootReducer>;
export type GetState = () => RootState;