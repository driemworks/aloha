"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var router_1 = require("@angular/router");
var hue_service_1 = require("../services/hue.service");
var store_1 = require("@ngrx/store");
var uuid = __importStar(require("nativescript-uuid"));
var user_actions_1 = require("../store/user/user.actions");
var UserComponent = /** @class */ (function () {
    function UserComponent(hueService, router, _store) {
        this.hueService = hueService;
        this.router = router;
        this._store = _store;
        this.doUnsubscribe = false;
        this.ipAddress = "";
        this.username = "";
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        // ping the bridge every 2 seconds until it is pressed
        this.subscription = rxjs_1.interval(2000).subscribe(function () {
            _this.hueService.findBridgeIp().subscribe(function (ip) {
                // if (this.doUnsubscribe) {
                // 	this.handleCreateUser();
                // }
                _this.ipAddress = ip[0]["internalipaddress"];
                if (!_this.doUnsubscribe && _this.ipAddress) {
                    console.log('Press the button on the bridge');
                    _this.hueService.createUser(_this.ipAddress)
                        .subscribe(function (res) {
                        if (res[0]["success"]) {
                            _this.username = res[0]["success"]["username"];
                            console.log('created username ' + _this.username);
                            _this.handleCreateUser();
                            // this.doUnsubscribe = true;
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
        var deviceUuid = uuid.getUUID();
        console.log('Saving user with device uuid: ' + deviceUuid);
        var user = {
            alias: 'TEST',
            uuid: deviceUuid,
            bridgeIpAddress: this.ipAddress,
            username: this.username,
            refreshToken: '',
            accessToken: '',
            groupStates: []
        };
        this._store.dispatch(new user_actions_1.WriteUserAction(deviceUuid, user));
        this.router.navigate(['/home']);
    };
    UserComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    UserComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.css']
        }),
        __metadata("design:paramtypes", [hue_service_1.HueService,
            router_1.Router,
            store_1.Store])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFtRztBQUNuRyw2QkFBOEM7QUFDOUMsMENBQXlDO0FBQ3pDLHVEQUFxRDtBQUNyRCxxQ0FBb0M7QUFJcEMsc0RBQTBDO0FBQzFDLDJEQUE2RDtBQVM3RDtJQUVDLHVCQUFvQixVQUFzQixFQUMvQixNQUFjLEVBQ2QsTUFBbUI7UUFGVixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQy9CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFhO1FBRTlCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixhQUFRLEdBQUcsRUFBRSxDQUFDO0lBSm9CLENBQUM7SUFRbkMsZ0NBQVEsR0FBUjtRQUFBLGlCQTBCQztRQXpCQSxzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzVDLEtBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsRUFBRTtnQkFDMUMsNEJBQTRCO2dCQUM1Qiw0QkFBNEI7Z0JBQzVCLElBQUk7Z0JBRUosS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFFNUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxhQUFhLElBQUksS0FBSSxDQUFDLFNBQVMsRUFBRTtvQkFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO29CQUM5QyxLQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDO3lCQUN4QyxTQUFTLENBQUMsVUFBQSxHQUFHO3dCQUNiLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFOzRCQUN0QixLQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQ2pELEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDOzRCQUN4Qiw2QkFBNkI7eUJBQzdCO29CQUNILENBQUMsQ0FBQyxDQUFDO2lCQUNIO3FCQUFNO29CQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztpQkFDekM7WUFDRixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVNLHdDQUFnQixHQUF2QjtRQUNDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxHQUFHLFVBQVUsQ0FBQyxDQUFDO1FBQzNELElBQUksSUFBSSxHQUFTO1lBQ2hCLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLFVBQVU7WUFDaEIsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQy9CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixZQUFZLEVBQUUsRUFBRTtZQUNoQixXQUFXLEVBQUUsRUFBRTtZQUNmLFdBQVcsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksOEJBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUEzRFcsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDbkMsQ0FBQzt5Q0FJK0Isd0JBQVU7WUFDdkIsZUFBTTtZQUNOLGFBQUs7T0FKWixhQUFhLENBNER6QjtJQUFELG9CQUFDO0NBQUEsQUE1REQsSUE0REM7QUE1RFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGludGVydmFsLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBIdWVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaHVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgR3JvdXBTdGF0ZSB9IGZyb20gJy4uL21vZGVscy9Hcm91cFN0YXRlLm1vZGVsJztcblxuaW1wb3J0ICogYXMgdXVpZCBmcm9tIFwibmF0aXZlc2NyaXB0LXV1aWRcIjtcbmltcG9ydCB7IFdyaXRlVXNlckFjdGlvbiB9IGZyb20gJy4uL3N0b3JlL3VzZXIvdXNlci5hY3Rpb25zJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnYXBwLXVzZXInLFxuXHR0ZW1wbGF0ZVVybDogJy4vdXNlci5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL3VzZXIuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgVXNlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiBcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBodWVTZXJ2aWNlOiBIdWVTZXJ2aWNlLFxuXHRcdFx0XHRwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuXHRcdFx0XHRwcml2YXRlIF9zdG9yZTogU3RvcmU8VXNlcj4pIHsgfVxuXG5cdGRvVW5zdWJzY3JpYmUgPSBmYWxzZTtcblx0aXBBZGRyZXNzID0gXCJcIjtcblx0dXNlcm5hbWUgPSBcIlwiO1xuXG5cdHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG5cdG5nT25Jbml0KCkge1xuXHRcdC8vIHBpbmcgdGhlIGJyaWRnZSBldmVyeSAyIHNlY29uZHMgdW50aWwgaXQgaXMgcHJlc3NlZFxuXHRcdHRoaXMuc3Vic2NyaXB0aW9uID0gaW50ZXJ2YWwoMjAwMCkuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdHRoaXMuaHVlU2VydmljZS5maW5kQnJpZGdlSXAoKS5zdWJzY3JpYmUoaXAgPT4ge1xuXHRcdFx0XHQvLyBpZiAodGhpcy5kb1Vuc3Vic2NyaWJlKSB7XG5cdFx0XHRcdC8vIFx0dGhpcy5oYW5kbGVDcmVhdGVVc2VyKCk7XG5cdFx0XHRcdC8vIH1cblxuXHRcdFx0XHR0aGlzLmlwQWRkcmVzcyA9IGlwWzBdW1wiaW50ZXJuYWxpcGFkZHJlc3NcIl07XG5cblx0XHRcdFx0aWYgKCF0aGlzLmRvVW5zdWJzY3JpYmUgJiYgdGhpcy5pcEFkZHJlc3MpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnUHJlc3MgdGhlIGJ1dHRvbiBvbiB0aGUgYnJpZGdlJyk7XG5cdFx0XHRcdFx0dGhpcy5odWVTZXJ2aWNlLmNyZWF0ZVVzZXIodGhpcy5pcEFkZHJlc3MpXG5cdFx0XHRcdFx0XHQuc3Vic2NyaWJlKHJlcyA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmIChyZXNbMF1bXCJzdWNjZXNzXCJdKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy51c2VybmFtZSA9IHJlc1swXVtcInN1Y2Nlc3NcIl1bXCJ1c2VybmFtZVwiXTtcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnY3JlYXRlZCB1c2VybmFtZSAnICsgdGhpcy51c2VybmFtZSk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5oYW5kbGVDcmVhdGVVc2VyKCk7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gdGhpcy5kb1Vuc3Vic2NyaWJlID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdDb3VsZCBub3QgbG9jYXRlIGEgYnJpZ2UuJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0cHVibGljIGhhbmRsZUNyZWF0ZVVzZXIoKSB7XG5cdFx0dmFyIGRldmljZVV1aWQgPSB1dWlkLmdldFVVSUQoKTtcblx0XHRjb25zb2xlLmxvZygnU2F2aW5nIHVzZXIgd2l0aCBkZXZpY2UgdXVpZDogJyArIGRldmljZVV1aWQpO1xuXHRcdGxldCB1c2VyOiBVc2VyID0ge1xuXHRcdFx0YWxpYXM6ICdURVNUJyxcblx0XHRcdHV1aWQ6IGRldmljZVV1aWQsXG5cdFx0XHRicmlkZ2VJcEFkZHJlc3M6IHRoaXMuaXBBZGRyZXNzLFxuXHRcdFx0dXNlcm5hbWU6IHRoaXMudXNlcm5hbWUsXG5cdFx0XHRyZWZyZXNoVG9rZW46ICcnLFxuXHRcdFx0YWNjZXNzVG9rZW46ICcnLFxuXHRcdFx0Z3JvdXBTdGF0ZXM6IFtdXG5cdFx0fTtcblxuXHRcdHRoaXMuX3N0b3JlLmRpc3BhdGNoKG5ldyBXcml0ZVVzZXJBY3Rpb24oZGV2aWNlVXVpZCwgdXNlcikpO1xuXHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2hvbWUnXSk7XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHR0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXHR9XG59XG4iXX0=