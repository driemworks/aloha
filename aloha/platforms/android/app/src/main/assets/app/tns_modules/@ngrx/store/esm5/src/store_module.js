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
import { NgModule, Inject, InjectionToken, Injector, } from '@angular/core';
import { combineReducers, createReducerFactory } from './utils';
import { INITIAL_STATE, INITIAL_REDUCERS, _INITIAL_REDUCERS, REDUCER_FACTORY, _REDUCER_FACTORY, STORE_FEATURES, _INITIAL_STATE, META_REDUCERS, _STORE_REDUCERS, FEATURE_REDUCERS, _FEATURE_REDUCERS, _FEATURE_REDUCERS_TOKEN, } from './tokens';
import { ACTIONS_SUBJECT_PROVIDERS, ActionsSubject } from './actions_subject';
import { REDUCER_MANAGER_PROVIDERS, ReducerManager, ReducerObservable, } from './reducer_manager';
import { SCANNED_ACTIONS_SUBJECT_PROVIDERS, ScannedActionsSubject, } from './scanned_actions_subject';
import { STATE_PROVIDERS } from './state';
import { STORE_PROVIDERS, Store } from './store';
var StoreRootModule = /** @class */ (function () {
    function StoreRootModule(actions$, reducer$, scannedActions$, store) {
    }
    StoreRootModule = __decorate([
        NgModule({}),
        __metadata("design:paramtypes", [ActionsSubject,
            ReducerObservable,
            ScannedActionsSubject,
            Store])
    ], StoreRootModule);
    return StoreRootModule;
}());
export { StoreRootModule };
var StoreFeatureModule = /** @class */ (function () {
    function StoreFeatureModule(features, featureReducers, reducerManager, root) {
        this.features = features;
        this.featureReducers = featureReducers;
        this.reducerManager = reducerManager;
        var feats = features.map(function (feature, index) {
            var featureReducerCollection = featureReducers.shift();
            var reducers = featureReducerCollection /*TODO(#823)*/[index];
            return __assign({}, feature, { reducers: reducers, initialState: _initialStateFactory(feature.initialState) });
        });
        reducerManager.addFeatures(feats);
    }
    StoreFeatureModule.prototype.ngOnDestroy = function () {
        this.reducerManager.removeFeatures(this.features);
    };
    StoreFeatureModule = __decorate([
        NgModule({}),
        __param(0, Inject(STORE_FEATURES)),
        __param(1, Inject(FEATURE_REDUCERS)),
        __metadata("design:paramtypes", [Array, Array, ReducerManager,
            StoreRootModule])
    ], StoreFeatureModule);
    return StoreFeatureModule;
}());
export { StoreFeatureModule };
var StoreModule = /** @class */ (function () {
    function StoreModule() {
    }
    StoreModule.forRoot = function (reducers, config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: StoreRootModule,
            providers: [
                { provide: _INITIAL_STATE, useValue: config.initialState },
                {
                    provide: INITIAL_STATE,
                    useFactory: _initialStateFactory,
                    deps: [_INITIAL_STATE],
                },
                { provide: _INITIAL_REDUCERS, useValue: reducers },
                {
                    provide: _STORE_REDUCERS,
                    useExisting: reducers instanceof InjectionToken ? reducers : _INITIAL_REDUCERS,
                },
                {
                    provide: INITIAL_REDUCERS,
                    deps: [Injector, _INITIAL_REDUCERS, [new Inject(_STORE_REDUCERS)]],
                    useFactory: _createStoreReducers,
                },
                {
                    provide: META_REDUCERS,
                    useValue: config.metaReducers ? config.metaReducers : [],
                },
                {
                    provide: _REDUCER_FACTORY,
                    useValue: config.reducerFactory
                        ? config.reducerFactory
                        : combineReducers,
                },
                {
                    provide: REDUCER_FACTORY,
                    deps: [_REDUCER_FACTORY, META_REDUCERS],
                    useFactory: createReducerFactory,
                },
                ACTIONS_SUBJECT_PROVIDERS,
                REDUCER_MANAGER_PROVIDERS,
                SCANNED_ACTIONS_SUBJECT_PROVIDERS,
                STATE_PROVIDERS,
                STORE_PROVIDERS,
            ],
        };
    };
    StoreModule.forFeature = function (featureName, reducers, config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: StoreFeatureModule,
            providers: [
                {
                    provide: STORE_FEATURES,
                    multi: true,
                    useValue: {
                        key: featureName,
                        reducerFactory: config.reducerFactory
                            ? config.reducerFactory
                            : combineReducers,
                        metaReducers: config.metaReducers ? config.metaReducers : [],
                        initialState: config.initialState,
                    },
                },
                { provide: _FEATURE_REDUCERS, multi: true, useValue: reducers },
                {
                    provide: _FEATURE_REDUCERS_TOKEN,
                    multi: true,
                    useExisting: reducers instanceof InjectionToken ? reducers : _FEATURE_REDUCERS,
                },
                {
                    provide: FEATURE_REDUCERS,
                    multi: true,
                    deps: [
                        Injector,
                        _FEATURE_REDUCERS,
                        [new Inject(_FEATURE_REDUCERS_TOKEN)],
                    ],
                    useFactory: _createFeatureReducers,
                },
            ],
        };
    };
    StoreModule = __decorate([
        NgModule({})
    ], StoreModule);
    return StoreModule;
}());
export { StoreModule };
export function _createStoreReducers(injector, reducers, tokenReducers) {
    return reducers instanceof InjectionToken ? injector.get(reducers) : reducers;
}
export function _createFeatureReducers(injector, reducerCollection, tokenReducerCollection) {
    var reducers = reducerCollection.map(function (reducer, index) {
        return reducer instanceof InjectionToken ? injector.get(reducer) : reducer;
    });
    return reducers;
}
export function _initialStateFactory(initialState) {
    if (typeof initialState === 'function') {
        return initialState();
    }
    return initialState;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvc3RvcmVfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBR04sY0FBYyxFQUNkLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQVV2QixPQUFPLEVBQVcsZUFBZSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3pFLE9BQU8sRUFDTCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxjQUFjLEVBQ2QsYUFBYSxFQUNiLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLHVCQUF1QixHQUN4QixNQUFNLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBQUUseUJBQXlCLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUUsT0FBTyxFQUNMLHlCQUF5QixFQUN6QixjQUFjLEVBQ2QsaUJBQWlCLEdBQ2xCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUNMLGlDQUFpQyxFQUNqQyxxQkFBcUIsR0FDdEIsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBR2pEO0lBQ0UseUJBQ0UsUUFBd0IsRUFDeEIsUUFBMkIsRUFDM0IsZUFBc0MsRUFDdEMsS0FBaUI7SUFDaEIsQ0FBQztJQU5PLGVBQWU7UUFEM0IsUUFBUSxDQUFDLEVBQUUsQ0FBQzt5Q0FHQyxjQUFjO1lBQ2QsaUJBQWlCO1lBQ1YscUJBQXFCO1lBQy9CLEtBQUs7T0FMSCxl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QkFBQztDQUFBLEFBN0dELElBNkdDO1NBN0dZLFdBQVc7QUErR3hCLE1BQU0sVUFBVSxvQkFBb0IsQ0FDbEMsUUFBa0IsRUFDbEIsUUFBb0MsRUFDcEMsYUFBeUM7SUFFekMsT0FBTyxRQUFRLFlBQVksY0FBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDaEYsQ0FBQztBQUVELE1BQU0sVUFBVSxzQkFBc0IsQ0FDcEMsUUFBa0IsRUFDbEIsaUJBQStDLEVBQy9DLHNCQUFvRDtJQUVwRCxJQUFNLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFPLEVBQUUsS0FBSztRQUNwRCxPQUFPLE9BQU8sWUFBWSxjQUFjLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUM3RSxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsWUFBaUI7SUFDcEQsSUFBSSxPQUFPLFlBQVksS0FBSyxVQUFVLEVBQUU7UUFDdEMsT0FBTyxZQUFZLEVBQUUsQ0FBQztLQUN2QjtJQUVELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBOZ01vZHVsZSxcbiAgSW5qZWN0LFxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICBPbkRlc3Ryb3ksXG4gIEluamVjdGlvblRva2VuLFxuICBJbmplY3Rvcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBY3Rpb24sXG4gIEFjdGlvblJlZHVjZXIsXG4gIEFjdGlvblJlZHVjZXJNYXAsXG4gIEFjdGlvblJlZHVjZXJGYWN0b3J5LFxuICBTdG9yZUZlYXR1cmUsXG4gIEluaXRpYWxTdGF0ZSxcbiAgTWV0YVJlZHVjZXIsXG59IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IGNvbXBvc2UsIGNvbWJpbmVSZWR1Y2VycywgY3JlYXRlUmVkdWNlckZhY3RvcnkgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7XG4gIElOSVRJQUxfU1RBVEUsXG4gIElOSVRJQUxfUkVEVUNFUlMsXG4gIF9JTklUSUFMX1JFRFVDRVJTLFxuICBSRURVQ0VSX0ZBQ1RPUlksXG4gIF9SRURVQ0VSX0ZBQ1RPUlksXG4gIFNUT1JFX0ZFQVRVUkVTLFxuICBfSU5JVElBTF9TVEFURSxcbiAgTUVUQV9SRURVQ0VSUyxcbiAgX1NUT1JFX1JFRFVDRVJTLFxuICBGRUFUVVJFX1JFRFVDRVJTLFxuICBfRkVBVFVSRV9SRURVQ0VSUyxcbiAgX0ZFQVRVUkVfUkVEVUNFUlNfVE9LRU4sXG59IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7IEFDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsIEFjdGlvbnNTdWJqZWN0IH0gZnJvbSAnLi9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHtcbiAgUkVEVUNFUl9NQU5BR0VSX1BST1ZJREVSUyxcbiAgUmVkdWNlck1hbmFnZXIsXG4gIFJlZHVjZXJPYnNlcnZhYmxlLFxufSBmcm9tICcuL3JlZHVjZXJfbWFuYWdlcic7XG5pbXBvcnQge1xuICBTQ0FOTkVEX0FDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsXG4gIFNjYW5uZWRBY3Rpb25zU3ViamVjdCxcbn0gZnJvbSAnLi9zY2FubmVkX2FjdGlvbnNfc3ViamVjdCc7XG5pbXBvcnQgeyBTVEFURV9QUk9WSURFUlMgfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IFNUT1JFX1BST1ZJREVSUywgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFN0b3JlUm9vdE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGFjdGlvbnMkOiBBY3Rpb25zU3ViamVjdCxcbiAgICByZWR1Y2VyJDogUmVkdWNlck9ic2VydmFibGUsXG4gICAgc2Nhbm5lZEFjdGlvbnMkOiBTY2FubmVkQWN0aW9uc1N1YmplY3QsXG4gICAgc3RvcmU6IFN0b3JlPGFueT5cbiAgKSB7fVxufVxuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU3RvcmVGZWF0dXJlTW9kdWxlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChTVE9SRV9GRUFUVVJFUykgcHJpdmF0ZSBmZWF0dXJlczogU3RvcmVGZWF0dXJlPGFueSwgYW55PltdLFxuICAgIEBJbmplY3QoRkVBVFVSRV9SRURVQ0VSUykgcHJpdmF0ZSBmZWF0dXJlUmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8YW55PltdLFxuICAgIHByaXZhdGUgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyLFxuICAgIHJvb3Q6IFN0b3JlUm9vdE1vZHVsZVxuICApIHtcbiAgICBjb25zdCBmZWF0cyA9IGZlYXR1cmVzLm1hcCgoZmVhdHVyZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGZlYXR1cmVSZWR1Y2VyQ29sbGVjdGlvbiA9IGZlYXR1cmVSZWR1Y2Vycy5zaGlmdCgpO1xuICAgICAgY29uc3QgcmVkdWNlcnMgPSBmZWF0dXJlUmVkdWNlckNvbGxlY3Rpb24gLypUT0RPKCM4MjMpKi8hW2luZGV4XTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZmVhdHVyZSxcbiAgICAgICAgcmVkdWNlcnMsXG4gICAgICAgIGluaXRpYWxTdGF0ZTogX2luaXRpYWxTdGF0ZUZhY3RvcnkoZmVhdHVyZS5pbml0aWFsU3RhdGUpLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJlZHVjZXJNYW5hZ2VyLmFkZEZlYXR1cmVzKGZlYXRzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVkdWNlck1hbmFnZXIucmVtb3ZlRmVhdHVyZXModGhpcy5mZWF0dXJlcyk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgU3RvcmVDb25maWc8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4gPSB7XG4gIGluaXRpYWxTdGF0ZT86IEluaXRpYWxTdGF0ZTxUPjtcbiAgcmVkdWNlckZhY3Rvcnk/OiBBY3Rpb25SZWR1Y2VyRmFjdG9yeTxULCBWPjtcbiAgbWV0YVJlZHVjZXJzPzogTWV0YVJlZHVjZXI8VCwgVj5bXTtcbn07XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTdG9yZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290PFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICAgIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlck1hcDxULCBWPj4sXG4gICAgY29uZmlnPzogU3RvcmVDb25maWc8VCwgVj5cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZVJvb3RNb2R1bGU+O1xuICBzdGF0aWMgZm9yUm9vdChcbiAgICByZWR1Y2VyczpcbiAgICAgIHwgQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5cbiAgICAgIHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT4+LFxuICAgIGNvbmZpZzogU3RvcmVDb25maWc8YW55LCBhbnk+ID0ge31cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZVJvb3RNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFN0b3JlUm9vdE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IF9JTklUSUFMX1NUQVRFLCB1c2VWYWx1ZTogY29uZmlnLmluaXRpYWxTdGF0ZSB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogSU5JVElBTF9TVEFURSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfaW5pdGlhbFN0YXRlRmFjdG9yeSxcbiAgICAgICAgICBkZXBzOiBbX0lOSVRJQUxfU1RBVEVdLFxuICAgICAgICB9LFxuICAgICAgICB7IHByb3ZpZGU6IF9JTklUSUFMX1JFRFVDRVJTLCB1c2VWYWx1ZTogcmVkdWNlcnMgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9TVE9SRV9SRURVQ0VSUyxcbiAgICAgICAgICB1c2VFeGlzdGluZzpcbiAgICAgICAgICAgIHJlZHVjZXJzIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyByZWR1Y2VycyA6IF9JTklUSUFMX1JFRFVDRVJTLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogSU5JVElBTF9SRURVQ0VSUyxcbiAgICAgICAgICBkZXBzOiBbSW5qZWN0b3IsIF9JTklUSUFMX1JFRFVDRVJTLCBbbmV3IEluamVjdChfU1RPUkVfUkVEVUNFUlMpXV0sXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NyZWF0ZVN0b3JlUmVkdWNlcnMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBNRVRBX1JFRFVDRVJTLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcubWV0YVJlZHVjZXJzID8gY29uZmlnLm1ldGFSZWR1Y2VycyA6IFtdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1JFRFVDRVJfRkFDVE9SWSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICA/IGNvbmZpZy5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgICAgOiBjb21iaW5lUmVkdWNlcnMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBSRURVQ0VSX0ZBQ1RPUlksXG4gICAgICAgICAgZGVwczogW19SRURVQ0VSX0ZBQ1RPUlksIE1FVEFfUkVEVUNFUlNdLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZVJlZHVjZXJGYWN0b3J5LFxuICAgICAgICB9LFxuICAgICAgICBBQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLFxuICAgICAgICBSRURVQ0VSX01BTkFHRVJfUFJPVklERVJTLFxuICAgICAgICBTQ0FOTkVEX0FDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsXG4gICAgICAgIFNUQVRFX1BST1ZJREVSUyxcbiAgICAgICAgU1RPUkVfUFJPVklERVJTLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZvckZlYXR1cmU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAgZmVhdHVyZU5hbWU6IHN0cmluZyxcbiAgICByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxULCBWPiB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8VCwgVj4+LFxuICAgIGNvbmZpZz86IFN0b3JlQ29uZmlnPFQsIFY+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVGZWF0dXJlTW9kdWxlPjtcbiAgc3RhdGljIGZvckZlYXR1cmU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAgZmVhdHVyZU5hbWU6IHN0cmluZyxcbiAgICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlcjxULCBWPj4sXG4gICAgY29uZmlnPzogU3RvcmVDb25maWc8VCwgVj5cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZUZlYXR1cmVNb2R1bGU+O1xuICBzdGF0aWMgZm9yRmVhdHVyZShcbiAgICBmZWF0dXJlTmFtZTogc3RyaW5nLFxuICAgIHJlZHVjZXJzOlxuICAgICAgfCBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PlxuICAgICAgfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55Pj5cbiAgICAgIHwgQWN0aW9uUmVkdWNlcjxhbnksIGFueT5cbiAgICAgIHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlcjxhbnksIGFueT4+LFxuICAgIGNvbmZpZzogU3RvcmVDb25maWc8YW55LCBhbnk+ID0ge31cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZUZlYXR1cmVNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFN0b3JlRmVhdHVyZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU1RPUkVfRkVBVFVSRVMsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgdXNlVmFsdWU6IDxTdG9yZUZlYXR1cmU8YW55LCBhbnk+PntcbiAgICAgICAgICAgIGtleTogZmVhdHVyZU5hbWUsXG4gICAgICAgICAgICByZWR1Y2VyRmFjdG9yeTogY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICAgID8gY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICAgIDogY29tYmluZVJlZHVjZXJzLFxuICAgICAgICAgICAgbWV0YVJlZHVjZXJzOiBjb25maWcubWV0YVJlZHVjZXJzID8gY29uZmlnLm1ldGFSZWR1Y2VycyA6IFtdLFxuICAgICAgICAgICAgaW5pdGlhbFN0YXRlOiBjb25maWcuaW5pdGlhbFN0YXRlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgcHJvdmlkZTogX0ZFQVRVUkVfUkVEVUNFUlMsIG11bHRpOiB0cnVlLCB1c2VWYWx1ZTogcmVkdWNlcnMgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9GRUFUVVJFX1JFRFVDRVJTX1RPS0VOLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZUV4aXN0aW5nOlxuICAgICAgICAgICAgcmVkdWNlcnMgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbiA/IHJlZHVjZXJzIDogX0ZFQVRVUkVfUkVEVUNFUlMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBGRUFUVVJFX1JFRFVDRVJTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIGRlcHM6IFtcbiAgICAgICAgICAgIEluamVjdG9yLFxuICAgICAgICAgICAgX0ZFQVRVUkVfUkVEVUNFUlMsXG4gICAgICAgICAgICBbbmV3IEluamVjdChfRkVBVFVSRV9SRURVQ0VSU19UT0tFTildLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NyZWF0ZUZlYXR1cmVSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZVN0b3JlUmVkdWNlcnMoXG4gIGluamVjdG9yOiBJbmplY3RvcixcbiAgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+LFxuICB0b2tlblJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PlxuKSB7XG4gIHJldHVybiByZWR1Y2VycyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuID8gaW5qZWN0b3IuZ2V0KHJlZHVjZXJzKSA6IHJlZHVjZXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUZlYXR1cmVSZWR1Y2VycyhcbiAgaW5qZWN0b3I6IEluamVjdG9yLFxuICByZWR1Y2VyQ29sbGVjdGlvbjogQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5bXSxcbiAgdG9rZW5SZWR1Y2VyQ29sbGVjdGlvbjogQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5bXVxuKSB7XG4gIGNvbnN0IHJlZHVjZXJzID0gcmVkdWNlckNvbGxlY3Rpb24ubWFwKChyZWR1Y2VyLCBpbmRleCkgPT4ge1xuICAgIHJldHVybiByZWR1Y2VyIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyBpbmplY3Rvci5nZXQocmVkdWNlcikgOiByZWR1Y2VyO1xuICB9KTtcblxuICByZXR1cm4gcmVkdWNlcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfaW5pdGlhbFN0YXRlRmFjdG9yeShpbml0aWFsU3RhdGU6IGFueSk6IGFueSB7XG4gIGlmICh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbn1cbiJdfQ==