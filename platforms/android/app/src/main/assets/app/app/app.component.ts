import { Component } from "@angular/core";
import { UserDataService } from "./services/database.service"; 
import { getUUID } from "nativescript-uuid";
import { Store } from "@ngrx/store";
import { AppState } from "./store/app.state";
import { Router } from "@angular/router";
import { ReadUserSuccessAction } from "./store/user/user.actions";
import { HueService } from "./services/hue.service";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    styleUrls: ["./app.component.css"],
    templateUrl: "./app.component.html",
})
export class AppComponent { 

    constructor(private store: Store<AppState>,
                private router: Router,
                private userDataService: UserDataService,
                private hueService: HueService) {
        this.userDataService.readUser(getUUID()).subscribe(res => {
            if (res[0]) {
                this.store.dispatch(new ReadUserSuccessAction(res[0]));
                this.router.navigate(['/home']);
            } else {
                this.router.navigate(['/user'])
            }
        });
    }

}
