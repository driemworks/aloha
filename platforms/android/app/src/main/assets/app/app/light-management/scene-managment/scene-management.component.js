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
        this.showPanel = !this.showPanel;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlbmUtbWFuYWdlbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY2VuZS1tYW5hZ2VtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxrRUFBMkQ7QUFFM0QscUNBQW9DO0FBQ3BDLDhEQUFpRTtBQUlqRSwyREFBcUU7QUFTckU7SUFZQyxrQ0FBb0IsS0FBc0I7UUFBdEIsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFQMUMsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUNuQixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDdEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixrQkFBYSxHQUFRLElBQUksQ0FBQztRQUMxQixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBRThCLENBQUM7SUFFL0MsMkNBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUNuQyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ25DO1lBQ0QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELDZDQUFVLEdBQVY7UUFBQSxpQkF1Q0M7UUF0Q0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEQsOERBQThEO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0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RUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLG1DQUFtQztZQUNoRCxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztTQUMvQyxDQUFDO3lDQWMwQixhQUFLO09BWnBCLHdCQUF3QixDQW1JcEM7SUFBRCwrQkFBQztDQUFBLEFBbklELElBbUlDO0FBbklZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JvdXBTY2VuZSB9IGZyb20gJ34vYXBwL21vZGVscy9Hcm91cFNjZW5lLm1vZGVsJztcbmltcG9ydCB7IEFwcFN0YXRlIH0gZnJvbSAnfi9hcHAvc3RvcmUvYXBwLnN0YXRlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgVXBkYXRlVXNlckFjdGlvbiB9IGZyb20gJ34vYXBwL3N0b3JlL3VzZXIvdXNlci5hY3Rpb25zJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICd+L2FwcC9tb2RlbHMvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBHcm91cFN0YXRlIH0gZnJvbSAnfi9hcHAvbW9kZWxzL0dyb3VwU3RhdGUubW9kZWwnO1xuaW1wb3J0IHsgTGlzdFBpY2tlcn0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC1waWNrZXJcIjtcbmltcG9ydCB7IFVwZGF0ZUxpZ2h0U3RhdGVBY3Rpb24gfSBmcm9tICd+L2FwcC9zdG9yZS9odWUvaHVlLmFjdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdzY2VuZS1tYW5hZ2VtZW50Jyxcblx0dGVtcGxhdGVVcmw6ICcuL3NjZW5lLW1hbmFnZW1lbnQuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9zY2VuZS1tYW5hZ2VtZW50LmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFNjZW5lTWFuYWdlbWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0QElucHV0KCkgZ3JvdXBTY2VuZTogR3JvdXBTY2VuZTtcblx0QElucHV0KCkgdXNlcjogVXNlcjtcblxuXHRzY2VuZXM6IGFueVtdID0gW107XG5cdGVuYWJsZWRTY2VuZU5hbWUgPSAnJztcblx0c2hvd1BhbmVsID0gZmFsc2U7XG5cdHNjZW5lQ2hhbmdlZCA9IGZhbHNlO1xuXHRzZWxlY3RlZFNjZW5lOiBhbnkgPSBudWxsO1xuXHRjaGVja2VkID0gZmFsc2U7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogU3RvcmU8QXBwU3RhdGU+KSB7IH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmdyb3VwU2NlbmUuc2NlbmVzLmZvckVhY2goc2NlbmUgPT4ge1xuXHRcdFx0aWYgKHNjZW5lLmVuYWJsZU9uSG9tZSkge1xuXHRcdFx0XHR0aGlzLmVuYWJsZWRTY2VuZU5hbWUgPSBzY2VuZS5uYW1lO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5zY2VuZXMucHVzaChzY2VuZS5uYW1lKTtcdFxuXHRcdH0pO1xuXHRcdHRoaXMuc2VsZWN0ZWRTY2VuZSA9IDA7XG5cdH1cblxuXHRzYXZlQ2hhbmdlKCkge1xuXHRcdGNvbnNvbGUubG9nKCdzZWxlY3RlZCBzY2VuZSAnICsgdGhpcy5zZWxlY3RlZFNjZW5lKTtcblx0XHQvLyBpZiB0aGUgdXNlciBoYXMgbm90IHNldCB1cCBhbnkgZ3JvdXAgc3RhdGVzLCBpbml0IHRoZSBhcnJheVxuXHRcdGlmICghdGhpcy51c2VyLmdyb3VwU3RhdGVzKSB7XG5cdFx0XHRjb25zb2xlLmxvZygndGhlIGdyb3VwIHN0YXRlcyB3ZXJlIG51bGwnKTtcblx0XHRcdHRoaXMudXNlci5ncm91cFN0YXRlcyA9IFtdO1xuXHRcdH1cblx0XHRsZXQgb2xkVXNlciA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMudXNlcik7IFxuXHRcdHRoaXMuZ3JvdXBTY2VuZS5zY2VuZXMuZm9yRWFjaChzY2VuZSA9PiB7XG5cdFx0XHRpZiAoSlNPTi5zdHJpbmdpZnkodGhpcy5zZWxlY3RlZFNjZW5lKSA9PT0gSlNPTi5zdHJpbmdpZnkoc2NlbmUubmFtZSkpIHtcblx0XHRcdFx0bGV0IHNjZW5lSWQgPSBzY2VuZS5pZDtcblx0XHRcdFx0bGV0IGdyb3VwU3RhdGU6IEdyb3VwU3RhdGUgPSB7XG5cdFx0XHRcdFx0Z3JvdXBJZDogdGhpcy5ncm91cFNjZW5lLmdyb3VwSWQudG9TdHJpbmcoKSxcblx0XHRcdFx0XHRzY2VuZUlkOiBzY2VuZUlkLnRvU3RyaW5nKClcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBDQVNFOiBUaGlzIGlzIHRoZSBmaXJzdCB0aW1lIGEgZ3JvdXAgaXMgYmVpbmcgc2V0IHVwXG5cdFx0XHRcdGlmICh0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0Ly8ganVzdCBhcHBlbmQgdG8gdGhlIHVzZXJzIGdyb3VwIHN0YXRlc1xuXHRcdFx0XHRcdHRoaXMudXNlci5ncm91cFN0YXRlcy5wdXNoKGdyb3VwU3RhdGUpXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gQ0FTRTogZ3JvdXAgc3RhdGVzIGV4aXN0LCBzbyB3ZSBtYXkgbmVlZCB0byByZW1vdmUgYW4gb2xkIGNvbmZpZ3VyYXRpb25cblx0XHRcdFx0XHR2YXIgaW5kZXggPSB0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMuZmluZEluZGV4KGdyb3Vwc3RhdGUgPT4gZ3JvdXBzdGF0ZS5ncm91cElkID09IHRoaXMuZ3JvdXBTY2VuZS5ncm91cElkKTtcblx0XHRcdFx0XHRpZiAoaW5kZXggPiAtMSkge1xuXHRcdFx0XHRcdFx0Ly8gYSBncm91cCB3YXMgYWxyZWFkeSBjb25maWd1cmVkLCBzbyByZW1vdmVkIGV4aXN0aW5nIGNvbmZpZ3VyYXRpb25cblx0XHRcdFx0XHRcdHRoaXMudXNlci5ncm91cFN0YXRlcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ1NwbGljaW5nIG9sZCBjb25maWd1cmF0aW9uICcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gcHVzaCBuZXcgZ3JvdXAgc3RhdGVcblx0XHRcdFx0XHR0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMucHVzaChncm91cFN0YXRlKTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnUHVzaGVkIG5ldyBncm91cCBzdGF0ZSAnICsgSlNPTi5zdHJpbmdpZnkodGhpcy51c2VyLmdyb3VwU3RhdGVzKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0XHQvLyB1cGRhdGUgbGlnaHRzIHdpdGggbmV3IGdyb3VwIHN0YXRlc1xuXHRcdHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFVwZGF0ZUxpZ2h0U3RhdGVBY3Rpb24odGhpcy51c2VyLCB0cnVlLCB0cnVlKSk7XG5cdFx0Ly8gcGVyc2lzdCBuZXcgZ3JvdXAgc3RhdGVzXG5cdFx0dGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgVXBkYXRlVXNlckFjdGlvbih0aGlzLnVzZXIpKTtcblx0XHQvLyB0aGVuIGNvbGxhcHNlIHRoZSBwYW5lbFxuXHRcdHRoaXMucmVzZXQoKTtcblx0fVx0XG5cblx0Y2FuY2VsQ2hhbmdlKCkge1xuXHRcdGNvbnNvbGUubG9nKCdjYW5jZWxpbmcsIGJ1dCB5b3UgaGFkIHNlbGVjdGVkIGluZGV4ICcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnNlbGVjdGVkU2NlbmUpKTtcblx0XHR0aGlzLnJlc2V0KCk7XG5cdH1cblxuXHRyZXNldCgpIHtcblx0XHR0aGlzLnNjZW5lQ2hhbmdlZCA9IGZhbHNlO1xuXHRcdHRoaXMuc2VsZWN0ZWRTY2VuZSA9IG51bGw7XG5cdFx0dGhpcy5zaG93UGFuZWwgPSBmYWxzZTtcblx0fVxuXG5cdGhhbmRsZUNsaWNrKCkge1xuXHRcdGNvbnNvbGUubG9nKCdFbmFibGVkIHNjZW5lOiAnICsgSlNPTi5zdHJpbmdpZnkodGhpcy5lbmFibGVkU2NlbmVOYW1lKSk7XG5cdFx0dGhpcy5zaG93UGFuZWwgPSAhdGhpcy5zaG93UGFuZWw7XG5cdFx0aWYgKHRoaXMuc2hvd1BhbmVsKSB7XG5cdFx0XHQvLyBpZiB3ZSBhcmUgc2hvd2luZyB0aGUgcGFuZWwsIGZvY3VzIG9uIHRoZSBmaXJzdCBpdGVtXG5cdFx0XHR0aGlzLnNlbGVjdGVkU2NlbmUgPSAwO1xuXHRcdFx0dGhpcy5zZXR1cCgpO1xuXHRcdH1cblx0fVxuXG5cdHNldHVwKCkge1xuXHRcdHZhciBpID0gMDtcblx0XHR0aGlzLnNjZW5lcy5mb3JFYWNoKHNjZW5lID0+IHtcblx0XHRcdGlmIChzY2VuZS5lbmFibGVPbkhvbWUpIHtcblx0XHRcdFx0dGhpcy5lbmFibGVkU2NlbmVOYW1lID0gc2NlbmUubmFtZTtcblx0XHRcdFx0Ly8gbWFrZSBsaXN0IHBpY2tlciBmb2N1cyBvbiBzZWxlY3RlZCBzY2VuZSwgY2hlY2sgdGhlIHRvZ2dsZVxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkU2NlbmUgPSBpO1xuXHRcdFx0XHR0aGlzLmNoZWNrZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0aSsrO1xuXHRcdH0pO1xuXHRcdHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xuXHR9XG5cblx0c2VsZWN0ZWRJbmRleENoYW5nZShhcmdzKSB7XG5cdFx0Ly8gVE9ETyBzaG91bGQgcHJlIGxvYWQgdGhpcyBpbiBhIGxpc3Qgc29tZWhvd1xuXHRcdGxldCBwaWNrZXIgPSA8TGlzdFBpY2tlcj4gYXJncy5vYmplY3Q7XG5cdFx0bGV0IGluZGV4ID0gcGlja2VyLnNlbGVjdGVkSW5kZXg7XG5cdFx0aWYgKGluZGV4ID49IDApIHtcblx0XHRcdHRoaXMuc2VsZWN0ZWRTY2VuZSA9IHRoaXMuc2NlbmVzW2luZGV4XTtcblx0XHRcdC8vICB3ZSBoYXZlIHRvIGxvb3Agb3ZlciB0aGUgZ3JvdXAgc2NlbmVzIGFuZCBzZWUgaWYgd2UgZmluZCBhIG1hdGNoXG5cdFx0XHRjb25zb2xlLmxvZygnVGhlIGVuYWJsZWQgc2NlbmUgbmFtZSBpczogJyArIHRoaXMuZW5hYmxlZFNjZW5lTmFtZSk7XG5cdFx0XHRjb25zb2xlLmxvZygnVGhlIHNlbGVjdGVkIHNjZW5lIGlzOiAnICsgdGhpcy5zZWxlY3RlZFNjZW5lKTtcblx0XHRcdGlmICh0aGlzLmVuYWJsZWRTY2VuZU5hbWUgPT09IHRoaXMuc2VsZWN0ZWRTY2VuZSkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnY2hlY2tpbmcgdGhlIHN3aXRjaCcpO1xuXHRcdFx0XHR0aGlzLmNoZWNrZWQgPSB0cnVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5jaGVja2VkID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2NlbmVDaGFuZ2VkID0gdHJ1ZTtcblx0fVxuXG5cdG9uQ2hhbmdlKGFyZ3MpIHtcblx0XHR0aGlzLmNoZWNrZWQgPSBhcmdzLm9iamVjdC5jaGVja2VkO1xuXHRcdHZhciBpc0VuYWJsZWQgPSB0aGlzLnNlbGVjdGVkU2NlbmUgPT09IHRoaXMuZW5hYmxlZFNjZW5lTmFtZTtcblx0XHRpZiAodGhpcy5jaGVja2VkID09PSB0cnVlICYmICFpc0VuYWJsZWQpIHtcblx0XHRcdHRoaXMuZW5hYmxlZFNjZW5lTmFtZSA9IHRoaXMuc2VsZWN0ZWRTY2VuZTtcblx0XHR9XG5cdFx0dGhpcy5ncm91cFNjZW5lLnNjZW5lcy5mb3JFYWNoKHNjZW5lID0+IHtcblx0XHRcdGlmIChzY2VuZS5uYW1lID09PSB0aGlzLnNlbGVjdGVkU2NlbmUpIHtcblx0XHRcdFx0c2NlbmUuZW5hYmxlT25Ib21lID0gdGhpcy5jaGVja2VkO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59Il19