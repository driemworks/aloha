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
                        if (_this.user.groupStates) {
                            _this.user.groupStates.forEach(function (groupstate) {
                                if (groupstate.sceneId === key) {
                                    enableOnHome = true;
                                }
                            });
                        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHQtbWFuYWdlbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaWdodC1tYW5hZ2VtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RjtBQUM3Rix1REFBcUQ7QUFDckQscUNBQW9DO0FBS3BDLDJHQUF1RztBQUN2RywyREFBOEQ7QUFTOUQ7SUFRQyxrQ0FBb0IsS0FBc0IsRUFDL0IsVUFBc0I7UUFEakMsaUJBdUJDO1FBdkJtQixVQUFLLEdBQUwsS0FBSyxDQUFpQjtRQUMvQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBTmpDLFdBQU0sR0FBVSxFQUFFLENBQUM7UUFDbkIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQU96QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQVUsSUFBSyxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFuQixDQUFtQixDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUNwRSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksU0FBUyxHQUFVO1lBQ3RCLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsU0FBUyxFQUFFLGlCQUFpQjtZQUM1QixPQUFPLEVBQUUsR0FBRztZQUNaLEVBQUUsRUFBRSxlQUFlO1lBQ25CLFlBQVksRUFBRSxJQUFJO1NBQ2xCLENBQUE7UUFDRCxJQUFJLFdBQVcsR0FBVTtZQUN4QixJQUFJLEVBQUUsY0FBYztZQUNwQixTQUFTLEVBQUUsa0JBQWtCO1lBQzdCLEVBQUUsRUFBRSxnQkFBZ0I7WUFDcEIsT0FBTyxFQUFFLEdBQUc7WUFDWixZQUFZLEVBQUUsS0FBSztTQUNuQixDQUFBO1FBQ0QsOEJBQThCO1FBQzlCLGdDQUFnQztJQUNqQyxDQUFDO0lBRUQsMkNBQVEsR0FBUjtRQUFBLGlCQStCQztRQTlCQSxJQUFJLENBQUMsVUFBVSxD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UUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLCtCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCw4Q0FBVyxHQUFYLFVBQVksSUFBSTtRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUM5QixJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO2dCQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUM3QjtRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQWpHMkM7UUFBM0MsbUJBQVksQ0FBQyw4REFBNEIsQ0FBQztrQ0FBZ0IsZ0JBQVM7bUVBQStCO0lBTnZGLHdCQUF3QjtRQVBwQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLG1DQUFtQztZQUNoRCxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztTQUMvQyxDQUFDO3lDQVUwQixhQUFLO1lBQ1Qsd0JBQVU7T0FUckIsd0JBQXdCLENBeUdwQztJQUFELCtCQUFDO0NBQUEsQUF6R0QsSUF5R0M7QUF6R1ksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIFZpZXdDaGlsZHJlbiwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdWVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaHVlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBBcHBTdGF0ZSB9IGZyb20gJy4uL3N0b3JlL2FwcC5zdGF0ZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgU2NlbmUgfSBmcm9tICcuLi9tb2RlbHMvc2NlbmUubW9kZWwnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IExpZ2h0TWFuYWdlbWVudEluZm9Db21wb25lbnQgfSBmcm9tICcuL2xpZ2h0LW1hbmFnZW1lbnQtaW5mby9saWdodC1tYW5hZ2VtZW50LWluZm8uY29tcG9uZW50JztcbmltcG9ydCB7IFVwZGF0ZVVzZXJBY3Rpb24gfSBmcm9tICcuLi9zdG9yZS91c2VyL3VzZXIuYWN0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2xpZ2h0LW1hbmFnZW1lbnQnLFxuXHR0ZW1wbGF0ZVVybDogJy4vbGlnaHQtbWFuYWdlbWVudC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2xpZ2h0LW1hbmFnZW1lbnQuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgTGlnaHRNYW5hZ2VtZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRwcml2YXRlIHVzZXI6IFVzZXI7XG5cdHNjZW5lczogYW55W10gPSBbXTtcblx0ZWRpdE1vZGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuXHRAVmlld0NoaWxkcmVuKExpZ2h0TWFuYWdlbWVudEluZm9Db21wb25lbnQpIGxpZ2h0SW5mb0xpc3Q6IFF1ZXJ5TGlzdDxMaWdodE1hbmFnZW1lbnRJbmZvQ29tcG9uZW50PjtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBTdG9yZTxBcHBTdGF0ZT4sXG5cdFx0XHRcdHByaXZhdGUgaHVlU2VydmljZTogSHVlU2VydmljZSkgeyBcblxuXHRcdHRoaXMuc3RvcmUuc2VsZWN0KChzdGF0ZTogYW55KSA9PiBzdGF0ZS5hcHBTdGF0ZS51c2VyKS5zdWJzY3JpYmUodXNlciA9PiB7XG5cdFx0XHR0aGlzLnVzZXIgPSB1c2VyO1xuXHRcdH0pO1xuXHRcdFxuXHRcdGxldCBtb2NrU2NlbmU6IFNjZW5lID0ge1xuXHRcdFx0bmFtZTogJ3Rlc3Qgc2NlbmUgbmFtZScsXG5cdFx0XHRncm91cE5hbWU6ICd0ZXN0IGdyb3VwIG5hbWUnLFxuXHRcdFx0Z3JvdXBJZDogXCIxXCIsXG5cdFx0XHRpZDogXCJhZGZhZGZhZHNmYWRmXCIsXG5cdFx0XHRlbmFibGVPbkhvbWU6IHRydWVcblx0XHR9XG5cdFx0bGV0IGFub3RoZXJNb2NrOiBTY2VuZSA9IHtcblx0XHRcdG5hbWU6ICdNb2NrIFNjZW5lIDInLFxuXHRcdFx0Z3JvdXBOYW1lOiAnTW9jayBncm91cG5hbWUgMicsXG5cdFx0XHRpZDogXCJhZGZha2lmMzl2bnNmZ1wiLFxuXHRcdFx0Z3JvdXBJZDogXCIzXCIsXG5cdFx0XHRlbmFibGVPbkhvbWU6IGZhbHNlXG5cdFx0fVxuXHRcdC8vIHRoaXMuc2NlbmVzWzBdID0gbW9ja1NjZW5lO1xuXHRcdC8vIHRoaXMuc2NlbmVzWzFdID0gYW5vdGhlck1vY2s7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmh1ZVNlcnZpY2UuZ2V0R3JvdXBzKHRoaXMudXNlci5icmlkZ2VJcEFkZHJlc3MsIHRoaXMudXNlci51c2VybmFtZSkuc3Vic2NyaWJlKChncm91cHNSZXNwb25zZTogUmVzcG9uc2UpID0+IHtcblx0XHRcdHRoaXMuaHVlU2VydmljZS5nZXRTY2VuZXModGhpcy51c2VyLmJyaWRnZUlwQWRkcmVzcywgdGhpcy51c2VyLnVzZXJuYW1lKS5zdWJzY3JpYmUoKHJlczogUmVzcG9uc2UpID0+IHtcblx0XHRcdFx0dmFyIGlkeCA9IDA7XG5cdFx0XHRcdE9iamVjdC5rZXlzKHJlcykuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0XHRcdGlmIChyZXNba2V5XS50eXBlID09PSAnR3JvdXBTY2VuZScpIHtcblx0XHRcdFx0XHRcdHZhciBncm91cElkID0gcmVzW2tleV1bJ2dyb3VwJ107XG5cdFx0XHRcdFx0XHR2YXIgZ3JvdXBOYW1lID0gZ3JvdXBzUmVzcG9uc2VbZ3JvdXBJZF1bJ25hbWUnXTtcblx0XHRcdFx0XHRcdHZhciBlbmFibGVPbkhvbWUgPSBmYWxzZTtcblxuXHRcdFx0XHRcdFx0aWYgKHRoaXMudXNlci5ncm91cFN0YXRlcykge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMuZm9yRWFjaChncm91cHN0YXRlID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZ3JvdXBzdGF0ZS5zY2VuZUlkID09PSBrZXkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGVuYWJsZU9uSG9tZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0bGV0IHNjZW5lOiBTY2VuZSA9IHtcblx0XHRcdFx0XHRcdFx0bmFtZTogcmVzW2tleV1bJ25hbWUnXSxcblx0XHRcdFx0XHRcdFx0Z3JvdXBOYW1lOiBncm91cE5hbWUsXG5cdFx0XHRcdFx0XHRcdGlkOiBrZXksXG5cdFx0XHRcdFx0XHRcdGdyb3VwSWQ6IGdyb3VwSWQsXG5cdFx0XHRcdFx0XHRcdGVuYWJsZU9uSG9tZTogZW5hYmxlT25Ib21lXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0dGhpcy5zY2VuZXNbaWR4XSA9IHNjZW5lO1xuXHRcdFx0XHRcdFx0aWR4ICs9IDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0b25UYXAoYnRuKSB7XG5cdFx0dGhpcy5lZGl0TW9kZSA9ICF0aGlzLmVkaXRNb2RlO1xuXHRcdGlmICh0aGlzLmVkaXRNb2RlKSB7XG5cdFx0XHRidG4udGV4dCA9ICdTQVZFJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0YnRuLnRleHQgPSAnRURJVCc7XG5cdFx0fVxuXHR9XG5cblx0b25TYXZlVGFwKCkge1xuXHRcdGlmICghdGhpcy51c2VyLmdyb3VwU3RhdGVzKSB7XG5cdFx0XHR0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMgPSBbXTtcblx0XHR9XG5cdFx0dGhpcy5lZGl0TW9kZSA9ICF0aGlzLmVkaXRNb2RlO1xuXHRcdFxuXHRcdHZhciBpID0gMDtcblx0XHR0aGlzLmxpZ2h0SW5mb0xpc3QuZm9yRWFjaChpbmZvID0+IHtcblx0XHRcdGlmIChpbmZvLmNoZWNrZWQgJiYgaW5mby5ncm91cFN0YXRlICE9PSBudWxsKSB7XG5cdFx0XHRcdHRoaXMudXNlci5ncm91cFN0YXRlcy5wdXNoKGluZm8uZ3JvdXBTdGF0ZSk7XG5cdFx0XHR9XG5cdFx0XHQvLyBpZiBpdCdzIHRoZSBsYXN0IHRpbWUgdGhyb3VnaCB0aGUgbG9vcCwgdXBkYXRlIHRoZSB1c2VyXG5cdFx0XHRpZiAoaSA9PT0gKHRoaXMubGlnaHRJbmZvTGlzdC5sZW5ndGggLSAxKSkge1xuXHRcdFx0XHQvLyB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBVcGRhdGVVc2VyQWN0aW9uKHRoaXMudXNlcikpO1xuXHRcdFx0fVxuXG5cdFx0XHRpICs9IDE7XG5cdFx0fSk7XG5cdFx0dGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgVXBkYXRlVXNlckFjdGlvbih0aGlzLnVzZXIpKTtcblx0fVxuXG5cdG9uQ2FuY2VsVGFwKGFyZ3MpIHtcblx0XHR0aGlzLmVkaXRNb2RlID0gZmFsc2U7XG5cdFx0dGhpcy5saWdodEluZm9MaXN0LmZvckVhY2goaW5mbyA9PiB7XG5cdFx0XHRpZiAoaW5mby5jaGFuZ2VkID09PSB0cnVlKSB7XG5cdFx0XHRcdGluZm8uY2hlY2tlZCA9ICFpbmZvLmNoZWNrZWQ7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxufVxuIl19