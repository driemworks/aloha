var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var ScannedActionsSubject = /** @class */ (function (_super) {
    __extends(ScannedActionsSubject, _super);
    function ScannedActionsSubject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScannedActionsSubject.prototype.ngOnDestroy = function () {
        this.complete();
    };
    ScannedActionsSubject = __decorate([
        Injectable()
    ], ScannedActionsSubject);
    return ScannedActionsSubject;
}(Subject));
export { ScannedActionsSubject };
export var SCANNED_ACTIONS_SUBJECT_PROVIDERS = [
    ScannedActionsSubject,
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nhbm5lZF9hY3Rpb25zX3N1YmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zY2FubmVkX2FjdGlvbnNfc3ViamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUsvQjtJQUEyQyx5Q0FBZTtJQUExRDs7SUFLQSxDQUFDO0lBSEMsMkNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBSlUscUJBQXFCO1FBRGpDLFVBQVUsRUFBRTtPQUNBLHFCQUFxQixDQUtqQztJQUFELDRCQUFDO0NBQUEsQUFMRCxDQUEyQyxPQUFPLEdBS2pEO1NBTFkscUJBQXFCO0FBT2xDLE1BQU0sQ0FBQyxJQUFNLGlDQUFpQyxHQUFlO0lBQzNELHFCQUFxQjtDQUN0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL21vZGVscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTY2FubmVkQWN0aW9uc1N1YmplY3QgZXh0ZW5kcyBTdWJqZWN0PEFjdGlvbj5cbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNvbXBsZXRlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFNDQU5ORURfQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAgU2Nhbm5lZEFjdGlvbnNTdWJqZWN0LFxuXTtcbiJdfQ==