"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var database_service_1 = require("./services/database.service");
var nativescript_uuid_1 = require("nativescript-uuid");
var store_1 = require("@ngrx/store");
var router_1 = require("@angular/router");
var user_actions_1 = require("./store/user/user.actions");
var hue_service_1 = require("./services/hue.service");
var user_model_1 = require("./models/user.model");
// import properties from '../resources/properties.json';
var AppComponent = /** @class */ (function () {
    function AppComponent(store, router, userDataService, hueService) {
        var _this = this;
        this.store = store;
        this.router = router;
        this.userDataService = userDataService;
        this.hueService = hueService;
        if (true) {
            this.store.dispatch(new user_actions_1.ReadUserSuccessAction(user_model_1.initialState));
            this.router.navigate(['/home']);
        }
        else {
            this.userDataService.readUser(nativescript_uuid_1.getUUID()).subscribe(function (res) {
                if (res[0]) {
                    _this.store.dispatch(new user_actions_1.ReadUserSuccessAction(res[0]));
                    _this.router.navigate(['/home']);
                }
                else {
                    _this.router.navigate(['/user']);
                }
            });
        }
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            moduleId: module.id,
            styleUrls: ["./app.component.css"],
            templateUrl: "./app.component.html",
        }),
        __metadata("design:paramtypes", [store_1.Store,
            router_1.Router,
            database_service_1.UserDataService,
            hue_service_1.HueService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsZ0VBQThEO0FBQzlELHVEQUE0QztBQUM1QyxxQ0FBb0M7QUFFcEMsMENBQXlDO0FBQ3pDLDBEQUFrRTtBQUNsRSxzREFBb0Q7QUFDcEQsa0RBQW1EO0FBRW5ELHlEQUF5RDtBQVF6RDtJQUVJLHNCQUFvQixLQUFzQixFQUN0QixNQUFjLEVBQ2QsZUFBZ0MsRUFDaEMsVUFBc0I7UUFIMUMsaUJBa0JDO1FBbEJtQixVQUFLLEdBQUwsS0FBSyxDQUFpQjtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEMsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLG9DQUFxQixDQUFDLHlCQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsMkJBQU8sRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRztnQkFDbEQsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ1IsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxvQ0FBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2RCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7aUJBQ25DO3FCQUFNO29CQUNILEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtpQkFDbEM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBRUwsQ0FBQztJQXBCUSxZQUFZO1FBTnhCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7WUFDbEMsV0FBVyxFQUFFLHNCQUFzQjtTQUN0QyxDQUFDO3lDQUc2QixhQUFLO1lBQ0osZUFBTTtZQUNHLGtDQUFlO1lBQ3BCLHdCQUFVO09BTGpDLFlBQVksQ0FzQnhCO0lBQUQsbUJBQUM7Q0FBQSxBQXRCRCxJQXNCQztBQXRCWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBVc2VyRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9kYXRhYmFzZS5zZXJ2aWNlXCI7IFxuaW1wb3J0IHsgZ2V0VVVJRCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdXVpZFwiO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tIFwiQG5ncngvc3RvcmVcIjtcbmltcG9ydCB7IEFwcFN0YXRlIH0gZnJvbSBcIi4vc3RvcmUvYXBwLnN0YXRlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSZWFkVXNlclN1Y2Nlc3NBY3Rpb24gfSBmcm9tIFwiLi9zdG9yZS91c2VyL3VzZXIuYWN0aW9uc1wiO1xuaW1wb3J0IHsgSHVlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2h1ZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBpbml0aWFsU3RhdGUgfSBmcm9tIFwiLi9tb2RlbHMvdXNlci5tb2RlbFwiO1xuXG4vLyBpbXBvcnQgcHJvcGVydGllcyBmcm9tICcuLi9yZXNvdXJjZXMvcHJvcGVydGllcy5qc29uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtYXBwXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzdHlsZVVybHM6IFtcIi4vYXBwLmNvbXBvbmVudC5jc3NcIl0sXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9hcHAuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHsgXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBTdG9yZTxBcHBTdGF0ZT4sXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVzZXJEYXRhU2VydmljZTogVXNlckRhdGFTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgaHVlU2VydmljZTogSHVlU2VydmljZSkge1xuICAgICAgICBpZiAodHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgUmVhZFVzZXJTdWNjZXNzQWN0aW9uKGluaXRpYWxTdGF0ZSkpO1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvaG9tZSddKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGFTZXJ2aWNlLnJlYWRVc2VyKGdldFVVSUQoKSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc1swXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBSZWFkVXNlclN1Y2Nlc3NBY3Rpb24ocmVzWzBdKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2hvbWUnXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvdXNlciddKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgXG4gICAgfVxuXG59XG4iXX0=