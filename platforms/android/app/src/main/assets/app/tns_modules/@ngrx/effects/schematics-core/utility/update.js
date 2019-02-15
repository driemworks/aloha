(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/effects/schematics-core/utility/update", ["require", "exports", "@angular-devkit/schematics"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    function updatePackage(name) {
        return function (tree, context) {
            var pkgPath = '/package.json';
            var buffer = tree.read(pkgPath);
            if (buffer === null) {
                throw new schematics_1.SchematicsException('Could not read package.json');
            }
            var content = buffer.toString();
            var pkg = JSON.parse(content);
            if (pkg === null || typeof pkg !== 'object' || Array.isArray(pkg)) {
                throw new schematics_1.SchematicsException('Error reading package.json');
            }
            var dependencyCategories = ['dependencies', 'devDependencies'];
            dependencyCategories.forEach(function (category) {
                var packageName = "@ngrx/" + name;
                if (pkg[category] && pkg[category][packageName]) {
                    var firstChar = pkg[category][packageName][0];
                    var suffix = match(firstChar, '^') || match(firstChar, '~');
                    pkg[category][packageName] = suffix + "6.0.0";
                }
            });
            tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
            return tree;
        };
    }
    exports.updatePackage = updatePackage;
    function match(value, test) {
        return value === test ? test : '';
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lZmZlY3RzL3NjaGVtYXRpY3MtY29yZS91dGlsaXR5L3VwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLHlEQUtvQztJQUVwQyxTQUFnQixhQUFhLENBQUMsSUFBWTtRQUN4QyxPQUFPLFVBQUMsSUFBVSxFQUFFLE9BQXlCO1lBQzNDLElBQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQztZQUNoQyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtnQkFDbkIsTUFBTSxJQUFJLGdDQUFtQixDQUFDLDZCQUE2QixDQUFDLENBQUM7YUFDOUQ7WUFDRCxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVoQyxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2pFLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2FBQzdEO1lBRUQsSUFBTSxvQkFBb0IsR0FBRyxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBRWpFLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVE7Z0JBQ25DLElBQU0sV0FBVyxHQUFHLFdBQVMsSUFBTSxDQUFDO2dCQUVwQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQy9DLElBQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEQsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUU5RCxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQU0sTUFBTSxVQUFPLENBQUM7aUJBQy9DO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0RCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7SUEvQkQsc0NBK0JDO0lBRUQsU0FBUyxLQUFLLENBQUMsS0FBYSxFQUFFLElBQVk7UUFDeEMsT0FBTyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNwQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUnVsZSxcbiAgU2NoZW1hdGljQ29udGV4dCxcbiAgVHJlZSxcbiAgU2NoZW1hdGljc0V4Y2VwdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUGFja2FnZShuYW1lOiBzdHJpbmcpOiBSdWxlIHtcbiAgcmV0dXJuICh0cmVlOiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgY29uc3QgcGtnUGF0aCA9ICcvcGFja2FnZS5qc29uJztcbiAgICBjb25zdCBidWZmZXIgPSB0cmVlLnJlYWQocGtnUGF0aCk7XG4gICAgaWYgKGJ1ZmZlciA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oJ0NvdWxkIG5vdCByZWFkIHBhY2thZ2UuanNvbicpO1xuICAgIH1cbiAgICBjb25zdCBjb250ZW50ID0gYnVmZmVyLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgcGtnID0gSlNPTi5wYXJzZShjb250ZW50KTtcblxuICAgIGlmIChwa2cgPT09IG51bGwgfHwgdHlwZW9mIHBrZyAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheShwa2cpKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbignRXJyb3IgcmVhZGluZyBwYWNrYWdlLmpzb24nKTtcbiAgICB9XG5cbiAgICBjb25zdCBkZXBlbmRlbmN5Q2F0ZWdvcmllcyA9IFsnZGVwZW5kZW5jaWVzJywgJ2RldkRlcGVuZGVuY2llcyddO1xuXG4gICAgZGVwZW5kZW5jeUNhdGVnb3JpZXMuZm9yRWFjaChjYXRlZ29yeSA9PiB7XG4gICAgICBjb25zdCBwYWNrYWdlTmFtZSA9IGBAbmdyeC8ke25hbWV9YDtcblxuICAgICAgaWYgKHBrZ1tjYXRlZ29yeV0gJiYgcGtnW2NhdGVnb3J5XVtwYWNrYWdlTmFtZV0pIHtcbiAgICAgICAgY29uc3QgZmlyc3RDaGFyID0gcGtnW2NhdGVnb3J5XVtwYWNrYWdlTmFtZV1bMF07XG4gICAgICAgIGNvbnN0IHN1ZmZpeCA9IG1hdGNoKGZpcnN0Q2hhciwgJ14nKSB8fCBtYXRjaChmaXJzdENoYXIsICd+Jyk7XG5cbiAgICAgICAgcGtnW2NhdGVnb3J5XVtwYWNrYWdlTmFtZV0gPSBgJHtzdWZmaXh9Ni4wLjBgO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdHJlZS5vdmVyd3JpdGUocGtnUGF0aCwgSlNPTi5zdHJpbmdpZnkocGtnLCBudWxsLCAyKSk7XG5cbiAgICByZXR1cm4gdHJlZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbWF0Y2godmFsdWU6IHN0cmluZywgdGVzdDogc3RyaW5nKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdGVzdCA/IHRlc3QgOiAnJztcbn1cbiJdfQ==