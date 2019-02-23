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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw4REFBbUg7QUFFbkgscUNBQW9DO0FBQ3BDLHdEQUFrRTtBQUdsRSx1REFBcUQ7QUFDckQsdUNBQXVDO0FBQ3ZDLDhDQUE4QztBQVE5QztJQVdJLHVCQUFvQixNQUF1QixFQUFVLFVBQXNCO1FBQXZELFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVAzRSxlQUFVLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFFeEIscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBRWxDLHVCQUFrQixHQUFXLENBQUMsQ0FBQztRQUkzQiw4RUFBOEU7UUFDOUUsd0JBQXdCO1FBQ3hCLE1BQU07SUFDVixDQUFDO0lBRUosZ0NBQVEsR0FBUjtRQUFBLGlCQUtJO1FBSkcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxLQUFVLElBQUssT0FBQSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDbEUsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLHVDQUFlLEdBQXZCO1FBQUEsaUJBa0NDO1FBakNHLDhCQUFlLENBQUMsVUFBQSxpQkFBaUI7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hFLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO1lBQzFDLEtBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUM7WUFDcEMsd0RBQXdEO1lBQ3hELElBQUksaUJBQWlCLEdBQUcsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JFLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLGlCQUFpQixLQUFLLDZCQUFjLENBQUMsSUFBSSxJQUFJLGlCQUFpQixLQUFLLDZCQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckgsSUFBSSxpQkFBaUIsRUFBRTtnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3BFLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQ2pELElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFFOzRCQUNkLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBYTtnQ0FDN0YsdUJBQXVCO2dDQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7b0NBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUN4QyxDQUFDLENBQUMsQ0FBQTs0QkFDTixDQUFDLENBQUMsQ0FBQzt5QkFDTjt3QkFDRCxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFOzRCQUN2Qiw0QkFBNEI7eUJBQy9COzZCQUFNOzRCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQzt5QkFDekM7cUJBQ0o7aUJBQ0o7cUJBQU07b0JBQ0gsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTt3QkFDdkIsK0JBQStCO3FCQUNsQztpQkFDSjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsbUNBQVcsR0FBWDtRQUNJLDZCQUFjLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQseUNBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxvQ0FBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRCw0Q0FBb0IsR0FBcEI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLG9DQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQXRFUSxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDaEIsUUFBUSxFQUFFLE1BQU07WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUNuQyxDQUFDO3lDQVk4QixhQUFLLEVBQWdDLHdCQUFVO09BWGxFLGFBQWEsQ0F1RXpCO0lBQUQsb0JBQUM7Q0FBQSxBQXZFRCxJQXVFQztBQXZFWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbm5lY3Rpb25UeXBlLCBnZXRDb25uZWN0aW9uVHlwZSwgc3RhcnRNb25pdG9yaW5nLCBzdG9wTW9uaXRvcmluZyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2Nvbm5lY3Rpdml0eVwiO1xuaW1wb3J0IHsgVXNlciwgaW5pdGlhbFN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBVcGRhdGVMaWdodFN0YXRlQWN0aW9uIH0gZnJvbSAnLi4vc3RvcmUvaHVlL2h1ZS5hY3Rpb25zJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwcFN0YXRlIH0gZnJvbSAnLi4vc3RvcmUvYXBwLnN0YXRlJztcbmltcG9ydCB7IEh1ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9odWUuc2VydmljZSc7XG4vLyBpbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbi8vIGltcG9ydCB7IEF1dGgwIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWF1dGgwJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdob21lJyxcblx0dGVtcGxhdGVVcmw6ICcuL2hvbWUuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9ob21lLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgdXNlcjogVXNlcjtcbiAgICBsaWdodHN0YXRlOiBhbnk7XG4gICAgd2lmaVN0YXR1czogbnVtYmVyID0gLTE7XG5cbiAgICBjb25uZWN0aW9uU3RhdHVzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcmV2aW91c1dpZmlTdGF0dXM6IG51bWJlciA9IDA7XG4gICAgZ3JvdXBzOiBhbnlbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3N0b3JlOiBTdG9yZTxBcHBTdGF0ZT4sIHByaXZhdGUgaHVlU2VydmljZTogSHVlU2VydmljZSkge1xuICAgICAgICAvLyB0aGlzLl9zdG9yZS5zZWxlY3QoKHN0YXRlOiBhbnkpID0+IHN0YXRlLmFwcFN0YXRlLnVzZXIpLnN1YnNjcmliZSh1c2VyID0+IHtcbiAgICAgICAgLy8gICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuXHRuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUuc2VsZWN0KChzdGF0ZTogYW55KSA9PiBzdGF0ZS5hcHBTdGF0ZS51c2VyKS5zdWJzY3JpYmUodXNlciA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdGFydE1vbml0b3JpbmcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXJ0TW9uaXRvcmluZygpIHtcbiAgICAgICAgc3RhcnRNb25pdG9yaW5nKG5ld0Nvbm5lY3Rpb25UeXBlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNb25pdG9yaW5nIHdpZmkgY29ubmVjdGlvbjogJyArIG5ld0Nvbm5lY3Rpb25UeXBlKTtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNXaWZpU3RhdHVzID0gdGhpcy53aWZpU3RhdHVzO1xuICAgICAgICAgICAgdGhpcy53aWZpU3RhdHVzID0gbmV3Q29ubmVjdGlvblR5cGU7XG4gICAgICAgICAgICAvLyBvbmx5IHdhbnQgZXZlbnRzIHRvIGhhcHBlbiBpZiB3aWZpIHN0YXR1cyBoYXMgY2hhbmdlZFxuICAgICAgICAgICAgbGV0IHdpZmlTdGF0dXNDaGFuZ2VkID0gKHRoaXMucHJldmlvdXNXaWZpU3RhdHVzICE9IHRoaXMud2lmaVN0YXR1cyk7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0dXMgPSAobmV3Q29ubmVjdGlvblR5cGUgPT09IGNvbm5lY3Rpb25UeXBlLndpZmkgfHwgbmV3Q29ubmVjdGlvblR5cGUgPT09IGNvbm5lY3Rpb25UeXBlLmV0aGVybmV0KTtcbiAgICAgICAgICAgIGlmICh3aWZpU3RhdHVzQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUaGUgd2lmaSBzdGF0dXMgY2hhbmdlZCEnKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdncm91cCBzdGF0ZXMnICsgSlNPTi5zdHJpbmdpZnkodGhpcy51c2VyLmdyb3VwU3RhdGVzKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnVzZXIuYnJpZGdlSXBBZGRyZXNzICYmIHRoaXMudXNlci51c2VybmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmdyb3Vwcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaHVlU2VydmljZS5nZXRHcm91cHModGhpcy51c2VyLmJyaWRnZUlwQWRkcmVzcywgdGhpcy51c2VyLnVzZXJuYW1lKS5zdWJzY3JpYmUoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ3JvdXBJZCAtPiBncm91cE5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMocmVzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3Vwc1trZXldID0gcmVzW2tleV1bJ25hbWUnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmNvbm5lY3RlZEJlaGF2aW9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBncm91cCBzdGF0ZXMgZm91bmQhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VyLmdyb3VwU3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLm5vdENvbm5lY3RlZEJlaGF2aW9yKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgc3RvcE1vbml0b3JpbmcoKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRCZWhhdmlvcigpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2gobmV3IFVwZGF0ZUxpZ2h0U3RhdGVBY3Rpb24odGhpcy51c2VyLCB0cnVlLCB0cnVlKSk7XG4gICAgfVxuXG4gICAgbm90Q29ubmVjdGVkQmVoYXZpb3IoKSB7XG4gICAgICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKG5ldyBVcGRhdGVMaWdodFN0YXRlQWN0aW9uKHRoaXMudXNlciwgZmFsc2UsIGZhbHNlKSk7XG4gICAgfVxufVxuIl19