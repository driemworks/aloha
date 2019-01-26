"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const path_1 = require("path");
const utils_1 = require("../utils");
const component_info_utils_1 = require("./component-info-utils");
const utils_2 = require("../generate/utils");
let extensions;
function default_1(options) {
    let componentInfo;
    return schematics_1.chain([
        (tree) => {
            const nsconfigExtensions = utils_2.getNsConfigExtension(tree);
            extensions = {
                ns: options.nsext || nsconfigExtensions.ns,
                web: options.webext || nsconfigExtensions.web
            };
        },
        (tree, context) => {
            componentInfo = component_info_utils_1.parseComponentInfo(options)(tree, context);
        },
        (tree, context) => addNsFiles(componentInfo, options)(tree, context),
        (tree, context) => addNsStyle(componentInfo, options)(tree, context),
        (tree) => addComponentToNsModuleProviders(componentInfo, options)(tree)
    ]);
}
exports.default = default_1;
const addNsFiles = (componentInfo, options) => (tree, context) => {
    context.logger.info('Adding {N} files');
    let webTemplate = utils_1.getFileContents(tree, componentInfo.componentHtmlPath);
    webTemplate = parseComments(webTemplate);
    const templateOptions = {
        path: path_1.dirname(componentInfo.componentHtmlPath),
        htmlFileName: path_1.basename(componentInfo.componentHtmlPath),
        addNsExtension: (path) => utils_1.addExtension(path, extensions.ns),
        componentName: options.name,
        webTemplate
    };
    const templateSource = schematics_1.apply(schematics_1.url('./_ns-files'), [
        schematics_1.template(templateOptions)
    ]);
    return schematics_1.branchAndMerge(schematics_1.mergeWith(templateSource))(tree, context);
};
/**
 * Replace all --> with ->,
 * This is so that the comments don't accidentally close the comment
 * from the .tns.html file
 */
const parseComments = (htmlFileContents) => htmlFileContents.replace(/-->/g, '->');
const addComponentToNsModuleProviders = (componentInfo, options) => (tree) => {
    if (options.skipModule) {
        return;
    }
    const nsModulePath = utils_1.addExtension(componentInfo.modulePath, extensions.ns);
    // check if the {N} version of the @NgModule exists
    if (!tree.exists(nsModulePath)) {
        throw new schematics_1.SchematicsException(`Module file [${nsModulePath}] doesn't exist.
Create it if you want the schematic to add ${componentInfo.className} to its module declarations,
or if you just want to update the component without updating its module, then rerun this command with --skip-module flag`);
    }
    // Get the changes required to update the @NgModule
    const changes = ast_utils_1.addDeclarationToModule(utils_1.getSourceFile(tree, nsModulePath), nsModulePath, // <- this doesn't look like it is in use
    componentInfo.className, utils_1.findRelativeImportPath(nsModulePath, componentInfo.componentPath));
    // Save changes
    const recorder = tree.beginUpdate(nsModulePath);
    changes.forEach((change) => recorder.insertRight(change.pos, change.toAdd));
    tree.commitUpdate(recorder);
};
const addNsStyle = (componentInfo, options) => (tree, context) => {
    if (!componentInfo.componentStylePath || !options.style) {
        return schematics_1.noop;
    }
    context.logger.info('Adding {N} StyleSheet');
    const templateOptions = {
        path: path_1.dirname(componentInfo.componentHtmlPath),
        styleFileName: path_1.basename(componentInfo.componentStylePath),
        addNsExtension: (path) => utils_1.addExtension(path, extensions.ns),
    };
    const templateSource = schematics_1.apply(schematics_1.url('./_ns-style'), [
        schematics_1.template(templateOptions)
    ]);
    return schematics_1.branchAndMerge(schematics_1.mergeWith(templateSource))(tree, context);
};
//# sourceMappingURL=index.js.map