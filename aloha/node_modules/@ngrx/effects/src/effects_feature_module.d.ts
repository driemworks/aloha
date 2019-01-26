import { StoreRootModule, StoreFeatureModule } from '@ngrx/store';
import { EffectsRootModule } from './effects_root_module';
export declare class EffectsFeatureModule {
    constructor(root: EffectsRootModule, effectSourceGroups: any[][], storeRootModule: StoreRootModule, storeFeatureModule: StoreFeatureModule);
}
