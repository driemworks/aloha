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
        // if the user has not set up any group states, init the array
        if (!this.user.groupStates) {
            this.user.groupStates = [];
        }
        // let oldUser = Object.assign({}, this.user); 
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
                    }
                    // push new group state
                    _this.user.groupStates.push(groupState);
                }
            }
        });
        // need to turn off all lights first
        // update lights with new group states
        this.store.dispatch(new hue_actions_1.UpdateLightStateAction(this.user, true, true));
        // persist new group states
        this.store.dispatch(new user_actions_1.UpdateUserAction(this.user));
        // then collapse the panel
        this.reset();
    };
    SceneManagementComponent.prototype.cancelChange = function () {
        this.reset();
    };
    SceneManagementComponent.prototype.reset = function () {
        this.sceneChanged = false;
        this.selectedScene = null;
        this.showPanel = false;
    };
    SceneManagementComponent.prototype.handleClick = function () {
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
            if (this.enabledSceneName === this.selectedScene) {
                this.checked = true;
            }
            else {
                this.checked = false;
            }
        }
        this.sceneChanged = true;
    };
    /**
     * Handles the switch on change change
     * @param args
     */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlbmUtbWFuYWdlbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY2VuZS1tYW5hZ2VtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxrRUFBMkQ7QUFFM0QscUNBQW9DO0FBQ3BDLDhEQUFpRTtBQUlqRSwyREFBcUU7QUFTckU7SUFZQyxrQ0FBb0IsS0FBc0I7UUFBdEIsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFQMUMsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUNuQixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDdEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixrQkFBYSxHQUFRLElBQUksQ0FBQztRQUMxQixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBRThCLENBQUM7SUFFL0MsMkNBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUNuQyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ25DO1lBQ0QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELDZDQUFVLEdBQVY7UUFBQSxpQkFvQ0M7UUFuQ0EsOERBQThEO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7U0FDM0I7UUFDRCwrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFN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bEM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUE1SFE7UUFBUixZQUFLLEVBQUU7a0NBQWEsNkJBQVU7Z0VBQUM7SUFDdkI7UUFBUixZQUFLLEVBQUU7OzBEQUFZO0lBSFIsd0JBQXdCO1FBUHBDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsbUNBQW1DO1lBQ2hELFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO1NBQy9DLENBQUM7eUNBYzBCLGFBQUs7T0FacEIsd0JBQXdCLENBK0hwQztJQUFELCtCQUFDO0NBQUEsQUEvSEQsSUErSEM7QUEvSFksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHcm91cFNjZW5lIH0gZnJvbSAnfi9hcHAvbW9kZWxzL0dyb3VwU2NlbmUubW9kZWwnO1xuaW1wb3J0IHsgQXBwU3RhdGUgfSBmcm9tICd+L2FwcC9zdG9yZS9hcHAuc3RhdGUnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBVcGRhdGVVc2VyQWN0aW9uIH0gZnJvbSAnfi9hcHAvc3RvcmUvdXNlci91c2VyLmFjdGlvbnMnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJ34vYXBwL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEdyb3VwU3RhdGUgfSBmcm9tICd+L2FwcC9tb2RlbHMvR3JvdXBTdGF0ZS5tb2RlbCc7XG5pbXBvcnQgeyBMaXN0UGlja2VyfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXBpY2tlclwiO1xuaW1wb3J0IHsgVXBkYXRlTGlnaHRTdGF0ZUFjdGlvbiB9IGZyb20gJ34vYXBwL3N0b3JlL2h1ZS9odWUuYWN0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ3NjZW5lLW1hbmFnZW1lbnQnLFxuXHR0ZW1wbGF0ZVVybDogJy4vc2NlbmUtbWFuYWdlbWVudC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL3NjZW5lLW1hbmFnZW1lbnQuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgU2NlbmVNYW5hZ2VtZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRASW5wdXQoKSBncm91cFNjZW5lOiBHcm91cFNjZW5lO1xuXHRASW5wdXQoKSB1c2VyOiBVc2VyO1xuXG5cdHNjZW5lczogYW55W10gPSBbXTtcblx0ZW5hYmxlZFNjZW5lTmFtZSA9ICcnO1xuXHRzaG93UGFuZWwgPSBmYWxzZTtcblx0c2NlbmVDaGFuZ2VkID0gZmFsc2U7XG5cdHNlbGVjdGVkU2NlbmU6IGFueSA9IG51bGw7XG5cdGNoZWNrZWQgPSBmYWxzZTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBTdG9yZTxBcHBTdGF0ZT4pIHsgfVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuZ3JvdXBTY2VuZS5zY2VuZXMuZm9yRWFjaChzY2VuZSA9PiB7XG5cdFx0XHRpZiAoc2NlbmUuZW5hYmxlT25Ib21lKSB7XG5cdFx0XHRcdHRoaXMuZW5hYmxlZFNjZW5lTmFtZSA9IHNjZW5lLm5hbWU7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNjZW5lcy5wdXNoKHNjZW5lLm5hbWUpO1x0XG5cdFx0fSk7XG5cdFx0dGhpcy5zZWxlY3RlZFNjZW5lID0gMDtcblx0fVxuXG5cdHNhdmVDaGFuZ2UoKSB7XG5cdFx0Ly8gaWYgdGhlIHVzZXIgaGFzIG5vdCBzZXQgdXAgYW55IGdyb3VwIHN0YXRlcywgaW5pdCB0aGUgYXJyYXlcblx0XHRpZiAoIXRoaXMudXNlci5ncm91cFN0YXRlcykge1xuXHRcdFx0dGhpcy51c2VyLmdyb3VwU3RhdGVzID0gW107XG5cdFx0fVxuXHRcdC8vIGxldCBvbGRVc2VyID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy51c2VyKTsgXG5cdFx0dGhpcy5ncm91cFNjZW5lLnNjZW5lcy5mb3JFYWNoKHNjZW5lID0+IHtcblx0XHRcdGlmIChKU09OLnN0cmluZ2lmeSh0aGlzLnNlbGVjdGVkU2NlbmUpID09PSBKU09OLnN0cmluZ2lmeShzY2VuZS5uYW1lKSkge1xuXHRcdFx0XHRsZXQgc2NlbmVJZCA9IHNjZW5lLmlkO1xuXHRcdFx0XHRsZXQgZ3JvdXBTdGF0ZTogR3JvdXBTdGF0ZSA9IHtcblx0XHRcdFx0XHRncm91cElkOiB0aGlzLmdyb3VwU2NlbmUuZ3JvdXBJZC50b1N0cmluZygpLFxuXHRcdFx0XHRcdHNjZW5lSWQ6IHNjZW5lSWQudG9TdHJpbmcoKVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIENBU0U6IFRoaXMgaXMgdGhlIGZpcnN0IHRpbWUgYSBncm91cCBpcyBiZWluZyBzZXQgdXBcblx0XHRcdFx0aWYgKHRoaXMudXNlci5ncm91cFN0YXRlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHQvLyBqdXN0IGFwcGVuZCB0byB0aGUgdXNlcnMgZ3JvdXAgc3RhdGVzXG5cdFx0XHRcdFx0dGhpcy51c2VyLmdyb3VwU3RhdGVzLnB1c2goZ3JvdXBTdGF0ZSlcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBDQVNFOiBncm91cCBzdGF0ZXMgZXhpc3QsIHNvIHdlIG1heSBuZWVkIHRvIHJlbW92ZSBhbiBvbGQgY29uZmlndXJhdGlvblxuXHRcdFx0XHRcdHZhciBpbmRleCA9IHRoaXMudXNlci5ncm91cFN0YXRlcy5maW5kSW5kZXgoZ3JvdXBzdGF0ZSA9PiBncm91cHN0YXRlLmdyb3VwSWQgPT0gdGhpcy5ncm91cFNjZW5lLmdyb3VwSWQpO1xuXHRcdFx0XHRcdGlmIChpbmRleCA+IC0xKSB7XG5cdFx0XHRcdFx0XHQvLyBhIGdyb3VwIHdhcyBhbHJlYWR5IGNvbmZpZ3VyZWQsIHNvIHJlbW92ZWQgZXhpc3RpbmcgY29uZmlndXJhdGlvblxuXHRcdFx0XHRcdFx0dGhpcy51c2VyLmdyb3VwU3RhdGVzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIHB1c2ggbmV3IGdyb3VwIHN0YXRlXG5cdFx0XHRcdFx0dGhpcy51c2VyLmdyb3VwU3RhdGVzLnB1c2goZ3JvdXBTdGF0ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0XHQvLyBuZWVkIHRvIHR1cm4gb2ZmIGFsbCBsaWdodHMgZmlyc3Rcblx0XHQvLyB1cGRhdGUgbGlnaHRzIHdpdGggbmV3IGdyb3VwIHN0YXRlc1xuXHRcdHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFVwZGF0ZUxpZ2h0U3RhdGVBY3Rpb24odGhpcy51c2VyLCB0cnVlLCB0cnVlKSk7XG5cdFx0Ly8gcGVyc2lzdCBuZXcgZ3JvdXAgc3RhdGVzXG5cdFx0dGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgVXBkYXRlVXNlckFjdGlvbih0aGlzLnVzZXIpKTtcblx0XHQvLyB0aGVuIGNvbGxhcHNlIHRoZSBwYW5lbFxuXHRcdHRoaXMucmVzZXQoKTtcblx0fVx0XG5cblx0Y2FuY2VsQ2hhbmdlKCkge1xuXHRcdHRoaXMucmVzZXQoKTtcblx0fVxuXG5cdHJlc2V0KCkge1xuXHRcdHRoaXMuc2NlbmVDaGFuZ2VkID0gZmFsc2U7XG5cdFx0dGhpcy5zZWxlY3RlZFNjZW5lID0gbnVsbDtcblx0XHR0aGlzLnNob3dQYW5lbCA9IGZhbHNlO1xuXHR9XG5cblx0aGFuZGxlQ2xpY2soKSB7XG5cdFx0Ly8gdGhpcy5zaG93UGFuZWwgPSAhdGhpcy5zaG93UGFuZWw7XG5cdFx0aWYgKHRoaXMuc2hvd1BhbmVsKSB7XG5cdFx0XHQvLyBpZiB3ZSBhcmUgc2hvd2luZyB0aGUgcGFuZWwsIGZvY3VzIG9uIHRoZSBmaXJzdCBpdGVtXG5cdFx0XHR0aGlzLnNlbGVjdGVkU2NlbmUgPSAwO1xuXHRcdFx0dGhpcy5zZXR1cCgpO1xuXHRcdH1cblx0fVxuXG5cdHNldHVwKCkge1xuXHRcdHZhciBpID0gMDtcblx0XHR0aGlzLnNjZW5lcy5mb3JFYWNoKHNjZW5lID0+IHtcblx0XHRcdGlmIChzY2VuZS5lbmFibGVPbkhvbWUpIHtcblx0XHRcdFx0dGhpcy5lbmFibGVkU2NlbmVOYW1lID0gc2NlbmUubmFtZTtcblx0XHRcdFx0Ly8gbWFrZSBsaXN0IHBpY2tlciBmb2N1cyBvbiBzZWxlY3RlZCBzY2VuZSwgY2hlY2sgdGhlIHRvZ2dsZVxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkU2NlbmUgPSBpO1xuXHRcdFx0XHR0aGlzLmNoZWNrZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0aSsrO1xuXHRcdH0pO1xuXHRcdHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xuXHR9XG5cblx0c2VsZWN0ZWRJbmRleENoYW5nZShhcmdzKSB7XG5cdFx0Ly8gVE9ETyBzaG91bGQgcHJlIGxvYWQgdGhpcyBpbiBhIGxpc3Qgc29tZWhvd1xuXHRcdGxldCBwaWNrZXIgPSA8TGlzdFBpY2tlcj4gYXJncy5vYmplY3Q7XG5cdFx0bGV0IGluZGV4ID0gcGlja2VyLnNlbGVjdGVkSW5kZXg7XG5cdFx0aWYgKGluZGV4ID49IDApIHtcblx0XHRcdHRoaXMuc2VsZWN0ZWRTY2VuZSA9IHRoaXMuc2NlbmVzW2luZGV4XTtcblx0XHRcdC8vICB3ZSBoYXZlIHRvIGxvb3Agb3ZlciB0aGUgZ3JvdXAgc2NlbmVzIGFuZCBzZWUgaWYgd2UgZmluZCBhIG1hdGNoXG5cdFx0XHRpZiAodGhpcy5lbmFibGVkU2NlbmVOYW1lID09PSB0aGlzLnNlbGVjdGVkU2NlbmUpIHtcblx0XHRcdFx0dGhpcy5jaGVja2VkID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNjZW5lQ2hhbmdlZCA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlcyB0aGUgc3dpdGNoIG9uIGNoYW5nZSBjaGFuZ2Vcblx0ICogQHBhcmFtIGFyZ3MgXG5cdCAqL1xuXHRvbkNoYW5nZShhcmdzKSB7XG5cdFx0dGhpcy5jaGVja2VkID0gYXJncy5vYmplY3QuY2hlY2tlZDtcblx0XHR2YXIgaXNFbmFibGVkID0gdGhpcy5zZWxlY3RlZFNjZW5lID09PSB0aGlzLmVuYWJsZWRTY2VuZU5hbWU7XG5cdFx0aWYgKHRoaXMuY2hlY2tlZCA9PT0gdHJ1ZSAmJiAhaXNFbmFibGVkKSB7XG5cdFx0XHR0aGlzLmVuYWJsZWRTY2VuZU5hbWUgPSB0aGlzLnNlbGVjdGVkU2NlbmU7XG5cdFx0fVxuXHRcdHRoaXMuZ3JvdXBTY2VuZS5zY2VuZXMuZm9yRWFjaChzY2VuZSA9PiB7XG5cdFx0XHRpZiAoc2NlbmUubmFtZSA9PT0gdGhpcy5zZWxlY3RlZFNjZW5lKSB7XG5cdFx0XHRcdHNjZW5lLmVuYWJsZU9uSG9tZSA9IHRoaXMuY2hlY2tlZDtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSJdfQ==