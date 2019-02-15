/**
 * @license NgRx 7.0.0
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActionsSubject, INITIAL_STATE, ReducerManager, Store, StateObservable } from '@ngrx/store';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * @template T
 */
class MockState extends BehaviorSubject {
    constructor() {
        super(/** @type {?} */ ({}));
    }
}
MockState.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MockState.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class MockStore extends Store {
    /**
     * @param {?} state$
     * @param {?} actionsObserver
     * @param {?} reducerManager
     * @param {?} initialState
     */
    constructor(state$, actionsObserver, reducerManager, initialState) {
        super(state$, actionsObserver, reducerManager);
        this.state$ = state$;
        this.initialState = initialState;
        this.state$.next(this.initialState);
        this.scannedActions$ = actionsObserver.asObservable();
    }
    /**
     * @param {?} nextState
     * @return {?}
     */
    setState(nextState) {
        this.state$.next(nextState);
    }
    /**
     * @return {?}
     */
    addReducer() {
        /* noop */
    }
    /**
     * @return {?}
     */
    removeReducer() {
        /* noop */
    }
}
MockStore.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MockStore.ctorParameters = () => [
    { type: MockState },
    { type: ActionsSubject },
    { type: ReducerManager },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MockReducerManager extends BehaviorSubject {
    constructor() {
        super(() => undefined);
    }
}
MockReducerManager.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MockReducerManager.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?=} config
 * @return {?}
 */
function provideMockStore(config = {}) {
    return [
        ActionsSubject,
        MockState,
        { provide: INITIAL_STATE, useValue: config.initialState },
        { provide: StateObservable, useClass: MockState },
        { provide: ReducerManager, useClass: MockReducerManager },
        { provide: Store, useClass: MockStore },
    ];
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { provideMockStore, MockReducerManager, MockState, MockStore };
//# sourceMappingURL=testing.js.map
