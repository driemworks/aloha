import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER, Inject } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HueService } from "./services/hue.service";
import { UserComponent } from "./user/user.component";
import { HomeComponent } from "./home/home.component";
import { StoreModule, Store } from "@ngrx/store";
import { userReducer } from "./store/user/user.reducer";
import { EffectsModule, Actions, ofType } from "@ngrx/effects";
import { UserEffects } from "./store/user/user.effects";
import { RemoteAccessComponent } from "./remoteAccess/remoteAccess.component";
import { EmptyResponseBodyErrorInterceptor } from "./store/user/user.interceptor";
import { UserDataService } from "./services/database.service";
import { HueEffects } from "./store/hue/hue.effects";
import { hueReducer } from "./store/hue/hue.reducer";
import { LightManagementComponent } from "./light-management/light-management.component";
import { LightManagementInfoComponent } from "./light-management/light-management-info/light-management-info.component";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { SceneManagementComponent } from "./light-management/scene-managment/scene-management.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,   
        NativeScriptFormsModule,
        AppRoutingModule,
        HttpClientModule,
        NativeScriptHttpClientModule,
        StoreModule.forRoot({appState: userReducer, hueReducer}),
        EffectsModule.forRoot([UserEffects, HueEffects]),
    ],
    declarations: [
        AppComponent,
        UserComponent,
        HomeComponent,
        RemoteAccessComponent,
        LightManagementComponent,
        LightManagementInfoComponent,
        SceneManagementComponent,
    ],
    providers: [
        { 
            provide: HTTP_INTERCEPTORS, 
            useClass: EmptyResponseBodyErrorInterceptor, 
            multi: true 
        },
        HueService,
        UserDataService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
