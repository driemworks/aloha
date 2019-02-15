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
        var _this = this;
        this._store = _store;
        this.hueService = hueService;
        this.wifiStatus = -1;
        this.previousWifiStatus = 0;
        this._store.select(function (state) { return state.appState.user; }).subscribe(function (user) {
            _this.user = user;
        });
    }
    HomeComponent.prototype.ngOnInit = function () {
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
            if (wifiStatusChanged) {
                console.log('The wifi status changed!');
                if ((newConnectionType === connectivity_1.connectionType.wifi || newConnectionType === connectivity_1.connectionType.ethernet)) {
                    console.log('group states' + JSON.stringify(_this.user.groupStates));
                    if (_this.user.bridgeIpAddress && _this.user.username && _this.user.groupStates) {
                        _this.connectedBehavior();
                    }
                    else {
                        console.log('No group states available');
                    }
                }
                else {
                    _this.notConnectedBehavior();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw4REFBbUg7QUFFbkgscUNBQW9DO0FBQ3BDLHdEQUFrRTtBQUdsRSx1REFBcUQ7QUFDckQsdUNBQXVDO0FBQ3ZDLDhDQUE4QztBQVM5QztJQU9JLHVCQUFvQixNQUF1QixFQUFVLFVBQXNCO1FBQTNFLGlCQUlDO1FBSm1CLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUgzRSxlQUFVLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDeEIsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRzNCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQW5CLENBQW1CLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ2xFLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVKLGdDQUFRLEdBQVI7UUFDTyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLHVDQUFlLEdBQXZCO1FBQUEsaUJBc0JDO1FBckJHLDhCQUFlLENBQUMsVUFBQSxpQkFBaUI7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDO1lBRWhFLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO1lBQzFDLEtBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUM7WUFDcEMsd0RBQXdEO1lBQ3hELElBQUksaUJBQWlCLEdBQUcsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JFLElBQUksaUJBQWlCLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLGlCQUFpQixLQUFLLDZCQUFjLENBQUMsSUFBSSxJQUFJLGlCQUFpQixLQUFLLDZCQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQzlGLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNwRSxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO3dCQUMxRSxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztxQkFDNUI7eUJBQU07d0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO3FCQUM1QztpQkFDSjtxQkFBTTtvQkFDSCxLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztpQkFDL0I7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDSSw2QkFBYyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUlELHlDQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksb0NBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCw0Q0FBb0IsR0FBcEI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLG9DQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBckRRLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNoQixRQUFRLEVBQUUsTUFBTTtZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ25DLENBQUM7eUNBUzhCLGFBQUssRUFBZ0Msd0JBQVU7T0FQbEUsYUFBYSxDQXNEekI7SUFBRCxvQkFBQztDQUFBLEFBdERELElBc0RDO0FBdERZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29ubmVjdGlvblR5cGUsIGdldENvbm5lY3Rpb25UeXBlLCBzdGFydE1vbml0b3JpbmcsIHN0b3BNb25pdG9yaW5nIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvY29ubmVjdGl2aXR5XCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBVcGRhdGVMaWdodFN0YXRlQWN0aW9uIH0gZnJvbSAnLi4vc3RvcmUvaHVlL2h1ZS5hY3Rpb25zJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwcFN0YXRlIH0gZnJvbSAnLi4vc3RvcmUvYXBwLnN0YXRlJztcbmltcG9ydCB7IEh1ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9odWUuc2VydmljZSc7XG4vLyBpbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbi8vIGltcG9ydCB7IEF1dGgwIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWF1dGgwJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdob21lJyxcblx0dGVtcGxhdGVVcmw6ICcuL2hvbWUuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9ob21lLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICB1c2VyOiBVc2VyO1xuICAgIGxpZ2h0c3RhdGU6IGFueTtcbiAgICB3aWZpU3RhdHVzOiBudW1iZXIgPSAtMTtcbiAgICBwcmV2aW91c1dpZmlTdGF0dXM6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zdG9yZTogU3RvcmU8QXBwU3RhdGU+LCBwcml2YXRlIGh1ZVNlcnZpY2U6IEh1ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUuc2VsZWN0KChzdGF0ZTogYW55KSA9PiBzdGF0ZS5hcHBTdGF0ZS51c2VyKS5zdWJzY3JpYmUodXNlciA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblx0bmdPbkluaXQoKSB7ICBcbiAgICAgICAgdGhpcy5zdGFydE1vbml0b3JpbmcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXJ0TW9uaXRvcmluZygpIHtcbiAgICAgICAgc3RhcnRNb25pdG9yaW5nKG5ld0Nvbm5lY3Rpb25UeXBlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNb25pdG9yaW5nIHdpZmkgY29ubmVjdGlvbjogJyArIG5ld0Nvbm5lY3Rpb25UeXBlKTtcblxuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1dpZmlTdGF0dXMgPSB0aGlzLndpZmlTdGF0dXM7XG4gICAgICAgICAgICB0aGlzLndpZmlTdGF0dXMgPSBuZXdDb25uZWN0aW9uVHlwZTtcbiAgICAgICAgICAgIC8vIG9ubHkgd2FudCBldmVudHMgdG8gaGFwcGVuIGlmIHdpZmkgc3RhdHVzIGhhcyBjaGFuZ2VkXG4gICAgICAgICAgICBsZXQgd2lmaVN0YXR1c0NoYW5nZWQgPSAodGhpcy5wcmV2aW91c1dpZmlTdGF0dXMgIT0gdGhpcy53aWZpU3RhdHVzKTtcbiAgICAgICAgICAgIGlmICh3aWZpU3RhdHVzQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUaGUgd2lmaSBzdGF0dXMgY2hhbmdlZCEnKTtcbiAgICAgICAgICAgICAgICBpZiAoKG5ld0Nvbm5lY3Rpb25UeXBlID09PSBjb25uZWN0aW9uVHlwZS53aWZpIHx8IG5ld0Nvbm5lY3Rpb25UeXBlID09PSBjb25uZWN0aW9uVHlwZS5ldGhlcm5ldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dyb3VwIHN0YXRlcycgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlci5icmlkZ2VJcEFkZHJlc3MgJiYgdGhpcy51c2VyLnVzZXJuYW1lICYmIHRoaXMudXNlci5ncm91cFN0YXRlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0ZWRCZWhhdmlvcigpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIGdyb3VwIHN0YXRlcyBhdmFpbGFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90Q29ubmVjdGVkQmVoYXZpb3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgc3RvcE1vbml0b3JpbmcoKTtcbiAgICB9XG5cbiBcblxuICAgIGNvbm5lY3RlZEJlaGF2aW9yKCkge1xuICAgICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChuZXcgVXBkYXRlTGlnaHRTdGF0ZUFjdGlvbih0aGlzLnVzZXIsIHRydWUpKTtcbiAgICB9XG5cbiAgICBub3RDb25uZWN0ZWRCZWhhdmlvcigpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2gobmV3IFVwZGF0ZUxpZ2h0U3RhdGVBY3Rpb24odGhpcy51c2VyLCBmYWxzZSkpO1xuICAgIH1cbn1cbiJdfQ==