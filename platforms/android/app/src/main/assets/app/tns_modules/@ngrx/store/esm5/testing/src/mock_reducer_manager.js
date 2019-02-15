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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
var MockReducerManager = /** @class */ (function (_super) {
    __extends(MockReducerManager, _super);
    function MockReducerManager() {
        return _super.call(this, function () { return undefined; }) || this;
    }
    MockReducerManager = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], MockReducerManager);
    return MockReducerManager;
}(BehaviorSubject));
export { MockReducerManager };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19yZWR1Y2VyX21hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3Rlc3Rpbmcvc3JjL21vY2tfcmVkdWNlcl9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJdkM7SUFBd0Msc0NBRXZDO0lBQ0M7ZUFDRSxrQkFBTSxjQUFNLE9BQUEsU0FBUyxFQUFULENBQVMsQ0FBQztJQUN4QixDQUFDO0lBTFUsa0JBQWtCO1FBRDlCLFVBQVUsRUFBRTs7T0FDQSxrQkFBa0IsQ0FNOUI7SUFBRCx5QkFBQztDQUFBLEFBTkQsQ0FBd0MsZUFBZSxHQU10RDtTQU5ZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWN0aW9uUmVkdWNlciB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vY2tSZWR1Y2VyTWFuYWdlciBleHRlbmRzIEJlaGF2aW9yU3ViamVjdDxcbiAgQWN0aW9uUmVkdWNlcjxhbnksIGFueT5cbj4ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigoKSA9PiB1bmRlZmluZWQpO1xuICB9XG59XG4iXX0=