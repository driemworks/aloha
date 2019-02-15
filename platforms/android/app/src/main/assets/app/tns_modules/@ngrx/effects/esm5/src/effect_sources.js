var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ErrorHandler, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { dematerialize, exhaustMap, filter, groupBy, map, mergeMap, } from 'rxjs/operators';
import { verifyOutput } from './effect_notification';
import { mergeEffects } from './effects_resolver';
import { getSourceForInstance } from './effects_metadata';
import { onIdentifyEffectsKey, onRunEffectsKey, onInitEffects, } from './lifecycle_hooks';
var EffectSources = /** @class */ (function (_super) {
    __extends(EffectSources, _super);
    function EffectSources(errorHandler, store) {
        var _this = _super.call(this) || this;
        _this.errorHandler = errorHandler;
        _this.store = store;
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
        return this.pipe(groupBy(getSourceForInstance), mergeMap(function (source$) { return source$.pipe(groupBy(effectsInstance)); }), mergeMap(function (source$) {
            return source$.pipe(exhaustMap(resolveEffectSource), map(function (output) {
                verifyOutput(output, _this.errorHandler);
                return output.notification;
            }), filter(function (notification) {
                return notification.kind === 'N';
            }), dematerialize());
        }));
    };
    EffectSources = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ErrorHandler, Store])
    ], EffectSources);
    return EffectSources;
}(Subject));
export { EffectSources };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0X3NvdXJjZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VmZmVjdHMvc3JjL2VmZmVjdF9zb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQVUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBNEIsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFDTCxhQUFhLEVBQ2IsVUFBVSxFQUNWLE1BQU0sRUFDTixPQUFPLEVBQ1AsR0FBRyxFQUNILFFBQVEsR0FDVCxNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDMUQsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixlQUFlLEVBR2YsYUFBYSxHQUNkLE1BQU0sbUJBQW1CLENBQUM7QUFHM0I7SUFBbUMsaUNBQVk7SUFDN0MsdUJBQW9CLFlBQTBCLEVBQVUsS0FBaUI7UUFBekUsWUFDRSxpQkFBTyxTQUNSO1FBRm1CLGtCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsV0FBSyxHQUFMLEtBQUssQ0FBWTs7SUFFekUsQ0FBQztJQUVELGtDQUFVLEdBQVYsVUFBVyxvQkFBeUI7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRWhDLElBQ0UsYUFBYSxJQUFJLG9CQUFvQjtZQUNyQyxPQUFPLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxLQUFLLFVBQVUsRUFDekQ7WUFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUQ7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxpQ0FBUyxHQUFUO1FBQUEsaUJBb0JDO1FBbkJDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FDZCxPQUFPLENBQUMsb0JBQW9CLENBQUMsRUFDN0IsUUFBUSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQyxFQUMzRCxRQUFRLENBQUMsVUFBQSxPQUFPO1lBQ2QsT0FBQSxPQUFPLENBQUMsSUFBSSxDQUNWLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUMvQixHQUFHLENBQUMsVUFBQSxNQUFNO2dCQUNSLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUV4QyxPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDN0IsQ0FBQyxDQUFDLEVBQ0YsTUFBTSxDQUNKLFVBQUMsWUFBWTtnQkFDWCxPQUFBLFlBQVksQ0FBQyxJQUFJLEtBQUssR0FBRztZQUF6QixDQUF5QixDQUM1QixFQUNELGFBQWEsRUFBRSxDQUNoQjtRQVpELENBWUMsQ0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBdkNVLGFBQWE7UUFEekIsVUFBVSxFQUFFO3lDQUV1QixZQUFZLEVBQWlCLEtBQUs7T0FEekQsYUFBYSxDQXdDekI7SUFBRCxvQkFBQztDQUFBLEFBeENELENBQW1DLE9BQU8sR0F3Q3pDO1NBeENZLGFBQWE7QUEwQzFCLFNBQVMsZUFBZSxDQUFDLGNBQW1CO0lBQzFDLElBQ0Usb0JBQW9CLElBQUksY0FBYztRQUN0QyxPQUFPLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLFVBQVUsRUFDMUQ7UUFDQSxPQUFPLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUM7S0FDL0M7SUFFRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFFRCxTQUFTLG1CQUFtQixDQUFDLGNBQW1CO0lBQzlDLElBQU0sY0FBYyxHQUFHLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVwRCxJQUFJLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUNsQyxPQUFPLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztLQUN4RDtJQUVELE9BQU8sY0FBYyxDQUFDO0FBQ3hCLENBQUM7QUFFRCxTQUFTLGNBQWMsQ0FBQyxjQUV2QjtJQUNDLElBQU0sTUFBTSxHQUFHLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXBELE9BQU8sQ0FDTCxlQUFlLElBQUksTUFBTSxJQUFJLE9BQU8sTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLFVBQVUsQ0FDM0UsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbiwgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb24sIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRlbWF0ZXJpYWxpemUsXG4gIGV4aGF1c3RNYXAsXG4gIGZpbHRlcixcbiAgZ3JvdXBCeSxcbiAgbWFwLFxuICBtZXJnZU1hcCxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyB2ZXJpZnlPdXRwdXQgfSBmcm9tICcuL2VmZmVjdF9ub3RpZmljYXRpb24nO1xuaW1wb3J0IHsgbWVyZ2VFZmZlY3RzIH0gZnJvbSAnLi9lZmZlY3RzX3Jlc29sdmVyJztcbmltcG9ydCB7IGdldFNvdXJjZUZvckluc3RhbmNlIH0gZnJvbSAnLi9lZmZlY3RzX21ldGFkYXRhJztcbmltcG9ydCB7XG4gIG9uSWRlbnRpZnlFZmZlY3RzS2V5LFxuICBvblJ1bkVmZmVjdHNLZXksXG4gIG9uUnVuRWZmZWN0c0ZuLFxuICBPblJ1bkVmZmVjdHMsXG4gIG9uSW5pdEVmZmVjdHMsXG59IGZyb20gJy4vbGlmZWN5Y2xlX2hvb2tzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVmZmVjdFNvdXJjZXMgZXh0ZW5kcyBTdWJqZWN0PGFueT4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyLCBwcml2YXRlIHN0b3JlOiBTdG9yZTxhbnk+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGFkZEVmZmVjdHMoZWZmZWN0U291cmNlSW5zdGFuY2U6IGFueSkge1xuICAgIHRoaXMubmV4dChlZmZlY3RTb3VyY2VJbnN0YW5jZSk7XG5cbiAgICBpZiAoXG4gICAgICBvbkluaXRFZmZlY3RzIGluIGVmZmVjdFNvdXJjZUluc3RhbmNlICYmXG4gICAgICB0eXBlb2YgZWZmZWN0U291cmNlSW5zdGFuY2Vbb25Jbml0RWZmZWN0c10gPT09ICdmdW5jdGlvbidcbiAgICApIHtcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZWZmZWN0U291cmNlSW5zdGFuY2Vbb25Jbml0RWZmZWN0c10oKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgdG9BY3Rpb25zKCk6IE9ic2VydmFibGU8QWN0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMucGlwZShcbiAgICAgIGdyb3VwQnkoZ2V0U291cmNlRm9ySW5zdGFuY2UpLFxuICAgICAgbWVyZ2VNYXAoc291cmNlJCA9PiBzb3VyY2UkLnBpcGUoZ3JvdXBCeShlZmZlY3RzSW5zdGFuY2UpKSksXG4gICAgICBtZXJnZU1hcChzb3VyY2UkID0+XG4gICAgICAgIHNvdXJjZSQucGlwZShcbiAgICAgICAgICBleGhhdXN0TWFwKHJlc29sdmVFZmZlY3RTb3VyY2UpLFxuICAgICAgICAgIG1hcChvdXRwdXQgPT4ge1xuICAgICAgICAgICAgdmVyaWZ5T3V0cHV0KG91dHB1dCwgdGhpcy5lcnJvckhhbmRsZXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0Lm5vdGlmaWNhdGlvbjtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAobm90aWZpY2F0aW9uKTogbm90aWZpY2F0aW9uIGlzIE5vdGlmaWNhdGlvbjxBY3Rpb24+ID0+XG4gICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5raW5kID09PSAnTidcbiAgICAgICAgICApLFxuICAgICAgICAgIGRlbWF0ZXJpYWxpemUoKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlZmZlY3RzSW5zdGFuY2Uoc291cmNlSW5zdGFuY2U6IGFueSkge1xuICBpZiAoXG4gICAgb25JZGVudGlmeUVmZmVjdHNLZXkgaW4gc291cmNlSW5zdGFuY2UgJiZcbiAgICB0eXBlb2Ygc291cmNlSW5zdGFuY2Vbb25JZGVudGlmeUVmZmVjdHNLZXldID09PSAnZnVuY3Rpb24nXG4gICkge1xuICAgIHJldHVybiBzb3VyY2VJbnN0YW5jZVtvbklkZW50aWZ5RWZmZWN0c0tleV0oKTtcbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUVmZmVjdFNvdXJjZShzb3VyY2VJbnN0YW5jZTogYW55KSB7XG4gIGNvbnN0IG1lcmdlZEVmZmVjdHMkID0gbWVyZ2VFZmZlY3RzKHNvdXJjZUluc3RhbmNlKTtcblxuICBpZiAoaXNPblJ1bkVmZmVjdHMoc291cmNlSW5zdGFuY2UpKSB7XG4gICAgcmV0dXJuIHNvdXJjZUluc3RhbmNlLm5ncnhPblJ1bkVmZmVjdHMobWVyZ2VkRWZmZWN0cyQpO1xuICB9XG5cbiAgcmV0dXJuIG1lcmdlZEVmZmVjdHMkO1xufVxuXG5mdW5jdGlvbiBpc09uUnVuRWZmZWN0cyhzb3VyY2VJbnN0YW5jZToge1xuICBbb25SdW5FZmZlY3RzS2V5XT86IG9uUnVuRWZmZWN0c0ZuO1xufSk6IHNvdXJjZUluc3RhbmNlIGlzIE9uUnVuRWZmZWN0cyB7XG4gIGNvbnN0IHNvdXJjZSA9IGdldFNvdXJjZUZvckluc3RhbmNlKHNvdXJjZUluc3RhbmNlKTtcblxuICByZXR1cm4gKFxuICAgIG9uUnVuRWZmZWN0c0tleSBpbiBzb3VyY2UgJiYgdHlwZW9mIHNvdXJjZVtvblJ1bkVmZmVjdHNLZXldID09PSAnZnVuY3Rpb24nXG4gICk7XG59XG4iXX0=