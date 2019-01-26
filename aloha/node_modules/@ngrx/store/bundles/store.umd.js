/**
 * @license NgRx 7.0.0
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ngrx/store', ['exports', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global.ngrx = global.ngrx || {}, global.ngrx.store = {}),global.ng.core,global.rxjs,global.rxjs.operators));
}(this, (function (exports,core,rxjs,operators) { 'use strict';

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
    var INIT = '@ngrx/store/init';
    var ActionsSubject = /** @class */ (function (_super) {
        __extends(ActionsSubject, _super);
        function ActionsSubject() {
            return _super.call(this, { type: INIT }) || this;
        }
        ActionsSubject.prototype.next = function (action) {
            if (typeof action === 'undefined') {
                throw new TypeError("Actions must be objects");
            }
            else if (typeof action.type === 'undefined') {
                throw new TypeError("Actions must have a type property");
            }
            _super.prototype.next.call(this, action);
        };
        ActionsSubject.prototype.complete = function () {
            /* noop */
        };
        ActionsSubject.prototype.ngOnDestroy = function () {
            _super.prototype.complete.call(this);
        };
        ActionsSubject = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [])
        ], ActionsSubject);
        return ActionsSubject;
    }(rxjs.BehaviorSubject));
    var ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];

    var _INITIAL_STATE = new core.InjectionToken('@ngrx/store Internal Initial State');
    var INITIAL_STATE = new core.InjectionToken('@ngrx/store Initial State');
    var REDUCER_FACTORY = new core.InjectionToken('@ngrx/store Reducer Factory');
    var _REDUCER_FACTORY = new core.InjectionToken('@ngrx/store Reducer Factory Provider');
    var INITIAL_REDUCERS = new core.InjectionToken('@ngrx/store Initial Reducers');
    var _INITIAL_REDUCERS = new core.InjectionToken('@ngrx/store Internal Initial Reducers');
    var META_REDUCERS = new core.InjectionToken('@ngrx/store Meta Reducers');
    var STORE_FEATURES = new core.InjectionToken('@ngrx/store Store Features');
    var _STORE_REDUCERS = new core.InjectionToken('@ngrx/store Internal Store Reducers');
    var _FEATURE_REDUCERS = new core.InjectionToken('@ngrx/store Internal Feature Reducers');
    var _FEATURE_REDUCERS_TOKEN = new core.InjectionToken('@ngrx/store Internal Feature Reducers Token');
    var FEATURE_REDUCERS = new core.InjectionToken('@ngrx/store Feature Reducers');

    var __read = (undefined && undefined.__read) || function (o, n) {
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
    var __spread = (undefined && undefined.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    function combineReducers(reducers, initialState) {
        if (initialState === void 0) { initialState = {}; }
        var reducerKeys = Object.keys(reducers);
        var finalReducers = {};
        for (var i = 0; i < reducerKeys.length; i++) {
            var key = reducerKeys[i];
            if (typeof reducers[key] === 'function') {
                finalReducers[key] = reducers[key];
            }
        }
        var finalReducerKeys = Object.keys(finalReducers);
        return function combination(state, action) {
            state = state === undefined ? initialState : state;
            var hasChanged = false;
            var nextState = {};
            for (var i = 0; i < finalReducerKeys.length; i++) {
                var key = finalReducerKeys[i];
                var reducer = finalReducers[key];
                var previousStateForKey = state[key];
                var nextStateForKey = reducer(previousStateForKey, action);
                nextState[key] = nextStateForKey;
                hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
            }
            return hasChanged ? nextState : state;
        };
    }
    function omit(object, keyToRemove) {
        return Object.keys(object)
            .filter(function (key) { return key !== keyToRemove; })
            .reduce(function (result, key) {
            var _a;
            return Object.assign(result, (_a = {}, _a[key] = object[key], _a));
        }, {});
    }
    function compose() {
        var functions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            functions[_i] = arguments[_i];
        }
        return function (arg) {
            if (functions.length === 0) {
                return arg;
            }
            var last = functions[functions.length - 1];
            var rest = functions.slice(0, -1);
            return rest.reduceRight(function (composed, fn) { return fn(composed); }, last(arg));
        };
    }
    function createReducerFactory(reducerFactory, metaReducers) {
        if (Array.isArray(metaReducers) && metaReducers.length > 0) {
            return compose.apply(null, __spread(metaReducers, [reducerFactory]));
        }
        return reducerFactory;
    }
    function createFeatureReducerFactory(metaReducers) {
        var reducerFactory = Array.isArray(metaReducers) && metaReducers.length > 0
            ? compose.apply(void 0, __spread(metaReducers)) : function (r) { return r; };
        return function (reducer, initialState) {
            reducer = reducerFactory(reducer);
            return function (state, action) {
                state = state === undefined ? initialState : state;
                return reducer(state, action);
            };
        };
    }

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
    var __assign = (undefined && undefined.__assign) || function () {
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
    var ReducerObservable = /** @class */ (function (_super) {
        __extends$1(ReducerObservable, _super);
        function ReducerObservable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ReducerObservable;
    }(rxjs.Observable));
    var ReducerManagerDispatcher = /** @class */ (function (_super) {
        __extends$1(ReducerManagerDispatcher, _super);
        function ReducerManagerDispatcher() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ReducerManagerDispatcher;
    }(ActionsSubject));
    var UPDATE = '@ngrx/store/update-reducers';
    var ReducerManager = /** @class */ (function (_super) {
        __extends$1(ReducerManager, _super);
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
        ReducerManager = __decorate$1([
            core.Injectable(),
            __param(1, core.Inject(INITIAL_STATE)),
            __param(2, core.Inject(INITIAL_REDUCERS)),
            __param(3, core.Inject(REDUCER_FACTORY)),
            __metadata$1("design:paramtypes", [ReducerManagerDispatcher, Object, Object, Function])
        ], ReducerManager);
        return ReducerManager;
    }(rxjs.BehaviorSubject));
    var REDUCER_MANAGER_PROVIDERS = [
        ReducerManager,
        { provide: ReducerObservable, useExisting: ReducerManager },
        { provide: ReducerManagerDispatcher, useExisting: ActionsSubject },
    ];

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
    var ScannedActionsSubject = /** @class */ (function (_super) {
        __extends$2(ScannedActionsSubject, _super);
        function ScannedActionsSubject() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScannedActionsSubject.prototype.ngOnDestroy = function () {
            this.complete();
        };
        ScannedActionsSubject = __decorate$2([
            core.Injectable()
        ], ScannedActionsSubject);
        return ScannedActionsSubject;
    }(rxjs.Subject));
    var SCANNED_ACTIONS_SUBJECT_PROVIDERS = [
        ScannedActionsSubject,
    ];

    var __extends$3 = (undefined && undefined.__extends) || (function () {
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
    var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param$1 = (undefined && undefined.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var __read$1 = (undefined && undefined.__read) || function (o, n) {
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
    var StateObservable = /** @class */ (function (_super) {
        __extends$3(StateObservable, _super);
        function StateObservable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StateObservable;
    }(rxjs.Observable));
    var State = /** @class */ (function (_super) {
        __extends$3(State, _super);
        function State(actions$, reducer$, scannedActions, initialState) {
            var _this = _super.call(this, initialState) || this;
            var actionsOnQueue$ = actions$.pipe(operators.observeOn(rxjs.queueScheduler));
            var withLatestReducer$ = actionsOnQueue$.pipe(operators.withLatestFrom(reducer$));
            var seed = { state: initialState };
            var stateAndAction$ = withLatestReducer$.pipe(operators.scan(reduceState, seed));
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
        State = __decorate$3([
            core.Injectable(),
            __param$1(3, core.Inject(INITIAL_STATE)),
            __metadata$2("design:paramtypes", [ActionsSubject,
                ReducerObservable,
                ScannedActionsSubject, Object])
        ], State);
        return State;
    }(rxjs.BehaviorSubject));
    function reduceState(stateActionPair, _a) {
        if (stateActionPair === void 0) { stateActionPair = { state: undefined }; }
        var _b = __read$1(_a, 2), action = _b[0], reducer = _b[1];
        var state = stateActionPair.state;
        return { state: reducer(state, action), action: action };
    }
    var STATE_PROVIDERS = [
        State,
        { provide: StateObservable, useExisting: State },
    ];

    var __extends$4 = (undefined && undefined.__extends) || (function () {
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
    var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$3 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __read$2 = (undefined && undefined.__read) || function (o, n) {
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
    var __spread$1 = (undefined && undefined.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$2(arguments[i]));
        return ar;
    };
    var Store = /** @class */ (function (_super) {
        __extends$4(Store, _super);
        function Store(state$, actionsObserver, reducerManager) {
            var _this = _super.call(this) || this;
            _this.actionsObserver = actionsObserver;
            _this.reducerManager = reducerManager;
            _this.source = state$;
            return _this;
        }
        Store_1 = Store;
        Store.prototype.select = function (pathOrMapFn) {
            var paths = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                paths[_i - 1] = arguments[_i];
            }
            return select.call.apply(select, __spread$1([null, pathOrMapFn], paths))(this);
        };
        Store.prototype.lift = function (operator) {
            var store = new Store_1(this, this.actionsObserver, this.reducerManager);
            store.operator = operator;
            return store;
        };
        Store.prototype.dispatch = function (action) {
            this.actionsObserver.next(action);
        };
        Store.prototype.next = function (action) {
            this.actionsObserver.next(action);
        };
        Store.prototype.error = function (err) {
            this.actionsObserver.error(err);
        };
        Store.prototype.complete = function () {
            this.actionsObserver.complete();
        };
        Store.prototype.addReducer = function (key, reducer) {
            this.reducerManager.addReducer(key, reducer);
        };
        Store.prototype.removeReducer = function (key) {
            this.reducerManager.removeReducer(key);
        };
        var Store_1;
        Store = Store_1 = __decorate$4([
            core.Injectable(),
            __metadata$3("design:paramtypes", [StateObservable,
                ActionsSubject,
                ReducerManager])
        ], Store);
        return Store;
    }(rxjs.Observable));
    var STORE_PROVIDERS = [Store];
    function select(pathOrMapFn, propsOrPath) {
        var paths = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            paths[_i - 2] = arguments[_i];
        }
        return function selectOperator(source$) {
            var mapped$;
            if (typeof pathOrMapFn === 'string') {
                var pathSlices = __spread$1([propsOrPath], paths).filter(Boolean);
                mapped$ = source$.pipe(operators.pluck.apply(void 0, __spread$1([pathOrMapFn], pathSlices)));
            }
            else if (typeof pathOrMapFn === 'function') {
                mapped$ = source$.pipe(operators.map(function (source) { return pathOrMapFn(source, propsOrPath); }));
            }
            else {
                throw new TypeError("Unexpected type '" + typeof pathOrMapFn + "' in select operator," +
                    " expected 'string' or 'function'");
            }
            return mapped$.pipe(operators.distinctUntilChanged());
        };
    }

    var __read$3 = (undefined && undefined.__read) || function (o, n) {
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
    var __spread$2 = (undefined && undefined.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$3(arguments[i]));
        return ar;
    };
    function isEqualCheck(a, b) {
        return a === b;
    }
    function isArgumentsChanged(args, lastArguments, comparator) {
        for (var i = 0; i < args.length; i++) {
            if (!comparator(args[i], lastArguments[i])) {
                return true;
            }
        }
        return false;
    }
    function resultMemoize(projectionFn, isResultEqual) {
        return defaultMemoize(projectionFn, isEqualCheck, isResultEqual);
    }
    function defaultMemoize(projectionFn, isArgumentsEqual, isResultEqual) {
        if (isArgumentsEqual === void 0) { isArgumentsEqual = isEqualCheck; }
        if (isResultEqual === void 0) { isResultEqual = isEqualCheck; }
        var lastArguments = null;
        // tslint:disable-next-line:no-any anything could be the result.
        var lastResult = null;
        function reset() {
            lastArguments = null;
            lastResult = null;
        }
        // tslint:disable-next-line:no-any anything could be the result.
        function memoized() {
            if (!lastArguments) {
                lastResult = projectionFn.apply(null, arguments);
                lastArguments = arguments;
                return lastResult;
            }
            if (!isArgumentsChanged(arguments, lastArguments, isArgumentsEqual)) {
                return lastResult;
            }
            lastArguments = arguments;
            var newResult = projectionFn.apply(null, arguments);
            if (isResultEqual(lastResult, newResult)) {
                return lastResult;
            }
            lastResult = newResult;
            return newResult;
        }
        return { memoized: memoized, reset: reset };
    }
    function createSelector() {
        var input = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            input[_i] = arguments[_i];
        }
        return createSelectorFactory(defaultMemoize).apply(void 0, __spread$2(input));
    }
    function defaultStateFn(state, selectors, props, memoizedProjector) {
        if (props === undefined) {
            var args_1 = selectors.map(function (fn) { return fn(state); });
            return memoizedProjector.memoized.apply(null, args_1);
        }
        var args = selectors.map(function (fn) {
            return fn(state, props);
        });
        return memoizedProjector.memoized.apply(null, __spread$2(args, [props]));
    }
    function createSelectorFactory(memoize, options) {
        if (options === void 0) { options = {
            stateFn: defaultStateFn,
        }; }
        return function () {
            var input = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                input[_i] = arguments[_i];
            }
            var args = input;
            if (Array.isArray(args[0])) {
                var _a = __read$3(args), head = _a[0], tail = _a.slice(1);
                args = __spread$2(head, tail);
            }
            var selectors = args.slice(0, args.length - 1);
            var projector = args[args.length - 1];
            var memoizedSelectors = selectors.filter(function (selector) {
                return selector.release && typeof selector.release === 'function';
            });
            var memoizedProjector = memoize(function () {
                var selectors = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    selectors[_i] = arguments[_i];
                }
                return projector.apply(null, selectors);
            });
            var memoizedState = defaultMemoize(function (state, props) {
                // createSelector works directly on state
                // e.g. createSelector((state, props) => ...)
                if (selectors.length === 0) {
                    return projector.apply(null, [state, props]);
                }
                return options.stateFn.apply(null, [
                    state,
                    selectors,
                    props,
                    memoizedProjector,
                ]);
            });
            function release() {
                memoizedState.reset();
                memoizedProjector.reset();
                memoizedSelectors.forEach(function (selector) { return selector.release(); });
            }
            return Object.assign(memoizedState.memoized, {
                release: release,
                projector: memoizedProjector.memoized,
            });
        };
    }
    function createFeatureSelector(featureName) {
        return createSelector(function (state) { return state[featureName]; }, function (featureState) { return featureState; });
    }

    var __assign$1 = (undefined && undefined.__assign) || function () {
        __assign$1 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$1.apply(this, arguments);
    };
    var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$4 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param$2 = (undefined && undefined.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var StoreRootModule = /** @class */ (function () {
        function StoreRootModule(actions$, reducer$, scannedActions$, store) {
        }
        StoreRootModule = __decorate$5([
            core.NgModule({}),
            __metadata$4("design:paramtypes", [ActionsSubject,
                ReducerObservable,
                ScannedActionsSubject,
                Store])
        ], StoreRootModule);
        return StoreRootModule;
    }());
    var StoreFeatureModule = /** @class */ (function () {
        function StoreFeatureModule(features, featureReducers, reducerManager, root) {
            this.features = features;
            this.featureReducers = featureReducers;
            this.reducerManager = reducerManager;
            var feats = features.map(function (feature, index) {
                var featureReducerCollection = featureReducers.shift();
                var reducers = featureReducerCollection /*TODO(#823)*/[index];
                return __assign$1({}, feature, { reducers: reducers, initialState: _initialStateFactory(feature.initialState) });
            });
            reducerManager.addFeatures(feats);
        }
        StoreFeatureModule.prototype.ngOnDestroy = function () {
            this.reducerManager.removeFeatures(this.features);
        };
        StoreFeatureModule = __decorate$5([
            core.NgModule({}),
            __param$2(0, core.Inject(STORE_FEATURES)),
            __param$2(1, core.Inject(FEATURE_REDUCERS)),
            __metadata$4("design:paramtypes", [Array, Array, ReducerManager,
                StoreRootModule])
        ], StoreFeatureModule);
        return StoreFeatureModule;
    }());
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
                        useExisting: reducers instanceof core.InjectionToken ? reducers : _INITIAL_REDUCERS,
                    },
                    {
                        provide: INITIAL_REDUCERS,
                        deps: [core.Injector, _INITIAL_REDUCERS, [new core.Inject(_STORE_REDUCERS)]],
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
                        useExisting: reducers instanceof core.InjectionToken ? reducers : _FEATURE_REDUCERS,
                    },
                    {
                        provide: FEATURE_REDUCERS,
                        multi: true,
                        deps: [
                            core.Injector,
                            _FEATURE_REDUCERS,
                            [new core.Inject(_FEATURE_REDUCERS_TOKEN)],
                        ],
                        useFactory: _createFeatureReducers,
                    },
                ],
            };
        };
        StoreModule = __decorate$5([
            core.NgModule({})
        ], StoreModule);
        return StoreModule;
    }());
    function _createStoreReducers(injector, reducers, tokenReducers) {
        return reducers instanceof core.InjectionToken ? injector.get(reducers) : reducers;
    }
    function _createFeatureReducers(injector, reducerCollection, tokenReducerCollection) {
        var reducers = reducerCollection.map(function (reducer, index) {
            return reducer instanceof core.InjectionToken ? injector.get(reducer) : reducer;
        });
        return reducers;
    }
    function _initialStateFactory(initialState) {
        if (typeof initialState === 'function') {
            return initialState();
        }
        return initialState;
    }

    /**
     * DO NOT EDIT
     *
     * This file is automatically generated at build
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ɵngrx_modules_store_store_c = ACTIONS_SUBJECT_PROVIDERS;
    exports.ɵngrx_modules_store_store_d = REDUCER_MANAGER_PROVIDERS;
    exports.ɵngrx_modules_store_store_e = SCANNED_ACTIONS_SUBJECT_PROVIDERS;
    exports.ɵngrx_modules_store_store_f = isEqualCheck;
    exports.ɵngrx_modules_store_store_g = STATE_PROVIDERS;
    exports.ɵngrx_modules_store_store_b = STORE_PROVIDERS;
    exports.Store = Store;
    exports.select = select;
    exports.combineReducers = combineReducers;
    exports.compose = compose;
    exports.createReducerFactory = createReducerFactory;
    exports.ActionsSubject = ActionsSubject;
    exports.INIT = INIT;
    exports.ReducerManager = ReducerManager;
    exports.ReducerObservable = ReducerObservable;
    exports.ReducerManagerDispatcher = ReducerManagerDispatcher;
    exports.UPDATE = UPDATE;
    exports.ScannedActionsSubject = ScannedActionsSubject;
    exports.createSelector = createSelector;
    exports.createSelectorFactory = createSelectorFactory;
    exports.createFeatureSelector = createFeatureSelector;
    exports.defaultMemoize = defaultMemoize;
    exports.defaultStateFn = defaultStateFn;
    exports.resultMemoize = resultMemoize;
    exports.State = State;
    exports.StateObservable = StateObservable;
    exports.reduceState = reduceState;
    exports.INITIAL_STATE = INITIAL_STATE;
    exports._REDUCER_FACTORY = _REDUCER_FACTORY;
    exports.REDUCER_FACTORY = REDUCER_FACTORY;
    exports._INITIAL_REDUCERS = _INITIAL_REDUCERS;
    exports.INITIAL_REDUCERS = INITIAL_REDUCERS;
    exports.STORE_FEATURES = STORE_FEATURES;
    exports._INITIAL_STATE = _INITIAL_STATE;
    exports.META_REDUCERS = META_REDUCERS;
    exports._STORE_REDUCERS = _STORE_REDUCERS;
    exports._FEATURE_REDUCERS = _FEATURE_REDUCERS;
    exports.FEATURE_REDUCERS = FEATURE_REDUCERS;
    exports._FEATURE_REDUCERS_TOKEN = _FEATURE_REDUCERS_TOKEN;
    exports.StoreModule = StoreModule;
    exports.StoreRootModule = StoreRootModule;
    exports.StoreFeatureModule = StoreFeatureModule;
    exports._initialStateFactory = _initialStateFactory;
    exports._createStoreReducers = _createStoreReducers;
    exports._createFeatureReducers = _createFeatureReducers;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=store.umd.js.map
