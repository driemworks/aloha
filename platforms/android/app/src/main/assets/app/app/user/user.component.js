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
                if (_this.doUnsubscribe) {
                    _this.handleCreateUser();
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
            groupStates: []
        };
        console.log("dispatching create user action to store");
        this._store.dispatch(new user_actions_1.WriteUserAction(deviceUuid, user));
        this.subscription.unsubscribe();
        this.router.navigate(['/home']);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFtRztBQUNuRyw2QkFBOEM7QUFDOUMsMENBQXlDO0FBQ3pDLHVEQUFxRDtBQUNyRCxxQ0FBb0M7QUFJcEMsc0RBQTBDO0FBQzFDLDJEQUE2RDtBQVM3RDtJQUVDLHVCQUFvQixVQUFzQixFQUMvQixNQUFjLEVBQ2QsTUFBbUI7UUFGVixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQy9CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFhO1FBRTlCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixhQUFRLEdBQUcsRUFBRSxDQUFDO0lBSm9CLENBQUM7SUFRbkMsZ0NBQVEsR0FBUjtRQUFBLGlCQTBCQztRQXpCQSxzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzVDLEtBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsRUFBRTtnQkFDMUMsSUFBSSxLQUFJLENBQUMsYUFBYSxFQUFFO29CQUN2QixLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztpQkFDeEI7Z0JBRUQsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFFNUMsSUFBSSxLQUFJLENBQUMsYUFBYSxLQUFLLEtBQUssSUFBSSxLQUFJLENBQUMsU0FBUyxFQUFFO29CQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7b0JBQzlDLEtBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUM7eUJBQ3hDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7d0JBQ2IsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUU7NEJBQ3RCLEtBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDakQsMkJBQTJCOzRCQUMzQixLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzt5QkFDMUI7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7aUJBQ0g7cUJBQU07b0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2lCQUN6QztZQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU0sd0NBQWdCLEdBQXZCO1FBQ0MsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEdBQUcsVUFBVSxDQUFDLENBQUM7UUFDM0QsSUFBSSxJQUFJLEdBQVM7WUFDaEIsS0FBSyxFQUFFLE1BQU07WUFDYixJQUFJLEVBQUUsVUFBVTtZQUNoQixlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDL0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsV0FBVyxFQUFFLEVBQUU7U0FDZixDQUFDO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksOEJBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBekRXLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ25DLENBQUM7eUNBSStCLHdCQUFVO1lBQ3ZCLGVBQU07WUFDTixhQUFLO09BSlosYUFBYSxDQTBEekI7SUFBRCxvQkFBQztDQUFBLEFBMURELElBMERDO0FBMURZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpbnRlcnZhbCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSHVlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2h1ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEdyb3VwU3RhdGUgfSBmcm9tICcuLi9tb2RlbHMvR3JvdXBTdGF0ZS5tb2RlbCc7XG5cbmltcG9ydCAqIGFzIHV1aWQgZnJvbSBcIm5hdGl2ZXNjcmlwdC11dWlkXCI7XG5pbXBvcnQgeyBXcml0ZVVzZXJBY3Rpb24gfSBmcm9tICcuLi9zdG9yZS91c2VyL3VzZXIuYWN0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2FwcC11c2VyJyxcblx0dGVtcGxhdGVVcmw6ICcuL3VzZXIuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi91c2VyLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFVzZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuIFxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGh1ZVNlcnZpY2U6IEh1ZVNlcnZpY2UsXG5cdFx0XHRcdHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG5cdFx0XHRcdHByaXZhdGUgX3N0b3JlOiBTdG9yZTxVc2VyPikgeyB9XG5cblx0ZG9VbnN1YnNjcmliZSA9IGZhbHNlO1xuXHRpcEFkZHJlc3MgPSBcIlwiO1xuXHR1c2VybmFtZSA9IFwiXCI7XG5cblx0c3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0Ly8gcGluZyB0aGUgYnJpZGdlIGV2ZXJ5IDIgc2Vjb25kcyB1bnRpbCBpdCBpcyBwcmVzc2VkXG5cdFx0dGhpcy5zdWJzY3JpcHRpb24gPSBpbnRlcnZhbCgyMDAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0dGhpcy5odWVTZXJ2aWNlLmZpbmRCcmlkZ2VJcCgpLnN1YnNjcmliZShpcCA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLmRvVW5zdWJzY3JpYmUpIHtcblx0XHRcdFx0XHR0aGlzLmhhbmRsZUNyZWF0ZVVzZXIoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuaXBBZGRyZXNzID0gaXBbMF1bXCJpbnRlcm5hbGlwYWRkcmVzc1wiXTtcblxuXHRcdFx0XHRpZiAodGhpcy5kb1Vuc3Vic2NyaWJlID09PSBmYWxzZSAmJiB0aGlzLmlwQWRkcmVzcykge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdQcmVzcyB0aGUgYnV0dG9uIG9uIHRoZSBicmlkZ2UnKTtcblx0XHRcdFx0XHR0aGlzLmh1ZVNlcnZpY2UuY3JlYXRlVXNlcih0aGlzLmlwQWRkcmVzcylcblx0XHRcdFx0XHRcdC5zdWJzY3JpYmUocmVzID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKHJlc1swXVtcInN1Y2Nlc3NcIl0pIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnVzZXJuYW1lID0gcmVzWzBdW1wic3VjY2Vzc1wiXVtcInVzZXJuYW1lXCJdO1xuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdjcmVhdGVkIHVzZXJuYW1lICcgKyB0aGlzLnVzZXJuYW1lKTtcblx0XHRcdFx0XHRcdFx0XHQvLyB0aGlzLmhhbmRsZUNyZWF0ZVVzZXIoKTtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmRvVW5zdWJzY3JpYmUgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ0NvdWxkIG5vdCBsb2NhdGUgYSBicmlnZS4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRwdWJsaWMgaGFuZGxlQ3JlYXRlVXNlcigpIHtcblx0XHR2YXIgZGV2aWNlVXVpZCA9IHV1aWQuZ2V0VVVJRCgpO1xuXHRcdGNvbnNvbGUubG9nKCdTYXZpbmcgdXNlciB3aXRoIGRldmljZSB1dWlkOiAnICsgZGV2aWNlVXVpZCk7XG5cdFx0bGV0IHVzZXI6IFVzZXIgPSB7XG5cdFx0XHRhbGlhczogJ1RFU1QnLFxuXHRcdFx0dXVpZDogZGV2aWNlVXVpZCxcblx0XHRcdGJyaWRnZUlwQWRkcmVzczogdGhpcy5pcEFkZHJlc3MsXG5cdFx0XHR1c2VybmFtZTogdGhpcy51c2VybmFtZSxcblx0XHRcdHJlZnJlc2hUb2tlbjogJycsXG5cdFx0XHRhY2Nlc3NUb2tlbjogJycsXG5cdFx0XHRncm91cFN0YXRlczogW11cblx0XHR9O1xuXG5cdFx0Y29uc29sZS5sb2coXCJkaXNwYXRjaGluZyBjcmVhdGUgdXNlciBhY3Rpb24gdG8gc3RvcmVcIik7XG5cdFx0dGhpcy5fc3RvcmUuZGlzcGF0Y2gobmV3IFdyaXRlVXNlckFjdGlvbihkZXZpY2VVdWlkLCB1c2VyKSk7XG5cdFx0dGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9ob21lJ10pO1xuXHR9XG59XG4iXX0=