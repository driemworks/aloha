import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFontAwesomeComponent } from './component/angular-font-awesome.component';
import { AngularFontAwesomeService } from './service/angular-font-awesome.service';
export class AngularFontAwesomeModule {
}
AngularFontAwesomeModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [AngularFontAwesomeComponent],
                providers: [AngularFontAwesomeService],
                exports: [AngularFontAwesomeComponent]
            },] },
];
/**
 * @nocollapse
 */
AngularFontAwesomeModule.ctorParameters = () => [];
function AngularFontAwesomeModule_tsickle_Closure_declarations() {
    /** @type {?} */
    AngularFontAwesomeModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AngularFontAwesomeModule.ctorParameters;
}
//# sourceMappingURL=angular-font-awesome.module.js.map