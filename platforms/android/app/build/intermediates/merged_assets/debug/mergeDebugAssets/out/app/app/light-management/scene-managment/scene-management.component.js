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
                        console.log('Splicing old configuration ' + JSON.stringify(_this.user.groupStates));
                    }
                    // push new group state
                    _this.user.groupStates.push(groupState);
                    console.log('Pushed new group state ' + JSON.stringify(_this.user.groupStates));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlbmUtbWFuYWdlbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY2VuZS1tYW5hZ2VtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxrRUFBMkQ7QUFFM0QscUNBQW9DO0FBQ3BDLDhEQUFpRTtBQUlqRSwyREFBcUU7QUFTckU7SUFZQyxrQ0FBb0IsS0FBc0I7UUFBdEIsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFQMUMsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUNuQixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDdEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixrQkFBYSxHQUFRLElBQUksQ0FBQztRQUMxQixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBRThCLENBQUM7SUFFL0MsMkNBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUNuQyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ25DO1lBQ0QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELDZDQUFVLEdBQVY7UUFBQSxpQkF3Q0M7UUF2Q0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEQsOERBQThEO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0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QUM7eUNBYzBCLGFBQUs7T0FacEIsd0JBQXdCLENBd0lwQztJQUFELCtCQUFDO0NBQUEsQUF4SUQsSUF3SUM7QUF4SVksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHcm91cFNjZW5lIH0gZnJvbSAnfi9hcHAvbW9kZWxzL0dyb3VwU2NlbmUubW9kZWwnO1xuaW1wb3J0IHsgQXBwU3RhdGUgfSBmcm9tICd+L2FwcC9zdG9yZS9hcHAuc3RhdGUnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBVcGRhdGVVc2VyQWN0aW9uIH0gZnJvbSAnfi9hcHAvc3RvcmUvdXNlci91c2VyLmFjdGlvbnMnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJ34vYXBwL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEdyb3VwU3RhdGUgfSBmcm9tICd+L2FwcC9tb2RlbHMvR3JvdXBTdGF0ZS5tb2RlbCc7XG5pbXBvcnQgeyBMaXN0UGlja2VyfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXBpY2tlclwiO1xuaW1wb3J0IHsgVXBkYXRlTGlnaHRTdGF0ZUFjdGlvbiB9IGZyb20gJ34vYXBwL3N0b3JlL2h1ZS9odWUuYWN0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ3NjZW5lLW1hbmFnZW1lbnQnLFxuXHR0ZW1wbGF0ZVVybDogJy4vc2NlbmUtbWFuYWdlbWVudC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL3NjZW5lLW1hbmFnZW1lbnQuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgU2NlbmVNYW5hZ2VtZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRASW5wdXQoKSBncm91cFNjZW5lOiBHcm91cFNjZW5lO1xuXHRASW5wdXQoKSB1c2VyOiBVc2VyO1xuXG5cdHNjZW5lczogYW55W10gPSBbXTtcblx0ZW5hYmxlZFNjZW5lTmFtZSA9ICcnO1xuXHRzaG93UGFuZWwgPSBmYWxzZTtcblx0c2NlbmVDaGFuZ2VkID0gZmFsc2U7XG5cdHNlbGVjdGVkU2NlbmU6IGFueSA9IG51bGw7XG5cdGNoZWNrZWQgPSBmYWxzZTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBTdG9yZTxBcHBTdGF0ZT4pIHsgfVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuZ3JvdXBTY2VuZS5zY2VuZXMuZm9yRWFjaChzY2VuZSA9PiB7XG5cdFx0XHRpZiAoc2NlbmUuZW5hYmxlT25Ib21lKSB7XG5cdFx0XHRcdHRoaXMuZW5hYmxlZFNjZW5lTmFtZSA9IHNjZW5lLm5hbWU7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNjZW5lcy5wdXNoKHNjZW5lLm5hbWUpO1x0XG5cdFx0fSk7XG5cdFx0dGhpcy5zZWxlY3RlZFNjZW5lID0gMDtcblx0fVxuXG5cdHNhdmVDaGFuZ2UoKSB7XG5cdFx0Y29uc29sZS5sb2coJ3NlbGVjdGVkIHNjZW5lICcgKyB0aGlzLnNlbGVjdGVkU2NlbmUpO1xuXHRcdC8vIGlmIHRoZSB1c2VyIGhhcyBub3Qgc2V0IHVwIGFueSBncm91cCBzdGF0ZXMsIGluaXQgdGhlIGFycmF5XG5cdFx0aWYgKCF0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMpIHtcblx0XHRcdGNvbnNvbGUubG9nKCd0aGUgZ3JvdXAgc3RhdGVzIHdlcmUgbnVsbCcpO1xuXHRcdFx0dGhpcy51c2VyLmdyb3VwU3RhdGVzID0gW107XG5cdFx0fVxuXHRcdC8vIGxldCBvbGRVc2VyID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy51c2VyKTsgXG5cdFx0dGhpcy5ncm91cFNjZW5lLnNjZW5lcy5mb3JFYWNoKHNjZW5lID0+IHtcblx0XHRcdGlmIChKU09OLnN0cmluZ2lmeSh0aGlzLnNlbGVjdGVkU2NlbmUpID09PSBKU09OLnN0cmluZ2lmeShzY2VuZS5uYW1lKSkge1xuXHRcdFx0XHRsZXQgc2NlbmVJZCA9IHNjZW5lLmlkO1xuXHRcdFx0XHRsZXQgZ3JvdXBTdGF0ZTogR3JvdXBTdGF0ZSA9IHtcblx0XHRcdFx0XHRncm91cElkOiB0aGlzLmdyb3VwU2NlbmUuZ3JvdXBJZC50b1N0cmluZygpLFxuXHRcdFx0XHRcdHNjZW5lSWQ6IHNjZW5lSWQudG9TdHJpbmcoKVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIENBU0U6IFRoaXMgaXMgdGhlIGZpcnN0IHRpbWUgYSBncm91cCBpcyBiZWluZyBzZXQgdXBcblx0XHRcdFx0aWYgKHRoaXMudXNlci5ncm91cFN0YXRlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHQvLyBqdXN0IGFwcGVuZCB0byB0aGUgdXNlcnMgZ3JvdXAgc3RhdGVzXG5cdFx0XHRcdFx0dGhpcy51c2VyLmdyb3VwU3RhdGVzLnB1c2goZ3JvdXBTdGF0ZSlcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBDQVNFOiBncm91cCBzdGF0ZXMgZXhpc3QsIHNvIHdlIG1heSBuZWVkIHRvIHJlbW92ZSBhbiBvbGQgY29uZmlndXJhdGlvblxuXHRcdFx0XHRcdHZhciBpbmRleCA9IHRoaXMudXNlci5ncm91cFN0YXRlcy5maW5kSW5kZXgoZ3JvdXBzdGF0ZSA9PiBncm91cHN0YXRlLmdyb3VwSWQgPT0gdGhpcy5ncm91cFNjZW5lLmdyb3VwSWQpO1xuXHRcdFx0XHRcdGlmIChpbmRleCA+IC0xKSB7XG5cdFx0XHRcdFx0XHQvLyBhIGdyb3VwIHdhcyBhbHJlYWR5IGNvbmZpZ3VyZWQsIHNvIHJlbW92ZWQgZXhpc3RpbmcgY29uZmlndXJhdGlvblxuXHRcdFx0XHRcdFx0dGhpcy51c2VyLmdyb3VwU3RhdGVzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnU3BsaWNpbmcgb2xkIGNvbmZpZ3VyYXRpb24gJyArIEpTT04uc3RyaW5naWZ5KHRoaXMudXNlci5ncm91cFN0YXRlcykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBwdXNoIG5ldyBncm91cCBzdGF0ZVxuXHRcdFx0XHRcdHRoaXMudXNlci5ncm91cFN0YXRlcy5wdXNoKGdyb3VwU3RhdGUpO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdQdXNoZWQgbmV3IGdyb3VwIHN0YXRlICcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXIuZ3JvdXBTdGF0ZXMpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdC8vIG5lZWQgdG8gdHVybiBvZmYgYWxsIGxpZ2h0cyBmaXJzdFxuXHRcdC8vIHVwZGF0ZSBsaWdodHMgd2l0aCBuZXcgZ3JvdXAgc3RhdGVzXG5cdFx0dGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgVXBkYXRlTGlnaHRTdGF0ZUFjdGlvbih0aGlzLnVzZXIsIHRydWUsIHRydWUpKTtcblx0XHQvLyBwZXJzaXN0IG5ldyBncm91cCBzdGF0ZXNcblx0XHR0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBVcGRhdGVVc2VyQWN0aW9uKHRoaXMudXNlcikpO1xuXHRcdC8vIHRoZW4gY29sbGFwc2UgdGhlIHBhbmVsXG5cdFx0dGhpcy5yZXNldCgpO1xuXHR9XHRcblxuXHRjYW5jZWxDaGFuZ2UoKSB7XG5cdFx0Y29uc29sZS5sb2coJ2NhbmNlbGluZywgYnV0IHlvdSBoYWQgc2VsZWN0ZWQgaW5kZXggJyArIEpTT04uc3RyaW5naWZ5KHRoaXMuc2VsZWN0ZWRTY2VuZSkpO1xuXHRcdHRoaXMucmVzZXQoKTtcblx0fVxuXG5cdHJlc2V0KCkge1xuXHRcdHRoaXMuc2NlbmVDaGFuZ2VkID0gZmFsc2U7XG5cdFx0dGhpcy5zZWxlY3RlZFNjZW5lID0gbnVsbDtcblx0XHR0aGlzLnNob3dQYW5lbCA9IGZhbHNlO1xuXHR9XG5cblx0aGFuZGxlQ2xpY2soKSB7XG5cdFx0Y29uc29sZS5sb2coJ0VuYWJsZWQgc2NlbmU6ICcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmVuYWJsZWRTY2VuZU5hbWUpKTtcblx0XHQvLyB0aGlzLnNob3dQYW5lbCA9ICF0aGlzLnNob3dQYW5lbDtcblx0XHRpZiAodGhpcy5zaG93UGFuZWwpIHtcblx0XHRcdC8vIGlmIHdlIGFyZSBzaG93aW5nIHRoZSBwYW5lbCwgZm9jdXMgb24gdGhlIGZpcnN0IGl0ZW1cblx0XHRcdHRoaXMuc2VsZWN0ZWRTY2VuZSA9IDA7XG5cdFx0XHR0aGlzLnNldHVwKCk7XG5cdFx0fVxuXHR9XG5cblx0c2V0dXAoKSB7XG5cdFx0dmFyIGkgPSAwO1xuXHRcdHRoaXMuc2NlbmVzLmZvckVhY2goc2NlbmUgPT4ge1xuXHRcdFx0aWYgKHNjZW5lLmVuYWJsZU9uSG9tZSkge1xuXHRcdFx0XHR0aGlzLmVuYWJsZWRTY2VuZU5hbWUgPSBzY2VuZS5uYW1lO1xuXHRcdFx0XHQvLyBtYWtlIGxpc3QgcGlja2VyIGZvY3VzIG9uIHNlbGVjdGVkIHNjZW5lLCBjaGVjayB0aGUgdG9nZ2xlXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRTY2VuZSA9IGk7XG5cdFx0XHRcdHRoaXMuY2hlY2tlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRpKys7XG5cdFx0fSk7XG5cdFx0dGhpcy5jaGVja2VkID0gZmFsc2U7XG5cdH1cblxuXHRzZWxlY3RlZEluZGV4Q2hhbmdlKGFyZ3MpIHtcblx0XHQvLyBUT0RPIHNob3VsZCBwcmUgbG9hZCB0aGlzIGluIGEgbGlzdCBzb21laG93XG5cdFx0bGV0IHBpY2tlciA9IDxMaXN0UGlja2VyPiBhcmdzLm9iamVjdDtcblx0XHRsZXQgaW5kZXggPSBwaWNrZXIuc2VsZWN0ZWRJbmRleDtcblx0XHRpZiAoaW5kZXggPj0gMCkge1xuXHRcdFx0dGhpcy5zZWxlY3RlZFNjZW5lID0gdGhpcy5zY2VuZXNbaW5kZXhdO1xuXHRcdFx0Ly8gIHdlIGhhdmUgdG8gbG9vcCBvdmVyIHRoZSBncm91cCBzY2VuZXMgYW5kIHNlZSBpZiB3ZSBmaW5kIGEgbWF0Y2hcblx0XHRcdGNvbnNvbGUubG9nKCdUaGUgZW5hYmxlZCBzY2VuZSBuYW1lIGlzOiAnICsgdGhpcy5lbmFibGVkU2NlbmVOYW1lKTtcblx0XHRcdGNvbnNvbGUubG9nKCdUaGUgc2VsZWN0ZWQgc2NlbmUgaXM6ICcgKyB0aGlzLnNlbGVjdGVkU2NlbmUpO1xuXHRcdFx0aWYgKHRoaXMuZW5hYmxlZFNjZW5lTmFtZSA9PT0gdGhpcy5zZWxlY3RlZFNjZW5lKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdjaGVja2luZyB0aGUgc3dpdGNoJyk7XG5cdFx0XHRcdHRoaXMuY2hlY2tlZCA9IHRydWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmNoZWNrZWQgPSBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zY2VuZUNoYW5nZWQgPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZXMgdGhlIHN3aXRjaCBvbiBjaGFuZ2UgY2hhbmdlXG5cdCAqIEBwYXJhbSBhcmdzIFxuXHQgKi9cblx0b25DaGFuZ2UoYXJncykge1xuXHRcdHRoaXMuY2hlY2tlZCA9IGFyZ3Mub2JqZWN0LmNoZWNrZWQ7XG5cdFx0dmFyIGlzRW5hYmxlZCA9IHRoaXMuc2VsZWN0ZWRTY2VuZSA9PT0gdGhpcy5lbmFibGVkU2NlbmVOYW1lO1xuXHRcdGlmICh0aGlzLmNoZWNrZWQgPT09IHRydWUgJiYgIWlzRW5hYmxlZCkge1xuXHRcdFx0dGhpcy5lbmFibGVkU2NlbmVOYW1lID0gdGhpcy5zZWxlY3RlZFNjZW5lO1xuXHRcdH1cblx0XHR0aGlzLmdyb3VwU2NlbmUuc2NlbmVzLmZvckVhY2goc2NlbmUgPT4ge1xuXHRcdFx0aWYgKHNjZW5lLm5hbWUgPT09IHRoaXMuc2VsZWN0ZWRTY2VuZSkge1xuXHRcdFx0XHRzY2VuZS5lbmFibGVPbkhvbWUgPSB0aGlzLmNoZWNrZWQ7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0iXX0=