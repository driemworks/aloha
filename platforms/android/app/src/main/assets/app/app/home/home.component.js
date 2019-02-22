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
        this._store.dispatch(new hue_actions_1.UpdateLightStateAction(this.user, true, true));
    };
    HomeComponent.prototype.notConnectedBehavior = function () {
        this._store.dispatch(new hue_actions_1.UpdateLightStateAction(this.user, false, false));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw4REFBbUg7QUFFbkgscUNBQW9DO0FBQ3BDLHdEQUFrRTtBQUdsRSx1REFBcUQ7QUFDckQsdUNBQXVDO0FBQ3ZDLDhDQUE4QztBQVE5QztJQVdJLHVCQUFvQixNQUF1QixFQUFVLFVBQXNCO1FBQXZELFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVAzRSxlQUFVLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFFeEIscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBRWxDLHVCQUFrQixHQUFXLENBQUMsQ0FBQztRQUkzQiw4RUFBOEU7UUFDOUUsd0JBQXdCO1FBQ3hCLE1BQU07SUFDVixDQUFDO0lBRUosZ0NBQVEsR0FBUjtRQUFBLGlCQUtJO1FBSkcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxLQUFVLElBQUssT0FBQSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDbEUsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLHVDQUFlLEdBQXZCO1FBQUEsaUJBa0NDO1FBakNHLDhCQUFlLENBQUMsVUFBQSxpQkFBaUI7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hFLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO1lBQzFDLEtBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUM7WUFDcEMsd0RBQXdEO1lBQ3hELElBQUksaUJBQWlCLEdBQUcsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JFLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLGlCQUFpQixLQUFLLDZCQUFjLENBQUMsSUFBSSxJQUFJLGlCQUFpQixLQUFLLDZCQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckgsSUFBSSxpQkFBaUIsRUFBRTtnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3BFLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQ2pELElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFFOzRCQUNkLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBYTtnQ0FDN0YsdUJBQXVCO2dDQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7b0NBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUN4QyxDQUFDLENBQUMsQ0FBQTs0QkFDTixDQUFDLENBQUMsQ0FBQzt5QkFDTjt3QkFDRCxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFOzRCQUN2QixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzt5QkFDNUI7NkJBQU07NEJBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO3lCQUN6QztxQkFDSjtpQkFDSjtxQkFBTTtvQkFDSCxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO3dCQUN2QixLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztxQkFDL0I7aUJBQ0o7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDSSw2QkFBYyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELHlDQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksb0NBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsNENBQW9CLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxvQ0FBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUF0RVEsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ2hCLFFBQVEsRUFBRSxNQUFNO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDbkMsQ0FBQzt5Q0FZOEIsYUFBSyxFQUFnQyx3QkFBVTtPQVhsRSxhQUFhLENBdUV6QjtJQUFELG9CQUFDO0NBQUEsQUF2RUQsSUF1RUM7QUF2RVksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUsIHN0YXJ0TW9uaXRvcmluZywgc3RvcE1vbml0b3JpbmcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb25uZWN0aXZpdHlcIjtcbmltcG9ydCB7IFVzZXIsIGluaXRpYWxTdGF0ZSB9IGZyb20gJy4uL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgVXBkYXRlTGlnaHRTdGF0ZUFjdGlvbiB9IGZyb20gJy4uL3N0b3JlL2h1ZS9odWUuYWN0aW9ucyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcHBTdGF0ZSB9IGZyb20gJy4uL3N0b3JlL2FwcC5zdGF0ZSc7XG5pbXBvcnQgeyBIdWVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaHVlLnNlcnZpY2UnO1xuLy8gaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG4vLyBpbXBvcnQgeyBBdXRoMCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hdXRoMCc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnaG9tZScsXG5cdHRlbXBsYXRlVXJsOiAnLi9ob21lLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vaG9tZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIHVzZXI6IFVzZXI7XG4gICAgbGlnaHRzdGF0ZTogYW55O1xuICAgIHdpZmlTdGF0dXM6IG51bWJlciA9IC0xO1xuXG4gICAgY29ubmVjdGlvblN0YXR1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJldmlvdXNXaWZpU3RhdHVzOiBudW1iZXIgPSAwO1xuICAgIGdyb3VwczogYW55W107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zdG9yZTogU3RvcmU8QXBwU3RhdGU+LCBwcml2YXRlIGh1ZVNlcnZpY2U6IEh1ZVNlcnZpY2UpIHtcbiAgICAgICAgLy8gdGhpcy5fc3RvcmUuc2VsZWN0KChzdGF0ZTogYW55KSA9PiBzdGF0ZS5hcHBTdGF0ZS51c2VyKS5zdWJzY3JpYmUodXNlciA9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICAvLyB9KTtcbiAgICB9XG5cblx0bmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX3N0b3JlLnNlbGVjdCgoc3RhdGU6IGFueSkgPT4gc3RhdGUuYXBwU3RhdGUudXNlcikuc3Vic2NyaWJlKHVzZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3RhcnRNb25pdG9yaW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGFydE1vbml0b3JpbmcoKSB7XG4gICAgICAgIHN0YXJ0TW9uaXRvcmluZyhuZXdDb25uZWN0aW9uVHlwZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTW9uaXRvcmluZyB3aWZpIGNvbm5lY3Rpb246ICcgKyBuZXdDb25uZWN0aW9uVHlwZSk7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzV2lmaVN0YXR1cyA9IHRoaXMud2lmaVN0YXR1cztcbiAgICAgICAgICAgIHRoaXMud2lmaVN0YXR1cyA9IG5ld0Nvbm5lY3Rpb25UeXBlO1xuICAgICAgICAgICAgLy8gb25seSB3YW50IGV2ZW50cyB0byBoYXBwZW4gaWYgd2lmaSBzdGF0dXMgaGFzIGNoYW5nZWRcbiAgICAgICAgICAgIGxldCB3aWZpU3RhdHVzQ2hhbmdlZCA9ICh0aGlzLnByZXZpb3VzV2lmaVN0YXR1cyAhPSB0aGlzLndpZmlTdGF0dXMpO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdHVzID0gKG5ld0Nvbm5lY3Rpb25UeXBlID09PSBjb25uZWN0aW9uVHlwZS53aWZpIHx8IG5ld0Nvbm5lY3Rpb25UeXBlID09PSBjb25uZWN0aW9uVHlwZS5ldGhlcm5ldCk7XG4gICAgICAgICAgICBpZiAod2lmaVN0YXR1c0NoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVGhlIHdpZmkgc3RhdHVzIGNoYW5nZWQhJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ3JvdXAgc3RhdGVzJyArIEpTT04uc3RyaW5naWZ5KHRoaXMudXNlci5ncm91cFN0YXRlcykpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VyLmJyaWRnZUlwQWRkcmVzcyAmJiB0aGlzLnVzZXIudXNlcm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5ncm91cHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmh1ZVNlcnZpY2UuZ2V0R3JvdXBzKHRoaXMudXNlci5icmlkZ2VJcEFkZHJlc3MsIHRoaXMudXNlci51c2VybmFtZSkuc3Vic2NyaWJlKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdyb3VwSWQgLT4gZ3JvdXBOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHJlcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cHNba2V5XSA9IHJlc1trZXldWyduYW1lJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VyLmdyb3VwU3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0ZWRCZWhhdmlvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gZ3JvdXAgc3RhdGVzIGZvdW5kIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlci5ncm91cFN0YXRlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RDb25uZWN0ZWRCZWhhdmlvcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHN0b3BNb25pdG9yaW5nKCk7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQmVoYXZpb3IoKSB7XG4gICAgICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKG5ldyBVcGRhdGVMaWdodFN0YXRlQWN0aW9uKHRoaXMudXNlciwgdHJ1ZSwgdHJ1ZSkpO1xuICAgIH1cblxuICAgIG5vdENvbm5lY3RlZEJlaGF2aW9yKCkge1xuICAgICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChuZXcgVXBkYXRlTGlnaHRTdGF0ZUFjdGlvbih0aGlzLnVzZXIsIGZhbHNlLCBmYWxzZSkpO1xuICAgIH1cbn1cbiJdfQ==