(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/effects/schematics-core/utility/project", ["require", "exports", "@ngrx/effects/schematics-core/utility/config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var config_1 = require("@ngrx/effects/schematics-core/utility/config");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS9wcm9qZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsdUVBQXdDO0lBUXhDLFNBQWdCLFVBQVUsQ0FDeEIsSUFBVSxFQUNWLE9BQW9FO1FBRXBFLElBQU0sU0FBUyxHQUFHLHFCQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDcEIsT0FBTyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0RDtRQUVELE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQVhELGdDQVdDO0lBRUQsU0FBZ0IsY0FBYyxDQUM1QixJQUFVLEVBQ1YsT0FBb0U7UUFFcEUsSUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUxQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1lBQ25DLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2hFO1FBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUM5QixJQUFNLGNBQWMsR0FDbEIsT0FBTyxDQUFDLFdBQVcsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBRXhELE9BQU8sQ0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFJLE9BQU8sQ0FBQyxJQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsY0FBUSxjQUFnQixDQUFDO1NBQzFFO1FBRUQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFsQkQsd0NBa0JDO0lBRUQsU0FBZ0IsS0FBSyxDQUNuQixJQUFVLEVBQ1YsT0FBb0U7UUFFcEUsSUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUxQyxPQUFPLE9BQU8sQ0FBQyxXQUFXLEtBQUssU0FBUyxDQUFDO0lBQzNDLENBQUM7SUFQRCxzQkFPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFdvcmtzcGFjZSB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IFRyZWUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgV29ya3NwYWNlUHJvamVjdCB7XG4gIHJvb3Q6IHN0cmluZztcbiAgcHJvamVjdFR5cGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2plY3QoXG4gIGhvc3Q6IFRyZWUsXG4gIG9wdGlvbnM6IHsgcHJvamVjdD86IHN0cmluZyB8IHVuZGVmaW5lZDsgcGF0aD86IHN0cmluZyB8IHVuZGVmaW5lZCB9XG4pOiBXb3Jrc3BhY2VQcm9qZWN0IHtcbiAgY29uc3Qgd29ya3NwYWNlID0gZ2V0V29ya3NwYWNlKGhvc3QpO1xuXG4gIGlmICghb3B0aW9ucy5wcm9qZWN0KSB7XG4gICAgb3B0aW9ucy5wcm9qZWN0ID0gT2JqZWN0LmtleXMod29ya3NwYWNlLnByb2plY3RzKVswXTtcbiAgfVxuXG4gIHJldHVybiB3b3Jrc3BhY2UucHJvamVjdHNbb3B0aW9ucy5wcm9qZWN0XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2plY3RQYXRoKFxuICBob3N0OiBUcmVlLFxuICBvcHRpb25zOiB7IHByb2plY3Q/OiBzdHJpbmcgfCB1bmRlZmluZWQ7IHBhdGg/OiBzdHJpbmcgfCB1bmRlZmluZWQgfVxuKSB7XG4gIGNvbnN0IHByb2plY3QgPSBnZXRQcm9qZWN0KGhvc3QsIG9wdGlvbnMpO1xuXG4gIGlmIChwcm9qZWN0LnJvb3Quc3Vic3RyKC0xKSA9PT0gJy8nKSB7XG4gICAgcHJvamVjdC5yb290ID0gcHJvamVjdC5yb290LnN1YnN0cigwLCBwcm9qZWN0LnJvb3QubGVuZ3RoIC0gMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5wYXRoID09PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBwcm9qZWN0RGlyTmFtZSA9XG4gICAgICBwcm9qZWN0LnByb2plY3RUeXBlID09PSAnYXBwbGljYXRpb24nID8gJ2FwcCcgOiAnbGliJztcblxuICAgIHJldHVybiBgJHtwcm9qZWN0LnJvb3QgPyBgLyR7cHJvamVjdC5yb290fWAgOiAnJ30vc3JjLyR7cHJvamVjdERpck5hbWV9YDtcbiAgfVxuXG4gIHJldHVybiBvcHRpb25zLnBhdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xpYihcbiAgaG9zdDogVHJlZSxcbiAgb3B0aW9uczogeyBwcm9qZWN0Pzogc3RyaW5nIHwgdW5kZWZpbmVkOyBwYXRoPzogc3RyaW5nIHwgdW5kZWZpbmVkIH1cbikge1xuICBjb25zdCBwcm9qZWN0ID0gZ2V0UHJvamVjdChob3N0LCBvcHRpb25zKTtcblxuICByZXR1cm4gcHJvamVjdC5wcm9qZWN0VHlwZSA9PT0gJ2xpYnJhcnknO1xufVxuIl19