/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { EffectSources } from './effect_sources';
import { Actions } from './actions';
import { ROOT_EFFECTS, FEATURE_EFFECTS } from './tokens';
import { EffectsFeatureModule } from './effects_feature_module';
import { EffectsRootModule } from './effects_root_module';
import { EffectsRunner } from './effects_runner';
export class EffectsModule {
    /**
     * @param {?} featureEffects
     * @return {?}
     */
    static forFeature(featureEffects) {
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
    }
    /**
     * @param {?} rootEffects
     * @return {?}
     */
    static forRoot(rootEffects) {
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
    }
}
EffectsModule.decorators = [
    { type: NgModule, args: [{},] }
];
/**
 * @param {...?} instances
 * @return {?}
 */
export function createSourceInstances(...instances) {
    return instances;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VmZmVjdHMvc3JjL2VmZmVjdHNfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUE2QixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFHakQsTUFBTSxPQUFPLGFBQWE7Ozs7O0lBQ3hCLE1BQU0sQ0FBQyxVQUFVLENBQ2YsY0FBMkI7UUFFM0IsT0FBTztZQUNMLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsU0FBUyxFQUFFO2dCQUNULGNBQWM7Z0JBQ2Q7b0JBQ0UsT0FBTyxFQUFFLGVBQWU7b0JBQ3hCLEtBQUssRUFBRSxJQUFJO29CQUNYLElBQUksRUFBRSxjQUFjO29CQUNwQixVQUFVLEVBQUUscUJBQXFCO2lCQUNsQzthQUNGO1NBQ0YsQ0FBQztLQUNIOzs7OztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQ1osV0FBd0I7UUFFeEIsT0FBTztZQUNMLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsU0FBUyxFQUFFO2dCQUNULGFBQWE7Z0JBQ2IsYUFBYTtnQkFDYixPQUFPO2dCQUNQLFdBQVc7Z0JBQ1g7b0JBQ0UsT0FBTyxFQUFFLFlBQVk7b0JBQ3JCLElBQUksRUFBRSxXQUFXO29CQUNqQixVQUFVLEVBQUUscUJBQXFCO2lCQUNsQzthQUNGO1NBQ0YsQ0FBQztLQUNIOzs7WUFwQ0YsUUFBUSxTQUFDLEVBQUU7Ozs7OztBQXVDWixNQUFNLFVBQVUscUJBQXFCLENBQUMsR0FBRyxTQUFnQjtJQUN2RCxPQUFPLFNBQVMsQ0FBQztDQUNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZmZlY3RTb3VyY2VzIH0gZnJvbSAnLi9lZmZlY3Rfc291cmNlcyc7XG5pbXBvcnQgeyBBY3Rpb25zIH0gZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCB7IFJPT1RfRUZGRUNUUywgRkVBVFVSRV9FRkZFQ1RTIH0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHsgRWZmZWN0c0ZlYXR1cmVNb2R1bGUgfSBmcm9tICcuL2VmZmVjdHNfZmVhdHVyZV9tb2R1bGUnO1xuaW1wb3J0IHsgRWZmZWN0c1Jvb3RNb2R1bGUgfSBmcm9tICcuL2VmZmVjdHNfcm9vdF9tb2R1bGUnO1xuaW1wb3J0IHsgRWZmZWN0c1J1bm5lciB9IGZyb20gJy4vZWZmZWN0c19ydW5uZXInO1xuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgRWZmZWN0c01vZHVsZSB7XG4gIHN0YXRpYyBmb3JGZWF0dXJlKFxuICAgIGZlYXR1cmVFZmZlY3RzOiBUeXBlPGFueT5bXVxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEVmZmVjdHNGZWF0dXJlTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBFZmZlY3RzRmVhdHVyZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBmZWF0dXJlRWZmZWN0cyxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEZFQVRVUkVfRUZGRUNUUyxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICBkZXBzOiBmZWF0dXJlRWZmZWN0cyxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBjcmVhdGVTb3VyY2VJbnN0YW5jZXMsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZm9yUm9vdChcbiAgICByb290RWZmZWN0czogVHlwZTxhbnk+W11cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxFZmZlY3RzUm9vdE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRWZmZWN0c1Jvb3RNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRWZmZWN0c1J1bm5lcixcbiAgICAgICAgRWZmZWN0U291cmNlcyxcbiAgICAgICAgQWN0aW9ucyxcbiAgICAgICAgcm9vdEVmZmVjdHMsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBST09UX0VGRkVDVFMsXG4gICAgICAgICAgZGVwczogcm9vdEVmZmVjdHMsXG4gICAgICAgICAgdXNlRmFjdG9yeTogY3JlYXRlU291cmNlSW5zdGFuY2VzLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTb3VyY2VJbnN0YW5jZXMoLi4uaW5zdGFuY2VzOiBhbnlbXSkge1xuICByZXR1cm4gaW5zdGFuY2VzO1xufVxuIl19