"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var hue_service_1 = require("../services/hue.service");
var store_1 = require("@ngrx/store");
var router_1 = require("@angular/router");
var light_management_info_component_1 = require("./light-management-info/light-management-info.component");
var LightManagementComponent = /** @class */ (function () {
    function LightManagementComponent(store, router, hueService) {
        var _this = this;
        this.store = store;
        this.router = router;
        this.hueService = hueService;
        this.scenes = [];
        this.editMode = false;
        this.store.select(function (state) { return state.appState.user; }).subscribe(function (user) {
            _this.user = user;
        });
        var mockScene = {
            name: 'test scene name',
            groupName: 'test group name',
            groupId: "1",
            id: "adfadfadsfadf",
            enableOnHome: true
        };
        var anotherMock = {
            name: 'Mock Scene 2',
            groupName: 'Mock groupname 2',
            id: "adfakif39vnsfg",
            groupId: "3",
            enableOnHome: false
        };
        // this.scenes[0] = mockScene;
        // this.scenes[1] = anotherMock;
    }
    LightManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.hueService.getGroups(this.user.bridgeIpAddress, this.user.username).subscribe(function (groupsResponse) {
            _this.hueService.getScenes(_this.user.bridgeIpAddress, _this.user.username).subscribe(function (res) {
                var idx = 0;
                Object.keys(res).forEach(function (key) {
                    if (res[key].type === 'GroupScene') {
                        var groupId = res[key]['group'];
                        var groupName = groupsResponse[groupId]['name'];
                        var enableOnHome = false;
                        _this.user.groupStates.forEach(function (groupstate) {
                            if (groupstate.sceneId === key) {
                                enableOnHome = true;
                            }
                        });
                        var scene = {
                            name: res[key]['name'],
                            groupName: groupName,
                            id: key,
                            groupId: groupId,
                            enableOnHome: enableOnHome
                        };
                        _this.scenes[idx] = scene;
                        idx += 1;
                    }
                });
            });
        });
    };
    LightManagementComponent.prototype.onTap = function (btn) {
        this.editMode = !this.editMode;
        if (this.editMode) {
            btn.text = 'SAVE';
        }
        else {
            btn.text = 'EDIT';
        }
    };
    LightManagementComponent.prototype.onSaveTap = function () {
        var _this = this;
        console.log('SAVE');
        this.editMode = !this.editMode;
        this.lightInfoList.forEach(function (info) {
            if (info.changed) {
                if (info.groupState === null) {
                    _this.user.groupStates.forEach(function (groupstate) {
                        if (groupstate.sceneId === info.scene.id) {
                            _this.user.groupStates.pop();
                        }
                    });
                }
                else {
                    _this.user.groupStates.push(info.groupState);
                }
            }
        });
    };
    LightManagementComponent.prototype.onCancelTap = function (args) {
        console.log('cancel tapped');
        this.editMode = false;
        this.lightInfoList.forEach(function (info) {
            if (info.changed) {
                info.checked = info.scene.enableOnHome;
            }
        });
    };
    __decorate([
        core_1.ViewChildren(light_management_info_component_1.LightManagementInfoComponent),
        __metadata("design:type", core_1.QueryList)
    ], LightManagementComponent.prototype, "lightInfoList", void 0);
    LightManagementComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'light-management',
            templateUrl: './light-management.component.html',
            styleUrls: ['./light-management.component.css']
        }),
        __metadata("design:paramtypes", [store_1.Store,
            router_1.Router,
            hue_service_1.HueService])
    ], LightManagementComponent);
    return LightManagementComponent;
}());
exports.LightManagementComponent = LightManagementComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHQtbWFuYWdlbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaWdodC1tYW5hZ2VtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RjtBQUM3Rix1REFBcUQ7QUFDckQscUNBQW9DO0FBSXBDLDBDQUF5QztBQUN6QywyR0FBdUc7QUFTdkc7SUFRQyxrQ0FBb0IsS0FBc0IsRUFDL0IsTUFBYyxFQUNkLFVBQXNCO1FBRmpDLGlCQXdCQztRQXhCbUIsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFDL0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGVBQVUsR0FBVixVQUFVLENBQVk7UUFQakMsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUNuQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBUXpCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQW5CLENBQW1CLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ3BFLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxTQUFTLEdBQVU7WUFDdEIsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixTQUFTLEVBQUUsaUJBQWlCO1lBQzVCLE9BQU8sRUFBRSxHQUFHO1lBQ1osRUFBRSxFQUFFLGVBQWU7WUFDbkIsWUFBWSxFQUFFLElBQUk7U0FDbEIsQ0FBQTtRQUNELElBQUksV0FBVyxHQUFVO1lBQ3hCLElBQUksRUFBRSxjQUFjO1lBQ3BCLFNBQVMsRUFBRSxrQkFBa0I7WUFDN0IsRUFBRSxFQUFFLGdCQUFnQjtZQUNwQixPQUFPLEVBQUUsR0FBRztZQUNaLFlBQVksRUFBRSxLQUFLO1NBQ25CLENBQUE7UUFDRCw4QkFBOEI7UUFDOUIsZ0NBQWdDO0lBQ2pDLENBQUM7SUFFRCwyQ0FBUSxHQUFS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SUFDSixDQUFDO0lBRUQsOENBQVcsR0FBWCxVQUFZLElBQUk7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUM5QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7YUFDdkM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUVKLENBQUM7SUEvRjJDO1FBQTNDLG1CQUFZLENBQUMsOERBQTRCLENBQUM7a0NBQWdCLGdCQUFTO21FQUErQjtJQU52Rix3QkFBd0I7UUFQcEMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFdBQVcsRUFBRSxtQ0FBbUM7WUFDaEQsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7U0FDL0MsQ0FBQzt5Q0FVMEIsYUFBSztZQUNiLGVBQU07WUFDRix3QkFBVTtPQVZyQix3QkFBd0IsQ0F1R3BDO0lBQUQsK0JBQUM7Q0FBQSxBQXZHRCxJQXVHQztBQXZHWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVuLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh1ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9odWUuc2VydmljZSc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IEFwcFN0YXRlIH0gZnJvbSAnLi4vc3RvcmUvYXBwLnN0YXRlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9tb2RlbHMvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBTY2VuZSB9IGZyb20gJy4uL21vZGVscy9zY2VuZS5tb2RlbCc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTGlnaHRNYW5hZ2VtZW50SW5mb0NvbXBvbmVudCB9IGZyb20gJy4vbGlnaHQtbWFuYWdlbWVudC1pbmZvL2xpZ2h0LW1hbmFnZW1lbnQtaW5mby5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdsaWdodC1tYW5hZ2VtZW50Jyxcblx0dGVtcGxhdGVVcmw6ICcuL2xpZ2h0LW1hbmFnZW1lbnQuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9saWdodC1tYW5hZ2VtZW50LmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIExpZ2h0TWFuYWdlbWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0cHJpdmF0ZSB1c2VyOiBVc2VyO1xuXHRzY2VuZXM6IGFueVtdID0gW107XG5cdGVkaXRNb2RlOiBib29sZWFuID0gZmFsc2U7XG5cblx0QFZpZXdDaGlsZHJlbihMaWdodE1hbmFnZW1lbnRJbmZvQ29tcG9uZW50KSBsaWdodEluZm9MaXN0OiBRdWVyeUxpc3Q8TGlnaHRNYW5hZ2VtZW50SW5mb0NvbXBvbmVudD47XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogU3RvcmU8QXBwU3RhdGU+LFxuXHRcdFx0XHRwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuXHRcdFx0XHRwcml2YXRlIGh1ZVNlcnZpY2U6IEh1ZVNlcnZpY2UpIHsgXG5cblx0XHR0aGlzLnN0b3JlLnNlbGVjdCgoc3RhdGU6IGFueSkgPT4gc3RhdGUuYXBwU3RhdGUudXNlcikuc3Vic2NyaWJlKHVzZXIgPT4ge1xuXHRcdFx0dGhpcy51c2VyID0gdXNlcjtcblx0XHR9KTtcblx0XHRcblx0XHRsZXQgbW9ja1NjZW5lOiBTY2VuZSA9IHtcblx0XHRcdG5hbWU6ICd0ZXN0IHNjZW5lIG5hbWUnLFxuXHRcdFx0Z3JvdXBOYW1lOiAndGVzdCBncm91cCBuYW1lJyxcblx0XHRcdGdyb3VwSWQ6IFwiMVwiLFxuXHRcdFx0aWQ6IFwiYWRmYWRmYWRzZmFkZlwiLFxuXHRcdFx0ZW5hYmxlT25Ib21lOiB0cnVlXG5cdFx0fVxuXHRcdGxldCBhbm90aGVyTW9jazogU2NlbmUgPSB7XG5cdFx0XHRuYW1lOiAnTW9jayBTY2VuZSAyJyxcblx0XHRcdGdyb3VwTmFtZTogJ01vY2sgZ3JvdXBuYW1lIDInLFxuXHRcdFx0aWQ6IFwiYWRmYWtpZjM5dm5zZmdcIixcblx0XHRcdGdyb3VwSWQ6IFwiM1wiLFxuXHRcdFx0ZW5hYmxlT25Ib21lOiBmYWxzZVxuXHRcdH1cblx0XHQvLyB0aGlzLnNjZW5lc1swXSA9IG1vY2tTY2VuZTtcblx0XHQvLyB0aGlzLnNjZW5lc1sxXSA9IGFub3RoZXJNb2NrO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5odWVTZXJ2aWNlLmdldEdyb3Vwcyh0aGlzLnVzZXIuYnJpZGdlSXBBZGRyZXNzLCB0aGlzLnVzZXIudXNlcm5hbWUpLnN1YnNjcmliZSgoZ3JvdXBzUmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG5cdFx0XHR0aGlzLmh1ZVNlcnZpY2UuZ2V0U2NlbmVzKHRoaXMudXNlci5icmlkZ2VJcEFkZHJlc3MsIHRoaXMudXNlci51c2VybmFtZSkuc3Vic2NyaWJlKChyZXM6IFJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdHZhciBpZHggPSAwO1xuXHRcdFx0XHRPYmplY3Qua2V5cyhyZXMpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdFx0XHRpZiAocmVzW2tleV0udHlwZSA9PT0gJ0dyb3VwU2NlbmUnKSB7XG5cdFx0XHRcdFx0XHR2YXIgZ3JvdXBJZCA9IHJlc1trZXldWydncm91cCddO1xuXHRcdFx0XHRcdFx0dmFyIGdyb3VwTmFtZSA9IGdyb3Vwc1Jlc3BvbnNlW2dyb3VwSWRdWyduYW1lJ107XG5cdFx0XHRcdFx0XHR2YXIgZW5hYmxlT25Ib21lID0gZmFsc2U7XG5cblx0XHRcdFx0XHRcdHRoaXMudXNlci5ncm91cFN0YXRlcy5mb3JFYWNoKGdyb3Vwc3RhdGUgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoZ3JvdXBzdGF0ZS5zY2VuZUlkID09PSBrZXkpIHtcblx0XHRcdFx0XHRcdFx0XHRlbmFibGVPbkhvbWUgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0bGV0IHNjZW5lOiBTY2VuZSA9IHtcblx0XHRcdFx0XHRcdFx0bmFtZTogcmVzW2tleV1bJ25hbWUnXSxcblx0XHRcdFx0XHRcdFx0Z3JvdXBOYW1lOiBncm91cE5hbWUsXG5cdFx0XHRcdFx0XHRcdGlkOiBrZXksXG5cdFx0XHRcdFx0XHRcdGdyb3VwSWQ6IGdyb3VwSWQsXG5cdFx0XHRcdFx0XHRcdGVuYWJsZU9uSG9tZTogZW5hYmxlT25Ib21lXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0dGhpcy5zY2VuZXNbaWR4XSA9IHNjZW5lO1xuXHRcdFx0XHRcdFx0aWR4ICs9IDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0b25UYXAoYnRuKSB7XG5cdFx0dGhpcy5lZGl0TW9kZSA9ICF0aGlzLmVkaXRNb2RlO1xuXHRcdGlmICh0aGlzLmVkaXRNb2RlKSB7XG5cdFx0XHRidG4udGV4dCA9ICdTQVZFJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0YnRuLnRleHQgPSAnRURJVCc7XG5cdFx0fVxuXHR9XG5cblx0b25TYXZlVGFwKCkge1xuXHRcdGNvbnNvbGUubG9nKCdTQVZFJyk7XG5cdFx0dGhpcy5lZGl0TW9kZSA9ICF0aGlzLmVkaXRNb2RlO1xuXHRcdHRoaXMubGlnaHRJbmZvTGlzdC5mb3JFYWNoKGluZm8gPT4ge1xuXHRcdFx0aWYgKGluZm8uY2hhbmdlZCkge1xuXHRcdFx0XHRpZiAoaW5mby5ncm91cFN0YXRlID09PSBudWxsKSB7XG5cdFx0XHRcdFx0dGhpcy51c2VyLmdyb3VwU3RhdGVzLmZvckVhY2goZ3JvdXBzdGF0ZSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoZ3JvdXBzdGF0ZS5zY2VuZUlkID09PSBpbmZvLnNjZW5lLmlkKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMudXNlci5ncm91cFN0YXRlcy5wb3AoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMucHVzaChpbmZvLmdyb3VwU3RhdGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRvbkNhbmNlbFRhcChhcmdzKSB7XG5cdFx0Y29uc29sZS5sb2coJ2NhbmNlbCB0YXBwZWQnKTtcblx0XHR0aGlzLmVkaXRNb2RlID0gZmFsc2U7XG5cdFx0dGhpcy5saWdodEluZm9MaXN0LmZvckVhY2goaW5mbyA9PiB7XG5cdFx0XHRpZiAoaW5mby5jaGFuZ2VkKSB7XG5cdFx0XHRcdGluZm8uY2hlY2tlZCA9IGluZm8uc2NlbmUuZW5hYmxlT25Ib21lO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH1cblxufVxuIl19