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
var light_management_info_component_1 = require("./light-management/light-management-info/light-management-info.component");
var forms_1 = require("nativescript-angular/forms");
var scene_management_component_1 = require("./light-management/scene-managment/scene-management.component");
var expansion_panel_component_1 = require("./expansion-panel/expansion-panel.component");
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
                forms_1.NativeScriptFormsModule,
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
                light_management_component_1.LightManagementComponent,
                light_management_info_component_1.LightManagementInfoComponent,
                scene_management_component_1.SceneManagementComponent,
                expansion_panel_component_1.ExpansionPanelComponent
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
            ],
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0Y7QUFDcEYsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFDL0MsZ0VBQWdGO0FBRWhGLDZDQUEyRTtBQUMzRSxzREFBb0Q7QUFDcEQsd0RBQXNEO0FBQ3RELHdEQUFzRDtBQUN0RCxxQ0FBaUQ7QUFDakQsMERBQXdEO0FBQ3hELHlDQUErRDtBQUMvRCwwREFBd0Q7QUFDeEQsZ0ZBQThFO0FBQzlFLGtFQUFrRjtBQUNsRixnRUFBOEQ7QUFDOUQsdURBQXFEO0FBQ3JELHVEQUFxRDtBQUNyRCw0RkFBeUY7QUFDekYsNEhBQXdIO0FBQ3hILG9EQUFxRTtBQUNyRSw0R0FBeUc7QUFDekcseUZBQXNGO0FBeUN0RjtJQUhBOztNQUVFO0lBQ0Y7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUF2Q3JCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2Qiw4QkFBZ0I7Z0JBQ2hCLHVCQUFnQjtnQkFDaEIsMENBQTRCO2dCQUM1QixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFDLFFBQVEsRUFBRSwwQkFBVyxFQUFFLFVBQVUsMEJBQUEsRUFBQyxDQUFDO2dCQUN4RCx1QkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLDBCQUFXLEVBQUUsd0JBQVUsQ0FBQyxDQUFDO2FBQ25EO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDRCQUFZO2dCQUNaLDhCQUFhO2dCQUNiLDhCQUFhO2dCQUNiLDhDQUFxQjtnQkFDckIscURBQXdCO2dCQUN4Qiw4REFBNEI7Z0JBQzVCLHFEQUF3QjtnQkFDeEIsbURBQXVCO2FBQzFCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQO29CQUNJLE9BQU8sRUFBRSx3QkFBaUI7b0JBQzFCLFFBQVEsRUFBRSxvREFBaUM7b0JBQzNDLEtBQUssRUFBRSxJQUFJO2lCQUNkO2dCQUNELHdCQUFVO2dCQUNWLGtDQUFlO2FBQ2xCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7UUFDRjs7VUFFRTtPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBBUFBfSU5JVElBTElaRVIsIEluamVjdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50XCI7XG5cbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUsIEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBIdWVTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvaHVlLnNlcnZpY2VcIjtcbmltcG9ydCB7IFVzZXJDb21wb25lbnQgfSBmcm9tIFwiLi91c2VyL3VzZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9ob21lLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU3RvcmVNb2R1bGUsIFN0b3JlIH0gZnJvbSBcIkBuZ3J4L3N0b3JlXCI7XG5pbXBvcnQgeyB1c2VyUmVkdWNlciB9IGZyb20gXCIuL3N0b3JlL3VzZXIvdXNlci5yZWR1Y2VyXCI7XG5pbXBvcnQgeyBFZmZlY3RzTW9kdWxlLCBBY3Rpb25zLCBvZlR5cGUgfSBmcm9tIFwiQG5ncngvZWZmZWN0c1wiO1xuaW1wb3J0IHsgVXNlckVmZmVjdHMgfSBmcm9tIFwiLi9zdG9yZS91c2VyL3VzZXIuZWZmZWN0c1wiO1xuaW1wb3J0IHsgUmVtb3RlQWNjZXNzQ29tcG9uZW50IH0gZnJvbSBcIi4vcmVtb3RlQWNjZXNzL3JlbW90ZUFjY2Vzcy5jb21wb25lbnRcIjtcbmltcG9ydCB7IEVtcHR5UmVzcG9uc2VCb2R5RXJyb3JJbnRlcmNlcHRvciB9IGZyb20gXCIuL3N0b3JlL3VzZXIvdXNlci5pbnRlcmNlcHRvclwiO1xuaW1wb3J0IHsgVXNlckRhdGFTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZGF0YWJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgSHVlRWZmZWN0cyB9IGZyb20gXCIuL3N0b3JlL2h1ZS9odWUuZWZmZWN0c1wiO1xuaW1wb3J0IHsgaHVlUmVkdWNlciB9IGZyb20gXCIuL3N0b3JlL2h1ZS9odWUucmVkdWNlclwiO1xuaW1wb3J0IHsgTGlnaHRNYW5hZ2VtZW50Q29tcG9uZW50IH0gZnJvbSBcIi4vbGlnaHQtbWFuYWdlbWVudC9saWdodC1tYW5hZ2VtZW50LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTGlnaHRNYW5hZ2VtZW50SW5mb0NvbXBvbmVudCB9IGZyb20gXCIuL2xpZ2h0LW1hbmFnZW1lbnQvbGlnaHQtbWFuYWdlbWVudC1pbmZvL2xpZ2h0LW1hbmFnZW1lbnQtaW5mby5jb21wb25lbnRcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU2NlbmVNYW5hZ2VtZW50Q29tcG9uZW50IH0gZnJvbSBcIi4vbGlnaHQtbWFuYWdlbWVudC9zY2VuZS1tYW5hZ21lbnQvc2NlbmUtbWFuYWdlbWVudC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEV4cGFuc2lvblBhbmVsQ29tcG9uZW50IH0gZnJvbSBcIi4vZXhwYW5zaW9uLXBhbmVsL2V4cGFuc2lvbi1wYW5lbC5jb21wb25lbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBib290c3RyYXA6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSwgICBcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXG4gICAgICAgIFN0b3JlTW9kdWxlLmZvclJvb3Qoe2FwcFN0YXRlOiB1c2VyUmVkdWNlciwgaHVlUmVkdWNlcn0pLFxuICAgICAgICBFZmZlY3RzTW9kdWxlLmZvclJvb3QoW1VzZXJFZmZlY3RzLCBIdWVFZmZlY3RzXSksXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50LFxuICAgICAgICBVc2VyQ29tcG9uZW50LFxuICAgICAgICBIb21lQ29tcG9uZW50LFxuICAgICAgICBSZW1vdGVBY2Nlc3NDb21wb25lbnQsXG4gICAgICAgIExpZ2h0TWFuYWdlbWVudENvbXBvbmVudCxcbiAgICAgICAgTGlnaHRNYW5hZ2VtZW50SW5mb0NvbXBvbmVudCxcbiAgICAgICAgU2NlbmVNYW5hZ2VtZW50Q29tcG9uZW50LFxuICAgICAgICBFeHBhbnNpb25QYW5lbENvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgXG4gICAgICAgICAgICBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgXG4gICAgICAgICAgICB1c2VDbGFzczogRW1wdHlSZXNwb25zZUJvZHlFcnJvckludGVyY2VwdG9yLCBcbiAgICAgICAgICAgIG11bHRpOiB0cnVlIFxuICAgICAgICB9LFxuICAgICAgICBIdWVTZXJ2aWNlLFxuICAgICAgICBVc2VyRGF0YVNlcnZpY2VcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF0sXG59KVxuLypcblBhc3MgeW91ciBhcHBsaWNhdGlvbiBtb2R1bGUgdG8gdGhlIGJvb3RzdHJhcE1vZHVsZSBmdW5jdGlvbiBsb2NhdGVkIGluIG1haW4udHMgdG8gc3RhcnQgeW91ciBhcHBcbiovXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIl19