import { typeChangeColor, typeChangeTestNotfy, SettingsAction} from '../types'
//----------ActionsCreators----------------------------------------------
export const changeTestNotifyAction = (_minCountMessage: number, _maxCountMessage: number, _minDelaySec: number, _maxDelaySec: number): SettingsAction =>
    ({
        type: typeChangeTestNotfy,
        randomMessagesSettings: {
            minCountMessage: _minCountMessage,
            maxCountMessage: _maxCountMessage,
            minDelaySec: _minDelaySec,
            maxDelaySec: _maxDelaySec
        }
    })
//-----------------
export const changeColorAction = (_color: string): SettingsAction => {
    return {
        type: typeChangeColor,
        color: _color
    }
}