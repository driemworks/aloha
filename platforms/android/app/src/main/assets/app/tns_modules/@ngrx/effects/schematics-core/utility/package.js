(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/effects/schematics-core/utility/package", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Adds a package to the package.json
     */
    function addPackageToPackageJson(host, type, pkg, version) {
        if (host.exists('package.json')) {
            var sourceText = host.read('package.json').toString('utf-8');
            var json = JSON.parse(sourceText);
            if (!json[type]) {
                json[type] = {};
            }
            if (!json[type][pkg]) {
                json[type][pkg] = version;
            }
            host.overwrite('package.json', JSON.stringify(json, null, 2));
        }
        return host;
    }
    exports.addPackageToPackageJson = addPackageToPackageJson;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS9wYWNrYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBRUE7O09BRUc7SUFDSCxTQUFnQix1QkFBdUIsQ0FDckMsSUFBVSxFQUNWLElBQVksRUFDWixHQUFXLEVBQ1gsT0FBZTtRQUVmLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUMvQixJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoRSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNqQjtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUM7YUFDM0I7WUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvRDtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQXJCRCwwREFxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmVlIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuXG4vKipcbiAqIEFkZHMgYSBwYWNrYWdlIHRvIHRoZSBwYWNrYWdlLmpzb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFBhY2thZ2VUb1BhY2thZ2VKc29uKFxuICBob3N0OiBUcmVlLFxuICB0eXBlOiBzdHJpbmcsXG4gIHBrZzogc3RyaW5nLFxuICB2ZXJzaW9uOiBzdHJpbmdcbik6IFRyZWUge1xuICBpZiAoaG9zdC5leGlzdHMoJ3BhY2thZ2UuanNvbicpKSB7XG4gICAgY29uc3Qgc291cmNlVGV4dCA9IGhvc3QucmVhZCgncGFja2FnZS5qc29uJykhLnRvU3RyaW5nKCd1dGYtOCcpO1xuICAgIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKHNvdXJjZVRleHQpO1xuICAgIGlmICghanNvblt0eXBlXSkge1xuICAgICAganNvblt0eXBlXSA9IHt9O1xuICAgIH1cblxuICAgIGlmICghanNvblt0eXBlXVtwa2ddKSB7XG4gICAgICBqc29uW3R5cGVdW3BrZ10gPSB2ZXJzaW9uO1xuICAgIH1cblxuICAgIGhvc3Qub3ZlcndyaXRlKCdwYWNrYWdlLmpzb24nLCBKU09OLnN0cmluZ2lmeShqc29uLCBudWxsLCAyKSk7XG4gIH1cblxuICByZXR1cm4gaG9zdDtcbn1cbiJdfQ==