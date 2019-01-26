/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, Inject, Optional } from '@angular/core';
import { Store, StoreRootModule, StoreFeatureModule, } from '@ngrx/store';
import { EffectsRunner } from './effects_runner';
import { EffectSources } from './effect_sources';
import { ROOT_EFFECTS } from './tokens';
/** @type {?} */
export const ROOT_EFFECTS_INIT = '@ngrx/effects/init';
export class EffectsRootModule {
    /**
     * @param {?} sources
     * @param {?} runner
     * @param {?} store
     * @param {?} rootEffects
     * @param {?} storeRootModule
     * @param {?} storeFeatureModule
     */
    constructor(sources, runner, store, rootEffects, storeRootModule, storeFeatureModule) {
        this.sources = sources;
        runner.start();
        rootEffects.forEach(effectSourceInstance => sources.addEffects(effectSourceInstance));
        store.dispatch({ type: ROOT_EFFECTS_INIT });
    }
    /**
     * @param {?} effectSourceInstance
     * @return {?}
     */
    addEffects(effectSourceInstance) {
        this.sources.addEffects(effectSourceInstance);
    }
}
EffectsRootModule.decorators = [
    { type: NgModule, args: [{},] }
];
/** @nocollapse */
EffectsRootModule.ctorParameters = () => [
    { type: EffectSources },
    { type: EffectsRunner },
    { type: Store },
    { type: Array, decorators: [{ type: Inject, args: [ROOT_EFFECTS,] }] },
    { type: StoreRootModule, decorators: [{ type: Optional }] },
    { type: StoreFeatureModule, decorators: [{ type: Optional }] }
];
if (false) {
    /** @type {?} */
    EffectsRootModule.prototype.sources;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19yb290X21vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zcmMvZWZmZWN0c19yb290X21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFFTCxLQUFLLEVBQ0wsZUFBZSxFQUNmLGtCQUFrQixHQUNuQixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxVQUFVLENBQUM7O0FBRXhDLGFBQWEsaUJBQWlCLEdBQUcsb0JBQW9CLENBQUM7QUFHdEQsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7Ozs7O0lBQzVCLFlBQ1UsU0FDUixNQUFxQixFQUNyQixLQUFpQixFQUNLLFdBQWtCLEVBQzVCLGVBQWdDLEVBQ2hDLGtCQUFzQztRQUwxQyxZQUFPLEdBQVAsT0FBTztRQU9mLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVmLFdBQVcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUN6QyxPQUFPLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQ3pDLENBQUM7UUFFRixLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQztLQUM3Qzs7Ozs7SUFFRCxVQUFVLENBQUMsb0JBQXlCO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7S0FDL0M7OztZQXJCRixRQUFRLFNBQUMsRUFBRTs7OztZQUxILGFBQWE7WUFEYixhQUFhO1lBSnBCLEtBQUs7d0NBZ0JGLE1BQU0sU0FBQyxZQUFZO1lBZnRCLGVBQWUsdUJBZ0JaLFFBQVE7WUFmWCxrQkFBa0IsdUJBZ0JmLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgU3RvcmVNb2R1bGUsXG4gIFN0b3JlLFxuICBTdG9yZVJvb3RNb2R1bGUsXG4gIFN0b3JlRmVhdHVyZU1vZHVsZSxcbn0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgRWZmZWN0c1J1bm5lciB9IGZyb20gJy4vZWZmZWN0c19ydW5uZXInO1xuaW1wb3J0IHsgRWZmZWN0U291cmNlcyB9IGZyb20gJy4vZWZmZWN0X3NvdXJjZXMnO1xuaW1wb3J0IHsgUk9PVF9FRkZFQ1RTIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgY29uc3QgUk9PVF9FRkZFQ1RTX0lOSVQgPSAnQG5ncngvZWZmZWN0cy9pbml0JztcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIEVmZmVjdHNSb290TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzb3VyY2VzOiBFZmZlY3RTb3VyY2VzLFxuICAgIHJ1bm5lcjogRWZmZWN0c1J1bm5lcixcbiAgICBzdG9yZTogU3RvcmU8YW55PixcbiAgICBASW5qZWN0KFJPT1RfRUZGRUNUUykgcm9vdEVmZmVjdHM6IGFueVtdLFxuICAgIEBPcHRpb25hbCgpIHN0b3JlUm9vdE1vZHVsZTogU3RvcmVSb290TW9kdWxlLFxuICAgIEBPcHRpb25hbCgpIHN0b3JlRmVhdHVyZU1vZHVsZTogU3RvcmVGZWF0dXJlTW9kdWxlXG4gICkge1xuICAgIHJ1bm5lci5zdGFydCgpO1xuXG4gICAgcm9vdEVmZmVjdHMuZm9yRWFjaChlZmZlY3RTb3VyY2VJbnN0YW5jZSA9PlxuICAgICAgc291cmNlcy5hZGRFZmZlY3RzKGVmZmVjdFNvdXJjZUluc3RhbmNlKVxuICAgICk7XG5cbiAgICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6IFJPT1RfRUZGRUNUU19JTklUIH0pO1xuICB9XG5cbiAgYWRkRWZmZWN0cyhlZmZlY3RTb3VyY2VJbnN0YW5jZTogYW55KSB7XG4gICAgdGhpcy5zb3VyY2VzLmFkZEVmZmVjdHMoZWZmZWN0U291cmNlSW5zdGFuY2UpO1xuICB9XG59XG4iXX0=