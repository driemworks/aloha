import { BehaviorSubject } from 'rxjs';
import { ActionReducer } from '@ngrx/store';
export declare class MockReducerManager extends BehaviorSubject<ActionReducer<any, any>> {
    constructor();
}
