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
import { ɵglobal as global } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By, ɵgetDOM as getDOM } from '@angular/platform-browser';
/**
 * Jasmine matchers that check Angular specific conditions.
 * @record
 * @template T
 */
export function NgMatchers() { }
if (false) {
    /**
     * Invert the matchers.
     * @type {?}
     */
    NgMatchers.prototype.not;
    /**
     * Expect the value to be a `Promise`.
     *
     * \@usageNotes
     * ### Example
     *
     * {\@example testing/ts/matchers.ts region='toBePromise'}
     * @return {?}
     */
    NgMatchers.prototype.toBePromise = function () { };
    /**
     * Expect the value to be an instance of a class.
     *
     * \@usageNotes
     * ### Example
     *
     * {\@example testing/ts/matchers.ts region='toBeAnInstanceOf'}
     * @param {?} expected
     * @return {?}
     */
    NgMatchers.prototype.toBeAnInstanceOf = function (expected) { };
    /**
     * Expect the element to have exactly the given text.
     *
     * \@usageNotes
     * ### Example
     *
     * {\@example testing/ts/matchers.ts region='toHaveText'}
     * @param {?} expected
     * @return {?}
     */
    NgMatchers.prototype.toHaveText = function (expected) { };
    /**
     * Expect the element to have the given CSS class.
     *
     * \@usageNotes
     * ### Example
     *
     * {\@example testing/ts/matchers.ts region='toHaveCssClass'}
     * @param {?} expected
     * @return {?}
     */
    NgMatchers.prototype.toHaveCssClass = function (expected) { };
    /**
     * Expect the element to have the given CSS styles.
     *
     * \@usageNotes
     * ### Example
     *
     * {\@example testing/ts/matchers.ts region='toHaveCssStyle'}
     * @param {?} expected
     * @return {?}
     */
    NgMatchers.prototype.toHaveCssStyle = function (expected) { };
    /**
     * Expect a class to implement the interface of the given class.
     *
     * \@usageNotes
     * ### Example
     *
     * {\@example testing/ts/matchers.ts region='toImplement'}
     * @param {?} expected
     * @return {?}
     */
    NgMatchers.prototype.toImplement = function (expected) { };
    /**
     * Expect an exception to contain the given error text.
     *
     * \@usageNotes
     * ### Example
     *
     * {\@example testing/ts/matchers.ts region='toContainError'}
     * @param {?} expected
     * @return {?}
     */
    NgMatchers.prototype.toContainError = function (expected) { };
    /**
     * Expect a component of the given type to show.
     * @param {?} expectedComponentType
     * @param {?=} expectationFailOutput
     * @return {?}
     */
    NgMatchers.prototype.toContainComponent = function (expectedComponentType, expectationFailOutput) { };
}
/** @type {?} */
const _global = (/** @type {?} */ ((typeof window === 'undefined' ? global : window)));
/**
 * Jasmine matching function with Angular matchers mixed in.
 *
 * ## Example
 *
 * {\@example testing/ts/matchers.ts region='toHaveText'}
 * @type {?}
 */
