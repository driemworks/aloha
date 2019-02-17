"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var router_1 = require("@angular/router");
var database_service_1 = require("../../services/database.service");
var user_actions_1 = require("./user.actions");
var GroupState_model_1 = require("~/app/models/GroupState.model");
;
var UserEffects = /** @class */ (function () {
    function UserEffects(actions$, router, userDataService) {
        var _this = this;
        this.actions$ = actions$;
        this.router = router;
        this.userDataService = userDataService;
        this.user = null;
        this.mockUser = {
            alias: 'Test',
            username: 'c0j6qnxtbYqfcosNx8ccRgfwhPkY6wrlSn0oe-1H',
            bridgeIpAddress: '192.168.1.236',
            groupStates: [
                new GroupState_model_1.GroupState('1', 'O3MwvjfktgOHlRF'),
                new GroupState_model_1.GroupState('2', 'uVYKNKrZfxUQHHt'),
                new GroupState_model_1.GroupState('3', 'X9MZ5qWaoQd8ZrX')
            ],
            accessToken: '',
            refreshToken: '',
            uuid: '2b5c79f227905fbe'
        };
        this.writeUser$ = this.actions$.pipe(effects_1.ofType(user_actions_1.WRITE_USER), operators_1.switchMap(function (action) {
            console.log('Writing user: ' + JSON.stringify(action.user));
            return _this.userDataService.writeUser(action.user).pipe(operators_1.map(function (res) {
                // this.router.navigate(['/home']);
                return new user_actions_1.WriteUserSuccessAction();
            }, function (err) {
                return new user_actions_1.WriteUserFailedAction(err);
            }));
        }));
        this.readUser$ = this.actions$.pipe(effects_1.ofType(user_actions_1.READ_USER), operators_1.switchMap(function (action) {
            return _this.userDataService.readUser(action.uuid).pipe(operators_1.map(function (res) {
                return new user_actions_1.ReadUserSuccessAction(res);
            }, function (err) {
                return new user_actions_1.ReadUserFailAction(err);
            }));
        }));
        // TODO refactor action name  to SAVE_USER
        this.saveUser$ = this.actions$.pipe(effects_1.ofType(user_actions_1.UPDATE_USER), operators_1.switchMap(function (action) {
            return rxjs_1.of(_this.updateUser(action.user)).pipe(operators_1.map(function () {
                // if we saved succesfully, then update the users state
                // this.router.navigate(['/home']);
                return new user_actions_1.ReadUserSuccessAction(action.user);
            }));
        }));
    }
    UserEffects.prototype.updateUser = function (user) {
        this.userDataService.updateUser(user).subscribe(function (res) {
            return res;
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
    ], UserEffects.prototype, "saveUser$", void 0);
    UserEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions,
            router_1.Router,
            database_service_1.UserDataService])
    ], UserEffects);
    return UserEffects;
}());
exports.UserEffects = UserEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5lZmZlY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLHlDQUF3RDtBQUN4RCw2QkFBZ0U7QUFHaEUsNENBQXVFO0FBSXZFLDBDQUF5QztBQUN6QyxvRUFBa0U7QUFDbEUsK0NBQTBPO0FBQzFPLGtFQUEyRDtBQUMzRCxDQUFDO0FBR0Q7SUFNSSxxQkFBb0IsUUFBaUIsRUFDakIsTUFBYyxFQUNkLGVBQWdDO1FBRnBELGlCQUV5RDtRQUZyQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFKdkQsU0FBSSxHQUFTLElBQUksQ0FBQztRQU1mLGFBQVEsR0FBUztZQUNiLEtBQUssRUFBRSxNQUFNO1lBQ2IsUUFBUSxFQUFFLDBDQUEwQztZQUNwRCxlQUFlLEVBQUUsZUFBZTtZQUNoQyxXQUFXLEVBQUU7Z0JBQ1QsSUFBSSw2QkFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQztnQkFDdEMsSUFBSSw2QkFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQztnQkFDdEMsSUFBSSw2QkFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQzthQUN6QztZQUNELFdBQVcsRUFBRSxFQUFFO1lBQ2YsWUFBWSxFQUFFLEVBQUU7WUFDaEIsSUFBSSxFQUFFLGtCQUFrQjtTQUMzQixDQUFBO1FBR0QsZUFBVSxHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDL0MsZ0JBQU0sQ0FBa0IseUJBQVUsQ0FBQyxFQUNuQyxxQkFBUyxDQUFDLFVBQUEsTUFBTTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1RCxPQUFPLEtBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUEsR0FBRztnQkFDM0QsbUNBQW1DO2dCQUNuQyxPQUFPLElBQUkscUNBQXNCLEVBQUUsQ0FBQztZQUN4QyxDQUFDLEVBQUUsVUFBQSxHQUFHO2dCQUNGLE9BQU8sSUFBSSxvQ0FBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQ0wsQ0FBQztRQUdGLGNBQVMsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQzlDLGdCQUFNLENBQWlCLHdCQUFTLENBQUMsRUFDakMscUJBQVMsQ0FBQyxVQUFBLE1BQU07WUFDWixPQUFPLEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUMsR0FBUztnQkFDakUsT0FBTyxJQUFJLG9DQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLENBQUMsRUFBRSxVQUFBLEdBQUc7Z0JBQ0YsT0FBTyxJQUFJLGlDQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FDTCxDQUFDO1FBRUYsMENBQTBDO1FBRTFDLGNBQVMsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQzlDLGdCQUFNLENBQW1CLDBCQUFXLENBQUMsRUFDckMscUJBQVMsQ0FBQyxVQUFDLE1BQU07WUFDYixPQUFPLFNBQUUsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFHLENBQUM7Z0JBQzdDLHVEQUF1RDtnQkFDdkQsbUNBQW1DO2dCQUNuQyxPQUFPLElBQUksb0NBQXFCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FDTCxDQUFDO0lBckRzRCxDQUFDO0lBd0R6RCxnQ0FBVSxHQUFWLFVBQVcsSUFBVTtRQUNqQixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQy9DLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBM0NEO1FBREMsZ0JBQU0sRUFBRTtrQ0FDRyxpQkFBVTttREFXcEI7SUFHRjtRQURDLGdCQUFNLEVBQUU7a0NBQ0UsaUJBQVU7a0RBU25CO0lBSUY7UUFEQyxnQkFBTSxFQUFFO2tDQUNFLGlCQUFVO2tEQVNuQjtJQTdETyxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBT3FCLGlCQUFPO1lBQ1QsZUFBTTtZQUNHLGtDQUFlO09BUjNDLFdBQVcsQ0FxRXZCO0lBQUQsa0JBQUM7Q0FBQSxBQXJFRCxJQXFFQztBQXJFWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgeyBFZmZlY3QsIEFjdGlvbnMsIG9mVHlwZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tLCBvZiwgU3Vic2NyaXB0aW9uLCBwaXBlIH0gZnJvbSBcInJ4anNcIjtcclxuXHJcbmltcG9ydCB7IEFjdGlvbiwgU3RvcmUgfSBmcm9tIFwiQG5ncngvc3RvcmVcIjtcclxuaW1wb3J0IHsgc3dpdGNoTWFwLCBjYXRjaEVycm9yLCBtYXAsIHRha2UsIHRhcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5cclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdXNlci5tb2RlbFwiO1xyXG5pbXBvcnQgeyBIdWVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2h1ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgVXNlckRhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2RhdGFiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgV3JpdGVVc2VyQWN0aW9uLCBXUklURV9VU0VSLCBXcml0ZVVzZXJTdWNjZXNzQWN0aW9uLCBXcml0ZVVzZXJGYWlsZWRBY3Rpb24sIFJFQURfVVNFUiwgUmVhZFVzZXJBY3Rpb24sIFJlYWRVc2VyU3VjY2Vzc0FjdGlvbiwgUmVhZFVzZXJGYWlsQWN0aW9uLCBVcGRhdGVVc2VyQWN0aW9uLCBVUERBVEVfVVNFUiwgVXBkYXRlVXNlckFjdGlvblN1Y2Nlc3MgfSBmcm9tIFwiLi91c2VyLmFjdGlvbnNcIjtcclxuaW1wb3J0IHsgR3JvdXBTdGF0ZSB9IGZyb20gXCJ+L2FwcC9tb2RlbHMvR3JvdXBTdGF0ZS5tb2RlbFwiO1xyXG47XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBVc2VyRWZmZWN0cyB7XHJcblxyXG4gICAgcmVmcmVzaFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblx0dXNlcjogVXNlciA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhY3Rpb25zJDogQWN0aW9ucyxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVzZXJEYXRhU2VydmljZTogVXNlckRhdGFTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBtb2NrVXNlcjogVXNlciA9IHtcclxuICAgICAgICBhbGlhczogJ1Rlc3QnLFxyXG4gICAgICAgIHVzZXJuYW1lOiAnYzBqNnFueHRiWXFmY29zTng4Y2NSZ2Z3aFBrWTZ3cmxTbjBvZS0xSCcsXHJcbiAgICAgICAgYnJpZGdlSXBBZGRyZXNzOiAnMTkyLjE2OC4xLjIzNicsXHJcbiAgICAgICAgZ3JvdXBTdGF0ZXM6IFtcclxuICAgICAgICAgICAgbmV3IEdyb3VwU3RhdGUoJzEnLCAnTzNNd3ZqZmt0Z09IbFJGJyksXHJcbiAgICAgICAgICAgIG5ldyBHcm91cFN0YXRlKCcyJywgJ3VWWUtOS3JaZnhVUUhIdCcpLFxyXG4gICAgICAgICAgICBuZXcgR3JvdXBTdGF0ZSgnMycsICdYOU1aNXFXYW9RZDhaclgnKVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgYWNjZXNzVG9rZW46ICcnLFxyXG4gICAgICAgIHJlZnJlc2hUb2tlbjogJycsXHJcbiAgICAgICAgdXVpZDogJzJiNWM3OWYyMjc5MDVmYmUnXHJcbiAgICB9XHJcblxyXG4gICAgQEVmZmVjdCgpXHJcbiAgICB3cml0ZVVzZXIkOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMkLnBpcGUoXHJcbiAgICAgICAgb2ZUeXBlPFdyaXRlVXNlckFjdGlvbj4oV1JJVEVfVVNFUiksXHJcbiAgICAgICAgc3dpdGNoTWFwKGFjdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXcml0aW5nIHVzZXI6ICcgKyBKU09OLnN0cmluZ2lmeShhY3Rpb24udXNlcikpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyRGF0YVNlcnZpY2Uud3JpdGVVc2VyKGFjdGlvbi51c2VyKS5waXBlKG1hcChyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvaG9tZSddKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgV3JpdGVVc2VyU3VjY2Vzc0FjdGlvbigpO1xyXG4gICAgICAgICAgICB9LCBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBXcml0ZVVzZXJGYWlsZWRBY3Rpb24oZXJyKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIEBFZmZlY3QoKVxyXG4gICAgcmVhZFVzZXIkOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMkLnBpcGUoXHJcbiAgICAgICAgb2ZUeXBlPFJlYWRVc2VyQWN0aW9uPihSRUFEX1VTRVIpLFxyXG4gICAgICAgIHN3aXRjaE1hcChhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyRGF0YVNlcnZpY2UucmVhZFVzZXIoYWN0aW9uLnV1aWQpLnBpcGUobWFwKChyZXM6IFVzZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmVhZFVzZXJTdWNjZXNzQWN0aW9uKHJlcyk7XHJcbiAgICAgICAgICAgIH0sIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJlYWRVc2VyRmFpbEFjdGlvbihlcnIpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgLy8gVE9ETyByZWZhY3RvciBhY3Rpb24gbmFtZSAgdG8gU0FWRV9VU0VSXHJcbiAgICBARWZmZWN0KClcclxuICAgIHNhdmVVc2VyJDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zJC5waXBlKFxyXG4gICAgICAgIG9mVHlwZTxVcGRhdGVVc2VyQWN0aW9uPihVUERBVEVfVVNFUiksXHJcbiAgICAgICAgc3dpdGNoTWFwKChhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMudXBkYXRlVXNlcihhY3Rpb24udXNlcikpLnBpcGUobWFwKCgpID0+ICB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiB3ZSBzYXZlZCBzdWNjZXNmdWxseSwgdGhlbiB1cGRhdGUgdGhlIHVzZXJzIHN0YXRlXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9ob21lJ10pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWFkVXNlclN1Y2Nlc3NBY3Rpb24oYWN0aW9uLnVzZXIpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICBcclxuICAgIHVwZGF0ZVVzZXIodXNlcjogVXNlcikge1xyXG4gICAgICAgIHRoaXMudXNlckRhdGFTZXJ2aWNlLnVwZGF0ZVVzZXIodXNlcikuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19