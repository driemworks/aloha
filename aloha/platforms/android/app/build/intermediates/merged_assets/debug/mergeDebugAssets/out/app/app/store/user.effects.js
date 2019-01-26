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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5lZmZlY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLGlEQUFtRDtBQUNuRCx5Q0FBd0Q7QUFDeEQsNkJBQWdFO0FBRWhFLHFDQUE0QztBQUM1Qyx1REFBK0Q7QUFDL0QsNENBQXVFO0FBRXZFLG9EQUFzRDtBQUd0RCwrREFBd0Q7QUFDeEQsdURBQXFEO0FBQ3JELDBDQUF5QztBQUd6QztJQUtJLHFCQUFvQixRQUFpQixFQUNqQixVQUFzQixFQUN0QixNQUFtQixFQUNuQixNQUFjO1FBSGxDLGlCQU9DO1FBUG1CLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFhO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFMckMsU0FBSSxHQUFTLElBQUksQ0FBQztRQVdmLGlCQUFZLEdBQVM7WUFDakIsZUFBZSxFQUFFLEVBQUU7WUFDbkIsUUFBUSxFQUFFLEVBQUU7WUFDWixXQUFXLEVBQUU7Z0JBQ1QsSUFBSSw2QkFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQztnQkFDdEMsSUFBSSw2QkFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQztnQkFDdEMsSUFBSSw2QkFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQzthQUN6QztZQUNELFdBQVcsRUFBRSxFQUFFO1lBQ2YsWUFBWSxFQUFFLEVBQUU7U0FDbkIsQ0FBQztRQUVGLHFCQUFnQixHQUFTO1lBQ3JCLGVBQWUsRUFBRSxlQUFlO1lBQ2hDLFFBQVEsRUFBRSwwQ0FBMEM7WUFDcEQsV0FBVyxFQUFFO2dCQUNULElBQUksNkJBQVUsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUM7Z0JBQ3RDLElBQUksNkJBQVUsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUM7Z0JBQ3RDLElBQUksNkJBQVUs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LGlCQUFVO21EQWdCcEI7SUFRRjtRQURDLGdCQUFNLEVBQUU7a0NBQ0UsaUJBQVU7a0RBZW5CO0lBR0Y7UUFEQyxnQkFBTSxFQUFFO2tDQUNFLGlCQUFVO2tEQVVuQjtJQWhHTyxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBTXFCLGlCQUFPO1lBQ0wsd0JBQVU7WUFDZCxhQUFLO1lBQ0wsZUFBTTtPQVJ6QixXQUFXLENBZ0h2QjtJQUFELGtCQUFDO0NBQUEsQUFoSEQsSUFnSEM7QUFoSFksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIjtcclxuaW1wb3J0IHsgRWZmZWN0LCBBY3Rpb25zLCBvZlR5cGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbSwgb2YsIFN1YnNjcmlwdGlvbiwgcGlwZSB9IGZyb20gXCJyeGpzXCI7XHJcblxyXG5pbXBvcnQgeyBBY3Rpb24sIFN0b3JlIH0gZnJvbSBcIkBuZ3J4L3N0b3JlXCI7XHJcbmltcG9ydCB7IFJFQURfVVNFUiwgV1JJVEVfVVNFUiB9IGZyb20gXCIuL2FjdGlvbnMvdXNlci5hY3Rpb25zXCI7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCwgY2F0Y2hFcnJvciwgbWFwLCB0YWtlLCB0YXAgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcclxuXHJcbmltcG9ydCAqIGFzIFVzZXJBY3Rpb25zIGZyb20gXCIuL2FjdGlvbnMvdXNlci5hY3Rpb25zXCI7XHJcbmltcG9ydCB7IEZpbGVTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2ZpbGUuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL21vZGVscy91c2VyLm1vZGVsXCI7XHJcbmltcG9ydCB7IEdyb3VwU3RhdGUgfSBmcm9tIFwiLi4vbW9kZWxzL0dyb3VwU3RhdGUubW9kZWxcIjtcclxuaW1wb3J0IHsgSHVlU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9odWUuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBVc2VyRWZmZWN0cyB7XHJcblxyXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblx0dXNlcjogVXNlciA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhY3Rpb25zJDogQWN0aW9ucyxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgaHVlU2VydmljZTogSHVlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgX3N0b3JlOiBTdG9yZTxVc2VyPixcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuX3N0b3JlLnNlbGVjdCgndXNlcicpLnN1YnNjcmliZSh1c2VyID0+IHtcclxuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsU3RhdGU6IFVzZXIgPSB7XHJcbiAgICAgICAgYnJpZGdlSXBBZGRyZXNzOiBcIlwiLFxyXG4gICAgICAgIHVzZXJuYW1lOiBcIlwiLFxyXG4gICAgICAgIGdyb3VwU3RhdGVzOiBbXHJcbiAgICAgICAgICAgIG5ldyBHcm91cFN0YXRlKFwiMVwiLCBcIk8zTXd2amZrdGdPSGxSRlwiKSxcclxuICAgICAgICAgICAgbmV3IEdyb3VwU3RhdGUoXCIyXCIsIFwiWDlNWjVxV2FvUWQ4WnJYXCIpLFxyXG4gICAgICAgICAgICBuZXcgR3JvdXBTdGF0ZShcIjNcIiwgXCJ1VllLTktyWmZ4VVFISHRcIilcclxuICAgICAgICBdLFxyXG4gICAgICAgIGFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgICAgIHJlZnJlc2hUb2tlbjogXCJcIlxyXG4gICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICB0b255SW5pdGlhbFN0YXRlOiBVc2VyID0ge1xyXG4gICAgICAgIGJyaWRnZUlwQWRkcmVzczogXCIxOTIuMTY4LjEuMjM2XCIsXHJcbiAgICAgICAgdXNlcm5hbWU6IFwiZE9CTVpMUUVxd2MwOGFiMnNhWDhVVDYwcUJ2NnZSUEhUV2ktMndpMVwiLFxyXG4gICAgICAgIGdyb3VwU3RhdGVzOiBbXHJcbiAgICAgICAgICAgIG5ldyBHcm91cFN0YXRlKFwiMVwiLCBcIk8zTXd2amZrdGdPSGxSRlwiKSxcclxuICAgICAgICAgICAgbmV3IEdyb3VwU3RhdGUoXCIyXCIsIFwiWDlNWjVxV2FvUWQ4WnJYXCIpLFxyXG4gICAgICAgICAgICBuZXcgR3JvdXBTdGF0ZShcIjNcIiwgXCJ1VllLTktyWmZ4VVFISHRcIilcclxuICAgICAgICBdLFxyXG4gICAgICAgIGFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgICAgIHJlZnJlc2hUb2tlbjogXCJcIlxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlIHRoZSBhcHBsaWNhdGlvbiBzdGF0ZSB0byB0aGUgZGV2aWNlIGZpbGUgc3lzdGVtXHJcbiAgICAgKiBAdHlwZSB7T2JzZXJ2YWJsZTxBY3Rpb24+fVxyXG4gICAgICogQG1lbWJlcm9mIFVzZXJFZmZlY3RzXHJcbiAgICAgKi9cclxuICAgIEBFZmZlY3QoKVxyXG4gICAgd3JpdGVVc2VyJDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zJC5waXBlKFxyXG4gICAgICAgIG9mVHlwZTxVc2VyQWN0aW9ucy5Xcml0ZVVzZXJBY3Rpb24+KFdSSVRFX1VTRVIpLFxyXG4gICAgICAgIHN3aXRjaE1hcChhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnV1JJVElORyBVU0VSICcgKyBKU09OLnN0cmluZ2lmeShhY3Rpb24udXNlcikpO1xyXG4gICAgICAgICAgICBsZXQgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgICAgICBsZXQgZm9sZGVyID0gZG9jdW1lbnRzLmdldEZvbGRlcihcImFsb2hhLWFwcGRhdGFcIik7XHJcbiAgICAgICAgICAgIGxldCBmaWxlID0gZm9sZGVyLmdldEZpbGUoXCJ1c2VyLWRhdGEuanNvblwiKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmcm9tKGZpbGUud3JpdGVUZXh0KEpTT04uc3RyaW5naWZ5KGFjdGlvbi51c2VyKSkpLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBtYXAocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVzZXJBY3Rpb25zLldyaXRlVXNlclN1Y2Nlc3NBY3Rpb24ocmVzKTtcclxuICAgICAgICAgICAgICAgIH0sIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVc2VyQWN0aW9ucy5Xcml0ZVVzZXJGYWlsZWRBY3Rpb24oZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgdGhlIHNhdmVkIGFwcGxpY2F0aW9uIHN0YXRlIGZyb20gdGhlIGRldmljZVxyXG4gICAgICogQHR5cGUge09ic2VydmFibGU8QWN0aW9uPn1cclxuICAgICAqIEBtZW1iZXJvZiBVc2VyRWZmZWN0c1xyXG4gICAgICovXHJcbiAgICBARWZmZWN0KClcclxuICAgIHJlYWRVc2VyJDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zJC5waXBlKFxyXG4gICAgICAgIG9mVHlwZShSRUFEX1VTRVIpLFxyXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgICAgIGxldCBmb2xkZXIgPSBkb2N1bWVudHMuZ2V0Rm9sZGVyKFwiYWxvaGEtYXBwZGF0YVwiKTtcclxuICAgICAgICAgICAgbGV0IGZpbGUgPSBmb2xkZXIuZ2V0RmlsZShcInVzZXItZGF0YS5qc29uXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnJvbShmaWxlLnJlYWRUZXh0KCkpLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBtYXAocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlYWRpbmcgdXNlcjogXCIgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVzZXJBY3Rpb25zLlJlYWRVc2VyU3VjY2Vzc0FjdGlvbihKU09OLnBhcnNlKHJlcykpO1xyXG4gICAgICAgICAgICAgICAgfSwgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVzZXJBY3Rpb25zLlJlYWRVc2VyRmFpbEFjdGlvbihlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIEBFZmZlY3QoKVxyXG4gICAgZ2V0VG9rZW4kOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMkLnBpcGUoXHJcbiAgICAgICAgb2ZUeXBlPFVzZXJBY3Rpb25zLkdldEFjY2Vzc1Rva2VuQWN0aW9uPihVc2VyQWN0aW9ucy5HRVRfQUNDRVNTX1RPS0VOKSxcclxuICAgICAgICBzd2l0Y2hNYXAoYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dldHRpbmcgYWNjZXNzIHRva2VuIHVzaW5nIGNvZGU6ICcgKyBhY3Rpb24uY29kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBvZiAodGhpcy5nZXRBY2Nlc3NUb2tlbihhY3Rpb24uY29kZSkpLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBtYXAocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9ob21lJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVXNlckFjdGlvbnMuV3JpdGVVc2VyQWN0aW9uKHRoaXMudXNlcik7XHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBnZXRBY2Nlc3NUb2tlbihjb2RlKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmh1ZVNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oY29kZSkgICBcclxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdSZXNwb25zZTogJyArIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG5cdFx0XHRcdGxldCBhY2Nlc3NUb2tlbiA9IHJlcy5hY2Nlc3NfdG9rZW47XHJcblx0XHRcdFx0bGV0IHJlZnJlc2hUb2tlbiA9IHJlcy5yZWZyZXNoX3Rva2VuO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdGb3VuZCB0b2tlbnM6ICcgKyBhY2Nlc3NUb2tlbiArICcsICcgKyByZWZyZXNoVG9rZW4pO1xyXG5cdFx0XHRcdHRoaXMudXNlci5hY2Nlc3NUb2tlbiA9IGFjY2Vzc1Rva2VuO1xyXG5cdFx0XHRcdHRoaXMudXNlci5yZWZyZXNoVG9rZW4gPSByZWZyZXNoVG9rZW47XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVXNlcjogJyArIEpTT04uc3RyaW5naWZ5KHRoaXMudXNlcikpO1xyXG4gICAgICAgICAgICB9LCBlcnIgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdFbmNvdW50ZXJlZCBlcnJvcjogJyArIEpTT04uc3RyaW5naWZ5KGVycikpXHJcblx0XHRcdH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==