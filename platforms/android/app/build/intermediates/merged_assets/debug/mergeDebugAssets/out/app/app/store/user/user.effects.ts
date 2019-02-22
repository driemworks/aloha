import { Injectable } from "@angular/core";
import * as fs from "tns-core-modules/file-system";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, from, of, Subscription, pipe } from "rxjs";

import { Action, Store } from "@ngrx/store";
import { switchMap, catchError, map, take, tap } from "rxjs/operators";

import { User } from "../../models/user.model";
import { HueService } from "../../services/hue.service";
import { Router } from "@angular/router";
import { UserDataService } from "../../services/database.service";
import { WriteUserAction, WRITE_USER, WriteUserSuccessAction, WriteUserFailedAction, READ_USER, ReadUserAction, ReadUserSuccessAction, ReadUserFailAction, UpdateUserAction, UPDATE_USER, UpdateUserActionSuccess } from "./user.actions";
import { GroupState } from "~/app/models/GroupState.model";
;

@Injectable()
export class UserEffects {

    refreshSubscription: Subscription;
    subscription: Subscription;
	user: User = null;

    constructor(private actions$: Actions,
                private router: Router,
                private userDataService: UserDataService) { }

    mockUser: User = {
        alias: 'Test',
        username: 'c0j6qnxtbYqfcosNx8ccRgfwhPkY6wrlSn0oe-1H',
        bridgeIpAddress: '192.168.1.236',
        groupStates: [
            new GroupState('1', 'O3MwvjfktgOHlRF'),
            new GroupState('2', 'uVYKNKrZfxUQHHt'),
            new GroupState('3', 'X9MZ5qWaoQd8ZrX')
        ],
        accessToken: '',
        refreshToken: '',
        uuid: '2b5c79f227905fbe'
    }

    @Effect()
    writeUser$: Observable<Action> = this.actions$.pipe(
        ofType<WriteUserAction>(WRITE_USER),
        switchMap(action => {
            console.log('Writing user: ' + JSON.stringify(action.user));
            return this.userDataService.writeUser(action.user).pipe(map(res => {
                // this.router.navigate(['/home']);
                return new WriteUserSuccessAction();
            }, err => {
                return new WriteUserFailedAction(err);
            }));
        })
    );

    @Effect()
    readUser$: Observable<Action> = this.actions$.pipe(
        ofType<ReadUserAction>(READ_USER),
        switchMap(action => {
            return this.userDataService.readUser(action.uuid).pipe(map((res: User) => {
                return new ReadUserSuccessAction(res);
            }, err => {
                return new ReadUserFailAction(err);
            }));
        })
    );

    // TODO refactor action name  to SAVE_USER
    @Effect()
    saveUser$: Observable<Action> = this.actions$.pipe(
        ofType<UpdateUserAction>(UPDATE_USER),
        switchMap((action) => {
            return of(this.updateUser(action.user)).pipe(map(() =>  {
                // if we saved succesfully, then update the users state
                // this.router.navigate(['/home']);
                return new ReadUserSuccessAction(action.user);
            }));
        })
    );

   
    updateUser(user: User) {
        this.userDataService.updateUser(user).subscribe(res => {
            return res;
        });
    }
}
