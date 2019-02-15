"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var hue_service_1 = require("../services/hue.service");
var store_1 = require("@ngrx/store");
var GroupState_model_1 = require("../models/GroupState.model");
var uuid = require("nativescript-uuid");
var user_actions_1 = require("../store/user/user.actions");
var UserComponent = /** @class */ (function () {
    function UserComponent(hueService, _store) {
        this.hueService = hueService;
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
                if (_this.doUnsubscribe) {
                    _this.handleCreateUser();
                    // sub.unsubscribe();
                    // this.router.navigate(['/home']);
                }
                _this.ipAddress = ip[0]["internalipaddress"];
                if (_this.doUnsubscribe === false && _this.ipAddress) {
                    console.log('Press the button on the bridge');
                    _this.hueService.createUser(_this.ipAddress)
                        .subscribe(function (res) {
                        if (res[0]["success"]) {
                            _this.username = res[0]["success"]["username"];
                            console.log('created username ' + _this.username);
                            // this.handleCreateUser();
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
        var deviceUuid = uuid.getUUID();
        console.log('Saving user with device uuid: ' + deviceUuid);
        var user = {
            alias: 'TEST',
            uuid: deviceUuid,
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
        this._store.dispatch(new user_actions_1.WriteUserAction(deviceUuid, user));
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
            store_1.Store])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFtRztBQUNuRyw2QkFBOEM7QUFFOUMsdURBQXFEO0FBQ3JELHFDQUFvQztBQUVwQywrREFBd0Q7QUFFeEQsd0NBQTBDO0FBQzFDLDJEQUE2RDtBQVM3RDtJQUVDLHVCQUFvQixVQUFzQixFQUMvQixNQUFtQjtRQURWLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDL0IsV0FBTSxHQUFOLE1BQU0sQ0FBYTtRQUU5QixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQUpvQixDQUFDO0lBUW5DLGdDQUFRLEdBQVI7UUFBQSxpQkE0QkM7UUEzQkEsc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1QyxLQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEVBQUU7Z0JBQzFDLElBQUksS0FBSSxDQUFDLGFBQWEsRUFBRTtvQkFDdkIsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLHFCQUFxQjtvQkFDckIsbUNBQW1DO2lCQUNuQztnQkFFRCxLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUU1QyxJQUFJLEtBQUksQ0FBQyxhQUFhLEtBQUssS0FBSyxJQUFJLEtBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztvQkFDOUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQzt5QkFDeEMsU0FBUyxDQUFDLFVBQUEsR0FBRzt3QkFDYixJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRTs0QkFDdEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNqRCwyQkFBMkI7NEJBQzNCLEtBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO3lCQUMxQjtvQkFDSCxDQUFDLENBQUMsQ0FBQztpQkFDSDtxQkFBTTtvQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7aUJBQ3pDO1lBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTSx3Q0FBZ0IsR0FBdkI7UUFDQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsR0FBRyxVQUFVLENBQUMsQ0FBQztRQUMzRCxJQUFJLElBQUksR0FBUztZQUNoQixLQUFLLEVBQUUsTUFBTTtZQUNiLElBQUksRUFBRSxVQUFVO1lBQ2hCLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUztZQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsWUFBWSxFQUFFLEVBQUU7WUFDaEIsV0FBVyxFQUFFLEVBQUU7WUFDZixXQUFXLEVBQUU7Z0JBQ1osSUFBSSw2QkFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQztnQkFDdEMsSUFBSSw2QkFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQztnQkFDdEMsSUFBSSw2QkFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQzthQUN0QztTQUNELENBQUM7UUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSw4QkFBZSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQTdEVyxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUNuQyxDQUFDO3lDQUkrQix3QkFBVTtZQUN2QixhQUFLO09BSFosYUFBYSxDQThEekI7SUFBRCxvQkFBQztDQUFBLEFBOURELElBOERDO0FBOURZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpbnRlcnZhbCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSHVlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2h1ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEdyb3VwU3RhdGUgfSBmcm9tICcuLi9tb2RlbHMvR3JvdXBTdGF0ZS5tb2RlbCc7XG5cbmltcG9ydCAqIGFzIHV1aWQgZnJvbSBcIm5hdGl2ZXNjcmlwdC11dWlkXCI7XG5pbXBvcnQgeyBXcml0ZVVzZXJBY3Rpb24gfSBmcm9tICcuLi9zdG9yZS91c2VyL3VzZXIuYWN0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2FwcC11c2VyJyxcblx0dGVtcGxhdGVVcmw6ICcuL3VzZXIuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi91c2VyLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFVzZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuIFxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGh1ZVNlcnZpY2U6IEh1ZVNlcnZpY2UsXG5cdFx0XHRcdHByaXZhdGUgX3N0b3JlOiBTdG9yZTxVc2VyPikgeyB9XG5cblx0ZG9VbnN1YnNjcmliZSA9IGZhbHNlO1xuXHRpcEFkZHJlc3MgPSBcIlwiO1xuXHR1c2VybmFtZSA9IFwiXCI7XG5cblx0c3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0Ly8gcGluZyB0aGUgYnJpZGdlIGV2ZXJ5IDIgc2Vjb25kcyB1bnRpbCBpdCBpcyBwcmVzc2VkXG5cdFx0dGhpcy5zdWJzY3JpcHRpb24gPSBpbnRlcnZhbCgyMDAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0dGhpcy5odWVTZXJ2aWNlLmZpbmRCcmlkZ2VJcCgpLnN1YnNjcmliZShpcCA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLmRvVW5zdWJzY3JpYmUpIHtcblx0XHRcdFx0XHR0aGlzLmhhbmRsZUNyZWF0ZVVzZXIoKTtcblx0XHRcdFx0XHQvLyBzdWIudW5zdWJzY3JpYmUoKTtcblx0XHRcdFx0XHQvLyB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9ob21lJ10pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5pcEFkZHJlc3MgPSBpcFswXVtcImludGVybmFsaXBhZGRyZXNzXCJdO1xuXG5cdFx0XHRcdGlmICh0aGlzLmRvVW5zdWJzY3JpYmUgPT09IGZhbHNlICYmIHRoaXMuaXBBZGRyZXNzKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ1ByZXNzIHRoZSBidXR0b24gb24gdGhlIGJyaWRnZScpO1xuXHRcdFx0XHRcdHRoaXMuaHVlU2VydmljZS5jcmVhdGVVc2VyKHRoaXMuaXBBZGRyZXNzKVxuXHRcdFx0XHRcdFx0LnN1YnNjcmliZShyZXMgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAocmVzWzBdW1wic3VjY2Vzc1wiXSkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMudXNlcm5hbWUgPSByZXNbMF1bXCJzdWNjZXNzXCJdW1widXNlcm5hbWVcIl07XG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ2NyZWF0ZWQgdXNlcm5hbWUgJyArIHRoaXMudXNlcm5hbWUpO1xuXHRcdFx0XHRcdFx0XHRcdC8vIHRoaXMuaGFuZGxlQ3JlYXRlVXNlcigpO1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZG9VbnN1YnNjcmliZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnQ291bGQgbm90IGxvY2F0ZSBhIGJyaWdlLicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdHB1YmxpYyBoYW5kbGVDcmVhdGVVc2VyKCkge1xuXHRcdHZhciBkZXZpY2VVdWlkID0gdXVpZC5nZXRVVUlEKCk7XG5cdFx0Y29uc29sZS5sb2coJ1NhdmluZyB1c2VyIHdpdGggZGV2aWNlIHV1aWQ6ICcgKyBkZXZpY2VVdWlkKTtcblx0XHRsZXQgdXNlcjogVXNlciA9IHtcblx0XHRcdGFsaWFzOiAnVEVTVCcsXG5cdFx0XHR1dWlkOiBkZXZpY2VVdWlkLFxuXHRcdFx0YnJpZGdlSXBBZGRyZXNzOiB0aGlzLmlwQWRkcmVzcyxcblx0XHRcdHVzZXJuYW1lOiB0aGlzLnVzZXJuYW1lLFxuXHRcdFx0cmVmcmVzaFRva2VuOiAnJyxcblx0XHRcdGFjY2Vzc1Rva2VuOiAnJyxcblx0XHRcdGdyb3VwU3RhdGVzOiBbXG5cdFx0XHRcdG5ldyBHcm91cFN0YXRlKFwiMVwiLCBcIk8zTXd2amZrdGdPSGxSRlwiKSxcblx0XHRcdFx0bmV3IEdyb3VwU3RhdGUoXCIyXCIsIFwiWDlNWjVxV2FvUWQ4WnJYXCIpLFxuXHRcdFx0XHRuZXcgR3JvdXBTdGF0ZShcIjNcIiwgXCJ1VllLTktyWmZ4VVFISHRcIilcblx0XHRcdF1cblx0XHR9O1xuXG5cdFx0Y29uc29sZS5sb2coXCJkaXNwYXRjaGluZyBjcmVhdGUgdXNlciBhY3Rpb24gdG8gc3RvcmVcIik7XG5cdFx0dGhpcy5fc3RvcmUuZGlzcGF0Y2gobmV3IFdyaXRlVXNlckFjdGlvbihkZXZpY2VVdWlkLCB1c2VyKSk7XG5cdFx0dGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblx0fVxufVxuIl19