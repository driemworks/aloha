/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { compose } from '@ngrx/store';
/** @type {?} */
const METADATA_KEY = '__@ngrx/effects__';
/**
 * @record
 * @template T
 */
export function EffectMetadata() { }
/** @type {?} */
EffectMetadata.prototype.propertyName;
/** @type {?} */
EffectMetadata.prototype.dispatch;
/**
 * @template T
 * @param {?} sourceProto
 * @return {?}
 */
function getEffectMetadataEntries(sourceProto) {
    return sourceProto.constructor.hasOwnProperty(METADATA_KEY)
        ? (/** @type {?} */ (sourceProto.constructor))[METADATA_KEY]
        : [];
}
/**
 * @template T
 * @param {?} sourceProto
 * @param {?} entries
 * @return {?}
 */
function setEffectMetadataEntries(sourceProto, entries) {
    /** @type {?} */
    const constructor = sourceProto.constructor;
    /** @type {?} */
    const meta = constructor.hasOwnProperty(METADATA_KEY)
        ? (/** @type {?} */ (constructor))[METADATA_KEY]
        : Object.defineProperty(constructor, METADATA_KEY, { value: [] })[METADATA_KEY];
    Array.prototype.push.apply(meta, entries);
}
/**
 * @template T
 * @param {?=} __0
 * @return {?}
 */
export function Effect({ dispatch = true } = {}) {
    return /** @type {?} */ (function (target, propertyName) {
        /** @type {?} */
        const metadata = { propertyName, dispatch };
        setEffectMetadataEntries(target, [metadata]);
    });
}
/**
 * @template T
 * @param {?} instance
 * @return {?}
 */
export function getSourceForInstance(instance) {
    return Object.getPrototypeOf(instance);
}
/**
 * @template T
 * @param {?} instance
 * @return {?}
 */
export function getSourceMetadata(instance) {
    return compose(getEffectMetadataEntries, getSourceForInstance)(instance);
}
/** @typedef {?} */
var EffectsMetadata;
export { EffectsMetadata };
/**
 * @template T
 * @param {?} instance
 * @return {?}
 */
