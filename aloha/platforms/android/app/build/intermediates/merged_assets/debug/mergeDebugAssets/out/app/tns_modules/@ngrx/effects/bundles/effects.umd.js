/**
 * @license NgRx 7.0.0
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ngrx/store'), require('rxjs'), require('rxjs/operators'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@ngrx/effects', ['exports', '@ngrx/store', 'rxjs', 'rxjs/operators', '@angular/core'], factory) :
    (factory((global.ngrx = global.ngrx || {}, global.ngrx.effects = {}),global['@ngrx/store'],global.rxjs,global.rxjs.operators,global.ng.core));
}(this, (function (exports,store,rxjs,operators,core) { 'use strict';

    var __values = (undefined && undefined.__values) || function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };
    var METADATA_KEY = '__@ngrx/effects__';
    function getEffectMetadataEntries(sourceProto) {
        return sourceProto.constructor.hasOwnProperty(METADATA_KEY)
            ? sourceProto.constructor[METADATA_KEY]
            : [];
    }
    function setEffectMetadataEntries(sourceProto, entries) {
        var constructor = sourceProto.constructor;
        var meta = constructor.hasOwnProperty(METADATA_KEY)
            ? constructor[METADATA_KEY]
            : Object.defineProperty(constructor, METADATA_KEY, { value: [] })[METADATA_KEY];
        Array.prototype.push.apply(meta, entries);
    }
    function Effect(_a) {
        var _b = (_a === void 0 ? {} : _a).dispatch, dispatch = _b === void 0 ? true : _b;
        return function (target, propertyName) {
            var metadata = { propertyName: propertyName, dispatch: dispatch };
            setEffectMetadataEntries(target, [metadata]);
        };
    }
    function getSourceForInstance(instance) {
        return Object.getPrototypeOf(instance);
    }
    function getSourceMetadata(instance) {
        return store.compose(getEffectMetadataEntries, getSourceForInstance)(instance);
    }
    function getEffectsMetadata(instance) {
        var e_1, _a;
        var metadata = {};
        try {
            for (var _b = __values(getSourceMetadata(instance)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = _c.value, propertyName = _d.propertyName, dispatch = _d.dispatch;
                metadata[propertyName] = { dispatch: dispatch };
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return metadata;
    }

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
    function mergeEffects(sourceInstance) {
        var sourceName = getSourceForInstance(sourceInstance).constructor.name;
        var observables = getSourceMetadata(sourceInstance).map(function (_a) {
            var propertyName = _a.propertyName, dispatch = _a.dispatch;
            var observable = typeof sourceInstance[propertyName] === 'function'
                ? sourceInstance[propertyName]()
                : sourceInstance[propertyName];
            if (dispatch === false) {
                return observable.pipe(operators.ignoreElements());
            }
            var materialized$ = observable.pipe(operators.materialize());
            return materialized$.pipe(operators.map(function (notification) { return ({
                effect: sourceInstance[propertyName],
                notification: notification,
                propertyName: propertyName,
                sourceName: sourceName,
                sourceInstance: sourceInstance,
            }); }));
        });
        return rxjs.merge.apply(void 0, __spread(observables));
    }

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
    var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var Actions = /** @class */ (function (_super) {
        __extends(Actions, _super);
        function Actions(source) {
            var _this = _super.call(this) || this;
            if (source) {
                _this.source = source;
            }
            return _this;
        }
        Actions_1 = Actions;
        Actions.prototype.lift = function (operator) {
            var observable = new Actions_1();
            observable.source = this;
            observable.operator = operator;
            return observable;
        };
        var Actions_1;
        Actions = Actions_1 = __decorate([
            core.Injectable(),
            __param(0, core.Inject(store.ScannedActionsSubject)),
            __metadata("design:paramtypes", [rxjs.Observable])
        ], Actions);
        return Actions;
    }(rxjs.Observable));
    function ofType() {
        var allowedTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            allowedTypes[_i] = arguments[_i];
        }
        return operators.filter(function (action) {
            return allowedTypes.some(function (type) { return type === action.type; });
        });
    }

    function verifyOutput(output, reporter) {
        reportErrorThrown(output, reporter);
        reportInvalidActions(output, reporter);
    }
    function reportErrorThrown(output, reporter) {
        if (output.notification.kind === 'E') {
            reporter.handleError(output.notification.error);
        }
    }
    function reportInvalidActions(output, reporter) {
        if (output.notification.kind === 'N') {
            var action = output.notification.value;
            var isInvalidAction = !isAction(action);
            if (isInvalidAction) {
                reporter.handleError(new Error("Effect " + getEffectName(output) + " dispatched an invalid action: " + stringify(action)));
            }
        }
    }
    function isAction(action) {
        return action && action.type && typeof action.type === 'string';
    }
    function getEffectName(_a) {
        var propertyName = _a.propertyName, sourceInstance = _a.sourceInstance, sourceName = _a.sourceName;
        var isMethod = typeof sourceInstance[propertyName] === 'function';
        return "\"" + sourceName + "." + propertyName + (isMethod ? '()' : '') + "\"";
    }
    function stringify(action) {
        try {
            return JSON.stringify(action);
        }
        catch (_a) {
            return action;
        }
    }

    var onIdentifyEffectsKey = 'ngrxOnIdentifyEffects';
    var onRunEffectsKey = 'ngrxOnRunEffects';
    var onInitEffects = 'ngrxOnInitEffects';

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
    var EffectSources = /** @class */ (function (_super) {
        __extends$1(EffectSources, _super);
        function EffectSources(errorHandler, store$$1) {
            var _this = _super.call(this) || this;
            _this.errorHandler = errorHandler;
            _this.store = store$$1;
            return _this;
        }
        EffectSources.prototype.addEffects = function (effectSourceInstance) {
            this.next(effectSourceInstance);
            if (onInitEffects in effectSourceInstance &&
                typeof effectSourceInstance[onInitEffects] === 'function') {
                this.store.dispatch(effectSourceInstance[onInitEffects]());
            }
        };
        /**
         * @internal
         */
        EffectSources.prototype.toActions = function () {
            var _this = this;
            return this.pipe(operators.groupBy(getSourceForInstance), operators.mergeMap(function (source$) { return source$.pipe(operators.groupBy(effectsInstance)); }), operators.mergeMap(function (source$) {
                return source$.pipe(operators.exhaustMap(resolveEffectSource), operators.map(function (output) {
                    verifyOutput(output, _this.errorHandler);
                    return output.notification;
                }), operators.filter(function (notification) {
                    return notification.kind === 'N';
                }), operators.dematerialize());
            }));
        };
        EffectSources = __decorate$1([
            core.Injectable(),
            __metadata$1("design:paramtypes", [core.ErrorHandler, store.Store])
        ], EffectSources);
        return EffectSources;
    }(rxjs.Subject));
    function effectsInstance(sourceInstance) {
        if (onIdentifyEffectsKey in sourceInstance &&
            typeof sourceInstance[onIdentifyEffectsKey] === 'function') {
            return sourceInstance[onIdentifyEffectsKey]();
        }
        return '';
    }
    function resolveEffectSource(sourceInstance) {
        var mergedEffects$ = mergeEffects(sourceInstance);
        if (isOnRunEffects(sourceInstance)) {
            return sourceInstance.ngrxOnRunEffects(mergedEffects$);
        }
        return mergedEffects$;
    }
    function isOnRunEffects(sourceInstance) {
        var source = getSourceForInstance(sourceInstance);
        return (onRunEffectsKey in source && typeof source[onRunEffectsKey] === 'function');
    }

    var IMMEDIATE_EFFECTS = new core.InjectionToken('ngrx/effects: Immediate Effects');
    var ROOT_EFFECTS = new core.InjectionToken('ngrx/effects: Root Effects');
    var FEATURE_EFFECTS = new core.InjectionToken('ngrx/effects: Feature Effects');

    var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var EffectsRunner = /** @class */ (function () {
        function EffectsRunner(effectSources, store$$1) {
            this.effectSources = effectSources;
            this.store = store$$1;
            this.effectsSubscription = null;
        }
        EffectsRunner.prototype.start = function () {
            if (!this.effectsSubscription) {
                this.effectsSubscription = this.effectSources
                    .toActions()
                    .subscribe(this.store);
            }
        };
        EffectsRunner.prototype.ngOnDestroy = function () {
            if (this.effectsSubscription) {
                this.effectsSubscription.unsubscribe();
                this.effectsSubscription = null;
            }
        };
        EffectsRunner = __decorate$2([
            core.Injectable(),
            __metadata$2("design:paramtypes", [EffectSources,
                store.Store])
        ], EffectsRunner);
        return EffectsRunner;
    }());

    var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$3 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param$1 = (undefined && undefined.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var ROOT_EFFECTS_INIT = '@ngrx/effects/init';
    var EffectsRootModule = /** @class */ (function () {
        function EffectsRootModule(sources, runner, store$$1, rootEffects, storeRootModule, storeFeatureModule) {
            this.sources = sources;
            runner.start();
            rootEffects.forEach(function (effectSourceInstance) {
                return sources.addEffects(effectSourceInstance);
            });
            store$$1.dispatch({ type: ROOT_EFFECTS_INIT });
        }
        EffectsRootModule.prototype.addEffects = function (effectSourceInstance) {
            this.sources.addEffects(effectSourceInstance);
        };
        EffectsRootModule = __decorate$3([
            core.NgModule({}),
            __param$1(3, core.Inject(ROOT_EFFECTS)),
            __param$1(4, core.Optional()),
            __param$1(5, core.Optional()),
            __metadata$3("design:paramtypes", [EffectSources,
                EffectsRunner,
                store.Store, Array, store.StoreRootModule,
                store.StoreFeatureModule])
        ], EffectsRootModule);
        return EffectsRootModule;
    }());

    var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
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
    var EffectsFeatureModule = /** @class */ (function () {
        function EffectsFeatureModule(root, effectSourceGroups, storeRootModule, storeFeatureModule) {
            effectSourceGroups.forEach(function (group) {
                return group.forEach(function (effectSourceInstance) {
                    return root.addEffects(effectSourceInstance);
                });
            });
        }
        EffectsFeatureModule = __decorate$4([
            core.NgModule({}),
            __param$2(1, core.Inject(FEATURE_EFFECTS)),
            __param$2(2, core.Optional()),
            __param$2(3, core.Optional()),
            __metadata$4("design:paramtypes", [EffectsRootModule, Array, store.StoreRootModule,
                store.StoreFeatureModule])
        ], EffectsFeatureModule);
        return EffectsFeatureModule;
    }());

    var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var EffectsModule = /** @class */ (function () {
        function EffectsModule() {
        }
        EffectsModule.forFeature = function (featureEffects) {
            return {
                ngModule: EffectsFeatureModule,
                providers: [
                    featureEffects,
                    {
                        provide: FEATURE_EFFECTS,
                        multi: true,
                        deps: featureEffects,
                        useFactory: createSourceInstances,
                    },
                ],
            };
        };
        EffectsModule.forRoot = function (rootEffects) {
            return {
                ngModule: EffectsRootModule,
                providers: [
                    EffectsRunner,
                    EffectSources,
                    Actions,
                    rootEffects,
                    {
                        provide: ROOT_EFFECTS,
                        deps: rootEffects,
                        useFactory: createSourceInstances,
                    },
                ],
            };
        };
        EffectsModule = __decorate$5([
            core.NgModule({})
        ], EffectsModule);
        return EffectsModule;
    }());
    function createSourceInstances() {
        var instances = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            instances[_i] = arguments[_i];
        }
        return instances;
    }

    /**
     * DO NOT EDIT
     *
     * This file is automatically generated at build
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ɵngrx_modules_effects_effects_c = EffectsFeatureModule;
    exports.ɵngrx_modules_effects_effects_a = createSourceInstances;
    exports.ɵngrx_modules_effects_effects_b = EffectsRootModule;
    exports.ɵngrx_modules_effects_effects_f = EffectsRunner;
    exports.ɵngrx_modules_effects_effects_e = FEATURE_EFFECTS;
    exports.ɵngrx_modules_effects_effects_d = ROOT_EFFECTS;
    exports.Effect = Effect;
    exports.getEffectsMetadata = getEffectsMetadata;
    exports.mergeEffects = mergeEffects;
    exports.Actions = Actions;
    exports.ofType = ofType;
    exports.EffectsModule = EffectsModule;
    exports.EffectSources = EffectSources;
    exports.ROOT_EFFECTS_INIT = ROOT_EFFECTS_INIT;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=effects.umd.js.map
