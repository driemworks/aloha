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
import { StoreRootModule, StoreFeatureModule } from '@ngrx/store';
import { EffectsRootModule } from './effects_root_module';
import { FEATURE_EFFECTS } from './tokens';
var EffectsFeatureModule = /** @class */ (function () {
    function EffectsFeatureModule(root, effectSourceGroups, storeRootModule, storeFeatureModule) {
        effectSourceGroups.forEach(function (group) {
            return group.forEach(function (effectSourceInstance) {
                return root.addEffects(effectSourceInstance);
            });
        });
    }
    EffectsFeatureModule = __decorate([
        NgModule({}),
        __param(1, Inject(FEATURE_EFFECTS)),
        __param(2, Optional()),
        __param(3, Optional()),
        __metadata("design:paramtypes", [EffectsRootModule, Array, StoreRootModule,
            StoreFeatureModule])
    ], EffectsFeatureModule);
    return EffectsFeatureModule;
}());
export { EffectsFeatureModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19mZWF0dXJlX21vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zcmMvZWZmZWN0c19mZWF0dXJlX21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRzNDO0lBQ0UsOEJBQ0UsSUFBdUIsRUFDRSxrQkFBMkIsRUFDeEMsZUFBZ0MsRUFDaEMsa0JBQXNDO1FBRWxELGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7WUFDOUIsT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsb0JBQW9CO2dCQUNoQyxPQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUM7WUFBckMsQ0FBcUMsQ0FDdEM7UUFGRCxDQUVDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFaVSxvQkFBb0I7UUFEaEMsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUlSLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3ZCLFdBQUEsUUFBUSxFQUFFLENBQUE7UUFDVixXQUFBLFFBQVEsRUFBRSxDQUFBO3lDQUhMLGlCQUFpQixTQUVNLGVBQWU7WUFDWixrQkFBa0I7T0FMekMsb0JBQW9CLENBYWhDO0lBQUQsMkJBQUM7Q0FBQSxBQWJELElBYUM7U0FiWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmVSb290TW9kdWxlLCBTdG9yZUZlYXR1cmVNb2R1bGUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBFZmZlY3RzUm9vdE1vZHVsZSB9IGZyb20gJy4vZWZmZWN0c19yb290X21vZHVsZSc7XG5pbXBvcnQgeyBGRUFUVVJFX0VGRkVDVFMgfSBmcm9tICcuL3Rva2Vucyc7XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBFZmZlY3RzRmVhdHVyZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHJvb3Q6IEVmZmVjdHNSb290TW9kdWxlLFxuICAgIEBJbmplY3QoRkVBVFVSRV9FRkZFQ1RTKSBlZmZlY3RTb3VyY2VHcm91cHM6IGFueVtdW10sXG4gICAgQE9wdGlvbmFsKCkgc3RvcmVSb290TW9kdWxlOiBTdG9yZVJvb3RNb2R1bGUsXG4gICAgQE9wdGlvbmFsKCkgc3RvcmVGZWF0dXJlTW9kdWxlOiBTdG9yZUZlYXR1cmVNb2R1bGVcbiAgKSB7XG4gICAgZWZmZWN0U291cmNlR3JvdXBzLmZvckVhY2goZ3JvdXAgPT5cbiAgICAgIGdyb3VwLmZvckVhY2goZWZmZWN0U291cmNlSW5zdGFuY2UgPT5cbiAgICAgICAgcm9vdC5hZGRFZmZlY3RzKGVmZmVjdFNvdXJjZUluc3RhbmNlKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==