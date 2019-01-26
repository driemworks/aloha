/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ErrorHandler, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { dematerialize, exhaustMap, filter, groupBy, map, mergeMap, } from 'rxjs/operators';
import { verifyOutput } from './effect_notification';
import { mergeEffects } from './effects_resolver';
import { getSourceForInstance } from './effects_metadata';
import { onIdentifyEffectsKey, onRunEffectsKey, onInitEffects, } from './lifecycle_hooks';
export class EffectSources extends Subject {
    /**
     * @param {?} errorHandler
     * @param {?} store
     */
    constructor(errorHandler, store) {
        super();
        this.errorHandler = errorHandler;
        this.store = store;
    }
    /**
     * @param {?} effectSourceInstance
     * @return {?}
     */
    addEffects(effectSourceInstance) {
        this.next(effectSourceInstance);
        if (onInitEffects in effectSourceInstance &&
            typeof effectSourceInstance[onInitEffects] === 'function') {
            this.store.dispatch(effectSourceInstance[onInitEffects]());
        }
    }
    /**
     * \@internal
     * @return {?}
     */
    toActions() {
        return this.pipe(groupBy(getSourceForInstance), mergeMap(source$ => source$.pipe(groupBy(effectsInstance))), mergeMap(source$ => source$.pipe(exhaustMap(resolveEffectSource), map(output => {
            verifyOutput(output, this.errorHandler);
            return output.notification;
        }), filter((notification) => notification.kind === 'N'), dematerialize())));
    }
}
EffectSources.decorators = [
    { type: Injectable }
];
/** @nocollapse */
EffectSources.ctorParameters = () => [
    { type: ErrorHandler },
    { type: Store }
];
if (false) {
    /** @type {?} */
    EffectSources.prototype.errorHandler;
    /** @type {?} */
    EffectSources.prototype.store;
}
/**
 * @param {?} sourceInstance
 * @return {?}
 */
function effectsInstance(sourceInstance) {
    if (onIdentifyEffectsKey in sourceInstance &&
        typeof sourceInstance[onIdentifyEffectsKey] === 'function') {
        return sourceInstance[onIdentifyEffectsKey]();
    }
    return '';
}
/**
 * @param {?} sourceInstance
 * @return {?}
 */
function resolveEffectSource(sourceInstance) {
    /** @type {?} */
    const mergedEffects$ = mergeEffects(sourceInstance);
    if (isOnRunEffects(sourceInstance)) {
        return sourceInstance.ngrxOnRunEffects(mergedEffects$);
    }
    return mergedEffects$;
}
/**
 * @param {?} sourceInstance
 * @return {?}
 */
