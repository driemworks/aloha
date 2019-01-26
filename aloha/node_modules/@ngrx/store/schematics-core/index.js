(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core", ["require", "exports", "@ngrx/store/schematics-core/utility/strings", "@ngrx/store/schematics-core/utility/ast-utils", "@ngrx/store/schematics-core/utility/change", "@ngrx/store/schematics-core/utility/config", "@ngrx/store/schematics-core/utility/find-module", "@ngrx/store/schematics-core/utility/ngrx-utils", "@ngrx/store/schematics-core/utility/project", "@ngrx/store/schematics-core/utility/route-utils", "@ngrx/store/schematics-core/utility/update", "@ngrx/store/schematics-core/utility/parse-name", "@ngrx/store/schematics-core/utility/package", "@ngrx/store/schematics-core/utility/libs-version"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var strings_1 = require("@ngrx/store/schematics-core/utility/strings");
    var ast_utils_1 = require("@ngrx/store/schematics-core/utility/ast-utils");
    exports.findNodes = ast_utils_1.findNodes;
    exports.getSourceNodes = ast_utils_1.getSourceNodes;
    exports.getDecoratorMetadata = ast_utils_1.getDecoratorMetadata;
    exports.getContentOfKeyLiteral = ast_utils_1.getContentOfKeyLiteral;
    exports.insertAfterLastOccurrence = ast_utils_1.insertAfterLastOccurrence;
    exports.addBootstrapToModule = ast_utils_1.addBootstrapToModule;
    exports.addDeclarationToModule = ast_utils_1.addDeclarationToModule;
    exports.addExportToModule = ast_utils_1.addExportToModule;
    exports.addImportToModule = ast_utils_1.addImportToModule;
    exports.addProviderToModule = ast_utils_1.addProviderToModule;
    var change_1 = require("@ngrx/store/schematics-core/utility/change");
    exports.NoopChange = change_1.NoopChange;
    exports.InsertChange = change_1.InsertChange;
    exports.RemoveChange = change_1.RemoveChange;
    exports.ReplaceChange = change_1.ReplaceChange;
    var config_1 = require("@ngrx/store/schematics-core/utility/config");
    exports.getWorkspace = config_1.getWorkspace;
    exports.getWorkspacePath = config_1.getWorkspacePath;
    var find_module_1 = require("@ngrx/store/schematics-core/utility/find-module");
    exports.findModule = find_module_1.findModule;
    exports.findModuleFromOptions = find_module_1.findModuleFromOptions;
    exports.buildRelativePath = find_module_1.buildRelativePath;
    var ngrx_utils_1 = require("@ngrx/store/schematics-core/utility/ngrx-utils");
    exports.addReducerToState = ngrx_utils_1.addReducerToState;
    exports.addReducerToStateInterface = ngrx_utils_1.addReducerToStateInterface;
    exports.addReducerImportToNgModule = ngrx_utils_1.addReducerImportToNgModule;
    exports.addReducerToActionReducerMap = ngrx_utils_1.addReducerToActionReducerMap;
    exports.omit = ngrx_utils_1.omit;
    var project_1 = require("@ngrx/store/schematics-core/utility/project");
    exports.getProjectPath = project_1.getProjectPath;
    exports.getProject = project_1.getProject;
    exports.isLib = project_1.isLib;
    var route_utils_1 = require("@ngrx/store/schematics-core/utility/route-utils");
    exports.insertImport = route_utils_1.insertImport;
    exports.stringUtils = {
        dasherize: strings_1.dasherize,
        decamelize: strings_1.decamelize,
        camelize: strings_1.camelize,
        classify: strings_1.classify,
        underscore: strings_1.underscore,
        group: strings_1.group,
        capitalize: strings_1.capitalize,
        featurePath: strings_1.featurePath,
    };
    var update_1 = require("@ngrx/store/schematics-core/utility/update");
    exports.updatePackage = update_1.updatePackage;
    var parse_name_1 = require("@ngrx/store/schematics-core/utility/parse-name");
    exports.parseName = parse_name_1.parseName;
    var package_1 = require("@ngrx/store/schematics-core/utility/package");
    exports.addPackageToPackageJson = package_1.addPackageToPackageJson;
    var libs_version_1 = require("@ngrx/store/schematics-core/utility/libs-version");
    exports.platformVersion = libs_version_1.platformVersion;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NjaGVtYXRpY3MtY29yZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLHVFQVMyQjtJQUUzQiwyRUFXNkI7SUFWM0IsZ0NBQUEsU0FBUyxDQUFBO0lBQ1QscUNBQUEsY0FBYyxDQUFBO0lBQ2QsMkNBQUEsb0JBQW9CLENBQUE7SUFDcEIsNkNBQUEsc0JBQXNCLENBQUE7SUFDdEIsZ0RBQUEseUJBQXlCLENBQUE7SUFDekIsMkNBQUEsb0JBQW9CLENBQUE7SUFDcEIsNkNBQUEsc0JBQXNCLENBQUE7SUFDdEIsd0NBQUEsaUJBQWlCLENBQUE7SUFDakIsd0NBQUEsaUJBQWlCLENBQUE7SUFDakIsMENBQUEsbUJBQW1CLENBQUE7SUFHckIscUVBTzBCO0lBSnhCLDhCQUFBLFVBQVUsQ0FBQTtJQUNWLGdDQUFBLFlBQVksQ0FBQTtJQUNaLGdDQUFBLFlBQVksQ0FBQTtJQUNaLGlDQUFBLGFBQWEsQ0FBQTtJQUdmLHFFQUE2RTtJQUF6RCxnQ0FBQSxZQUFZLENBQUE7SUFBRSxvQ0FBQSxnQkFBZ0IsQ0FBQTtJQUVsRCwrRUFLK0I7SUFKN0IsbUNBQUEsVUFBVSxDQUFBO0lBQ1YsOENBQUEscUJBQXFCLENBQUE7SUFDckIsMENBQUEsaUJBQWlCLENBQUE7SUFJbkIsNkVBTThCO0lBTDVCLHlDQUFBLGlCQUFpQixDQUFBO0lBQ2pCLGtEQUFBLDBCQUEwQixDQUFBO0lBQzFCLGtEQUFBLDBCQUEwQixDQUFBO0lBQzFCLG9EQUFBLDRCQUE0QixDQUFBO0lBQzVCLDRCQUFBLElBQUksQ0FBQTtJQUdOLHVFQUFzRTtJQUE3RCxtQ0FBQSxjQUFjLENBQUE7SUFBRSwrQkFBQSxVQUFVLENBQUE7SUFBRSwwQkFBQSxLQUFLLENBQUE7SUFDMUMsK0VBQXFEO0lBQTVDLHFDQUFBLFlBQVksQ0FBQTtJQUVSLFFBQUEsV0FBVyxHQUFHO1FBQ3pCLFNBQVMscUJBQUE7UUFDVCxVQUFVLHNCQUFBO1FBQ1YsUUFBUSxvQkFBQTtRQUNSLFFBQVEsb0JBQUE7UUFDUixVQUFVLHNCQUFBO1FBQ1YsS0FBSyxpQkFBQTtRQUNMLFVBQVUsc0JBQUE7UUFDVixXQUFXLHVCQUFBO0tBQ1osQ0FBQztJQUVGLHFFQUFpRDtJQUF4QyxpQ0FBQSxhQUFhLENBQUE7SUFFdEIsNkVBQWlEO0lBQXhDLGlDQUFBLFNBQVMsQ0FBQTtJQUVsQix1RUFBNEQ7SUFBbkQsNENBQUEsdUJBQXVCLENBQUE7SUFFaEMsaUZBQXlEO0lBQWhELHlDQUFBLGVBQWUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGRhc2hlcml6ZSxcbiAgZGVjYW1lbGl6ZSxcbiAgY2FtZWxpemUsXG4gIGNsYXNzaWZ5LFxuICB1bmRlcnNjb3JlLFxuICBncm91cCxcbiAgY2FwaXRhbGl6ZSxcbiAgZmVhdHVyZVBhdGgsXG59IGZyb20gJy4vdXRpbGl0eS9zdHJpbmdzJztcblxuZXhwb3J0IHtcbiAgZmluZE5vZGVzLFxuICBnZXRTb3VyY2VOb2RlcyxcbiAgZ2V0RGVjb3JhdG9yTWV0YWRhdGEsXG4gIGdldENvbnRlbnRPZktleUxpdGVyYWwsXG4gIGluc2VydEFmdGVyTGFzdE9jY3VycmVuY2UsXG4gIGFkZEJvb3RzdHJhcFRvTW9kdWxlLFxuICBhZGREZWNsYXJhdGlvblRvTW9kdWxlLFxuICBhZGRFeHBvcnRUb01vZHVsZSxcbiAgYWRkSW1wb3J0VG9Nb2R1bGUsXG4gIGFkZFByb3ZpZGVyVG9Nb2R1bGUsXG59IGZyb20gJy4vdXRpbGl0eS9hc3QtdXRpbHMnO1xuXG5leHBvcnQge1xuICBIb3N0LFxuICBDaGFuZ2UsXG4gIE5vb3BDaGFuZ2UsXG4gIEluc2VydENoYW5nZSxcbiAgUmVtb3ZlQ2hhbmdlLFxuICBSZXBsYWNlQ2hhbmdlLFxufSBmcm9tICcuL3V0aWxpdHkvY2hhbmdlJztcblxuZXhwb3J0IHsgQXBwQ29uZmlnLCBnZXRXb3Jrc3BhY2UsIGdldFdvcmtzcGFjZVBhdGggfSBmcm9tICcuL3V0aWxpdHkvY29uZmlnJztcblxuZXhwb3J0IHtcbiAgZmluZE1vZHVsZSxcbiAgZmluZE1vZHVsZUZyb21PcHRpb25zLFxuICBidWlsZFJlbGF0aXZlUGF0aCxcbiAgTW9kdWxlT3B0aW9ucyxcbn0gZnJvbSAnLi91dGlsaXR5L2ZpbmQtbW9kdWxlJztcblxuZXhwb3J0IHtcbiAgYWRkUmVkdWNlclRvU3RhdGUsXG4gIGFkZFJlZHVjZXJUb1N0YXRlSW50ZXJmYWNlLFxuICBhZGRSZWR1Y2VySW1wb3J0VG9OZ01vZHVsZSxcbiAgYWRkUmVkdWNlclRvQWN0aW9uUmVkdWNlck1hcCxcbiAgb21pdCxcbn0gZnJvbSAnLi91dGlsaXR5L25ncngtdXRpbHMnO1xuXG5leHBvcnQgeyBnZXRQcm9qZWN0UGF0aCwgZ2V0UHJvamVjdCwgaXNMaWIgfSBmcm9tICcuL3V0aWxpdHkvcHJvamVjdCc7XG5leHBvcnQgeyBpbnNlcnRJbXBvcnQgfSBmcm9tICcuL3V0aWxpdHkvcm91dGUtdXRpbHMnO1xuXG5leHBvcnQgY29uc3Qgc3RyaW5nVXRpbHMgPSB7XG4gIGRhc2hlcml6ZSxcbiAgZGVjYW1lbGl6ZSxcbiAgY2FtZWxpemUsXG4gIGNsYXNzaWZ5LFxuICB1bmRlcnNjb3JlLFxuICBncm91cCxcbiAgY2FwaXRhbGl6ZSxcbiAgZmVhdHVyZVBhdGgsXG59O1xuXG5leHBvcnQgeyB1cGRhdGVQYWNrYWdlIH0gZnJvbSAnLi91dGlsaXR5L3VwZGF0ZSc7XG5cbmV4cG9ydCB7IHBhcnNlTmFtZSB9IGZyb20gJy4vdXRpbGl0eS9wYXJzZS1uYW1lJztcblxuZXhwb3J0IHsgYWRkUGFja2FnZVRvUGFja2FnZUpzb24gfSBmcm9tICcuL3V0aWxpdHkvcGFja2FnZSc7XG5cbmV4cG9ydCB7IHBsYXRmb3JtVmVyc2lvbiB9IGZyb20gJy4vdXRpbGl0eS9saWJzLXZlcnNpb24nO1xuIl19