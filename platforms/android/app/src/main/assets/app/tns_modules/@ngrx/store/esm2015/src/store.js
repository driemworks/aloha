/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';
import { ActionsSubject } from './actions_subject';
import { ReducerManager } from './reducer_manager';
import { StateObservable } from './state';
/**
 * @template T
 */
export class Store extends Observable {
    /**
     * @param {?} state$
     * @param {?} actionsObserver
     * @param {?} reducerManager
     */
    constructor(state$, actionsObserver, reducerManager) {
        super();
        this.actionsObserver = actionsObserver;
        this.reducerManager = reducerManager;
        this.source = state$;
    }
    /**
     * @template Props
     * @param {?} pathOrMapFn
     * @param {...?} paths
     * @return {?}
     */
    select(pathOrMapFn, ...paths) {
        return select.call(null, pathOrMapFn, ...paths)(this);
    }
    /**
     * @template R
     * @param {?} operator
     * @return {?}
     */
    lift(operator) {
        /** @type {?} */
        const store = new Store(this, this.actionsObserver, this.reducerManager);
        store.operator = operator;
        return store;
    }
    /**
     * @template V
     * @param {?} action
     * @return {?}
     */
    dispatch(action) {
        this.actionsObserver.next(action);
    }
    /**
     * @param {?} action
     * @return {?}
     */
    next(action) {
        this.actionsObserver.next(action);
    }
    /**
     * @param {?} err
     * @return {?}
     */
    error(err) {
        this.actionsObserver.error(err);
    }
    /**
     * @return {?}
     */
    complete() {
        this.actionsObserver.complete();
    }
    /**
     * @template State, Actions
     * @param {?} key
     * @param {?} reducer
     * @return {?}
     */
    addReducer(key, reducer) {
        this.reducerManager.addReducer(key, reducer);
    }
    /**
     * @template Key
     * @param {?} key
     * @return {?}
     */
    removeReducer(key) {
        this.reducerManager.removeReducer(key);
    }
}
Store.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Store.ctorParameters = () => [
    { type: StateObservable },
    { type: ActionsSubject },
    { type: ReducerManager }
];
if (false) {
    /** @type {?} */
    Store.prototype.actionsObserver;
    /** @type {?} */
    Store.prototype.reducerManager;
}
/** @type {?} */
export const STORE_PROVIDERS = [Store];
/**
 * @template T, Props, K
 * @param {?} pathOrMapFn
 * @param {?} propsOrPath
 * @param {...?} paths
 * @return {?}
 */
