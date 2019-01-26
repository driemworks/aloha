import { Injectable, OnInit } from "@angular/core";
import { GroupState } from "../models/GroupState.model";
// import { Store } from "@ngrx/store";
import { AppState } from "../app.state";

@Injectable()
export class UserService {

    // constructor(private store: Store<AppState>) { }
    constructor() { }

    // TODO - build this service
    getBridgeIp() {
        let _bridgeIp = "192.168.1.236";
        return _bridgeIp;
    }

    getUser() {
        let _username = "dOBMZLQEqwc08ab2saX8UT60qBv6vRPHTWi-2wi1";
        return _username;
    }

    getGroupStates() {
        return [new GroupState("1", "O3MwvjfktgOHlRF"),
                new GroupState("2", "X9MZ5qWaoQd8ZrX"),
                new GroupState("3", "uVYKNKrZfxUQHHt")
        ];
    }
}