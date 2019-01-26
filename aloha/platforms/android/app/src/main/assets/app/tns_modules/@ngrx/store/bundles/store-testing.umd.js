/**
 * @license NgRx 7.0.0
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@ngrx/store')) :
    typeof define === 'function' && define.amd ? define('@ngrx/store/testing', ['exports', '@angular/core', 'rxjs', '@ngrx/store'], factory) :
    (factory((global.ngrx = global.ngrx || {}, global.ngrx.store = global.ngrx.store || {}, global.ngrx.store.testing = {}),global.ng.core,global.rxjs,global['@ngrx/store']));
}(this, (function (exports,core,rxjs,store) { 'use strict';

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MockState = /** @class */ (function (_super) {
        __extends(MockState, _super);
        function MockState() {
            return _super.call(this, {}) || this;
        }
        MockState = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [])
        ], MockState);
        return MockState;
    }(rxjs.BehaviorSubject));

    var __extends$1 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var MockStore = /** @class */ (function (_super) {
        __extends$1(MockStore, _super);
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
        MockStore = __decorate$1([
            core.Injectable(),
            __param(3, core.Inject(store.INITIAL_STATE)),
            __metadata$1("design:paramtypes", [MockState,
                store.ActionsSubject,
                store.ReducerManager, Object])
        ], MockStore);
        return MockStore;
    }(store.Store));

    var __extends$2 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MockReducerManager = /** @class */ (function (_super) {
        __extends$2(MockReducerManager, _super);
        function MockReducerManager() {
            return _super.call(this, function () { return undefined; }) || this;
        }
        MockReducerManager = __decorate$2([
            core.Injectable(),
            __metadata$2("design:paramtypes", [])
        ], MockReducerManager);
        return MockReducerManager;
    }(rxjs.BehaviorSubject));

    function provideMockStore(config) {
        if (config === void 0) { config = {}; }
        return [
            store.ActionsSubject,
            MockState,
            { provide: store.INITIAL_STATE, useValue: config.initialState },
            { provide: store.StateObservable, useClass: MockState },
            { provide: store.ReducerManager, useClass: MockReducerManager },
            { provide: store.Store, useClass: MockStore },
        ];
    }

    /**
     * Generated bundle index. Do not edit.
     */

    exports.provideMockStore = provideMockStore;
    exports.MockReducerManager = MockReducerManager;
    exports.MockState = MockState;
    exports.MockStore = MockStore;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=store-testing.umd.js.map
