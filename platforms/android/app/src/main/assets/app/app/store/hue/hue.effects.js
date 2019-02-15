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
            return rxjs_1.of(_this.updateLightState(action.user, action.isWifiConnection)).pipe(operators_1.map(function (res) {
                return new hue_actions_1.GetLightStateAction(action.user.bridgeIpAddress, action.user.username);
            }));
        }));
    }
    HueEffects.prototype.updateLightState = function (user, isWifiConnection) {
        var _this = this;
        console.log('Updating light state');
        console.log('wifi status is: ' + isWifiConnection);
        if (isWifiConnection) {
            user.groupStates.forEach(function (state) {
                _this.hueService.setGroupState(user.bridgeIpAddress, user.username, state.groupId, {
                    "scene": state.sceneId
                }, false, false).subscribe(function (res) {
                    console.log(res);
                });
            });
        }
        else {
            user.groupStates.forEach(function (state) {
                _this.hueService.setGroupState(user.bridgeIpAddress, user.username, state.groupId, {
                    "on": false
                }, user.accessToken, true).subscribe(function (res) {
                    console.log(res);
                });
            });
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVlLmVmZmVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodWUuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyx5Q0FBd0Q7QUFDeEQsNkJBQWdFO0FBRWhFLHFDQUE0QztBQUM1Qyw0Q0FBK0Y7QUFHL0YsMERBQXdEO0FBQ3hELDBDQUF5QztBQUN6Qyw2Q0FBb1M7QUFHcFMscURBQXdEO0FBSXhEO0lBRUksb0JBQW9CLFFBQWlCLEVBQ2pCLEtBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLE1BQWM7UUFIbEMsaUJBR3VDO1FBSG5CLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBR2xDLGVBQVUsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQy9DLGdCQUFNLENBQXNCLDZCQUFlLENBQUMsRUFDNUMscUJBQVMsQ0FBQyxVQUFBLE1BQU07WUFDWixPQUFPLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFHLENBQUMsVUFBQSxHQUFHO2dCQUMzRSxPQUFPLElBQUksd0NBQTBCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUNMLENBQUM7UUFFRiw2QkFBNkI7UUFDN0IsOERBQThEO1FBQzlELG1FQUFtRTtRQUNuRSw0QkFBNEI7UUFDNUIsMkNBQTJDO1FBQzNDLHVCQUF1QjtRQUN2QixTQUFTO1FBQ1QsS0FBSztRQUdMLGNBQVMsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQzlDLGdCQUFNLENBQXVCLDhCQUFnQixDQUFDLEVBQzlDLHFCQUFTLENBQUMsVUFBQSxN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LENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO2dCQUMxQixLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRTtvQkFDOUUsSUFBSSxFQUFFLEtBQUs7aUJBQ2QsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7b0JBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUE5RkQ7UUFEQyxnQkFBTSxFQUFFO2tDQUNHLGlCQUFVO2tEQU9wQjtJQVlGO1FBREMsZ0JBQU0sRUFBRTtrQ0FDRSxpQkFBVTtpREFRbkI7SUFHRjtRQURDLGdCQUFNLEVBQUU7a0NBQ1MsaUJBQVU7d0RBUzNCO0lBMEJEO1FBREMsZ0JBQU0sRUFBRTtrQ0FDVSxpQkFBVTt5REFPNUI7SUFoRlEsVUFBVTtRQUR0QixpQkFBVSxFQUFFO3lDQUdxQixpQkFBTztZQUNWLGFBQUs7WUFDQSx3QkFBVTtZQUNkLGVBQU07T0FMekIsVUFBVSxDQTRIdEI7SUFBRCxpQkFBQztDQUFBLEFBNUhELElBNEhDO0FBNUhZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCB7IEVmZmVjdCwgQWN0aW9ucywgb2ZUeXBlIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIGZyb20sIG9mLCBTdWJzY3JpcHRpb24sIHBpcGUgfSBmcm9tIFwicnhqc1wiO1xyXG5cclxuaW1wb3J0IHsgQWN0aW9uLCBTdG9yZSB9IGZyb20gXCJAbmdyeC9zdG9yZVwiO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAsIGNhdGNoRXJyb3IsIG1hcCwgdGFrZSwgdGFwLCB3aXRoTGF0ZXN0RnJvbSwgZmlsdGVyIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XHJcblxyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy91c2VyLm1vZGVsXCI7XHJcbmltcG9ydCB7IEh1ZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaHVlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBHRVRfQUNDRVNTX1RPS0VOLCBHZXRBY2Nlc3NUb2tlbkFjdGlvbiwgR2V0QWNjZXNzVG9rZW5TdWNjZXNzQWN0aW9uLCBHRVRfQUNDRVNTX1RPS0VOX1NVQ0NFU1MsIFVwZGF0ZUxpZ2h0U3RhdGVBY3Rpb24sIFVQREFURV9MSUdIVF9TVEFURSwgVXBkYXRlTGlnaHRTdGF0ZVN1Y2Nlc3NBY3Rpb24sIEdFVF9MSUdIVF9TVEFURSwgR2V0TGlnaHRTdGF0ZUFjdGlvbiwgR2V0TGlnaHRTdGF0ZVN1Y2Nlc3NBY3Rpb24sIEdFVF9MSUdIVF9TVEFURV9TVUNDRVNTIH0gZnJvbSBcIi4vaHVlLmFjdGlvbnNcIjtcclxuaW1wb3J0IHsgQXBwU3RhdGUgfSBmcm9tIFwiLi4vYXBwLnN0YXRlXCI7XHJcbmltcG9ydCB7IGdldFVzZXIgfSBmcm9tIFwiLi4vc2VsZWN0b3JzL2FwcC5zZWxlY3RvcnNcIjtcclxuaW1wb3J0IHsgVXBkYXRlVXNlckFjdGlvbiB9IGZyb20gXCIuLi91c2VyL3VzZXIuYWN0aW9uc1wiO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh1ZUVmZmVjdHMge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYWN0aW9ucyQ6IEFjdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHN0b3JlOiBTdG9yZTxBcHBTdGF0ZT4sXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGh1ZVNlcnZpY2U6IEh1ZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cclxuXHJcbiAgICBARWZmZWN0KClcclxuICAgIGdldExpZ2h0cyQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucyQucGlwZShcclxuICAgICAgICBvZlR5cGU8R2V0TGlnaHRTdGF0ZUFjdGlvbj4oR0VUX0xJR0hUX1NUQVRFKSxcclxuICAgICAgICBzd2l0Y2hNYXAoYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHVlU2VydmljZS5nZXRMaWdodHMoYWN0aW9uLmJyaWRnZUlwLCBhY3Rpb24udXNlcm5hbWUpLnBpcGUobWFwKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEdldExpZ2h0U3RhdGVTdWNjZXNzQWN0aW9uKHJlcyk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBARWZmZWN0KHtkaXNwYXRjaDogZmFsc2V9KVxyXG4gICAgLy8gZ2V0TGlnaHRzU3VjY2VzcyQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucyQucGlwZShcclxuICAgIC8vICAgICBvZlR5cGU8R2V0TGlnaHRTdGF0ZVN1Y2Nlc3NBY3Rpb24+KEdFVF9MSUdIVF9TVEFURV9TVUNDRVNTKSxcclxuICAgIC8vICAgICBzd2l0Y2hNYXAoYWN0aW9uID0+IHtcclxuICAgIC8vICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvaG9tZSddKTtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIG9mKCk7XHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vICk7XHJcblxyXG4gICAgQEVmZmVjdCgpXHJcbiAgICBnZXRUb2tlbiQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucyQucGlwZShcclxuICAgICAgICBvZlR5cGU8R2V0QWNjZXNzVG9rZW5BY3Rpb24+KEdFVF9BQ0NFU1NfVE9LRU4pLFxyXG4gICAgICAgIHN3aXRjaE1hcChhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odWVTZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKGFjdGlvbi5jb2RlKS5waXBlKG1hcChyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0ZvdW5kIGFjY2VzcyB0b2tlbjogJyArIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHZXRBY2Nlc3NUb2tlblN1Y2Nlc3NBY3Rpb24ocmVzWydhY2Nlc3NfdG9rZW4nXSwgcmVzWydyZWZyZXNoX3Rva2VuJ10sIGFjdGlvbi51c2VyKTtcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgQEVmZmVjdCgpXHJcbiAgICBnZXRUb2tlblN1Y2Nlc3MkOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMkLnBpcGUoXHJcbiAgICAgICAgb2ZUeXBlPEdldEFjY2Vzc1Rva2VuU3VjY2Vzc0FjdGlvbj4oR0VUX0FDQ0VTU19UT0tFTl9TVUNDRVNTKSxcclxuICAgICAgICBzd2l0Y2hNYXAoYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1VzaW5nIHVzZXI6ICcgKyBKU09OLnN0cmluZ2lmeShhY3Rpb24udXNlcikpO1xyXG4gICAgICAgICAgICBsZXQgdXNlciA9IGFjdGlvbi51c2VyO1xyXG4gICAgICAgICAgICB1c2VyLmFjY2Vzc1Rva2VuID0gYWN0aW9uLmFjY2Vzc1Rva2VuO1xyXG4gICAgICAgICAgICB1c2VyLnJlZnJlc2hUb2tlbiA9IGFjdGlvbi5yZWZyZXNoVG9rZW47XHJcbiAgICAgICAgICAgIHJldHVybiBvZihuZXcgVXBkYXRlVXNlckFjdGlvbih1c2VyKSk7XHJcbiAgICAgICAgfSlcclxuICAgIClcclxuICAgIFxyXG4gICAgLy8gQEVmZmVjdCgpXHJcbiAgICAvLyByZWZyZXNoQWN0aW9uVG9rZW4kOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMkLnBpcGUoXHJcbiAgICAvLyAgICAgb2ZUeXBlPFVzZXJBY3Rpb25zLlJlcXVlc3RSZWZyZXNoVG9rZW5BY3Rpb24+KFVzZXJBY3Rpb25zLlJFRlJFU0hfQUNDRVNTX1RPS0VOKSxcclxuICAgIC8vICAgICBzd2l0Y2hNYXAoYWN0aW9uID0+IHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIG9mKHRoaXMucmVmcmVzaEFjY2Vzc1Rva2VuKGFjdGlvbi5yZWZyZXNoVG9rZW4pKS5waXBlKFxyXG4gICAgLy8gICAgICAgICAgICAgbWFwKHJlcyA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVc2VyQWN0aW9ucy5SZXF1ZXN0UmVmcmVzaFRva2VuU3VjY2Vzc0FjdGlvbih0aGlzLnVzZXIpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSlcclxuICAgIC8vICAgICAgICAgKVxyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyApXHJcbiAgICBcclxuICAgIC8vIEBFZmZlY3QoKVxyXG4gICAgLy8gcmVmcmVzaEFjY2Vzc1Rva2VuU3VjY2VzcyQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucyQucGlwZShcclxuICAgIC8vICAgICBvZlR5cGUoVXNlckFjdGlvbnMuUkVGUkVTSF9BQ0NFU1NfVE9LRU5fU1VDQ0VTUyksXHJcbiAgICAvLyAgICAgc3dpdGNoTWFwKGFjdGlvbiA9PiB7XHJcbiAgICAvLyAgICAgICAgIC8vIHdyaXRlIG5ldyB1c2VyIHN0YXRlIHRvIGZpbGUsIHRoZW4gdHJ5IHRvIHR1cm4gdGhlIGxpZ2h0cyBvZmYgYWdhaW5cclxuICAgIC8vICAgICAgICAgcmV0dXJuIG9mKG5ldyBVc2VyQWN0aW9ucy5Xcml0ZVVzZXJBY3Rpb24oJycsICB0aGlzLnVzZXIpKSwgXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgb2YobmV3IFVzZXJBY3Rpb25zLlVwZGF0ZUxpZ2h0U3RhdGVBY3Rpb24odGhpcy51c2VyLCBmYWxzZSkpO1xyXG4gICAgLy8gICAgIH0pXHJcbiAgICBcclxuICAgIC8vIClcclxuICAgIFxyXG4gICAgQEVmZmVjdCgpXHJcbiAgICB1cGRhdGVMaWdodFN0YXRlJDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zJC5waXBlKFxyXG4gICAgICAgIG9mVHlwZTxVcGRhdGVMaWdodFN0YXRlQWN0aW9uPihVUERBVEVfTElHSFRfU1RBVEUpLFxyXG4gICAgICAgIHN3aXRjaE1hcChhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy51cGRhdGVMaWdodFN0YXRlKGFjdGlvbi51c2VyLCBhY3Rpb24uaXNXaWZpQ29ubmVjdGlvbikpLnBpcGUobWFwKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEdldExpZ2h0U3RhdGVBY3Rpb24oYWN0aW9uLnVzZXIuYnJpZGdlSXBBZGRyZXNzLCBhY3Rpb24udXNlci51c2VybmFtZSk7XHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgIH0pXHJcbiAgICApXHJcbiAgICBcclxuICAgIHVwZGF0ZUxpZ2h0U3RhdGUodXNlcjogVXNlciwgaXNXaWZpQ29ubmVjdGlvbjogYm9vbGVhbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdVcGRhdGluZyBsaWdodCBzdGF0ZScpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd3aWZpIHN0YXR1cyBpczogJyArIGlzV2lmaUNvbm5lY3Rpb24pO1xyXG4gICAgICAgIGlmIChpc1dpZmlDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHVzZXIuZ3JvdXBTdGF0ZXMuZm9yRWFjaChzdGF0ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmh1ZVNlcnZpY2Uuc2V0R3JvdXBTdGF0ZSh1c2VyLmJyaWRnZUlwQWRkcmVzcywgdXNlci51c2VybmFtZSwgc3RhdGUuZ3JvdXBJZCwge1xyXG4gICAgICAgICAgICAgICAgICAgIFwic2NlbmVcIjogc3RhdGUuc2NlbmVJZFxyXG4gICAgICAgICAgICAgICAgfSwgZmFsc2UsIGZhbHNlKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHVzZXIuZ3JvdXBTdGF0ZXMuZm9yRWFjaChzdGF0ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmh1ZVNlcnZpY2Uuc2V0R3JvdXBTdGF0ZSh1c2VyLmJyaWRnZUlwQWRkcmVzcywgdXNlci51c2VybmFtZSwgc3RhdGUuZ3JvdXBJZCwge1xyXG4gICAgICAgICAgICAgICAgICAgIFwib25cIjogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sIHVzZXIuYWNjZXNzVG9rZW4sIHRydWUpLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBlcnIgPT4ge1xyXG4gICAgICAgIC8vIGlmIChlcnIuc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICAvLyAgICAgICAgIGlmICh1c2VyLmFjY2Vzc1Rva2VuICE9IFwiXCIpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBuZXcgVXNlckFjdGlvbnMuUmVxdWVzdFJlZnJlc2hUb2tlbkFjdGlvbih1c2VyLnJlZnJlc2hUb2tlbikpO1xyXG4gICAgICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9yZW1vdGUtYWNjZXNzJ10pO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyByZWZyZXNoQWNjZXNzVG9rZW4ocmVmcmVzaFRva2VuKSB7XHJcbiAgICAvLyAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uID0gdGhpcy5odWVTZXJ2aWNlLnJlZnJlc2hBY2Nlc3NUb2tlbihyZWZyZXNoVG9rZW4pXHJcbiAgICAvLyAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMudXNlci5hY2Nlc3NUb2tlbiA9IHJlcy5hY2Nlc3NfdG9rZW47XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnVzZXIucmVmcmVzaFRva2VuID0gcmVzLnJlZnJlc2hfdG9rZW5cclxuICAgIC8vICAgICAgICAgfSwgZXJyID0+IHtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFbmNvdW50ZXJlZCBlcnJvcjogJyArIEpTT04uc3RyaW5naWZ5KGVycikpXHJcbiAgICAvLyAgICAgICAgIH0pXHJcbiAgICAvLyB9XHJcbn0iXX0=