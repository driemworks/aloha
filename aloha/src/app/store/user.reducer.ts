import { Action } from "@ngrx/store";
import { User, initialState } from "../models/user.model";
import { READ_USER, WRITE_USER } from "./actions/user.actions";

import * as UserActions from "./actions/user.actions";

export function userReducer(state: User = initialState, action: UserActions.UserActions) {
    switch (action.type) {
        case READ_USER:
            return Object.assign({}, state, action);
        case WRITE_USER:
            return Object.assign({}, state, action.user);
        default:
            return Object.assign({}, state, action);
    }
}