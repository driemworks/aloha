import { Action } from "@ngrx/store";
import { User } from "../../models/user.model";

export const READ_USER = 'READ_USER';
export const READ_USER_SUCCESS = 'READ_USER_SUCCESS';
export const READ_USER_FAILED = 'READ_USER_FAILED';

export const WRITE_USER = 'WRITE_USER_STATE';
export const WRITE_USER_SUCCESS = 'WRITE_USER_STATE_SUCCESS';
export const WRITE_USER_FAILED = 'WRITE_USER_STATE_FAILED';

export const GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';
export const GET_ACCESS_TOKEN_SUCCESS = 'GET_ACCESS_TOKEN_SUCCESS';
export const GET_ACCESS_TOKEN_FAILED = 'GET_ACCESS_TOKEN_FAILED';

export const UPDATE_USER = 'UPDATE_USER';

export class ReadUserAction implements Action {
    readonly type = READ_USER;
    constructor(private user: User) { }
}

export class ReadUserSuccessAction implements Action {
    readonly type = READ_USER_SUCCESS;
    constructor(private user: User) { }
}

export class ReadUserFailAction implements Action {
    readonly type = READ_USER_FAILED;
    constructor(public error: String) {}
}

export class WriteUserAction implements Action {
    readonly type = WRITE_USER;
    constructor(public user: User) { }
}

export class WriteUserSuccessAction implements Action {
    readonly type = WRITE_USER_SUCCESS;
    constructor(public user: User) { }
}

export class WriteUserFailedAction implements Action {
    readonly type = WRITE_USER_FAILED;
    constructor(public error: String) { }
}

export class UpdateUser implements Action {
    readonly type = UPDATE_USER;
    constructor(public payRead: User) { }
}

export class GetAccessTokenAction implements Action {
    readonly type = GET_ACCESS_TOKEN;
    constructor(public code: String) { }
}

export class GetAccessTokenSuccessAction implements Action {
    readonly type = GET_ACCESS_TOKEN_SUCCESS;
    constructor(public accessToken: String, public refreshToken: String) { }
}

export type UserActions = ReadUserAction | ReadUserSuccessAction | ReadUserFailAction 
                        | WriteUserAction | WriteUserSuccessAction | WriteUserFailedAction 
                        | GetAccessTokenAction | GetAccessTokenSuccessAction;