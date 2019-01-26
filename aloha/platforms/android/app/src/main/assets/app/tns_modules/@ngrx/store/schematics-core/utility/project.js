(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core/utility/project", ["require", "exports", "@ngrx/store/schematics-core/utility/config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var config_1 = require("@ngrx/store/schematics-core/utility/config");
    function getProject(host, options) {
        var workspace = config_1.getWorkspace(host);
        if (!options.project) {
            options.project = Object.keys(workspace.projects)[0];
        }
        return workspace.projects[options.project];
    }
    exports.getProject = getProject;
    function getProjectPath(host, options) {
        var project = getProject(host, options);
        if (project.root.substr(-1) === '/') {
            project.root = project.root.substr(0, project.root.length - 1);
        }
        if (options.path === undefined) {
            var projectDirName = project.projectType === 'application' ? 'app' : 'lib';
            return (project.root ? "/" + project.root : '') + "/src/" + projectDirName;
        }
        return options.path;
    }
    exports.getProjectPath = getProjectPath;
    function isLib(host, options) {
        var project = getProject(host, options);
        return project.projectType === 'library';
    }
    exports.isLib = isLib;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvcHJvamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLHFFQUF3QztJQVF4QyxTQUFnQixVQUFVLENBQ3hCLElBQVUsRUFDVixPQUFvRTtRQUVwRSxJQUFNLFNBQVMsR0FBRyxxQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEQ7UUFFRCxPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFYRCxnQ0FXQztJQUVELFNBQWdCLGNBQWMsQ0FDNUIsSUFBVSxFQUNWLE9BQW9FO1FBRXBFLElBQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFMUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUNuQyxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNoRTtRQUVELElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDOUIsSUFBTSxjQUFjLEdBQ2xCLE9BQU8sQ0FBQyxXQUFXLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUV4RCxPQUFPLENBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBSSxPQUFPLENBQUMsSUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLGNBQVEsY0FBZ0IsQ0FBQztTQUMxRTtRQUVELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQztJQUN0QixDQUFDO0lBbEJELHdDQWtCQztJQUVELFNBQWdCLEtBQUssQ0FDbkIsSUFBVSxFQUNWLE9BQW9FO1FBRXBFLElBQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFMUMsT0FBTyxPQUFPLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQztJQUMzQyxDQUFDO0lBUEQsc0JBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRXb3Jrc3BhY2UgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBUcmVlIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZVByb2plY3Qge1xuICByb290OiBzdHJpbmc7XG4gIHByb2plY3RUeXBlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9qZWN0KFxuICBob3N0OiBUcmVlLFxuICBvcHRpb25zOiB7IHByb2plY3Q/OiBzdHJpbmcgfCB1bmRlZmluZWQ7IHBhdGg/OiBzdHJpbmcgfCB1bmRlZmluZWQgfVxuKTogV29ya3NwYWNlUHJvamVjdCB7XG4gIGNvbnN0IHdvcmtzcGFjZSA9IGdldFdvcmtzcGFjZShob3N0KTtcblxuICBpZiAoIW9wdGlvbnMucHJvamVjdCkge1xuICAgIG9wdGlvbnMucHJvamVjdCA9IE9iamVjdC5rZXlzKHdvcmtzcGFjZS5wcm9qZWN0cylbMF07XG4gIH1cblxuICByZXR1cm4gd29ya3NwYWNlLnByb2plY3RzW29wdGlvbnMucHJvamVjdF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9qZWN0UGF0aChcbiAgaG9zdDogVHJlZSxcbiAgb3B0aW9uczogeyBwcm9qZWN0Pzogc3RyaW5nIHwgdW5kZWZpbmVkOyBwYXRoPzogc3RyaW5nIHwgdW5kZWZpbmVkIH1cbikge1xuICBjb25zdCBwcm9qZWN0ID0gZ2V0UHJvamVjdChob3N0LCBvcHRpb25zKTtcblxuICBpZiAocHJvamVjdC5yb290LnN1YnN0cigtMSkgPT09ICcvJykge1xuICAgIHByb2plY3Qucm9vdCA9IHByb2plY3Qucm9vdC5zdWJzdHIoMCwgcHJvamVjdC5yb290Lmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMucGF0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgcHJvamVjdERpck5hbWUgPVxuICAgICAgcHJvamVjdC5wcm9qZWN0VHlwZSA9PT0gJ2FwcGxpY2F0aW9uJyA/ICdhcHAnIDogJ2xpYic7XG5cbiAgICByZXR1cm4gYCR7cHJvamVjdC5yb290ID8gYC8ke3Byb2plY3Qucm9vdH1gIDogJyd9L3NyYy8ke3Byb2plY3REaXJOYW1lfWA7XG4gIH1cblxuICByZXR1cm4gb3B0aW9ucy5wYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMaWIoXG4gIGhvc3Q6IFRyZWUsXG4gIG9wdGlvbnM6IHsgcHJvamVjdD86IHN0cmluZyB8IHVuZGVmaW5lZDsgcGF0aD86IHN0cmluZyB8IHVuZGVmaW5lZCB9XG4pIHtcbiAgY29uc3QgcHJvamVjdCA9IGdldFByb2plY3QoaG9zdCwgb3B0aW9ucyk7XG5cbiAgcmV0dXJuIHByb2plY3QucHJvamVjdFR5cGUgPT09ICdsaWJyYXJ5Jztcbn1cbiJdfQ==