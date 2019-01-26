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
import { Inject, Injectable } from '@angular/core';
import { ActionsSubject, INITIAL_STATE, ReducerManager, Store, } from '@ngrx/store';
import { MockState } from './mock_state';
var MockStore = /** @class */ (function (_super) {
    __extends(MockStore, _super);
    function MockStore(state$, actionsObserver, reducerManager, initialState) {
        var _this = _super.call(this, state$, actionsObserver, reducerManager) || this;
        _this.state$ = state$;
        _this.initialState = initialState;
        _this.state$.next(_this.initialState);
        _this.scannedActions$ = actionsObserver.asObservable();
        return _this;
    }
    MockStore.prototype.setState = function (nextState) {
        this.state$.next(nextState);
    };
    MockStore.prototype.addReducer = function () {
        /* noop */
    };
    MockStore.prototype.removeReducer = function () {
        /* noop */
    };
    MockStore = __decorate([
        Injectable(),
        __param(3, Inject(INITIAL_STATE)),
        __metadata("design:paramtypes", [MockState,
            ActionsSubject,
            ReducerManager, Object])
    ], MockStore);
    return MockStore;
}(Store));
export { MockStore };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUVMLGNBQWMsRUFDZCxhQUFhLEVBQ2IsY0FBYyxFQUNkLEtBQUssR0FDTixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBR3pDO0lBQWtDLDZCQUFRO0lBR3hDLG1CQUNVLE1BQW9CLEVBQzVCLGVBQStCLEVBQy9CLGNBQThCLEVBQ0MsWUFBZTtRQUpoRCxZQU1FLGtCQUFNLE1BQU0sRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFDLFNBRy9DO1FBUlMsWUFBTSxHQUFOLE1BQU0sQ0FBYztRQUdHLGtCQUFZLEdBQVosWUFBWSxDQUFHO1FBRzlDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwQyxLQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7SUFDeEQsQ0FBQztJQUVELDRCQUFRLEdBQVIsVUFBUyxTQUFZO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCw4QkFBVSxHQUFWO1FBQ0UsVUFBVTtJQUNaLENBQUM7SUFFRCxpQ0FBYSxHQUFiO1FBQ0UsVUFBVTtJQUNaLENBQUM7SUF4QlUsU0FBUztRQURyQixVQUFVLEVBQUU7UUFRUixXQUFBLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQTt5Q0FITixTQUFTO1lBQ1IsY0FBYztZQUNmLGNBQWM7T0FOckIsU0FBUyxDQXlCckI7SUFBRCxnQkFBQztDQUFBLEFBekJELENBQWtDLEtBQUssR0F5QnRDO1NBekJZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQWN0aW9uLFxuICBBY3Rpb25zU3ViamVjdCxcbiAgSU5JVElBTF9TVEFURSxcbiAgUmVkdWNlck1hbmFnZXIsXG4gIFN0b3JlLFxufSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBNb2NrU3RhdGUgfSBmcm9tICcuL21vY2tfc3RhdGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja1N0b3JlPFQ+IGV4dGVuZHMgU3RvcmU8VD4ge1xuICBwdWJsaWMgc2Nhbm5lZEFjdGlvbnMkOiBPYnNlcnZhYmxlPEFjdGlvbj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzdGF0ZSQ6IE1vY2tTdGF0ZTxUPixcbiAgICBhY3Rpb25zT2JzZXJ2ZXI6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHJlZHVjZXJNYW5hZ2VyOiBSZWR1Y2VyTWFuYWdlcixcbiAgICBASW5qZWN0KElOSVRJQUxfU1RBVEUpIHByaXZhdGUgaW5pdGlhbFN0YXRlOiBUXG4gICkge1xuICAgIHN1cGVyKHN0YXRlJCwgYWN0aW9uc09ic2VydmVyLCByZWR1Y2VyTWFuYWdlcik7XG4gICAgdGhpcy5zdGF0ZSQubmV4dCh0aGlzLmluaXRpYWxTdGF0ZSk7XG4gICAgdGhpcy5zY2FubmVkQWN0aW9ucyQgPSBhY3Rpb25zT2JzZXJ2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBzZXRTdGF0ZShuZXh0U3RhdGU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlJC5uZXh0KG5leHRTdGF0ZSk7XG4gIH1cblxuICBhZGRSZWR1Y2VyKCkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxuXG4gIHJlbW92ZVJlZHVjZXIoKSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG59XG4iXX0=