import { Provider } from '@angular/core';
import { Observable } from 'rxjs';
export declare function provideMockActions(source: Observable<any>): Provider;
export declare function provideMockActions(factory: () => Observable<any>): Provider;
