"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GroupScene_model_1 = require("~/app/models/GroupScene.model");
var SceneManagementComponent = /** @class */ (function () {
    function SceneManagementComponent() {
        this.enabledSceneName = ' - ';
    }
    SceneManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('In scene mgmt' + JSON.stringify(this.groupScene));
        this.groupScene.scenes.forEach(function (scene) {
            if (scene.enableOnHome === true) {
                _this.enabledSceneName = scene.name;
            }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", GroupScene_model_1.GroupScene)
    ], SceneManagementComponent.prototype, "groupScene", void 0);
    SceneManagementComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'scene-management',
            templateUrl: './scene-management.component.html',
            styleUrls: ['./scene-management.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], SceneManagementComponent);
    return SceneManagementComponent;
}());
exports.SceneManagementComponent = SceneManagementComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlbmUtbWFuYWdlbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY2VuZS1tYW5hZ2VtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxrRUFBMkQ7QUFTM0Q7SUFNQztRQUZBLHFCQUFnQixHQUFHLEtBQUssQ0FBQztJQUVULENBQUM7SUFFakIsMkNBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO1lBQ25DLElBQUksS0FBSyxDQUFDLFlBQVksS0FBSyxJQUFJLEVBQUU7Z0JBQ2hDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ25DO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBYlE7UUFBUixZQUFLLEVBQUU7a0NBQWEsNkJBQVU7Z0VBQUM7SUFGcEIsd0JBQXdCO1FBUHBDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsbUNBQW1DO1lBQ2hELFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO1NBQy9DLENBQUM7O09BRVcsd0JBQXdCLENBZ0JwQztJQUFELCtCQUFDO0NBQUEsQUFoQkQsSUFnQkM7QUFoQlksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHcm91cFNjZW5lIH0gZnJvbSAnfi9hcHAvbW9kZWxzL0dyb3VwU2NlbmUubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdzY2VuZS1tYW5hZ2VtZW50Jyxcblx0dGVtcGxhdGVVcmw6ICcuL3NjZW5lLW1hbmFnZW1lbnQuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9zY2VuZS1tYW5hZ2VtZW50LmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFNjZW5lTWFuYWdlbWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0QElucHV0KCkgZ3JvdXBTY2VuZTogR3JvdXBTY2VuZTtcblxuXHRlbmFibGVkU2NlbmVOYW1lID0gJyAtICc7XG5cblx0Y29uc3RydWN0b3IoKSB7IH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHRjb25zb2xlLmxvZygnSW4gc2NlbmUgbWdtdCcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmdyb3VwU2NlbmUpKTtcblx0XHR0aGlzLmdyb3VwU2NlbmUuc2NlbmVzLmZvckVhY2goc2NlbmUgPT4ge1xuXHRcdFx0aWYgKHNjZW5lLmVuYWJsZU9uSG9tZSA9PT0gdHJ1ZSkge1xuXHRcdFx0XHR0aGlzLmVuYWJsZWRTY2VuZU5hbWUgPSBzY2VuZS5uYW1lO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59Il19