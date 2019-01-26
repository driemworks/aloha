var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { Inject, Injectable } from '@angular/core';
import { ScannedActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
var Actions = /** @class */ (function (_super) {
    __extends(Actions, _super);
    function Actions(source) {
        var _this = _super.call(this) || this;
        if (source) {
            _this.source = source;
        }
        return _this;
    }
    Actions_1 = Actions;
    Actions.prototype.lift = function (operator) {
        var observable = new Actions_1();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    var Actions_1;
    Actions = Actions_1 = __decorate([
        Injectable(),
        __param(0, Inject(ScannedActionsSubject)),
        __metadata("design:paramtypes", [Observable])
    ], Actions);
    return Actions;
}(Observable));
export { Actions };
export function ofType() {
    var allowedTypes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        allowedTypes[_i] = arguments[_i];
    }
    return filter(function (action) {
        return allowedTypes.some(function (type) { return type === action.type; });
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zcmMvYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFVLHFCQUFxQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVELE9BQU8sRUFBRSxVQUFVLEVBQThCLE1BQU0sTUFBTSxDQUFDO0FBQzlELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd4QztJQUF5QywyQkFBYTtJQUNwRCxpQkFBMkMsTUFBc0I7UUFBakUsWUFDRSxpQkFBTyxTQUtSO1FBSEMsSUFBSSxNQUFNLEVBQUU7WUFDVixLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUN0Qjs7SUFDSCxDQUFDO2dCQVBVLE9BQU87SUFTbEIsc0JBQUksR0FBSixVQUFRLFFBQXdCO1FBQzlCLElBQU0sVUFBVSxHQUFHLElBQUksU0FBTyxFQUFLLENBQUM7UUFDcEMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDekIsVUFBVSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDL0IsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQzs7SUFkVSxPQUFPO1FBRG5CLFVBQVUsRUFBRTtRQUVFLFdBQUEsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUE7eUNBQVUsVUFBVTtPQURuRCxPQUFPLENBZW5CO0lBQUQsY0FBQztDQUFBLEFBZkQsQ0FBeUMsVUFBVSxHQWVsRDtTQWZZLE9BQU87QUFvRnBCLE1BQU0sVUFBVSxNQUFNO0lBQ3BCLHNCQUF5QjtTQUF6QixVQUF5QixFQUF6QixxQkFBeUIsRUFBekIsSUFBeUI7UUFBekIsaUNBQXlCOztJQUV6QixPQUFPLE1BQU0sQ0FBQyxVQUFDLE1BQWM7UUFDM0IsT0FBQSxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQXBCLENBQW9CLENBQUM7SUFBL0MsQ0FBK0MsQ0FDaEQsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbiwgU2Nhbm5lZEFjdGlvbnNTdWJqZWN0IH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT3BlcmF0b3JGdW5jdGlvbiwgT3BlcmF0b3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFjdGlvbnM8ViA9IEFjdGlvbj4gZXh0ZW5kcyBPYnNlcnZhYmxlPFY+IHtcbiAgY29uc3RydWN0b3IoQEluamVjdChTY2FubmVkQWN0aW9uc1N1YmplY3QpIHNvdXJjZT86IE9ic2VydmFibGU8Vj4pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKHNvdXJjZSkge1xuICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICB9XG5cbiAgbGlmdDxSPihvcGVyYXRvcjogT3BlcmF0b3I8ViwgUj4pOiBPYnNlcnZhYmxlPFI+IHtcbiAgICBjb25zdCBvYnNlcnZhYmxlID0gbmV3IEFjdGlvbnM8Uj4oKTtcbiAgICBvYnNlcnZhYmxlLnNvdXJjZSA9IHRoaXM7XG4gICAgb2JzZXJ2YWJsZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICB9XG59XG5cbi8qKlxuICogJ29mVHlwZScgZmlsdGVycyBhbiBPYnNlcnZhYmxlIG9mIEFjdGlvbnMgaW50byBhbiBvYnNlcnZhYmxlIG9mIHRoZSBhY3Rpb25zXG4gKiB3aG9zZSB0eXBlIHN0cmluZ3MgYXJlIHBhc3NlZCB0byBpdC5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgYGFjdGlvbnMucGlwZShvZlR5cGUoJ2FkZCcpKWAgcmV0dXJucyBhblxuICogYE9ic2VydmFibGU8QWRkdGlvbkFjdGlvbj5gXG4gKlxuICogUHJvcGVybHkgdHlwaW5nIHRoaXMgZnVuY3Rpb24gaXMgaGFyZCBhbmQgcmVxdWlyZXMgc29tZSBhZHZhbmNlZCBUUyB0cmlja3NcbiAqIGJlbG93LlxuICpcbiAqIFR5cGUgbmFycm93aW5nIGF1dG9tYXRpY2FsbHkgd29ya3MsIGFzIGxvbmcgYXMgeW91ciBgYWN0aW9uc2Agb2JqZWN0XG4gKiBzdGFydHMgd2l0aCBhIGBBY3Rpb25zPFNvbWVVbmlvbk9mQWN0aW9ucz5gIGluc3RlYWQgb2YgZ2VuZXJpYyBgQWN0aW9uc2AuXG4gKlxuICogRm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LCB3aGVuIG9uZSBwYXNzZXMgYSBzaW5nbGUgdHlwZSBhcmd1bWVudFxuICogYG9mVHlwZTxUPignc29tZXRoaW5nJylgIHRoZSByZXN1bHQgaXMgYW4gYE9ic2VydmFibGU8VD5gLiBOb3RlLCB0aGF0IGBUYFxuICogY29tcGxldGVseSBvdmVycmlkZXMgYW55IHBvc3NpYmxlIGluZmVyZW5jZSBmcm9tICdzb21ldGhpbmcnLlxuICpcbiAqIFVuZm9ydHVuYXRlbHksIGZvciB1bmtub3duICdhY3Rpb25zOiBBY3Rpb25zJyB0aGVzZSB0eXBlcyB3aWxsIHByb2R1Y2VcbiAqICdPYnNlcnZhYmxlPG5ldmVyPicuIEluIHN1Y2ggY2FzZXMgb25lIGhhcyB0byBtYW51YWxseSBzZXQgdGhlIGdlbmVyaWMgdHlwZVxuICogbGlrZSBgYWN0aW9ucy5vZlR5cGU8QWRkaXRpb25BY3Rpb24+KCdhZGQnKWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvZlR5cGU8XG4gIFYgZXh0ZW5kcyBFeHRyYWN0PFUsIHsgdHlwZTogVDEgfT4sXG4gIFQxIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nLFxuICBVIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uXG4+KHQxOiBUMSk6IE9wZXJhdG9yRnVuY3Rpb248VSwgVj47XG5leHBvcnQgZnVuY3Rpb24gb2ZUeXBlPFxuICBWIGV4dGVuZHMgRXh0cmFjdDxVLCB7IHR5cGU6IFQxIHwgVDIgfT4sXG4gIFQxIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nLFxuICBUMiBleHRlbmRzIHN0cmluZyA9IHN0cmluZyxcbiAgVSBleHRlbmRzIEFjdGlvbiA9IEFjdGlvblxuPih0MTogVDEsIHQyOiBUMik6IE9wZXJhdG9yRnVuY3Rpb248VSwgVj47XG5leHBvcnQgZnVuY3Rpb24gb2ZUeXBlPFxuICBWIGV4dGVuZHMgRXh0cmFjdDxVLCB7IHR5cGU6IFQxIHwgVDIgfCBUMyB9PixcbiAgVDEgZXh0ZW5kcyBzdHJpbmcgPSBzdHJpbmcsXG4gIFQyIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nLFxuICBUMyBleHRlbmRzIHN0cmluZyA9IHN0cmluZyxcbiAgVSBleHRlbmRzIEFjdGlvbiA9IEFjdGlvblxuPih0MTogVDEsIHQyOiBUMiwgdDM6IFQzKTogT3BlcmF0b3JGdW5jdGlvbjxVLCBWPjtcbmV4cG9ydCBmdW5jdGlvbiBvZlR5cGU8XG4gIFYgZXh0ZW5kcyBFeHRyYWN0PFUsIHsgdHlwZTogVDEgfCBUMiB8IFQzIHwgVDQgfT4sXG4gIFQxIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nLFxuICBUMiBleHRlbmRzIHN0cmluZyA9IHN0cmluZyxcbiAgVDMgZXh0ZW5kcyBzdHJpbmcgPSBzdHJpbmcsXG4gIFQ0IGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nLFxuICBVIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uXG4+KHQxOiBUMSwgdDI6IFQyLCB0MzogVDMsIHQ0OiBUNCk6IE9wZXJhdG9yRnVuY3Rpb248VSwgVj47XG5leHBvcnQgZnVuY3Rpb24gb2ZUeXBlPFxuICBWIGV4dGVuZHMgRXh0cmFjdDxVLCB7IHR5cGU6IFQxIHwgVDIgfCBUMyB8IFQ0IHwgVDUgfT4sXG4gIFQxIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nLFxuICBUMiBleHRlbmRzIHN0cmluZyA9IHN0cmluZyxcbiAgVDMgZXh0ZW5kcyBzdHJpbmcgPSBzdHJpbmcsXG4gIFQ0IGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nLFxuICBUNSBleHRlbmRzIHN0cmluZyA9IHN0cmluZyxcbiAgVSBleHRlbmRzIEFjdGlvbiA9IEFjdGlvblxuPih0MTogVDEsIHQyOiBUMiwgdDM6IFQzLCB0NDogVDQsIHQ1OiBUNSk6IE9wZXJhdG9yRnVuY3Rpb248VSwgVj47XG4vKipcbiAqIEZhbGxiYWNrIGZvciBtb3JlIHRoYW4gNSBhcmd1bWVudHMuXG4gKiBUaGVyZSBpcyBubyBpbmZlcmVuY2UsIHNvIHRoZSByZXR1cm4gdHlwZSBpcyB0aGUgc2FtZSBhcyB0aGUgaW5wdXQgLVxuICogT2JzZXJ2YWJsZTxBY3Rpb24+LlxuICpcbiAqIFdlIHByb3ZpZGUgYSB0eXBlIHBhcmFtZXRlciwgZXZlbiB0aG91Z2ggVFMgd2lsbCBub3QgaW5mZXIgaXQgZnJvbSB0aGVcbiAqIGFyZ3VtZW50cywgdG8gcHJlc2VydmUgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgd2l0aCBvbGQgdmVyc2lvbnMgb2YgbmdyeC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9mVHlwZTxWIGV4dGVuZHMgQWN0aW9uPihcbiAgLi4uYWxsb3dlZFR5cGVzOiBzdHJpbmdbXVxuKTogT3BlcmF0b3JGdW5jdGlvbjxBY3Rpb24sIFY+O1xuZXhwb3J0IGZ1bmN0aW9uIG9mVHlwZShcbiAgLi4uYWxsb3dlZFR5cGVzOiBzdHJpbmdbXVxuKTogT3BlcmF0b3JGdW5jdGlvbjxBY3Rpb24sIEFjdGlvbj4ge1xuICByZXR1cm4gZmlsdGVyKChhY3Rpb246IEFjdGlvbikgPT5cbiAgICBhbGxvd2VkVHlwZXMuc29tZSh0eXBlID0+IHR5cGUgPT09IGFjdGlvbi50eXBlKVxuICApO1xufVxuIl19