/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, queueScheduler, } from 'rxjs';
import { observeOn, scan, withLatestFrom } from 'rxjs/operators';
import { ActionsSubject, INIT } from './actions_subject';
import { ReducerObservable } from './reducer_manager';
import { ScannedActionsSubject } from './scanned_actions_subject';
import { INITIAL_STATE } from './tokens';
/**
 * @abstract
 */
export class StateObservable extends Observable {
}
/**
 * @template T
 */
export class State extends BehaviorSubject {
    /**
     * @param {?} actions$
     * @param {?} reducer$
     * @param {?} scannedActions
     * @param {?} initialState
     */
    constructor(actions$, reducer$, scannedActions, initialState) {
        super(initialState);
        /** @type {?} */
        const actionsOnQueue$ = actions$.pipe(observeOn(queueScheduler));
        /** @type {?} */
        const withLatestReducer$ = actionsOnQueue$.pipe(withLatestFrom(reducer$));
        /** @type {?} */
        const seed = { state: initialState };
        /** @type {?} */
        const stateAndAction$ = withLatestReducer$.pipe(scan(reduceState, seed));
        this.stateSubscription = stateAndAction$.subscribe(({ state, action }) => {
            this.next(state);
            scannedActions.next(action);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
        this.complete();
    }
}
State.INIT = INIT;
State.decorators = [
    { type: Injectable }
];
/** @nocollapse */
State.ctorParameters = () => [
    { type: ActionsSubject },
    { type: ReducerObservable },
    { type: ScannedActionsSubject },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] }] }
];
if (false) {
    /** @type {?} */
    State.INIT;
    /** @type {?} */
    State.prototype.stateSubscription;
}
/** @typedef {?} */
var StateActionPair;
export { StateActionPair };
/**
 * @template T, V
 * @param {?=} stateActionPair
 * @param {?=} __1
 * @return {?}
 */
