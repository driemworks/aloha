import { ErrorHandler } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
export declare class EffectSources extends Subject<any> {
    private errorHandler;
    private store;
    constructor(errorHandler: ErrorHandler, store: Store<any>);
    addEffects(effectSourceInstance: any): void;
}
