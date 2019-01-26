"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var fs = require("tns-core-modules/file-system");
var effects_1 = require("@ngrx/effects");
var rxjs_1 = require("rxjs");
var store_1 = require("@ngrx/store");
var user_actions_1 = require("./actions/user.actions");
var operators_1 = require("rxjs/operators");
var UserActions = require("./actions/user.actions");
var GroupState_model_1 = require("../models/GroupState.model");
var hue_service_1 = require("../services/hue.service");
var router_1 = require("@angular/router");
var UserEffects = /** @class */ (function () {
    function UserEffects(actions$, hueService, _store, router) {
        var _this = this;
        this.actions$ = actions$;
        this.hueService = hueService;
        this._store = _store;
        this.router = router;
        this.user = null;
        this.initialState = {
            bridgeIpAddress: "",
            username: "",
            groupStates: [
                new GroupState_model_1.GroupState("1", "O3MwvjfktgOHlRF"),
                new GroupState_model_1.GroupState("2", "X9MZ5qWaoQd8ZrX"),
                new GroupState_model_1.GroupState("3", "uVYKNKrZfxUQHHt")
            ],
            accessToken: "",
            refreshToken: ""
        };
        this.tonyInitialState = {
            bridgeIpAddress: "192.168.1.236",
            username: "dOBMZLQEqwc08ab2saX8UT60qBv6vRPHTWi-2wi1",
            groupStates: [
                new GroupState_model_1.GroupState("1", "O3MwvjfktgOHlRF"),
                new GroupState_model_1.GroupState("2", "X9MZ5qWaoQd8ZrX"),
                new GroupState_model_1.GroupState("3", "uVYKNKrZfxUQHHt")
            ],
            accessToken: "",
            refreshToken: ""
        };
        /**
         * Write the application state to the device file system
         * @type {Observable<Action>}
         * @memberof UserEffects
         */
        this.writeUser$ = this.actions$.pipe(effects_1.ofType(user_actions_1.WRITE_USER), operators_1.switchMap(function (action) {
            console.log('WRITING USER ' + JSON.stringify(action.user));
            var documents = fs.knownFolders.documents();
            var folder = documents.getFolder("aloha-appdata");
            var file = folder.getFile("user-data.json");
            return rxjs_1.from(file.writeText(JSON.stringify(action.user))).pipe(operators_1.map(function (res) {
                return new UserActions.WriteUserSuccessAction(res);
            }, function (err) {
                return new UserActions.WriteUserFailedAction(err);
            }));
        }));
        /**
         * Read the saved application state from the device
         * @type {Observable<Action>}
         * @memberof UserEffects
         */
        this.readUser$ = this.actions$.pipe(effects_1.ofType(user_actions_1.READ_USER), operators_1.switchMap(function () {
            var documents = fs.knownFolders.documents();
            var folder = documents.getFolder("aloha-appdata");
            var file = folder.getFile("user-data.json");
            return rxjs_1.from(file.readText()).pipe(operators_1.map(function (res) {
                console.log("Reading user: " + JSON.stringify(res));
                return new UserActions.ReadUserSuccessAction(JSON.parse(res));
            }, function (err) {
                return new UserActions.ReadUserFailAction(err);
            }));
        }));
        this.registerUser$ = this.actions$.pipe(effects_1.ofType(UserActions.CREATE_USER), operators_1.switchMap(function (action) {
            return rxjs_1.of(_this.createUser()).pipe(operators_1.map(function (res) {
                return new UserActions.CreateUserSuccessAction();
            }, function (err) {
                return new UserActions.CreateUserFailedAction(JSON.stringify(err));
            }));
        }));
        this.getToken$ = this.actions$.pipe(effects_1.ofType(UserActions.GET_ACCESS_TOKEN), operators_1.switchMap(function (action) {
            console.log('Getting access token using code: ' + action.code);
            return rxjs_1.of(_this.getAccessToken(action.code)).pipe(operators_1.map(function (res) {
                _this.router.navigate(['/home']);
                return new UserActions.WriteUserAction(_this.user);
            }));
        }));
        this.subscription = this._store.select('user').subscribe(function (user) {
            _this.user = user;
        });
    }
    UserEffects.prototype.createUser = function () {
    };
    UserEffects.prototype.getAccessToken = function (code) {
        var _this = this;
        this.subscription = this.hueService.getAccessToken(code)
            .subscribe(function (res) {
            console.log('Response: ' + JSON.stringify(res));
            var accessToken = res.access_token;
            var refreshToken = res.refresh_token;
            console.log('Found tokens: ' + accessToken + ', ' + refreshToken);
            _this.user.accessToken = accessToken;
            _this.user.refreshToken = refreshToken;
            console.log('User: ' + JSON.stringify(_this.user));
        }, function (err) {
            console.log('Encountered error: ' + JSON.stringify(err));
        });
    };
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", rxjs_1.Observable)
    ], UserEffects.prototype, "writeUser$", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", rxjs_1.Observable)
    ], UserEffects.prototype, "readUser$", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", rxjs_1.Observable)
    ], UserEffects.prototype, "registerUser$", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", rxjs_1.Observable)
    ], UserEffects.prototype, "getToken$", void 0);
    UserEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions,
            hue_service_1.HueService,
            store_1.Store,
            router_1.Router])
    ], UserEffects);
    return UserEffects;
}());
exports.UserEffects = UserEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5lZmZlY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLGlEQUFtRDtBQUNuRCx5Q0FBd0Q7QUFDeEQsNkJBQWdFO0FBRWhFLHFDQUE0QztBQUM1Qyx1REFBK0Q7QUFDL0QsNENBQXVFO0FBRXZFLG9EQUFzRDtBQUd0RCwrREFBd0Q7QUFDeEQsdURBQXFEO0FBQ3JELDBDQUF5QztBQUd6QztJQUtJLHFCQUFvQixRQUFpQixFQUNqQixVQUFzQixFQUN0QixNQUFtQixFQUNuQixNQUFjO1FBSGxDLGlCQU9DO1FBUG1CLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFhO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFMckMsU0FBSSxHQUFTLElBQUksQ0FBQztRQVdmLGlCQUFZLEdBQVM7WUFDakIsZUFBZSxFQUFFLEVBQUU7WUFDbkIsUUFBUSxFQUFFLEVBQUU7WUFDWixXQUFXLEVBQUU7Z0JBQ1QsSUFBSSw2QkFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQztnQkFDdEMsSUFBSSw2QkFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQztnQkFDdEMsSUFBSSw2QkFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQzthQUN6QztZQUNELFdBQVcsRUFBRSxFQUFFO1lBQ2YsWUFBWSxFQUFFLEVBQUU7U0FDbkIsQ0FBQztRQUVGLHFCQUFnQixHQUFTO1lBQ3JCLGVBQWUsRUFBRSxlQUFlO1lBQ2hDLFFBQVEsRUFBRSwwQ0FBMEM7WUFDcEQsV0FBVyxFQUFFO2dCQUNULElBQUksNkJBQVUsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUM7Z0JBQ3RDLElBQUksNkJBQVUsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUM7Z0JBQ3RDLElBQUksNkJBQVUs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QUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLFdBQVcsR0FBRyxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUM7WUFDbEUsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQ3BDLEtBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsRUFBRSxVQUFBLEdBQUc7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNGLENBQUM7SUFyRkQ7UUFEQyxnQkFBTSxFQUFFO2tDQUNHLGlCQUFVO21EQWdCcEI7SUFRRjtRQURDLGdCQUFNLEVBQUU7a0NBQ0UsaUJBQVU7a0RBZW5CO0lBR0Y7UUFEQyxnQkFBTSxFQUFFO2tDQUNNLGlCQUFVO3NEQVd2QjtJQUdGO1FBREMsZ0JBQU0sRUFBRTtrQ0FDRSxpQkFBVTtrREFVbkI7SUE5R08sV0FBVztRQUR2QixpQkFBVSxFQUFFO3lDQU1xQixpQkFBTztZQUNMLHdCQUFVO1lBQ2QsYUFBSztZQUNMLGVBQU07T0FSekIsV0FBVyxDQWtJdkI7SUFBRCxrQkFBQztDQUFBLEFBbElELElBa0lDO0FBbElZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCB7IEVmZmVjdCwgQWN0aW9ucywgb2ZUeXBlIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIGZyb20sIG9mLCBTdWJzY3JpcHRpb24sIHBpcGUgfSBmcm9tIFwicnhqc1wiO1xyXG5cclxuaW1wb3J0IHsgQWN0aW9uLCBTdG9yZSB9IGZyb20gXCJAbmdyeC9zdG9yZVwiO1xyXG5pbXBvcnQgeyBSRUFEX1VTRVIsIFdSSVRFX1VTRVIgfSBmcm9tIFwiLi9hY3Rpb25zL3VzZXIuYWN0aW9uc1wiO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAsIGNhdGNoRXJyb3IsIG1hcCwgdGFrZSwgdGFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBVc2VyQWN0aW9ucyBmcm9tIFwiLi9hY3Rpb25zL3VzZXIuYWN0aW9uc1wiO1xyXG5pbXBvcnQgeyBGaWxlU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9maWxlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9tb2RlbHMvdXNlci5tb2RlbFwiO1xyXG5pbXBvcnQgeyBHcm91cFN0YXRlIH0gZnJvbSBcIi4uL21vZGVscy9Hcm91cFN0YXRlLm1vZGVsXCI7XHJcbmltcG9ydCB7IEh1ZVNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvaHVlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVXNlckVmZmVjdHMge1xyXG5cclxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cdHVzZXI6IFVzZXIgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYWN0aW9ucyQ6IEFjdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGh1ZVNlcnZpY2U6IEh1ZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9zdG9yZTogU3RvcmU8VXNlcj4sXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLl9zdG9yZS5zZWxlY3QoJ3VzZXInKS5zdWJzY3JpYmUodXNlciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbFN0YXRlOiBVc2VyID0ge1xyXG4gICAgICAgIGJyaWRnZUlwQWRkcmVzczogXCJcIixcclxuICAgICAgICB1c2VybmFtZTogXCJcIixcclxuICAgICAgICBncm91cFN0YXRlczogW1xyXG4gICAgICAgICAgICBuZXcgR3JvdXBTdGF0ZShcIjFcIiwgXCJPM013dmpma3RnT0hsUkZcIiksXHJcbiAgICAgICAgICAgIG5ldyBHcm91cFN0YXRlKFwiMlwiLCBcIlg5TVo1cVdhb1FkOFpyWFwiKSxcclxuICAgICAgICAgICAgbmV3IEdyb3VwU3RhdGUoXCIzXCIsIFwidVZZS05LclpmeFVRSEh0XCIpXHJcbiAgICAgICAgXSxcclxuICAgICAgICBhY2Nlc3NUb2tlbjogXCJcIixcclxuICAgICAgICByZWZyZXNoVG9rZW46IFwiXCJcclxuICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgdG9ueUluaXRpYWxTdGF0ZTogVXNlciA9IHtcclxuICAgICAgICBicmlkZ2VJcEFkZHJlc3M6IFwiMTkyLjE2OC4xLjIzNlwiLFxyXG4gICAgICAgIHVzZXJuYW1lOiBcImRPQk1aTFFFcXdjMDhhYjJzYVg4VVQ2MHFCdjZ2UlBIVFdpLTJ3aTFcIixcclxuICAgICAgICBncm91cFN0YXRlczogW1xyXG4gICAgICAgICAgICBuZXcgR3JvdXBTdGF0ZShcIjFcIiwgXCJPM013dmpma3RnT0hsUkZcIiksXHJcbiAgICAgICAgICAgIG5ldyBHcm91cFN0YXRlKFwiMlwiLCBcIlg5TVo1cVdhb1FkOFpyWFwiKSxcclxuICAgICAgICAgICAgbmV3IEdyb3VwU3RhdGUoXCIzXCIsIFwidVZZS05LclpmeFVRSEh0XCIpXHJcbiAgICAgICAgXSxcclxuICAgICAgICBhY2Nlc3NUb2tlbjogXCJcIixcclxuICAgICAgICByZWZyZXNoVG9rZW46IFwiXCJcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZSB0aGUgYXBwbGljYXRpb24gc3RhdGUgdG8gdGhlIGRldmljZSBmaWxlIHN5c3RlbVxyXG4gICAgICogQHR5cGUge09ic2VydmFibGU8QWN0aW9uPn1cclxuICAgICAqIEBtZW1iZXJvZiBVc2VyRWZmZWN0c1xyXG4gICAgICovXHJcbiAgICBARWZmZWN0KClcclxuICAgIHdyaXRlVXNlciQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucyQucGlwZShcclxuICAgICAgICBvZlR5cGU8VXNlckFjdGlvbnMuV3JpdGVVc2VyQWN0aW9uPihXUklURV9VU0VSKSxcclxuICAgICAgICBzd2l0Y2hNYXAoYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1dSSVRJTkcgVVNFUiAnICsgSlNPTi5zdHJpbmdpZnkoYWN0aW9uLnVzZXIpKTtcclxuICAgICAgICAgICAgbGV0IGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICAgICAgbGV0IGZvbGRlciA9IGRvY3VtZW50cy5nZXRGb2xkZXIoXCJhbG9oYS1hcHBkYXRhXCIpO1xyXG4gICAgICAgICAgICBsZXQgZmlsZSA9IGZvbGRlci5nZXRGaWxlKFwidXNlci1kYXRhLmpzb25cIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZnJvbShmaWxlLndyaXRlVGV4dChKU09OLnN0cmluZ2lmeShhY3Rpb24udXNlcikpKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVc2VyQWN0aW9ucy5Xcml0ZVVzZXJTdWNjZXNzQWN0aW9uKHJlcyk7XHJcbiAgICAgICAgICAgICAgICB9LCBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVXNlckFjdGlvbnMuV3JpdGVVc2VyRmFpbGVkQWN0aW9uKGVycik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkIHRoZSBzYXZlZCBhcHBsaWNhdGlvbiBzdGF0ZSBmcm9tIHRoZSBkZXZpY2VcclxuICAgICAqIEB0eXBlIHtPYnNlcnZhYmxlPEFjdGlvbj59XHJcbiAgICAgKiBAbWVtYmVyb2YgVXNlckVmZmVjdHNcclxuICAgICAqL1xyXG4gICAgQEVmZmVjdCgpXHJcbiAgICByZWFkVXNlciQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucyQucGlwZShcclxuICAgICAgICBvZlR5cGUoUkVBRF9VU0VSKSxcclxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgICAgICBsZXQgZm9sZGVyID0gZG9jdW1lbnRzLmdldEZvbGRlcihcImFsb2hhLWFwcGRhdGFcIik7XHJcbiAgICAgICAgICAgIGxldCBmaWxlID0gZm9sZGVyLmdldEZpbGUoXCJ1c2VyLWRhdGEuanNvblwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZyb20oZmlsZS5yZWFkVGV4dCgpKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWFkaW5nIHVzZXI6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVc2VyQWN0aW9ucy5SZWFkVXNlclN1Y2Nlc3NBY3Rpb24oSlNPTi5wYXJzZShyZXMpKTtcclxuICAgICAgICAgICAgICAgIH0sIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVc2VyQWN0aW9ucy5SZWFkVXNlckZhaWxBY3Rpb24oZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBARWZmZWN0KClcclxuICAgIHJlZ2lzdGVyVXNlciQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucyQucGlwZShcclxuICAgICAgICBvZlR5cGUoVXNlckFjdGlvbnMuQ1JFQVRFX1VTRVIpLFxyXG4gICAgICAgIHN3aXRjaE1hcChhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5jcmVhdGVVc2VyKCkpLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBtYXAocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVzZXJBY3Rpb25zLkNyZWF0ZVVzZXJTdWNjZXNzQWN0aW9uKCk7IFxyXG4gICAgICAgICAgICAgICAgfSwgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVzZXJBY3Rpb25zLkNyZWF0ZVVzZXJGYWlsZWRBY3Rpb24oSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgQEVmZmVjdCgpXHJcbiAgICBnZXRUb2tlbiQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucyQucGlwZShcclxuICAgICAgICBvZlR5cGU8VXNlckFjdGlvbnMuR2V0QWNjZXNzVG9rZW5BY3Rpb24+KFVzZXJBY3Rpb25zLkdFVF9BQ0NFU1NfVE9LRU4pLFxyXG4gICAgICAgIHN3aXRjaE1hcChhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnR2V0dGluZyBhY2Nlc3MgdG9rZW4gdXNpbmcgY29kZTogJyArIGFjdGlvbi5jb2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIG9mICh0aGlzLmdldEFjY2Vzc1Rva2VuKGFjdGlvbi5jb2RlKSkucGlwZShcclxuICAgICAgICAgICAgICAgIG1hcChyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2hvbWUnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVc2VyQWN0aW9ucy5Xcml0ZVVzZXJBY3Rpb24odGhpcy51c2VyKTtcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIGNyZWF0ZVVzZXIoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWNjZXNzVG9rZW4oY29kZSkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5odWVTZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKGNvZGUpICAgXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnUmVzcG9uc2U6ICcgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuXHRcdFx0XHRsZXQgYWNjZXNzVG9rZW4gPSByZXMuYWNjZXNzX3Rva2VuO1xyXG5cdFx0XHRcdGxldCByZWZyZXNoVG9rZW4gPSByZXMucmVmcmVzaF90b2tlbjtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnRm91bmQgdG9rZW5zOiAnICsgYWNjZXNzVG9rZW4gKyAnLCAnICsgcmVmcmVzaFRva2VuKTtcclxuXHRcdFx0XHR0aGlzLnVzZXIuYWNjZXNzVG9rZW4gPSBhY2Nlc3NUb2tlbjtcclxuXHRcdFx0XHR0aGlzLnVzZXIucmVmcmVzaFRva2VuID0gcmVmcmVzaFRva2VuO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VzZXI6ICcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXIpKTtcclxuICAgICAgICAgICAgfSwgZXJyID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnRW5jb3VudGVyZWQgZXJyb3I6ICcgKyBKU09OLnN0cmluZ2lmeShlcnIpKVxyXG5cdFx0XHR9KTtcclxuICAgIH1cclxufVxyXG4iXX0=