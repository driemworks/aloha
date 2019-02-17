import { Component, OnInit, OnDestroy } from '@angular/core';
import { connectionType, getConnectionType, startMonitoring, stopMonitoring } from "tns-core-modules/connectivity";
import { User, initialState } from '../models/user.model';
import { Store } from '@ngrx/store';
import { UpdateLightStateAction } from '../store/hue/hue.actions';
import { map } from 'rxjs/operators';
import { AppState } from '../store/app.state';
import { HueService } from '../services/hue.service';
// import { Store } from '@ngrx/store';
// import { Auth0 } from 'nativescript-auth0';

@Component({
	moduleId: module.id,
    selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    user: User = null;
    lightstate: any;
    wifiStatus: number = -1;

    connectionStatus: boolean = false;

    previousWifiStatus: number = 0;
    groups: any[];

    constructor(private _store: Store<AppState>, private hueService: HueService) {
        this._store.select((state: any) => state.appState.user).subscribe(user => {
            this.user = user;
        });
    }

	ngOnInit() {
        this.startMonitoring();
    }

    private startMonitoring() {
        startMonitoring(newConnectionType => {
            console.log('Monitoring wifi connection: ' + newConnectionType);
            this.previousWifiStatus = this.wifiStatus;
            this.wifiStatus = newConnectionType;
            // only want events to happen if wifi status has changed
            let wifiStatusChanged = (this.previousWifiStatus != this.wifiStatus);
            this.connectionStatus = (newConnectionType === connectionType.wifi || newConnectionType === connectionType.ethernet);
            if (wifiStatusChanged) {
                console.log('The wifi status changed!');
                if (this.connectionStatus) {
                    console.log('group states' + JSON.stringify(this.user.groupStates));
                    if (this.user.bridgeIpAddress && this.user.username && this.user.groupStates) {
                        if (!this.groups) {
                            this.hueService.getGroups(this.user.bridgeIpAddress, this.user.username).subscribe((res: Response) => {
                                // groupId -> groupName
                                console.log('Mapping group ids to names');
                                Object.keys(res).forEach(key => {
                                    this.groups[key] = res[key]['name'];
                                })
                            });
                        }
                        // this.connectedBehavior();
                    } else {
                        console.log('No group states available');
                    }
                } else {
                    // this.notConnectedBehavior();
                }
            }
        });
    }
    
    ngOnDestroy() {
        stopMonitoring();
    }

 

    connectedBehavior() {
        this._store.dispatch(new UpdateLightStateAction(this.user, true));
    }

    notConnectedBehavior() {
        this._store.dispatch(new UpdateLightStateAction(this.user, false));
    }
}
