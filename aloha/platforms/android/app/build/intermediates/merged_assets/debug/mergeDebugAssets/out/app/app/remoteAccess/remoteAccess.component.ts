import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import {WebView, LoadEventData} from "tns-core-modules/ui/web-view";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HueService } from '../services/hue.service';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { take } from 'rxjs/operators';
import { GET_ACCESS_TOKEN, GetAccessTokenAction, WriteUserAction, WRITE_USER } from '../store/actions/user.actions';

@Component({
	moduleId: module.id,
	selector: 'remoteAccess',
	templateUrl: './remoteAccess.component.html',
	styleUrls: ['./remoteAccess.component.css']
})

export class RemoteAccessComponent implements OnInit, OnDestroy {

	@ViewChild("webView") webViewRef: ElementRef;

	authorizationUrl = "https://account.meethue.com/get-token/?client_id=k4ADndV7XhGKLPlGDwROqZYb1YeO2Eff&response_type=code&state=xUvdhs&devicename=LGD85095b7d552&appid=aloha&deviceid=001788fffe662a1c&redirect_url_base=aloha%3A%2F%2Fhome&app_name=Aloha";
	code: String = '';
	webViewSubscription: Subscription;
	subscription: Subscription;
	user: User = null;

	showWebview = true;

	// TODO move + encrypt
	clientId = "k4ADndV7XhGKLPlGDwROqZYb1YeO2Eff";
	clientSecret = "7lhGAeAJ0kJ9GsFF";

	constructor(private router: Router,
				private hueService: HueService,
				private _store: Store<any>) {
		this.subscription = this._store.select('user').pipe(take(1)).subscribe(user => {
			this.user = user;
		});
	}

	ngOnInit() { }

	ngAfterViewInit() {
		console.log('ngAfterViewInit')
		let webView = this.webViewRef.nativeElement;
		this.webViewSubscription = webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
			console.log('url: ' + args.url);
			if (!this.code && args.url && args.url.includes('aloha://home')) {
				this.showWebview = false;
				// we have retrieved the code from the philips hue portal
				this.code = args.url.split('code')[1].split('&')[0].split("=")[1]
				console.log("Found the code: " + this.code);
				this._store.dispatch(new GetAccessTokenAction(this.code));
				// this.getAccessToken(this.code);
				// webView.closeModal();				
			} else {
				console.log('hey the url has changed.');
				// want to only allow user to either login to the portal or accept/rejection permission request
				// re-route to authorization url
				if (this.webViewRef.nativeElement.src != this.authorizationUrl) {
					this.webViewRef.nativeElement.src = this.authorizationUrl;
					console.log('Rerouting to authorization url');
				}
			}
		});
	}

	// getAccessToken(code) {
    //     this.subscription = this.hueService.getAccessToken(code)   
    //         .subscribe(res => {
	// 			console.log('Response: ' + JSON.stringify(res));
	// 			let accessToken = res.access_token;
	// 			let refreshToken = res.refresh_token;
	// 			console.log('Found tokens: ' + accessToken + ', ' + refreshToken);
	// 			this.user.accessToken = accessToken;
	// 			this.user.refreshToken = refreshToken;

	// 			console.log('User: ' + JSON.stringify(this.user));
	// 			this._store.dispatch({
	// 				type: WRITE_USER,
	// 				body: {
	// 					user: this.user
	// 				}
	// 			});
	// 			this.router.navigate(['/home']);
    //         }, err => {
	// 			console.log('Encountered error: ' + JSON.stringify(err))
	// 		});
    // }

	ngOnDestroy() {
		this.webViewSubscription.unsubscribe();
		this.subscription.unsubscribe();
	}
}
