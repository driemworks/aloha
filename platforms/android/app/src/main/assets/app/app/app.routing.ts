import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { UserComponent } from "./user/user.component";
import { HomeComponent } from "./home/home.component";
import { RemoteAccessComponent } from "./remoteAccess/remoteAccess.component";

const routes: Routes = [
    // { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "user", component: UserComponent },
    { path: "home", component: HomeComponent },
    { path: "remote-access", component: RemoteAccessComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }