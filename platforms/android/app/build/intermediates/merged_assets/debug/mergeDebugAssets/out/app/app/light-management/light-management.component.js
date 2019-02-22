"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var hue_service_1 = require("../services/hue.service");
var store_1 = require("@ngrx/store");
var light_management_info_component_1 = require("./light-management-info/light-management-info.component");
var user_actions_1 = require("../store/user/user.actions");
var LightManagementComponent = /** @class */ (function () {
    function LightManagementComponent(store, hueService) {
        var _this = this;
        this.store = store;
        this.hueService = hueService;
        this.groupScenes = new Map();
        this.editMode = false;
        // this.obserableGroupScenes = new ObservableArray();
        this.store.select(function (state) { return state.appState.user; }).subscribe(function (user) {
            _this.user = user;
        });
        var mockScene = {
            name: 'test scene name',
            id: "adfadfadsfadf",
            enableOnHome: true
        };
        var anotherMock = {
            name: 'Mock Scene 2',
            id: "adfakif39vnsfg",
            enableOnHome: false
        };
        // this.scenes[0] = mockScene;
        // this.scenes[1] = anotherMock;
    }
    LightManagementComponent.prototype.templateSelector = function (item, index, items) {
        return item.expanded ? "expanded" : "default";
    };
    LightManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        // construct the group scenes
        this.hueService.getGroups(this.user.bridgeIpAddress, this.user.username).subscribe(function (groupsResponse) {
            _this.hueService.getScenes(_this.user.bridgeIpAddress, _this.user.username).subscribe(function (res) {
                var idx = 0;
                Object.keys(res).forEach(function (key) {
                    if (res[key].type === 'GroupScene') {
                        var groupId = res[key]['group'];
                        var groupName = groupsResponse[groupId]['name'];
                        var sceneName = res[key]['name'];
                        var sceneId = key;
                        var enableOnHome = false;
                        if (_this.user.groupStates) {
                            _this.user.groupStates.forEach(function (groupstate) {
                                if (groupstate.sceneId === key) {
                                    enableOnHome = true;
                                }
                            });
                        }
                        var scene = {
                            name: res[key]['name'],
                            id: key,
                            enableOnHome: enableOnHome
                        };
                        var _groupScene = null;
                        // the group id has already been encountered
                        if (_this.groupScenes.get(groupId)) {
                            // get the dto and append to the scenes
                            _groupScene = _this.groupScenes.get(groupId);
                            _groupScene.scenes.push(scene);
                        }
                        else {
                            // This is the first time we have seen this group
                            _groupScene = {
                                groupId: groupId,
                                groupName: groupName,
                                scenes: [scene]
                            };
                        }
                        _this.groupScenes.set(groupId, _groupScene);
                    }
                    // if (idx === Object.keys(res).length-1) {
                    // 	this.groupScenes.forEach(group => {
                    // 		this.obserableGroupScenes.push(group);
                    // 	});
                    // }
                    idx += 1;
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
        if (!this.user.groupStates) {
            this.user.groupStates = [];
        }
        this.editMode = !this.editMode;
        var i = 0;
        this.lightInfoList.forEach(function (info) {
            if (info.checked && info.groupState !== null) {
                _this.user.groupStates.push(info.groupState);
            }
            // if it's the last time through the loop, update the user
            if (i === (_this.lightInfoList.length - 1)) {
                // this.store.dispatch(new UpdateUserAction(this.user));
            }
            i += 1;
        });
        this.store.dispatch(new user_actions_1.UpdateUserAction(this.user));
    };
    LightManagementComponent.prototype.onCancelTap = function (args) {
        this.editMode = false;
        this.lightInfoList.forEach(function (info) {
            if (info.changed === true) {
                info.checked = !info.checked;
            }
        });
    };
    LightManagementComponent.prototype.createItem = function (title, headerText, items) {
        return {
            title: "" + title,
            headerText: "" + headerText,
            items: [items],
            footer: '10'
        };
    };
    LightManagementComponent.prototype.getGroupScenes = function () {
        console.log('aloha');
        return this.groupScenes.values;
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
            hue_service_1.HueService])
    ], LightManagementComponent);
    return LightManagementComponent;
}());
exports.LightManagementComponent = LightManagementComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHQtbWFuYWdlbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaWdodC1tYW5hZ2VtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RjtBQUM3Rix1REFBcUQ7QUFDckQscUNBQW9DO0FBS3BDLDJHQUF1RztBQUN2RywyREFBOEQ7QUFhOUQ7SUFTQyxrQ0FBb0IsS0FBc0IsRUFDL0IsVUFBc0I7UUFEakMsaUJBbUJDO1FBbkJtQixVQUFLLEdBQUwsS0FBSyxDQUFpQjtRQUMvQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBUGpDLGdCQUFXLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUN4QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBT3pCLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQVUsSUFBSyxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFuQixDQUFtQixDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUNwRSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksU0FBUyxHQUFVO1lBQ3RCLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsRUFBRSxFQUFFLGVBQWU7WUFDbkIsWUFBWSxFQUFFLElBQUk7U0FDbEIsQ0FBQTtRQUNELElBQUksV0FBVyxHQUFVO1lBQ3hCLElBQUksRUFBRSxjQUFjO1lBQ3BCLEVBQUUsRUFBRSxnQkFBZ0I7WUFDcEIsWUFBWSxFQUFFLEtBQUs7U0FDbkIsQ0FBQTtRQUNELDhCQUE4QjtRQUM5QixnQ0FBZ0M7SUFDakMsQ0FBQztJQUVELG1EQUFnQixHQUFoQixVQUFpQixJQUFTLEVBQUUsS0FBYSxFQUFFLEtBQVU7UUFDcEQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsMkNBQVEsR0FBUjtRQUFBLGlCQW9EQztRQW5EQSw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxjQUF3QjtZQUMzRyxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEdBQWE7Z0JBQ2hHLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDWixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7b0JBQzNCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7d0JBQ25DLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDaEMsSUFBSSxTQUFTLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNoRCxJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2pDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQzt3QkFDbEIsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO3dCQUV6QixJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFOzRCQUMxQixLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxVQUFVO2dDQUN2QyxJQUFJLFVBQVUsQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFO29DQUMvQixZQUFZLEdBQUcsSUFBSSxDQUFDO2lDQUNwQjs0QkFDRixDQUFDLENBQUMsQ0FBQzt5QkFDSDt3QkFFRCxJQUFJLEtBQUssR0FBVTs0QkFDbEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7NEJBQ3RCLEVBQUUsRUFBRSxHQUFHOzRCQUNQLFlBQVksRUFBRSxZQUFZO3lCQUMxQixDQUFDO3dCQUVGLElBQUksV0FBVyxHQUFlLElBQUksQ0FBQzt3QkFDbkMsNENBQTRDO3dCQUM1QyxJQUFJLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUNsQyx1Q0FBdUM7NEJBQ3RDLFdBQVcsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDN0MsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQy9COzZCQUFNOzRCQUNOLGlEQUFpRDs0QkFDakQsV0FBVyxHQUFHO2dDQUNiLE9BQU8sRUFBRSxPQUFPO2dDQUNoQixTQUFTLEVBQUUsU0FBUztnQ0FDcEIsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDOzZCQUNmLENBQUE7eUJBQ0Q7d0JBQ0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO3FCQUMzQztvQkFDRCwyQ0FBMkM7b0JBQzNDLHVDQUF1QztvQkFDdkMsMkNBQTJDO29CQUMzQyxPQUFPO29CQUNQLElBQUk7b0JBQ0osR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDVixDQUFDLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsd0NBQUssR0FBTCxVQUFNLEdBQUc7UUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7U0FDbEI7YUFBTTtZQUNOLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1NBQ2xCO0lBQ0YsQ0FBQztJQUVELDRDQUFTLEdBQVQ7UUFBQSxpQkFtQkM7UUFsQkEsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRS9CLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUM5QixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7Z0JBQzdDLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDNUM7WUFDRCwwREFBMEQ7WUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDMUMsd0RBQXdEO2FBQ3hEO1lBRUQsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwrQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsOENBQVcsR0FBWCxVQUFZLElBQUk7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDOUIsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtnQkFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDN0I7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCw2Q0FBVSxHQUFWLFVBQVcsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLO1FBQ2xDLE9BQU87WUFDTixLQUFLLEVBQUUsS0FBRyxLQUFPO1lBQ2pCLFVBQVUsRUFBRSxLQUFHLFVBQVk7WUFDM0IsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ2QsTUFBTSxFQUFDLElBQUk7U0FDWCxDQUFDO0lBQ0gsQ0FBQztJQUVELGlEQUFjLEdBQWQ7UUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDaEMsQ0FBQztJQXBJMkM7UUFBM0MsbUJBQVksQ0FBQyw4REFBNEIsQ0FBQztrQ0FBZ0IsZ0JBQVM7bUVBQStCO0lBUHZGLHdCQUF3QjtRQVBwQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLG1DQUFtQztZQUNoRCxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztTQUMvQyxDQUFDO3lDQVcwQixhQUFLO1lBQ1Qsd0JBQVU7T0FWckIsd0JBQXdCLENBNklwQztJQUFELCtCQUFDO0NBQUEsQUE3SUQsSUE2SUM7QUE3SVksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIFZpZXdDaGlsZHJlbiwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdWVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaHVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBBcHBTdGF0ZSB9IGZyb20gJy4uL3N0b3JlL2FwcC5zdGF0ZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgU2NlbmUgfSBmcm9tICcuLi9tb2RlbHMvc2NlbmUubW9kZWwnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IExpZ2h0TWFuYWdlbWVudEluZm9Db21wb25lbnQgfSBmcm9tICcuL2xpZ2h0LW1hbmFnZW1lbnQtaW5mby9saWdodC1tYW5hZ2VtZW50LWluZm8uY29tcG9uZW50JztcbmltcG9ydCB7IFVwZGF0ZVVzZXJBY3Rpb24gfSBmcm9tICcuLi9zdG9yZS91c2VyL3VzZXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBHcm91cFNjZW5lIH0gZnJvbSAnLi4vbW9kZWxzL0dyb3VwU2NlbmUubW9kZWwnO1xuaW1wb3J0IHsgZmxhdHRlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvc3JjL3JlbmRlcjMvdXRpbCc7XG5pbXBvcnQgeyBpdGVtc1Byb3BlcnR5IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFjY29yZGlvbi9hY2NvcmRpb24uY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXknO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdsaWdodC1tYW5hZ2VtZW50Jyxcblx0dGVtcGxhdGVVcmw6ICcuL2xpZ2h0LW1hbmFnZW1lbnQuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9saWdodC1tYW5hZ2VtZW50LmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIExpZ2h0TWFuYWdlbWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0cHJpdmF0ZSB1c2VyOiBVc2VyO1xuXHRncm91cFNjZW5lcyA9IG5ldyBNYXAoKTtcblx0ZWRpdE1vZGU6IGJvb2xlYW4gPSBmYWxzZTtcblx0b2JzZXJhYmxlR3JvdXBTY2VuZXM6IE9ic2VydmFibGVBcnJheTxhbnk+O1xuXG5cdEBWaWV3Q2hpbGRyZW4oTGlnaHRNYW5hZ2VtZW50SW5mb0NvbXBvbmVudCkgbGlnaHRJbmZvTGlzdDogUXVlcnlMaXN0PExpZ2h0TWFuYWdlbWVudEluZm9Db21wb25lbnQ+O1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IFN0b3JlPEFwcFN0YXRlPixcblx0XHRcdFx0cHJpdmF0ZSBodWVTZXJ2aWNlOiBIdWVTZXJ2aWNlKSB7IFxuXHRcdC8vIHRoaXMub2JzZXJhYmxlR3JvdXBTY2VuZXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KCk7XG5cdFx0dGhpcy5zdG9yZS5zZWxlY3QoKHN0YXRlOiBhbnkpID0+IHN0YXRlLmFwcFN0YXRlLnVzZXIpLnN1YnNjcmliZSh1c2VyID0+IHtcblx0XHRcdHRoaXMudXNlciA9IHVzZXI7XG5cdFx0fSk7XG5cdFx0XG5cdFx0bGV0IG1vY2tTY2VuZTogU2NlbmUgPSB7XG5cdFx0XHRuYW1lOiAndGVzdCBzY2VuZSBuYW1lJyxcblx0XHRcdGlkOiBcImFkZmFkZmFkc2ZhZGZcIixcblx0XHRcdGVuYWJsZU9uSG9tZTogdHJ1ZVxuXHRcdH1cblx0XHRsZXQgYW5vdGhlck1vY2s6IFNjZW5lID0ge1xuXHRcdFx0bmFtZTogJ01vY2sgU2NlbmUgMicsXG5cdFx0XHRpZDogXCJhZGZha2lmMzl2bnNmZ1wiLFxuXHRcdFx0ZW5hYmxlT25Ib21lOiBmYWxzZVxuXHRcdH1cblx0XHQvLyB0aGlzLnNjZW5lc1swXSA9IG1vY2tTY2VuZTtcblx0XHQvLyB0aGlzLnNjZW5lc1sxXSA9IGFub3RoZXJNb2NrO1xuXHR9XG5cdFxuXHR0ZW1wbGF0ZVNlbGVjdG9yKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgaXRlbXM6IGFueSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIGl0ZW0uZXhwYW5kZWQgPyBcImV4cGFuZGVkXCIgOiBcImRlZmF1bHRcIjtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdC8vIGNvbnN0cnVjdCB0aGUgZ3JvdXAgc2NlbmVzXG5cdFx0dGhpcy5odWVTZXJ2aWNlLmdldEdyb3Vwcyh0aGlzLnVzZXIuYnJpZGdlSXBBZGRyZXNzLCB0aGlzLnVzZXIudXNlcm5hbWUpLnN1YnNjcmliZSgoZ3JvdXBzUmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG5cdFx0XHR0aGlzLmh1ZVNlcnZpY2UuZ2V0U2NlbmVzKHRoaXMudXNlci5icmlkZ2VJcEFkZHJlc3MsIHRoaXMudXNlci51c2VybmFtZSkuc3Vic2NyaWJlKChyZXM6IFJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdHZhciBpZHggPSAwO1xuXHRcdFx0XHRPYmplY3Qua2V5cyhyZXMpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdFx0XHRpZiAocmVzW2tleV0udHlwZSA9PT0gJ0dyb3VwU2NlbmUnKSB7XG5cdFx0XHRcdFx0XHR2YXIgZ3JvdXBJZCA9IHJlc1trZXldWydncm91cCddO1xuXHRcdFx0XHRcdFx0dmFyIGdyb3VwTmFtZSA9IGdyb3Vwc1Jlc3BvbnNlW2dyb3VwSWRdWyduYW1lJ107XG5cdFx0XHRcdFx0XHR2YXIgc2NlbmVOYW1lID0gcmVzW2tleV1bJ25hbWUnXTtcblx0XHRcdFx0XHRcdHZhciBzY2VuZUlkID0ga2V5O1xuXHRcdFx0XHRcdFx0dmFyIGVuYWJsZU9uSG9tZSA9IGZhbHNlO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0aWYgKHRoaXMudXNlci5ncm91cFN0YXRlcykge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMuZm9yRWFjaChncm91cHN0YXRlID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZ3JvdXBzdGF0ZS5zY2VuZUlkID09PSBrZXkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGVuYWJsZU9uSG9tZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0bGV0IHNjZW5lOiBTY2VuZSA9IHtcblx0XHRcdFx0XHRcdFx0bmFtZTogcmVzW2tleV1bJ25hbWUnXSxcblx0XHRcdFx0XHRcdFx0aWQ6IGtleSxcblx0XHRcdFx0XHRcdFx0ZW5hYmxlT25Ib21lOiBlbmFibGVPbkhvbWVcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdGxldCBfZ3JvdXBTY2VuZTogR3JvdXBTY2VuZSA9IG51bGw7XG5cdFx0XHRcdFx0XHQvLyB0aGUgZ3JvdXAgaWQgaGFzIGFscmVhZHkgYmVlbiBlbmNvdW50ZXJlZFxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZ3JvdXBTY2VuZXMuZ2V0KGdyb3VwSWQpKSB7XG5cdFx0XHRcdFx0XHRcdC8vIGdldCB0aGUgZHRvIGFuZCBhcHBlbmQgdG8gdGhlIHNjZW5lc1xuXHRcdFx0XHRcdFx0XHQgX2dyb3VwU2NlbmUgPSB0aGlzLmdyb3VwU2NlbmVzLmdldChncm91cElkKTtcblx0XHRcdFx0XHRcdFx0X2dyb3VwU2NlbmUuc2NlbmVzLnB1c2goc2NlbmUpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyB0aGUgZmlyc3QgdGltZSB3ZSBoYXZlIHNlZW4gdGhpcyBncm91cFxuXHRcdFx0XHRcdFx0XHRfZ3JvdXBTY2VuZSA9IHtcblx0XHRcdFx0XHRcdFx0XHRncm91cElkOiBncm91cElkLFxuXHRcdFx0XHRcdFx0XHRcdGdyb3VwTmFtZTogZ3JvdXBOYW1lLFxuXHRcdFx0XHRcdFx0XHRcdHNjZW5lczogW3NjZW5lXVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR0aGlzLmdyb3VwU2NlbmVzLnNldChncm91cElkLCBfZ3JvdXBTY2VuZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIGlmIChpZHggPT09IE9iamVjdC5rZXlzKHJlcykubGVuZ3RoLTEpIHtcblx0XHRcdFx0XHQvLyBcdHRoaXMuZ3JvdXBTY2VuZXMuZm9yRWFjaChncm91cCA9PiB7XG5cdFx0XHRcdFx0Ly8gXHRcdHRoaXMub2JzZXJhYmxlR3JvdXBTY2VuZXMucHVzaChncm91cCk7XG5cdFx0XHRcdFx0Ly8gXHR9KTtcblx0XHRcdFx0XHQvLyB9XG5cdFx0XHRcdFx0aWR4ICs9IDE7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRvblRhcChidG4pIHtcblx0XHR0aGlzLmVkaXRNb2RlID0gIXRoaXMuZWRpdE1vZGU7XG5cdFx0aWYgKHRoaXMuZWRpdE1vZGUpIHtcblx0XHRcdGJ0bi50ZXh0ID0gJ1NBVkUnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRidG4udGV4dCA9ICdFRElUJztcblx0XHR9XG5cdH1cblxuXHRvblNhdmVUYXAoKSB7XG5cdFx0aWYgKCF0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMpIHtcblx0XHRcdHRoaXMudXNlci5ncm91cFN0YXRlcyA9IFtdO1xuXHRcdH1cblx0XHR0aGlzLmVkaXRNb2RlID0gIXRoaXMuZWRpdE1vZGU7XG5cdFx0XG5cdFx0dmFyIGkgPSAwO1xuXHRcdHRoaXMubGlnaHRJbmZvTGlzdC5mb3JFYWNoKGluZm8gPT4ge1xuXHRcdFx0aWYgKGluZm8uY2hlY2tlZCAmJiBpbmZvLmdyb3VwU3RhdGUgIT09IG51bGwpIHtcblx0XHRcdFx0dGhpcy51c2VyLmdyb3VwU3RhdGVzLnB1c2goaW5mby5ncm91cFN0YXRlKTtcblx0XHRcdH1cblx0XHRcdC8vIGlmIGl0J3MgdGhlIGxhc3QgdGltZSB0aHJvdWdoIHRoZSBsb29wLCB1cGRhdGUgdGhlIHVzZXJcblx0XHRcdGlmIChpID09PSAodGhpcy5saWdodEluZm9MaXN0Lmxlbmd0aCAtIDEpKSB7XG5cdFx0XHRcdC8vIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFVwZGF0ZVVzZXJBY3Rpb24odGhpcy51c2VyKSk7XG5cdFx0XHR9XG5cblx0XHRcdGkgKz0gMTtcblx0XHR9KTtcblx0XHR0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBVcGRhdGVVc2VyQWN0aW9uKHRoaXMudXNlcikpO1xuXHR9XG5cblx0b25DYW5jZWxUYXAoYXJncykge1xuXHRcdHRoaXMuZWRpdE1vZGUgPSBmYWxzZTtcblx0XHR0aGlzLmxpZ2h0SW5mb0xpc3QuZm9yRWFjaChpbmZvID0+IHtcblx0XHRcdGlmIChpbmZvLmNoYW5nZWQgPT09IHRydWUpIHtcblx0XHRcdFx0aW5mby5jaGVja2VkID0gIWluZm8uY2hlY2tlZDtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGNyZWF0ZUl0ZW0odGl0bGUsIGhlYWRlclRleHQsIGl0ZW1zKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpdGxlOiBgJHt0aXRsZX1gLFxuXHRcdFx0aGVhZGVyVGV4dDogYCR7aGVhZGVyVGV4dH1gLFxuXHRcdFx0aXRlbXM6IFtpdGVtc10sXG5cdFx0XHRmb290ZXI6JzEwJ1xuXHRcdH07XG5cdH1cblxuXHRnZXRHcm91cFNjZW5lcygpIHtcblx0XHRjb25zb2xlLmxvZygnYWxvaGEnKTtcblx0XHRyZXR1cm4gdGhpcy5ncm91cFNjZW5lcy52YWx1ZXM7XG5cdH1cblxufVxuIl19