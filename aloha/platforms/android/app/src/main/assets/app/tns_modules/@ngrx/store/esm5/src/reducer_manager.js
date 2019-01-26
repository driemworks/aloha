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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { BehaviorSubject, Observable } from 'rxjs';
import { ActionsSubject } from './actions_subject';
import { INITIAL_REDUCERS, INITIAL_STATE, REDUCER_FACTORY } from './tokens';
import { createFeatureReducerFactory, createReducerFactory, omit, } from './utils';
var ReducerObservable = /** @class */ (function (_super) {
    __extends(ReducerObservable, _super);
    function ReducerObservable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReducerObservable;
}(Observable));
export { ReducerObservable };
var ReducerManagerDispatcher = /** @class */ (function (_super) {
    __extends(ReducerManagerDispatcher, _super);
    function ReducerManagerDispatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReducerManagerDispatcher;
}(ActionsSubject));
export { ReducerManagerDispatcher };
export var UPDATE = '@ngrx/store/update-reducers';
var ReducerManager = /** @class */ (function (_super) {
    __extends(ReducerManager, _super);
    function ReducerManager(dispatcher, initialState, reducers, reducerFactory) {
        var _this = _super.call(this, reducerFactory(reducers, initialState)) || this;
        _this.dispatcher = dispatcher;
        _this.initialState = initialState;
        _this.reducers = reducers;
        _this.reducerFactory = reducerFactory;
        return _this;
    }
    ReducerManager.prototype.addFeature = function (feature) {
        this.addFeatures([feature]);
    };
    ReducerManager.prototype.addFeatures = function (features) {
        var reducers = features.reduce(function (reducerDict, _a) {
            var reducers = _a.reducers, reducerFactory = _a.reducerFactory, metaReducers = _a.metaReducers, initialState = _a.initialState, key = _a.key;
            var reducer = typeof reducers === 'function'
                ? createFeatureReducerFactory(metaReducers)(reducers, initialState)
                : createReducerFactory(reducerFactory, metaReducers)(reducers, initialState);
            reducerDict[key] = reducer;
            return reducerDict;
        }, {});
        this.addReducers(reducers);
    };
    ReducerManager.prototype.removeFeature = function (feature) {
        this.removeFeatures([feature]);
    };
    ReducerManager.prototype.removeFeatures = function (features) {
        this.removeReducers(features.map(function (p) { return p.key; }));
    };
    ReducerManager.prototype.addReducer = function (key, reducer) {
        var _a;
        this.addReducers((_a = {}, _a[key] = reducer, _a));
    };
    ReducerManager.prototype.addReducers = function (reducers) {
        this.reducers = __assign({}, this.reducers, reducers);
        this.updateReducers(Object.keys(reducers));
    };
    ReducerManager.prototype.removeReducer = function (featureKey) {
        this.removeReducers([featureKey]);
    };
    ReducerManager.prototype.removeReducers = function (featureKeys) {
        var _this = this;
        featureKeys.forEach(function (key) {
            _this.reducers = omit(_this.reducers, key) /*TODO(#823)*/;
        });
        this.updateReducers(featureKeys);
    };
    ReducerManager.prototype.updateReducers = function (featureKeys) {
        this.next(this.reducerFactory(this.reducers, this.initialState));
        this.dispatcher.next({
            type: UPDATE,
            features: featureKeys,
        });
    };
    ReducerManager.prototype.ngOnDestroy = function () {
        this.complete();
    };
    ReducerManager = __decorate([
        Injectable(),
        __param(1, Inject(INITIAL_STATE)),
        __param(2, Inject(INITIAL_REDUCERS)),
        __param(3, Inject(REDUCER_FACTORY)),
        __metadata("design:paramtypes", [ReducerManagerDispatcher, Object, Object, Function])
    ], ReducerManager);
    return ReducerManager;
}(BehaviorSubject));
export { ReducerManager };
export var REDUCER_MANAGER_PROVIDERS = [
    ReducerManager,
    { provide: ReducerObservable, useExisting: ReducerManager },
    { provide: ReducerManagerDispatcher, useExisting: ActionsSubject },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFRbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDNUUsT0FBTyxFQUNMLDJCQUEyQixFQUMzQixvQkFBb0IsRUFDcEIsSUFBSSxHQUNMLE1BQU0sU0FBUyxDQUFDO0FBRWpCO0lBQWdELHFDQUUvQztJQUZEOztJQUVHLENBQUM7SUFBRCx3QkFBQztBQUFELENBQUMsQUFGSixDQUFnRCxVQUFVLEdBRXREOztBQUNKO0lBQXVELDRDQUFjO0lBQXJFOztJQUF1RSxDQUFDO0lBQUQsK0JBQUM7QUFBRCxDQUFDLEFBQXhFLENBQXVELGNBQWMsR0FBRzs7QUFDeEUsTUFBTSxDQUFDLElBQU0sTUFBTSxHQUFHLDZCQUE4RCxDQUFDO0FBR3JGO0lBQW9DLGtDQUF3QztJQUUxRSx3QkFDVSxVQUFvQyxFQUNiLFlBQWlCLEVBQ2QsUUFBb0MsRUFFOUQsY0FBOEM7UUFMeEQsWUFPRSxrQkFBTSxjQUFjLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDLFNBQzlDO1FBUFMsZ0JBQVUsR0FBVixVQUFVLENBQTBCO1FBQ2Isa0JBQVksR0FBWixZQUFZLENBQUs7UUFDZCxjQUFRLEdBQVIsUUFBUSxDQUE0QjtRQUU5RCxvQkFBYyxHQUFkLGNBQWMs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TUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO3lDQUhKLHdCQUF3QjtPQUhuQyxjQUFjLENBOEUxQjtJQUFELHFCQUFDO0NBQUEsQUE5RUQsQ0FBb0MsZUFBZSxHQThFbEQ7U0E5RVksY0FBYztBQWdGM0IsTUFBTSxDQUFDLElBQU0seUJBQXlCLEdBQWU7SUFDbkQsY0FBYztJQUNkLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUU7SUFDM0QsRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRTtDQUNuRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgQWN0aW9uc1N1YmplY3QgfSBmcm9tICcuL2FjdGlvbnNfc3ViamVjdCc7XHJcbmltcG9ydCB7XHJcbiAgQWN0aW9uLFxyXG4gIEFjdGlvblJlZHVjZXIsXHJcbiAgQWN0aW9uUmVkdWNlckZhY3RvcnksXHJcbiAgQWN0aW9uUmVkdWNlck1hcCxcclxuICBTdG9yZUZlYXR1cmUsXHJcbn0gZnJvbSAnLi9tb2RlbHMnO1xyXG5pbXBvcnQgeyBJTklUSUFMX1JFRFVDRVJTLCBJTklUSUFMX1NUQVRFLCBSRURVQ0VSX0ZBQ1RPUlkgfSBmcm9tICcuL3Rva2Vucyc7XHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlRmVhdHVyZVJlZHVjZXJGYWN0b3J5LFxyXG4gIGNyZWF0ZVJlZHVjZXJGYWN0b3J5LFxyXG4gIG9taXQsXHJcbn0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVkdWNlck9ic2VydmFibGUgZXh0ZW5kcyBPYnNlcnZhYmxlPFxyXG4gIEFjdGlvblJlZHVjZXI8YW55LCBhbnk+XHJcbj4ge31cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlZHVjZXJNYW5hZ2VyRGlzcGF0Y2hlciBleHRlbmRzIEFjdGlvbnNTdWJqZWN0IHt9XHJcbmV4cG9ydCBjb25zdCBVUERBVEUgPSAnQG5ncngvc3RvcmUvdXBkYXRlLXJlZHVjZXJzJyBhcyAnQG5ncngvc3RvcmUvdXBkYXRlLXJlZHVjZXJzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlZHVjZXJNYW5hZ2VyIGV4dGVuZHMgQmVoYXZpb3JTdWJqZWN0PEFjdGlvblJlZHVjZXI8YW55LCBhbnk+PlxyXG4gIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZGlzcGF0Y2hlcjogUmVkdWNlck1hbmFnZXJEaXNwYXRjaGVyLFxyXG4gICAgQEluamVjdChJTklUSUFMX1NUQVRFKSBwcml2YXRlIGluaXRpYWxTdGF0ZTogYW55LFxyXG4gICAgQEluamVjdChJTklUSUFMX1JFRFVDRVJTKSBwcml2YXRlIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PixcclxuICAgIEBJbmplY3QoUkVEVUNFUl9GQUNUT1JZKVxyXG4gICAgcHJpdmF0ZSByZWR1Y2VyRmFjdG9yeTogQWN0aW9uUmVkdWNlckZhY3Rvcnk8YW55LCBhbnk+XHJcbiAgKSB7XHJcbiAgICBzdXBlcihyZWR1Y2VyRmFjdG9yeShyZWR1Y2VycywgaW5pdGlhbFN0YXRlKSk7XHJcbiAgfVxyXG5cclxuICBhZGRGZWF0dXJlKGZlYXR1cmU6IFN0b3JlRmVhdHVyZTxhbnksIGFueT4pIHtcclxuICAgIHRoaXMuYWRkRmVhdHVyZXMoW2ZlYXR1cmVdKTtcclxuICB9XHJcblxyXG4gIGFkZEZlYXR1cmVzKGZlYXR1cmVzOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+W10pIHtcclxuICAgIGNvbnN0IHJlZHVjZXJzID0gZmVhdHVyZXMucmVkdWNlKFxyXG4gICAgICAoXHJcbiAgICAgICAgcmVkdWNlckRpY3QsXHJcbiAgICAgICAgeyByZWR1Y2VycywgcmVkdWNlckZhY3RvcnksIG1ldGFSZWR1Y2VycywgaW5pdGlhbFN0YXRlLCBrZXkgfVxyXG4gICAgICApID0+IHtcclxuICAgICAgICBjb25zdCByZWR1Y2VyID1cclxuICAgICAgICAgIHR5cGVvZiByZWR1Y2VycyA9PT0gJ2Z1bmN0aW9uJ1xyXG4gICAgICAgICAgICA/IGNyZWF0ZUZlYXR1cmVSZWR1Y2VyRmFjdG9yeShtZXRhUmVkdWNlcnMpKHJlZHVjZXJzLCBpbml0aWFsU3RhdGUpXHJcbiAgICAgICAgICAgIDogY3JlYXRlUmVkdWNlckZhY3RvcnkocmVkdWNlckZhY3RvcnksIG1ldGFSZWR1Y2VycykoXHJcbiAgICAgICAgICAgICAgICByZWR1Y2VycyxcclxuICAgICAgICAgICAgICAgIGluaXRpYWxTdGF0ZVxyXG4gICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHJlZHVjZXJEaWN0W2tleV0gPSByZWR1Y2VyO1xyXG4gICAgICAgIHJldHVybiByZWR1Y2VyRGljdDtcclxuICAgICAgfSxcclxuICAgICAge30gYXMgeyBba2V5OiBzdHJpbmddOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PiB9XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuYWRkUmVkdWNlcnMocmVkdWNlcnMpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRmVhdHVyZShmZWF0dXJlOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+KSB7XHJcbiAgICB0aGlzLnJlbW92ZUZlYXR1cmVzKFtmZWF0dXJlXSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGZWF0dXJlcyhmZWF0dXJlczogU3RvcmVGZWF0dXJlPGFueSwgYW55PltdKSB7XHJcbiAgICB0aGlzLnJlbW92ZVJlZHVjZXJzKGZlYXR1cmVzLm1hcChwID0+IHAua2V5KSk7XHJcbiAgfVxyXG5cclxuICBhZGRSZWR1Y2VyKGtleTogc3RyaW5nLCByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55Pikge1xyXG4gICAgdGhpcy5hZGRSZWR1Y2Vycyh7IFtrZXldOiByZWR1Y2VyIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkUmVkdWNlcnMocmVkdWNlcnM6IHsgW2tleTogc3RyaW5nXTogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4gfSkge1xyXG4gICAgdGhpcy5yZWR1Y2VycyA9IHsgLi4udGhpcy5yZWR1Y2VycywgLi4ucmVkdWNlcnMgfTtcclxuICAgIHRoaXMudXBkYXRlUmVkdWNlcnMoT2JqZWN0LmtleXMocmVkdWNlcnMpKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZVJlZHVjZXIoZmVhdHVyZUtleTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnJlbW92ZVJlZHVjZXJzKFtmZWF0dXJlS2V5XSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVSZWR1Y2VycyhmZWF0dXJlS2V5czogc3RyaW5nW10pIHtcclxuICAgIGZlYXR1cmVLZXlzLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgdGhpcy5yZWR1Y2VycyA9IG9taXQodGhpcy5yZWR1Y2Vycywga2V5KSAvKlRPRE8oIzgyMykqLyBhcyBhbnk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMudXBkYXRlUmVkdWNlcnMoZmVhdHVyZUtleXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVSZWR1Y2VycyhmZWF0dXJlS2V5czogc3RyaW5nW10pIHtcclxuICAgIHRoaXMubmV4dCh0aGlzLnJlZHVjZXJGYWN0b3J5KHRoaXMucmVkdWNlcnMsIHRoaXMuaW5pdGlhbFN0YXRlKSk7XHJcbiAgICB0aGlzLmRpc3BhdGNoZXIubmV4dCg8QWN0aW9uPntcclxuICAgICAgdHlwZTogVVBEQVRFLFxyXG4gICAgICBmZWF0dXJlczogZmVhdHVyZUtleXMsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5jb21wbGV0ZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJFRFVDRVJfTUFOQUdFUl9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXHJcbiAgUmVkdWNlck1hbmFnZXIsXHJcbiAgeyBwcm92aWRlOiBSZWR1Y2VyT2JzZXJ2YWJsZSwgdXNlRXhpc3Rpbmc6IFJlZHVjZXJNYW5hZ2VyIH0sXHJcbiAgeyBwcm92aWRlOiBSZWR1Y2VyTWFuYWdlckRpc3BhdGNoZXIsIHVzZUV4aXN0aW5nOiBBY3Rpb25zU3ViamVjdCB9LFxyXG5dO1xyXG4iXX0=