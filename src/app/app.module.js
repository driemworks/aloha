"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var http_client_1 = require("nativescript-angular/http-client");
var http_1 = require("@angular/common/http");
var hue_service_1 = require("./services/hue.service");
var user_component_1 = require("./user/user.component");
var home_component_1 = require("./home/home.component");
var store_1 = require("@ngrx/store");
var user_reducer_1 = require("./store/user/user.reducer");
var effects_1 = require("@ngrx/effects");
var user_effects_1 = require("./store/user/user.effects");
var remoteAccess_component_1 = require("./remoteAccess/remoteAccess.component");
var user_interceptor_1 = require("./store/user/user.interceptor");
var database_service_1 = require("./services/database.service");
var hue_effects_1 = require("./store/hue/hue.effects");
var hue_reducer_1 = require("./store/hue/hue.reducer");
var light_management_component_1 = require("./light-management/light-management.component");
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_1.AppRoutingModule,
                http_1.HttpClientModule,
                http_client_1.NativeScriptHttpClientModule,
                store_1.StoreModule.forRoot({ appState: user_reducer_1.userReducer, hueReducer: hue_reducer_1.hueReducer }),
                effects_1.EffectsModule.forRoot([user_effects_1.UserEffects, hue_effects_1.HueEffects]),
            ],
            declarations: [
                app_component_1.AppComponent,
                user_component_1.UserComponent,
                home_component_1.HomeComponent,
                remoteAccess_component_1.RemoteAccessComponent,
                light_management_component_1.LightManagementComponent
            ],
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: user_interceptor_1.EmptyResponseBodyErrorInterceptor,
                    multi: true
                },
                hue_service_1.HueService,
                database_service_1.UserDataService
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0Y7QUFDcEYsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFDL0MsZ0VBQWdGO0FBRWhGLDZDQUEyRTtBQUMzRSxzREFBb0Q7QUFDcEQsd0RBQXNEO0FBQ3RELHdEQUFzRDtBQUN0RCxxQ0FBaUQ7QUFDakQsMERBQXdEO0FBQ3hELHlDQUErRDtBQUMvRCwwREFBd0Q7QUFDeEQsZ0ZBQThFO0FBQzlFLGtFQUFrRjtBQUNsRixnRUFBOEQ7QUFDOUQsdURBQXFEO0FBQ3JELHVEQUFxRDtBQUNyRCw0RkFBeUY7QUFxQ3pGO0lBSEE7O01BRUU7SUFDRjtJQUF5QixDQUFDO0lBQWIsU0FBUztRQW5DckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQiw4QkFBZ0I7Z0JBQ2hCLHVCQUFnQjtnQkFDaEIsMENBQTRCO2dCQUM1QixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFDLFFBQVEsRUFBRSwwQkFBVyxFQUFFLFVBQVUsMEJBQUEsRUFBQyxDQUFDO2dCQUN4RCx1QkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLDBCQUFXLEVBQUUsd0JBQVUsQ0FBQyxDQUFDO2FBQ25EO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDRCQUFZO2dCQUNaLDhCQUFhO2dCQUNiLDhCQUFhO2dCQUNiLDhDQUFxQjtnQkFDckIscURBQXdCO2FBQzNCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQO29CQUNJLE9BQU8sRUFBRSx3QkFBaUI7b0JBQzFCLFFBQVEsRUFBRSxvREFBaUM7b0JBQzNDLEtBQUssRUFBRSxJQUFJO2lCQUNkO2dCQUNELHdCQUFVO2dCQUNWLGtDQUFlO2FBQ2xCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7UUFDRjs7VUFFRTtPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBBUFBfSU5JVElBTElaRVIsIEluamVjdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50XCI7XG5cbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUsIEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBIdWVTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvaHVlLnNlcnZpY2VcIjtcbmltcG9ydCB7IFVzZXJDb21wb25lbnQgfSBmcm9tIFwiLi91c2VyL3VzZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9ob21lLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU3RvcmVNb2R1bGUsIFN0b3JlIH0gZnJvbSBcIkBuZ3J4L3N0b3JlXCI7XG5pbXBvcnQgeyB1c2VyUmVkdWNlciB9IGZyb20gXCIuL3N0b3JlL3VzZXIvdXNlci5yZWR1Y2VyXCI7XG5pbXBvcnQgeyBFZmZlY3RzTW9kdWxlLCBBY3Rpb25zLCBvZlR5cGUgfSBmcm9tIFwiQG5ncngvZWZmZWN0c1wiO1xuaW1wb3J0IHsgVXNlckVmZmVjdHMgfSBmcm9tIFwiLi9zdG9yZS91c2VyL3VzZXIuZWZmZWN0c1wiO1xuaW1wb3J0IHsgUmVtb3RlQWNjZXNzQ29tcG9uZW50IH0gZnJvbSBcIi4vcmVtb3RlQWNjZXNzL3JlbW90ZUFjY2Vzcy5jb21wb25lbnRcIjtcbmltcG9ydCB7IEVtcHR5UmVzcG9uc2VCb2R5RXJyb3JJbnRlcmNlcHRvciB9IGZyb20gXCIuL3N0b3JlL3VzZXIvdXNlci5pbnRlcmNlcHRvclwiO1xuaW1wb3J0IHsgVXNlckRhdGFTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZGF0YWJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgSHVlRWZmZWN0cyB9IGZyb20gXCIuL3N0b3JlL2h1ZS9odWUuZWZmZWN0c1wiO1xuaW1wb3J0IHsgaHVlUmVkdWNlciB9IGZyb20gXCIuL3N0b3JlL2h1ZS9odWUucmVkdWNlclwiO1xuaW1wb3J0IHsgTGlnaHRNYW5hZ2VtZW50Q29tcG9uZW50IH0gZnJvbSBcIi4vbGlnaHQtbWFuYWdlbWVudC9saWdodC1tYW5hZ2VtZW50LmNvbXBvbmVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGJvb3RzdHJhcDogW1xuICAgICAgICBBcHBDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgICAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlLFxuICAgICAgICBTdG9yZU1vZHVsZS5mb3JSb290KHthcHBTdGF0ZTogdXNlclJlZHVjZXIsIGh1ZVJlZHVjZXJ9KSxcbiAgICAgICAgRWZmZWN0c01vZHVsZS5mb3JSb290KFtVc2VyRWZmZWN0cywgSHVlRWZmZWN0c10pLFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFwcENvbXBvbmVudCxcbiAgICAgICAgVXNlckNvbXBvbmVudCxcbiAgICAgICAgSG9tZUNvbXBvbmVudCxcbiAgICAgICAgUmVtb3RlQWNjZXNzQ29tcG9uZW50LFxuICAgICAgICBMaWdodE1hbmFnZW1lbnRDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IFxuICAgICAgICAgICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsIFxuICAgICAgICAgICAgdXNlQ2xhc3M6IEVtcHR5UmVzcG9uc2VCb2R5RXJyb3JJbnRlcmNlcHRvciwgXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSBcbiAgICAgICAgfSxcbiAgICAgICAgSHVlU2VydmljZSxcbiAgICAgICAgVXNlckRhdGFTZXJ2aWNlXG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuLypcblBhc3MgeW91ciBhcHBsaWNhdGlvbiBtb2R1bGUgdG8gdGhlIGJvb3RzdHJhcE1vZHVsZSBmdW5jdGlvbiBsb2NhdGVkIGluIG1haW4udHMgdG8gc3RhcnQgeW91ciBhcHBcbiovXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIl19