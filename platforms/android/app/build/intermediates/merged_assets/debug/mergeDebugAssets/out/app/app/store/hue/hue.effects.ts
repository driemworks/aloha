import { Injectable } from "@angular/core";
import * as fs from "tns-core-modules/file-system";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, from, of, Subscription, pipe } from "rxjs";

import { Action, Store } from "@ngrx/store";
import { switchMap, catchError, map, take, tap, withLatestFrom, filter } from "rxjs/operators";

import { User } from "../../models/user.model";
import { HueService } from "../../services/hue.service";
import { Router } from "@angular/router";
import { GET_ACCESS_TOKEN, GetAccessTokenAction, GetAccessTokenSuccessAction, GET_ACCESS_TOKEN_SUCCESS, UpdateLightStateAction, UPDATE_LIGHT_STATE, UpdateLightStateSuccessAction, GET_LIGHT_STATE, GetLightStateAction, GetLightStateSuccessAction, GET_LIGHT_STATE_SUCCESS } from "./hue.actions";
import { AppState } from "../app.state";
import { getUser } from "../selectors/app.selectors";
import { UpdateUserAction } from "../user/user.actions";


@Injectable()
export class HueEffects {

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private hueService: HueService,
                private router: Router) { }

    @Effect()
    getLights$: Observable<Action> = this.actions$.pipe(
        ofType<GetLightStateAction>(GET_LIGHT_STATE),
        switchMap(action => {
            return this.hueService.getLights(action.bridgeIp, action.username).pipe(map(res => {
                return new GetLightStateSuccessAction(res);
            }));
        })
    );

    // @Effect({dispatch: false})
    // getLightsSuccess$: Observable<Action> = this.actions$.pipe(
    //     ofType<GetLightStateSuccessAction>(GET_LIGHT_STATE_SUCCESS),
    //     switchMap(action => {
    //         this.router.navigate(['/home']);
    //         return of();
    //     })
    // );

    @Effect()
    getToken$: Observable<Action> = this.actions$.pipe(
        ofType<GetAccessTokenAction>(GET_ACCESS_TOKEN),
        switchMap(action => {
            return this.hueService.getAccessToken(action.code).pipe(map(res => {
                console.log('Found access token: ' + JSON.stringify(res));
                return new GetAccessTokenSuccessAction(res['access_token'], res['refresh_token'], action.user);
            }))
        })
    );

    @Effect()
    getTokenSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<GetAccessTokenSuccessAction>(GET_ACCESS_TOKEN_SUCCESS),
        switchMap(action => {
            console.log('Using user: ' + JSON.stringify(action.user));
            let user = action.user;
            user.accessToken = action.accessToken;
            user.refreshToken = action.refreshToken;
            return of(new UpdateUserAction(user));
        })
    )
    
    // @Effect()
    // refreshActionToken$: Observable<Action> = this.actions$.pipe(
    //     ofType<UserActions.RequestRefreshTokenAction>(UserActions.REFRESH_ACCESS_TOKEN),
    //     switchMap(action => {
    //         return of(this.refreshAccessToken(action.refreshToken)).pipe(
    //             map(res => {
    //                 return new UserActions.RequestRefreshTokenSuccessAction(this.user);
    //             })
    //         )
    //     })
    // )
    
    // @Effect()
    // refreshAccessTokenSuccess$: Observable<Action> = this.actions$.pipe(
    //     ofType(UserActions.REFRESH_ACCESS_TOKEN_SUCCESS),
    //     switchMap(action => {
    //         // write new user state to file, then try to turn the lights off again
    //         return of(new UserActions.WriteUserAction('',  this.user)), 
    //                 of(new UserActions.UpdateLightStateAction(this.user, false));
    //     })
    
    // )
    
    @Effect()
    updateLightState$: Observable<Action> = this.actions$.pipe(
        ofType<UpdateLightStateAction>(UPDATE_LIGHT_STATE),
        switchMap(action => {
            return of(this.updateLightState(action.user, action.isWifiConnection)).pipe(map(res => {
                return new GetLightStateAction(action.user.bridgeIpAddress, action.user.username);
            }))
        })
    )
    
    updateLightState(user: User, isWifiConnection: boolean) {
        console.log('Updating light state');
        console.log('wifi status is: ' + isWifiConnection);
        if (isWifiConnection) {
            user.groupStates.forEach(state => {
                this.hueService.setGroupState(user.bridgeIpAddress, user.username, state.groupId, {
                    "scene": state.sceneId
                }, false, false).subscribe(res => {
                    console.log(res);
                });
            });
        } else {
            user.groupStates.forEach(state => {
                this.hueService.setGroupState(user.bridgeIpAddress, user.username, state.groupId, {
                    "on": false
                }, user.accessToken, true).subscribe(res => {
                    console.log(res);
                });
            });
        }
    }
    
    // err => {
        // if (err.status === 401) {
        //         if (user.accessToken != "") {
        //             this.store.dispatch(
        //                 new UserActions.RequestRefreshTokenAction(user.refreshToken));
        //         } else {
        //             this.router.navigate(['/remote-access']);
        //         }
        // }
    // }

    // refreshAccessToken(refreshToken) {
    //     this.refreshSubscription = this.hueService.refreshAccessToken(refreshToken)
    //         .subscribe(res => {
    //             this.user.accessToken = res.access_token;
    //             this.user.refreshToken = res.refresh_token
    //         }, err => {
    //             console.log('Encountered error: ' + JSON.stringify(err))
    //         })
    // }
}