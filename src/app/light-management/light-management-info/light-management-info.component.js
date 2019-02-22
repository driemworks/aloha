"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var scene_model_1 = require("~/app/models/scene.model");
var store_1 = require("@ngrx/store");
var LightManagementInfoComponent = /** @class */ (function () {
    function LightManagementInfoComponent(store) {
        this.store = store;
        this.groupState = null;
        this.checked = false;
        this.changed = false;
    }
    LightManagementInfoComponent.prototype.ngOnInit = function () {
        // this.sceneGroupState = new GroupState(this.scene.groupId, this.scene.id);
        // this.checked = this.scene.enableOnHome;
    };
    LightManagementInfoComponent.prototype.onCheckedNoEdit = function (_switch) {
        // if the switch's status does not match the stored status and we are not in edit mode,
        // then flip the switch back to match the scene
        if (_switch.checked !== this.scene.enableOnHome) {
            _switch.checked = this.scene.enableOnHome;
        }
    };
    LightManagementInfoComponent.prototype.onCheckedEdit = function (args) {
        // if the switch is checked, set the group state to the scene's group state
        // otherwise set it to null
        this.changed = !this.changed;
        this.checked = args.object.checked;
        if (args.object.checked) {
            this.groupState = this.sceneGroupState;
        }
        else {
            this.groupState = null;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", scene_model_1.Scene)
    ], LightManagementInfoComponent.prototype, "scene", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LightManagementInfoComponent.prototype, "even", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LightManagementInfoComponent.prototype, "user", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LightManagementInfoComponent.prototype, "editMode", void 0);
    LightManagementInfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'light-management-info',
            templateUrl: './light-management-info.component.html',
            styleUrls: ['./light-management-info.component.css']
        }),
        __metadata("design:paramtypes", [store_1.Store])
    ], LightManagementInfoComponent);
    return LightManagementInfoComponent;
}());
exports.LightManagementInfoComponent = LightManagementInfoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHQtbWFuYWdlbWVudC1pbmZvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpZ2h0LW1hbmFnZW1lbnQtaW5mby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUQ7QUFDekQsd0RBQWlEO0FBQ2pELHFDQUFvQztBQWFwQztJQVlDLHNDQUFvQixLQUFzQjtRQUF0QixVQUFLLEdBQUwsS0FBSyxDQUFpQjtRQUoxQyxlQUFVLEdBQWUsSUFBSSxDQUFDO1FBQzlCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsWUFBTyxHQUFZLEtBQUssQ0FBQztJQUVxQixDQUFDO0lBRS9DLCtDQUFRLEdBQVI7UUFDQyw0RUFBNEU7UUFDNUUsMENBQTBDO0lBQzNDLENBQUM7SUFFRCxzREFBZSxHQUFmLFVBQWdCLE9BQU87UUFDdEIsdUZBQXVGO1FBQ3ZGLCtDQUErQztRQUMvQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDaEQsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztTQUMxQztJQUNGLENBQUM7SUFFRCxvREFBYSxHQUFiLFVBQWMsSUFBSTtRQUNqQiwyRUFBMkU7UUFDM0UsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDbkMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDdkM7YUFBTTtZQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO0lBQ0YsQ0FBQztJQW5DUTtRQUFSLFlBQUssRUFBRTtrQ0FBUSxtQkFBSzsrREFBQztJQUNiO1FBQVIsWUFBSyxFQUFFOzs4REFBVztJQUNWO1FBQVIsWUFBSyxFQUFFOzs4REFBWTtJQUNYO1FBQVIsWUFBSyxFQUFFOztrRUFBbUI7SUFMZiw0QkFBNEI7UUFQeEMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFdBQVcsRUFBRSx3Q0FBd0M7WUFDckQsU0FBUyxFQUFFLENBQUMsdUNBQXVDLENBQUM7U0FDcEQsQ0FBQzt5Q0FjMEIsYUFBSztPQVpwQiw0QkFBNEIsQ0F1Q3hDO0lBQUQsbUNBQUM7Q0FBQSxBQXZDRCxJQXVDQztBQXZDWSxvRUFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSAnfi9hcHAvbW9kZWxzL3NjZW5lLm1vZGVsJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgQXBwU3RhdGUgfSBmcm9tICd+L2FwcC9zdG9yZS9hcHAuc3RhdGUnO1xuaW1wb3J0IHsgVXBkYXRlVXNlckFjdGlvbiwgVXBkYXRlVXNlclN0YXRlQWN0aW9uIH0gZnJvbSAnfi9hcHAvc3RvcmUvdXNlci91c2VyLmFjdGlvbnMnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJ34vYXBwL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEdyb3VwU3RhdGUgfSBmcm9tICd+L2FwcC9tb2RlbHMvR3JvdXBTdGF0ZS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2xpZ2h0LW1hbmFnZW1lbnQtaW5mbycsXG5cdHRlbXBsYXRlVXJsOiAnLi9saWdodC1tYW5hZ2VtZW50LWluZm8uY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9saWdodC1tYW5hZ2VtZW50LWluZm8uY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgTGlnaHRNYW5hZ2VtZW50SW5mb0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0QElucHV0KCkgc2NlbmU6IFNjZW5lO1xuXHRASW5wdXQoKSBldmVuOiBhbnk7XG5cdEBJbnB1dCgpIHVzZXI6IFVzZXI7XG5cdEBJbnB1dCgpIGVkaXRNb2RlOiBib29sZWFuO1xuXG5cdHNjZW5lR3JvdXBTdGF0ZTogR3JvdXBTdGF0ZTtcblx0Z3JvdXBTdGF0ZTogR3JvdXBTdGF0ZSA9IG51bGw7XG5cdGNoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblx0Y2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IFN0b3JlPEFwcFN0YXRlPikgeyB9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0Ly8gdGhpcy5zY2VuZUdyb3VwU3RhdGUgPSBuZXcgR3JvdXBTdGF0ZSh0aGlzLnNjZW5lLmdyb3VwSWQsIHRoaXMuc2NlbmUuaWQpO1xuXHRcdC8vIHRoaXMuY2hlY2tlZCA9IHRoaXMuc2NlbmUuZW5hYmxlT25Ib21lO1xuXHR9XG5cblx0b25DaGVja2VkTm9FZGl0KF9zd2l0Y2gpIHtcblx0XHQvLyBpZiB0aGUgc3dpdGNoJ3Mgc3RhdHVzIGRvZXMgbm90IG1hdGNoIHRoZSBzdG9yZWQgc3RhdHVzIGFuZCB3ZSBhcmUgbm90IGluIGVkaXQgbW9kZSxcblx0XHQvLyB0aGVuIGZsaXAgdGhlIHN3aXRjaCBiYWNrIHRvIG1hdGNoIHRoZSBzY2VuZVxuXHRcdGlmIChfc3dpdGNoLmNoZWNrZWQgIT09IHRoaXMuc2NlbmUuZW5hYmxlT25Ib21lKSB7XG5cdFx0XHRfc3dpdGNoLmNoZWNrZWQgPSB0aGlzLnNjZW5lLmVuYWJsZU9uSG9tZTtcblx0XHR9XG5cdH1cblxuXHRvbkNoZWNrZWRFZGl0KGFyZ3MpIHtcblx0XHQvLyBpZiB0aGUgc3dpdGNoIGlzIGNoZWNrZWQsIHNldCB0aGUgZ3JvdXAgc3RhdGUgdG8gdGhlIHNjZW5lJ3MgZ3JvdXAgc3RhdGVcblx0XHQvLyBvdGhlcndpc2Ugc2V0IGl0IHRvIG51bGxcblx0XHR0aGlzLmNoYW5nZWQgPSAhdGhpcy5jaGFuZ2VkO1xuXHRcdHRoaXMuY2hlY2tlZCA9IGFyZ3Mub2JqZWN0LmNoZWNrZWQ7XG5cdFx0aWYgKGFyZ3Mub2JqZWN0LmNoZWNrZWQpIHtcblx0XHRcdHRoaXMuZ3JvdXBTdGF0ZSA9IHRoaXMuc2NlbmVHcm91cFN0YXRlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmdyb3VwU3RhdGUgPSBudWxsO1xuXHRcdH1cblx0fVxuXG59Il19