function isOnRunEffects(sourceInstance) {
    /** @type {?} */
    const source = getSourceForInstance(sourceInstance);
    return (onRunEffectsKey in source && typeof source[onRunEffectsKey] === 'function');
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0X3NvdXJjZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VmZmVjdHMvc3JjL2VmZmVjdF9zb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQVUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBNEIsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFDTCxhQUFhLEVBQ2IsVUFBVSxFQUNWLE1BQU0sRUFDTixPQUFPLEVBQ1AsR0FBRyxFQUNILFFBQVEsR0FDVCxNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDMUQsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixlQUFlLEVBR2YsYUFBYSxHQUNkLE1BQU0sbUJBQW1CLENBQUM7QUFHM0IsTUFBTSxPQUFPLGFBQWMsU0FBUSxPQUFZOzs7OztJQUM3QyxZQUFvQixZQUEwQixFQUFVLEtBQWlCO1FBQ3ZFLEtBQUssRUFBRSxDQUFDO1FBRFUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFZO0tBRXhFOzs7OztJQUVELFVBQVUsQ0FBQyxvQkFBeUI7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRWhDLElBQ0UsYUFBYSxJQUFJLG9CQUFvQjtZQUNyQyxPQUFPLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxLQUFLLFVBQVUsRUFDekQ7WUFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUQ7S0FDRjs7Ozs7SUFLRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUNkLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxFQUM3QixRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQzNELFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUNqQixPQUFPLENBQUMsSUFBSSxDQUNWLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUMvQixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDWCxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUV4QyxPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUM7U0FDNUIsQ0FBQyxFQUNGLE1BQU0sQ0FDSixDQUFDLFlBQVksRUFBd0MsRUFBRSxDQUNyRCxZQUFZLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FDNUIsRUFDRCxhQUFhLEVBQUUsQ0FDaEIsQ0FDRixDQUNGLENBQUM7S0FDSDs7O1lBeENGLFVBQVU7Ozs7WUF2QkYsWUFBWTtZQUNKLEtBQUs7Ozs7Ozs7Ozs7OztBQWlFdEIsU0FBUyxlQUFlLENBQUMsY0FBbUI7SUFDMUMsSUFDRSxvQkFBb0IsSUFBSSxjQUFjO1FBQ3RDLE9BQU8sY0FBYyxDQUFDLG9CQUFvQixDQUFDLEtBQUssVUFBVSxFQUMxRDtRQUNBLE9BQU8sY0FBYyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQztLQUMvQztJQUVELE9BQU8sRUFBRSxDQUFDO0NBQ1g7Ozs7O0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxjQUFtQjs7SUFDOUMsTUFBTSxjQUFjLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXBELElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQ2xDLE9BQU8sY0FBYyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ3hEO0lBRUQsT0FBTyxjQUFjLENBQUM7Q0FDdkI7Ozs7O0FBRUQsU0FBUyxjQUFjLENBQUMsY0FFdkI7O0lBQ0MsTUFBTSxNQUFNLEdBQUcsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFcEQsT0FBTyxDQUNMLGVBQWUsSUFBSSxNQUFNLElBQUksT0FBTyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssVUFBVSxDQUMzRSxDQUFDO0NBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbiwgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb24sIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRlbWF0ZXJpYWxpemUsXG4gIGV4aGF1c3RNYXAsXG4gIGZpbHRlcixcbiAgZ3JvdXBCeSxcbiAgbWFwLFxuICBtZXJnZU1hcCxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyB2ZXJpZnlPdXRwdXQgfSBmcm9tICcuL2VmZmVjdF9ub3RpZmljYXRpb24nO1xuaW1wb3J0IHsgbWVyZ2VFZmZlY3RzIH0gZnJvbSAnLi9lZmZlY3RzX3Jlc29sdmVyJztcbmltcG9ydCB7IGdldFNvdXJjZUZvckluc3RhbmNlIH0gZnJvbSAnLi9lZmZlY3RzX21ldGFkYXRhJztcbmltcG9ydCB7XG4gIG9uSWRlbnRpZnlFZmZlY3RzS2V5LFxuICBvblJ1bkVmZmVjdHNLZXksXG4gIG9uUnVuRWZmZWN0c0ZuLFxuICBPblJ1bkVmZmVjdHMsXG4gIG9uSW5pdEVmZmVjdHMsXG59IGZyb20gJy4vbGlmZWN5Y2xlX2hvb2tzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVmZmVjdFNvdXJjZXMgZXh0ZW5kcyBTdWJqZWN0PGFueT4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyLCBwcml2YXRlIHN0b3JlOiBTdG9yZTxhbnk+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGFkZEVmZmVjdHMoZWZmZWN0U291cmNlSW5zdGFuY2U6IGFueSkge1xuICAgIHRoaXMubmV4dChlZmZlY3RTb3VyY2VJbnN0YW5jZSk7XG5cbiAgICBpZiAoXG4gICAgICBvbkluaXRFZmZlY3RzIGluIGVmZmVjdFNvdXJjZUluc3RhbmNlICYmXG4gICAgICB0eXBlb2YgZWZmZWN0U291cmNlSW5zdGFuY2Vbb25Jbml0RWZmZWN0c10gPT09ICdmdW5jdGlvbidcbiAgICApIHtcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZWZmZWN0U291cmNlSW5zdGFuY2Vbb25Jbml0RWZmZWN0c10oKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgdG9BY3Rpb25zKCk6IE9ic2VydmFibGU8QWN0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMucGlwZShcbiAgICAgIGdyb3VwQnkoZ2V0U291cmNlRm9ySW5zdGFuY2UpLFxuICAgICAgbWVyZ2VNYXAoc291cmNlJCA9PiBzb3VyY2UkLnBpcGUoZ3JvdXBCeShlZmZlY3RzSW5zdGFuY2UpKSksXG4gICAgICBtZXJnZU1hcChzb3VyY2UkID0+XG4gICAgICAgIHNvdXJjZSQucGlwZShcbiAgICAgICAgICBleGhhdXN0TWFwKHJlc29sdmVFZmZlY3RTb3VyY2UpLFxuICAgICAgICAgIG1hcChvdXRwdXQgPT4ge1xuICAgICAgICAgICAgdmVyaWZ5T3V0cHV0KG91dHB1dCwgdGhpcy5lcnJvckhhbmRsZXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0Lm5vdGlmaWNhdGlvbjtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAobm90aWZpY2F0aW9uKTogbm90aWZpY2F0aW9uIGlzIE5vdGlmaWNhdGlvbjxBY3Rpb24+ID0+XG4gICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5raW5kID09PSAnTidcbiAgICAgICAgICApLFxuICAgICAgICAgIGRlbWF0ZXJpYWxpemUoKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlZmZlY3RzSW5zdGFuY2Uoc291cmNlSW5zdGFuY2U6IGFueSkge1xuICBpZiAoXG4gICAgb25JZGVudGlmeUVmZmVjdHNLZXkgaW4gc291cmNlSW5zdGFuY2UgJiZcbiAgICB0eXBlb2Ygc291cmNlSW5zdGFuY2Vbb25JZGVudGlmeUVmZmVjdHNLZXldID09PSAnZnVuY3Rpb24nXG4gICkge1xuICAgIHJldHVybiBzb3VyY2VJbnN0YW5jZVtvbklkZW50aWZ5RWZmZWN0c0tleV0oKTtcbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUVmZmVjdFNvdXJjZShzb3VyY2VJbnN0YW5jZTogYW55KSB7XG4gIGNvbnN0IG1lcmdlZEVmZmVjdHMkID0gbWVyZ2VFZmZlY3RzKHNvdXJjZUluc3RhbmNlKTtcblxuICBpZiAoaXNPblJ1bkVmZmVjdHMoc291cmNlSW5zdGFuY2UpKSB7XG4gICAgcmV0dXJuIHNvdXJjZUluc3RhbmNlLm5ncnhPblJ1bkVmZmVjdHMobWVyZ2VkRWZmZWN0cyQpO1xuICB9XG5cbiAgcmV0dXJuIG1lcmdlZEVmZmVjdHMkO1xufVxuXG5mdW5jdGlvbiBpc09uUnVuRWZmZWN0cyhzb3VyY2VJbnN0YW5jZToge1xuICBbb25SdW5FZmZlY3RzS2V5XT86IG9uUnVuRWZmZWN0c0ZuO1xufSk6IHNvdXJjZUluc3RhbmNlIGlzIE9uUnVuRWZmZWN0cyB7XG4gIGNvbnN0IHNvdXJjZSA9IGdldFNvdXJjZUZvckluc3RhbmNlKHNvdXJjZUluc3RhbmNlKTtcblxuICByZXR1cm4gKFxuICAgIG9uUnVuRWZmZWN0c0tleSBpbiBzb3VyY2UgJiYgdHlwZW9mIHNvdXJjZVtvblJ1bkVmZmVjdHNLZXldID09PSAnZnVuY3Rpb24nXG4gICk7XG59XG4iXX0=