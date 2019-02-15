import { AppState } from "../app.state";
import { UPDATE_LIGHT_STATE_SUCCESS, HueActions, GET_LIGHT_STATE_SUCCESS } from "./hue.actions";

export function hueReducer(state: AppState, action: HueActions): AppState {

    switch(action.type) {
        // case UPDATE_LIGHT_STATE_SUCCESS: {
        //     return { ... state, lightState: action.payload };
        // }
        case GET_LIGHT_STATE_SUCCESS: {
            return { ...state, lightState: action.lightState }
        }
        default: {
            return state;
        }
    }

}