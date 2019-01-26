(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/effects/schematics/ng-add/schema", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lZmZlY3RzL3NjaGVtYXRpY3MvbmctYWRkL3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBTY2hlbWEge1xuICBuYW1lOiBzdHJpbmc7XG4gIHNraXBQYWNrYWdlSnNvbj86IGJvb2xlYW47XG4gIHBhdGg/OiBzdHJpbmc7XG4gIHByb2plY3Q/OiBzdHJpbmc7XG4gIGZsYXQ/OiBib29sZWFuO1xuICBzcGVjPzogYm9vbGVhbjtcbiAgbW9kdWxlPzogc3RyaW5nO1xuICBncm91cD86IGJvb2xlYW47XG59XG4iXX0=