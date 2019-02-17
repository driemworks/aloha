"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var connectivity_1 = require("tns-core-modules/connectivity");
var store_1 = require("@ngrx/store");
var hue_actions_1 = require("../store/hue/hue.actions");
var hue_service_1 = require("../services/hue.service");
// import { Store } from '@ngrx/store';
// import { Auth0 } from 'nativescript-auth0';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_store, hueService) {
        this._store = _store;
        this.hueService = hueService;
        this.wifiStatus = -1;
        this.connectionStatus = false;
        this.previousWifiStatus = 0;
        // this._store.select((state: any) => state.appState.user).subscribe(user => {
        //     this.user = user;
        // });
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._store.select(function (state) { return state.appState.user; }).subscribe(function (user) {
            _this.user = user;
        });
        this.startMonitoring();
    };
    HomeComponent.prototype.startMonitoring = function () {
        var _this = this;
        connectivity_1.startMonitoring(function (newConnectionType) {
            console.log('Monitoring wifi connection: ' + newConnectionType);
            _this.previousWifiStatus = _this.wifiStatus;
            _this.wifiStatus = newConnectionType;
            // only want events to happen if wifi status has changed
            var wifiStatusChanged = (_this.previousWifiStatus != _this.wifiStatus);
            _this.connectionStatus = (newConnectionType === connectivity_1.connectionType.wifi || newConnectionType === connectivity_1.connectionType.ethernet);
            if (wifiStatusChanged) {
                console.log('The wifi status changed!');
                if (_this.connectionStatus) {
                    console.log('group states' + JSON.stringify(_this.user.groupStates));
                    if (_this.user.bridgeIpAddress && _this.user.username) {
                        if (!_this.groups) {
                            _this.hueService.getGroups(_this.user.bridgeIpAddress, _this.user.username).subscribe(function (res) {
                                // groupId -> groupName
                                Object.keys(res).forEach(function (key) {
                                    _this.groups[key] = res[key]['name'];
                                });
                            });
                        }
                        if (_this.user.groupStates) {
                            _this.connectedBehavior();
                        }
                        else {
                            console.log('No group states found!');
                        }
                    }
                }
                else {
                    if (_this.user.groupStates) {
                        _this.notConnectedBehavior();
                    }
                }
            }
        });
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        connectivity_1.stopMonitoring();
    };
    HomeComponent.prototype.connectedBehavior = function () {
        this._store.dispatch(new hue_actions_1.UpdateLightStateAction(this.user, true));
    };
    HomeComponent.prototype.notConnectedBehavior = function () {
        this._store.dispatch(new hue_actions_1.UpdateLightStateAction(this.user, false));
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [store_1.Store, hue_service_1.HueService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw4REFBbUg7QUFFbkgscUNBQW9DO0FBQ3BDLHdEQUFrRTtBQUdsRSx1REFBcUQ7QUFDckQsdUNBQXVDO0FBQ3ZDLDhDQUE4QztBQVE5QztJQVdJLHVCQUFvQixNQUF1QixFQUFVLFVBQXNCO1FBQXZELFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVAzRSxlQUFVLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFFeEIscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBRWxDLHVCQUFrQixHQUFXLENBQUMsQ0FBQztRQUkzQiw4RUFBOEU7UUFDOUUsd0JBQXdCO1FBQ3hCLE1BQU07SUFDVixDQUFDO0lBRUosZ0NBQVEsR0FBUjtRQUFBLGlCQUtJO1FBSkcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxLQUFVLElBQUssT0FBQSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDbEUsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLHVDQUFlLEdBQXZCO1FBQUEsaUJBa0NDO1FBakNHLDhCQUFlLENBQUMsVUFBQSxpQkFBaUI7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hFLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO1lBQzFDLEtBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUM7WUFDcEMsd0RBQXdEO1lBQ3hELElBQUksaUJBQWlCLEdBQUcsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JFLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLGlCQUFpQixLQUFLLDZCQUFjLENBQUMsSUFBSSxJQUFJLGlCQUFpQixLQUFLLDZCQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckgsSUFBSSxpQkFBaUIsRUFBRTtnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3BFLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQ2pELElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFFOzRCQUNkLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBYTtnQ0FDN0YsdUJBQXVCO2dDQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7b0NBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUN4QyxDQUFDLENBQUMsQ0FBQTs0QkFDTixDQUFDLENBQUMsQ0FBQzt5QkFDTjt3QkFDRCxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFOzRCQUN2QixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzt5QkFDNUI7NkJBQU07NEJBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO3lCQUN6QztxQkFDSjtpQkFDSjtxQkFBTTtvQkFDSCxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO3dCQUN2QixLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztxQkFDL0I7aUJBQ0o7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDSSw2QkFBYyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUlELHlDQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksb0NBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCw0Q0FBb0IsR0FBcEI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLG9DQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBeEVRLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNoQixRQUFRLEVBQUUsTUFBTTtZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ25DLENBQUM7eUNBWThCLGFBQUssRUFBZ0Msd0JBQVU7T0FYbEUsYUFBYSxDQXlFekI7SUFBRCxvQkFBQztDQUFBLEFBekVELElBeUVDO0FBekVZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29ubmVjdGlvblR5cGUsIGdldENvbm5lY3Rpb25UeXBlLCBzdGFydE1vbml0b3JpbmcsIHN0b3BNb25pdG9yaW5nIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvY29ubmVjdGl2aXR5XCI7XG5pbXBvcnQgeyBVc2VyLCBpbml0aWFsU3RhdGUgfSBmcm9tICcuLi9tb2RlbHMvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IFVwZGF0ZUxpZ2h0U3RhdGVBY3Rpb24gfSBmcm9tICcuLi9zdG9yZS9odWUvaHVlLmFjdGlvbnMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXBwU3RhdGUgfSBmcm9tICcuLi9zdG9yZS9hcHAuc3RhdGUnO1xuaW1wb3J0IHsgSHVlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2h1ZS5zZXJ2aWNlJztcbi8vIGltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuLy8gaW1wb3J0IHsgQXV0aDAgfSBmcm9tICduYXRpdmVzY3JpcHQtYXV0aDAnO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2hvbWUnLFxuXHR0ZW1wbGF0ZVVybDogJy4vaG9tZS5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2hvbWUuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICB1c2VyOiBVc2VyO1xuICAgIGxpZ2h0c3RhdGU6IGFueTtcbiAgICB3aWZpU3RhdHVzOiBudW1iZXIgPSAtMTtcblxuICAgIGNvbm5lY3Rpb25TdGF0dXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByZXZpb3VzV2lmaVN0YXR1czogbnVtYmVyID0gMDtcbiAgICBncm91cHM6IGFueVtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc3RvcmU6IFN0b3JlPEFwcFN0YXRlPiwgcHJpdmF0ZSBodWVTZXJ2aWNlOiBIdWVTZXJ2aWNlKSB7XG4gICAgICAgIC8vIHRoaXMuX3N0b3JlLnNlbGVjdCgoc3RhdGU6IGFueSkgPT4gc3RhdGUuYXBwU3RhdGUudXNlcikuc3Vic2NyaWJlKHVzZXIgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG5cdG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9zdG9yZS5zZWxlY3QoKHN0YXRlOiBhbnkpID0+IHN0YXRlLmFwcFN0YXRlLnVzZXIpLnN1YnNjcmliZSh1c2VyID0+IHtcbiAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN0YXJ0TW9uaXRvcmluZygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhcnRNb25pdG9yaW5nKCkge1xuICAgICAgICBzdGFydE1vbml0b3JpbmcobmV3Q29ubmVjdGlvblR5cGUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ01vbml0b3Jpbmcgd2lmaSBjb25uZWN0aW9uOiAnICsgbmV3Q29ubmVjdGlvblR5cGUpO1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1dpZmlTdGF0dXMgPSB0aGlzLndpZmlTdGF0dXM7XG4gICAgICAgICAgICB0aGlzLndpZmlTdGF0dXMgPSBuZXdDb25uZWN0aW9uVHlwZTtcbiAgICAgICAgICAgIC8vIG9ubHkgd2FudCBldmVudHMgdG8gaGFwcGVuIGlmIHdpZmkgc3RhdHVzIGhhcyBjaGFuZ2VkXG4gICAgICAgICAgICBsZXQgd2lmaVN0YXR1c0NoYW5nZWQgPSAodGhpcy5wcmV2aW91c1dpZmlTdGF0dXMgIT0gdGhpcy53aWZpU3RhdHVzKTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXR1cyA9IChuZXdDb25uZWN0aW9uVHlwZSA9PT0gY29ubmVjdGlvblR5cGUud2lmaSB8fCBuZXdDb25uZWN0aW9uVHlwZSA9PT0gY29ubmVjdGlvblR5cGUuZXRoZXJuZXQpO1xuICAgICAgICAgICAgaWYgKHdpZmlTdGF0dXNDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RoZSB3aWZpIHN0YXR1cyBjaGFuZ2VkIScpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dyb3VwIHN0YXRlcycgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlci5icmlkZ2VJcEFkZHJlc3MgJiYgdGhpcy51c2VyLnVzZXJuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ3JvdXBzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odWVTZXJ2aWNlLmdldEdyb3Vwcyh0aGlzLnVzZXIuYnJpZGdlSXBBZGRyZXNzLCB0aGlzLnVzZXIudXNlcm5hbWUpLnN1YnNjcmliZSgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBncm91cElkIC0+IGdyb3VwTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhyZXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2tleV0gPSByZXNba2V5XVsnbmFtZSddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlci5ncm91cFN0YXRlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGVkQmVoYXZpb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIGdyb3VwIHN0YXRlcyBmb3VuZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90Q29ubmVjdGVkQmVoYXZpb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBzdG9wTW9uaXRvcmluZygpO1xuICAgIH1cblxuIFxuXG4gICAgY29ubmVjdGVkQmVoYXZpb3IoKSB7XG4gICAgICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKG5ldyBVcGRhdGVMaWdodFN0YXRlQWN0aW9uKHRoaXMudXNlciwgdHJ1ZSkpO1xuICAgIH1cblxuICAgIG5vdENvbm5lY3RlZEJlaGF2aW9yKCkge1xuICAgICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChuZXcgVXBkYXRlTGlnaHRTdGF0ZUFjdGlvbih0aGlzLnVzZXIsIGZhbHNlKSk7XG4gICAgfVxufVxuIl19