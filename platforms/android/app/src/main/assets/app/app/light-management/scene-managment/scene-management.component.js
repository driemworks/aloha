"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GroupScene_model_1 = require("~/app/models/GroupScene.model");
var store_1 = require("@ngrx/store");
var user_actions_1 = require("~/app/store/user/user.actions");
var hue_actions_1 = require("~/app/store/hue/hue.actions");
var SceneManagementComponent = /** @class */ (function () {
    function SceneManagementComponent(store) {
        this.store = store;
        this.scenes = [];
        this.enabledSceneName = '';
        this.showPanel = false;
        this.sceneChanged = false;
        this.selectedScene = null;
        this.checked = false;
    }
    SceneManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.groupScene.scenes.forEach(function (scene) {
            if (scene.enableOnHome) {
                _this.enabledSceneName = scene.name;
            }
            _this.scenes.push(scene.name);
        });
        this.selectedScene = 0;
    };
    SceneManagementComponent.prototype.saveChange = function () {
        var _this = this;
        console.log('selected scene ' + this.selectedScene);
        // if the user has not set up any group states, init the array
        if (!this.user.groupStates) {
            console.log('the group states were null');
            this.user.groupStates = [];
        }
        var oldUser = Object.assign({}, this.user);
        this.groupScene.scenes.forEach(function (scene) {
            if (JSON.stringify(_this.selectedScene) === JSON.stringify(scene.name)) {
                var sceneId = scene.id;
                var groupState = {
                    groupId: _this.groupScene.groupId.toString(),
                    sceneId: sceneId.toString()
                };
                // CASE: This is the first time a group is being set up
                if (_this.user.groupStates.length === 0) {
                    // just append to the users group states
                    _this.user.groupStates.push(groupState);
                }
                else {
                    // CASE: group states exist, so we may need to remove an old configuration
                    var index = _this.user.groupStates.findIndex(function (groupstate) { return groupstate.groupId == _this.groupScene.groupId; });
                    if (index > -1) {
                        // a group was already configured, so removed existing configuration
                        _this.user.groupStates.splice(index, 1);
                        console.log('Splicing old configuration ' + JSON.stringify(_this.user.groupStates));
                    }
                    // push new group state
                    _this.user.groupStates.push(groupState);
                    console.log('Pushed new group state ' + JSON.stringify(_this.user.groupStates));
                }
            }
        });
        // update lights with new group states
        this.store.dispatch(new hue_actions_1.UpdateLightStateAction(this.user, true, true));
        // persist new group states
        this.store.dispatch(new user_actions_1.UpdateUserAction(this.user));
        // then collapse the panel
        this.reset();
    };
    SceneManagementComponent.prototype.cancelChange = function () {
        console.log('canceling, but you had selected index ' + JSON.stringify(this.selectedScene));
        this.reset();
    };
    SceneManagementComponent.prototype.reset = function () {
        this.sceneChanged = false;
        this.selectedScene = null;
        this.showPanel = false;
    };
    SceneManagementComponent.prototype.handleClick = function () {
        console.log('Enabled scene: ' + JSON.stringify(this.enabledSceneName));
        // this.showPanel = !this.showPanel;
        if (this.showPanel) {
            // if we are showing the panel, focus on the first item
            this.selectedScene = 0;
            this.setup();
        }
    };
    SceneManagementComponent.prototype.setup = function () {
        var _this = this;
        var i = 0;
        this.scenes.forEach(function (scene) {
            if (scene.enableOnHome) {
                _this.enabledSceneName = scene.name;
                // make list picker focus on selected scene, check the toggle
                _this.selectedScene = i;
                _this.checked = true;
            }
            i++;
        });
        this.checked = false;
    };
    SceneManagementComponent.prototype.selectedIndexChange = function (args) {
        // TODO should pre load this in a list somehow
        var picker = args.object;
        var index = picker.selectedIndex;
        if (index >= 0) {
            this.selectedScene = this.scenes[index];
            //  we have to loop over the group scenes and see if we find a match
            console.log('The enabled scene name is: ' + this.enabledSceneName);
            console.log('The selected scene is: ' + this.selectedScene);
            if (this.enabledSceneName === this.selectedScene) {
                console.log('checking the switch');
                this.checked = true;
            }
            else {
                this.checked = false;
            }
        }
        this.sceneChanged = true;
    };
    SceneManagementComponent.prototype.onChange = function (args) {
        var _this = this;
        this.checked = args.object.checked;
        var isEnabled = this.selectedScene === this.enabledSceneName;
        if (this.checked === true && !isEnabled) {
            this.enabledSceneName = this.selectedScene;
        }
        this.groupScene.scenes.forEach(function (scene) {
            if (scene.name === _this.selectedScene) {
                scene.enableOnHome = _this.checked;
            }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", GroupScene_model_1.GroupScene)
    ], SceneManagementComponent.prototype, "groupScene", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SceneManagementComponent.prototype, "user", void 0);
    SceneManagementComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'scene-management',
            templateUrl: './scene-management.component.html',
            styleUrls: ['./scene-management.component.css']
        }),
        __metadata("design:paramtypes", [store_1.Store])
    ], SceneManagementComponent);
    return SceneManagementComponent;
}());
exports.SceneManagementComponent = SceneManagementComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlbmUtbWFuYWdlbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY2VuZS1tYW5hZ2VtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxrRUFBMkQ7QUFFM0QscUNBQW9DO0FBQ3BDLDhEQUFpRTtBQUlqRSwyREFBcUU7QUFTckU7SUFZQyxrQ0FBb0IsS0FBc0I7UUFBdEIsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFQMUMsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUNuQixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDdEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixrQkFBYSxHQUFRLElBQUksQ0FBQztRQUMxQixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBRThCLENBQUM7SUFFL0MsMkNBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUNuQyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ25DO1lBQ0QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELDZDQUFVLEdBQVY7UUFBQSxpQkF1Q0M7UUF0Q0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEQsOERBQThEO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0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aEQsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7U0FDL0MsQ0FBQzt5Q0FjMEIsYUFBSztPQVpwQix3QkFBd0IsQ0FtSXBDO0lBQUQsK0JBQUM7Q0FBQSxBQW5JRCxJQW1JQztBQW5JWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdyb3VwU2NlbmUgfSBmcm9tICd+L2FwcC9tb2RlbHMvR3JvdXBTY2VuZS5tb2RlbCc7XG5pbXBvcnQgeyBBcHBTdGF0ZSB9IGZyb20gJ34vYXBwL3N0b3JlL2FwcC5zdGF0ZSc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IFVwZGF0ZVVzZXJBY3Rpb24gfSBmcm9tICd+L2FwcC9zdG9yZS91c2VyL3VzZXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnfi9hcHAvbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgR3JvdXBTdGF0ZSB9IGZyb20gJ34vYXBwL21vZGVscy9Hcm91cFN0YXRlLm1vZGVsJztcbmltcG9ydCB7IExpc3RQaWNrZXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyXCI7XG5pbXBvcnQgeyBVcGRhdGVMaWdodFN0YXRlQWN0aW9uIH0gZnJvbSAnfi9hcHAvc3RvcmUvaHVlL2h1ZS5hY3Rpb25zJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnc2NlbmUtbWFuYWdlbWVudCcsXG5cdHRlbXBsYXRlVXJsOiAnLi9zY2VuZS1tYW5hZ2VtZW50LmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vc2NlbmUtbWFuYWdlbWVudC5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBTY2VuZU1hbmFnZW1lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdEBJbnB1dCgpIGdyb3VwU2NlbmU6IEdyb3VwU2NlbmU7XG5cdEBJbnB1dCgpIHVzZXI6IFVzZXI7XG5cblx0c2NlbmVzOiBhbnlbXSA9IFtdO1xuXHRlbmFibGVkU2NlbmVOYW1lID0gJyc7XG5cdHNob3dQYW5lbCA9IGZhbHNlO1xuXHRzY2VuZUNoYW5nZWQgPSBmYWxzZTtcblx0c2VsZWN0ZWRTY2VuZTogYW55ID0gbnVsbDtcblx0Y2hlY2tlZCA9IGZhbHNlO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IFN0b3JlPEFwcFN0YXRlPikgeyB9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5ncm91cFNjZW5lLnNjZW5lcy5mb3JFYWNoKHNjZW5lID0+IHtcblx0XHRcdGlmIChzY2VuZS5lbmFibGVPbkhvbWUpIHtcblx0XHRcdFx0dGhpcy5lbmFibGVkU2NlbmVOYW1lID0gc2NlbmUubmFtZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuc2NlbmVzLnB1c2goc2NlbmUubmFtZSk7XHRcblx0XHR9KTtcblx0XHR0aGlzLnNlbGVjdGVkU2NlbmUgPSAwO1xuXHR9XG5cblx0c2F2ZUNoYW5nZSgpIHtcblx0XHRjb25zb2xlLmxvZygnc2VsZWN0ZWQgc2NlbmUgJyArIHRoaXMuc2VsZWN0ZWRTY2VuZSk7XG5cdFx0Ly8gaWYgdGhlIHVzZXIgaGFzIG5vdCBzZXQgdXAgYW55IGdyb3VwIHN0YXRlcywgaW5pdCB0aGUgYXJyYXlcblx0XHRpZiAoIXRoaXMudXNlci5ncm91cFN0YXRlcykge1xuXHRcdFx0Y29uc29sZS5sb2coJ3RoZSBncm91cCBzdGF0ZXMgd2VyZSBudWxsJyk7XG5cdFx0XHR0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMgPSBbXTtcblx0XHR9XG5cdFx0bGV0IG9sZFVzZXIgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnVzZXIpOyBcblx0XHR0aGlzLmdyb3VwU2NlbmUuc2NlbmVzLmZvckVhY2goc2NlbmUgPT4ge1xuXHRcdFx0aWYgKEpTT04uc3RyaW5naWZ5KHRoaXMuc2VsZWN0ZWRTY2VuZSkgPT09IEpTT04uc3RyaW5naWZ5KHNjZW5lLm5hbWUpKSB7XG5cdFx0XHRcdGxldCBzY2VuZUlkID0gc2NlbmUuaWQ7XG5cdFx0XHRcdGxldCBncm91cFN0YXRlOiBHcm91cFN0YXRlID0ge1xuXHRcdFx0XHRcdGdyb3VwSWQ6IHRoaXMuZ3JvdXBTY2VuZS5ncm91cElkLnRvU3RyaW5nKCksXG5cdFx0XHRcdFx0c2NlbmVJZDogc2NlbmVJZC50b1N0cmluZygpXG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gQ0FTRTogVGhpcyBpcyB0aGUgZmlyc3QgdGltZSBhIGdyb3VwIGlzIGJlaW5nIHNldCB1cFxuXHRcdFx0XHRpZiAodGhpcy51c2VyLmdyb3VwU3RhdGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdC8vIGp1c3QgYXBwZW5kIHRvIHRoZSB1c2VycyBncm91cCBzdGF0ZXNcblx0XHRcdFx0XHR0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMucHVzaChncm91cFN0YXRlKVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIENBU0U6IGdyb3VwIHN0YXRlcyBleGlzdCwgc28gd2UgbWF5IG5lZWQgdG8gcmVtb3ZlIGFuIG9sZCBjb25maWd1cmF0aW9uXG5cdFx0XHRcdFx0dmFyIGluZGV4ID0gdGhpcy51c2VyLmdyb3VwU3RhdGVzLmZpbmRJbmRleChncm91cHN0YXRlID0+IGdyb3Vwc3RhdGUuZ3JvdXBJZCA9PSB0aGlzLmdyb3VwU2NlbmUuZ3JvdXBJZCk7XG5cdFx0XHRcdFx0aWYgKGluZGV4ID4gLTEpIHtcblx0XHRcdFx0XHRcdC8vIGEgZ3JvdXAgd2FzIGFscmVhZHkgY29uZmlndXJlZCwgc28gcmVtb3ZlZCBleGlzdGluZyBjb25maWd1cmF0aW9uXG5cdFx0XHRcdFx0XHR0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdTcGxpY2luZyBvbGQgY29uZmlndXJhdGlvbiAnICsgSlNPTi5zdHJpbmdpZnkodGhpcy51c2VyLmdyb3VwU3RhdGVzKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIHB1c2ggbmV3IGdyb3VwIHN0YXRlXG5cdFx0XHRcdFx0dGhpcy51c2VyLmdyb3VwU3RhdGVzLnB1c2goZ3JvdXBTdGF0ZSk7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ1B1c2hlZCBuZXcgZ3JvdXAgc3RhdGUgJyArIEpTT04uc3RyaW5naWZ5KHRoaXMudXNlci5ncm91cFN0YXRlcykpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Ly8gdXBkYXRlIGxpZ2h0cyB3aXRoIG5ldyBncm91cCBzdGF0ZXNcblx0XHR0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBVcGRhdGVMaWdodFN0YXRlQWN0aW9uKHRoaXMudXNlciwgdHJ1ZSwgdHJ1ZSkpO1xuXHRcdC8vIHBlcnNpc3QgbmV3IGdyb3VwIHN0YXRlc1xuXHRcdHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFVwZGF0ZVVzZXJBY3Rpb24odGhpcy51c2VyKSk7XG5cdFx0Ly8gdGhlbiBjb2xsYXBzZSB0aGUgcGFuZWxcblx0XHR0aGlzLnJlc2V0KCk7XG5cdH1cdFxuXG5cdGNhbmNlbENoYW5nZSgpIHtcblx0XHRjb25zb2xlLmxvZygnY2FuY2VsaW5nLCBidXQgeW91IGhhZCBzZWxlY3RlZCBpbmRleCAnICsgSlNPTi5zdHJpbmdpZnkodGhpcy5zZWxlY3RlZFNjZW5lKSk7XG5cdFx0dGhpcy5yZXNldCgpO1xuXHR9XG5cblx0cmVzZXQoKSB7XG5cdFx0dGhpcy5zY2VuZUNoYW5nZWQgPSBmYWxzZTtcblx0XHR0aGlzLnNlbGVjdGVkU2NlbmUgPSBudWxsO1xuXHRcdHRoaXMuc2hvd1BhbmVsID0gZmFsc2U7XG5cdH1cblxuXHRoYW5kbGVDbGljaygpIHtcblx0XHRjb25zb2xlLmxvZygnRW5hYmxlZCBzY2VuZTogJyArIEpTT04uc3RyaW5naWZ5KHRoaXMuZW5hYmxlZFNjZW5lTmFtZSkpO1xuXHRcdC8vIHRoaXMuc2hvd1BhbmVsID0gIXRoaXMuc2hvd1BhbmVsO1xuXHRcdGlmICh0aGlzLnNob3dQYW5lbCkge1xuXHRcdFx0Ly8gaWYgd2UgYXJlIHNob3dpbmcgdGhlIHBhbmVsLCBmb2N1cyBvbiB0aGUgZmlyc3QgaXRlbVxuXHRcdFx0dGhpcy5zZWxlY3RlZFNjZW5lID0gMDtcblx0XHRcdHRoaXMuc2V0dXAoKTtcblx0XHR9XG5cdH1cblxuXHRzZXR1cCgpIHtcblx0XHR2YXIgaSA9IDA7XG5cdFx0dGhpcy5zY2VuZXMuZm9yRWFjaChzY2VuZSA9PiB7XG5cdFx0XHRpZiAoc2NlbmUuZW5hYmxlT25Ib21lKSB7XG5cdFx0XHRcdHRoaXMuZW5hYmxlZFNjZW5lTmFtZSA9IHNjZW5lLm5hbWU7XG5cdFx0XHRcdC8vIG1ha2UgbGlzdCBwaWNrZXIgZm9jdXMgb24gc2VsZWN0ZWQgc2NlbmUsIGNoZWNrIHRoZSB0b2dnbGVcblx0XHRcdFx0dGhpcy5zZWxlY3RlZFNjZW5lID0gaTtcblx0XHRcdFx0dGhpcy5jaGVja2VkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGkrKztcblx0XHR9KTtcblx0XHR0aGlzLmNoZWNrZWQgPSBmYWxzZTtcblx0fVxuXG5cdHNlbGVjdGVkSW5kZXhDaGFuZ2UoYXJncykge1xuXHRcdC8vIFRPRE8gc2hvdWxkIHByZSBsb2FkIHRoaXMgaW4gYSBsaXN0IHNvbWVob3dcblx0XHRsZXQgcGlja2VyID0gPExpc3RQaWNrZXI+IGFyZ3Mub2JqZWN0O1xuXHRcdGxldCBpbmRleCA9IHBpY2tlci5zZWxlY3RlZEluZGV4O1xuXHRcdGlmIChpbmRleCA+PSAwKSB7XG5cdFx0XHR0aGlzLnNlbGVjdGVkU2NlbmUgPSB0aGlzLnNjZW5lc1tpbmRleF07XG5cdFx0XHQvLyAgd2UgaGF2ZSB0byBsb29wIG92ZXIgdGhlIGdyb3VwIHNjZW5lcyBhbmQgc2VlIGlmIHdlIGZpbmQgYSBtYXRjaFxuXHRcdFx0Y29uc29sZS5sb2coJ1RoZSBlbmFibGVkIHNjZW5lIG5hbWUgaXM6ICcgKyB0aGlzLmVuYWJsZWRTY2VuZU5hbWUpO1xuXHRcdFx0Y29uc29sZS5sb2coJ1RoZSBzZWxlY3RlZCBzY2VuZSBpczogJyArIHRoaXMuc2VsZWN0ZWRTY2VuZSk7XG5cdFx0XHRpZiAodGhpcy5lbmFibGVkU2NlbmVOYW1lID09PSB0aGlzLnNlbGVjdGVkU2NlbmUpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2NoZWNraW5nIHRoZSBzd2l0Y2gnKTtcblx0XHRcdFx0dGhpcy5jaGVja2VkID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNjZW5lQ2hhbmdlZCA9IHRydWU7XG5cdH1cblxuXHRvbkNoYW5nZShhcmdzKSB7XG5cdFx0dGhpcy5jaGVja2VkID0gYXJncy5vYmplY3QuY2hlY2tlZDtcblx0XHR2YXIgaXNFbmFibGVkID0gdGhpcy5zZWxlY3RlZFNjZW5lID09PSB0aGlzLmVuYWJsZWRTY2VuZU5hbWU7XG5cdFx0aWYgKHRoaXMuY2hlY2tlZCA9PT0gdHJ1ZSAmJiAhaXNFbmFibGVkKSB7XG5cdFx0XHR0aGlzLmVuYWJsZWRTY2VuZU5hbWUgPSB0aGlzLnNlbGVjdGVkU2NlbmU7XG5cdFx0fVxuXHRcdHRoaXMuZ3JvdXBTY2VuZS5zY2VuZXMuZm9yRWFjaChzY2VuZSA9PiB7XG5cdFx0XHRpZiAoc2NlbmUubmFtZSA9PT0gdGhpcy5zZWxlY3RlZFNjZW5lKSB7XG5cdFx0XHRcdHNjZW5lLmVuYWJsZU9uSG9tZSA9IHRoaXMuY2hlY2tlZDtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSJdfQ==