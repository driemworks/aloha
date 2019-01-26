"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var connectivity_1 = require("tns-core-modules/connectivity");
var hue_service_1 = require("../services/hue.service");
var store_1 = require("@ngrx/store");
// import { Store } from '@ngrx/store';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_store, hueService) {
        var _this = this;
        this._store = _store;
        this.hueService = hueService;
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
                        _this.connectedBehavior(_this.user.bridgeIpAddress, _this.user.username, _this.user.groupStates);
                    }
                }
                else {
                    console.log("good bye");
                    _this.notConnectedBehavior(_this.user.bridgeIpAddress, _this.user.username, _this.user.groupStates);
                }
            }
        });
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    HomeComponent.prototype.connectedBehavior = function (bridgeIp, username, groupStates) {
        var _this = this;
        groupStates.forEach(function (state) {
            _this.hueService.setGroupState(bridgeIp, username, state.groupId, {
                "scene": state.sceneId
            }, true).subscribe(function (res) {
                console.log(res);
            });
        });
    };
    HomeComponent.prototype.notConnectedBehavior = function (bridgeIp, username, groupStates) {
        var _this = this;
        // for now, just turn lights off if not on network
        groupStates.forEach(function (state) {
            _this.hueService.setGroupState(bridgeIp, username, state.groupId, {
                "on": false
            }, false).subscribe(function (res) {
                console.log(res);
            });
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [store_1.Store,
            hue_service_1.HueService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUU3RCw4REFBbUg7QUFDbkgsdURBQXFEO0FBRXJELHFDQUFvQztBQUVwQyx1Q0FBdUM7QUFTdkM7SUFVSSx1QkFBb0IsTUFBbUIsRUFDbkIsVUFBc0I7UUFEMUMsaUJBTUM7UUFObUIsV0FBTSxHQUFOLE1BQU0sQ0FBYTtRQUNuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBTjdDLDZCQUE2QjtRQUMxQixlQUFVLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDeEIsc0NBQXNDO1FBQ3RDLHVCQUFrQixHQUFXLENBQUMsQ0FBQztRQUkzQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkUsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUosZ0NBQVEsR0FBUjtRQUNPLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sdUNBQWUsR0FBdkI7UUFBQSxpQkFvQkM7UUFuQkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hDLDhCQUFlLENBQUMsVUFBQSxpQkFBaUI7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hFLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO1lBQzFDLEtBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUM7WUFDcEMsd0RBQXdEO1lBQ3hELElBQUksaUJBQWlCLEdBQUcsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JFLElBQUksaUJBQWlCLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxpQkFBaUIsS0FBSyw2QkFBYyxDQUFDLElBQUksSUFBSSxpQkFBaUIsS0FBSyw2QkFBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUM5RixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUM1QixJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO3dCQUMxRSxLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDaEc7aUJBQ0o7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDeEIsS0FBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ25HO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQseUNBQWlCLEdBQWpCLFVBQWtCLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVztRQUFqRCxpQkFRQztRQVBHLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO1lBQ3JCLEtBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDN0QsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2FBQ3pCLEVBQUUsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRztnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDRDQUFvQixHQUFwQixVQUFxQixRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVc7UUFBcEQsaUJBU0M7UUFSRyxrREFBa0Q7UUFDbEQsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7WUFDckIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUM3RCxJQUFJLEVBQUUsS0FBSzthQUNkLEVBQUUsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQW5FUSxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDaEIsUUFBUSxFQUFFLE1BQU07WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUNuQyxDQUFDO3lDQVk4QixhQUFLO1lBQ0Qsd0JBQVU7T0FYakMsYUFBYSxDQW9FekI7SUFBRCxvQkFBQztDQUFBLEFBcEVELElBb0VDO0FBcEVZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29ubmVjdGlvblR5cGUsIGdldENvbm5lY3Rpb25UeXBlLCBzdGFydE1vbml0b3JpbmcsIHN0b3BNb25pdG9yaW5nIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvY29ubmVjdGl2aXR5XCI7XG5pbXBvcnQgeyBIdWVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaHVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbi8vIGltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2hvbWUnLFxuXHR0ZW1wbGF0ZVVybDogJy4vaG9tZS5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2hvbWUuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIHVzZXI6IFVzZXI7XG4gICAgLy8gXG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb247XG5cdC8vIGluaXQgd2lmaSBzdGF0dXMgdG8gXCJub25lXCJcbiAgICB3aWZpU3RhdHVzOiBudW1iZXIgPSAtMTtcbiAgICAvLyBpbml0IHByZXZpb3VzIHdpZmkgc3RhdHVzIHRvIFwibm9uZVwiXG4gICAgcHJldmlvdXNXaWZpU3RhdHVzOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc3RvcmU6IFN0b3JlPFVzZXI+LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgaHVlU2VydmljZTogSHVlU2VydmljZSApIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLl9zdG9yZS5zZWxlY3QoJ3VzZXInKS5zdWJzY3JpYmUodXNlciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnR2V0dGluZyB1c2VyIGluIGhvbWUgY29tcG9uZW50OiAnICsgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cdG5nT25Jbml0KCkgeyAgICBcbiAgICAgICAgdGhpcy5zdGFydE1vbml0b3JpbmcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXJ0TW9uaXRvcmluZygpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0IG1vbml0b3JpbmcnKTtcbiAgICAgICAgc3RhcnRNb25pdG9yaW5nKG5ld0Nvbm5lY3Rpb25UeXBlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtb25pdG9yaW5nIHdpZmkgY29ubmVjdGlvbjogJyArIG5ld0Nvbm5lY3Rpb25UeXBlKTtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNXaWZpU3RhdHVzID0gdGhpcy53aWZpU3RhdHVzO1xuICAgICAgICAgICAgdGhpcy53aWZpU3RhdHVzID0gbmV3Q29ubmVjdGlvblR5cGU7XG4gICAgICAgICAgICAvLyBvbmx5IHdhbnQgZXZlbnRzIHRvIGhhcHBlbiBpZiB3aWZpIHN0YXR1cyBoYXMgY2hhbmdlZFxuICAgICAgICAgICAgbGV0IHdpZmlTdGF0dXNDaGFuZ2VkID0gKHRoaXMucHJldmlvdXNXaWZpU3RhdHVzICE9IHRoaXMud2lmaVN0YXR1cyk7XG4gICAgICAgICAgICBpZiAod2lmaVN0YXR1c0NoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoKG5ld0Nvbm5lY3Rpb25UeXBlID09PSBjb25uZWN0aW9uVHlwZS53aWZpIHx8IG5ld0Nvbm5lY3Rpb25UeXBlID09PSBjb25uZWN0aW9uVHlwZS5ldGhlcm5ldCkpIHsgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3ZWxjb21lIGhvbWVcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnVzZXIuYnJpZGdlSXBBZGRyZXNzICYmIHRoaXMudXNlci51c2VybmFtZSAmJiB0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGVkQmVoYXZpb3IodGhpcy51c2VyLmJyaWRnZUlwQWRkcmVzcywgdGhpcy51c2VyLnVzZXJuYW1lLCB0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnb29kIGJ5ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RDb25uZWN0ZWRCZWhhdmlvcih0aGlzLnVzZXIuYnJpZGdlSXBBZGRyZXNzLCB0aGlzLnVzZXIudXNlcm5hbWUsIHRoaXMudXNlci5ncm91cFN0YXRlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQmVoYXZpb3IoYnJpZGdlSXAsIHVzZXJuYW1lLCBncm91cFN0YXRlcykge1xuICAgICAgICBncm91cFN0YXRlcy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgICAgIHRoaXMuaHVlU2VydmljZS5zZXRHcm91cFN0YXRlKGJyaWRnZUlwLCB1c2VybmFtZSwgc3RhdGUuZ3JvdXBJZCwge1xuICAgICAgICAgICAgICAgIFwic2NlbmVcIjogc3RhdGUuc2NlbmVJZFxuICAgICAgICAgICAgfSwgdHJ1ZSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBub3RDb25uZWN0ZWRCZWhhdmlvcihicmlkZ2VJcCwgdXNlcm5hbWUsIGdyb3VwU3RhdGVzKSB7XG4gICAgICAgIC8vIGZvciBub3csIGp1c3QgdHVybiBsaWdodHMgb2ZmIGlmIG5vdCBvbiBuZXR3b3JrXG4gICAgICAgIGdyb3VwU3RhdGVzLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5odWVTZXJ2aWNlLnNldEdyb3VwU3RhdGUoYnJpZGdlSXAsIHVzZXJuYW1lLCBzdGF0ZS5ncm91cElkLCB7XG4gICAgICAgICAgICAgICAgXCJvblwiOiBmYWxzZVxuICAgICAgICAgICAgfSwgZmFsc2UpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19