"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const schematics_1 = require("@angular-devkit/schematics");
const path_1 = require("path");
const ts = require("typescript");
const angular_project_parser_1 = require("../angular-project-parser");
const utils_1 = require("../utils");
const ast_utils_1 = require("../ast-utils");
const decorator_utils_1 = require("../decorator-utils");
let projectSettings;
exports.parseComponentInfo = (options) => (tree, context) => {
    projectSettings = angular_project_parser_1.getAngularProjectSettings(tree, options.project);
    const className = (options.name.endsWith('Component'))
        ? options.name
        : strings_1.classify(`${options.name}Component`);
    // if no module is provided and the skipModule flag is on, then don't search for module path
    const modulePath = (!options.module && options.skipModule) ? '' : findModulePath(options, tree);
    const componentPath = findComponentPath(className, modulePath, options, tree);
    const componentHtmlPath = findTemplateUrl(componentPath, className, tree);
    const componentStylePath = findStyleUrl(componentPath, className, tree);
    const componentInfo = {
        className,
        modulePath,
        componentPath,
        componentHtmlPath,
        componentStylePath
    };
    context.logger.info(`ComponentInfo
${JSON.stringify(componentInfo, null, 2)}`);
    return componentInfo;
};
const findModulePath = (options, tree) => {
    // When module Path provided, 
    if (options.modulePath) {
        // check if it is correct
        if (tree.exists(options.modulePath)) {
            return options.modulePath;
        }
        // or maybe we need to add src/app/
        const modulePath = path_1.join(projectSettings.sourceRoot, 'app', options.modulePath);
        if (!tree.exists(modulePath)) {
            throw new schematics_1.SchematicsException(`Invalid --modulePath: ${options.modulePath}
  File cannot be found at ${options.modulePath} or ${modulePath}`);
        }
        return modulePath;
    }
    // If no Module provided or if it is App or AppModule
    else if (!options.module ||
        options.module.toLowerCase() === projectSettings.entryModuleName.toLowerCase() ||
        options.module.toLowerCase() === projectSettings.entryModuleClassName.toLowerCase()) {
        return projectSettings.entryModulePath;
    }
    // When a specified Module has been provided
    else {
        const modulePath = path_1.join(projectSettings.sourceRoot, // src/
        'app', // app/
        strings_1.dasherize(options.module), // some-name/
        strings_1.dasherize(options.module) + '.module.ts' // some-name.module.ts
        );
        if (tree.exists(modulePath)) {
            return modulePath;
        }
        else {
            throw new schematics_1.SchematicsException(`couldn't find the module at: ${modulePath}`);
        }
    }
};
const findComponentPath = (componentClassName, modulePath, options, tree) => {
    let componentPath = '';
    // When the path is provided, then there is no need to look anywhere else
    if (options.componentPath) {
        componentPath = path_1.join(projectSettings.sourceRoot, 'app', options.componentPath);
        if (!tree.exists(componentPath)) {
            throw new schematics_1.SchematicsException(`Invalid --path value ${options.componentPath}
  Couldn't find the file at: ${componentPath}
  Expecting something like: component-name/component-name.component.ts`);
        }
        // Check to see if componentClassName is the class used in componentPath file content
        const source = utils_1.getSourceFile(tree, componentPath);
        const matchingNodes = ast_utils_1.findMatchingNodes(source, [
            { kind: ts.SyntaxKind.ClassDeclaration, name: componentClassName }
        ]);
        if (matchingNodes.length === 0) {
            throw new schematics_1.SchematicsException(`The file at the provided --path: 
  [${componentPath}]
  doesn't contain the ${componentClassName} Class`);
        }
        else {
            console.log("NODE MATCHES");
        }
    }
    // When we have the module that imports the component
    // else if (!options.skipModule) {
    else if (modulePath) {
        const source = utils_1.getSourceFile(tree, modulePath);
        const componentImportPath = ast_utils_1.findImportPath(source, componentClassName);
        console.log(`${componentClassName} import found in its module at: ${componentImportPath}`);
        componentPath = path_1.join(path_1.dirname(modulePath), componentImportPath);
        if (!componentPath.endsWith('.ts')) {
            componentPath = componentPath + '.ts';
        }
        if (tree.exists(componentPath)) {
            console.log(`${componentClassName} file found at: ${componentPath}`);
        }
        else {
            throw new schematics_1.SchematicsException(`Cannot locate Component ${componentClassName} at: ${componentPath}`);
        }
    }
    // When the component is not part of any module
    else {
        console.log(`Trying to deduct ${componentClassName} location following Angular best practices`);
        const fileName = `${strings_1.dasherize(options.name)}.component.ts`;
        const app = path_1.join(projectSettings.sourceRoot, 'app');
        // search at src/app/file-name
        if (tree.exists(path_1.join(app, fileName))) {
            componentPath = path_1.join(app, fileName);
        }
        // search at src/app/dasherize(component-name)/file-name
        else if (tree.exists(path_1.join(app, strings_1.dasherize(options.name), fileName))) {
            componentPath = path_1.join(app, strings_1.dasherize(options.name), fileName);
        }
        else {
            throw new schematics_1.SchematicsException(`Couldn't find component's .ts file.
  You can use --component-path parameter to provide the path to the component.
  Hint. don't include src/app with --component-path`);
        }
    }
    return componentPath;
};
const findTemplateUrl = (componentPath, componentClassName, tree) => {
    const source = utils_1.getSourceFile(tree, componentPath);
    const node = decorator_utils_1.findDecoratorPropertyNode(source, componentClassName, 'Component', 'templateUrl');
    if (node === null) {
        // TODO: need a solution for components that don't use templateUrl
        throw new schematics_1.SchematicsException(`${componentClassName} cannot be converted, as it should be using templateUrl property in the @NgModule decorator`);
    }
    if (ts.isStringLiteral(node)) {
        const templatePath = node.text;
        return path_1.join(path_1.dirname(componentPath), templatePath);
    }
    else {
        throw new schematics_1.SchematicsException(`${node.getText()} for Component ${componentClassName} is expected have the assigned value as StringLiteral`);
    }
};
const findStyleUrl = (componentPath, componentClassName, tree) => {
    const source = utils_1.getSourceFile(tree, componentPath);
    const node = decorator_utils_1.findDecoratorPropertyNode(source, componentClassName, 'Component', 'styleUrls');
    if (node === null) {
        return '';
    }
    if (ts.isArrayLiteralExpression(node) && node.elements.length > 0) {
        const stylePath = node.elements[0].text;
        return path_1.join(path_1.dirname(componentPath), stylePath);
    }
    return '';
};
//# sourceMappingURL=component-info-utils.js.map