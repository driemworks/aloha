var __read = (this && this.__read) || function (o, n) {
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { merge } from 'rxjs';
import { ignoreElements, map, materialize } from 'rxjs/operators';
import { getSourceForInstance, getSourceMetadata } from './effects_metadata';
export function mergeEffects(sourceInstance) {
    var sourceName = getSourceForInstance(sourceInstance).constructor.name;
    var observables = getSourceMetadata(sourceInstance).map(function (_a) {
        var propertyName = _a.propertyName, dispatch = _a.dispatch;
        var observable = typeof sourceInstance[propertyName] === 'function'
            ? sourceInstance[propertyName]()
            : sourceInstance[propertyName];
        if (dispatch === false) {
            return observable.pipe(ignoreElements());
        }
        var materialized$ = observable.pipe(materialize());
        return materialized$.pipe(map(function (notification) { return ({
            effect: sourceInstance[propertyName],
            notification: notification,
            propertyName: propertyName,
            sourceName: sourceName,
            sourceInstance: sourceInstance,
        }); }));
    });
    return merge.apply(void 0, __spread(observables));
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zcmMvZWZmZWN0c19yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBRSxLQUFLLEVBQTRCLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTdFLE1BQU0sVUFBVSxZQUFZLENBQzFCLGNBQW1CO0lBRW5CLElBQU0sVUFBVSxHQUFHLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFFekUsSUFBTSxXQUFXLEdBQXNCLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FDMUUsVUFBQyxFQUEwQjtZQUF4Qiw4QkFBWSxFQUFFLHNCQUFRO1FBQ3ZCLElBQU0sVUFBVSxHQUNkLE9BQU8sY0FBYyxDQUFDLFlBQVksQ0FBQyxLQUFLLFVBQVU7WUFDaEQsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNoQyxDQUFDLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRW5DLElBQUksUUFBUSxLQUFLLEtBQUssRUFBRTtZQUN0QixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUMxQztRQUVELElBQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUVyRCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQ3ZCLEdBQUcsQ0FDRCxVQUFDLFlBQWtDLElBQXlCLE9BQUEsQ0FBQztZQUMzRCxNQUFNLEVBQUUsY0FBYyxDQUFDLFlBQVksQ0FBQztZQUNwQyxZQUFZLGNBQUE7WUFDWixZQUFZLGNBQUE7WUFDWixVQUFVLFlBQUE7WUFDVixjQUFjLGdCQUFBO1NBQ2YsQ0FBQyxFQU4wRCxDQU0xRCxDQUNILENBQ0YsQ0FBQztJQUNKLENBQUMsQ0FDRixDQUFDO0lBRUYsT0FBTyxLQUFLLHdCQUFJLFdBQVcsR0FBRTtBQUMvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIE5vdGlmaWNhdGlvbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgaWdub3JlRWxlbWVudHMsIG1hcCwgbWF0ZXJpYWxpemUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEVmZmVjdE5vdGlmaWNhdGlvbiB9IGZyb20gJy4vZWZmZWN0X25vdGlmaWNhdGlvbic7XG5pbXBvcnQgeyBnZXRTb3VyY2VGb3JJbnN0YW5jZSwgZ2V0U291cmNlTWV0YWRhdGEgfSBmcm9tICcuL2VmZmVjdHNfbWV0YWRhdGEnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VFZmZlY3RzKFxuICBzb3VyY2VJbnN0YW5jZTogYW55XG4pOiBPYnNlcnZhYmxlPEVmZmVjdE5vdGlmaWNhdGlvbj4ge1xuICBjb25zdCBzb3VyY2VOYW1lID0gZ2V0U291cmNlRm9ySW5zdGFuY2Uoc291cmNlSW5zdGFuY2UpLmNvbnN0cnVjdG9yLm5hbWU7XG5cbiAgY29uc3Qgb2JzZXJ2YWJsZXM6IE9ic2VydmFibGU8YW55PltdID0gZ2V0U291cmNlTWV0YWRhdGEoc291cmNlSW5zdGFuY2UpLm1hcChcbiAgICAoeyBwcm9wZXJ0eU5hbWUsIGRpc3BhdGNoIH0pOiBPYnNlcnZhYmxlPEVmZmVjdE5vdGlmaWNhdGlvbj4gPT4ge1xuICAgICAgY29uc3Qgb2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+ID1cbiAgICAgICAgdHlwZW9mIHNvdXJjZUluc3RhbmNlW3Byb3BlcnR5TmFtZV0gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHNvdXJjZUluc3RhbmNlW3Byb3BlcnR5TmFtZV0oKVxuICAgICAgICAgIDogc291cmNlSW5zdGFuY2VbcHJvcGVydHlOYW1lXTtcblxuICAgICAgaWYgKGRpc3BhdGNoID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5waXBlKGlnbm9yZUVsZW1lbnRzKCkpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXRlcmlhbGl6ZWQkID0gb2JzZXJ2YWJsZS5waXBlKG1hdGVyaWFsaXplKCkpO1xuXG4gICAgICByZXR1cm4gbWF0ZXJpYWxpemVkJC5waXBlKFxuICAgICAgICBtYXAoXG4gICAgICAgICAgKG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uPEFjdGlvbj4pOiBFZmZlY3ROb3RpZmljYXRpb24gPT4gKHtcbiAgICAgICAgICAgIGVmZmVjdDogc291cmNlSW5zdGFuY2VbcHJvcGVydHlOYW1lXSxcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbixcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZSxcbiAgICAgICAgICAgIHNvdXJjZU5hbWUsXG4gICAgICAgICAgICBzb3VyY2VJbnN0YW5jZSxcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbWVyZ2UoLi4ub2JzZXJ2YWJsZXMpO1xufVxuIl19