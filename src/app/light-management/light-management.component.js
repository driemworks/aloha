"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var hue_service_1 = require("../services/hue.service");
var LightManagementComponent = /** @class */ (function () {
    function LightManagementComponent(hueService) {
        this.hueService = hueService;
        this.lightString = 'light state';
        this.lightStates = [];
    }
    LightManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('Init with user: ' + JSON.stringify(this.user));
        this.hueService.getLights(this.user.bridgeIpAddress, this.user.username).subscribe(function (res) {
            console.log('******************' + res.keys);
            // this.lightStates = Object.keys(res).map(e => res[e]);
            // console.log('Mapped light states: ' + JSON.stringify(this.lightStates));
            _this.lightString = JSON.stringify(res);
        });
    };
    LightManagementComponent.prototype.getLightState = function (args) {
        console.log("hello");
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LightManagementComponent.prototype, "user", void 0);
    LightManagementComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'light-management',
            templateUrl: './light-management.component.html',
            styleUrls: ['./light-management.component.css']
        }),
        __metadata("design:paramtypes", [hue_service_1.HueService])
    ], LightManagementComponent);
    return LightManagementComponent;
}());
exports.LightManagementComponent = LightManagementComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHQtbWFuYWdlbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaWdodC1tYW5hZ2VtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCx1REFBcUQ7QUFjckQ7SUFPQyxrQ0FBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUoxQyxnQkFBVyxHQUFXLGFBQWEsQ0FBQztRQUVwQyxnQkFBVyxHQUFVLEVBQUUsQ0FBQztJQUVzQixDQUFDO0lBRS9DLDJDQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBBLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDckYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0Msd0RBQXdEO1lBQ3hELDJFQUEyRTtZQUMzRSxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsZ0RBQWEsR0FBYixVQUFjLElBQWU7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBbkJRO1FBQVIsWUFBSyxFQUFFOzswREFBWTtJQUZSLHdCQUF3QjtRQVBwQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLG1DQUFtQztZQUNoRCxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztTQUMvQyxDQUFDO3lDQVMrQix3QkFBVTtPQVA5Qix3QkFBd0IsQ0FzQnBDO0lBQUQsK0JBQUM7Q0FBQSxBQXRCRCxJQXNCQztBQXRCWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh1ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9odWUuc2VydmljZSc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IEFwcFN0YXRlIH0gZnJvbSAnLi4vc3RvcmUvYXBwLnN0YXRlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9tb2RlbHMvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2xpZ2h0LW1hbmFnZW1lbnQnLFxuXHR0ZW1wbGF0ZVVybDogJy4vbGlnaHQtbWFuYWdlbWVudC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2xpZ2h0LW1hbmFnZW1lbnQuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgTGlnaHRNYW5hZ2VtZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRASW5wdXQoKSB1c2VyOiBVc2VyO1xuXHRsaWdodFN0cmluZzogU3RyaW5nID0gJ2xpZ2h0IHN0YXRlJztcblxuXHRsaWdodFN0YXRlczogYW55W10gPSBbXTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGh1ZVNlcnZpY2U6IEh1ZVNlcnZpY2UpIHsgfVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdGNvbnNvbGUubG9nKCdJbml0IHdpdGggdXNlcjogJyArIEpTT04uc3RyaW5naWZ5KHRoaXMudXNlcikpO1xuXHRcdHRoaXMuaHVlU2VydmljZS5nZXRMaWdodHModGhpcy51c2VyLmJyaWRnZUlwQWRkcmVzcywgdGhpcy51c2VyLnVzZXJuYW1lKS5zdWJzY3JpYmUocmVzID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKCcqKioqKioqKioqKioqKioqKionICsgcmVzLmtleXMpO1xuXHRcdFx0Ly8gdGhpcy5saWdodFN0YXRlcyA9IE9iamVjdC5rZXlzKHJlcykubWFwKGUgPT4gcmVzW2VdKTtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdNYXBwZWQgbGlnaHQgc3RhdGVzOiAnICsgSlNPTi5zdHJpbmdpZnkodGhpcy5saWdodFN0YXRlcykpO1xuXHRcdFx0dGhpcy5saWdodFN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHJlcyk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXRMaWdodFN0YXRlKGFyZ3M6IEV2ZW50RGF0YSkge1xuXHRcdGNvbnNvbGUubG9nKFwiaGVsbG9cIik7XG5cdH1cbn0iXX0=