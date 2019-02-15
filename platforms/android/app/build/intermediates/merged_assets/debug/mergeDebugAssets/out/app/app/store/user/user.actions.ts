import { Action } from "@ngrx/store";
import { User } from "../../models/user.model";

export const READ_USER = 'READ_USER';
export const READ_USER_SUCCESS = 'READ_USER_SUCCESS';
export const READ_USER_FAILED = 'READ_USER_FAILED';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const WRITE_USER = 'WRITE_USER_STATE';
export const WRITE_USER_SUCCESS = 'WRITE_USER_STATE_SUCCESS';
export const WRITE_USER_FAILED = 'WRITE_USER_STATE_FAILED';

export class UpdateUserAction implements Action {
    readonly type = UPDATE_USER;
    constructor(public user: User) {}
}

export class UpdateUserActionSuccess implements Action {
    readonly type = UPDATE_USER_SUCCESS;
    constructor(public user: User) { }
}

export class UpdateUserActionFailed implements Action {
    readonly type = UPDATE_USER_FAILED;
    constructor() { }
}

export class ReadUserAction implements Action {
    readonly type = READ_USER;
    constructor(public uuid: string) { }
}

export class ReadUserSuccessAction implements Action {
    readonly type = READ_USER_SUCCESS;
    constructor(public user: User) { }
}

export class ReadUserFailAction implements Action {
    readonly type = READ_USER_FAILED;
    constructor(public error: String) {}
}

export class WriteUserAction implements Action {
    readonly type = WRITE_USER;
    constructor(public uuid: string, public user: User) { }
}

export class WriteUserSuccessAction implements Action {
    readonly type = WRITE_USER_SUCCESS;
    constructor() { }
}

export class WriteUserFailedAction implements Action {
    readonly type = WRITE_USER_FAILED;
    constructor(public error: String) { }
}


export type UserActions = ReadUserAction | ReadUserSuccessAction | ReadUserFailAction 
                        | WriteUserAction | WriteUserSuccessAction | WriteUserFailedAction 
                        |UpdateUserAction | UpdateUserActionSuccess | UpdateUserActionFailed;