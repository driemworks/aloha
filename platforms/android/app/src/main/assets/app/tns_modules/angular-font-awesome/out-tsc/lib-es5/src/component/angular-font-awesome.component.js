import { Component, Input } from '@angular/core';
var AngularFontAwesomeComponent = (function () {
    function AngularFontAwesomeComponent() {
        this._optionalClasses = [];
    }
    /**
     * @return {?}
     */
    AngularFontAwesomeComponent.prototype.ngOnInit = function () {
        if (!this.name) {
            throw new Error('Missing "name" property for Angular2 Font Awesome component');
        }
        if (this.size) {
            this.addToOptionalClasses("fa-" + this.size);
        }
        if (this.fixed) {
            this.addToOptionalClasses("fa-fw");
        }
        if (this.animation) {
            this.addToOptionalClasses("fa-" + this.animation);
        }
        if (this.rotate) {
            var /** @type {?} */ rotateClass = (typeof this.rotate === 'number') ? "fa-rotate-" + this.rotate
                : "fa-flip-" + this.rotate;
            this.addToOptionalClasses(rotateClass);
        }
        if (this.inverse) {
            this.addToOptionalClasses("fa-inverse");
        }
    };
    Object.defineProperty(AngularFontAwesomeComponent.prototype, "optionalClasses", {
        /**
         * @return {?}
         */
        get: function () {
            return this._optionalClasses;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} addClass
     * @return {?}
     */
    AngularFontAwesomeComponent.prototype.addToOptionalClasses = function (addClass) {
        this._optionalClasses.push(addClass);
    };
    return AngularFontAwesomeComponent;
}());
export { AngularFontAwesomeComponent };
AngularFontAwesomeComponent.decorators = [
    { type: Component, args: [{
                selector: 'fa',
                template: "<i class=\"fa fa-{{ name }}\" aria-hidden=\"true\" [ngClass]=\"optionalClasses\" ></i> ",
                styles: [""]
            },] },
];
/**
 * @nocollapse
 */
AngularFontAwesomeComponent.ctorParameters = function () { return []; };
AngularFontAwesomeComponent.propDecorators = {
    'name': [{ type: Input },],
    'title': [{ type: Input },],
    'size': [{ type: Input },],
    'fixed': [{ type: Input },],
    'animation': [{ type: Input },],
    'rotate': [{ type: Input },],
    'inverse': [{ type: Input },],
};
function AngularFontAwesomeComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AngularFontAwesomeComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AngularFontAwesomeComponent.ctorParameters;
    /** @type {?} */
    AngularFontAwesomeComponent.propDecorators;
    /** @type {?} */
    AngularFontAwesomeComponent.prototype.name;
    /** @type {?} */
    AngularFontAwesomeComponent.prototype.title;
    /** @type {?} */
    AngularFontAwesomeComponent.prototype.size;
    /** @type {?} */
    AngularFontAwesomeComponent.prototype.fixed;
    /** @type {?} */
    AngularFontAwesomeComponent.prototype.animation;
    /** @type {?} */
    AngularFontAwesomeComponent.prototype.rotate;
    /** @type {?} */
    AngularFontAwesomeComponent.prototype.inverse;
    /** @type {?} */
    AngularFontAwesomeComponent.prototype._optionalClasses;
}
//# sourceMappingURL=angular-font-awesome.component.js.map