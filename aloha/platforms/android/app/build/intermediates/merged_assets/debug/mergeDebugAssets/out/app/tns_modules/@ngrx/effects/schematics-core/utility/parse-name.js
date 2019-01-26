(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/effects/schematics-core/utility/parse-name", ["require", "exports", "@angular-devkit/core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular-devkit/core");
    function parseName(path, name) {
        var nameWithoutPath = core_1.basename(name);
        var namePath = core_1.dirname((path + '/' + name));
        return {
            name: nameWithoutPath,
            path: core_1.normalize('/' + namePath),
        };
    }
    exports.parseName = parseName;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtbmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS9wYXJzZS1uYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsNkNBQTBFO0lBTzFFLFNBQWdCLFNBQVMsQ0FBQyxJQUFZLEVBQUUsSUFBWTtRQUNsRCxJQUFNLGVBQWUsR0FBRyxlQUFRLENBQUMsSUFBWSxDQUFDLENBQUM7UUFDL0MsSUFBTSxRQUFRLEdBQUcsY0FBTyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQVMsQ0FBQyxDQUFDO1FBRXRELE9BQU87WUFDTCxJQUFJLEVBQUUsZUFBZTtZQUNyQixJQUFJLEVBQUUsZ0JBQVMsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDO1NBQ2hDLENBQUM7SUFDSixDQUFDO0lBUkQsOEJBUUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYXRoLCBiYXNlbmFtZSwgZGlybmFtZSwgbm9ybWFsaXplIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvY2F0aW9uIHtcbiAgbmFtZTogc3RyaW5nO1xuICBwYXRoOiBQYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VOYW1lKHBhdGg6IHN0cmluZywgbmFtZTogc3RyaW5nKTogTG9jYXRpb24ge1xuICBjb25zdCBuYW1lV2l0aG91dFBhdGggPSBiYXNlbmFtZShuYW1lIGFzIFBhdGgpO1xuICBjb25zdCBuYW1lUGF0aCA9IGRpcm5hbWUoKHBhdGggKyAnLycgKyBuYW1lKSBhcyBQYXRoKTtcblxuICByZXR1cm4ge1xuICAgIG5hbWU6IG5hbWVXaXRob3V0UGF0aCxcbiAgICBwYXRoOiBub3JtYWxpemUoJy8nICsgbmFtZVBhdGgpLFxuICB9O1xufVxuIl19