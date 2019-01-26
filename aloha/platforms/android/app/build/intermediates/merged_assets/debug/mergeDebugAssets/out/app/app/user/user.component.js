"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var router_1 = require("@angular/router");
var hue_service_1 = require("../services/hue.service");
var file_service_1 = require("../services/file.service");
var store_1 = require("@ngrx/store");
var user_actions_1 = require("../store/actions/user.actions");
var GroupState_model_1 = require("../models/GroupState.model");
var UserComponent = /** @class */ (function () {
    function UserComponent(hueService, fileService, router, _store) {
        this.hueService = hueService;
        this.fileService = fileService;
        this.router = router;
        this._store = _store;
        this.doUnsubscribe = false;
        this.ipAddress = "";
        this.username = "";
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        // ping the bridge every 2 seconds until it is pressed
        var sub = rxjs_1.interval(2000).subscribe(function () {
            _this.hueService.findBridgeIp().subscribe(function (ip) {
                if (_this.doUnsubscribe) {
                    sub.unsubscribe();
                    _this.router.navigate(['/home']);
                }
                _this.ipAddress = ip[0]["internalipaddress"];
                if (_this.ipAddress) {
                    console.log('Press the button on the bridge');
                    _this.hueService.createUser(_this.ipAddress)
                        .subscribe(function (res) {
                        if (res[0]["success"]) {
                            _this.username = res[0]["success"]["username"];
                            console.log('created username ' + _this.username);
                            _this.doUnsubscribe = true;
                        }
                    });
                }
                else {
                    console.log('Could not locate a brige.');
                }
            });
        });
    };
    UserComponent.prototype.handleCreateUser = function () {
        var user = {
            bridgeIpAddress: this.ipAddress,
            username: this.username,
            refreshToken: '',
            accessToken: '',
            groupStates: [
                new GroupState_model_1.GroupState("1", "O3MwvjfktgOHlRF"),
                new GroupState_model_1.GroupState("2", "X9MZ5qWaoQd8ZrX"),
                new GroupState_model_1.GroupState("3", "uVYKNKrZfxUQHHt")
            ]
        };
        console.log("dispatching create user action to store");
        this._store.dispatch({
            type: user_actions_1.WRITE_USER,
            payload: {
                user: user
            }
        });
    };
    UserComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.css']
        }),
        __metadata("design:paramtypes", [hue_service_1.HueService,
            file_service_1.FileService,
            router_1.Router,
            store_1.Store])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFtRztBQUNuRyw2QkFBZ0M7QUFDaEMsMENBQWdEO0FBR2hELHVEQUFxRDtBQUNyRCx5REFBdUQ7QUFDdkQscUNBQW9DO0FBRXBDLDhEQUEyRDtBQUMzRCwrREFBd0Q7QUFVeEQ7SUFFQyx1QkFBb0IsVUFBc0IsRUFDL0IsV0FBd0IsRUFDeEIsTUFBYyxFQUNkLE1BQW1CO1FBSFYsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUMvQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsV0FBTSxHQUFOLE1BQU0sQ0FBYTtRQUU5QixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQUpvQixDQUFDO0lBTW5DLGdDQUFRLEdBQVI7UUFBQSxpQkEwQkM7UUF6QkEsc0RBQXNEO1FBQ3RELElBQU0sR0FBRyxHQUFHLGVBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDcEMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxFQUFFO2dCQUMxQyxJQUFJLEtBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQ3ZCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDbEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUNoQztnQkFFRCxLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUU1QyxJQUFJLEtBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztvQkFDOUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQzt5QkFDeEMsU0FBUyxDQUFDLFVBQUEsR0FBRzt3QkFDYixJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRTs0QkFDdEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNqRCxLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzt5QkFDMUI7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7aUJBQ0g7cUJBQU07b0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2lCQUN6QztZQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU0sd0NBQWdCLEdBQXZCO1FBQ0MsSUFBSSxJQUFJLEdBQVM7WUFDaEIsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQy9CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixZQUFZLEVBQUUsRUFBRTtZQUNoQixXQUFXLEVBQUUsRUFBRTtZQUNmLFdBQVcsRUFBRTtnQkFDWixJQUFJLDZCQUFVLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDO2dCQUN0QyxJQUFJLDZCQUFVLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDO2dCQUN0QyxJQUFJLDZCQUFVLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDO2FBQ3RDO1NBQ0QsQ0FBQztRQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNwQixJQUFJLEVBQUUseUJBQVU7WUFDaEIsT0FBTyxFQUFFO2dCQUNSLElBQUksRUFBRSxJQUFJO2FBQ1Y7U0FDRCxDQUFDLENBQUM7SUFDSixDQUFDO0lBM0RXLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ25DLENBQUM7eUNBSStCLHdCQUFVO1lBQ2xCLDBCQUFXO1lBQ2hCLGVBQU07WUFDTixhQUFLO09BTFosYUFBYSxDQXFGekI7SUFBRCxvQkFBQztDQUFBLEFBckZELElBcUZDO0FBckZZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpbnRlcnZhbCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1dlYlZpZXcsIExvYWRFdmVudERhdGF9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3dlYi12aWV3XCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgSHVlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2h1ZS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZmlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IFdSSVRFX1VTRVIgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zL3VzZXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBHcm91cFN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL0dyb3VwU3RhdGUubW9kZWwnO1xuaW1wb3J0IHsgcm91dGVyTmdQcm9iZVRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyL3NyYy9yb3V0ZXJfbW9kdWxlJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnYXBwLXVzZXInLFxuXHR0ZW1wbGF0ZVVybDogJy4vdXNlci5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL3VzZXIuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgVXNlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgaHVlU2VydmljZTogSHVlU2VydmljZSxcblx0XHRcdFx0cHJpdmF0ZSBmaWxlU2VydmljZTogRmlsZVNlcnZpY2UsXG5cdFx0XHRcdHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG5cdFx0XHRcdHByaXZhdGUgX3N0b3JlOiBTdG9yZTxVc2VyPikgeyB9XG5cblx0ZG9VbnN1YnNjcmliZSA9IGZhbHNlO1xuXHRpcEFkZHJlc3MgPSBcIlwiO1xuXHR1c2VybmFtZSA9IFwiXCI7XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0Ly8gcGluZyB0aGUgYnJpZGdlIGV2ZXJ5IDIgc2Vjb25kcyB1bnRpbCBpdCBpcyBwcmVzc2VkXG5cdFx0Y29uc3Qgc3ViID0gaW50ZXJ2YWwoMjAwMCkuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdHRoaXMuaHVlU2VydmljZS5maW5kQnJpZGdlSXAoKS5zdWJzY3JpYmUoaXAgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5kb1Vuc3Vic2NyaWJlKSB7XG5cdFx0XHRcdFx0c3ViLnVuc3Vic2NyaWJlKCk7XG5cdFx0XHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvaG9tZSddKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuaXBBZGRyZXNzID0gaXBbMF1bXCJpbnRlcm5hbGlwYWRkcmVzc1wiXTtcblxuXHRcdFx0XHRpZiAodGhpcy5pcEFkZHJlc3MpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnUHJlc3MgdGhlIGJ1dHRvbiBvbiB0aGUgYnJpZGdlJyk7XG5cdFx0XHRcdFx0dGhpcy5odWVTZXJ2aWNlLmNyZWF0ZVVzZXIodGhpcy5pcEFkZHJlc3MpXG5cdFx0XHRcdFx0XHQuc3Vic2NyaWJlKHJlcyA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmIChyZXNbMF1bXCJzdWNjZXNzXCJdKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy51c2VybmFtZSA9IHJlc1swXVtcInN1Y2Nlc3NcIl1bXCJ1c2VybmFtZVwiXTtcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnY3JlYXRlZCB1c2VybmFtZSAnICsgdGhpcy51c2VybmFtZSk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5kb1Vuc3Vic2NyaWJlID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdDb3VsZCBub3QgbG9jYXRlIGEgYnJpZ2UuJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0cHVibGljIGhhbmRsZUNyZWF0ZVVzZXIoKSB7XG5cdFx0bGV0IHVzZXI6IFVzZXIgPSB7XG5cdFx0XHRicmlkZ2VJcEFkZHJlc3M6IHRoaXMuaXBBZGRyZXNzLFxuXHRcdFx0dXNlcm5hbWU6IHRoaXMudXNlcm5hbWUsXG5cdFx0XHRyZWZyZXNoVG9rZW46ICcnLFxuXHRcdFx0YWNjZXNzVG9rZW46ICcnLFxuXHRcdFx0Z3JvdXBTdGF0ZXM6IFtcblx0XHRcdFx0bmV3IEdyb3VwU3RhdGUoXCIxXCIsIFwiTzNNd3ZqZmt0Z09IbFJGXCIpLFxuXHRcdFx0XHRuZXcgR3JvdXBTdGF0ZShcIjJcIiwgXCJYOU1aNXFXYW9RZDhaclhcIiksXG5cdFx0XHRcdG5ldyBHcm91cFN0YXRlKFwiM1wiLCBcInVWWUtOS3JaZnhVUUhIdFwiKVxuXHRcdFx0XVxuXHRcdH07XG5cblx0XHRjb25zb2xlLmxvZyhcImRpc3BhdGNoaW5nIGNyZWF0ZSB1c2VyIGFjdGlvbiB0byBzdG9yZVwiKTtcblx0XHR0aGlzLl9zdG9yZS5kaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBXUklURV9VU0VSLFxuXHRcdFx0cGF5bG9hZDoge1xuXHRcdFx0XHR1c2VyOiB1c2VyXG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBuZ0FmdGVyVmlld0luaXQoKSB7XG5cdC8vIFx0Y29uc29sZS5sb2coJ25nQWZ0ZXJWaWV3SW5pdCcpXG5cdC8vIFx0bGV0IHdlYlZpZXcgPSB0aGlzLndlYlZpZXdSZWYubmF0aXZlRWxlbWVudDtcblx0Ly8gXHR3ZWJWaWV3Lm9uKFdlYlZpZXcubG9hZEZpbmlzaGVkRXZlbnQsIChhcmdzOiBMb2FkRXZlbnREYXRhKSA9PiB7XG5cdC8vIFx0XHRjb25zb2xlLmxvZygndXJsOiAnICsgYXJncy51cmwpO1xuXHQvLyBcdFx0aWYgKCF0aGlzLmNvZGUgJiYgYXJncy51cmwgJiYgYXJncy51cmwuaW5jbHVkZXMoJ2Fsb2hhOi8vaG9tZScpKSB7XG5cdC8vIFx0XHRcdC8vIHdlIGhhdmUgcmV0cmlldmVkIHRoZSBjb2RlIGZyb20gdGhlIHBoaWxpcHMgaHVlIHBvcnRhbFxuXHQvLyBcdFx0XHR0aGlzLmNvZGUgPSBhcmdzLnVybC5zcGxpdCgnY29kZScpWzFdLnNwbGl0KCcmJylbMF0uc3BsaXQoXCI9XCIpWzFdXG5cdC8vIFx0XHRcdGNvbnNvbGUubG9nKFwiRm91bmQgdGhlIGNvZGU6IFwiICsgdGhpcy5jb2RlKTtcblx0Ly8gXHRcdFx0Ly8gdGhpcy5odWVTZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKHRoaXMuY29kZSwgdGhpcy5jbGllbnRJZCwgdGhpcy5jbGllbnRTZWNyZXQpLnN1YnNjcmliZShyZXMgPT4ge1xuXHQvLyBcdFx0XHQvLyBcdGNvbnNvbGUubG9nKHJlcyk7XG5cdC8vIFx0XHRcdC8vIH0pO1xuXHQvLyBcdFx0XHR0aGlzLmhhbmRsZUNyZWF0ZVVzZXIoKTtcblx0Ly8gXHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvaG9tZSddKTtcblx0Ly8gXHRcdFx0Ly8gdGhpcy5kb1Nob3dXZWJWaWV3ID0gZmFsc2U7XG5cdC8vIFx0XHR9IGVsc2Uge1xuXHQvLyBcdFx0XHRjb25zb2xlLmxvZygnUmVyb3V0aW5nIHRvIGF1dGhvcml6YXRpb24gdXJsJyk7XG5cdC8vIFx0XHRcdC8vIHdhbnQgdG8gb25seSBhbGxvdyB1c2VyIHRvIGVpdGhlciBsb2dpbiB0byB0aGUgcG9ydGFsIG9yIGFjY2VwdC9yZWplY3Rpb24gcGVybWlzc2lvbiByZXF1ZXN0XG5cdC8vIFx0XHRcdC8vIHJlLXJvdXRlIHRvIGF1dGhvcml6YXRpb24gdXJsXG5cdC8vIFx0XHRcdHRoaXMud2ViVmlld1JlZi5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuYXV0aG9yaXphdGlvblVybDtcblx0Ly8gXHRcdH1cblx0Ly8gXHR9KTtcblx0Ly8gfVxuXHRcbn1cbiJdfQ==