var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Inject, Optional } from '@angular/core';
import { Store, StoreRootModule, StoreFeatureModule, } from '@ngrx/store';
import { EffectsRunner } from './effects_runner';
import { EffectSources } from './effect_sources';
import { ROOT_EFFECTS } from './tokens';
export var ROOT_EFFECTS_INIT = '@ngrx/effects/init';
var EffectsRootModule = /** @class */ (function () {
    function EffectsRootModule(sources, runner, store, rootEffects, storeRootModule, storeFeatureModule) {
        this.sources = sources;
        runner.start();
        rootEffects.forEach(function (effectSourceInstance) {
            return sources.addEffects(effectSourceInstance);
        });
        store.dispatch({ type: ROOT_EFFECTS_INIT });
    }
    EffectsRootModule.prototype.addEffects = function (effectSourceInstance) {
        this.sources.addEffects(effectSourceInstance);
    };
    EffectsRootModule = __decorate([
        NgModule({}),
        __param(3, Inject(ROOT_EFFECTS)),
        __param(4, Optional()),
        __param(5, Optional()),
        __metadata("design:paramtypes", [EffectSources,
            EffectsRunner,
            Store, Array, StoreRootModule,
            StoreFeatureModule])
    ], EffectsRootModule);
    return EffectsRootModule;
}());
export { EffectsRootModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19yb290X21vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zcmMvZWZmZWN0c19yb290X21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUVMLEtBQUssRUFDTCxlQUFlLEVBQ2Ysa0JBQWtCLEdBQ25CLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV4QyxNQUFNLENBQUMsSUFBTSxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQztBQUd0RDtJQUNFLDJCQUNVLE9BQXNCLEVBQzlCLE1BQXFCLEVBQ3JCLEtBQWlCLEVBQ0ssV0FBa0IsRUFDNUIsZUFBZ0MsRUFDaEMsa0JBQXNDO1FBTDFDLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFPOUIsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWYsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLG9CQUFvQjtZQUN0QyxPQUFBLE9BQU8sQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUM7UUFBeEMsQ0FBd0MsQ0FDekMsQ0FBQztRQUVGLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxzQ0FBVSxHQUFWLFVBQVcsb0JBQXlCO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDaEQsQ0FBQztJQXBCVSxpQkFBaUI7UUFEN0IsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQU1SLFdBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3BCLFdBQUEsUUFBUSxFQUFFLENBQUE7UUFDVixXQUFBLFFBQVEsRUFBRSxDQUFBO3lDQUxNLGFBQWE7WUFDdEIsYUFBYTtZQUNkLEtBQUssU0FFaUIsZUFBZTtZQUNaLGtCQUFrQjtPQVB6QyxpQkFBaUIsQ0FxQjdCO0lBQUQsd0JBQUM7Q0FBQSxBQXJCRCxJQXFCQztTQXJCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgU3RvcmVNb2R1bGUsXG4gIFN0b3JlLFxuICBTdG9yZVJvb3RNb2R1bGUsXG4gIFN0b3JlRmVhdHVyZU1vZHVsZSxcbn0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgRWZmZWN0c1J1bm5lciB9IGZyb20gJy4vZWZmZWN0c19ydW5uZXInO1xuaW1wb3J0IHsgRWZmZWN0U291cmNlcyB9IGZyb20gJy4vZWZmZWN0X3NvdXJjZXMnO1xuaW1wb3J0IHsgUk9PVF9FRkZFQ1RTIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgY29uc3QgUk9PVF9FRkZFQ1RTX0lOSVQgPSAnQG5ncngvZWZmZWN0cy9pbml0JztcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIEVmZmVjdHNSb290TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzb3VyY2VzOiBFZmZlY3RTb3VyY2VzLFxuICAgIHJ1bm5lcjogRWZmZWN0c1J1bm5lcixcbiAgICBzdG9yZTogU3RvcmU8YW55PixcbiAgICBASW5qZWN0KFJPT1RfRUZGRUNUUykgcm9vdEVmZmVjdHM6IGFueVtdLFxuICAgIEBPcHRpb25hbCgpIHN0b3JlUm9vdE1vZHVsZTogU3RvcmVSb290TW9kdWxlLFxuICAgIEBPcHRpb25hbCgpIHN0b3JlRmVhdHVyZU1vZHVsZTogU3RvcmVGZWF0dXJlTW9kdWxlXG4gICkge1xuICAgIHJ1bm5lci5zdGFydCgpO1xuXG4gICAgcm9vdEVmZmVjdHMuZm9yRWFjaChlZmZlY3RTb3VyY2VJbnN0YW5jZSA9PlxuICAgICAgc291cmNlcy5hZGRFZmZlY3RzKGVmZmVjdFNvdXJjZUluc3RhbmNlKVxuICAgICk7XG5cbiAgICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6IFJPT1RfRUZGRUNUU19JTklUIH0pO1xuICB9XG5cbiAgYWRkRWZmZWN0cyhlZmZlY3RTb3VyY2VJbnN0YW5jZTogYW55KSB7XG4gICAgdGhpcy5zb3VyY2VzLmFkZEVmZmVjdHMoZWZmZWN0U291cmNlSW5zdGFuY2UpO1xuICB9XG59XG4iXX0=