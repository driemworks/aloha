import { Observable } from 'rxjs';
import { Action, ActionsSubject, ReducerManager, Store } from '@ngrx/store';
import { MockState } from './mock_state';
export declare class MockStore<T> extends Store<T> {
    private state$;
    private initialState;
    scannedActions$: Observable<Action>;
    constructor(state$: MockState<T>, actionsObserver: ActionsSubject, reducerManager: ReducerManager, initialState: T);
    setState(nextState: T): void;
    addReducer(): void;
    removeReducer(): void;
}
