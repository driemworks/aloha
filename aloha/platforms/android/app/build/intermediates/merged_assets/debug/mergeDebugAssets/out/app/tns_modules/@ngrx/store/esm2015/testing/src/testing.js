/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { MockState } from './mock_state';
import { ActionsSubject, INITIAL_STATE, ReducerManager, StateObservable, Store, } from '@ngrx/store';
import { MockStore } from './mock_store';
import { MockReducerManager } from './mock_reducer_manager';
/**
 * @record
 * @template T
 */
export function MockStoreConfig() { }
/** @type {?|undefined} */
MockStoreConfig.prototype.initialState;
/**
 * @template T
 * @param {?=} config
 * @return {?}
 */
export function provideMockStore(config = {}) {
    return [
        ActionsSubject,
        MockState,
        { provide: INITIAL_STATE, useValue: config.initialState },
        { provide: StateObservable, useClass: MockState },
        { provide: ReducerManager, useClass: MockReducerManager },
        { provide: Store, useClass: MockStore },
    ];
}
export { MockReducerManager } from './mock_reducer_manager';
export { MockState } from './mock_state';
export { MockStore } from './mock_store';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvdGVzdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsY0FBYyxFQUNkLGFBQWEsRUFDYixjQUFjLEVBQ2QsZUFBZSxFQUNmLEtBQUssR0FDTixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7Ozs7Ozs7O0FBTTVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FDOUIsU0FBNkIsRUFBRTtJQUUvQixPQUFPO1FBQ0wsY0FBYztRQUNkLFNBQVM7UUFDVCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUU7UUFDekQsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUU7UUFDakQsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRTtRQUN6RCxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTtLQUN4QyxDQUFDO0NBQ0g7QUFFRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9ja1N0YXRlIH0gZnJvbSAnLi9tb2NrX3N0YXRlJztcbmltcG9ydCB7XG4gIEFjdGlvbnNTdWJqZWN0LFxuICBJTklUSUFMX1NUQVRFLFxuICBSZWR1Y2VyTWFuYWdlcixcbiAgU3RhdGVPYnNlcnZhYmxlLFxuICBTdG9yZSxcbn0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgTW9ja1N0b3JlIH0gZnJvbSAnLi9tb2NrX3N0b3JlJztcbmltcG9ydCB7IE1vY2tSZWR1Y2VyTWFuYWdlciB9IGZyb20gJy4vbW9ja19yZWR1Y2VyX21hbmFnZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vY2tTdG9yZUNvbmZpZzxUPiB7XG4gIGluaXRpYWxTdGF0ZT86IFQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlTW9ja1N0b3JlPFQgPSBhbnk+KFxuICBjb25maWc6IE1vY2tTdG9yZUNvbmZpZzxUPiA9IHt9XG4pOiBQcm92aWRlcltdIHtcbiAgcmV0dXJuIFtcbiAgICBBY3Rpb25zU3ViamVjdCxcbiAgICBNb2NrU3RhdGUsXG4gICAgeyBwcm92aWRlOiBJTklUSUFMX1NUQVRFLCB1c2VWYWx1ZTogY29uZmlnLmluaXRpYWxTdGF0ZSB9LFxuICAgIHsgcHJvdmlkZTogU3RhdGVPYnNlcnZhYmxlLCB1c2VDbGFzczogTW9ja1N0YXRlIH0sXG4gICAgeyBwcm92aWRlOiBSZWR1Y2VyTWFuYWdlciwgdXNlQ2xhc3M6IE1vY2tSZWR1Y2VyTWFuYWdlciB9LFxuICAgIHsgcHJvdmlkZTogU3RvcmUsIHVzZUNsYXNzOiBNb2NrU3RvcmUgfSxcbiAgXTtcbn1cblxuZXhwb3J0IHsgTW9ja1JlZHVjZXJNYW5hZ2VyIH0gZnJvbSAnLi9tb2NrX3JlZHVjZXJfbWFuYWdlcic7XG5leHBvcnQgeyBNb2NrU3RhdGUgfSBmcm9tICcuL21vY2tfc3RhdGUnO1xuZXhwb3J0IHsgTW9ja1N0b3JlIH0gZnJvbSAnLi9tb2NrX3N0b3JlJztcbiJdfQ==