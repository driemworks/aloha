"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var connectivity_1 = require("tns-core-modules/connectivity");
var hue_service_1 = require("../services/hue.service");
var store_1 = require("@ngrx/store");
var router_1 = require("@angular/router");
// import { Store } from '@ngrx/store';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_store, hueService, router) {
        var _this = this;
        this._store = _store;
        this.hueService = hueService;
        this.router = router;
        // init wifi status to "none"
        this.wifiStatus = -1;
        // init previous wifi status to "none"
        this.previousWifiStatus = 0;
        this.subscription = this._store.select('user').subscribe(function (user) {
            console.log('Getting user in home component: ' + JSON.stringify(user));
            _this.user = user;
        });
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.startMonitoring();
    };
    HomeComponent.prototype.startMonitoring = function () {
        var _this = this;
        console.log('start monitoring');
        connectivity_1.startMonitoring(function (newConnectionType) {
            console.log('monitoring wifi connection: ' + newConnectionType);
            _this.previousWifiStatus = _this.wifiStatus;
            _this.wifiStatus = newConnectionType;
            // only want events to happen if wifi status has changed
            var wifiStatusChanged = (_this.previousWifiStatus != _this.wifiStatus);
            if (wifiStatusChanged) {
                if ((newConnectionType === connectivity_1.connectionType.wifi || newConnectionType === connectivity_1.connectionType.ethernet)) {
                    console.log("welcome home");
                    if (_this.user.bridgeIpAddress && _this.user.username && _this.user.groupStates) {
                        _this.connectedBehavior();
                    }
                }
                else {
                    console.log("good bye");
                    _this.notConnectedBehavior();
                }
            }
        });
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    HomeComponent.prototype.connectedBehavior = function () {
        var _this = this;
        this.user.groupStates.forEach(function (state) {
            _this.hueService.setGroupState(_this.user.bridgeIpAddress, _this.user.username, state.groupId, {
                "scene": state.sceneId
            }, false).subscribe(function (res) {
                console.log(res);
            });
        });
    };
    HomeComponent.prototype.notConnectedBehavior = function () {
        var _this = this;
        // for now, just turn lights off if not on network
        if (this.user.accessToken) {
            // todo alert user to allow authorization
            this.user.groupStates.forEach(function (state) {
                _this.hueService.setGroupState(_this.user.bridgeIpAddress, _this.user.username, state.groupId, {
                    "on": false
                }, _this.user.accessToken).subscribe(function (res) {
                    console.log(res);
                });
            });
        }
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [store_1.Store,
            hue_service_1.HueService,
            router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUU3RCw4REFBbUg7QUFDbkgsdURBQXFEO0FBRXJELHFDQUFvQztBQUVwQywwQ0FBeUM7QUFDekMsdUNBQXVDO0FBU3ZDO0lBVUksdUJBQW9CLE1BQW1CLEVBQ25CLFVBQXNCLEVBQ3RCLE1BQWM7UUFGbEMsaUJBT0M7UUFQbUIsV0FBTSxHQUFOLE1BQU0sQ0FBYTtRQUNuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFQckMsNkJBQTZCO1FBQzFCLGVBQVUsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUN4QixzQ0FBc0M7UUFDdEMsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBSzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2RSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFSixnQ0FBUSxHQUFSO1FBQ08sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTyx1Q0FBZSxHQUF2QjtRQUFBLGlCQW9CQztRQW5CRyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEMsOEJBQWUsQ0FBQyxVQUFBLGlCQUFpQjtZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixHQUFHLGlCQUFpQixDQUFDLENBQUM7WUFDaEUsS0FBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUM7WUFDMUMsS0FBSSxDQUFDLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQztZQUNwQyx3REFBd0Q7WUFDeEQsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLEtBQUksQ0FBQyxrQkFBa0IsSUFBSSxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckUsSUFBSSxpQkFBaUIsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLGlCQUFpQixLQUFLLDZCQUFjLENBQUMsSUFBSSxJQUFJLGlCQUFpQixLQUFLLDZCQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQzlGLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzVCLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7d0JBQzFFLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO3FCQUM1QjtpQkFDSjtxQkFBTTtvQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN4QixLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztpQkFDL0I7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCx5Q0FBaUIsR0FBakI7UUFBQSxpQkFRQztRQVBHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7WUFDL0IsS0FBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDeEYsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2FBQ3pCLEVBQUUsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDRDQUFvQixHQUFwQjtRQUFBLGlCQVlDO1FBWEcsa0RBQWtEO1FBQ2xELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdkIseUNBQXlDO1lBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7Z0JBQy9CLEtBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUU7b0JBQ3hGLElBQUksRUFBRSxLQUFLO2lCQUNkLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO29CQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBdkVRLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNoQixRQUFRLEVBQUUsTUFBTTtZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ25DLENBQUM7eUNBWThCLGFBQUs7WUFDRCx3QkFBVTtZQUNkLGVBQU07T0FaekIsYUFBYSxDQXdFekI7SUFBRCxvQkFBQztDQUFBLEFBeEVELElBd0VDO0FBeEVZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29ubmVjdGlvblR5cGUsIGdldENvbm5lY3Rpb25UeXBlLCBzdGFydE1vbml0b3JpbmcsIHN0b3BNb25pdG9yaW5nIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvY29ubmVjdGl2aXR5XCI7XG5pbXBvcnQgeyBIdWVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaHVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG4vLyBpbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdob21lJyxcblx0dGVtcGxhdGVVcmw6ICcuL2hvbWUuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9ob21lLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICB1c2VyOiBVc2VyO1xuICAgIC8vIFxuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uO1xuXHQvLyBpbml0IHdpZmkgc3RhdHVzIHRvIFwibm9uZVwiXG4gICAgd2lmaVN0YXR1czogbnVtYmVyID0gLTE7XG4gICAgLy8gaW5pdCBwcmV2aW91cyB3aWZpIHN0YXR1cyB0byBcIm5vbmVcIlxuICAgIHByZXZpb3VzV2lmaVN0YXR1czogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3N0b3JlOiBTdG9yZTxVc2VyPixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGh1ZVNlcnZpY2U6IEh1ZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuX3N0b3JlLnNlbGVjdCgndXNlcicpLnN1YnNjcmliZSh1c2VyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHZXR0aW5nIHVzZXIgaW4gaG9tZSBjb21wb25lbnQ6ICcgKyBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblx0bmdPbkluaXQoKSB7ICAgIFxuICAgICAgICB0aGlzLnN0YXJ0TW9uaXRvcmluZygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhcnRNb25pdG9yaW5nKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnc3RhcnQgbW9uaXRvcmluZycpO1xuICAgICAgICBzdGFydE1vbml0b3JpbmcobmV3Q29ubmVjdGlvblR5cGUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ21vbml0b3Jpbmcgd2lmaSBjb25uZWN0aW9uOiAnICsgbmV3Q29ubmVjdGlvblR5cGUpO1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1dpZmlTdGF0dXMgPSB0aGlzLndpZmlTdGF0dXM7XG4gICAgICAgICAgICB0aGlzLndpZmlTdGF0dXMgPSBuZXdDb25uZWN0aW9uVHlwZTtcbiAgICAgICAgICAgIC8vIG9ubHkgd2FudCBldmVudHMgdG8gaGFwcGVuIGlmIHdpZmkgc3RhdHVzIGhhcyBjaGFuZ2VkXG4gICAgICAgICAgICBsZXQgd2lmaVN0YXR1c0NoYW5nZWQgPSAodGhpcy5wcmV2aW91c1dpZmlTdGF0dXMgIT0gdGhpcy53aWZpU3RhdHVzKTtcbiAgICAgICAgICAgIGlmICh3aWZpU3RhdHVzQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIGlmICgobmV3Q29ubmVjdGlvblR5cGUgPT09IGNvbm5lY3Rpb25UeXBlLndpZmkgfHwgbmV3Q29ubmVjdGlvblR5cGUgPT09IGNvbm5lY3Rpb25UeXBlLmV0aGVybmV0KSkgeyAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIndlbGNvbWUgaG9tZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlci5icmlkZ2VJcEFkZHJlc3MgJiYgdGhpcy51c2VyLnVzZXJuYW1lICYmIHRoaXMudXNlci5ncm91cFN0YXRlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0ZWRCZWhhdmlvcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnb29kIGJ5ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RDb25uZWN0ZWRCZWhhdmlvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZEJlaGF2aW9yKCkge1xuICAgICAgICB0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMuZm9yRWFjaChzdGF0ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmh1ZVNlcnZpY2Uuc2V0R3JvdXBTdGF0ZSh0aGlzLnVzZXIuYnJpZGdlSXBBZGRyZXNzLCB0aGlzLnVzZXIudXNlcm5hbWUsIHN0YXRlLmdyb3VwSWQsIHtcbiAgICAgICAgICAgICAgICBcInNjZW5lXCI6IHN0YXRlLnNjZW5lSWRcbiAgICAgICAgICAgIH0sIGZhbHNlKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5vdENvbm5lY3RlZEJlaGF2aW9yKCkge1xuICAgICAgICAvLyBmb3Igbm93LCBqdXN0IHR1cm4gbGlnaHRzIG9mZiBpZiBub3Qgb24gbmV0d29ya1xuICAgICAgICBpZiAodGhpcy51c2VyLmFjY2Vzc1Rva2VuKSB7XG4gICAgICAgICAgICAvLyB0b2RvIGFsZXJ0IHVzZXIgdG8gYWxsb3cgYXV0aG9yaXphdGlvblxuICAgICAgICAgICAgdGhpcy51c2VyLmdyb3VwU3RhdGVzLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaHVlU2VydmljZS5zZXRHcm91cFN0YXRlKHRoaXMudXNlci5icmlkZ2VJcEFkZHJlc3MsIHRoaXMudXNlci51c2VybmFtZSwgc3RhdGUuZ3JvdXBJZCwge1xuICAgICAgICAgICAgICAgICAgICBcIm9uXCI6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSwgdGhpcy51c2VyLmFjY2Vzc1Rva2VuKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19