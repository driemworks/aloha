/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * An interface implemented by all Angular type decorators, which allows them to be used as ES7
 * decorators as well as
 * Angular DSL syntax.
 *
 * ES7 syntax:
 *
 * ```
 * \@ng.Component({...})
 * class MyClass {...}
 * ```
 *
 * \@publicApi
 * @record
 */
export function TypeDecorator() { }
/** @type {?} */
export const ANNOTATIONS = '__annotations__';
/** @type {?} */
export const PARAMETERS = '__parameters__';
/** @type {?} */
export const PROP_METADATA = '__prop__metadata__';
/**
 * @suppress {globalThis}
 * @template T
 * @param {?} name
 * @param {?=} props
 * @param {?=} parentClass
 * @param {?=} additionalProcessing
 * @param {?=} typeFn
 * @return {?}
 */
export function makeDecorator(name, props, parentClass, additionalProcessing, typeFn) {
    /** @type {?} */
    const metaCtor = makeMetadataCtor(props);
    /**
     * @param {...?} args
     * @return {?}
     */
    function DecoratorFactory(...args) {
        if (this instanceof DecoratorFactory) {
            metaCtor.call(this, ...args);
            return this;
        }
        /** @type {?} */
        const annotationInstance = new ((/** @type {?} */ (DecoratorFactory)))(...args);
        return function TypeDecorator(cls) {
            if (typeFn)
                typeFn(cls, ...args);
            // Use of Object.defineProperty is important since it creates non-enumerable property which
            // prevents the property is copied during subclassing.
            /** @type {?} */
            const annotations = cls.hasOwnProperty(ANNOTATIONS) ?
                ((/** @type {?} */ (cls)))[ANNOTATIONS] :
                Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];
            annotations.push(annotationInstance);
            if (additionalProcessing)
                additionalProcessing(cls);
            return cls;
        };
    }
    if (parentClass) {
        DecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    DecoratorFactory.prototype.ngMetadataName = name;
    ((/** @type {?} */ (DecoratorFactory))).annotationCls = DecoratorFactory;
    return (/** @type {?} */ (DecoratorFactory));
}
/**
 * @param {?=} props
 * @return {?}
 */
function makeMetadataCtor(props) {
    return function ctor(...args) {
        if (props) {
            /** @type {?} */
            const values = props(...args);
            for (const propName in values) {
                this[propName] = values[propName];
            }
        }
    };
}
/**
 * @param {?} name
 * @param {?=} props
 * @param {?=} parentClass
 * @return {?}
 */
