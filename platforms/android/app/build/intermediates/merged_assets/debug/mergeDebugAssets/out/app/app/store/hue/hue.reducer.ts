import { AppState } from "../app.state";
import { UPDATE_LIGHT_STATE_SUCCESS, HueActions, GET_LIGHT_STATE_SUCCESS } from "./hue.actions";

export function hueReducer(state: AppState, action: HueActions): AppState {

    switch(action.type) {
        default: {
            return state;
        }
    }

}