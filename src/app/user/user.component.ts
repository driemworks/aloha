import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HueService } from '../services/hue.service';
import { Store } from '@ngrx/store';
import { User } from '../models/user.model';
import { GroupState } from '../models/GroupState.model';

import * as uuid from "nativescript-uuid";
import { WriteUserAction } from '../store/user/user.actions';

@Component({
	moduleId: module.id,
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
 
	constructor(private hueService: HueService,
				private _store: Store<User>) { }

	doUnsubscribe = false;
	ipAddress = "";
	username = "";

	subscription: Subscription;

	ngOnInit() {
		// ping the bridge every 2 seconds until it is pressed
		this.subscription = interval(2000).subscribe(() => {
			this.hueService.findBridgeIp().subscribe(ip => {
				if (this.doUnsubscribe) {
					this.handleCreateUser();
					// sub.unsubscribe();
					// this.router.navigate(['/home']);
				}

				this.ipAddress = ip[0]["internalipaddress"];

				if (this.doUnsubscribe === false && this.ipAddress) {
					console.log('Press the button on the bridge');
					this.hueService.createUser(this.ipAddress)
						.subscribe(res => {
							if (res[0]["success"]) {
								this.username = res[0]["success"]["username"];
								console.log('created username ' + this.username);
								// this.handleCreateUser();
								this.doUnsubscribe = true;
							}
					});
				} else {
					console.log('Could not locate a brige.');
				}
			});
		});
	}

	public handleCreateUser() {
		var deviceUuid = uuid.getUUID();
		console.log('Saving user with device uuid: ' + deviceUuid);
		let user: User = {
			alias: 'TEST',
			uuid: deviceUuid,
			bridgeIpAddress: this.ipAddress,
			username: this.username,
			refreshToken: '',
			accessToken: '',
			groupStates: [
				new GroupState("1", "O3MwvjfktgOHlRF"),
				new GroupState("2", "X9MZ5qWaoQd8ZrX"),
				new GroupState("3", "uVYKNKrZfxUQHHt")
			]
		};

		console.log("dispatching create user action to store");
		this._store.dispatch(new WriteUserAction(deviceUuid, user));
		this.subscription.unsubscribe();
	}
}
