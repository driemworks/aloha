"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ExpansionPanelComponent = /** @class */ (function () {
    function ExpansionPanelComponent() {
        this.showPanel = false;
        this.onTogglePanel = new core_1.EventEmitter();
    }
    ExpansionPanelComponent.prototype.handleClick = function () {
        this.showPanel = !this.showPanel;
        this.onTogglePanel.emit(this.showPanel);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ExpansionPanelComponent.prototype, "onTogglePanel", void 0);
    ExpansionPanelComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'expansion-panel',
            templateUrl: './expansion-panel.component.html',
            styleUrls: ['./expansion-panel.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ExpansionPanelComponent);
    return ExpansionPanelComponent;
}());
exports.ExpansionPanelComponent = ExpansionPanelComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5zaW9uLXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cGFuc2lvbi1wYW5lbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0U7QUFTeEU7SUFNQztRQUpBLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFUixrQkFBYSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQUVoRCxDQUFDO0lBRWpCLDZDQUFXLEdBQVg7UUFDQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQVBTO1FBQVQsYUFBTSxFQUFFO2tDQUFnQixtQkFBWTtrRUFBMkI7SUFKcEQsdUJBQXVCO1FBUG5DLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO1NBQzlDLENBQUM7O09BRVcsdUJBQXVCLENBWW5DO0lBQUQsOEJBQUM7Q0FBQSxBQVpELElBWUM7QUFaWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnZXhwYW5zaW9uLXBhbmVsJyxcblx0dGVtcGxhdGVVcmw6ICcuL2V4cGFuc2lvbi1wYW5lbC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2V4cGFuc2lvbi1wYW5lbC5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBFeHBhbnNpb25QYW5lbENvbXBvbmVudCB7XG5cblx0c2hvd1BhbmVsID0gZmFsc2U7XG5cblx0QE91dHB1dCgpIG9uVG9nZ2xlUGFuZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdGNvbnN0cnVjdG9yKCkgeyB9XG5cblx0aGFuZGxlQ2xpY2soKSB7XG5cdFx0dGhpcy5zaG93UGFuZWwgPSAhdGhpcy5zaG93UGFuZWw7XG5cdFx0dGhpcy5vblRvZ2dsZVBhbmVsLmVtaXQodGhpcy5zaG93UGFuZWwpO1xuXHR9XG59Il19