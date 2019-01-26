"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const schematics_1 = require("@angular-devkit/schematics");
const path_1 = require("path");
const angular_project_parser_1 = require("../angular-project-parser");
const decorator_utils_1 = require("../decorator-utils");
let projectSettings;
exports.parseModuleInfo = (options) => (tree, context) => {
    projectSettings = angular_project_parser_1.getAngularProjectSettings(tree, options.project);
    const className = strings_1.classify(`${options.name}Module`);
    const modulePath = findModulePath(options, tree);
    const providers = decorator_utils_1.getNgModuleProperties(modulePath, className, 'providers', tree);
    const declarations = decorator_utils_1.getNgModuleProperties(modulePath, className, 'declarations', tree);
    const moduleInfo = {
        className,
        modulePath,
        providers,
        declarations
    };
    context.logger.info(`ModuleInfo
  ${JSON.stringify(moduleInfo, null, 2)}`);
    return moduleInfo;
};
const findModulePath = (options, tree) => {
    let modulePath = '';
    // When module Path provided, check if it is correct
    if (options.modulePath) {
        modulePath = path_1.join(projectSettings.sourceRoot, 'app', options.modulePath);
        if (!tree.exists(modulePath)) {
            throw new schematics_1.SchematicsException(`Invalid --modulePath: ${options.modulePath}
  File cannot be found at ${modulePath}
  Expecting something like: module-name/module-name.module.ts`);
        }
    }
    // When a specified Module has been provided
    else {
        modulePath = path_1.join(projectSettings.sourceRoot, // src/
        'app', // app/
        strings_1.dasherize(options.name), // some-name/
        strings_1.dasherize(options.name) + '.module.ts' // some-name.module.ts
        );
        if (!tree.exists(modulePath)) {
            throw new schematics_1.SchematicsException(`Couldn't find the module at: ${modulePath}`);
        }
    }
    return modulePath;
};
//# sourceMappingURL=module-info-utils.js.map