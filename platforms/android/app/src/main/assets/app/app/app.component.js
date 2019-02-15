"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var database_service_1 = require("./services/database.service");
var nativescript_uuid_1 = require("nativescript-uuid");
var store_1 = require("@ngrx/store");
var router_1 = require("@angular/router");
var user_actions_1 = require("./store/user/user.actions");
var hue_service_1 = require("./services/hue.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(store, router, userDataService, hueService) {
        var _this = this;
        this.store = store;
        this.router = router;
        this.userDataService = userDataService;
        this.hueService = hueService;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsZ0VBQThEO0FBQzlELHVEQUE0QztBQUM1QyxxQ0FBb0M7QUFFcEMsMENBQXlDO0FBQ3pDLDBEQUFrRTtBQUNsRSxzREFBb0Q7QUFRcEQ7SUFFSSxzQkFBb0IsS0FBc0IsRUFDdEIsTUFBYyxFQUNkLGVBQWdDLEVBQ2hDLFVBQXNCO1FBSDFDLGlCQVlDO1FBWm1CLFVBQUssR0FBTCxLQUFLLENBQWlCO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQywyQkFBTyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ2xELElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNSLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksb0NBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ25DO2lCQUFNO2dCQUNILEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTthQUNsQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWRRLFlBQVk7UUFOeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNsQyxXQUFXLEVBQUUsc0JBQXNCO1NBQ3RDLENBQUM7eUNBRzZCLGFBQUs7WUFDSixlQUFNO1lBQ0csa0NBQWU7WUFDcEIsd0JBQVU7T0FMakMsWUFBWSxDQWdCeEI7SUFBRCxtQkFBQztDQUFBLEFBaEJELElBZ0JDO0FBaEJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFVzZXJEYXRhU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2RhdGFiYXNlLnNlcnZpY2VcIjsgXG5pbXBvcnQgeyBnZXRVVUlEIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11dWlkXCI7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gXCJAbmdyeC9zdG9yZVwiO1xuaW1wb3J0IHsgQXBwU3RhdGUgfSBmcm9tIFwiLi9zdG9yZS9hcHAuc3RhdGVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJlYWRVc2VyU3VjY2Vzc0FjdGlvbiB9IGZyb20gXCIuL3N0b3JlL3VzZXIvdXNlci5hY3Rpb25zXCI7XG5pbXBvcnQgeyBIdWVTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvaHVlLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtYXBwXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzdHlsZVVybHM6IFtcIi4vYXBwLmNvbXBvbmVudC5jc3NcIl0sXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9hcHAuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHsgXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBTdG9yZTxBcHBTdGF0ZT4sXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVzZXJEYXRhU2VydmljZTogVXNlckRhdGFTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgaHVlU2VydmljZTogSHVlU2VydmljZSkge1xuICAgICAgICB0aGlzLnVzZXJEYXRhU2VydmljZS5yZWFkVXNlcihnZXRVVUlEKCkpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc1swXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFJlYWRVc2VyU3VjY2Vzc0FjdGlvbihyZXNbMF0pKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9ob21lJ10pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy91c2VyJ10pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19