export function select(pathOrMapFn, propsOrPath, ...paths) {
    return function selectOperator(source$) {
        /** @type {?} */
        let mapped$;
        if (typeof pathOrMapFn === 'string') {
            /** @type {?} */
            const pathSlices = [/** @type {?} */ (propsOrPath), ...paths].filter(Boolean);
            mapped$ = source$.pipe(pluck(pathOrMapFn, ...pathSlices));
        }
        else if (typeof pathOrMapFn === 'function') {
            mapped$ = source$.pipe(map(source => pathOrMapFn(source, /** @type {?} */ (propsOrPath))));
        }
        else {
            throw new TypeError(`Unexpected type '${typeof pathOrMapFn}' in select operator,` +
                ` expected 'string' or 'function'`);
        }
        return mapped$.pipe(distinctUntilChanged());
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFzQixNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7OztBQUcxQyxNQUFNLE9BQU8sS0FBUyxTQUFRLFVBQWE7Ozs7OztJQUN6QyxZQUNFLE1BQXVCLEVBQ2YsaUJBQ0E7UUFFUixLQUFLLEVBQUUsQ0FBQztRQUhBLG9CQUFlLEdBQWYsZUFBZTtRQUNmLG1CQUFjLEdBQWQsY0FBYztRQUl0QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN0Qjs7Ozs7OztJQWtERCxNQUFNLENBQ0osV0FBd0QsRUFDeEQsR0FBRyxLQUFlO1FBRWxCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkQ7Ozs7OztJQUVELElBQUksQ0FBSSxRQUF3Qjs7UUFDOUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVFLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRTFCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7Ozs7OztJQUVELFFBQVEsQ0FBNEIsTUFBUztRQUMzQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNuQzs7Ozs7SUFFRCxJQUFJLENBQUMsTUFBYztRQUNqQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNuQzs7Ozs7SUFFRCxLQUFLLENBQUMsR0FBUTtRQUNaLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2pDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDakM7Ozs7Ozs7SUFFRCxVQUFVLENBQ1IsR0FBVyxFQUNYLE9BQXNDO1FBRXRDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUM5Qzs7Ozs7O0lBRUQsYUFBYSxDQUF1QyxHQUFRO1FBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3hDOzs7WUFuR0YsVUFBVTs7OztZQUZGLGVBQWU7WUFIZixjQUFjO1lBRWQsY0FBYzs7Ozs7Ozs7O0FBeUd2QixhQUFhLGVBQWUsR0FBZSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7OztBQTBFbkQsTUFBTSxVQUFVLE1BQU0sQ0FDcEIsV0FBd0QsRUFDeEQsV0FBMkIsRUFDM0IsR0FBRyxLQUFlO0lBRWxCLE9BQU8sU0FBUyxjQUFjLENBQUMsT0FBc0I7O1FBQ25ELElBQUksT0FBTyxDQUFrQjtRQUU3QixJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsRUFBRTs7WUFDbkMsTUFBTSxVQUFVLEdBQUcsbUJBQVMsV0FBVyxHQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25FLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQzNEO2FBQU0sSUFBSSxPQUFPLFdBQVcsS0FBSyxVQUFVLEVBQUU7WUFDNUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQ3BCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLG9CQUFTLFdBQVcsRUFBQyxDQUFDLENBQ3ZELENBQUM7U0FDSDthQUFNO1lBQ0wsTUFBTSxJQUFJLFNBQVMsQ0FDakIsb0JBQW9CLE9BQU8sV0FBVyx1QkFBdUI7Z0JBQzNELGtDQUFrQyxDQUNyQyxDQUFDO1NBQ0g7UUFFRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0tBQzdDLENBQUM7Q0FDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciwgT3BlcmF0b3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHBsdWNrIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBY3Rpb25zU3ViamVjdCB9IGZyb20gJy4vYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7IEFjdGlvbiwgQWN0aW9uUmVkdWNlciB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IFJlZHVjZXJNYW5hZ2VyIH0gZnJvbSAnLi9yZWR1Y2VyX21hbmFnZXInO1xuaW1wb3J0IHsgU3RhdGVPYnNlcnZhYmxlIH0gZnJvbSAnLi9zdGF0ZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdG9yZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4gaW1wbGVtZW50cyBPYnNlcnZlcjxBY3Rpb24+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgc3RhdGUkOiBTdGF0ZU9ic2VydmFibGUsXG4gICAgcHJpdmF0ZSBhY3Rpb25zT2JzZXJ2ZXI6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHByaXZhdGUgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyXG4gICkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNvdXJjZSA9IHN0YXRlJDtcbiAgfVxuXG4gIHNlbGVjdDxLPihtYXBGbjogKHN0YXRlOiBUKSA9PiBLKTogT2JzZXJ2YWJsZTxLPjtcbiAgc2VsZWN0PEssIFByb3BzID0gYW55PihcbiAgICBtYXBGbjogKHN0YXRlOiBULCBwcm9wczogUHJvcHMpID0+IEssXG4gICAgcHJvcHM6IFByb3BzXG4gICk6IE9ic2VydmFibGU8Sz47XG4gIHNlbGVjdDxhIGV4dGVuZHMga2V5b2YgVD4oa2V5OiBhKTogT2JzZXJ2YWJsZTxUW2FdPjtcbiAgc2VsZWN0PGEgZXh0ZW5kcyBrZXlvZiBULCBiIGV4dGVuZHMga2V5b2YgVFthXT4oXG4gICAga2V5MTogYSxcbiAgICBrZXkyOiBiXG4gICk6IE9ic2VydmFibGU8VFthXVtiXT47XG4gIHNlbGVjdDxhIGV4dGVuZHMga2V5b2YgVCwgYiBleHRlbmRzIGtleW9mIFRbYV0sIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdPihcbiAgICBrZXkxOiBhLFxuICAgIGtleTI6IGIsXG4gICAga2V5MzogY1xuICApOiBPYnNlcnZhYmxlPFRbYV1bYl1bY10+O1xuICBzZWxlY3Q8XG4gICAgYSBleHRlbmRzIGtleW9mIFQsXG4gICAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gICAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gICAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11cbiAgPihrZXkxOiBhLCBrZXkyOiBiLCBrZXkzOiBjLCBrZXk0OiBkKTogT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdPjtcbiAgc2VsZWN0PFxuICAgIGEgZXh0ZW5kcyBrZXlvZiBULFxuICAgIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICAgIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICAgIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdLFxuICAgIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdXG4gID4oa2V5MTogYSwga2V5MjogYiwga2V5MzogYywga2V5NDogZCwga2V5NTogZSk6IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXVtlXT47XG4gIHNlbGVjdDxcbiAgICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXSxcbiAgICBlIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXSxcbiAgICBmIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXVtlXVxuICA+KFxuICAgIGtleTE6IGEsXG4gICAga2V5MjogYixcbiAgICBrZXkzOiBjLFxuICAgIGtleTQ6IGQsXG4gICAga2V5NTogZSxcbiAgICBrZXk2OiBmXG4gICk6IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXVtlXVtmXT47XG4gIC8qKlxuICAgKiBUaGlzIG92ZXJsb2FkIGlzIHVzZWQgdG8gc3VwcG9ydCBzcHJlYWQgb3BlcmF0b3Igd2l0aFxuICAgKiBmaXhlZCBsZW5ndGggdHVwbGVzIHR5cGUgaW4gdHlwZXNjcmlwdCAyLjdcbiAgICovXG4gIHNlbGVjdDxLID0gYW55PiguLi5wYXRoczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPEs+O1xuICBzZWxlY3Q8UHJvcHMgPSBhbnk+KFxuICAgIHBhdGhPck1hcEZuOiAoKHN0YXRlOiBULCBwcm9wcz86IFByb3BzKSA9PiBhbnkpIHwgc3RyaW5nLFxuICAgIC4uLnBhdGhzOiBzdHJpbmdbXVxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiBzZWxlY3QuY2FsbChudWxsLCBwYXRoT3JNYXBGbiwgLi4ucGF0aHMpKHRoaXMpO1xuICB9XG5cbiAgbGlmdDxSPihvcGVyYXRvcjogT3BlcmF0b3I8VCwgUj4pOiBTdG9yZTxSPiB7XG4gICAgY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmU8Uj4odGhpcywgdGhpcy5hY3Rpb25zT2JzZXJ2ZXIsIHRoaXMucmVkdWNlck1hbmFnZXIpO1xuICAgIHN0b3JlLm9wZXJhdG9yID0gb3BlcmF0b3I7XG5cbiAgICByZXR1cm4gc3RvcmU7XG4gIH1cblxuICBkaXNwYXRjaDxWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihhY3Rpb246IFYpIHtcbiAgICB0aGlzLmFjdGlvbnNPYnNlcnZlci5uZXh0KGFjdGlvbik7XG4gIH1cblxuICBuZXh0KGFjdGlvbjogQWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb25zT2JzZXJ2ZXIubmV4dChhY3Rpb24pO1xuICB9XG5cbiAgZXJyb3IoZXJyOiBhbnkpIHtcbiAgICB0aGlzLmFjdGlvbnNPYnNlcnZlci5lcnJvcihlcnIpO1xuICB9XG5cbiAgY29tcGxldGUoKSB7XG4gICAgdGhpcy5hY3Rpb25zT2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgfVxuXG4gIGFkZFJlZHVjZXI8U3RhdGUsIEFjdGlvbnMgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICAgIGtleTogc3RyaW5nLFxuICAgIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8U3RhdGUsIEFjdGlvbnM+XG4gICkge1xuICAgIHRoaXMucmVkdWNlck1hbmFnZXIuYWRkUmVkdWNlcihrZXksIHJlZHVjZXIpO1xuICB9XG5cbiAgcmVtb3ZlUmVkdWNlcjxLZXkgZXh0ZW5kcyBFeHRyYWN0PGtleW9mIFQsIHN0cmluZz4+KGtleTogS2V5KSB7XG4gICAgdGhpcy5yZWR1Y2VyTWFuYWdlci5yZW1vdmVSZWR1Y2VyKGtleSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFNUT1JFX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtTdG9yZV07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8VCwgUHJvcHMsIEs+KFxuICBtYXBGbjogKHN0YXRlOiBULCBwcm9wczogUHJvcHMpID0+IEssXG4gIHByb3BzPzogUHJvcHNcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPEs+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxULCBhIGV4dGVuZHMga2V5b2YgVD4oXG4gIGtleTogYSxcbiAgcHJvcHM6IG51bGxcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxULCBhIGV4dGVuZHMga2V5b2YgVCwgYiBleHRlbmRzIGtleW9mIFRbYV0+KFxuICBrZXkxOiBhLFxuICBrZXkyOiBiXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUW2FdW2JdPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8XG4gIFQsXG4gIGEgZXh0ZW5kcyBrZXlvZiBULFxuICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl1cbj4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGIsXG4gIGtleTM6IGNcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl1bY10+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxcbiAgVCxcbiAgYSBleHRlbmRzIGtleW9mIFQsXG4gIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11cbj4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGIsXG4gIGtleTM6IGMsXG4gIGtleTQ6IGRcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl1bY11bZF0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxcbiAgVCxcbiAgYSBleHRlbmRzIGtleW9mIFQsXG4gIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY10sXG4gIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdXG4+KFxuICBrZXkxOiBhLFxuICBrZXkyOiBiLFxuICBrZXkzOiBjLFxuICBrZXk0OiBkLFxuICBrZXk1OiBlXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdW2VdPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8XG4gIFQsXG4gIGEgZXh0ZW5kcyBrZXlvZiBULFxuICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdLFxuICBlIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXSxcbiAgZiBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11bZF1bZV1cbj4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGIsXG4gIGtleTM6IGMsXG4gIGtleTQ6IGQsXG4gIGtleTU6IGUsXG4gIGtleTY6IGZcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl1bY11bZF1bZV1bZl0+O1xuLyoqXG4gKiBUaGlzIG92ZXJsb2FkIGlzIHVzZWQgdG8gc3VwcG9ydCBzcHJlYWQgb3BlcmF0b3Igd2l0aFxuICogZml4ZWQgbGVuZ3RoIHR1cGxlcyB0eXBlIGluIHR5cGVzY3JpcHQgMi43XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8VCwgUHJvcHMgPSBhbnksIEsgPSBhbnk+KFxuICBwcm9wc09yUGF0aDogUHJvcHMsXG4gIC4uLnBhdGhzOiBzdHJpbmdbXVxuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8Sz47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFQsIFByb3BzLCBLPihcbiAgcGF0aE9yTWFwRm46ICgoc3RhdGU6IFQsIHByb3BzPzogUHJvcHMpID0+IGFueSkgfCBzdHJpbmcsXG4gIHByb3BzT3JQYXRoOiBQcm9wcyB8IHN0cmluZyxcbiAgLi4ucGF0aHM6IHN0cmluZ1tdXG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNlbGVjdE9wZXJhdG9yKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pOiBPYnNlcnZhYmxlPEs+IHtcbiAgICBsZXQgbWFwcGVkJDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gICAgaWYgKHR5cGVvZiBwYXRoT3JNYXBGbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHBhdGhTbGljZXMgPSBbPHN0cmluZz5wcm9wc09yUGF0aCwgLi4ucGF0aHNdLmZpbHRlcihCb29sZWFuKTtcbiAgICAgIG1hcHBlZCQgPSBzb3VyY2UkLnBpcGUocGx1Y2socGF0aE9yTWFwRm4sIC4uLnBhdGhTbGljZXMpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXRoT3JNYXBGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbWFwcGVkJCA9IHNvdXJjZSQucGlwZShcbiAgICAgICAgbWFwKHNvdXJjZSA9PiBwYXRoT3JNYXBGbihzb3VyY2UsIDxQcm9wcz5wcm9wc09yUGF0aCkpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICBgVW5leHBlY3RlZCB0eXBlICcke3R5cGVvZiBwYXRoT3JNYXBGbn0nIGluIHNlbGVjdCBvcGVyYXRvcixgICtcbiAgICAgICAgICBgIGV4cGVjdGVkICdzdHJpbmcnIG9yICdmdW5jdGlvbidgXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBwZWQkLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gIH07XG59XG4iXX0=