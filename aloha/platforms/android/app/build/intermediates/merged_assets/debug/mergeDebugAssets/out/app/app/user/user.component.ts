import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { interval } from 'rxjs';
import { Router, Route } from '@angular/router';
import {WebView, LoadEventData} from "tns-core-modules/ui/web-view";
import { Page } from 'tns-core-modules/ui/page/page';
import { HueService } from '../services/hue.service';
import { FileService } from '../services/file.service';
import { Store } from '@ngrx/store';
import { User } from '../models/user.model';
import { WRITE_USER } from '../store/actions/user.actions';
import { GroupState } from '../models/GroupState.model';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
	moduleId: module.id,
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
 
	constructor(private hueService: HueService,
				private fileService: FileService,
				private router: Router,
				private _store: Store<User>) { }

	doUnsubscribe = false;
	ipAddress = "";
	username = "";

	ngOnInit() {
		// ping the bridge every 2 seconds until it is pressed
		const sub = interval(2000).subscribe(() => {
			this.hueService.findBridgeIp().subscribe(ip => {
				if (this.doUnsubscribe) {
					sub.unsubscribe();
					this.router.navigate(['/home']);
				}

				this.ipAddress = ip[0]["internalipaddress"];

				if (this.ipAddress) {
					console.log('Press the button on the bridge');
					this.hueService.createUser(this.ipAddress)
						.subscribe(res => {
							if (res[0]["success"]) {
								this.username = res[0]["success"]["username"];
								console.log('created username ' + this.username);
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
		let user: User = {
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
		this._store.dispatch({
			type: WRITE_USER,
			payload: {
				user: user
			}
		});
	}

	// ngAfterViewInit() {
	// 	console.log('ngAfterViewInit')
	// 	let webView = this.webViewRef.nativeElement;
	// 	webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
	// 		console.log('url: ' + args.url);
	// 		if (!this.code && args.url && args.url.includes('aloha://home')) {
	// 			// we have retrieved the code from the philips hue portal
	// 			this.code = args.url.split('code')[1].split('&')[0].split("=")[1]
	// 			console.log("Found the code: " + this.code);
	// 			// this.hueService.getAccessToken(this.code, this.clientId, this.clientSecret).subscribe(res => {
	// 			// 	console.log(res);
	// 			// });
	// 			this.handleCreateUser();
	// 			this.router.navigate(['/home']);
	// 			// this.doShowWebView = false;
	// 		} else {
	// 			console.log('Rerouting to authorization url');
	// 			// want to only allow user to either login to the portal or accept/rejection permission request
	// 			// re-route to authorization url
	// 			this.webViewRef.nativeElement.src = this.authorizationUrl;
	// 		}
	// 	});
	// }
	
}
