import { User } from "../models/user.model";
import { getSourceForInstance } from "@ngrx/effects/src/effects_metadata";
import { userReducer } from "./user/user.reducer";
import { LightState } from "../models/lightstate.model";

export interface AppState {
    user: User;
    // lightState: LightState[];
}