"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var http_client_1 = require("nativescript-angular/http-client");
var http_1 = require("@angular/common/http");
var hue_service_1 = require("./services/hue.service");
var user_service_1 = require("./services/user.service");
var file_service_1 = require("./services/file.service");
var user_component_1 = require("./user/user.component");
var home_component_1 = require("./home/home.component");
var store_1 = require("@ngrx/store");
var user_reducer_1 = require("./store/user.reducer");
var effects_1 = require("@ngrx/effects");
var user_effects_1 = require("./store/user.effects");
var remoteAccess_component_1 = require("./remoteAccess/remoteAccess.component");
var user_interceptor_1 = require("./store/user.interceptor");
// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";
// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";
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
                store_1.StoreModule.forRoot({ user: user_reducer_1.userReducer }),
                effects_1.EffectsModule.forRoot([user_effects_1.UserEffects]),
            ],
            declarations: [
                app_component_1.AppComponent,
                user_component_1.UserComponent,
                home_component_1.HomeComponent,
                remoteAccess_component_1.RemoteAccessComponent,
            ],
            providers: [
                hue_service_1.HueService,
                user_service_1.UserService,
                file_service_1.FileService,
                { provide: http_1.HTTP_INTERCEPTORS, useClass: user_interceptor_1.EmptyResponseBodyErrorInterceptor, multi: true },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFDL0MsZ0VBQWdGO0FBRWhGLDZDQUEyRTtBQUMzRSxzREFBb0Q7QUFDcEQsd0RBQXNEO0FBQ3RELHdEQUFzRDtBQUN0RCx3REFBc0Q7QUFDdEQsd0RBQXNEO0FBQ3RELHFDQUEwQztBQUMxQyxxREFBbUQ7QUFDbkQseUNBQThDO0FBQzlDLHFEQUFtRDtBQUNuRCxnRkFBOEU7QUFDOUUsNkRBQTZFO0FBRTdFLDJFQUEyRTtBQUMzRSx3RUFBd0U7QUFFeEUsNkVBQTZFO0FBQzdFLHNFQUFzRTtBQWlDdEU7SUFIQTs7TUFFRTtJQUNGO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBL0JyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLDhCQUFnQjtnQkFDaEIsdUJBQWdCO2dCQUNoQiwwQ0FBNEI7Z0JBQzVCLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLDBCQUFXLEVBQUUsQ0FBQztnQkFDMUMsdUJBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQywwQkFBVyxDQUFDLENBQUM7YUFDdkM7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osOEJBQWE7Z0JBQ2IsOEJBQWE7Z0JBQ2IsOENBQXFCO2FBQ3hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLHdCQUFVO2dCQUNWLDBCQUFXO2dCQUNYLDBCQUFXO2dCQUNYLEVBQUUsT0FBTyxFQUFFLHdCQUFpQixFQUFFLFFBQVEsRUFBRSxvREFBaUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2FBQzNGO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7UUFDRjs7VUFFRTtPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnRcIjtcblxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSwgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7IEh1ZVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9odWUuc2VydmljZVwiO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IEZpbGVTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZmlsZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVc2VyQ29tcG9uZW50IH0gZnJvbSBcIi4vdXNlci91c2VyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvaG9tZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFN0b3JlTW9kdWxlIH0gZnJvbSBcIkBuZ3J4L3N0b3JlXCI7XG5pbXBvcnQgeyB1c2VyUmVkdWNlciB9IGZyb20gXCIuL3N0b3JlL3VzZXIucmVkdWNlclwiO1xuaW1wb3J0IHsgRWZmZWN0c01vZHVsZSB9IGZyb20gXCJAbmdyeC9lZmZlY3RzXCI7XG5pbXBvcnQgeyBVc2VyRWZmZWN0cyB9IGZyb20gXCIuL3N0b3JlL3VzZXIuZWZmZWN0c1wiO1xuaW1wb3J0IHsgUmVtb3RlQWNjZXNzQ29tcG9uZW50IH0gZnJvbSBcIi4vcmVtb3RlQWNjZXNzL3JlbW90ZUFjY2Vzcy5jb21wb25lbnRcIjtcbmltcG9ydCB7IEVtcHR5UmVzcG9uc2VCb2R5RXJyb3JJbnRlcmNlcHRvciB9IGZyb20gXCIuL3N0b3JlL3VzZXIuaW50ZXJjZXB0b3JcIjtcblxuLy8gVW5jb21tZW50IGFuZCBhZGQgdG8gTmdNb2R1bGUgaW1wb3J0cyBpZiB5b3UgbmVlZCB0byB1c2UgdHdvLXdheSBiaW5kaW5nXG4vLyBpbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuXG4vLyBVbmNvbW1lbnQgYW5kIGFkZCB0byBOZ01vZHVsZSBpbXBvcnRzICBpZiB5b3UgbmVlZCB0byB1c2UgdGhlIEhUVFAgd3JhcHBlclxuLy8gaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgYm9vdHN0cmFwOiBbXG4gICAgICAgIEFwcENvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXG4gICAgICAgIFN0b3JlTW9kdWxlLmZvclJvb3QoeyB1c2VyOiB1c2VyUmVkdWNlciB9KSxcbiAgICAgICAgRWZmZWN0c01vZHVsZS5mb3JSb290KFtVc2VyRWZmZWN0c10pLFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFwcENvbXBvbmVudCxcbiAgICAgICAgVXNlckNvbXBvbmVudCxcbiAgICAgICAgSG9tZUNvbXBvbmVudCxcbiAgICAgICAgUmVtb3RlQWNjZXNzQ29tcG9uZW50LFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEh1ZVNlcnZpY2UsXG4gICAgICAgIFVzZXJTZXJ2aWNlLFxuICAgICAgICBGaWxlU2VydmljZSxcbiAgICAgICAgeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEVtcHR5UmVzcG9uc2VCb2R5RXJyb3JJbnRlcmNlcHRvciwgbXVsdGk6IHRydWUgfSxcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG4vKlxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxuKi9cbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=