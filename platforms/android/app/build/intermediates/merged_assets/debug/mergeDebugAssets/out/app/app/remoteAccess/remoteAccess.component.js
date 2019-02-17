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
                console.log('Refreshing page..');
                _this.router.navigate(['/remote-access']);
                if (_this.webViewRef.nativeElement.src != _this.authorizationUrl) {
                    // the hue website keeps redirecting to the user's main page
                    // console.log('Refreshing page..')
                    // this.router.navigate(['/remote-access']);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlQWNjZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbW90ZUFjY2Vzcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0Y7QUFDcEYseURBQW9FO0FBQ3BFLHFDQUFvQztBQUdwQyx3REFBZ0U7QUFDaEUsMENBQXlDO0FBU3pDO0lBVUMsK0JBQW9CLE1BQWtCLEVBQzNCLE1BQWM7UUFEekIsaUJBS0M7UUFMbUIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUMzQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBUHpCLHFCQUFnQixHQUFHLHVPQUF1TyxDQUFDO1FBQzNQLFNBQUksR0FBVyxFQUFFLENBQUM7UUFHbEIsU0FBSSxHQUFTLElBQUksQ0FBQztRQUlqQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQW5CLENBQW1CLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ3pGLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELHdDQUFRLEdBQVIsY0FBYSxDQUFDO0lBRWQsK0NBQWUsR0FBZjtRQUFBLGlCQXlCQztRQXhCQSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDNUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsa0JBQU8sQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLElBQW1CO1lBQ3BGLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFO2dCQUNoRix5REFBeUQ7Z0JBQ3pELElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDYixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ2pFLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksa0NBQW9CLENBQUMsS0FBSSxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDckU7YUFDRDtpQkFBTTtnQkFDTiwrRkFBK0Y7Z0JBQy9GLGdDQUFnQztnQkFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO2dCQUMvQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksS0FBSSxDQUFDLGdCQUFnQixFQUFFO29CQUMvRCw0REFBNEQ7b0JBQzVELG1DQUFtQztvQkFDbkMsNENBQTRDO29CQUM1Qyx1Q0FBdUM7b0JBQ3ZDLDZEQUE2RDtpQkFDN0Q7YUFDRDtRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELDJDQUFXLEdBQVg7UUFDQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBL0NxQjtRQUFyQixnQkFBUyxDQUFDLFNBQVMsQ0FBQztrQ0FBYSxpQkFBVTs2REFBQztJQUZqQyxxQkFBcUI7UUFQakMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixDQUFDO1NBQzNDLENBQUM7eUNBWTJCLGFBQUs7WUFDZCxlQUFNO09BWGIscUJBQXFCLENBa0RqQztJQUFELDRCQUFDO0NBQUEsQUFsREQsSUFrREM7QUFsRFksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1dlYlZpZXcsIExvYWRFdmVudERhdGF9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3dlYi12aWV3XCI7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEdldEFjY2Vzc1Rva2VuQWN0aW9uIH0gZnJvbSAnLi4vc3RvcmUvaHVlL2h1ZS5hY3Rpb25zJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ3JlbW90ZUFjY2VzcycsXG5cdHRlbXBsYXRlVXJsOiAnLi9yZW1vdGVBY2Nlc3MuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9yZW1vdGVBY2Nlc3MuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgUmVtb3RlQWNjZXNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG5cdEBWaWV3Q2hpbGQoXCJ3ZWJWaWV3XCIpIHdlYlZpZXdSZWY6IEVsZW1lbnRSZWY7XG5cblx0YXV0aG9yaXphdGlvblVybCA9IFwiaHR0cHM6Ly9hY2NvdW50Lm1lZXRodWUuY29tL2dldC10b2tlbi8/Y2xpZW50X2lkPWs0QURuZFY3WGhHS0xQbEdEd1JPcVpZYjFZZU8yRWZmJnJlc3BvbnNlX3R5cGU9Y29kZSZzdGF0ZT14VXZkaHMmZGV2aWNlbmFtZT1MR0Q4NTA5NWI3ZDU1MiZhcHBpZD1hbG9oYSZkZXZpY2VpZD0wMDE3ODhmZmZlNjYyYTFjJnJlZGlyZWN0X3VybF9iYXNlPWFsb2hhJTNBJTJGJTJGaG9tZSZhcHBfbmFtZT1BbG9oYVwiO1xuXHRjb2RlOiBTdHJpbmcgPSAnJztcblx0d2ViVmlld1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXHRzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblx0dXNlcjogVXNlciA9IG51bGw7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBfc3RvcmU6IFN0b3JlPGFueT4sXG5cdFx0XHRcdHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcblx0XHR0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuX3N0b3JlLnNlbGVjdCgoc3RhdGU6IGFueSkgPT4gc3RhdGUuYXBwU3RhdGUudXNlcikuc3Vic2NyaWJlKHVzZXIgPT4ge1xuXHRcdFx0dGhpcy51c2VyID0gdXNlcjtcblx0XHR9KTtcblx0fVxuXG5cdG5nT25Jbml0KCkgeyB9XG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdGNvbnNvbGUubG9nKCduZ0FmdGVyVmlld0luaXQnKVxuXHRcdGxldCB3ZWJWaWV3ID0gdGhpcy53ZWJWaWV3UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cdFx0dGhpcy53ZWJWaWV3U3Vic2NyaXB0aW9uID0gd2ViVmlldy5vbihXZWJWaWV3LmxvYWRGaW5pc2hlZEV2ZW50LCAoYXJnczogTG9hZEV2ZW50RGF0YSkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coJ3VybDogJyArIGFyZ3MudXJsKTtcblx0XHRcdGlmIChhcmdzLmVycm9yIHx8ICghdGhpcy5jb2RlICYmIGFyZ3MudXJsICYmIGFyZ3MudXJsLmluY2x1ZGVzKCdhbG9oYTovL2hvbWUnKSkpIHtcblx0XHRcdFx0Ly8gd2UgaGF2ZSByZXRyaWV2ZWQgdGhlIGNvZGUgZnJvbSB0aGUgcGhpbGlwcyBodWUgcG9ydGFsXG5cdFx0XHRcdGlmIChhcmdzLnVybCkge1xuXHRcdFx0XHRcdHRoaXMuY29kZSA9IGFyZ3MudXJsLnNwbGl0KCdjb2RlJylbMV0uc3BsaXQoJyYnKVswXS5zcGxpdChcIj1cIilbMV1cblx0XHRcdFx0XHR0aGlzLl9zdG9yZS5kaXNwYXRjaChuZXcgR2V0QWNjZXNzVG9rZW5BY3Rpb24odGhpcy5jb2RlLCB0aGlzLnVzZXIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gd2FudCB0byBvbmx5IGFsbG93IHVzZXIgdG8gZWl0aGVyIGxvZ2luIHRvIHRoZSBwb3J0YWwgb3IgYWNjZXB0L3JlamVjdGlvbiBwZXJtaXNzaW9uIHJlcXVlc3Rcblx0XHRcdFx0Ly8gcmUtcm91dGUgdG8gYXV0aG9yaXphdGlvbiB1cmxcblx0XHRcdFx0Y29uc29sZS5sb2coJ1JlZnJlc2hpbmcgcGFnZS4uJylcblx0XHRcdFx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9yZW1vdGUtYWNjZXNzJ10pO1xuXHRcdFx0XHRpZiAodGhpcy53ZWJWaWV3UmVmLm5hdGl2ZUVsZW1lbnQuc3JjICE9IHRoaXMuYXV0aG9yaXphdGlvblVybCkge1xuXHRcdFx0XHRcdC8vIHRoZSBodWUgd2Vic2l0ZSBrZWVwcyByZWRpcmVjdGluZyB0byB0aGUgdXNlcidzIG1haW4gcGFnZVxuXHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdSZWZyZXNoaW5nIHBhZ2UuLicpXG5cdFx0XHRcdFx0Ly8gdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcmVtb3RlLWFjY2VzcyddKTtcblx0XHRcdFx0XHQvLyB3ZWJWaWV3LnNyYyA9IHRoaXMuYXV0aG9yaXphdGlvblVybDtcblx0XHRcdFx0XHQvLyB0aGlzLndlYlZpZXdSZWYubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmF1dGhvcml6YXRpb25Vcmw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdHRoaXMud2ViVmlld1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXHRcdHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cdH1cbn1cbiJdfQ==