export function makeParamDecorator(name, props, parentClass) {
    /** @type {?} */
    const metaCtor = makeMetadataCtor(props);
    /**
     * @param {...?} args
     * @return {?}
     */
    function ParamDecoratorFactory(...args) {
        if (this instanceof ParamDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        /** @type {?} */
        const annotationInstance = new ((/** @type {?} */ (ParamDecoratorFactory)))(...args);
        ((/** @type {?} */ (ParamDecorator))).annotation = annotationInstance;
        return ParamDecorator;
        /**
         * @param {?} cls
         * @param {?} unusedKey
         * @param {?} index
         * @return {?}
         */
        function ParamDecorator(cls, unusedKey, index) {
            // Use of Object.defineProperty is important since it creates non-enumerable property which
            // prevents the property is copied during subclassing.
            /** @type {?} */
            const parameters = cls.hasOwnProperty(PARAMETERS) ?
                ((/** @type {?} */ (cls)))[PARAMETERS] :
                Object.defineProperty(cls, PARAMETERS, { value: [] })[PARAMETERS];
            // there might be gaps if some in between parameters do not have annotations.
            // we pad with nulls.
            while (parameters.length <= index) {
                parameters.push(null);
            }
            (parameters[index] = parameters[index] || []).push(annotationInstance);
            return cls;
        }
    }
    if (parentClass) {
        ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    ParamDecoratorFactory.prototype.ngMetadataName = name;
    ((/** @type {?} */ (ParamDecoratorFactory))).annotationCls = ParamDecoratorFactory;
    return ParamDecoratorFactory;
}
/**
 * @param {?} name
 * @param {?=} props
 * @param {?=} parentClass
 * @param {?=} additionalProcessing
 * @return {?}
 */
export function makePropDecorator(name, props, parentClass, additionalProcessing) {
    /** @type {?} */
    const metaCtor = makeMetadataCtor(props);
    /**
     * @param {...?} args
     * @return {?}
     */
    function PropDecoratorFactory(...args) {
        if (this instanceof PropDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        /** @type {?} */
        const decoratorInstance = new ((/** @type {?} */ (PropDecoratorFactory)))(...args);
        /**
         * @param {?} target
         * @param {?} name
         * @return {?}
         */
        function PropDecorator(target, name) {
            /** @type {?} */
            const constructor = target.constructor;
            // Use of Object.defineProperty is important since it creates non-enumerable property which
            // prevents the property is copied during subclassing.
            /** @type {?} */
            const meta = constructor.hasOwnProperty(PROP_METADATA) ?
                ((/** @type {?} */ (constructor)))[PROP_METADATA] :
                Object.defineProperty(constructor, PROP_METADATA, { value: {} })[PROP_METADATA];
            meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
            meta[name].unshift(decoratorInstance);
            if (additionalProcessing)
                additionalProcessing(target, name, ...args);
        }
        return PropDecorator;
    }
    if (parentClass) {
        PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    PropDecoratorFactory.prototype.ngMetadataName = name;
    ((/** @type {?} */ (PropDecoratorFactory))).annotationCls = PropDecoratorFactory;
    return PropDecoratorFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2NvcmUvc3JjL3V0aWwvZGVjb3JhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxtQ0FXQzs7QUFFRCxNQUFNLE9BQU8sV0FBVyxHQUFHLGlCQUFpQjs7QUFDNUMsTUFBTSxPQUFPLFVBQVUsR0FBRyxnQkFBZ0I7O0FBQzFDLE1BQU0sT0FBTyxhQUFhLEdBQUcsb0JBQW9COzs7Ozs7Ozs7OztBQUtqRCxNQUFNLFVBQVUsYUFBYSxDQUN6QixJQUFZLEVBQUUsS0FBK0IsRUFBRSxXQUFpQixFQUNoRSxvQkFBOEMsRUFDOUMsTUFBZ0Q7O1VBRTVDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7Ozs7O0lBRXhDLFNBQVMsZ0JBQWdCLENBQUMsR0FBRyxJQUFXO1FBQ3RDLElBQUksSUFBSSxZQUFZLGdCQUFnQixFQUFFO1lBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDN0IsT0FBTyxJQUFJLENBQUM7U0FDYjs7Y0FFSyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsbUJBQUEsZ0JBQWdCLEVBQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2pFLE9BQU8sU0FBUyxhQUFhLENBQUMsR0FBWTtZQUN4QyxJQUFJLE1BQU07Z0JBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDOzs7O2tCQUczQixXQUFXLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLG1CQUFBLEdBQUcsRUFBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLEVBQUMsS0FBSyxFQUFFLEVBQUUs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LE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLFdBQVcsRUFBRTtRQUNmLG9CQUFvQixDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUN2RTtJQUVELG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQ3JELENBQUMsbUJBQUssb0JBQW9CLEVBQUEsQ0FBQyxDQUFDLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztJQUNqRSxPQUFPLG9CQUFvQixDQUFDO0FBQzlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vdHlwZSc7XG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIGltcGxlbWVudGVkIGJ5IGFsbCBBbmd1bGFyIHR5cGUgZGVjb3JhdG9ycywgd2hpY2ggYWxsb3dzIHRoZW0gdG8gYmUgdXNlZCBhcyBFUzdcbiAqIGRlY29yYXRvcnMgYXMgd2VsbCBhc1xuICogQW5ndWxhciBEU0wgc3ludGF4LlxuICpcbiAqIEVTNyBzeW50YXg6XG4gKlxuICogYGBgXG4gKiBAbmcuQ29tcG9uZW50KHsuLi59KVxuICogY2xhc3MgTXlDbGFzcyB7Li4ufVxuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVEZWNvcmF0b3Ige1xuICAvKipcbiAgICogSW52b2tlIGFzIEVTNyBkZWNvcmF0b3IuXG4gICAqL1xuICA8VCBleHRlbmRzIFR5cGU8YW55Pj4odHlwZTogVCk6IFQ7XG5cbiAgLy8gTWFrZSBUeXBlRGVjb3JhdG9yIGFzc2lnbmFibGUgdG8gYnVpbHQtaW4gUGFyYW1ldGVyRGVjb3JhdG9yIHR5cGUuXG4gIC8vIFBhcmFtZXRlckRlY29yYXRvciBpcyBkZWNsYXJlZCBpbiBsaWIuZC50cyBhcyBhIGBkZWNsYXJlIHR5cGVgXG4gIC8vIHNvIHdlIGNhbm5vdCBkZWNsYXJlIHRoaXMgaW50ZXJmYWNlIGFzIGEgc3VidHlwZS5cbiAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzMzNzkjaXNzdWVjb21tZW50LTEyNjE2OTQxN1xuICAodGFyZ2V0OiBPYmplY3QsIHByb3BlcnR5S2V5Pzogc3RyaW5nfHN5bWJvbCwgcGFyYW1ldGVySW5kZXg/OiBudW1iZXIpOiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgQU5OT1RBVElPTlMgPSAnX19hbm5vdGF0aW9uc19fJztcbmV4cG9ydCBjb25zdCBQQVJBTUVURVJTID0gJ19fcGFyYW1ldGVyc19fJztcbmV4cG9ydCBjb25zdCBQUk9QX01FVEFEQVRBID0gJ19fcHJvcF9fbWV0YWRhdGFfXyc7XG5cbi8qKlxuICogQHN1cHByZXNzIHtnbG9iYWxUaGlzfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFrZURlY29yYXRvcjxUPihcbiAgICBuYW1lOiBzdHJpbmcsIHByb3BzPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnksIHBhcmVudENsYXNzPzogYW55LFxuICAgIGFkZGl0aW9uYWxQcm9jZXNzaW5nPzogKHR5cGU6IFR5cGU8VD4pID0+IHZvaWQsXG4gICAgdHlwZUZuPzogKHR5cGU6IFR5cGU8VD4sIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkKTpcbiAgICB7bmV3ICguLi5hcmdzOiBhbnlbXSk6IGFueTsgKC4uLmFyZ3M6IGFueVtdKTogYW55OyAoLi4uYXJnczogYW55W10pOiAoY2xzOiBhbnkpID0+IGFueTt9IHtcbiAgY29uc3QgbWV0YUN0b3IgPSBtYWtlTWV0YWRhdGFDdG9yKHByb3BzKTtcblxuICBmdW5jdGlvbiBEZWNvcmF0b3JGYWN0b3J5KC4uLmFyZ3M6IGFueVtdKTogKGNsczogVHlwZTxUPikgPT4gYW55IHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIERlY29yYXRvckZhY3RvcnkpIHtcbiAgICAgIG1ldGFDdG9yLmNhbGwodGhpcywgLi4uYXJncyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb25zdCBhbm5vdGF0aW9uSW5zdGFuY2UgPSBuZXcgKERlY29yYXRvckZhY3RvcnkgYXMgYW55KSguLi5hcmdzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gVHlwZURlY29yYXRvcihjbHM6IFR5cGU8VD4pIHtcbiAgICAgIGlmICh0eXBlRm4pIHR5cGVGbihjbHMsIC4uLmFyZ3MpO1xuICAgICAgLy8gVXNlIG9mIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBpcyBpbXBvcnRhbnQgc2luY2UgaXQgY3JlYXRlcyBub24tZW51bWVyYWJsZSBwcm9wZXJ0eSB3aGljaFxuICAgICAgLy8gcHJldmVudHMgdGhlIHByb3BlcnR5IGlzIGNvcGllZCBkdXJpbmcgc3ViY2xhc3NpbmcuXG4gICAgICBjb25zdCBhbm5vdGF0aW9ucyA9IGNscy5oYXNPd25Qcm9wZXJ0eShBTk5PVEFUSU9OUykgP1xuICAgICAgICAgIChjbHMgYXMgYW55KVtBTk5PVEFUSU9OU10gOlxuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbHMsIEFOTk9UQVRJT05TLCB7dmFsdWU6IFtdfSlbQU5OT1RBVElPTlNdO1xuICAgICAgYW5ub3RhdGlvbnMucHVzaChhbm5vdGF0aW9uSW5zdGFuY2UpO1xuXG5cbiAgICAgIGlmIChhZGRpdGlvbmFsUHJvY2Vzc2luZykgYWRkaXRpb25hbFByb2Nlc3NpbmcoY2xzKTtcblxuICAgICAgcmV0dXJuIGNscztcbiAgICB9O1xuICB9XG5cbiAgaWYgKHBhcmVudENsYXNzKSB7XG4gICAgRGVjb3JhdG9yRmFjdG9yeS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudENsYXNzLnByb3RvdHlwZSk7XG4gIH1cblxuICBEZWNvcmF0b3JGYWN0b3J5LnByb3RvdHlwZS5uZ01ldGFkYXRhTmFtZSA9IG5hbWU7XG4gIChEZWNvcmF0b3JGYWN0b3J5IGFzIGFueSkuYW5ub3RhdGlvbkNscyA9IERlY29yYXRvckZhY3Rvcnk7XG4gIHJldHVybiBEZWNvcmF0b3JGYWN0b3J5IGFzIGFueTtcbn1cblxuZnVuY3Rpb24gbWFrZU1ldGFkYXRhQ3Rvcihwcm9wcz86ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KTogYW55IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGN0b3IoLi4uYXJnczogYW55W10pIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGNvbnN0IHZhbHVlcyA9IHByb3BzKC4uLmFyZ3MpO1xuICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiB2YWx1ZXMpIHtcbiAgICAgICAgdGhpc1twcm9wTmFtZV0gPSB2YWx1ZXNbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VQYXJhbURlY29yYXRvcihcbiAgICBuYW1lOiBzdHJpbmcsIHByb3BzPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnksIHBhcmVudENsYXNzPzogYW55KTogYW55IHtcbiAgY29uc3QgbWV0YUN0b3IgPSBtYWtlTWV0YWRhdGFDdG9yKHByb3BzKTtcbiAgZnVuY3Rpb24gUGFyYW1EZWNvcmF0b3JGYWN0b3J5KC4uLmFyZ3M6IGFueVtdKTogYW55IHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIFBhcmFtRGVjb3JhdG9yRmFjdG9yeSkge1xuICAgICAgbWV0YUN0b3IuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY29uc3QgYW5ub3RhdGlvbkluc3RhbmNlID0gbmV3ICg8YW55PlBhcmFtRGVjb3JhdG9yRmFjdG9yeSkoLi4uYXJncyk7XG5cbiAgICAoPGFueT5QYXJhbURlY29yYXRvcikuYW5ub3RhdGlvbiA9IGFubm90YXRpb25JbnN0YW5jZTtcbiAgICByZXR1cm4gUGFyYW1EZWNvcmF0b3I7XG5cbiAgICBmdW5jdGlvbiBQYXJhbURlY29yYXRvcihjbHM6IGFueSwgdW51c2VkS2V5OiBhbnksIGluZGV4OiBudW1iZXIpOiBhbnkge1xuICAgICAgLy8gVXNlIG9mIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBpcyBpbXBvcnRhbnQgc2luY2UgaXQgY3JlYXRlcyBub24tZW51bWVyYWJsZSBwcm9wZXJ0eSB3aGljaFxuICAgICAgLy8gcHJldmVudHMgdGhlIHByb3BlcnR5IGlzIGNvcGllZCBkdXJpbmcgc3ViY2xhc3NpbmcuXG4gICAgICBjb25zdCBwYXJhbWV0ZXJzID0gY2xzLmhhc093blByb3BlcnR5KFBBUkFNRVRFUlMpID9cbiAgICAgICAgICAoY2xzIGFzIGFueSlbUEFSQU1FVEVSU10gOlxuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbHMsIFBBUkFNRVRFUlMsIHt2YWx1ZTogW119KVtQQVJBTUVURVJTXTtcblxuICAgICAgLy8gdGhlcmUgbWlnaHQgYmUgZ2FwcyBpZiBzb21lIGluIGJldHdlZW4gcGFyYW1ldGVycyBkbyBub3QgaGF2ZSBhbm5vdGF0aW9ucy5cbiAgICAgIC8vIHdlIHBhZCB3aXRoIG51bGxzLlxuICAgICAgd2hpbGUgKHBhcmFtZXRlcnMubGVuZ3RoIDw9IGluZGV4KSB7XG4gICAgICAgIHBhcmFtZXRlcnMucHVzaChudWxsKTtcbiAgICAgIH1cblxuICAgICAgKHBhcmFtZXRlcnNbaW5kZXhdID0gcGFyYW1ldGVyc1tpbmRleF0gfHwgW10pLnB1c2goYW5ub3RhdGlvbkluc3RhbmNlKTtcbiAgICAgIHJldHVybiBjbHM7XG4gICAgfVxuICB9XG4gIGlmIChwYXJlbnRDbGFzcykge1xuICAgIFBhcmFtRGVjb3JhdG9yRmFjdG9yeS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudENsYXNzLnByb3RvdHlwZSk7XG4gIH1cbiAgUGFyYW1EZWNvcmF0b3JGYWN0b3J5LnByb3RvdHlwZS5uZ01ldGFkYXRhTmFtZSA9IG5hbWU7XG4gICg8YW55PlBhcmFtRGVjb3JhdG9yRmFjdG9yeSkuYW5ub3RhdGlvbkNscyA9IFBhcmFtRGVjb3JhdG9yRmFjdG9yeTtcbiAgcmV0dXJuIFBhcmFtRGVjb3JhdG9yRmFjdG9yeTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VQcm9wRGVjb3JhdG9yKFxuICAgIG5hbWU6IHN0cmluZywgcHJvcHM/OiAoLi4uYXJnczogYW55W10pID0+IGFueSwgcGFyZW50Q2xhc3M/OiBhbnksXG4gICAgYWRkaXRpb25hbFByb2Nlc3Npbmc/OiAodGFyZ2V0OiBhbnksIG5hbWU6IHN0cmluZywgLi4uYXJnczogYW55W10pID0+IHZvaWQpOiBhbnkge1xuICBjb25zdCBtZXRhQ3RvciA9IG1ha2VNZXRhZGF0YUN0b3IocHJvcHMpO1xuXG4gIGZ1bmN0aW9uIFByb3BEZWNvcmF0b3JGYWN0b3J5KC4uLmFyZ3M6IGFueVtdKTogYW55IHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIFByb3BEZWNvcmF0b3JGYWN0b3J5KSB7XG4gICAgICBtZXRhQ3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbnN0IGRlY29yYXRvckluc3RhbmNlID0gbmV3ICg8YW55PlByb3BEZWNvcmF0b3JGYWN0b3J5KSguLi5hcmdzKTtcblxuICAgIGZ1bmN0aW9uIFByb3BEZWNvcmF0b3IodGFyZ2V0OiBhbnksIG5hbWU6IHN0cmluZykge1xuICAgICAgY29uc3QgY29uc3RydWN0b3IgPSB0YXJnZXQuY29uc3RydWN0b3I7XG4gICAgICAvLyBVc2Ugb2YgT2JqZWN0LmRlZmluZVByb3BlcnR5IGlzIGltcG9ydGFudCBzaW5jZSBpdCBjcmVhdGVzIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5IHdoaWNoXG4gICAgICAvLyBwcmV2ZW50cyB0aGUgcHJvcGVydHkgaXMgY29waWVkIGR1cmluZyBzdWJjbGFzc2luZy5cbiAgICAgIGNvbnN0IG1ldGEgPSBjb25zdHJ1Y3Rvci5oYXNPd25Qcm9wZXJ0eShQUk9QX01FVEFEQVRBKSA/XG4gICAgICAgICAgKGNvbnN0cnVjdG9yIGFzIGFueSlbUFJPUF9NRVRBREFUQV0gOlxuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25zdHJ1Y3RvciwgUFJPUF9NRVRBREFUQSwge3ZhbHVlOiB7fX0pW1BST1BfTUVUQURBVEFdO1xuICAgICAgbWV0YVtuYW1lXSA9IG1ldGEuaGFzT3duUHJvcGVydHkobmFtZSkgJiYgbWV0YVtuYW1lXSB8fCBbXTtcbiAgICAgIG1ldGFbbmFtZV0udW5zaGlmdChkZWNvcmF0b3JJbnN0YW5jZSk7XG5cbiAgICAgIGlmIChhZGRpdGlvbmFsUHJvY2Vzc2luZykgYWRkaXRpb25hbFByb2Nlc3NpbmcodGFyZ2V0LCBuYW1lLCAuLi5hcmdzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvcERlY29yYXRvcjtcbiAgfVxuXG4gIGlmIChwYXJlbnRDbGFzcykge1xuICAgIFByb3BEZWNvcmF0b3JGYWN0b3J5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocGFyZW50Q2xhc3MucHJvdG90eXBlKTtcbiAgfVxuXG4gIFByb3BEZWNvcmF0b3JGYWN0b3J5LnByb3RvdHlwZS5uZ01ldGFkYXRhTmFtZSA9IG5hbWU7XG4gICg8YW55PlByb3BEZWNvcmF0b3JGYWN0b3J5KS5hbm5vdGF0aW9uQ2xzID0gUHJvcERlY29yYXRvckZhY3Rvcnk7XG4gIHJldHVybiBQcm9wRGVjb3JhdG9yRmFjdG9yeTtcbn1cbiJdfQ==