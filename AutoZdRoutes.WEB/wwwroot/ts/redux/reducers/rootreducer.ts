import { combineReducers } from "redux"
import { authReducer } from "./authReducer"
import { settingsReducer } from "./settingsReducer"
import { mapsReducer } from "./mapsReducer"
import { globalReducer } from "./globalReducer"
import { wsChatReducer } from "./wsChatReducer"
//-------------------------------------------------------------------
let combRed = {
    auth: authReducer,
    settings: settingsReducer,
    maps: mapsReducer,
    global: globalReducer,
    wsChat: wsChatReducer
};
export const rootReducer = combineReducers(combRed);
export type RootState = ReturnType<typeof rootReducer>;
export type GetState = () => RootState;