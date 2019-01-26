import { Injectable } from "@angular/core";
import * as fs from "tns-core-modules/file-system";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, from, of, Subscription, pipe } from "rxjs";

import { Action, Store } from "@ngrx/store";
import { READ_USER, WRITE_USER } from "./actions/user.actions";
import { switchMap, catchError, map, take, tap } from "rxjs/operators";

import * as UserActions from "./actions/user.actions";
import { FileService } from "../services/file.service";
import { User } from "../models/user.model";
import { GroupState } from "../models/GroupState.model";
import { HueService } from "../services/hue.service";
import { Router } from "@angular/router";

@Injectable()
export class UserEffects {

    subscription: Subscription;
	user: User = null;

    constructor(private actions$: Actions,
                private hueService: HueService,
                private _store: Store<User>,
                private router: Router) {
        this.subscription = this._store.select('user').subscribe(user => {
            this.user = user;
        });
    }

    initialState: User = {
        bridgeIpAddress: "",
        username: "",
        groupStates: [
            new GroupState("1", "O3MwvjfktgOHlRF"),
            new GroupState("2", "X9MZ5qWaoQd8ZrX"),
            new GroupState("3", "uVYKNKrZfxUQHHt")
        ],
        accessToken: "",
        refreshToken: ""
    };
            
    tonyInitialState: User = {
        bridgeIpAddress: "192.168.1.236",
        username: "dOBMZLQEqwc08ab2saX8UT60qBv6vRPHTWi-2wi1",
        groupStates: [
            new GroupState("1", "O3MwvjfktgOHlRF"),
            new GroupState("2", "X9MZ5qWaoQd8ZrX"),
            new GroupState("3", "uVYKNKrZfxUQHHt")
        ],
        accessToken: "",
        refreshToken: ""
    };

    /**
     * Write the application state to the device file system
     * @type {Observable<Action>}
     * @memberof UserEffects
     */
    @Effect()
    writeUser$: Observable<Action> = this.actions$.pipe(
        ofType<UserActions.WriteUserAction>(WRITE_USER),
        switchMap(action => {
            console.log('WRITING USER ' + JSON.stringify(action.user));
            let documents = fs.knownFolders.documents();
            let folder = documents.getFolder("aloha-appdata");
            let file = folder.getFile("user-data.json");

            return from(file.writeText(JSON.stringify(action.user))).pipe(
                map(res => {
                    return new UserActions.WriteUserSuccessAction(res);
                }, err => {
                    return new UserActions.WriteUserFailedAction(err);
                })
            )
        })
    );

    /**
     * Read the saved application state from the device
     * @type {Observable<Action>}
     * @memberof UserEffects
     */
    @Effect()
    readUser$: Observable<Action> = this.actions$.pipe(
        ofType(READ_USER),
        switchMap(() => {
            let documents = fs.knownFolders.documents();
            let folder = documents.getFolder("aloha-appdata");
            let file = folder.getFile("user-data.json");
            return from(file.readText()).pipe(
                map(res => {
                    console.log("Reading user: " + JSON.stringify(res));
                    return new UserActions.ReadUserSuccessAction(JSON.parse(res));
                }, err => {
                    return new UserActions.ReadUserFailAction(err);
                })
            )
        })
    );

    @Effect()
    getToken$: Observable<Action> = this.actions$.pipe(
        ofType<UserActions.GetAccessTokenAction>(UserActions.GET_ACCESS_TOKEN),
        switchMap(action => {
            console.log('Getting access token using code: ' + action.code);
            return of (this.getAccessToken(action.code)).pipe(
                map(res => {
                    this.router.navigate(['/home']);
                    return new UserActions.WriteUserAction(this.user);
                }))
        })
    );

    getAccessToken(code) {
        this.subscription = this.hueService.getAccessToken(code)   
            .subscribe(res => {
				console.log('Response: ' + JSON.stringify(res));
				let accessToken = res.access_token;
				let refreshToken = res.refresh_token;
				console.log('Found tokens: ' + accessToken + ', ' + refreshToken);
				this.user.accessToken = accessToken;
				this.user.refreshToken = refreshToken;
                console.log('User: ' + JSON.stringify(this.user));
            }, err => {
				console.log('Encountered error: ' + JSON.stringify(err))
			});
    }
}
