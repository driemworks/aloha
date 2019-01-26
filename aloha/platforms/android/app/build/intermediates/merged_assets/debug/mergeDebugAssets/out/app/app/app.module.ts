import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HueService } from "./services/hue.service";
import { UserService } from "./services/user.service";
import { FileService } from "./services/file.service";
import { UserComponent } from "./user/user.component";
import { HomeComponent } from "./home/home.component";
import { StoreModule } from "@ngrx/store";
import { userReducer } from "./store/user.reducer";
import { EffectsModule } from "@ngrx/effects";
import { UserEffects } from "./store/user.effects";
import { RemoteAccessComponent } from "./remoteAccess/remoteAccess.component";
import { EmptyResponseBodyErrorInterceptor } from "./store/user.interceptor";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        HttpClientModule,
        NativeScriptHttpClientModule,
        StoreModule.forRoot({ user: userReducer }),
        EffectsModule.forRoot([UserEffects]),
    ],
    declarations: [
        AppComponent,
        UserComponent,
        HomeComponent,
        RemoteAccessComponent,
    ],
    providers: [
        HueService,
        UserService,
        FileService,
        { provide: HTTP_INTERCEPTORS, useClass: EmptyResponseBodyErrorInterceptor, multi: true },
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