export function reduceState(stateActionPair = { state: undefined }, [action, reducer]) {
    const { state } = stateActionPair;
    return { state: reducer(state, action), action };
}
/** @type {?} */
export const STATE_PROVIDERS = [
    State,
    { provide: StateObservable, useExisting: State },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFDTCxlQUFlLEVBQ2YsVUFBVSxFQUNWLGNBQWMsR0FFZixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7OztBQUV6QyxNQUFNLE9BQWdCLGVBQWdCLFNBQVEsVUFBZTtDQUFHOzs7O0FBR2hFLE1BQU0sT0FBTyxLQUFTLFNBQVEsZUFBb0I7Ozs7Ozs7SUFLaEQsWUFDRSxRQUF3QixFQUN4QixRQUEyQixFQUMzQixjQUFxQyxFQUNkLFlBQWlCO1FBRXhDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQzs7UUFFcEIsTUFBTSxlQUFlLEdBQXVCLFFBQVEsQ0FBQyxJQUFJLENBQ3ZELFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FDMUIsQ0FBQzs7UUFDRixNQUFNLGtCQUFrQixHQUVwQixlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOztRQUVuRCxNQUFNLElBQUksR0FBdUIsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUM7O1FBQ3pELE1BQU0sZUFBZSxHQUdoQixrQkFBa0IsQ0FBQyxJQUFJLENBQzFCLElBQUksQ0FDRixXQUFXLEVBQ1gsSUFBSSxDQUNMLENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUN2RSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pCLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0IsQ0FBQyxDQUFDO0tBQ0o7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNqQjs7QUF2Q0QsYUFBdUIsSUFBSSxDQUFDOztZQUY3QixVQUFVOzs7O1lBUkYsY0FBYztZQUVkLGlCQUFpQjtZQUNqQixxQkFBcUI7NENBZXpCLE1BQU0sU0FBQyxhQUFhOzs7Ozs7Ozs7Ozs7Ozs7OztBQXNDekIsTUFBTSxVQUFVLFdBQVcsQ0FDekIsa0JBQXlDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUM3RCxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQTJCO0lBRTNDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxlQUFlLENBQUM7SUFDbEMsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDO0NBQ2xEOztBQUVELGFBQWEsZUFBZSxHQUFlO0lBQ3pDLEtBQUs7SUFDTCxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtDQUNqRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIE9ic2VydmFibGUsXG4gIHF1ZXVlU2NoZWR1bGVyLFxuICBTdWJzY3JpcHRpb24sXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgb2JzZXJ2ZU9uLCBzY2FuLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQWN0aW9uc1N1YmplY3QsIElOSVQgfSBmcm9tICcuL2FjdGlvbnNfc3ViamVjdCc7XG5pbXBvcnQgeyBBY3Rpb24sIEFjdGlvblJlZHVjZXIgfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBSZWR1Y2VyT2JzZXJ2YWJsZSB9IGZyb20gJy4vcmVkdWNlcl9tYW5hZ2VyJztcbmltcG9ydCB7IFNjYW5uZWRBY3Rpb25zU3ViamVjdCB9IGZyb20gJy4vc2Nhbm5lZF9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHsgSU5JVElBTF9TVEFURSB9IGZyb20gJy4vdG9rZW5zJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0YXRlT2JzZXJ2YWJsZSBleHRlbmRzIE9ic2VydmFibGU8YW55PiB7fVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RhdGU8VD4gZXh0ZW5kcyBCZWhhdmlvclN1YmplY3Q8YW55PiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHN0YXRpYyByZWFkb25seSBJTklUID0gSU5JVDtcblxuICBwcml2YXRlIHN0YXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgYWN0aW9ucyQ6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHJlZHVjZXIkOiBSZWR1Y2VyT2JzZXJ2YWJsZSxcbiAgICBzY2FubmVkQWN0aW9uczogU2Nhbm5lZEFjdGlvbnNTdWJqZWN0LFxuICAgIEBJbmplY3QoSU5JVElBTF9TVEFURSkgaW5pdGlhbFN0YXRlOiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoaW5pdGlhbFN0YXRlKTtcblxuICAgIGNvbnN0IGFjdGlvbnNPblF1ZXVlJDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gYWN0aW9ucyQucGlwZShcbiAgICAgIG9ic2VydmVPbihxdWV1ZVNjaGVkdWxlcilcbiAgICApO1xuICAgIGNvbnN0IHdpdGhMYXRlc3RSZWR1Y2VyJDogT2JzZXJ2YWJsZTxcbiAgICAgIFtBY3Rpb24sIEFjdGlvblJlZHVjZXI8YW55LCBBY3Rpb24+XVxuICAgID4gPSBhY3Rpb25zT25RdWV1ZSQucGlwZSh3aXRoTGF0ZXN0RnJvbShyZWR1Y2VyJCkpO1xuXG4gICAgY29uc3Qgc2VlZDogU3RhdGVBY3Rpb25QYWlyPFQ+ID0geyBzdGF0ZTogaW5pdGlhbFN0YXRlIH07XG4gICAgY29uc3Qgc3RhdGVBbmRBY3Rpb24kOiBPYnNlcnZhYmxlPHtcbiAgICAgIHN0YXRlOiBhbnk7XG4gICAgICBhY3Rpb24/OiBBY3Rpb247XG4gICAgfT4gPSB3aXRoTGF0ZXN0UmVkdWNlciQucGlwZShcbiAgICAgIHNjYW48W0FjdGlvbiwgQWN0aW9uUmVkdWNlcjxULCBBY3Rpb24+XSwgU3RhdGVBY3Rpb25QYWlyPFQ+PihcbiAgICAgICAgcmVkdWNlU3RhdGUsXG4gICAgICAgIHNlZWRcbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbiA9IHN0YXRlQW5kQWN0aW9uJC5zdWJzY3JpYmUoKHsgc3RhdGUsIGFjdGlvbiB9KSA9PiB7XG4gICAgICB0aGlzLm5leHQoc3RhdGUpO1xuICAgICAgc2Nhbm5lZEFjdGlvbnMubmV4dChhY3Rpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY29tcGxldGUoKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBTdGF0ZUFjdGlvblBhaXI8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4gPSB7XG4gIHN0YXRlOiBUIHwgdW5kZWZpbmVkO1xuICBhY3Rpb24/OiBWO1xufTtcbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2VTdGF0ZTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgc3RhdGVBY3Rpb25QYWlyOiBTdGF0ZUFjdGlvblBhaXI8VCwgVj4gPSB7IHN0YXRlOiB1bmRlZmluZWQgfSxcbiAgW2FjdGlvbiwgcmVkdWNlcl06IFtWLCBBY3Rpb25SZWR1Y2VyPFQsIFY+XVxuKTogU3RhdGVBY3Rpb25QYWlyPFQsIFY+IHtcbiAgY29uc3QgeyBzdGF0ZSB9ID0gc3RhdGVBY3Rpb25QYWlyO1xuICByZXR1cm4geyBzdGF0ZTogcmVkdWNlcihzdGF0ZSwgYWN0aW9uKSwgYWN0aW9uIH07XG59XG5cbmV4cG9ydCBjb25zdCBTVEFURV9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIFN0YXRlLFxuICB7IHByb3ZpZGU6IFN0YXRlT2JzZXJ2YWJsZSwgdXNlRXhpc3Rpbmc6IFN0YXRlIH0sXG5dO1xuIl19