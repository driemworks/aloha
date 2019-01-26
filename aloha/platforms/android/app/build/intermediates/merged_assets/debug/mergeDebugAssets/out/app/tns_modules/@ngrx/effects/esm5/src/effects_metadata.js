var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
import { compose } from '@ngrx/store';
var METADATA_KEY = '__@ngrx/effects__';
function getEffectMetadataEntries(sourceProto) {
    return sourceProto.constructor.hasOwnProperty(METADATA_KEY)
        ? sourceProto.constructor[METADATA_KEY]
        : [];
}
function setEffectMetadataEntries(sourceProto, entries) {
    var constructor = sourceProto.constructor;
    var meta = constructor.hasOwnProperty(METADATA_KEY)
        ? constructor[METADATA_KEY]
        : Object.defineProperty(constructor, METADATA_KEY, { value: [] })[METADATA_KEY];
    Array.prototype.push.apply(meta, entries);
}
export function Effect(_a) {
    var _b = (_a === void 0 ? {} : _a).dispatch, dispatch = _b === void 0 ? true : _b;
    return function (target, propertyName) {
        var metadata = { propertyName: propertyName, dispatch: dispatch };
        setEffectMetadataEntries(target, [metadata]);
    };
}
export function getSourceForInstance(instance) {
    return Object.getPrototypeOf(instance);
}
export function getSourceMetadata(instance) {
    return compose(getEffectMetadataEntries, getSourceForInstance)(instance);
}
export function getEffectsMetadata(instance) {
    var e_1, _a;
    var metadata = {};
    try {
        for (var _b = __values(getSourceMetadata(instance)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = _c.value, propertyName = _d.propertyName, dispatch = _d.dispatch;
            metadata[propertyName] = { dispatch: dispatch };
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return metadata;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19tZXRhZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zcmMvZWZmZWN0c19tZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV0QyxJQUFNLFlBQVksR0FBRyxtQkFBbUIsQ0FBQztBQU96QyxTQUFTLHdCQUF3QixDQUFJLFdBQWM7SUFDakQsT0FBTyxXQUFXLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUM7UUFDekQsQ0FBQyxDQUFFLFdBQVcsQ0FBQyxXQUFtQixDQUFDLFlBQVksQ0FBQztRQUNoRCxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ1QsQ0FBQztBQUVELFNBQVMsd0JBQXdCLENBQy9CLFdBQWMsRUFDZCxPQUFpQztJQUVqQyxJQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO0lBQzVDLElBQU0sSUFBSSxHQUE2QixXQUFXLENBQUMsY0FBYyxDQUMvRCxZQUFZLENBQ2I7UUFDQyxDQUFDLENBQUUsV0FBbUIsQ0FBQyxZQUFZLENBQUM7UUFDcEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUM3RCxZQUFZLENBQ2IsQ0FBQztJQUNOLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUVELE1BQU0sVUFBVSxNQUFNLENBQUksRUFBd0I7UUFBdEIsdUNBQWUsRUFBZixvQ0FBZTtJQUN6QyxPQUFPLFVBQ0wsTUFBUyxFQUNULFlBQWU7UUFFZixJQUFNLFFBQVEsR0FBc0IsRUFBRSxZQUFZLGNBQUEsRUFBRSxRQUFRLFVBQUEsRUFBRSxDQUFDO1FBQy9ELHdCQUF3QixDQUFJLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBd0QsQ0FBQztBQUMzRCxDQUFDO0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUFJLFFBQVc7SUFDakQsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUksUUFBVztJQUM5QyxPQUFPLE9BQU8sQ0FDWix3QkFBd0IsRUFDeEIsb0JBQW9CLENBQ3JCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDZCxDQUFDO0FBTUQsTUFBTSxVQUFVLGtCQUFrQixDQUFJLFFBQVc7O0lBQy9DLElBQU0sUUFBUSxHQUF1QixFQUFFLENBQUM7O1FBRXhDLEtBQXlDLElBQUEsS0FBQSxTQUFBLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO1lBQTNELElBQUEsYUFBMEIsRUFBeEIsOEJBQVksRUFBRSxzQkFBUTtZQUNqQyxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxRQUFRLFVBQUEsRUFBRSxDQUFDO1NBQ3ZDOzs7Ozs7Ozs7SUFFRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcG9zZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuY29uc3QgTUVUQURBVEFfS0VZID0gJ19fQG5ncngvZWZmZWN0c19fJztcblxuZXhwb3J0IGludGVyZmFjZSBFZmZlY3RNZXRhZGF0YTxUPiB7XG4gIHByb3BlcnR5TmFtZTogRXh0cmFjdDxrZXlvZiBULCBzdHJpbmc+O1xuICBkaXNwYXRjaDogYm9vbGVhbjtcbn1cblxuZnVuY3Rpb24gZ2V0RWZmZWN0TWV0YWRhdGFFbnRyaWVzPFQ+KHNvdXJjZVByb3RvOiBUKTogQXJyYXk8RWZmZWN0TWV0YWRhdGE8VD4+IHtcbiAgcmV0dXJuIHNvdXJjZVByb3RvLmNvbnN0cnVjdG9yLmhhc093blByb3BlcnR5KE1FVEFEQVRBX0tFWSlcbiAgICA/IChzb3VyY2VQcm90by5jb25zdHJ1Y3RvciBhcyBhbnkpW01FVEFEQVRBX0tFWV1cbiAgICA6IFtdO1xufVxuXG5mdW5jdGlvbiBzZXRFZmZlY3RNZXRhZGF0YUVudHJpZXM8VD4oXG4gIHNvdXJjZVByb3RvOiBULFxuICBlbnRyaWVzOiBBcnJheTxFZmZlY3RNZXRhZGF0YTxUPj5cbikge1xuICBjb25zdCBjb25zdHJ1Y3RvciA9IHNvdXJjZVByb3RvLmNvbnN0cnVjdG9yO1xuICBjb25zdCBtZXRhOiBBcnJheTxFZmZlY3RNZXRhZGF0YTxUPj4gPSBjb25zdHJ1Y3Rvci5oYXNPd25Qcm9wZXJ0eShcbiAgICBNRVRBREFUQV9LRVlcbiAgKVxuICAgID8gKGNvbnN0cnVjdG9yIGFzIGFueSlbTUVUQURBVEFfS0VZXVxuICAgIDogT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLCBNRVRBREFUQV9LRVksIHsgdmFsdWU6IFtdIH0pW1xuICAgICAgICBNRVRBREFUQV9LRVlcbiAgICAgIF07XG4gIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KG1ldGEsIGVudHJpZXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRWZmZWN0PFQ+KHsgZGlzcGF0Y2ggPSB0cnVlIH0gPSB7fSk6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgcmV0dXJuIGZ1bmN0aW9uPEsgZXh0ZW5kcyBFeHRyYWN0PGtleW9mIFQsIHN0cmluZz4+KFxuICAgIHRhcmdldDogVCxcbiAgICBwcm9wZXJ0eU5hbWU6IEtcbiAgKSB7XG4gICAgY29uc3QgbWV0YWRhdGE6IEVmZmVjdE1ldGFkYXRhPFQ+ID0geyBwcm9wZXJ0eU5hbWUsIGRpc3BhdGNoIH07XG4gICAgc2V0RWZmZWN0TWV0YWRhdGFFbnRyaWVzPFQ+KHRhcmdldCwgW21ldGFkYXRhXSk7XG4gIH0gYXMgKHRhcmdldDoge30sIHByb3BlcnR5TmFtZTogc3RyaW5nIHwgc3ltYm9sKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U291cmNlRm9ySW5zdGFuY2U8VD4oaW5zdGFuY2U6IFQpOiBUIHtcbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihpbnN0YW5jZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTb3VyY2VNZXRhZGF0YTxUPihpbnN0YW5jZTogVCk6IEFycmF5PEVmZmVjdE1ldGFkYXRhPFQ+PiB7XG4gIHJldHVybiBjb21wb3NlKFxuICAgIGdldEVmZmVjdE1ldGFkYXRhRW50cmllcyxcbiAgICBnZXRTb3VyY2VGb3JJbnN0YW5jZVxuICApKGluc3RhbmNlKTtcbn1cblxuZXhwb3J0IHR5cGUgRWZmZWN0c01ldGFkYXRhPFQ+ID0ge1xuICBba2V5IGluIEV4dHJhY3Q8a2V5b2YgVCwgc3RyaW5nPl0/OiB7IGRpc3BhdGNoOiBib29sZWFuIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZmZlY3RzTWV0YWRhdGE8VD4oaW5zdGFuY2U6IFQpOiBFZmZlY3RzTWV0YWRhdGE8VD4ge1xuICBjb25zdCBtZXRhZGF0YTogRWZmZWN0c01ldGFkYXRhPFQ+ID0ge307XG5cbiAgZm9yIChjb25zdCB7IHByb3BlcnR5TmFtZSwgZGlzcGF0Y2ggfSBvZiBnZXRTb3VyY2VNZXRhZGF0YShpbnN0YW5jZSkpIHtcbiAgICBtZXRhZGF0YVtwcm9wZXJ0eU5hbWVdID0geyBkaXNwYXRjaCB9O1xuICB9XG5cbiAgcmV0dXJuIG1ldGFkYXRhO1xufVxuIl19