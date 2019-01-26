(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics/ng-add/schema", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zY2hlbWF0aWNzL25nLWFkZC9zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgU2NoZW1hIHtcbiAgc2tpcFBhY2thZ2VKc29uPzogYm9vbGVhbjtcbiAgcGF0aD86IHN0cmluZztcbiAgcHJvamVjdD86IHN0cmluZztcbiAgbW9kdWxlPzogc3RyaW5nO1xuICBzdGF0ZVBhdGg/OiBzdHJpbmc7XG4gIHN0YXRlSW50ZXJmYWNlPzogc3RyaW5nO1xufVxuIl19