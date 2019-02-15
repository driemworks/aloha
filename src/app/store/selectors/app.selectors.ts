import { AppState } from "../app.state";
import { createSelector } from "@ngrx/store";


export const selectUserState = (state: AppState) => state.user;

export const getUser = createSelector(
    selectUserState,
    user => user
);