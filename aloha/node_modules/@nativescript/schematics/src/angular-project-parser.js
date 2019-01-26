"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const path_1 = require("path");
const schematics_1 = require("@angular-devkit/schematics");
const config_1 = require("@schematics/angular/utility/config");
const project_1 = require("@schematics/angular/utility/project");
const project_targets_1 = require("@schematics/angular/utility/project-targets");
const ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
const utils_1 = require("./utils");
const ast_utils_1 = require("./ast-utils");
function getAngularProjectSettings(tree, projectName) {
    const projectSettings = getCoreProjectSettings(tree, projectName);
    const entryModule = getEntryModuleMetadata(tree, projectSettings.mainPath);
    const entryComponent = getEntryComponentMetadata(tree, entryModule.path);
    const indexAppRootTag = getAppRootTag(tree, entryComponent.path);
    return Object.assign({}, projectSettings, { entryModuleClassName: entryModule.className, entryModuleImportPath: entryModule.importPath, entryModuleName: entryModule.name, entryModulePath: entryModule.path, entryComponentClassName: entryComponent.className, entryComponentImportPath: entryComponent.importPath, entryComponentName: entryComponent.name, entryComponentPath: entryComponent.path, indexAppRootTag });
}
exports.getAngularProjectSettings = getAngularProjectSettings;
function getCoreProjectSettings(tree, projectName) {
    const project = getProjectObject(tree, projectName);
    const targets = project_targets_1.getProjectTargets(project);
    if (!targets) {
        throw new schematics_1.SchematicsException(`Failed to find build targets for project ${projectName}!`);
    }
    const buildTarget = targets.build;
    if (!buildTarget) {
        throw new schematics_1.SchematicsException(`Failed to find build target for project ${projectName}!`);
    }
    const root = project.root;
    const sourceRoot = project.sourceRoot || 'src';
    const mainPath = utils_1.safeGet(buildTarget, 'options', 'main');
    const mainName = path_1.basename(mainPath).replace(/\.ts$/, '');
    const prefix = project.prefix;
    const tsConfig = utils_1.safeGet(buildTarget, 'options', 'tsConfig');
    return {
        root,
        sourceRoot,
        mainName,
        mainPath,
        prefix,
        tsConfig,
    };
}
function getProjectObject(tree, projectName) {
    const workspace = config_1.getWorkspace(tree);
    const project = project_1.getProject(workspace, projectName);
    if (!project) {
        throw new schematics_1.SchematicsException(`Couldn't find project "${projectName}" in the workspace!`);
    }
    return project;
}
function getEntryModuleMetadata(tree, mainPath) {
    const bootstrapCall = ng_ast_utils_1.findBootstrapModuleCall(tree, mainPath);
    if (!bootstrapCall) {
        throw new schematics_1.SchematicsException('Bootstrap call not found! Cannot build project data!');
    }
    const className = bootstrapCall.arguments[0].getText();
    const name = className.replace(/Module$/, '');
    const importPath = ng_ast_utils_1.findBootstrapModulePath(tree, mainPath);
    const path = ng_ast_utils_1.getAppModulePath(tree, mainPath);
    const metadata = {
        className,
        name,
        importPath,
        path,
    };
    return metadata;
}
// Step 3 - get appComponent and appComponentPath => open ${appRoot}/${entryModulePath} 
// - get appComponent from bootstrap: [ __value__ ]
// - get appComponentPath from import { ${appComponent} } from '__value__'
function getEntryComponentMetadata(tree, entryModulePath) {
    const source = utils_1.getSourceFile(tree, entryModulePath);
    // find -> bootstrap -> array -> array value
    // bootstrap: [
    //   AppComponent  <- end result
    // ],
    const node = ast_utils_1.findNode(source, [
        { kind: ts.SyntaxKind.PropertyAssignment, name: 'bootstrap' },
        { kind: ts.SyntaxKind.ArrayLiteralExpression }
    ]);
    const className = node.elements[0].getText();
    const name = className.replace('Component', '');
    const importPath = ast_utils_1.findImportPath(source, className);
    const entryModuleDir = path_1.dirname(entryModulePath);
    const path = path_1.join(entryModuleDir, importPath) + '.ts';
    return {
        className,
        name,
        importPath,
        path
    };
}
// Step 4 - get indexAppRootTag => open ${appRoot}/${appComponentPath} - get from selector: '__value__'
function getAppRootTag(tree, entryComponentPath) {
    const source = utils_1.getSourceFile(tree, entryComponentPath);
    const node = ast_utils_1.findNode(source, [
        { kind: ts.SyntaxKind.PropertyAssignment, name: 'selector' },
        { kind: ts.SyntaxKind.StringLiteral }
    ]);
    const indexAppRootTag = node.text;
    return indexAppRootTag;
}
//# sourceMappingURL=angular-project-parser.js.map