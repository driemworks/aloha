import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { connectionType, getConnectionType, startMonitoring, stopMonitoring } from "tns-core-modules/connectivity";
import { HueService } from '../services/hue.service';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { Store } from '@ngrx/store';

@Component({
	moduleId: module.id,
    selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

    user: User;
    // 
    private subscription;
	// init wifi status to "none"
    wifiStatus: number = -1;
    // init previous wifi status to "none"
    previousWifiStatus: number = 0;

    constructor(private _store: Store<User>,
                private hueService: HueService,
                private router: Router) {
        this.subscription = this._store.select('user').subscribe(user => {
            console.log('Getting user in home component: ' + JSON.stringify(user));
            this.user = user;
        });
    }

	ngOnInit() {    
        this.startMonitoring();
    }

    private startMonitoring() {
        console.log('start monitoring');
        startMonitoring(newConnectionType => {
            console.log('monitoring wifi connection: ' + newConnectionType);
            this.previousWifiStatus = this.wifiStatus;
            this.wifiStatus = newConnectionType;
            // only want events to happen if wifi status has changed
            let wifiStatusChanged = (this.previousWifiStatus != this.wifiStatus);
            if (wifiStatusChanged) {
                if ((newConnectionType === connectionType.wifi || newConnectionType === connectionType.ethernet)) {               
                    console.log("welcome home");
                    if (this.user.bridgeIpAddress && this.user.username && this.user.groupStates) {
                        this.connectedBehavior();
                    }
                } else {
                    console.log("good bye");
                    this.notConnectedBehavior();
                }
            }
        });
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    connectedBehavior() {
        this.user.groupStates.forEach(state => {
            this.hueService.setGroupState(this.user.bridgeIpAddress, this.user.username, state.groupId, {
                "scene": state.sceneId
            }, false).subscribe(res => {
                console.log(res);
            });
        });
    }

    notConnectedBehavior() {
        // for now, just turn lights off if not on network
        if (this.user.accessToken) {
            // todo alert user to allow authorization
            this.user.groupStates.forEach(state => {
                this.hueService.setGroupState(this.user.bridgeIpAddress, this.user.username, state.groupId, {
                    "on": false
                }, this.user.accessToken).subscribe(res => {
                    console.log(res);
                });
            });
        }
    }
}
