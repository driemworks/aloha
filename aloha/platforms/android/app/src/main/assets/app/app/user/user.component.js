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
            type: user_actions_1.CREATE_USER,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFtRztBQUNuRyw2QkFBZ0M7QUFDaEMsMENBQWdEO0FBR2hELHVEQUFxRDtBQUNyRCx5REFBdUQ7QUFDdkQscUNBQW9DO0FBRXBDLDhEQUF3RTtBQUN4RSwrREFBd0Q7QUFVeEQ7SUFFQyx1QkFBb0IsVUFBc0IsRUFDL0IsV0FBd0IsRUFDeEIsTUFBYyxFQUNkLE1BQW1CO1FBSFYsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUMvQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsV0FBTSxHQUFOLE1BQU0sQ0FBYTtRQUU5QixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQUpvQixDQUFDO0lBTW5DLGdDQUFRLEdBQVI7UUFBQSxpQkEwQkM7UUF6QkEsc0RBQXNEO1FBQ3RELElBQU0sR0FBRyxHQUFHLGVBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDcEMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxFQUFFO2dCQUMxQyxJQUFJLEtBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQ3ZCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDbEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUNoQztnQkFFRCxLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUU1QyxJQUFJLEtBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztvQkFDOUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQzt5QkFDeEMsU0FBUyxDQUFDLFVBQUEsR0FBRzt3QkFDYixJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRTs0QkFDdEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNqRCxLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzt5QkFDMUI7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7aUJBQ0g7cUJBQU07b0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2lCQUN6QztZQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU0sd0NBQWdCLEdBQXZCO1FBQ0MsSUFBSSxJQUFJLEdBQVM7WUFDaEIsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQy9CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixZQUFZLEVBQUUsRUFBRTtZQUNoQixXQUFXLEVBQUUsRUFBRTtZQUNmLFdBQVcsRUFBRTtnQkFDWixJQUFJLDZCQUFVLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDO2dCQUN0QyxJQUFJLDZCQUFVLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDO2dCQUN0QyxJQUFJLDZCQUFVLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDO2FBQ3RDO1NBQ0QsQ0FBQztRQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNwQixJQUFJLEVBQUUsMEJBQVc7WUFDakIsT0FBTyxFQUFFO2dCQUNSLElBQUksRUFBRSxJQUFJO2FBQ1Y7U0FDRCxDQUFDLENBQUM7SUFDSixDQUFDO0lBM0RXLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ25DLENBQUM7eUNBSStCLHdCQUFVO1lBQ2xCLDBCQUFXO1lBQ2hCLGVBQU07WUFDTixhQUFLO09BTFosYUFBYSxDQXFGekI7SUFBRCxvQkFBQztDQUFBLEFBckZELElBcUZDO0FBckZZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpbnRlcnZhbCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1dlYlZpZXcsIExvYWRFdmVudERhdGF9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3dlYi12aWV3XCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgSHVlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2h1ZS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZmlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IFdSSVRFX1VTRVIsIENSRUFURV9VU0VSIH0gZnJvbSAnLi4vc3RvcmUvYWN0aW9ucy91c2VyLmFjdGlvbnMnO1xuaW1wb3J0IHsgR3JvdXBTdGF0ZSB9IGZyb20gJy4uL21vZGVscy9Hcm91cFN0YXRlLm1vZGVsJztcbmltcG9ydCB7IHJvdXRlck5nUHJvYmVUb2tlbiB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlci9zcmMvcm91dGVyX21vZHVsZSc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2FwcC11c2VyJyxcblx0dGVtcGxhdGVVcmw6ICcuL3VzZXIuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi91c2VyLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFVzZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuIFxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGh1ZVNlcnZpY2U6IEh1ZVNlcnZpY2UsXG5cdFx0XHRcdHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlLFxuXHRcdFx0XHRwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuXHRcdFx0XHRwcml2YXRlIF9zdG9yZTogU3RvcmU8VXNlcj4pIHsgfVxuXG5cdGRvVW5zdWJzY3JpYmUgPSBmYWxzZTtcblx0aXBBZGRyZXNzID0gXCJcIjtcblx0dXNlcm5hbWUgPSBcIlwiO1xuXG5cdG5nT25Jbml0KCkge1xuXHRcdC8vIHBpbmcgdGhlIGJyaWRnZSBldmVyeSAyIHNlY29uZHMgdW50aWwgaXQgaXMgcHJlc3NlZFxuXHRcdGNvbnN0IHN1YiA9IGludGVydmFsKDIwMDApLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHR0aGlzLmh1ZVNlcnZpY2UuZmluZEJyaWRnZUlwKCkuc3Vic2NyaWJlKGlwID0+IHtcblx0XHRcdFx0aWYgKHRoaXMuZG9VbnN1YnNjcmliZSkge1xuXHRcdFx0XHRcdHN1Yi51bnN1YnNjcmliZSgpO1xuXHRcdFx0XHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2hvbWUnXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmlwQWRkcmVzcyA9IGlwWzBdW1wiaW50ZXJuYWxpcGFkZHJlc3NcIl07XG5cblx0XHRcdFx0aWYgKHRoaXMuaXBBZGRyZXNzKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ1ByZXNzIHRoZSBidXR0b24gb24gdGhlIGJyaWRnZScpO1xuXHRcdFx0XHRcdHRoaXMuaHVlU2VydmljZS5jcmVhdGVVc2VyKHRoaXMuaXBBZGRyZXNzKVxuXHRcdFx0XHRcdFx0LnN1YnNjcmliZShyZXMgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAocmVzWzBdW1wic3VjY2Vzc1wiXSkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMudXNlcm5hbWUgPSByZXNbMF1bXCJzdWNjZXNzXCJdW1widXNlcm5hbWVcIl07XG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ2NyZWF0ZWQgdXNlcm5hbWUgJyArIHRoaXMudXNlcm5hbWUpO1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZG9VbnN1YnNjcmliZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnQ291bGQgbm90IGxvY2F0ZSBhIGJyaWdlLicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdHB1YmxpYyBoYW5kbGVDcmVhdGVVc2VyKCkge1xuXHRcdGxldCB1c2VyOiBVc2VyID0ge1xuXHRcdFx0YnJpZGdlSXBBZGRyZXNzOiB0aGlzLmlwQWRkcmVzcyxcblx0XHRcdHVzZXJuYW1lOiB0aGlzLnVzZXJuYW1lLFxuXHRcdFx0cmVmcmVzaFRva2VuOiAnJyxcblx0XHRcdGFjY2Vzc1Rva2VuOiAnJyxcblx0XHRcdGdyb3VwU3RhdGVzOiBbXG5cdFx0XHRcdG5ldyBHcm91cFN0YXRlKFwiMVwiLCBcIk8zTXd2amZrdGdPSGxSRlwiKSxcblx0XHRcdFx0bmV3IEdyb3VwU3RhdGUoXCIyXCIsIFwiWDlNWjVxV2FvUWQ4WnJYXCIpLFxuXHRcdFx0XHRuZXcgR3JvdXBTdGF0ZShcIjNcIiwgXCJ1VllLTktyWmZ4VVFISHRcIilcblx0XHRcdF1cblx0XHR9O1xuXG5cdFx0Y29uc29sZS5sb2coXCJkaXNwYXRjaGluZyBjcmVhdGUgdXNlciBhY3Rpb24gdG8gc3RvcmVcIik7XG5cdFx0dGhpcy5fc3RvcmUuZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQ1JFQVRFX1VTRVIsXG5cdFx0XHRwYXlsb2FkOiB7XG5cdFx0XHRcdHVzZXI6IHVzZXJcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8vIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0Ly8gXHRjb25zb2xlLmxvZygnbmdBZnRlclZpZXdJbml0Jylcblx0Ly8gXHRsZXQgd2ViVmlldyA9IHRoaXMud2ViVmlld1JlZi5uYXRpdmVFbGVtZW50O1xuXHQvLyBcdHdlYlZpZXcub24oV2ViVmlldy5sb2FkRmluaXNoZWRFdmVudCwgKGFyZ3M6IExvYWRFdmVudERhdGEpID0+IHtcblx0Ly8gXHRcdGNvbnNvbGUubG9nKCd1cmw6ICcgKyBhcmdzLnVybCk7XG5cdC8vIFx0XHRpZiAoIXRoaXMuY29kZSAmJiBhcmdzLnVybCAmJiBhcmdzLnVybC5pbmNsdWRlcygnYWxvaGE6Ly9ob21lJykpIHtcblx0Ly8gXHRcdFx0Ly8gd2UgaGF2ZSByZXRyaWV2ZWQgdGhlIGNvZGUgZnJvbSB0aGUgcGhpbGlwcyBodWUgcG9ydGFsXG5cdC8vIFx0XHRcdHRoaXMuY29kZSA9IGFyZ3MudXJsLnNwbGl0KCdjb2RlJylbMV0uc3BsaXQoJyYnKVswXS5zcGxpdChcIj1cIilbMV1cblx0Ly8gXHRcdFx0Y29uc29sZS5sb2coXCJGb3VuZCB0aGUgY29kZTogXCIgKyB0aGlzLmNvZGUpO1xuXHQvLyBcdFx0XHQvLyB0aGlzLmh1ZVNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4odGhpcy5jb2RlLCB0aGlzLmNsaWVudElkLCB0aGlzLmNsaWVudFNlY3JldCkuc3Vic2NyaWJlKHJlcyA9PiB7XG5cdC8vIFx0XHRcdC8vIFx0Y29uc29sZS5sb2cocmVzKTtcblx0Ly8gXHRcdFx0Ly8gfSk7XG5cdC8vIFx0XHRcdHRoaXMuaGFuZGxlQ3JlYXRlVXNlcigpO1xuXHQvLyBcdFx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9ob21lJ10pO1xuXHQvLyBcdFx0XHQvLyB0aGlzLmRvU2hvd1dlYlZpZXcgPSBmYWxzZTtcblx0Ly8gXHRcdH0gZWxzZSB7XG5cdC8vIFx0XHRcdGNvbnNvbGUubG9nKCdSZXJvdXRpbmcgdG8gYXV0aG9yaXphdGlvbiB1cmwnKTtcblx0Ly8gXHRcdFx0Ly8gd2FudCB0byBvbmx5IGFsbG93IHVzZXIgdG8gZWl0aGVyIGxvZ2luIHRvIHRoZSBwb3J0YWwgb3IgYWNjZXB0L3JlamVjdGlvbiBwZXJtaXNzaW9uIHJlcXVlc3Rcblx0Ly8gXHRcdFx0Ly8gcmUtcm91dGUgdG8gYXV0aG9yaXphdGlvbiB1cmxcblx0Ly8gXHRcdFx0dGhpcy53ZWJWaWV3UmVmLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5hdXRob3JpemF0aW9uVXJsO1xuXHQvLyBcdFx0fVxuXHQvLyBcdH0pO1xuXHQvLyB9XG5cdFxufVxuIl19