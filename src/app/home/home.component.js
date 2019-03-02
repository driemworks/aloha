"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var connectivity_1 = require("tns-core-modules/connectivity");
var store_1 = require("@ngrx/store");
var hue_actions_1 = require("../store/hue/hue.actions");
var hue_service_1 = require("../services/hue.service");
/**
 * Monitors the users wifi connection status and dispatches actions based on it
 * @export HomeComponent
 * @class HomeComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @author Tony
 */
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_store, hueService) {
        var _this = this;
        this._store = _store;
        this.hueService = hueService;
        this.wifiStatus = -1;
        this.connectionStatus = false;
        this.previousWifiStatus = 0;
        this._store.select(function (state) { return state.appState.user; }).subscribe(function (user) {
            _this.user = user;
            console.log('IN HOME - USING USER ' + JSON.stringify(user));
        });
    }
    HomeComponent.prototype.ngOnInit = function () {
        // this._store.select((state: any) => state.appState.user).subscribe(user => {
        //     this.user = user;
        //     console.log('IN HOME - USING USER ' + JSON.stringify(user));
        // });
        this.startMonitoring();
    };
    HomeComponent.prototype.startMonitoring = function () {
        var _this = this;
        connectivity_1.startMonitoring(function (newConnectionType) {
            _this.previousWifiStatus = _this.wifiStatus;
            _this.wifiStatus = newConnectionType;
            // only want events to happen if wifi status has changed
            var wifiStatusChanged = (_this.previousWifiStatus != _this.wifiStatus);
            _this.connectionStatus = (newConnectionType === connectivity_1.connectionType.wifi || newConnectionType === connectivity_1.connectionType.ethernet);
            if (wifiStatusChanged) {
                if (_this.connectionStatus) {
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
                            // this.connectedBehavior();
                        }
                    }
                }
                else {
                    if (_this.user.groupStates) {
                        // this.notConnectedBehavior();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw4REFBbUg7QUFFbkgscUNBQW9DO0FBQ3BDLHdEQUFrRTtBQUdsRSx1REFBcUQ7QUFDckQ7Ozs7Ozs7R0FPRztBQVFIO0lBV0ksdUJBQW9CLE1BQXVCLEVBQVUsVUFBc0I7UUFBM0UsaUJBS0M7UUFMbUIsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBUDNFLGVBQVUsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUV4QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFFbEMsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBSTNCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQW5CLENBQW1CLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ2xFLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVKLGdDQUFRLEdBQVI7UUFDTyw4RUFBOEU7UUFDOUUsd0JBQXdCO1FBQ3hCLG1FQUFtRTtRQUNuRSxNQUFNO1FBQ04sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTyx1Q0FBZSxHQUF2QjtRQUFBLGlCQTZCQztRQTVCRyw4QkFBZSxDQUFDLFVBQUEsaUJBQWlCO1lBQzdCLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO1lBQzFDLEtBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUM7WUFDcEMsd0RBQXdEO1lBQ3hELElBQUksaUJBQWlCLEdBQUcsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JFLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLGlCQUFpQixLQUFLLDZCQUFjLENBQUMsSUFBSSxJQUFJLGlCQUFpQixLQUFLLDZCQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckgsSUFBSSxpQkFBaUIsRUFBRTtnQkFDbkIsSUFBSSxLQUFJLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3ZCLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQ2pELElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFFOzRCQUNkLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBYTtnQ0FDN0YsdUJBQXVCO2dDQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7b0NBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUN4QyxDQUFDLENBQUMsQ0FBQTs0QkFDTixDQUFDLENBQUMsQ0FBQzt5QkFDTjt3QkFDRCxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFOzRCQUN2Qiw0QkFBNEI7eUJBQy9CO3FCQUNKO2lCQUNKO3FCQUFNO29CQUNILElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7d0JBQ3ZCLCtCQUErQjtxQkFDbEM7aUJBQ0o7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDSSw2QkFBYyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELHlDQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksb0NBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsNENBQW9CLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxvQ0FBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFuRVEsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ2hCLFFBQVEsRUFBRSxNQUFNO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDbkMsQ0FBQzt5Q0FhOEIsYUFBSyxFQUFnQyx3QkFBVTtPQVhsRSxhQUFhLENBb0V6QjtJQUFELG9CQUFDO0NBQUEsQUFwRUQsSUFvRUM7QUFwRVksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUsIHN0YXJ0TW9uaXRvcmluZywgc3RvcE1vbml0b3JpbmcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb25uZWN0aXZpdHlcIjtcbmltcG9ydCB7IFVzZXIsIGluaXRpYWxTdGF0ZSB9IGZyb20gJy4uL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgVXBkYXRlTGlnaHRTdGF0ZUFjdGlvbiB9IGZyb20gJy4uL3N0b3JlL2h1ZS9odWUuYWN0aW9ucyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcHBTdGF0ZSB9IGZyb20gJy4uL3N0b3JlL2FwcC5zdGF0ZSc7XG5pbXBvcnQgeyBIdWVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaHVlLnNlcnZpY2UnO1xuLyoqXG4gKiBNb25pdG9ycyB0aGUgdXNlcnMgd2lmaSBjb25uZWN0aW9uIHN0YXR1cyBhbmQgZGlzcGF0Y2hlcyBhY3Rpb25zIGJhc2VkIG9uIGl0XG4gKiBAZXhwb3J0IEhvbWVDb21wb25lbnRcbiAqIEBjbGFzcyBIb21lQ29tcG9uZW50XG4gKiBAaW1wbGVtZW50cyB7T25Jbml0fVxuICogQGltcGxlbWVudHMge09uRGVzdHJveX1cbiAqIEBhdXRob3IgVG9ueVxuICovXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2hvbWUnLFxuXHR0ZW1wbGF0ZVVybDogJy4vaG9tZS5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2hvbWUuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIHVzZXI6IFVzZXI7XG4gICAgbGlnaHRzdGF0ZTogYW55O1xuICAgIHdpZmlTdGF0dXM6IG51bWJlciA9IC0xO1xuXG4gICAgY29ubmVjdGlvblN0YXR1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJldmlvdXNXaWZpU3RhdHVzOiBudW1iZXIgPSAwO1xuICAgIGdyb3VwczogYW55W107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zdG9yZTogU3RvcmU8QXBwU3RhdGU+LCBwcml2YXRlIGh1ZVNlcnZpY2U6IEh1ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUuc2VsZWN0KChzdGF0ZTogYW55KSA9PiBzdGF0ZS5hcHBTdGF0ZS51c2VyKS5zdWJzY3JpYmUodXNlciA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0lOIEhPTUUgLSBVU0lORyBVU0VSICcgKyBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXHRuZ09uSW5pdCgpIHtcbiAgICAgICAgLy8gdGhpcy5fc3RvcmUuc2VsZWN0KChzdGF0ZTogYW55KSA9PiBzdGF0ZS5hcHBTdGF0ZS51c2VyKS5zdWJzY3JpYmUodXNlciA9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ0lOIEhPTUUgLSBVU0lORyBVU0VSICcgKyBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gICAgICAgIC8vIH0pO1xuICAgICAgICB0aGlzLnN0YXJ0TW9uaXRvcmluZygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhcnRNb25pdG9yaW5nKCkge1xuICAgICAgICBzdGFydE1vbml0b3JpbmcobmV3Q29ubmVjdGlvblR5cGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1dpZmlTdGF0dXMgPSB0aGlzLndpZmlTdGF0dXM7XG4gICAgICAgICAgICB0aGlzLndpZmlTdGF0dXMgPSBuZXdDb25uZWN0aW9uVHlwZTtcbiAgICAgICAgICAgIC8vIG9ubHkgd2FudCBldmVudHMgdG8gaGFwcGVuIGlmIHdpZmkgc3RhdHVzIGhhcyBjaGFuZ2VkXG4gICAgICAgICAgICBsZXQgd2lmaVN0YXR1c0NoYW5nZWQgPSAodGhpcy5wcmV2aW91c1dpZmlTdGF0dXMgIT0gdGhpcy53aWZpU3RhdHVzKTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXR1cyA9IChuZXdDb25uZWN0aW9uVHlwZSA9PT0gY29ubmVjdGlvblR5cGUud2lmaSB8fCBuZXdDb25uZWN0aW9uVHlwZSA9PT0gY29ubmVjdGlvblR5cGUuZXRoZXJuZXQpO1xuICAgICAgICAgICAgaWYgKHdpZmlTdGF0dXNDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VyLmJyaWRnZUlwQWRkcmVzcyAmJiB0aGlzLnVzZXIudXNlcm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5ncm91cHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmh1ZVNlcnZpY2UuZ2V0R3JvdXBzKHRoaXMudXNlci5icmlkZ2VJcEFkZHJlc3MsIHRoaXMudXNlci51c2VybmFtZSkuc3Vic2NyaWJlKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdyb3VwSWQgLT4gZ3JvdXBOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHJlcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cHNba2V5XSA9IHJlc1trZXldWyduYW1lJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VyLmdyb3VwU3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5jb25uZWN0ZWRCZWhhdmlvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlci5ncm91cFN0YXRlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5ub3RDb25uZWN0ZWRCZWhhdmlvcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHN0b3BNb25pdG9yaW5nKCk7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQmVoYXZpb3IoKSB7XG4gICAgICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKG5ldyBVcGRhdGVMaWdodFN0YXRlQWN0aW9uKHRoaXMudXNlciwgdHJ1ZSwgdHJ1ZSkpO1xuICAgIH1cblxuICAgIG5vdENvbm5lY3RlZEJlaGF2aW9yKCkge1xuICAgICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChuZXcgVXBkYXRlTGlnaHRTdGF0ZUFjdGlvbih0aGlzLnVzZXIsIGZhbHNlLCBmYWxzZSkpO1xuICAgIH1cbn1cbiJdfQ==