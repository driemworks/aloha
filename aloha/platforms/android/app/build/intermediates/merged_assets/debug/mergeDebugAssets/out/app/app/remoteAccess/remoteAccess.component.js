"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var web_view_1 = require("tns-core-modules/ui/web-view");
var router_1 = require("@angular/router");
var store_1 = require("@ngrx/store");
var hue_service_1 = require("../services/hue.service");
var operators_1 = require("rxjs/operators");
var user_actions_1 = require("../store/actions/user.actions");
var RemoteAccessComponent = /** @class */ (function () {
    function RemoteAccessComponent(router, hueService, _store) {
        var _this = this;
        this.router = router;
        this.hueService = hueService;
        this._store = _store;
        this.authorizationUrl = "https://account.meethue.com/get-token/?client_id=k4ADndV7XhGKLPlGDwROqZYb1YeO2Eff&response_type=code&state=xUvdhs&devicename=LGD85095b7d552&appid=aloha&deviceid=001788fffe662a1c&redirect_url_base=aloha%3A%2F%2Fhome&app_name=Aloha";
        this.code = '';
        this.user = null;
        this.showWebview = true;
        // TODO move + encrypt
        this.clientId = "k4ADndV7XhGKLPlGDwROqZYb1YeO2Eff";
        this.clientSecret = "7lhGAeAJ0kJ9GsFF";
        this.subscription = this._store.select('user').pipe(operators_1.take(1)).subscribe(function (user) {
            _this.user = user;
        });
    }
    RemoteAccessComponent.prototype.ngOnInit = function () { };
    RemoteAccessComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        console.log('ngAfterViewInit');
        var webView = this.webViewRef.nativeElement;
        this.webViewSubscription = webView.on(web_view_1.WebView.loadFinishedEvent, function (args) {
            console.log('url: ' + args.url);
            if (!_this.code && args.url && args.url.includes('aloha://home')) {
                _this.showWebview = false;
                // we have retrieved the code from the philips hue portal
                _this.code = args.url.split('code')[1].split('&')[0].split("=")[1];
                console.log("Found the code: " + _this.code);
                _this._store.dispatch(new user_actions_1.GetAccessTokenAction(_this.code));
                // this.getAccessToken(this.code);
                // webView.closeModal();				
            }
            else {
                console.log('hey the url has changed.');
                // want to only allow user to either login to the portal or accept/rejection permission request
                // re-route to authorization url
                if (_this.webViewRef.nativeElement.src != _this.authorizationUrl) {
                    _this.webViewRef.nativeElement.src = _this.authorizationUrl;
                    console.log('Rerouting to authorization url');
                }
            }
        });
    };
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
    RemoteAccessComponent.prototype.ngOnDestroy = function () {
        this.webViewSubscription.unsubscribe();
        this.subscription.unsubscribe();
    };
    __decorate([
        core_1.ViewChild("webView"),
        __metadata("design:type", core_1.ElementRef)
    ], RemoteAccessComponent.prototype, "webViewRef", void 0);
    RemoteAccessComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'remoteAccess',
            templateUrl: './remoteAccess.component.html',
            styleUrls: ['./remoteAccess.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            hue_service_1.HueService,
            store_1.Store])
    ], RemoteAccessComponent);
    return RemoteAccessComponent;
}());
exports.RemoteAccessComponent = RemoteAccessComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlQWNjZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbW90ZUFjY2Vzcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0Y7QUFDcEYseURBQW9FO0FBQ3BFLDBDQUF5QztBQUN6QyxxQ0FBb0M7QUFDcEMsdURBQXFEO0FBR3JELDRDQUFzQztBQUN0Qyw4REFBb0g7QUFTcEg7SUFnQkMsK0JBQW9CLE1BQWMsRUFDdkIsVUFBc0IsRUFDdEIsTUFBa0I7UUFGN0IsaUJBTUM7UUFObUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUN2QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFkN0IscUJBQWdCLEdBQUcsdU9BQXVPLENBQUM7UUFDM1AsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUdsQixTQUFJLEdBQVMsSUFBSSxDQUFDO1FBRWxCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRW5CLHNCQUFzQjtRQUN0QixhQUFRLEdBQUcsa0NBQWtDLENBQUM7UUFDOUMsaUJBQVksR0FBRyxrQkFBa0IsQ0FBQztRQUtqQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUMxRSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCx3Q0FBUSxHQUFSLGNBQWEsQ0FBQztJQUVkLCtDQUFlLEdBQWY7UUFBQSxpQkF1QkM7UUF0QkEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQzlCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQzVDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLGtCQUFPLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxJQUFtQjtZQUNwRixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTtnQkFDaEUsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ3pCLHlEQUF5RDtnQkFDekQsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNqRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxtQ0FBb0IsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDMUQsa0NBQWtDO2dCQUNsQyw0QkFBNEI7YUFDNUI7aUJBQU07Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2dCQUN4QywrRkFBK0Y7Z0JBQy9GLGdDQUFnQztnQkFDaEMsSUFBSSxLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksS0FBSSxDQUFDLGdCQUFnQixFQUFFO29CQUMvRCxLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDO29CQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7aUJBQzlDO2FBQ0Q7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCx5QkFBeUI7SUFDdEIsa0VBQWtFO0lBQ2xFLDhCQUE4QjtJQUNqQyxzREFBc0Q7SUFDdEQseUNBQXlDO0lBQ3pDLDJDQUEyQztJQUMzQyx3RUFBd0U7SUFDeEUsMENBQTBDO0lBQzFDLDRDQUE0QztJQUU1Qyx3REFBd0Q7SUFDeEQsNEJBQTRCO0lBQzVCLHdCQUF3QjtJQUN4QixjQUFjO0lBQ2QsdUJBQXVCO0lBQ3ZCLFFBQVE7SUFDUixTQUFTO0lBQ1Qsc0NBQXNDO0lBQ25DLHNCQUFzQjtJQUN6Qiw4REFBOEQ7SUFDOUQsUUFBUTtJQUNMLElBQUk7SUFFUCwyQ0FBVyxHQUFYO1FBQ0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQTNFcUI7UUFBckIsZ0JBQVMsQ0FBQyxTQUFTLENBQUM7a0NBQWEsaUJBQVU7NkRBQUM7SUFGakMscUJBQXFCO1FBUGpDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztTQUMzQyxDQUFDO3lDQWtCMkIsZUFBTTtZQUNYLHdCQUFVO1lBQ2QsYUFBSztPQWxCWixxQkFBcUIsQ0E4RWpDO0lBQUQsNEJBQUM7Q0FBQSxBQTlFRCxJQThFQztBQTlFWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7V2ViVmlldywgTG9hZEV2ZW50RGF0YX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvd2ViLXZpZXdcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IEh1ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9odWUuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9tb2RlbHMvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgR0VUX0FDQ0VTU19UT0tFTiwgR2V0QWNjZXNzVG9rZW5BY3Rpb24sIFdyaXRlVXNlckFjdGlvbiwgV1JJVEVfVVNFUiB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMvdXNlci5hY3Rpb25zJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAncmVtb3RlQWNjZXNzJyxcblx0dGVtcGxhdGVVcmw6ICcuL3JlbW90ZUFjY2Vzcy5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL3JlbW90ZUFjY2Vzcy5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBSZW1vdGVBY2Nlc3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cblx0QFZpZXdDaGlsZChcIndlYlZpZXdcIikgd2ViVmlld1JlZjogRWxlbWVudFJlZjtcblxuXHRhdXRob3JpemF0aW9uVXJsID0gXCJodHRwczovL2FjY291bnQubWVldGh1ZS5jb20vZ2V0LXRva2VuLz9jbGllbnRfaWQ9azRBRG5kVjdYaEdLTFBsR0R3Uk9xWlliMVllTzJFZmYmcmVzcG9uc2VfdHlwZT1jb2RlJnN0YXRlPXhVdmRocyZkZXZpY2VuYW1lPUxHRDg1MDk1YjdkNTUyJmFwcGlkPWFsb2hhJmRldmljZWlkPTAwMTc4OGZmZmU2NjJhMWMmcmVkaXJlY3RfdXJsX2Jhc2U9YWxvaGElM0ElMkYlMkZob21lJmFwcF9uYW1lPUFsb2hhXCI7XG5cdGNvZGU6IFN0cmluZyA9ICcnO1xuXHR3ZWJWaWV3U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cdHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXHR1c2VyOiBVc2VyID0gbnVsbDtcblxuXHRzaG93V2VidmlldyA9IHRydWU7XG5cblx0Ly8gVE9ETyBtb3ZlICsgZW5jcnlwdFxuXHRjbGllbnRJZCA9IFwiazRBRG5kVjdYaEdLTFBsR0R3Uk9xWlliMVllTzJFZmZcIjtcblx0Y2xpZW50U2VjcmV0ID0gXCI3bGhHQWVBSjBrSjlHc0ZGXCI7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcblx0XHRcdFx0cHJpdmF0ZSBodWVTZXJ2aWNlOiBIdWVTZXJ2aWNlLFxuXHRcdFx0XHRwcml2YXRlIF9zdG9yZTogU3RvcmU8YW55Pikge1xuXHRcdHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5fc3RvcmUuc2VsZWN0KCd1c2VyJykucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUodXNlciA9PiB7XG5cdFx0XHR0aGlzLnVzZXIgPSB1c2VyO1xuXHRcdH0pO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7IH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0Y29uc29sZS5sb2coJ25nQWZ0ZXJWaWV3SW5pdCcpXG5cdFx0bGV0IHdlYlZpZXcgPSB0aGlzLndlYlZpZXdSZWYubmF0aXZlRWxlbWVudDtcblx0XHR0aGlzLndlYlZpZXdTdWJzY3JpcHRpb24gPSB3ZWJWaWV3Lm9uKFdlYlZpZXcubG9hZEZpbmlzaGVkRXZlbnQsIChhcmdzOiBMb2FkRXZlbnREYXRhKSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZygndXJsOiAnICsgYXJncy51cmwpO1xuXHRcdFx0aWYgKCF0aGlzLmNvZGUgJiYgYXJncy51cmwgJiYgYXJncy51cmwuaW5jbHVkZXMoJ2Fsb2hhOi8vaG9tZScpKSB7XG5cdFx0XHRcdHRoaXMuc2hvd1dlYnZpZXcgPSBmYWxzZTtcblx0XHRcdFx0Ly8gd2UgaGF2ZSByZXRyaWV2ZWQgdGhlIGNvZGUgZnJvbSB0aGUgcGhpbGlwcyBodWUgcG9ydGFsXG5cdFx0XHRcdHRoaXMuY29kZSA9IGFyZ3MudXJsLnNwbGl0KCdjb2RlJylbMV0uc3BsaXQoJyYnKVswXS5zcGxpdChcIj1cIilbMV1cblx0XHRcdFx0Y29uc29sZS5sb2coXCJGb3VuZCB0aGUgY29kZTogXCIgKyB0aGlzLmNvZGUpO1xuXHRcdFx0XHR0aGlzLl9zdG9yZS5kaXNwYXRjaChuZXcgR2V0QWNjZXNzVG9rZW5BY3Rpb24odGhpcy5jb2RlKSk7XG5cdFx0XHRcdC8vIHRoaXMuZ2V0QWNjZXNzVG9rZW4odGhpcy5jb2RlKTtcblx0XHRcdFx0Ly8gd2ViVmlldy5jbG9zZU1vZGFsKCk7XHRcdFx0XHRcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdoZXkgdGhlIHVybCBoYXMgY2hhbmdlZC4nKTtcblx0XHRcdFx0Ly8gd2FudCB0byBvbmx5IGFsbG93IHVzZXIgdG8gZWl0aGVyIGxvZ2luIHRvIHRoZSBwb3J0YWwgb3IgYWNjZXB0L3JlamVjdGlvbiBwZXJtaXNzaW9uIHJlcXVlc3Rcblx0XHRcdFx0Ly8gcmUtcm91dGUgdG8gYXV0aG9yaXphdGlvbiB1cmxcblx0XHRcdFx0aWYgKHRoaXMud2ViVmlld1JlZi5uYXRpdmVFbGVtZW50LnNyYyAhPSB0aGlzLmF1dGhvcml6YXRpb25VcmwpIHtcblx0XHRcdFx0XHR0aGlzLndlYlZpZXdSZWYubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmF1dGhvcml6YXRpb25Vcmw7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ1Jlcm91dGluZyB0byBhdXRob3JpemF0aW9uIHVybCcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBnZXRBY2Nlc3NUb2tlbihjb2RlKSB7XG4gICAgLy8gICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5odWVTZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKGNvZGUpICAgXG4gICAgLy8gICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG5cdC8vIFx0XHRcdGNvbnNvbGUubG9nKCdSZXNwb25zZTogJyArIEpTT04uc3RyaW5naWZ5KHJlcykpO1xuXHQvLyBcdFx0XHRsZXQgYWNjZXNzVG9rZW4gPSByZXMuYWNjZXNzX3Rva2VuO1xuXHQvLyBcdFx0XHRsZXQgcmVmcmVzaFRva2VuID0gcmVzLnJlZnJlc2hfdG9rZW47XG5cdC8vIFx0XHRcdGNvbnNvbGUubG9nKCdGb3VuZCB0b2tlbnM6ICcgKyBhY2Nlc3NUb2tlbiArICcsICcgKyByZWZyZXNoVG9rZW4pO1xuXHQvLyBcdFx0XHR0aGlzLnVzZXIuYWNjZXNzVG9rZW4gPSBhY2Nlc3NUb2tlbjtcblx0Ly8gXHRcdFx0dGhpcy51c2VyLnJlZnJlc2hUb2tlbiA9IHJlZnJlc2hUb2tlbjtcblxuXHQvLyBcdFx0XHRjb25zb2xlLmxvZygnVXNlcjogJyArIEpTT04uc3RyaW5naWZ5KHRoaXMudXNlcikpO1xuXHQvLyBcdFx0XHR0aGlzLl9zdG9yZS5kaXNwYXRjaCh7XG5cdC8vIFx0XHRcdFx0dHlwZTogV1JJVEVfVVNFUixcblx0Ly8gXHRcdFx0XHRib2R5OiB7XG5cdC8vIFx0XHRcdFx0XHR1c2VyOiB0aGlzLnVzZXJcblx0Ly8gXHRcdFx0XHR9XG5cdC8vIFx0XHRcdH0pO1xuXHQvLyBcdFx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9ob21lJ10pO1xuICAgIC8vICAgICAgICAgfSwgZXJyID0+IHtcblx0Ly8gXHRcdFx0Y29uc29sZS5sb2coJ0VuY291bnRlcmVkIGVycm9yOiAnICsgSlNPTi5zdHJpbmdpZnkoZXJyKSlcblx0Ly8gXHRcdH0pO1xuICAgIC8vIH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHR0aGlzLndlYlZpZXdTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblx0XHR0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXHR9XG59XG4iXX0=