export const expect = _global.expect;
// Some Map polyfills don't polyfill Map.toString correctly, which
// gives us bad error messages in tests.
// The only way to do this in Jasmine is to monkey patch a method
// to the object :-(
((/** @type {?} */ (Map))).prototype['jasmineToString'] = function () {
    /** @type {?} */
    const m = this;
    if (!m) {
        return '' + m;
    }
    /** @type {?} */
    const res = [];
    m.forEach((v, k) => { res.push(`${String(k)}:${String(v)}`); });
    return `{ ${res.join(',')} }`;
};
_global.beforeEach(function () {
    // Custom handler for Map as we use Jasmine 2.4, and support for maps is not
    // added until Jasmine 2.6.
    jasmine.addCustomEqualityTester(function compareMap(actual, expected) {
        if (actual instanceof Map) {
            /** @type {?} */
            let pass = actual.size === expected.size;
            if (pass) {
                actual.forEach((v, k) => {
                    pass = pass && jasmine.matchersUtil.equals(v, expected.get(k));
                });
            }
            return pass;
        }
        else {
            // TODO(misko): we should change the return, but jasmine.d.ts is not null safe
            return (/** @type {?} */ (undefined));
        }
    });
    jasmine.addMatchers({
        toBePromise: function () {
            return {
                compare: function (actual) {
                    /** @type {?} */
                    const pass = typeof actual === 'object' && typeof actual.then === 'function';
                    return { pass: pass, /**
                         * @return {?}
                         */
                        get message() { return 'Expected ' + actual + ' to be a promise'; } };
                }
            };
        },
        toBeAnInstanceOf: function () {
            return {
                compare: function (actual, expectedClass) {
                    /** @type {?} */
                    const pass = typeof actual === 'object' && actual instanceof expectedClass;
                    return {
                        pass: pass,
                        /**
                         * @return {?}
                         */
                        get message() {
                            return 'Expected ' + actual + ' to be an instance of ' + expectedClass;
                        }
                    };
                }
            };
        },
        toHaveText: function () {
            return {
                compare: function (actual, expectedText) {
                    /** @type {?} */
                    const actualText = elementText(actual);
                    return {
                        pass: actualText == expectedText,
                        /**
                         * @return {?}
                         */
                        get message() { return 'Expected ' + actualText + ' to be equal to ' + expectedText; }
                    };
                }
            };
        },
        toHaveCssClass: function () {
            return { compare: buildError(false), negativeCompare: buildError(true) };
            /**
             * @param {?} isNot
             * @return {?}
             */
            function buildError(isNot) {
                return function (actual, className) {
                    return {
                        pass: getDOM().hasClass(actual, className) == !isNot,
                        /**
                         * @return {?}
                         */
                        get message() {
                            return `Expected ${actual.outerHTML} ${isNot ? 'not ' : ''}to contain the CSS class "${className}"`;
                        }
                    };
                };
            }
        },
        toHaveCssStyle: function () {
            return {
                compare: function (actual, styles) {
                    /** @type {?} */
                    let allPassed;
                    if (typeof styles === 'string') {
                        allPassed = getDOM().hasStyle(actual, styles);
                    }
                    else {
                        allPassed = Object.keys(styles).length !== 0;
                        Object.keys(styles).forEach(prop => {
                            allPassed = allPassed && getDOM().hasStyle(actual, prop, styles[prop]);
                        });
                    }
                    return {
                        pass: allPassed,
                        /**
                         * @return {?}
                         */
                        get message() {
                            /** @type {?} */
                            const expectedValueStr = typeof styles === 'string' ? styles : JSON.stringify(styles);
                            return `Expected ${actual.outerHTML} ${!allPassed ? ' ' : 'not '}to contain the
                      CSS ${typeof styles === 'string' ? 'property' : 'styles'} "${expectedValueStr}"`;
                        }
                    };
                }
            };
        },
        toContainError: function () {
            return {
                compare: function (actual, expectedText) {
                    /** @type {?} */
                    const errorMessage = actual.toString();
                    return {
                        pass: errorMessage.indexOf(expectedText) > -1,
                        /**
                         * @return {?}
                         */
                        get message() { return 'Expected ' + errorMessage + ' to contain ' + expectedText; }
                    };
                }
            };
        },
        toImplement: function () {
            return {
                compare: function (actualObject, expectedInterface) {
                    /** @type {?} */
                    const intProps = Object.keys(expectedInterface.prototype);
                    /** @type {?} */
                    const missedMethods = [];
                    intProps.forEach((k) => {
                        if (!actualObject.constructor.prototype[k])
                            missedMethods.push(k);
                    });
                    return {
                        pass: missedMethods.length == 0,
                        /**
                         * @return {?}
                         */
                        get message() {
                            return 'Expected ' + actualObject + ' to have the following methods: ' +
                                missedMethods.join(', ');
                        }
                    };
                }
            };
        },
        toContainComponent: function () {
            return {
                compare: function (actualFixture, expectedComponentType) {
                    /** @type {?} */
                    const failOutput = arguments[2];
                    /** @type {?} */
                    const msgFn = (msg) => [msg, failOutput].filter(Boolean).join(', ');
                    // verify correct actual type
                    if (!(actualFixture instanceof ComponentFixture)) {
                        return {
                            pass: false,
                            message: msgFn(`Expected actual to be of type \'ComponentFixture\' [actual=${actualFixture.constructor.name}]`)
                        };
                    }
                    /** @type {?} */
                    const found = !!actualFixture.debugElement.query(By.directive(expectedComponentType));
                    return found ?
                        { pass: true } :
                        { pass: false, message: msgFn(`Expected ${expectedComponentType.name} to show`) };
                }
            };
        }
    });
});
/**
 * @param {?} n
 * @return {?}
 */