export function getEffectsMetadata(instance) {
    /** @type {?} */
    const metadata = {};
    for (const { propertyName, dispatch } of getSourceMetadata(instance)) {
        metadata[propertyName] = { dispatch };
    }
    return metadata;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19tZXRhZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zcmMvZWZmZWN0c19tZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGFBQWEsQ0FBQzs7QUFFdEMsTUFBTSxZQUFZLEdBQUcsbUJBQW1CLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQU96QyxTQUFTLHdCQUF3QixDQUFJLFdBQWM7SUFDakQsT0FBTyxXQUFXLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUM7UUFDekQsQ0FBQyxDQUFDLG1CQUFDLFdBQVcsQ0FBQyxXQUFrQixFQUFDLENBQUMsWUFBWSxDQUFDO1FBQ2hELENBQUMsQ0FBQyxFQUFFLENBQUM7Q0FDUjs7Ozs7OztBQUVELFNBQVMsd0JBQXdCLENBQy9CLFdBQWMsRUFDZCxPQUFpQzs7SUFFakMsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQzs7SUFDNUMsTUFBTSxJQUFJLEdBQTZCLFdBQVcsQ0FBQyxjQUFjLENBQy9ELFlBQVksQ0FDYjtRQUNDLENBQUMsQ0FBQyxtQkFBQyxXQUFrQixFQUFDLENBQUMsWUFBWSxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FDN0QsWUFBWSxDQUNiLENBQUM7SUFDTixLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQzNDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUFJLEVBQUUsUUFBUSxHQUFHLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDaEQseUJBQU8sVUFDTCxNQUFTLEVBQ1QsWUFBZTs7UUFFZixNQUFNLFFBQVEsR0FBc0IsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLENBQUM7UUFDL0Qsd0JBQXdCLENBQUksTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztLQUNNLEVBQUM7Q0FDMUQ7Ozs7OztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FBSSxRQUFXO0lBQ2pELE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUN4Qzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGlCQUFpQixDQUFJLFFBQVc7SUFDOUMsT0FBTyxPQUFPLENBQ1osd0JBQXdCLEVBQ3hCLG9CQUFvQixDQUNyQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQ2I7Ozs7Ozs7OztBQU1ELE1BQU0sVUFBVSxrQkFBa0IsQ0FBSSxRQUFXOztJQUMvQyxNQUFNLFFBQVEsR0FBdUIsRUFBRSxDQUFDO0lBRXhDLEtBQUssTUFBTSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNwRSxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQztLQUN2QztJQUVELE9BQU8sUUFBUSxDQUFDO0NBQ2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcG9zZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuY29uc3QgTUVUQURBVEFfS0VZID0gJ19fQG5ncngvZWZmZWN0c19fJztcblxuZXhwb3J0IGludGVyZmFjZSBFZmZlY3RNZXRhZGF0YTxUPiB7XG4gIHByb3BlcnR5TmFtZTogRXh0cmFjdDxrZXlvZiBULCBzdHJpbmc+O1xuICBkaXNwYXRjaDogYm9vbGVhbjtcbn1cblxuZnVuY3Rpb24gZ2V0RWZmZWN0TWV0YWRhdGFFbnRyaWVzPFQ+KHNvdXJjZVByb3RvOiBUKTogQXJyYXk8RWZmZWN0TWV0YWRhdGE8VD4+IHtcbiAgcmV0dXJuIHNvdXJjZVByb3RvLmNvbnN0cnVjdG9yLmhhc093blByb3BlcnR5KE1FVEFEQVRBX0tFWSlcbiAgICA/IChzb3VyY2VQcm90by5jb25zdHJ1Y3RvciBhcyBhbnkpW01FVEFEQVRBX0tFWV1cbiAgICA6IFtdO1xufVxuXG5mdW5jdGlvbiBzZXRFZmZlY3RNZXRhZGF0YUVudHJpZXM8VD4oXG4gIHNvdXJjZVByb3RvOiBULFxuICBlbnRyaWVzOiBBcnJheTxFZmZlY3RNZXRhZGF0YTxUPj5cbikge1xuICBjb25zdCBjb25zdHJ1Y3RvciA9IHNvdXJjZVByb3RvLmNvbnN0cnVjdG9yO1xuICBjb25zdCBtZXRhOiBBcnJheTxFZmZlY3RNZXRhZGF0YTxUPj4gPSBjb25zdHJ1Y3Rvci5oYXNPd25Qcm9wZXJ0eShcbiAgICBNRVRBREFUQV9LRVlcbiAgKVxuICAgID8gKGNvbnN0cnVjdG9yIGFzIGFueSlbTUVUQURBVEFfS0VZXVxuICAgIDogT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLCBNRVRBREFUQV9LRVksIHsgdmFsdWU6IFtdIH0pW1xuICAgICAgICBNRVRBREFUQV9LRVlcbiAgICAgIF07XG4gIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KG1ldGEsIGVudHJpZXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRWZmZWN0PFQ+KHsgZGlzcGF0Y2ggPSB0cnVlIH0gPSB7fSk6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgcmV0dXJuIGZ1bmN0aW9uPEsgZXh0ZW5kcyBFeHRyYWN0PGtleW9mIFQsIHN0cmluZz4+KFxuICAgIHRhcmdldDogVCxcbiAgICBwcm9wZXJ0eU5hbWU6IEtcbiAgKSB7XG4gICAgY29uc3QgbWV0YWRhdGE6IEVmZmVjdE1ldGFkYXRhPFQ+ID0geyBwcm9wZXJ0eU5hbWUsIGRpc3BhdGNoIH07XG4gICAgc2V0RWZmZWN0TWV0YWRhdGFFbnRyaWVzPFQ+KHRhcmdldCwgW21ldGFkYXRhXSk7XG4gIH0gYXMgKHRhcmdldDoge30sIHByb3BlcnR5TmFtZTogc3RyaW5nIHwgc3ltYm9sKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U291cmNlRm9ySW5zdGFuY2U8VD4oaW5zdGFuY2U6IFQpOiBUIHtcbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihpbnN0YW5jZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTb3VyY2VNZXRhZGF0YTxUPihpbnN0YW5jZTogVCk6IEFycmF5PEVmZmVjdE1ldGFkYXRhPFQ+PiB7XG4gIHJldHVybiBjb21wb3NlKFxuICAgIGdldEVmZmVjdE1ldGFkYXRhRW50cmllcyxcbiAgICBnZXRTb3VyY2VGb3JJbnN0YW5jZVxuICApKGluc3RhbmNlKTtcbn1cblxuZXhwb3J0IHR5cGUgRWZmZWN0c01ldGFkYXRhPFQ+ID0ge1xuICBba2V5IGluIEV4dHJhY3Q8a2V5b2YgVCwgc3RyaW5nPl0/OiB7IGRpc3BhdGNoOiBib29sZWFuIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZmZlY3RzTWV0YWRhdGE8VD4oaW5zdGFuY2U6IFQpOiBFZmZlY3RzTWV0YWRhdGE8VD4ge1xuICBjb25zdCBtZXRhZGF0YTogRWZmZWN0c01ldGFkYXRhPFQ+ID0ge307XG5cbiAgZm9yIChjb25zdCB7IHByb3BlcnR5TmFtZSwgZGlzcGF0Y2ggfSBvZiBnZXRTb3VyY2VNZXRhZGF0YShpbnN0YW5jZSkpIHtcbiAgICBtZXRhZGF0YVtwcm9wZXJ0eU5hbWVdID0geyBkaXNwYXRjaCB9O1xuICB9XG5cbiAgcmV0dXJuIG1ldGFkYXRhO1xufVxuIl19