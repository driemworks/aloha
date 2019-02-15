(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/effects/schematics-core", ["require", "exports", "@ngrx/effects/schematics-core/utility/strings", "@ngrx/effects/schematics-core/utility/ast-utils", "@ngrx/effects/schematics-core/utility/change", "@ngrx/effects/schematics-core/utility/config", "@ngrx/effects/schematics-core/utility/find-module", "@ngrx/effects/schematics-core/utility/ngrx-utils", "@ngrx/effects/schematics-core/utility/project", "@ngrx/effects/schematics-core/utility/route-utils", "@ngrx/effects/schematics-core/utility/update", "@ngrx/effects/schematics-core/utility/parse-name", "@ngrx/effects/schematics-core/utility/package", "@ngrx/effects/schematics-core/utility/libs-version"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var strings_1 = require("@ngrx/effects/schematics-core/utility/strings");
    var ast_utils_1 = require("@ngrx/effects/schematics-core/utility/ast-utils");
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
    var change_1 = require("@ngrx/effects/schematics-core/utility/change");
    exports.NoopChange = change_1.NoopChange;
    exports.InsertChange = change_1.InsertChange;
    exports.RemoveChange = change_1.RemoveChange;
    exports.ReplaceChange = change_1.ReplaceChange;
    var config_1 = require("@ngrx/effects/schematics-core/utility/config");
    exports.getWorkspace = config_1.getWorkspace;
    exports.getWorkspacePath = config_1.getWorkspacePath;
    var find_module_1 = require("@ngrx/effects/schematics-core/utility/find-module");
    exports.findModule = find_module_1.findModule;
    exports.findModuleFromOptions = find_module_1.findModuleFromOptions;
    exports.buildRelativePath = find_module_1.buildRelativePath;
    var ngrx_utils_1 = require("@ngrx/effects/schematics-core/utility/ngrx-utils");
    exports.addReducerToState = ngrx_utils_1.addReducerToState;
    exports.addReducerToStateInterface = ngrx_utils_1.addReducerToStateInterface;
    exports.addReducerImportToNgModule = ngrx_utils_1.addReducerImportToNgModule;
    exports.addReducerToActionReducerMap = ngrx_utils_1.addReducerToActionReducerMap;
    exports.omit = ngrx_utils_1.omit;
    var project_1 = require("@ngrx/effects/schematics-core/utility/project");
    exports.getProjectPath = project_1.getProjectPath;
    exports.getProject = project_1.getProject;
    exports.isLib = project_1.isLib;
    var route_utils_1 = require("@ngrx/effects/schematics-core/utility/route-utils");
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
    var update_1 = require("@ngrx/effects/schematics-core/utility/update");
    exports.updatePackage = update_1.updatePackage;
    var parse_name_1 = require("@ngrx/effects/schematics-core/utility/parse-name");
    exports.parseName = parse_name_1.parseName;
    var package_1 = require("@ngrx/effects/schematics-core/utility/package");
    exports.addPackageToPackageJson = package_1.addPackageToPackageJson;
    var libs_version_1 = require("@ngrx/effects/schematics-core/utility/libs-version");
    exports.platformVersion = libs_version_1.platformVersion;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VmZmVjdHMvc2NoZW1hdGljcy1jb3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEseUVBUzJCO0lBRTNCLDZFQVc2QjtJQVYzQixnQ0FBQSxTQUFTLENBQUE7SUFDVCxxQ0FBQSxjQUFjLENBQUE7SUFDZCwyQ0FBQSxvQkFBb0IsQ0FBQTtJQUNwQiw2Q0FBQSxzQkFBc0IsQ0FBQTtJQUN0QixnREFBQSx5QkFBeUIsQ0FBQTtJQUN6QiwyQ0FBQSxvQkFBb0IsQ0FBQTtJQUNwQiw2Q0FBQSxzQkFBc0IsQ0FBQTtJQUN0Qix3Q0FBQSxpQkFBaUIsQ0FBQTtJQUNqQix3Q0FBQSxpQkFBaUIsQ0FBQTtJQUNqQiwwQ0FBQSxtQkFBbUIsQ0FBQTtJQUdyQix1RUFPMEI7SUFKeEIsOEJBQUEsVUFBVSxDQUFBO0lBQ1YsZ0NBQUEsWUFBWSxDQUFBO0lBQ1osZ0NBQUEsWUFBWSxDQUFBO0lBQ1osaUNBQUEsYUFBYSxDQUFBO0lBR2YsdUVBQTZFO0lBQXpELGdDQUFBLFlBQVksQ0FBQTtJQUFFLG9DQUFBLGdCQUFnQixDQUFBO0lBRWxELGlGQUsrQjtJQUo3QixtQ0FBQSxVQUFVLENBQUE7SUFDViw4Q0FBQSxxQkFBcUIsQ0FBQTtJQUNyQiwwQ0FBQSxpQkFBaUIsQ0FBQTtJQUluQiwrRUFNOEI7SUFMNUIseUNBQUEsaUJBQWlCLENBQUE7SUFDakIsa0RBQUEsMEJBQTBCLENBQUE7SUFDMUIsa0RBQUEsMEJBQTBCLENBQUE7SUFDMUIsb0RBQUEsNEJBQTRCLENBQUE7SUFDNUIsNEJBQUEsSUFBSSxDQUFBO0lBR04seUVBQXNFO0lBQTdELG1DQUFBLGNBQWMsQ0FBQTtJQUFFLCtCQUFBLFVBQVUsQ0FBQTtJQUFFLDBCQUFBLEtBQUssQ0FBQTtJQUMxQyxpRkFBcUQ7SUFBNUMscUNBQUEsWUFBWSxDQUFBO0lBRVIsUUFBQSxXQUFXLEdBQUc7UUFDekIsU0FBUyxxQkFBQTtRQUNULFVBQVUsc0JBQUE7UUFDVixRQUFRLG9CQUFBO1FBQ1IsUUFBUSxvQkFBQTtRQUNSLFVBQVUsc0JBQUE7UUFDVixLQUFLLGlCQUFBO1FBQ0wsVUFBVSxzQkFBQTtRQUNWLFdBQVcsdUJBQUE7S0FDWixDQUFDO0lBRUYsdUVBQWlEO0lBQXhDLGlDQUFBLGFBQWEsQ0FBQTtJQUV0QiwrRUFBaUQ7SUFBeEMsaUNBQUEsU0FBUyxDQUFBO0lBRWxCLHlFQUE0RDtJQUFuRCw0Q0FBQSx1QkFBdUIsQ0FBQTtJQUVoQyxtRkFBeUQ7SUFBaEQseUNBQUEsZUFBZSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgZGFzaGVyaXplLFxuICBkZWNhbWVsaXplLFxuICBjYW1lbGl6ZSxcbiAgY2xhc3NpZnksXG4gIHVuZGVyc2NvcmUsXG4gIGdyb3VwLFxuICBjYXBpdGFsaXplLFxuICBmZWF0dXJlUGF0aCxcbn0gZnJvbSAnLi91dGlsaXR5L3N0cmluZ3MnO1xuXG5leHBvcnQge1xuICBmaW5kTm9kZXMsXG4gIGdldFNvdXJjZU5vZGVzLFxuICBnZXREZWNvcmF0b3JNZXRhZGF0YSxcbiAgZ2V0Q29udGVudE9mS2V5TGl0ZXJhbCxcbiAgaW5zZXJ0QWZ0ZXJMYXN0T2NjdXJyZW5jZSxcbiAgYWRkQm9vdHN0cmFwVG9Nb2R1bGUsXG4gIGFkZERlY2xhcmF0aW9uVG9Nb2R1bGUsXG4gIGFkZEV4cG9ydFRvTW9kdWxlLFxuICBhZGRJbXBvcnRUb01vZHVsZSxcbiAgYWRkUHJvdmlkZXJUb01vZHVsZSxcbn0gZnJvbSAnLi91dGlsaXR5L2FzdC11dGlscyc7XG5cbmV4cG9ydCB7XG4gIEhvc3QsXG4gIENoYW5nZSxcbiAgTm9vcENoYW5nZSxcbiAgSW5zZXJ0Q2hhbmdlLFxuICBSZW1vdmVDaGFuZ2UsXG4gIFJlcGxhY2VDaGFuZ2UsXG59IGZyb20gJy4vdXRpbGl0eS9jaGFuZ2UnO1xuXG5leHBvcnQgeyBBcHBDb25maWcsIGdldFdvcmtzcGFjZSwgZ2V0V29ya3NwYWNlUGF0aCB9IGZyb20gJy4vdXRpbGl0eS9jb25maWcnO1xuXG5leHBvcnQge1xuICBmaW5kTW9kdWxlLFxuICBmaW5kTW9kdWxlRnJvbU9wdGlvbnMsXG4gIGJ1aWxkUmVsYXRpdmVQYXRoLFxuICBNb2R1bGVPcHRpb25zLFxufSBmcm9tICcuL3V0aWxpdHkvZmluZC1tb2R1bGUnO1xuXG5leHBvcnQge1xuICBhZGRSZWR1Y2VyVG9TdGF0ZSxcbiAgYWRkUmVkdWNlclRvU3RhdGVJbnRlcmZhY2UsXG4gIGFkZFJlZHVjZXJJbXBvcnRUb05nTW9kdWxlLFxuICBhZGRSZWR1Y2VyVG9BY3Rpb25SZWR1Y2VyTWFwLFxuICBvbWl0LFxufSBmcm9tICcuL3V0aWxpdHkvbmdyeC11dGlscyc7XG5cbmV4cG9ydCB7IGdldFByb2plY3RQYXRoLCBnZXRQcm9qZWN0LCBpc0xpYiB9IGZyb20gJy4vdXRpbGl0eS9wcm9qZWN0JztcbmV4cG9ydCB7IGluc2VydEltcG9ydCB9IGZyb20gJy4vdXRpbGl0eS9yb3V0ZS11dGlscyc7XG5cbmV4cG9ydCBjb25zdCBzdHJpbmdVdGlscyA9IHtcbiAgZGFzaGVyaXplLFxuICBkZWNhbWVsaXplLFxuICBjYW1lbGl6ZSxcbiAgY2xhc3NpZnksXG4gIHVuZGVyc2NvcmUsXG4gIGdyb3VwLFxuICBjYXBpdGFsaXplLFxuICBmZWF0dXJlUGF0aCxcbn07XG5cbmV4cG9ydCB7IHVwZGF0ZVBhY2thZ2UgfSBmcm9tICcuL3V0aWxpdHkvdXBkYXRlJztcblxuZXhwb3J0IHsgcGFyc2VOYW1lIH0gZnJvbSAnLi91dGlsaXR5L3BhcnNlLW5hbWUnO1xuXG5leHBvcnQgeyBhZGRQYWNrYWdlVG9QYWNrYWdlSnNvbiB9IGZyb20gJy4vdXRpbGl0eS9wYWNrYWdlJztcblxuZXhwb3J0IHsgcGxhdGZvcm1WZXJzaW9uIH0gZnJvbSAnLi91dGlsaXR5L2xpYnMtdmVyc2lvbic7XG4iXX0=