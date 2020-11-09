import {typeSetPreloader,IGlobalState,GlobalAction} from '../types'
//--------------------------------------------------------
const initialState: IGlobalState = {
    isloading:false
}
export function globalReducer(state = initialState, action: GlobalAction): IGlobalState {
    switch (action.type) {
        case typeSetPreloader: {
            return {
                ...state, isloading: action.isloading
            }
        }
        default:
            return state
    }
}