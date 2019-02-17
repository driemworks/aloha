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
        this.user = null;
        this.wifiStatus = -1;
        this.connectionStatus = false;
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
            _this.connectionStatus = (newConnectionType === connectivity_1.connectionType.wifi || newConnectionType === connectivity_1.connectionType.ethernet);
            if (wifiStatusChanged) {
                console.log('The wifi status changed!');
                if (_this.connectionStatus) {
                    console.log('group states' + JSON.stringify(_this.user.groupStates));
                    if (_this.user.bridgeIpAddress && _this.user.username && _this.user.groupStates) {
                        if (!_this.groups) {
                            _this.hueService.getGroups(_this.user.bridgeIpAddress, _this.user.username).subscribe(function (res) {
                                // groupId -> groupName
                                console.log('Mapping group ids to names');
                                Object.keys(res).forEach(function (key) {
                                    _this.groups[key] = res[key]['name'];
                                });
                            });
                        }
                        // this.connectedBehavior();
                    }
                    else {
                        console.log('No group states available');
                    }
                }
                else {
                    // this.notConnectedBehavior();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw4REFBbUg7QUFFbkgscUNBQW9DO0FBQ3BDLHdEQUFrRTtBQUdsRSx1REFBcUQ7QUFDckQsdUNBQXVDO0FBQ3ZDLDhDQUE4QztBQVE5QztJQVdJLHVCQUFvQixNQUF1QixFQUFVLFVBQXNCO1FBQTNFLGlCQUlDO1FBSm1CLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVQzRSxTQUFJLEdBQVMsSUFBSSxDQUFDO1FBRWxCLGVBQVUsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUV4QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFFbEMsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBSTNCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQW5CLENBQW1CLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ2xFLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVKLGdDQUFRLEdBQVI7UUFDTyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLHVDQUFlLEdBQXZCO1FBQUEsaUJBK0JDO1FBOUJHLDhCQUFlLENBQUMsVUFBQSxpQkFBaUI7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hFLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO1lBQzFDLEtBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUM7WUFDcEMsd0RBQXdEO1lBQ3hELElBQUksaUJBQWlCLEdBQUcsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JFLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLGlCQUFpQixLQUFLLDZCQUFjLENBQUMsSUFBSSxJQUFJLGlCQUFpQixLQUFLLDZCQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckgsSUFBSSxpQkFBaUIsRUFBRTtnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3BFLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7d0JBQzFFLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFFOzRCQUNkLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBYTtnQ0FDN0YsdUJBQXVCO2dDQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0NBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztvQ0FDeEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQ3hDLENBQUMsQ0FBQyxDQUFBOzRCQUNOLENBQUMsQ0FBQyxDQUFDO3lCQUNOO3dCQUNELDRCQUE0QjtxQkFDL0I7eUJBQU07d0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO3FCQUM1QztpQkFDSjtxQkFBTTtvQkFDSCwrQkFBK0I7aUJBQ2xDO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQ0ksNkJBQWMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFJRCx5Q0FBaUIsR0FBakI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLG9DQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsNENBQW9CLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxvQ0FBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQWxFUSxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDaEIsUUFBUSxFQUFFLE1BQU07WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUNuQyxDQUFDO3lDQVk4QixhQUFLLEVBQWdDLHdCQUFVO09BWGxFLGFBQWEsQ0FtRXpCO0lBQUQsb0JBQUM7Q0FBQSxBQW5FRCxJQW1FQztBQW5FWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbm5lY3Rpb25UeXBlLCBnZXRDb25uZWN0aW9uVHlwZSwgc3RhcnRNb25pdG9yaW5nLCBzdG9wTW9uaXRvcmluZyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2Nvbm5lY3Rpdml0eVwiO1xuaW1wb3J0IHsgVXNlciwgaW5pdGlhbFN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBVcGRhdGVMaWdodFN0YXRlQWN0aW9uIH0gZnJvbSAnLi4vc3RvcmUvaHVlL2h1ZS5hY3Rpb25zJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwcFN0YXRlIH0gZnJvbSAnLi4vc3RvcmUvYXBwLnN0YXRlJztcbmltcG9ydCB7IEh1ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9odWUuc2VydmljZSc7XG4vLyBpbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbi8vIGltcG9ydCB7IEF1dGgwIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWF1dGgwJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdob21lJyxcblx0dGVtcGxhdGVVcmw6ICcuL2hvbWUuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9ob21lLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgdXNlcjogVXNlciA9IG51bGw7XG4gICAgbGlnaHRzdGF0ZTogYW55O1xuICAgIHdpZmlTdGF0dXM6IG51bWJlciA9IC0xO1xuXG4gICAgY29ubmVjdGlvblN0YXR1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJldmlvdXNXaWZpU3RhdHVzOiBudW1iZXIgPSAwO1xuICAgIGdyb3VwczogYW55W107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zdG9yZTogU3RvcmU8QXBwU3RhdGU+LCBwcml2YXRlIGh1ZVNlcnZpY2U6IEh1ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUuc2VsZWN0KChzdGF0ZTogYW55KSA9PiBzdGF0ZS5hcHBTdGF0ZS51c2VyKS5zdWJzY3JpYmUodXNlciA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICB9KTtcbiAgICB9XG5cblx0bmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc3RhcnRNb25pdG9yaW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGFydE1vbml0b3JpbmcoKSB7XG4gICAgICAgIHN0YXJ0TW9uaXRvcmluZyhuZXdDb25uZWN0aW9uVHlwZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTW9uaXRvcmluZyB3aWZpIGNvbm5lY3Rpb246ICcgKyBuZXdDb25uZWN0aW9uVHlwZSk7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzV2lmaVN0YXR1cyA9IHRoaXMud2lmaVN0YXR1cztcbiAgICAgICAgICAgIHRoaXMud2lmaVN0YXR1cyA9IG5ld0Nvbm5lY3Rpb25UeXBlO1xuICAgICAgICAgICAgLy8gb25seSB3YW50IGV2ZW50cyB0byBoYXBwZW4gaWYgd2lmaSBzdGF0dXMgaGFzIGNoYW5nZWRcbiAgICAgICAgICAgIGxldCB3aWZpU3RhdHVzQ2hhbmdlZCA9ICh0aGlzLnByZXZpb3VzV2lmaVN0YXR1cyAhPSB0aGlzLndpZmlTdGF0dXMpO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdHVzID0gKG5ld0Nvbm5lY3Rpb25UeXBlID09PSBjb25uZWN0aW9uVHlwZS53aWZpIHx8IG5ld0Nvbm5lY3Rpb25UeXBlID09PSBjb25uZWN0aW9uVHlwZS5ldGhlcm5ldCk7XG4gICAgICAgICAgICBpZiAod2lmaVN0YXR1c0NoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVGhlIHdpZmkgc3RhdHVzIGNoYW5nZWQhJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ3JvdXAgc3RhdGVzJyArIEpTT04uc3RyaW5naWZ5KHRoaXMudXNlci5ncm91cFN0YXRlcykpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VyLmJyaWRnZUlwQWRkcmVzcyAmJiB0aGlzLnVzZXIudXNlcm5hbWUgJiYgdGhpcy51c2VyLmdyb3VwU3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ3JvdXBzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odWVTZXJ2aWNlLmdldEdyb3Vwcyh0aGlzLnVzZXIuYnJpZGdlSXBBZGRyZXNzLCB0aGlzLnVzZXIudXNlcm5hbWUpLnN1YnNjcmliZSgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBncm91cElkIC0+IGdyb3VwTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTWFwcGluZyBncm91cCBpZHMgdG8gbmFtZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMocmVzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3Vwc1trZXldID0gcmVzW2tleV1bJ25hbWUnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY29ubmVjdGVkQmVoYXZpb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBncm91cCBzdGF0ZXMgYXZhaWxhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLm5vdENvbm5lY3RlZEJlaGF2aW9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHN0b3BNb25pdG9yaW5nKCk7XG4gICAgfVxuXG4gXG5cbiAgICBjb25uZWN0ZWRCZWhhdmlvcigpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2gobmV3IFVwZGF0ZUxpZ2h0U3RhdGVBY3Rpb24odGhpcy51c2VyLCB0cnVlKSk7XG4gICAgfVxuXG4gICAgbm90Q29ubmVjdGVkQmVoYXZpb3IoKSB7XG4gICAgICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKG5ldyBVcGRhdGVMaWdodFN0YXRlQWN0aW9uKHRoaXMudXNlciwgZmFsc2UpKTtcbiAgICB9XG59XG4iXX0=