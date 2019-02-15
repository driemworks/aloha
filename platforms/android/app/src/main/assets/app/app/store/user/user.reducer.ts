import { UserActions, READ_USER_SUCCESS, UPDATE_USER_SUCCESS } from "./user.actions";
import { AppState } from "../app.state";


export function userReducer(state: AppState, action: UserActions): AppState {
    switch (action.type) {
        case READ_USER_SUCCESS:
            return { ...state, user: action.user }
        case UPDATE_USER_SUCCESS:
            return { ...state, user: action.user }
        default:
            return state;
    }
}