/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { merge } from 'rxjs';
import { ignoreElements, map, materialize } from 'rxjs/operators';
import { getSourceForInstance, getSourceMetadata } from './effects_metadata';
/**
 * @param {?} sourceInstance
 * @return {?}
 */
export function mergeEffects(sourceInstance) {
    /** @type {?} */
    const sourceName = getSourceForInstance(sourceInstance).constructor.name;
    /** @type {?} */
    const observables = getSourceMetadata(sourceInstance).map(({ propertyName, dispatch }) => {
        /** @type {?} */
        const observable = typeof sourceInstance[propertyName] === 'function'
            ? sourceInstance[propertyName]()
            : sourceInstance[propertyName];
        if (dispatch === false) {
            return observable.pipe(ignoreElements());
        }
        /** @type {?} */
        const materialized$ = observable.pipe(materialize());
        return materialized$.pipe(map((notification) => ({
            effect: sourceInstance[propertyName],
            notification,
            propertyName,
            sourceName,
            sourceInstance,
        })));
    });
    return merge(...observables);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zcmMvZWZmZWN0c19yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLEtBQUssRUFBNEIsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7O0FBRTdFLE1BQU0sVUFBVSxZQUFZLENBQzFCLGNBQW1COztJQUVuQixNQUFNLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDOztJQUV6RSxNQUFNLFdBQVcsR0FBc0IsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUMxRSxDQUFDLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxFQUFrQyxFQUFFOztRQUM3RCxNQUFNLFVBQVUsR0FDZCxPQUFPLGNBQWMsQ0FBQyxZQUFZLENBQUMsS0FBSyxVQUFVO1lBQ2hELENBQUMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDaEMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVuQyxJQUFJLFFBQVEsS0FBSyxLQUFLLEVBQUU7WUFDdEIsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7U0FDMUM7O1FBRUQsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRXJELE9BQU8sYUFBYSxDQUFDLElBQUksQ0FDdkIsR0FBRyxDQUNELENBQUMsWUFBa0MsRUFBc0IsRUFBRSxDQUFDLENBQUM7WUFDM0QsTUFBTSxFQUFFLGNBQWMsQ0FBQyxZQUFZLENBQUM7WUFDcEMsWUFBWTtZQUNaLFlBQVk7WUFDWixVQUFVO1lBQ1YsY0FBYztTQUNmLENBQUMsQ0FDSCxDQUNGLENBQUM7S0FDSCxDQUNGLENBQUM7SUFFRixPQUFPLEtBQUssQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDO0NBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIE5vdGlmaWNhdGlvbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgaWdub3JlRWxlbWVudHMsIG1hcCwgbWF0ZXJpYWxpemUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEVmZmVjdE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vZWZmZWN0X25vdGlmaWNhdGlvbic7XG5pbXBvcnQgeyBnZXRTb3VyY2VGb3JJbnN0YW5jZSwgZ2V0U291cmNlTWV0YWRhdGEgfSBmcm9tICcuL2VmZmVjdHNfbWV0YWRhdGEnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VFZmZlY3RzKFxuICBzb3VyY2VJbnN0YW5jZTogYW55XG4pOiBPYnNlcnZhYmxlPEVmZmVjdE5vdGlmaWNhdGlvbj4ge1xuICBjb25zdCBzb3VyY2VOYW1lID0gZ2V0U291cmNlRm9ySW5zdGFuY2Uoc291cmNlSW5zdGFuY2UpLmNvbnN0cnVjdG9yLm5hbWU7XG5cbiAgY29uc3Qgb2JzZXJ2YWJsZXM6IE9ic2VydmFibGU8YW55PltdID0gZ2V0U291cmNlTWV0YWRhdGEoc291cmNlSW5zdGFuY2UpLm1hcChcbiAgICAoeyBwcm9wZXJ0eU5hbWUsIGRpc3BhdGNoIH0pOiBPYnNlcnZhYmxlPEVmZmVjdE5vdGlmaWNhdGlvbj4gPT4ge1xuICAgICAgY29uc3Qgb2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+ID1cbiAgICAgICAgdHlwZW9mIHNvdXJjZUluc3RhbmNlW3Byb3BlcnR5TmFtZV0gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHNvdXJjZUluc3RhbmNlW3Byb3BlcnR5TmFtZV0oKVxuICAgICAgICAgIDogc291cmNlSW5zdGFuY2VbcHJvcGVydHlOYW1lXTtcblxuICAgICAgaWYgKGRpc3BhdGNoID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKGlnbm9yZUVsZW1lbnRzKCkpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXRlcmlhbGl6ZWQkID0gb2JzZXJ2YWJsZS5waXBlKG1hdGVyaWFsaXplKCkpO1xuXG4gICAgICByZXR1cm4gbWF0ZXJpYWxpemVkJC5waXBlKFxuICAgICAgICBtYXAoXG4gICAgICAgICAgKG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uPEFjdGlvbj4pOiBFZmZlY3ROb3RpZmljYXRpb24gPT4gKHtcbiAgICAgICAgICAgIGVmZmVjdDogc291cmNlSW5zdGFuY2VbcHJvcGVydHlOYW1lXSxcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbixcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZSxcbiAgICAgICAgICAgIHNvdXJjZU5hbWUsXG4gICAgICAgICAgICBzb3VyY2VJbnN0YW5jZSxcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbWVyZ2UoLi4ub2JzZXJ2YWJsZXMpO1xufVxuIl19