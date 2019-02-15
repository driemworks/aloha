"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var web_view_1 = require("tns-core-modules/ui/web-view");
var store_1 = require("@ngrx/store");
var hue_actions_1 = require("../store/hue/hue.actions");
var router_1 = require("@angular/router");
var RemoteAccessComponent = /** @class */ (function () {
    function RemoteAccessComponent(_store, router) {
        var _this = this;
        this._store = _store;
        this.router = router;
        this.authorizationUrl = "https://account.meethue.com/get-token/?client_id=k4ADndV7XhGKLPlGDwROqZYb1YeO2Eff&response_type=code&state=xUvdhs&devicename=LGD85095b7d552&appid=aloha&deviceid=001788fffe662a1c&redirect_url_base=aloha%3A%2F%2Fhome&app_name=Aloha";
        this.code = '';
        this.user = null;
        this.subscription = this._store.select(function (state) { return state.appState.user; }).subscribe(function (user) {
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
            if (args.error || (!_this.code && args.url && args.url.includes('aloha://home'))) {
                // we have retrieved the code from the philips hue portal
                if (args.url) {
                    _this.code = args.url.split('code')[1].split('&')[0].split("=")[1];
                    _this._store.dispatch(new hue_actions_1.GetAccessTokenAction(_this.code, _this.user));
                }
            }
            else {
                // want to only allow user to either login to the portal or accept/rejection permission request
                // re-route to authorization url
                if (_this.webViewRef.nativeElement.src != _this.authorizationUrl) {
                    // the hue website keeps redirecting to the user's main page
                    console.log('Refreshing page..');
                    _this.router.navigate(['/remote-access']);
                    // webView.src = this.authorizationUrl;
                    // this.webViewRef.nativeElement.src = this.authorizationUrl;
                }
            }
        });
    };
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
        __metadata("design:paramtypes", [store_1.Store,
            router_1.Router])
    ], RemoteAccessComponent);
    return RemoteAccessComponent;
}());
exports.RemoteAccessComponent = RemoteAccessComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlQWNjZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbW90ZUFjY2Vzcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0Y7QUFDcEYseURBQW9FO0FBQ3BFLHFDQUFvQztBQUdwQyx3REFBZ0U7QUFDaEUsMENBQXlDO0FBU3pDO0lBVUMsK0JBQW9CLE1BQWtCLEVBQzNCLE1BQWM7UUFEekIsaUJBS0M7UUFMbUIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUMzQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBUHpCLHFCQUFnQixHQUFHLHVPQUF1TyxDQUFDO1FBQzNQLFNBQUksR0FBVyxFQUFFLENBQUM7UUFHbEIsU0FBSSxHQUFTLElBQUksQ0FBQztRQUlqQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQW5CLENBQW1CLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ3pGLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELHdDQUFRLEdBQVIsY0FBYSxDQUFDO0lBRWQsK0NBQWUsR0FBZjtRQUFBLGlCQXVCQztRQXRCQSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDNUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsa0JBQU8sQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLElBQW1CO1lBQ3BGLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFO2dCQUNoRix5REFBeUQ7Z0JBQ3pELElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDYixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ2pFLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksa0NBQW9CLENBQUMsS0FBSSxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDckU7YUFDRDtpQkFBTTtnQkFDTiwrRkFBK0Y7Z0JBQy9GLGdDQUFnQztnQkFDaEMsSUFBSSxLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksS0FBSSxDQUFDLGdCQUFnQixFQUFFO29CQUMvRCw0REFBNEQ7b0JBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtvQkFDaEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLHVDQUF1QztvQkFDdkMsNkRBQTZEO2lCQUM3RDthQUNEO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsMkNBQVcsR0FBWDtRQUNDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUE3Q3FCO1FBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDO2tDQUFhLGlCQUFVOzZEQUFDO0lBRmpDLHFCQUFxQjtRQVBqQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDM0MsQ0FBQzt5Q0FZMkIsYUFBSztZQUNkLGVBQU07T0FYYixxQkFBcUIsQ0FnRGpDO0lBQUQsNEJBQUM7Q0FBQSxBQWhERCxJQWdEQztBQWhEWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7V2ViVmlldywgTG9hZEV2ZW50RGF0YX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvd2ViLXZpZXdcIjtcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgR2V0QWNjZXNzVG9rZW5BY3Rpb24gfSBmcm9tICcuLi9zdG9yZS9odWUvaHVlLmFjdGlvbnMnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAncmVtb3RlQWNjZXNzJyxcblx0dGVtcGxhdGVVcmw6ICcuL3JlbW90ZUFjY2Vzcy5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL3JlbW90ZUFjY2Vzcy5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBSZW1vdGVBY2Nlc3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cblx0QFZpZXdDaGlsZChcIndlYlZpZXdcIikgd2ViVmlld1JlZjogRWxlbWVudFJlZjtcblxuXHRhdXRob3JpemF0aW9uVXJsID0gXCJodHRwczovL2FjY291bnQubWVldGh1ZS5jb20vZ2V0LXRva2VuLz9jbGllbnRfaWQ9azRBRG5kVjdYaEdLTFBsR0R3Uk9xWlliMVllTzJFZmYmcmVzcG9uc2VfdHlwZT1jb2RlJnN0YXRlPXhVdmRocyZkZXZpY2VuYW1lPUxHRDg1MDk1YjdkNTUyJmFwcGlkPWFsb2hhJmRldmljZWlkPTAwMTc4OGZmZmU2NjJhMWMmcmVkaXJlY3RfdXJsX2Jhc2U9YWxvaGElM0ElMkYlMkZob21lJmFwcF9uYW1lPUFsb2hhXCI7XG5cdGNvZGU6IFN0cmluZyA9ICcnO1xuXHR3ZWJWaWV3U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cdHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXHR1c2VyOiBVc2VyID0gbnVsbDtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9zdG9yZTogU3RvcmU8YW55Pixcblx0XHRcdFx0cHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuXHRcdHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5fc3RvcmUuc2VsZWN0KChzdGF0ZTogYW55KSA9PiBzdGF0ZS5hcHBTdGF0ZS51c2VyKS5zdWJzY3JpYmUodXNlciA9PiB7XG5cdFx0XHR0aGlzLnVzZXIgPSB1c2VyO1xuXHRcdH0pO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7IH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0Y29uc29sZS5sb2coJ25nQWZ0ZXJWaWV3SW5pdCcpXG5cdFx0bGV0IHdlYlZpZXcgPSB0aGlzLndlYlZpZXdSZWYubmF0aXZlRWxlbWVudDtcblx0XHR0aGlzLndlYlZpZXdTdWJzY3JpcHRpb24gPSB3ZWJWaWV3Lm9uKFdlYlZpZXcubG9hZEZpbmlzaGVkRXZlbnQsIChhcmdzOiBMb2FkRXZlbnREYXRhKSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZygndXJsOiAnICsgYXJncy51cmwpO1xuXHRcdFx0aWYgKGFyZ3MuZXJyb3IgfHwgKCF0aGlzLmNvZGUgJiYgYXJncy51cmwgJiYgYXJncy51cmwuaW5jbHVkZXMoJ2Fsb2hhOi8vaG9tZScpKSkge1xuXHRcdFx0XHQvLyB3ZSBoYXZlIHJldHJpZXZlZCB0aGUgY29kZSBmcm9tIHRoZSBwaGlsaXBzIGh1ZSBwb3J0YWxcblx0XHRcdFx0aWYgKGFyZ3MudXJsKSB7XG5cdFx0XHRcdFx0dGhpcy5jb2RlID0gYXJncy51cmwuc3BsaXQoJ2NvZGUnKVsxXS5zcGxpdCgnJicpWzBdLnNwbGl0KFwiPVwiKVsxXVxuXHRcdFx0XHRcdHRoaXMuX3N0b3JlLmRpc3BhdGNoKG5ldyBHZXRBY2Nlc3NUb2tlbkFjdGlvbih0aGlzLmNvZGUsIHRoaXMudXNlcikpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyB3YW50IHRvIG9ubHkgYWxsb3cgdXNlciB0byBlaXRoZXIgbG9naW4gdG8gdGhlIHBvcnRhbCBvciBhY2NlcHQvcmVqZWN0aW9uIHBlcm1pc3Npb24gcmVxdWVzdFxuXHRcdFx0XHQvLyByZS1yb3V0ZSB0byBhdXRob3JpemF0aW9uIHVybFxuXHRcdFx0XHRpZiAodGhpcy53ZWJWaWV3UmVmLm5hdGl2ZUVsZW1lbnQuc3JjICE9IHRoaXMuYXV0aG9yaXphdGlvblVybCkge1xuXHRcdFx0XHRcdC8vIHRoZSBodWUgd2Vic2l0ZSBrZWVwcyByZWRpcmVjdGluZyB0byB0aGUgdXNlcidzIG1haW4gcGFnZVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdSZWZyZXNoaW5nIHBhZ2UuLicpXG5cdFx0XHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcmVtb3RlLWFjY2VzcyddKTtcblx0XHRcdFx0XHQvLyB3ZWJWaWV3LnNyYyA9IHRoaXMuYXV0aG9yaXphdGlvblVybDtcblx0XHRcdFx0XHQvLyB0aGlzLndlYlZpZXdSZWYubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmF1dGhvcml6YXRpb25Vcmw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdHRoaXMud2ViVmlld1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXHRcdHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cdH1cbn1cbiJdfQ==