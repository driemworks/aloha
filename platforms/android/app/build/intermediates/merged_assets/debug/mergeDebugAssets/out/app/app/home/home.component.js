"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var connectivity_1 = require("tns-core-modules/connectivity");
var store_1 = require("@ngrx/store");
var hue_actions_1 = require("../store/hue/hue.actions");
var hue_service_1 = require("../services/hue.service");
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
                            // this.connectedBehavior();
                        }
                        else {
                            console.log('No group states found!');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw4REFBbUg7QUFFbkgscUNBQW9DO0FBQ3BDLHdEQUFrRTtBQUdsRSx1REFBcUQ7QUFRckQ7SUFXSSx1QkFBb0IsTUFBdUIsRUFBVSxVQUFzQjtRQUEzRSxpQkFLQztRQUxtQixXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFQM0UsZUFBVSxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBRXhCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUVsQyx1QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFJM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxLQUFVLElBQUssT0FBQSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDbEUsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUosZ0NBQVEsR0FBUjtRQUNPLDhFQUE4RTtRQUM5RSx3QkFBd0I7UUFDeEIsbUVBQW1FO1FBQ25FLE1BQU07UUFDTixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLHVDQUFlLEdBQXZCO1FBQUEsaUJBa0NDO1FBakNHLDhCQUFlLENBQUMsVUFBQSxpQkFBaUI7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hFLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO1lBQzFDLEtBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUM7WUFDcEMsd0RBQXdEO1lBQ3hELElBQUksaUJBQWlCLEdBQUcsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JFLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLGlCQUFpQixLQUFLLDZCQUFjLENBQUMsSUFBSSxJQUFJLGlCQUFpQixLQUFLLDZCQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckgsSUFBSSxpQkFBaUIsRUFBRTtnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3BFLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQ2pELElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFFOzRCQUNkLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBYTtnQ0FDN0YsdUJBQXVCO2dDQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7b0NBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUN4QyxDQUFDLENBQUMsQ0FBQTs0QkFDTixDQUFDLENBQUMsQ0FBQzt5QkFDTjt3QkFDRCxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFOzRCQUN2Qiw0QkFBNEI7eUJBQy9COzZCQUFNOzRCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQzt5QkFDekM7cUJBQ0o7aUJBQ0o7cUJBQU07b0JBQ0gsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTt3QkFDdkIsK0JBQStCO3FCQUNsQztpQkFDSjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsbUNBQVcsR0FBWDtRQUNJLDZCQUFjLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQseUNBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxvQ0FBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRCw0Q0FBb0IsR0FBcEI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLG9DQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQXhFUSxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDaEIsUUFBUSxFQUFFLE1BQU07WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUNuQyxDQUFDO3lDQVk4QixhQUFLLEVBQWdDLHdCQUFVO09BWGxFLGFBQWEsQ0F5RXpCO0lBQUQsb0JBQUM7Q0FBQSxBQXpFRCxJQXlFQztBQXpFWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbm5lY3Rpb25UeXBlLCBnZXRDb25uZWN0aW9uVHlwZSwgc3RhcnRNb25pdG9yaW5nLCBzdG9wTW9uaXRvcmluZyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2Nvbm5lY3Rpdml0eVwiO1xuaW1wb3J0IHsgVXNlciwgaW5pdGlhbFN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBVcGRhdGVMaWdodFN0YXRlQWN0aW9uIH0gZnJvbSAnLi4vc3RvcmUvaHVlL2h1ZS5hY3Rpb25zJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwcFN0YXRlIH0gZnJvbSAnLi4vc3RvcmUvYXBwLnN0YXRlJztcbmltcG9ydCB7IEh1ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9odWUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnaG9tZScsXG5cdHRlbXBsYXRlVXJsOiAnLi9ob21lLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vaG9tZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIHVzZXI6IFVzZXI7XG4gICAgbGlnaHRzdGF0ZTogYW55O1xuICAgIHdpZmlTdGF0dXM6IG51bWJlciA9IC0xO1xuXG4gICAgY29ubmVjdGlvblN0YXR1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJldmlvdXNXaWZpU3RhdHVzOiBudW1iZXIgPSAwO1xuICAgIGdyb3VwczogYW55W107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zdG9yZTogU3RvcmU8QXBwU3RhdGU+LCBwcml2YXRlIGh1ZVNlcnZpY2U6IEh1ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUuc2VsZWN0KChzdGF0ZTogYW55KSA9PiBzdGF0ZS5hcHBTdGF0ZS51c2VyKS5zdWJzY3JpYmUodXNlciA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0lOIEhPTUUgLSBVU0lORyBVU0VSICcgKyBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXHRuZ09uSW5pdCgpIHtcbiAgICAgICAgLy8gdGhpcy5fc3RvcmUuc2VsZWN0KChzdGF0ZTogYW55KSA9PiBzdGF0ZS5hcHBTdGF0ZS51c2VyKS5zdWJzY3JpYmUodXNlciA9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ0lOIEhPTUUgLSBVU0lORyBVU0VSICcgKyBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gICAgICAgIC8vIH0pO1xuICAgICAgICB0aGlzLnN0YXJ0TW9uaXRvcmluZygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhcnRNb25pdG9yaW5nKCkge1xuICAgICAgICBzdGFydE1vbml0b3JpbmcobmV3Q29ubmVjdGlvblR5cGUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ01vbml0b3Jpbmcgd2lmaSBjb25uZWN0aW9uOiAnICsgbmV3Q29ubmVjdGlvblR5cGUpO1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c1dpZmlTdGF0dXMgPSB0aGlzLndpZmlTdGF0dXM7XG4gICAgICAgICAgICB0aGlzLndpZmlTdGF0dXMgPSBuZXdDb25uZWN0aW9uVHlwZTtcbiAgICAgICAgICAgIC8vIG9ubHkgd2FudCBldmVudHMgdG8gaGFwcGVuIGlmIHdpZmkgc3RhdHVzIGhhcyBjaGFuZ2VkXG4gICAgICAgICAgICBsZXQgd2lmaVN0YXR1c0NoYW5nZWQgPSAodGhpcy5wcmV2aW91c1dpZmlTdGF0dXMgIT0gdGhpcy53aWZpU3RhdHVzKTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXR1cyA9IChuZXdDb25uZWN0aW9uVHlwZSA9PT0gY29ubmVjdGlvblR5cGUud2lmaSB8fCBuZXdDb25uZWN0aW9uVHlwZSA9PT0gY29ubmVjdGlvblR5cGUuZXRoZXJuZXQpO1xuICAgICAgICAgICAgaWYgKHdpZmlTdGF0dXNDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RoZSB3aWZpIHN0YXR1cyBjaGFuZ2VkIScpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dyb3VwIHN0YXRlcycgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlci5icmlkZ2VJcEFkZHJlc3MgJiYgdGhpcy51c2VyLnVzZXJuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ3JvdXBzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odWVTZXJ2aWNlLmdldEdyb3Vwcyh0aGlzLnVzZXIuYnJpZGdlSXBBZGRyZXNzLCB0aGlzLnVzZXIudXNlcm5hbWUpLnN1YnNjcmliZSgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBncm91cElkIC0+IGdyb3VwTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhyZXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2tleV0gPSByZXNba2V5XVsnbmFtZSddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlci5ncm91cFN0YXRlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY29ubmVjdGVkQmVoYXZpb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIGdyb3VwIHN0YXRlcyBmb3VuZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMubm90Q29ubmVjdGVkQmVoYXZpb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBzdG9wTW9uaXRvcmluZygpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZEJlaGF2aW9yKCkge1xuICAgICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChuZXcgVXBkYXRlTGlnaHRTdGF0ZUFjdGlvbih0aGlzLnVzZXIsIHRydWUsIHRydWUpKTtcbiAgICB9XG5cbiAgICBub3RDb25uZWN0ZWRCZWhhdmlvcigpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2gobmV3IFVwZGF0ZUxpZ2h0U3RhdGVBY3Rpb24odGhpcy51c2VyLCBmYWxzZSwgZmFsc2UpKTtcbiAgICB9XG59XG4iXX0=