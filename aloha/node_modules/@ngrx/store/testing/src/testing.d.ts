import { Provider } from '@angular/core';
export interface MockStoreConfig<T> {
    initialState?: T;
}
export declare function provideMockStore<T = any>(config?: MockStoreConfig<T>): Provider[];
export { MockReducerManager } from './mock_reducer_manager';
export { MockState } from './mock_state';
export { MockStore } from './mock_store';
