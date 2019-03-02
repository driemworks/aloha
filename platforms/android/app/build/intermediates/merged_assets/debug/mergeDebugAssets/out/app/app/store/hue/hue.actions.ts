import { Action } from "@ngrx/store";
import { User } from "../../models/user.model";
import { LightState } from "~/app/models/lightstate.model";


export const GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';
export const GET_ACCESS_TOKEN_SUCCESS = 'GET_ACCESS_TOKEN_SUCCESS';
export const GET_ACCESS_TOKEN_FAILED = 'GET_ACCESS_TOKEN_FAILED';

export const REFRESH_ACCESS_TOKEN = 'REFRESH_ACCESS_TOKEN';
export const REFRESH_ACCESS_TOKEN_SUCCESS = 'REFRESH_ACCESS_TOKEN_SUCCESS';
export const REFRESH_ACCESS_TOKEN_FAILED = 'REFRESH_ACCESS_TOKEN_FAILED';

export const UPDATE_LIGHT_STATE  = 'UPDATE_LIGHT_STATE';
export const UPDATE_LIGHT_STATE_SUCCESS  = 'UPDATE_LIGHT_STATE_SUCCESS';

export const GET_LIGHT_STATE = 'GET_LIGHT_STATE';
export const GET_LIGHT_STATE_SUCCESS = 'GET_LIGHT_STATE_SUCCESS';

export class GetLightStateAction implements Action {
    readonly type = GET_LIGHT_STATE;
    constructor(public bridgeIp: String, public username: String) { }
}

export class GetLightStateSuccessAction implements Action {
    readonly type = GET_LIGHT_STATE_SUCCESS;
    constructor(public lightState: LightState[]) { }
}

export class UpdateLightStateAction implements Action {
    readonly type = UPDATE_LIGHT_STATE;
    constructor(public user: User, public isWifiConnection: boolean, public turnOn: boolean) {}
}

export class UpdateLightStateSuccessAction implements Action {
    readonly type = UPDATE_LIGHT_STATE_SUCCESS;
    constructor(public result: string) {}
}

export class RequestRefreshTokenAction implements Action {
    readonly type = REFRESH_ACCESS_TOKEN;
    constructor(public refreshToken: string) { }
}

export class RequestRefreshTokenSuccessAction implements Action {
    readonly type = REFRESH_ACCESS_TOKEN_SUCCESS;
    constructor(public user: User) { }
}

export class GetAccessTokenAction implements Action {
    readonly type = GET_ACCESS_TOKEN;
    constructor(public code: String, public user: User) { }
}

export class GetAccessTokenSuccessAction implements Action {
    readonly type = GET_ACCESS_TOKEN_SUCCESS;
    constructor(public accessToken: String, public refreshToken: String, public user: User) { }
}

export type HueActions = GetAccessTokenAction | GetAccessTokenSuccessAction
                        | RequestRefreshTokenAction | RequestRefreshTokenSuccessAction
                        | UpdateLightStateAction | UpdateLightStateSuccessAction 
                        | GetLightStateAction | GetLightStateSuccessAction;