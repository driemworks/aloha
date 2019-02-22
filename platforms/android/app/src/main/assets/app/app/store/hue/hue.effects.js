"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var rxjs_1 = require("rxjs");
var store_1 = require("@ngrx/store");
var operators_1 = require("rxjs/operators");
var hue_service_1 = require("../../services/hue.service");
var router_1 = require("@angular/router");
var hue_actions_1 = require("./hue.actions");
var user_actions_1 = require("../user/user.actions");
var HueEffects = /** @class */ (function () {
    function HueEffects(actions$, store, hueService, router) {
        var _this = this;
        this.actions$ = actions$;
        this.store = store;
        this.hueService = hueService;
        this.router = router;
        this.getLights$ = this.actions$.pipe(effects_1.ofType(hue_actions_1.GET_LIGHT_STATE), operators_1.switchMap(function (action) {
            return _this.hueService.getLights(action.bridgeIp, action.username).pipe(operators_1.map(function (res) {
                return new hue_actions_1.GetLightStateSuccessAction(res);
            }));
        }));
        // @Effect({dispatch: false})
        // getLightsSuccess$: Observable<Action> = this.actions$.pipe(
        //     ofType<GetLightStateSuccessAction>(GET_LIGHT_STATE_SUCCESS),
        //     switchMap(action => {
        //         this.router.navigate(['/home']);
        //         return of();
        //     })
        // );
        this.getToken$ = this.actions$.pipe(effects_1.ofType(hue_actions_1.GET_ACCESS_TOKEN), operators_1.switchMap(function (action) {
            return _this.hueService.getAccessToken(action.code).pipe(operators_1.map(function (res) {
                console.log('Found access token: ' + JSON.stringify(res));
                return new hue_actions_1.GetAccessTokenSuccessAction(res['access_token'], res['refresh_token'], action.user);
            }));
        }));
        this.getTokenSuccess$ = this.actions$.pipe(effects_1.ofType(hue_actions_1.GET_ACCESS_TOKEN_SUCCESS), operators_1.switchMap(function (action) {
            console.log('Using user: ' + JSON.stringify(action.user));
            var user = action.user;
            user.accessToken = action.accessToken;
            user.refreshToken = action.refreshToken;
            return rxjs_1.of(new user_actions_1.UpdateUserAction(user));
        }));
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
        this.updateLightState$ = this.actions$.pipe(effects_1.ofType(hue_actions_1.UPDATE_LIGHT_STATE), operators_1.switchMap(function (action) {
            return rxjs_1.of(_this.updateLightState(action.user, action.isWifiConnection, action.turnOn)).pipe(operators_1.map(function (res) {
                return new hue_actions_1.GetLightStateAction(action.user.bridgeIpAddress, action.user.username);
            }));
        }));
    }
    HueEffects.prototype.updateLightState = function (user, isWifiConnection, turnOn) {
        var _this = this;
        console.log('Updating light state');
        console.log('wifi status is: ' + isWifiConnection);
        if (isWifiConnection) {
            if (turnOn) {
                user.groupStates.forEach(function (state) {
                    _this.hueService.setGroupState(user.bridgeIpAddress, user.username, state.groupId, {
                        "scene": state.sceneId
                    }, false, false).subscribe(function (res) {
                        console.log(res);
                    });
                });
            }
            else {
                this.turnOffLights(user, true);
            }
        }
        else {
            this.turnOffLights(user, false);
        }
    };
    HueEffects.prototype.turnOffLights = function (user, isLocal) {
        var _this = this;
        user.groupStates.forEach(function (state) {
            _this.hueService.setGroupState(user.bridgeIpAddress, user.username, state.groupId, {
                "on": false
            }, user.accessToken, !isLocal).subscribe(function (res) {
                console.log(res);
            });
        });
    };
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", rxjs_1.Observable)
    ], HueEffects.prototype, "getLights$", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", rxjs_1.Observable)
    ], HueEffects.prototype, "getToken$", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", rxjs_1.Observable)
    ], HueEffects.prototype, "getTokenSuccess$", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", rxjs_1.Observable)
    ], HueEffects.prototype, "updateLightState$", void 0);
    HueEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions,
            store_1.Store,
            hue_service_1.HueService,
            router_1.Router])
    ], HueEffects);
    return HueEffects;
}());
exports.HueEffects = HueEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVlLmVmZmVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodWUuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyx5Q0FBd0Q7QUFDeEQsNkJBQWdFO0FBRWhFLHFDQUE0QztBQUM1Qyw0Q0FBK0Y7QUFHL0YsMERBQXdEO0FBQ3hELDBDQUF5QztBQUN6Qyw2Q0FBb1M7QUFHcFMscURBQXdEO0FBSXhEO0lBRUksb0JBQW9CLFFBQWlCLEVBQ2pCLEtBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLE1BQWM7UUFIbEMsaUJBR3VDO1FBSG5CLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBR2xDLGVBQVUsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQy9DLGdCQUFNLENBQXNCLDZCQUFlLENBQUMsRUFDNUMscUJBQVMsQ0FBQyxVQUFBLE1BQU07WUFDWixPQUFPLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFHLENBQUMsVUFBQSxHQUFHO2dCQUMzRSxPQUFPLElBQUksd0NBQTBCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUNMLENBQUM7UUFFRiw2QkFBNkI7UUFDN0IsOERBQThEO1FBQzlELG1FQUFtRTtRQUNuRSw0QkFBNEI7UUFDNUIsMkNBQTJDO1FBQzNDLHVCQUF1QjtRQUN2QixTQUFTO1FBQ1QsS0FBSztRQUdMLGNBQVMsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQzlDLGdCQUFNLENBQXVCLDhCQUFnQixDQUFDLEVBQzlDLHFCQUFTLENBQUMsVUFBQSxN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QXBJWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgeyBFZmZlY3QsIEFjdGlvbnMsIG9mVHlwZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tLCBvZiwgU3Vic2NyaXB0aW9uLCBwaXBlIH0gZnJvbSBcInJ4anNcIjtcclxuXHJcbmltcG9ydCB7IEFjdGlvbiwgU3RvcmUgfSBmcm9tIFwiQG5ncngvc3RvcmVcIjtcclxuaW1wb3J0IHsgc3dpdGNoTWFwLCBjYXRjaEVycm9yLCBtYXAsIHRha2UsIHRhcCwgd2l0aExhdGVzdEZyb20sIGZpbHRlciB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5cclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdXNlci5tb2RlbFwiO1xyXG5pbXBvcnQgeyBIdWVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2h1ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgR0VUX0FDQ0VTU19UT0tFTiwgR2V0QWNjZXNzVG9rZW5BY3Rpb24sIEdldEFjY2Vzc1Rva2VuU3VjY2Vzc0FjdGlvbiwgR0VUX0FDQ0VTU19UT0tFTl9TVUNDRVNTLCBVcGRhdGVMaWdodFN0YXRlQWN0aW9uLCBVUERBVEVfTElHSFRfU1RBVEUsIFVwZGF0ZUxpZ2h0U3RhdGVTdWNjZXNzQWN0aW9uLCBHRVRfTElHSFRfU1RBVEUsIEdldExpZ2h0U3RhdGVBY3Rpb24sIEdldExpZ2h0U3RhdGVTdWNjZXNzQWN0aW9uLCBHRVRfTElHSFRfU1RBVEVfU1VDQ0VTUyB9IGZyb20gXCIuL2h1ZS5hY3Rpb25zXCI7XHJcbmltcG9ydCB7IEFwcFN0YXRlIH0gZnJvbSBcIi4uL2FwcC5zdGF0ZVwiO1xyXG5pbXBvcnQgeyBnZXRVc2VyIH0gZnJvbSBcIi4uL3NlbGVjdG9ycy9hcHAuc2VsZWN0b3JzXCI7XHJcbmltcG9ydCB7IFVwZGF0ZVVzZXJBY3Rpb24gfSBmcm9tIFwiLi4vdXNlci91c2VyLmFjdGlvbnNcIjtcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIdWVFZmZlY3RzIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGlvbnMkOiBBY3Rpb25zLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8QXBwU3RhdGU+LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBodWVTZXJ2aWNlOiBIdWVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikgeyB9XHJcblxyXG4gICAgQEVmZmVjdCgpXHJcbiAgICBnZXRMaWdodHMkOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMkLnBpcGUoXHJcbiAgICAgICAgb2ZUeXBlPEdldExpZ2h0U3RhdGVBY3Rpb24+KEdFVF9MSUdIVF9TVEFURSksXHJcbiAgICAgICAgc3dpdGNoTWFwKGFjdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh1ZVNlcnZpY2UuZ2V0TGlnaHRzKGFjdGlvbi5icmlkZ2VJcCwgYWN0aW9uLnVzZXJuYW1lKS5waXBlKG1hcChyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHZXRMaWdodFN0YXRlU3VjY2Vzc0FjdGlvbihyZXMpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgLy8gQEVmZmVjdCh7ZGlzcGF0Y2g6IGZhbHNlfSlcclxuICAgIC8vIGdldExpZ2h0c1N1Y2Nlc3MkOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMkLnBpcGUoXHJcbiAgICAvLyAgICAgb2ZUeXBlPEdldExpZ2h0U3RhdGVTdWNjZXNzQWN0aW9uPihHRVRfTElHSFRfU1RBVEVfU1VDQ0VTUyksXHJcbiAgICAvLyAgICAgc3dpdGNoTWFwKGFjdGlvbiA9PiB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2hvbWUnXSk7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiBvZigpO1xyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyApO1xyXG5cclxuICAgIEBFZmZlY3QoKVxyXG4gICAgZ2V0VG9rZW4kOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMkLnBpcGUoXHJcbiAgICAgICAgb2ZUeXBlPEdldEFjY2Vzc1Rva2VuQWN0aW9uPihHRVRfQUNDRVNTX1RPS0VOKSxcclxuICAgICAgICBzd2l0Y2hNYXAoYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHVlU2VydmljZS5nZXRBY2Nlc3NUb2tlbihhY3Rpb24uY29kZSkucGlwZShtYXAocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGb3VuZCBhY2Nlc3MgdG9rZW46ICcgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgR2V0QWNjZXNzVG9rZW5TdWNjZXNzQWN0aW9uKHJlc1snYWNjZXNzX3Rva2VuJ10sIHJlc1sncmVmcmVzaF90b2tlbiddLCBhY3Rpb24udXNlcik7XHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIEBFZmZlY3QoKVxyXG4gICAgZ2V0VG9rZW5TdWNjZXNzJDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zJC5waXBlKFxyXG4gICAgICAgIG9mVHlwZTxHZXRBY2Nlc3NUb2tlblN1Y2Nlc3NBY3Rpb24+KEdFVF9BQ0NFU1NfVE9LRU5fU1VDQ0VTUyksXHJcbiAgICAgICAgc3dpdGNoTWFwKGFjdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVc2luZyB1c2VyOiAnICsgSlNPTi5zdHJpbmdpZnkoYWN0aW9uLnVzZXIpKTtcclxuICAgICAgICAgICAgbGV0IHVzZXIgPSBhY3Rpb24udXNlcjtcclxuICAgICAgICAgICAgdXNlci5hY2Nlc3NUb2tlbiA9IGFjdGlvbi5hY2Nlc3NUb2tlbjtcclxuICAgICAgICAgICAgdXNlci5yZWZyZXNoVG9rZW4gPSBhY3Rpb24ucmVmcmVzaFRva2VuO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YobmV3IFVwZGF0ZVVzZXJBY3Rpb24odXNlcikpO1xyXG4gICAgICAgIH0pXHJcbiAgICApXHJcbiAgICBcclxuICAgIC8vIEBFZmZlY3QoKVxyXG4gICAgLy8gcmVmcmVzaEFjdGlvblRva2VuJDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zJC5waXBlKFxyXG4gICAgLy8gICAgIG9mVHlwZTxVc2VyQWN0aW9ucy5SZXF1ZXN0UmVmcmVzaFRva2VuQWN0aW9uPihVc2VyQWN0aW9ucy5SRUZSRVNIX0FDQ0VTU19UT0tFTiksXHJcbiAgICAvLyAgICAgc3dpdGNoTWFwKGFjdGlvbiA9PiB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiBvZih0aGlzLnJlZnJlc2hBY2Nlc3NUb2tlbihhY3Rpb24ucmVmcmVzaFRva2VuKSkucGlwZShcclxuICAgIC8vICAgICAgICAgICAgIG1hcChyZXMgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVXNlckFjdGlvbnMuUmVxdWVzdFJlZnJlc2hUb2tlblN1Y2Nlc3NBY3Rpb24odGhpcy51c2VyKTtcclxuICAgIC8vICAgICAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgIClcclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gKVxyXG4gICAgXHJcbiAgICAvLyBARWZmZWN0KClcclxuICAgIC8vIHJlZnJlc2hBY2Nlc3NUb2tlblN1Y2Nlc3MkOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMkLnBpcGUoXHJcbiAgICAvLyAgICAgb2ZUeXBlKFVzZXJBY3Rpb25zLlJFRlJFU0hfQUNDRVNTX1RPS0VOX1NVQ0NFU1MpLFxyXG4gICAgLy8gICAgIHN3aXRjaE1hcChhY3Rpb24gPT4ge1xyXG4gICAgLy8gICAgICAgICAvLyB3cml0ZSBuZXcgdXNlciBzdGF0ZSB0byBmaWxlLCB0aGVuIHRyeSB0byB0dXJuIHRoZSBsaWdodHMgb2ZmIGFnYWluXHJcbiAgICAvLyAgICAgICAgIHJldHVybiBvZihuZXcgVXNlckFjdGlvbnMuV3JpdGVVc2VyQWN0aW9uKCcnLCAgdGhpcy51c2VyKSksIFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIG9mKG5ldyBVc2VyQWN0aW9ucy5VcGRhdGVMaWdodFN0YXRlQWN0aW9uKHRoaXMudXNlciwgZmFsc2UpKTtcclxuICAgIC8vICAgICB9KVxyXG4gICAgXHJcbiAgICAvLyApXHJcbiAgICBcclxuICAgIEBFZmZlY3QoKVxyXG4gICAgdXBkYXRlTGlnaHRTdGF0ZSQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucyQucGlwZShcclxuICAgICAgICBvZlR5cGU8VXBkYXRlTGlnaHRTdGF0ZUFjdGlvbj4oVVBEQVRFX0xJR0hUX1NUQVRFKSxcclxuICAgICAgICBzd2l0Y2hNYXAoYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMudXBkYXRlTGlnaHRTdGF0ZShhY3Rpb24udXNlciwgYWN0aW9uLmlzV2lmaUNvbm5lY3Rpb24sIGFjdGlvbi50dXJuT24pKS5waXBlKG1hcChyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHZXRMaWdodFN0YXRlQWN0aW9uKGFjdGlvbi51c2VyLmJyaWRnZUlwQWRkcmVzcywgYWN0aW9uLnVzZXIudXNlcm5hbWUpO1xyXG4gICAgICAgICAgICB9KSlcclxuICAgICAgICB9KVxyXG4gICAgKVxyXG4gICAgXHJcbiAgICB1cGRhdGVMaWdodFN0YXRlKHVzZXI6IFVzZXIsIGlzV2lmaUNvbm5lY3Rpb246IGJvb2xlYW4sIHR1cm5PbjogYm9vbGVhbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdVcGRhdGluZyBsaWdodCBzdGF0ZScpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd3aWZpIHN0YXR1cyBpczogJyArIGlzV2lmaUNvbm5lY3Rpb24pO1xyXG4gICAgICAgIGlmIChpc1dpZmlDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0dXJuT24pIHtcclxuICAgICAgICAgICAgICAgIHVzZXIuZ3JvdXBTdGF0ZXMuZm9yRWFjaChzdGF0ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5odWVTZXJ2aWNlLnNldEdyb3VwU3RhdGUodXNlci5icmlkZ2VJcEFkZHJlc3MsIHVzZXIudXNlcm5hbWUsIHN0YXRlLmdyb3VwSWQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzY2VuZVwiOiBzdGF0ZS5zY2VuZUlkXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZmFsc2UsIGZhbHNlKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50dXJuT2ZmTGlnaHRzKHVzZXIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50dXJuT2ZmTGlnaHRzKHVzZXIsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdHVybk9mZkxpZ2h0cyh1c2VyOiBVc2VyLCBpc0xvY2FsOiBib29sZWFuKSB7XHJcbiAgICAgICAgdXNlci5ncm91cFN0YXRlcy5mb3JFYWNoKHN0YXRlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5odWVTZXJ2aWNlLnNldEdyb3VwU3RhdGUodXNlci5icmlkZ2VJcEFkZHJlc3MsIHVzZXIudXNlcm5hbWUsIHN0YXRlLmdyb3VwSWQsIHtcclxuICAgICAgICAgICAgICAgIFwib25cIjogZmFsc2VcclxuICAgICAgICAgICAgfSwgdXNlci5hY2Nlc3NUb2tlbiwgIWlzTG9jYWwpLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIGVyciA9PiB7XHJcbiAgICAgICAgLy8gaWYgKGVyci5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgIC8vICAgICAgICAgaWYgKHVzZXIuYWNjZXNzVG9rZW4gIT0gXCJcIikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIG5ldyBVc2VyQWN0aW9ucy5SZXF1ZXN0UmVmcmVzaFRva2VuQWN0aW9uKHVzZXIucmVmcmVzaFRva2VuKSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3JlbW90ZS1hY2Nlc3MnXSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHJlZnJlc2hBY2Nlc3NUb2tlbihyZWZyZXNoVG9rZW4pIHtcclxuICAgIC8vICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24gPSB0aGlzLmh1ZVNlcnZpY2UucmVmcmVzaEFjY2Vzc1Rva2VuKHJlZnJlc2hUb2tlbilcclxuICAgIC8vICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy51c2VyLmFjY2Vzc1Rva2VuID0gcmVzLmFjY2Vzc190b2tlbjtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMudXNlci5yZWZyZXNoVG9rZW4gPSByZXMucmVmcmVzaF90b2tlblxyXG4gICAgLy8gICAgICAgICB9LCBlcnIgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ0VuY291bnRlcmVkIGVycm9yOiAnICsgSlNPTi5zdHJpbmdpZnkoZXJyKSlcclxuICAgIC8vICAgICAgICAgfSlcclxuICAgIC8vIH1cclxufSJdfQ==