"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var web_view_1 = require("tns-core-modules/ui/web-view");
var store_1 = require("@ngrx/store");
var hue_actions_1 = require("../store/hue/hue.actions");
var router_1 = require("@angular/router");
var RemoteAccessComponent = /** @class */ (function () {
    function RemoteAccessComponent(_store, router) {
        this._store = _store;
        this.router = router;
        this.authorizationUrl = "https://account.meethue.com/get-token/?client_id=k4ADndV7XhGKLPlGDwROqZYb1YeO2Eff&response_type=code&state=xUvdhs&devicename=LGD85095b7d552&appid=aloha&deviceid=001788fffe662a1c&redirect_url_base=aloha%3A%2F%2Fhome&app_name=Aloha";
        this.code = '';
    }
    RemoteAccessComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this._store.select(function (state) { return state.appState.user; }).subscribe(function (user) {
            _this.user = user;
        });
    };
    RemoteAccessComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        console.log('ngAfterViewInit');
        var webView = this.webViewRef.nativeElement;
        this.webViewSubscription = webView.on(web_view_1.WebView.loadFinishedEvent, function (args) {
            var containsCode = !_this.code && args.url && args.url.includes('aloha://home');
            if (args.error || containsCode) {
                // we have retrieved the code from the philips hue portal
                if (args.url) {
                    _this.code = args.url.split('code')[1].split('&')[0].split("=")[1];
                    _this._store.dispatch(new hue_actions_1.GetAccessTokenAction(_this.code, _this.user));
                    _this.router.navigate(['/home']);
                }
            }
            else if (!containsCode && !_this.code) {
                // want to only allow user to either login to the portal or accept/rejection permission request
                // re-route to authorization url
                console.log('Refreshing page..');
                _this.router.navigate(['/remote-access']);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlQWNjZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbW90ZUFjY2Vzcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0Y7QUFDcEYseURBQW9FO0FBQ3BFLHFDQUFvQztBQUdwQyx3REFBZ0U7QUFDaEUsMENBQXlDO0FBU3pDO0lBVUMsK0JBQW9CLE1BQWtCLEVBQzNCLE1BQWM7UUFETCxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQzNCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFQekIscUJBQWdCLEdBQUcsdU9BQXVPLENBQUM7UUFDM1AsU0FBSSxHQUFXLEVBQUUsQ0FBQztJQU1XLENBQUM7SUFFOUIsd0NBQVEsR0FBUjtRQUFBLGlCQUlDO1FBSEEsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQVUsSUFBSyxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFuQixDQUFtQixDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUN6RixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCwrQ0FBZSxHQUFmO1FBQUEsaUJBbUJDO1FBbEJBLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUM5QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUM1QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxrQkFBTyxDQUFDLGlCQUFpQixFQUFFLFVBQUMsSUFBbUI7WUFDcEYsSUFBSSxZQUFZLEdBQUcsQ0FBQyxLQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDL0UsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLFlBQVksRUFBRTtnQkFDL0IseURBQXlEO2dCQUN6RCxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ2IsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUNqRSxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGtDQUFvQixDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3JFLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztpQkFDaEM7YUFDRDtpQkFBTSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsS0FBSSxDQUFDLElBQUksRUFBRTtnQkFDdkMsK0ZBQStGO2dCQUMvRixnQ0FBZ0M7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtnQkFDaEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7YUFDekM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FBQ0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQXpDcUI7UUFBckIsZ0JBQVMsQ0FBQyxTQUFTLENBQUM7a0NBQWEsaUJBQVU7NkRBQUM7SUFGakMscUJBQXFCO1FBUGpDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztTQUMzQyxDQUFDO3lDQVkyQixhQUFLO1lBQ2QsZUFBTTtPQVhiLHFCQUFxQixDQTRDakM7SUFBRCw0QkFBQztDQUFBLEFBNUNELElBNENDO0FBNUNZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtXZWJWaWV3LCBMb2FkRXZlbnREYXRhfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS93ZWItdmlld1wiO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9tb2RlbHMvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBHZXRBY2Nlc3NUb2tlbkFjdGlvbiB9IGZyb20gJy4uL3N0b3JlL2h1ZS9odWUuYWN0aW9ucyc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdyZW1vdGVBY2Nlc3MnLFxuXHR0ZW1wbGF0ZVVybDogJy4vcmVtb3RlQWNjZXNzLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vcmVtb3RlQWNjZXNzLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFJlbW90ZUFjY2Vzc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuXHRAVmlld0NoaWxkKFwid2ViVmlld1wiKSB3ZWJWaWV3UmVmOiBFbGVtZW50UmVmO1xuXG5cdGF1dGhvcml6YXRpb25VcmwgPSBcImh0dHBzOi8vYWNjb3VudC5tZWV0aHVlLmNvbS9nZXQtdG9rZW4vP2NsaWVudF9pZD1rNEFEbmRWN1hoR0tMUGxHRHdST3FaWWIxWWVPMkVmZiZyZXNwb25zZV90eXBlPWNvZGUmc3RhdGU9eFV2ZGhzJmRldmljZW5hbWU9TEdEODUwOTViN2Q1NTImYXBwaWQ9YWxvaGEmZGV2aWNlaWQ9MDAxNzg4ZmZmZTY2MmExYyZyZWRpcmVjdF91cmxfYmFzZT1hbG9oYSUzQSUyRiUyRmhvbWUmYXBwX25hbWU9QWxvaGFcIjtcblx0Y29kZTogU3RyaW5nID0gJyc7XG5cdHdlYlZpZXdTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblx0c3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cdHVzZXI6IFVzZXI7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBfc3RvcmU6IFN0b3JlPGFueT4sXG5cdFx0XHRcdHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHsgfVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5fc3RvcmUuc2VsZWN0KChzdGF0ZTogYW55KSA9PiBzdGF0ZS5hcHBTdGF0ZS51c2VyKS5zdWJzY3JpYmUodXNlciA9PiB7XG5cdFx0XHR0aGlzLnVzZXIgPSB1c2VyO1xuXHRcdH0pO1xuXHR9XG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdGNvbnNvbGUubG9nKCduZ0FmdGVyVmlld0luaXQnKVxuXHRcdGxldCB3ZWJWaWV3ID0gdGhpcy53ZWJWaWV3UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cdFx0dGhpcy53ZWJWaWV3U3Vic2NyaXB0aW9uID0gd2ViVmlldy5vbihXZWJWaWV3LmxvYWRGaW5pc2hlZEV2ZW50LCAoYXJnczogTG9hZEV2ZW50RGF0YSkgPT4ge1xuXHRcdFx0dmFyIGNvbnRhaW5zQ29kZSA9ICF0aGlzLmNvZGUgJiYgYXJncy51cmwgJiYgYXJncy51cmwuaW5jbHVkZXMoJ2Fsb2hhOi8vaG9tZScpO1xuXHRcdFx0aWYgKGFyZ3MuZXJyb3IgfHwgY29udGFpbnNDb2RlKSB7XG5cdFx0XHRcdC8vIHdlIGhhdmUgcmV0cmlldmVkIHRoZSBjb2RlIGZyb20gdGhlIHBoaWxpcHMgaHVlIHBvcnRhbFxuXHRcdFx0XHRpZiAoYXJncy51cmwpIHtcblx0XHRcdFx0XHR0aGlzLmNvZGUgPSBhcmdzLnVybC5zcGxpdCgnY29kZScpWzFdLnNwbGl0KCcmJylbMF0uc3BsaXQoXCI9XCIpWzFdXG5cdFx0XHRcdFx0dGhpcy5fc3RvcmUuZGlzcGF0Y2gobmV3IEdldEFjY2Vzc1Rva2VuQWN0aW9uKHRoaXMuY29kZSwgdGhpcy51c2VyKSk7XG5cdFx0XHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvaG9tZSddKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICghY29udGFpbnNDb2RlICYmICF0aGlzLmNvZGUpIHtcblx0XHRcdFx0Ly8gd2FudCB0byBvbmx5IGFsbG93IHVzZXIgdG8gZWl0aGVyIGxvZ2luIHRvIHRoZSBwb3J0YWwgb3IgYWNjZXB0L3JlamVjdGlvbiBwZXJtaXNzaW9uIHJlcXVlc3Rcblx0XHRcdFx0Ly8gcmUtcm91dGUgdG8gYXV0aG9yaXphdGlvbiB1cmxcblx0XHRcdFx0Y29uc29sZS5sb2coJ1JlZnJlc2hpbmcgcGFnZS4uJylcblx0XHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcmVtb3RlLWFjY2VzcyddKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdHRoaXMud2ViVmlld1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXHRcdHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cdH1cbn1cbiJdfQ==