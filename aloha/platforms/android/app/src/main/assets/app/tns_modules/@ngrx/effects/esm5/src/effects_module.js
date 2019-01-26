var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { EffectSources } from './effect_sources';
import { Actions } from './actions';
import { ROOT_EFFECTS, FEATURE_EFFECTS } from './tokens';
import { EffectsFeatureModule } from './effects_feature_module';
import { EffectsRootModule } from './effects_root_module';
import { EffectsRunner } from './effects_runner';
var EffectsModule = /** @class */ (function () {
    function EffectsModule() {
    }
    EffectsModule.forFeature = function (featureEffects) {
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
    };
    EffectsModule.forRoot = function (rootEffects) {
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
    };
    EffectsModule = __decorate([
        NgModule({})
    ], EffectsModule);
    return EffectsModule;
}());
export { EffectsModule };
export function createSourceInstances() {
    var instances = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        instances[_i] = arguments[_i];
    }
    return instances;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VmZmVjdHMvc3JjL2VmZmVjdHNfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQTZCLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUdqRDtJQUFBO0lBb0NBLENBQUM7SUFuQ1Esd0JBQVUsR0FBakIsVUFDRSxjQUEyQjtRQUUzQixPQUFPO1lBQ0wsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixTQUFTLEVBQUU7Z0JBQ1QsY0FBYztnQkFDZDtvQkFDRSxPQUFPLEVBQUUsZUFBZTtvQkFDeEIsS0FBSyxFQUFFLElBQUk7b0JBQ1gsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLFVBQVUsRUFBRSxxQkFBcUI7aUJBQ2xDO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVNLHFCQUFPLEdBQWQsVUFDRSxXQUF3QjtRQUV4QixPQUFPO1lBQ0wsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1QsYUFBYTtnQkFDYixhQUFhO2dCQUNiLE9BQU87Z0JBQ1AsV0FBVztnQkFDWDtvQkFDRSxPQUFPLEVBQUUsWUFBWTtvQkFDckIsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLFVBQVUsRUFBRSxxQkFBcUI7aUJBQ2xDO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztJQW5DVSxhQUFhO1FBRHpCLFFBQVEsQ0FBQyxFQUFFLENBQUM7T0FDQSxhQUFhLENBb0N6QjtJQUFELG9CQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7U0FwQ1ksYUFBYTtBQXNDMUIsTUFBTSxVQUFVLHFCQUFxQjtJQUFDLG1CQUFtQjtTQUFuQixVQUFtQixFQUFuQixxQkFBbUIsRUFBbkIsSUFBbUI7UUFBbkIsOEJBQW1COztJQUN2RCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVmZmVjdFNvdXJjZXMgfSBmcm9tICcuL2VmZmVjdF9zb3VyY2VzJztcbmltcG9ydCB7IEFjdGlvbnMgfSBmcm9tICcuL2FjdGlvbnMnO1xuaW1wb3J0IHsgUk9PVF9FRkZFQ1RTLCBGRUFUVVJFX0VGRkVDVFMgfSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQgeyBFZmZlY3RzRmVhdHVyZU1vZHVsZSB9IGZyb20gJy4vZWZmZWN0c19mZWF0dXJlX21vZHVsZSc7XG5pbXBvcnQgeyBFZmZlY3RzUm9vdE1vZHVsZSB9IGZyb20gJy4vZWZmZWN0c19yb290X21vZHVsZSc7XG5pbXBvcnQgeyBFZmZlY3RzUnVubmVyIH0gZnJvbSAnLi9lZmZlY3RzX3J1bm5lcic7XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBFZmZlY3RzTW9kdWxlIHtcbiAgc3RhdGljIGZvckZlYXR1cmUoXG4gICAgZmVhdHVyZUVmZmVjdHM6IFR5cGU8YW55PltdXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8RWZmZWN0c0ZlYXR1cmVNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEVmZmVjdHNGZWF0dXJlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIGZlYXR1cmVFZmZlY3RzLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRkVBVFVSRV9FRkZFQ1RTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIGRlcHM6IGZlYXR1cmVFZmZlY3RzLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZVNvdXJjZUluc3RhbmNlcyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmb3JSb290KFxuICAgIHJvb3RFZmZlY3RzOiBUeXBlPGFueT5bXVxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEVmZmVjdHNSb290TW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBFZmZlY3RzUm9vdE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBFZmZlY3RzUnVubmVyLFxuICAgICAgICBFZmZlY3RTb3VyY2VzLFxuICAgICAgICBBY3Rpb25zLFxuICAgICAgICByb290RWZmZWN0cyxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFJPT1RfRUZGRUNUUyxcbiAgICAgICAgICBkZXBzOiByb290RWZmZWN0cyxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBjcmVhdGVTb3VyY2VJbnN0YW5jZXMsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNvdXJjZUluc3RhbmNlcyguLi5pbnN0YW5jZXM6IGFueVtdKSB7XG4gIHJldHVybiBpbnN0YW5jZXM7XG59XG4iXX0=