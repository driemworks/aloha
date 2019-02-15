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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, queueScheduler, } from 'rxjs';
import { observeOn, scan, withLatestFrom } from 'rxjs/operators';
import { ActionsSubject, INIT } from './actions_subject';
import { ReducerObservable } from './reducer_manager';
import { ScannedActionsSubject } from './scanned_actions_subject';
import { INITIAL_STATE } from './tokens';
var StateObservable = /** @class */ (function (_super) {
    __extends(StateObservable, _super);
    function StateObservable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StateObservable;
}(Observable));
export { StateObservable };
var State = /** @class */ (function (_super) {
    __extends(State, _super);
    function State(actions$, reducer$, scannedActions, initialState) {
        var _this = _super.call(this, initialState) || this;
        var actionsOnQueue$ = actions$.pipe(observeOn(queueScheduler));
        var withLatestReducer$ = actionsOnQueue$.pipe(withLatestFrom(reducer$));
        var seed = { state: initialState };
        var stateAndAction$ = withLatestReducer$.pipe(scan(reduceState, seed));
        _this.stateSubscription = stateAndAction$.subscribe(function (_a) {
            var state = _a.state, action = _a.action;
            _this.next(state);
            scannedActions.next(action);
        });
        return _this;
    }
    State.prototype.ngOnDestroy = function () {
        this.stateSubscription.unsubscribe();
        this.complete();
    };
    State.INIT = INIT;
    State = __decorate([
        Injectable(),
        __param(3, Inject(INITIAL_STATE)),
        __metadata("design:paramtypes", [ActionsSubject,
            ReducerObservable,
            ScannedActionsSubject, Object])
    ], State);
    return State;
}(BehaviorSubject));
export { State };
export function reduceState(stateActionPair, _a) {
    if (stateActionPair === void 0) { stateActionPair = { state: undefined }; }
    var _b = __read(_a, 2), action = _b[0], reducer = _b[1];
    var state = stateActionPair.state;
    return { state: reducer(state, action), action: action };
}
export var STATE_PROVIDERS = [
    State,
    { provide: StateObservable, useExisting: State },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQ0wsZUFBZSxFQUNmLFVBQVUsRUFDVixjQUFjLEdBRWYsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRSxPQUFPLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXpELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFekM7SUFBOEMsbUNBQWU7SUFBN0Q7O0lBQStELENBQUM7SUFBRCxzQkFBQztBQUFELENBQUMsQUFBaEUsQ0FBOEMsVUFBVSxHQUFROztBQUdoRTtJQUE4Qix5QkFBb0I7SUFLaEQsZUFDRSxRQUF3QixFQUN4QixRQUEyQixFQUMzQixjQUFxQyxFQUNkLFlBQWlCO1FBSjFDLFlBTUUsa0JBQU0sWUFBWSxDQUFDLFNBd0JwQjtRQXRCQyxJQUFNLGVBQWUsR0FBdUIsUUFBUSxDQUFDLElBQUksQ0FDdkQsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUMxQixDQUFDO1FBQ0YsSUFBTSxrQkFBa0IsR0FFcEIsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUVuRCxJQUFNLElBQUksR0FBdUIsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUM7UUFDekQsSUFBTSxlQUFlLEdBR2hCLGtCQUFrQixDQUFDLElBQUksQ0FDMUIsSUFBSSxDQUNGLFdBQVcsRUFDWCxJQUFJLENBQ0wsQ0FDRixDQUFDO1FBRUYsS0FBSSxDQUFDLGlCQUFpQixHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsVUFBQyxFQUFpQjtnQkFBZixnQkFBSyxFQUFFLGtCQUFNO1lBQ2pFLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakIsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQzs7SUFDTCxDQUFDO0lBRUQsMkJBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQXZDZSxVQUFJLEdBQUcsSUFBSSxDQUFDO0lBRGpCLEtBQUs7UUFEakIsVUFBVSxFQUFFO1FBVVIsV0FBQSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUE7eUNBSFosY0FBYztZQUNkLGlCQUFpQjtZQUNYLHFCQUFxQjtPQVI1QixLQUFLLENBeUNqQjtJQUFELFlBQUM7Q0FBQSxBQXpDRCxDQUE4QixlQUFlLEdBeUM1QztTQXpDWSxLQUFLO0FBK0NsQixNQUFNLFVBQVUsV0FBVyxDQUN6QixlQUE2RCxFQUM3RCxFQUEyQztJQUQzQyxnQ0FBQSxFQUFBLG9CQUEyQyxLQUFLLEVBQUUsU0FBUyxFQUFFO1FBQzdELGtCQUEyQyxFQUExQyxjQUFNLEVBQUUsZUFBTztJQUVSLElBQUEsNkJBQUssQ0FBcUI7SUFDbEMsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUM7QUFDbkQsQ0FBQztBQUVELE1BQU0sQ0FBQyxJQUFNLGVBQWUsR0FBZTtJQUN6QyxLQUFLO0lBQ0wsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7Q0FDakQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBPYnNlcnZhYmxlLFxuICBxdWV1ZVNjaGVkdWxlcixcbiAgU3Vic2NyaXB0aW9uLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG9ic2VydmVPbiwgc2Nhbiwgd2l0aExhdGVzdEZyb20gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFjdGlvbnNTdWJqZWN0LCBJTklUIH0gZnJvbSAnLi9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHsgQWN0aW9uLCBBY3Rpb25SZWR1Y2VyIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgUmVkdWNlck9ic2VydmFibGUgfSBmcm9tICcuL3JlZHVjZXJfbWFuYWdlcic7XG5pbXBvcnQgeyBTY2FubmVkQWN0aW9uc1N1YmplY3QgfSBmcm9tICcuL3NjYW5uZWRfYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7IElOSVRJQUxfU1RBVEUgfSBmcm9tICcuL3Rva2Vucyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdGF0ZU9ic2VydmFibGUgZXh0ZW5kcyBPYnNlcnZhYmxlPGFueT4ge31cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0YXRlPFQ+IGV4dGVuZHMgQmVoYXZpb3JTdWJqZWN0PGFueT4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBzdGF0aWMgcmVhZG9ubHkgSU5JVCA9IElOSVQ7XG5cbiAgcHJpdmF0ZSBzdGF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGFjdGlvbnMkOiBBY3Rpb25zU3ViamVjdCxcbiAgICByZWR1Y2VyJDogUmVkdWNlck9ic2VydmFibGUsXG4gICAgc2Nhbm5lZEFjdGlvbnM6IFNjYW5uZWRBY3Rpb25zU3ViamVjdCxcbiAgICBASW5qZWN0KElOSVRJQUxfU1RBVEUpIGluaXRpYWxTdGF0ZTogYW55XG4gICkge1xuICAgIHN1cGVyKGluaXRpYWxTdGF0ZSk7XG5cbiAgICBjb25zdCBhY3Rpb25zT25RdWV1ZSQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IGFjdGlvbnMkLnBpcGUoXG4gICAgICBvYnNlcnZlT24ocXVldWVTY2hlZHVsZXIpXG4gICAgKTtcbiAgICBjb25zdCB3aXRoTGF0ZXN0UmVkdWNlciQ6IE9ic2VydmFibGU8XG4gICAgICBbQWN0aW9uLCBBY3Rpb25SZWR1Y2VyPGFueSwgQWN0aW9uPl1cbiAgICA+ID0gYWN0aW9uc09uUXVldWUkLnBpcGUod2l0aExhdGVzdEZyb20ocmVkdWNlciQpKTtcblxuICAgIGNvbnN0IHNlZWQ6IFN0YXRlQWN0aW9uUGFpcjxUPiA9IHsgc3RhdGU6IGluaXRpYWxTdGF0ZSB9O1xuICAgIGNvbnN0IHN0YXRlQW5kQWN0aW9uJDogT2JzZXJ2YWJsZTx7XG4gICAgICBzdGF0ZTogYW55O1xuICAgICAgYWN0aW9uPzogQWN0aW9uO1xuICAgIH0+ID0gd2l0aExhdGVzdFJlZHVjZXIkLnBpcGUoXG4gICAgICBzY2FuPFtBY3Rpb24sIEFjdGlvblJlZHVjZXI8VCwgQWN0aW9uPl0sIFN0YXRlQWN0aW9uUGFpcjxUPj4oXG4gICAgICAgIHJlZHVjZVN0YXRlLFxuICAgICAgICBzZWVkXG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24gPSBzdGF0ZUFuZEFjdGlvbiQuc3Vic2NyaWJlKCh7IHN0YXRlLCBhY3Rpb24gfSkgPT4ge1xuICAgICAgdGhpcy5uZXh0KHN0YXRlKTtcbiAgICAgIHNjYW5uZWRBY3Rpb25zLm5leHQoYWN0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNvbXBsZXRlKCk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgU3RhdGVBY3Rpb25QYWlyPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+ID0ge1xuICBzdGF0ZTogVCB8IHVuZGVmaW5lZDtcbiAgYWN0aW9uPzogVjtcbn07XG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlU3RhdGU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gIHN0YXRlQWN0aW9uUGFpcjogU3RhdGVBY3Rpb25QYWlyPFQsIFY+ID0geyBzdGF0ZTogdW5kZWZpbmVkIH0sXG4gIFthY3Rpb24sIHJlZHVjZXJdOiBbViwgQWN0aW9uUmVkdWNlcjxULCBWPl1cbik6IFN0YXRlQWN0aW9uUGFpcjxULCBWPiB7XG4gIGNvbnN0IHsgc3RhdGUgfSA9IHN0YXRlQWN0aW9uUGFpcjtcbiAgcmV0dXJuIHsgc3RhdGU6IHJlZHVjZXIoc3RhdGUsIGFjdGlvbiksIGFjdGlvbiB9O1xufVxuXG5leHBvcnQgY29uc3QgU1RBVEVfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICBTdGF0ZSxcbiAgeyBwcm92aWRlOiBTdGF0ZU9ic2VydmFibGUsIHVzZUV4aXN0aW5nOiBTdGF0ZSB9LFxuXTtcbiJdfQ==