function elementText(n) {
    /** @type {?} */
    const hasNodes = (n) => {
        /** @type {?} */
        const children = getDOM().childNodes(n);
        return children && children.length > 0;
    };
    if (n instanceof Array) {
        return n.map(elementText).join('');
    }
    if (getDOM().isCommentNode(n)) {
        return '';
    }
    if (getDOM().isElementNode(n) && getDOM().tagName(n) == 'CONTENT') {
        return elementText(Array.prototype.slice.apply(getDOM().getDistributedNodes(n)));
    }
    if (getDOM().hasShadowRoot(n)) {
        return elementText(getDOM().childNodesAsList(getDOM().getShadowRoot(n)));
    }
    if (hasNodes(n)) {
        return elementText(getDOM().childNodesAsList(n));
    }
    return (/** @type {?} */ (getDOM().getText(n)));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlcnMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3Rlc3Rpbmcvc3JjL21hdGNoZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUFPLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQU9oRSxnQ0FnRkM7Ozs7OztJQURDLHlCQUFtQjs7Ozs7Ozs7OztJQXRFbkIsbURBQXVCOzs7Ozs7Ozs7OztJQVV2QixnRUFBeUM7Ozs7Ozs7Ozs7O0lBVXpDLDBEQUFzQzs7Ozs7Ozs7Ozs7SUFVdEMsOERBQTBDOzs7Ozs7Ozs7OztJQVUxQyw4REFBZ0U7Ozs7Ozs7Ozs7O0lBVWhFLDJEQUFvQzs7Ozs7Ozs7Ozs7SUFVcEMsOERBQXVDOzs7Ozs7O0lBS3ZDLHNHQUEyRjs7O01BUXZGLE9BQU8sR0FBRyxtQkFBSyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBQTs7Ozs7Ozs7O0FBU3RFLE1BQU0sT0FBTyxNQUFNLEdBQTBDLE9BQU8sQ0FBQyxNQUFNOzs7OztBQU8zRSxDQUFDLG1CQUFBLEdBQUcsRUFBTyxDQUFDLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEdBQUc7O1VBQ3BDLENBQUMsR0FBRyxJQUFJO0lBQ2QsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNOLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNmOztVQUNLLEdBQUcsR0FBVSxFQUFFO0lBQ3JCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFNLEVBQUUsQ0FBTSxFQUFF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SSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsSUFBSSxDQUFDLFlBQVksS0FBSyxFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDcEM7SUFFRCxJQUFJLE1BQU0sRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUM3QixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBRUQsSUFBSSxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFBRTtRQUNqRSxPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xGO0lBRUQsSUFBSSxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDN0IsT0FBTyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxRTtJQUVELElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2YsT0FBTyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNsRDtJQUVELE9BQU8sbUJBQUEsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDL0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuXG5pbXBvcnQge1R5cGUsIMm1Z2xvYmFsIGFzIGdsb2JhbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbXBvbmVudEZpeHR1cmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvdGVzdGluZyc7XG5pbXBvcnQge0J5LCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5cblxuLyoqXG4gKiBKYXNtaW5lIG1hdGNoZXJzIHRoYXQgY2hlY2sgQW5ndWxhciBzcGVjaWZpYyBjb25kaXRpb25zLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nTWF0Y2hlcnM8VCA9IGFueT4gZXh0ZW5kcyBqYXNtaW5lLk1hdGNoZXJzPFQ+IHtcbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgdmFsdWUgdG8gYmUgYSBgUHJvbWlzZWAuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9CZVByb21pc2UnfVxuICAgKi9cbiAgdG9CZVByb21pc2UoKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IHRoZSB2YWx1ZSB0byBiZSBhbiBpbnN0YW5jZSBvZiBhIGNsYXNzLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvQmVBbkluc3RhbmNlT2YnfVxuICAgKi9cbiAgdG9CZUFuSW5zdGFuY2VPZihleHBlY3RlZDogYW55KTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IHRoZSBlbGVtZW50IHRvIGhhdmUgZXhhY3RseSB0aGUgZ2l2ZW4gdGV4dC5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0hhdmVUZXh0J31cbiAgICovXG4gIHRvSGF2ZVRleHQoZXhwZWN0ZWQ6IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgZWxlbWVudCB0byBoYXZlIHRoZSBnaXZlbiBDU1MgY2xhc3MuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlQ3NzQ2xhc3MnfVxuICAgKi9cbiAgdG9IYXZlQ3NzQ2xhc3MoZXhwZWN0ZWQ6IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgZWxlbWVudCB0byBoYXZlIHRoZSBnaXZlbiBDU1Mgc3R5bGVzLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSGF2ZUNzc1N0eWxlJ31cbiAgICovXG4gIHRvSGF2ZUNzc1N0eWxlKGV4cGVjdGVkOiB7W2s6IHN0cmluZ106IHN0cmluZ318c3RyaW5nKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IGEgY2xhc3MgdG8gaW1wbGVtZW50IHRoZSBpbnRlcmZhY2Ugb2YgdGhlIGdpdmVuIGNsYXNzLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSW1wbGVtZW50J31cbiAgICovXG4gIHRvSW1wbGVtZW50KGV4cGVjdGVkOiBhbnkpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgYW4gZXhjZXB0aW9uIHRvIGNvbnRhaW4gdGhlIGdpdmVuIGVycm9yIHRleHQuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9Db250YWluRXJyb3InfVxuICAgKi9cbiAgdG9Db250YWluRXJyb3IoZXhwZWN0ZWQ6IGFueSk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCBhIGNvbXBvbmVudCBvZiB0aGUgZ2l2ZW4gdHlwZSB0byBzaG93LlxuICAgKi9cbiAgdG9Db250YWluQ29tcG9uZW50KGV4cGVjdGVkQ29tcG9uZW50VHlwZTogVHlwZTxhbnk+LCBleHBlY3RhdGlvbkZhaWxPdXRwdXQ/OiBhbnkpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJbnZlcnQgdGhlIG1hdGNoZXJzLlxuICAgKi9cbiAgbm90OiBOZ01hdGNoZXJzPFQ+O1xufVxuXG5jb25zdCBfZ2xvYmFsID0gPGFueT4odHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3cpO1xuXG4vKipcbiAqIEphc21pbmUgbWF0Y2hpbmcgZnVuY3Rpb24gd2l0aCBBbmd1bGFyIG1hdGNoZXJzIG1peGVkIGluLlxuICpcbiAqICMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSGF2ZVRleHQnfVxuICovXG5leHBvcnQgY29uc3QgZXhwZWN0OiA8VCA9IGFueT4oYWN0dWFsOiBUKSA9PiBOZ01hdGNoZXJzPFQ+ID0gX2dsb2JhbC5leHBlY3Q7XG5cblxuLy8gU29tZSBNYXAgcG9seWZpbGxzIGRvbid0IHBvbHlmaWxsIE1hcC50b1N0cmluZyBjb3JyZWN0bHksIHdoaWNoXG4vLyBnaXZlcyB1cyBiYWQgZXJyb3IgbWVzc2FnZXMgaW4gdGVzdHMuXG4vLyBUaGUgb25seSB3YXkgdG8gZG8gdGhpcyBpbiBKYXNtaW5lIGlzIHRvIG1vbmtleSBwYXRjaCBhIG1ldGhvZFxuLy8gdG8gdGhlIG9iamVjdCA6LShcbihNYXAgYXMgYW55KS5wcm90b3R5cGVbJ2phc21pbmVUb1N0cmluZyddID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IG0gPSB0aGlzO1xuICBpZiAoIW0pIHtcbiAgICByZXR1cm4gJycgKyBtO1xuICB9XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgbS5mb3JFYWNoKCh2OiBhbnksIGs6IGFueSkgPT4geyByZXMucHVzaChgJHtTdHJpbmcoayl9OiR7U3RyaW5nKHYpfWApOyB9KTtcbiAgcmV0dXJuIGB7ICR7cmVzLmpvaW4oJywnKX0gfWA7XG59O1xuXG5fZ2xvYmFsLmJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gIC8vIEN1c3RvbSBoYW5kbGVyIGZvciBNYXAgYXMgd2UgdXNlIEphc21pbmUgMi40LCBhbmQgc3VwcG9ydCBmb3IgbWFwcyBpcyBub3RcbiAgLy8gYWRkZWQgdW50aWwgSmFzbWluZSAyLjYuXG4gIGphc21pbmUuYWRkQ3VzdG9tRXF1YWxpdHlUZXN0ZXIoZnVuY3Rpb24gY29tcGFyZU1hcChhY3R1YWw6IGFueSwgZXhwZWN0ZWQ6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmIChhY3R1YWwgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgIGxldCBwYXNzID0gYWN0dWFsLnNpemUgPT09IGV4cGVjdGVkLnNpemU7XG4gICAgICBpZiAocGFzcykge1xuICAgICAgICBhY3R1YWwuZm9yRWFjaCgodjogYW55LCBrOiBhbnkpID0+IHtcbiAgICAgICAgICBwYXNzID0gcGFzcyAmJiBqYXNtaW5lLm1hdGNoZXJzVXRpbC5lcXVhbHModiwgZXhwZWN0ZWQuZ2V0KGspKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFzcztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVE9ETyhtaXNrbyk6IHdlIHNob3VsZCBjaGFuZ2UgdGhlIHJldHVybiwgYnV0IGphc21pbmUuZC50cyBpcyBub3QgbnVsbCBzYWZlXG4gICAgICByZXR1cm4gdW5kZWZpbmVkICE7XG4gICAgfVxuICB9KTtcbiAgamFzbWluZS5hZGRNYXRjaGVycyh7XG4gICAgdG9CZVByb21pc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsOiBhbnkpIHtcbiAgICAgICAgICBjb25zdCBwYXNzID0gdHlwZW9mIGFjdHVhbCA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGFjdHVhbC50aGVuID09PSAnZnVuY3Rpb24nO1xuICAgICAgICAgIHJldHVybiB7cGFzczogcGFzcywgZ2V0IG1lc3NhZ2UoKSB7IHJldHVybiAnRXhwZWN0ZWQgJyArIGFjdHVhbCArICcgdG8gYmUgYSBwcm9taXNlJzsgfX07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRvQmVBbkluc3RhbmNlT2Y6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsOiBhbnksIGV4cGVjdGVkQ2xhc3M6IGFueSkge1xuICAgICAgICAgIGNvbnN0IHBhc3MgPSB0eXBlb2YgYWN0dWFsID09PSAnb2JqZWN0JyAmJiBhY3R1YWwgaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBwYXNzLFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnRXhwZWN0ZWQgJyArIGFjdHVhbCArICcgdG8gYmUgYW4gaW5zdGFuY2Ugb2YgJyArIGV4cGVjdGVkQ2xhc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9IYXZlVGV4dDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWw6IGFueSwgZXhwZWN0ZWRUZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgICBjb25zdCBhY3R1YWxUZXh0ID0gZWxlbWVudFRleHQoYWN0dWFsKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogYWN0dWFsVGV4dCA9PSBleHBlY3RlZFRleHQsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHsgcmV0dXJuICdFeHBlY3RlZCAnICsgYWN0dWFsVGV4dCArICcgdG8gYmUgZXF1YWwgdG8gJyArIGV4cGVjdGVkVGV4dDsgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRvSGF2ZUNzc0NsYXNzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7Y29tcGFyZTogYnVpbGRFcnJvcihmYWxzZSksIG5lZ2F0aXZlQ29tcGFyZTogYnVpbGRFcnJvcih0cnVlKX07XG5cbiAgICAgIGZ1bmN0aW9uIGJ1aWxkRXJyb3IoaXNOb3Q6IGJvb2xlYW4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGFjdHVhbDogYW55LCBjbGFzc05hbWU6IHN0cmluZykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBnZXRET00oKS5oYXNDbGFzcyhhY3R1YWwsIGNsYXNzTmFtZSkgPT0gIWlzTm90LFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBgRXhwZWN0ZWQgJHthY3R1YWwub3V0ZXJIVE1MfSAke2lzTm90ID8gJ25vdCAnIDogJyd9dG8gY29udGFpbiB0aGUgQ1NTIGNsYXNzIFwiJHtjbGFzc05hbWV9XCJgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRvSGF2ZUNzc1N0eWxlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbDogYW55LCBzdHlsZXM6IHtbazogc3RyaW5nXTogc3RyaW5nfXxzdHJpbmcpIHtcbiAgICAgICAgICBsZXQgYWxsUGFzc2VkOiBib29sZWFuO1xuICAgICAgICAgIGlmICh0eXBlb2Ygc3R5bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgYWxsUGFzc2VkID0gZ2V0RE9NKCkuaGFzU3R5bGUoYWN0dWFsLCBzdHlsZXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbGxQYXNzZWQgPSBPYmplY3Qua2V5cyhzdHlsZXMpLmxlbmd0aCAhPT0gMDtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHN0eWxlcykuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICAgICAgYWxsUGFzc2VkID0gYWxsUGFzc2VkICYmIGdldERPTSgpLmhhc1N0eWxlKGFjdHVhbCwgcHJvcCwgc3R5bGVzW3Byb3BdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBhbGxQYXNzZWQsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgICAgY29uc3QgZXhwZWN0ZWRWYWx1ZVN0ciA9IHR5cGVvZiBzdHlsZXMgPT09ICdzdHJpbmcnID8gc3R5bGVzIDogSlNPTi5zdHJpbmdpZnkoc3R5bGVzKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGBFeHBlY3RlZCAke2FjdHVhbC5vdXRlckhUTUx9ICR7IWFsbFBhc3NlZCA/ICcgJyA6ICdub3QgJ310byBjb250YWluIHRoZVxuICAgICAgICAgICAgICAgICAgICAgIENTUyAke3R5cGVvZiBzdHlsZXMgPT09ICdzdHJpbmcnID8gJ3Byb3BlcnR5JyA6ICdzdHlsZXMnfSBcIiR7ZXhwZWN0ZWRWYWx1ZVN0cn1cImA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9Db250YWluRXJyb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsOiBhbnksIGV4cGVjdGVkVGV4dDogYW55KSB7XG4gICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYWN0dWFsLnRvU3RyaW5nKCk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IGVycm9yTWVzc2FnZS5pbmRleE9mKGV4cGVjdGVkVGV4dCkgPiAtMSxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkgeyByZXR1cm4gJ0V4cGVjdGVkICcgKyBlcnJvck1lc3NhZ2UgKyAnIHRvIGNvbnRhaW4gJyArIGV4cGVjdGVkVGV4dDsgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRvSW1wbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbE9iamVjdDogYW55LCBleHBlY3RlZEludGVyZmFjZTogYW55KSB7XG4gICAgICAgICAgY29uc3QgaW50UHJvcHMgPSBPYmplY3Qua2V5cyhleHBlY3RlZEludGVyZmFjZS5wcm90b3R5cGUpO1xuXG4gICAgICAgICAgY29uc3QgbWlzc2VkTWV0aG9kczogYW55W10gPSBbXTtcbiAgICAgICAgICBpbnRQcm9wcy5mb3JFYWNoKChrKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWFjdHVhbE9iamVjdC5jb25zdHJ1Y3Rvci5wcm90b3R5cGVba10pIG1pc3NlZE1ldGhvZHMucHVzaChrKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBtaXNzZWRNZXRob2RzLmxlbmd0aCA9PSAwLFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnRXhwZWN0ZWQgJyArIGFjdHVhbE9iamVjdCArICcgdG8gaGF2ZSB0aGUgZm9sbG93aW5nIG1ldGhvZHM6ICcgK1xuICAgICAgICAgICAgICAgICAgbWlzc2VkTWV0aG9kcy5qb2luKCcsICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRvQ29udGFpbkNvbXBvbmVudDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWxGaXh0dXJlOiBhbnksIGV4cGVjdGVkQ29tcG9uZW50VHlwZTogVHlwZTxhbnk+KSB7XG4gICAgICAgICAgY29uc3QgZmFpbE91dHB1dCA9IGFyZ3VtZW50c1syXTtcbiAgICAgICAgICBjb25zdCBtc2dGbiA9IChtc2c6IHN0cmluZyk6IHN0cmluZyA9PiBbbXNnLCBmYWlsT3V0cHV0XS5maWx0ZXIoQm9vbGVhbikuam9pbignLCAnKTtcblxuICAgICAgICAgIC8vIHZlcmlmeSBjb3JyZWN0IGFjdHVhbCB0eXBlXG4gICAgICAgICAgaWYgKCEoYWN0dWFsRml4dHVyZSBpbnN0YW5jZW9mIENvbXBvbmVudEZpeHR1cmUpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBwYXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogbXNnRm4oXG4gICAgICAgICAgICAgICAgICBgRXhwZWN0ZWQgYWN0dWFsIHRvIGJlIG9mIHR5cGUgXFwnQ29tcG9uZW50Rml4dHVyZVxcJyBbYWN0dWFsPSR7YWN0dWFsRml4dHVyZS5jb25zdHJ1Y3Rvci5uYW1lfV1gKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBmb3VuZCA9ICEhYWN0dWFsRml4dHVyZS5kZWJ1Z0VsZW1lbnQucXVlcnkoQnkuZGlyZWN0aXZlKGV4cGVjdGVkQ29tcG9uZW50VHlwZSkpO1xuICAgICAgICAgIHJldHVybiBmb3VuZCA/XG4gICAgICAgICAgICAgIHtwYXNzOiB0cnVlfSA6XG4gICAgICAgICAgICAgIHtwYXNzOiBmYWxzZSwgbWVzc2FnZTogbXNnRm4oYEV4cGVjdGVkICR7ZXhwZWN0ZWRDb21wb25lbnRUeXBlLm5hbWV9IHRvIHNob3dgKX07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBlbGVtZW50VGV4dChuOiBhbnkpOiBzdHJpbmcge1xuICBjb25zdCBoYXNOb2RlcyA9IChuOiBhbnkpID0+IHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGdldERPTSgpLmNoaWxkTm9kZXMobik7XG4gICAgcmV0dXJuIGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA+IDA7XG4gIH07XG5cbiAgaWYgKG4gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIHJldHVybiBuLm1hcChlbGVtZW50VGV4dCkuam9pbignJyk7XG4gIH1cblxuICBpZiAoZ2V0RE9NKCkuaXNDb21tZW50Tm9kZShuKSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGlmIChnZXRET00oKS5pc0VsZW1lbnROb2RlKG4pICYmIGdldERPTSgpLnRhZ05hbWUobikgPT0gJ0NPTlRFTlQnKSB7XG4gICAgcmV0dXJuIGVsZW1lbnRUZXh0KEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShnZXRET00oKS5nZXREaXN0cmlidXRlZE5vZGVzKG4pKSk7XG4gIH1cblxuICBpZiAoZ2V0RE9NKCkuaGFzU2hhZG93Um9vdChuKSkge1xuICAgIHJldHVybiBlbGVtZW50VGV4dChnZXRET00oKS5jaGlsZE5vZGVzQXNMaXN0KGdldERPTSgpLmdldFNoYWRvd1Jvb3QobikpKTtcbiAgfVxuXG4gIGlmIChoYXNOb2RlcyhuKSkge1xuICAgIHJldHVybiBlbGVtZW50VGV4dChnZXRET00oKS5jaGlsZE5vZGVzQXNMaXN0KG4pKTtcbiAgfVxuXG4gIHJldHVybiBnZXRET00oKS5nZXRUZXh0KG4pICE7XG59XG4iXX0=