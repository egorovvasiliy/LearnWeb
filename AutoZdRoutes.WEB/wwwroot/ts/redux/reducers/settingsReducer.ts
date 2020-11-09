import { ISettingsState,SettingsAction,typeChangeColor, typeChangeTestNotfy} from '../types'
//--------------------------------------------------------
const initialState: ISettingsState = {
    designSite: {
        colorMenu: "#343a40",//"#f50057",#343a40
        font: {
            type: "",
            color:""
        }
    },
    test: {
        randomMessage: {
            minCountMessage: 3,
            maxCountMessage: 3,
            minDelaySec: 3,
            maxDelaySec:3
        }
    }
}
export function settingsReducer(state = initialState, action: SettingsAction): ISettingsState {
    switch (action.type) {
        case typeChangeTestNotfy:
            return {
                ...state, test: { randomMessage: action.randomMessagesSettings },
            }
        case typeChangeColor: {
            {
                return {
                    ...state, designSite: { ...state.designSite, colorMenu: action.color }
                };
            }
        }
        default:
            return state
    }
}