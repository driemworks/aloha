"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var web_view_1 = require("tns-core-modules/ui/web-view");
var store_1 = require("@ngrx/store");
var operators_1 = require("rxjs/operators");
var user_actions_1 = require("../store/actions/user.actions");
var RemoteAccessComponent = /** @class */ (function () {
    function RemoteAccessComponent(_store) {
        var _this = this;
        this._store = _store;
        this.authorizationUrl = "https://account.meethue.com/get-token/?client_id=k4ADndV7XhGKLPlGDwROqZYb1YeO2Eff&response_type=code&state=xUvdhs&devicename=LGD85095b7d552&appid=aloha&deviceid=001788fffe662a1c&redirect_url_base=aloha%3A%2F%2Fhome&app_name=Aloha";
        this.code = '';
        this.user = null;
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
                console.log('the webview url is: ' + _this.webViewRef.nativeElement.src);
                if (_this.webViewRef.nativeElement.src != _this.authorizationUrl) {
                    console.log('Rerouting to authorization url');
                    _this.webViewRef.nativeElement.src = _this.authorizationUrl;
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
        __metadata("design:paramtypes", [store_1.Store])
    ], RemoteAccessComponent);
    return RemoteAccessComponent;
}());
exports.RemoteAccessComponent = RemoteAccessComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlQWNjZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbW90ZUFjY2Vzcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0Y7QUFDcEYseURBQW9FO0FBRXBFLHFDQUFvQztBQUlwQyw0Q0FBc0M7QUFDdEMsOERBQW9IO0FBU3BIO0lBVUMsK0JBQW9CLE1BQWtCO1FBQXRDLGlCQUlDO1FBSm1CLFdBQU0sR0FBTixNQUFNLENBQVk7UUFOdEMscUJBQWdCLEdBQUcsdU9BQXVPLENBQUM7UUFDM1AsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUdsQixTQUFJLEdBQVMsSUFBSSxDQUFDO1FBR2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQzFFLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELHdDQUFRLEdBQVIsY0FBYSxDQUFDO0lBRWQsK0NBQWUsR0FBZjtRQUFBLGlCQXVCQztRQXRCQSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDNUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsa0JBQU8sQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLElBQW1CO1lBQ3BGLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsS0FBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO2dCQUNoRSx5REFBeUQ7Z0JBQ3pELEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDakUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksbUNBQW9CLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzFELGtDQUFrQztnQkFDbEMsNEJBQTRCO2FBQzVCO2lCQUFNO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztnQkFDeEMsK0ZBQStGO2dCQUMvRixnQ0FBZ0M7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hFLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO29CQUM5QyxLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDO2lCQUMxRDthQUNEO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsMkNBQVcsR0FBWDtRQUNDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUE1Q3FCO1FBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDO2tDQUFhLGlCQUFVOzZEQUFDO0lBRmpDLHFCQUFxQjtRQVBqQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDM0MsQ0FBQzt5Q0FZMkIsYUFBSztPQVZyQixxQkFBcUIsQ0ErQ2pDO0lBQUQsNEJBQUM7Q0FBQSxBQS9DRCxJQStDQztBQS9DWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7V2ViVmlldywgTG9hZEV2ZW50RGF0YX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvd2ViLXZpZXdcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IEh1ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9odWUuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9tb2RlbHMvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgR0VUX0FDQ0VTU19UT0tFTiwgR2V0QWNjZXNzVG9rZW5BY3Rpb24sIFdyaXRlVXNlckFjdGlvbiwgV1JJVEVfVVNFUiB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMvdXNlci5hY3Rpb25zJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAncmVtb3RlQWNjZXNzJyxcblx0dGVtcGxhdGVVcmw6ICcuL3JlbW90ZUFjY2Vzcy5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL3JlbW90ZUFjY2Vzcy5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBSZW1vdGVBY2Nlc3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cblx0QFZpZXdDaGlsZChcIndlYlZpZXdcIikgd2ViVmlld1JlZjogRWxlbWVudFJlZjtcblxuXHRhdXRob3JpemF0aW9uVXJsID0gXCJodHRwczovL2FjY291bnQubWVldGh1ZS5jb20vZ2V0LXRva2VuLz9jbGllbnRfaWQ9azRBRG5kVjdYaEdLTFBsR0R3Uk9xWlliMVllTzJFZmYmcmVzcG9uc2VfdHlwZT1jb2RlJnN0YXRlPXhVdmRocyZkZXZpY2VuYW1lPUxHRDg1MDk1YjdkNTUyJmFwcGlkPWFsb2hhJmRldmljZWlkPTAwMTc4OGZmZmU2NjJhMWMmcmVkaXJlY3RfdXJsX2Jhc2U9YWxvaGElM0ElMkYlMkZob21lJmFwcF9uYW1lPUFsb2hhXCI7XG5cdGNvZGU6IFN0cmluZyA9ICcnO1xuXHR3ZWJWaWV3U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cdHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXHR1c2VyOiBVc2VyID0gbnVsbDtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9zdG9yZTogU3RvcmU8YW55Pikge1xuXHRcdHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5fc3RvcmUuc2VsZWN0KCd1c2VyJykucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUodXNlciA9PiB7XG5cdFx0XHR0aGlzLnVzZXIgPSB1c2VyO1xuXHRcdH0pO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7IH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0Y29uc29sZS5sb2coJ25nQWZ0ZXJWaWV3SW5pdCcpXG5cdFx0bGV0IHdlYlZpZXcgPSB0aGlzLndlYlZpZXdSZWYubmF0aXZlRWxlbWVudDtcblx0XHR0aGlzLndlYlZpZXdTdWJzY3JpcHRpb24gPSB3ZWJWaWV3Lm9uKFdlYlZpZXcubG9hZEZpbmlzaGVkRXZlbnQsIChhcmdzOiBMb2FkRXZlbnREYXRhKSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZygndXJsOiAnICsgYXJncy51cmwpO1xuXHRcdFx0aWYgKCF0aGlzLmNvZGUgJiYgYXJncy51cmwgJiYgYXJncy51cmwuaW5jbHVkZXMoJ2Fsb2hhOi8vaG9tZScpKSB7XG5cdFx0XHRcdC8vIHdlIGhhdmUgcmV0cmlldmVkIHRoZSBjb2RlIGZyb20gdGhlIHBoaWxpcHMgaHVlIHBvcnRhbFxuXHRcdFx0XHR0aGlzLmNvZGUgPSBhcmdzLnVybC5zcGxpdCgnY29kZScpWzFdLnNwbGl0KCcmJylbMF0uc3BsaXQoXCI9XCIpWzFdXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiRm91bmQgdGhlIGNvZGU6IFwiICsgdGhpcy5jb2RlKTtcblx0XHRcdFx0dGhpcy5fc3RvcmUuZGlzcGF0Y2gobmV3IEdldEFjY2Vzc1Rva2VuQWN0aW9uKHRoaXMuY29kZSkpO1xuXHRcdFx0XHQvLyB0aGlzLmdldEFjY2Vzc1Rva2VuKHRoaXMuY29kZSk7XG5cdFx0XHRcdC8vIHdlYlZpZXcuY2xvc2VNb2RhbCgpO1x0XHRcdFx0XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnaGV5IHRoZSB1cmwgaGFzIGNoYW5nZWQuJyk7XG5cdFx0XHRcdC8vIHdhbnQgdG8gb25seSBhbGxvdyB1c2VyIHRvIGVpdGhlciBsb2dpbiB0byB0aGUgcG9ydGFsIG9yIGFjY2VwdC9yZWplY3Rpb24gcGVybWlzc2lvbiByZXF1ZXN0XG5cdFx0XHRcdC8vIHJlLXJvdXRlIHRvIGF1dGhvcml6YXRpb24gdXJsXG5cdFx0XHRcdGNvbnNvbGUubG9nKCd0aGUgd2VidmlldyB1cmwgaXM6ICcgKyB0aGlzLndlYlZpZXdSZWYubmF0aXZlRWxlbWVudC5zcmMpO1xuXHRcdFx0XHRpZiAodGhpcy53ZWJWaWV3UmVmLm5hdGl2ZUVsZW1lbnQuc3JjICE9IHRoaXMuYXV0aG9yaXphdGlvblVybCkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdSZXJvdXRpbmcgdG8gYXV0aG9yaXphdGlvbiB1cmwnKTtcblx0XHRcdFx0XHR0aGlzLndlYlZpZXdSZWYubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmF1dGhvcml6YXRpb25Vcmw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdHRoaXMud2ViVmlld1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXHRcdHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cdH1cbn1cbiJdfQ==