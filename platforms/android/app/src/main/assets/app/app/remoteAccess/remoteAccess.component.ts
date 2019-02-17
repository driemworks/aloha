import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import {WebView, LoadEventData} from "tns-core-modules/ui/web-view";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { GetAccessTokenAction } from '../store/hue/hue.actions';
import { Router } from '@angular/router';

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
	user: User;

	constructor(private _store: Store<any>,
				private router: Router) { }

	ngOnInit() {
		this.subscription = this._store.select((state: any) => state.appState.user).subscribe(user => {
			this.user = user;
		});
	}

	ngAfterViewInit() {
		console.log('ngAfterViewInit')
		let webView = this.webViewRef.nativeElement;
		this.webViewSubscription = webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
			var containsCode = !this.code && args.url && args.url.includes('aloha://home');
			if (args.error || containsCode) {
				// we have retrieved the code from the philips hue portal
				if (args.url) {
					this.code = args.url.split('code')[1].split('&')[0].split("=")[1]
					this._store.dispatch(new GetAccessTokenAction(this.code, this.user));
					this.router.navigate(['/home']);
				}
			} else if (!containsCode && !this.code) {
				// want to only allow user to either login to the portal or accept/rejection permission request
				// re-route to authorization url
				console.log('Refreshing page..')
				this.router.navigate(['/remote-access']);
			}
		});
	}

	ngOnDestroy() {
		this.webViewSubscription.unsubscribe();
		this.subscription.unsubscribe();
	}
}
