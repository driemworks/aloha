"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const schematics_1 = require("@angular-devkit/schematics");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const find_module_1 = require("@schematics/angular/utility/find-module");
const change_1 = require("@schematics/angular/utility/change");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const utils_1 = require("../../utils");
const ast_utils_2 = require("../../ast-utils");
exports.insertModuleId = (tree, component) => {
    const componentSource = utils_1.getSourceFile(tree, component);
    const recorder = tree.beginUpdate(component);
    const metadataChange = addSymbolToComponentMetadata(componentSource, component, 'moduleId', 'module.id');
    metadataChange.forEach((change) => recorder.insertRight(change.pos, change.toAdd));
    tree.commitUpdate(recorder);
};
function addSymbolToComponentMetadata(source, componentPath, metadataField, symbolName) {
    return ast_utils_2.addSymbolToDecoratorMetadata(source, componentPath, metadataField, symbolName, 'Component', '@angular/core');
}
function addDeclarationToNgModule(tree, options, componentPath, modulePath) {
    const source = readIntoSourceFile(tree, modulePath);
    const relativePath = find_module_1.buildRelativePath(modulePath, componentPath);
    const classifiedName = strings_1.classify(`${options.name}Component`);
    const declarationChanges = ast_utils_1.addDeclarationToModule(source, modulePath, classifiedName, relativePath);
    const declarationRecorder = tree.beginUpdate(modulePath);
    for (const change of declarationChanges) {
        if (change instanceof change_1.InsertChange) {
            declarationRecorder.insertLeft(change.pos, change.toAdd);
        }
    }
    tree.commitUpdate(declarationRecorder);
    if (options.export) {
        // Need to refresh the AST because we overwrote the file in the host.
        const source = readIntoSourceFile(tree, modulePath);
        const exportRecorder = tree.beginUpdate(modulePath);
        const exportChanges = ast_utils_1.addExportToModule(source, modulePath, strings_1.classify(`${options.name}Component`), relativePath);
        for (const change of exportChanges) {
            if (change instanceof change_1.InsertChange) {
                exportRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        tree.commitUpdate(exportRecorder);
    }
    if (options.entryComponent) {
        // Need to refresh the AST because we overwrote the file in the host.
        const source = readIntoSourceFile(tree, modulePath);
        const entryComponentRecorder = tree.beginUpdate(modulePath);
        const entryComponentChanges = ast_utils_1.addEntryComponentToModule(source, modulePath, strings_1.classify(`${options.name}Component`), relativePath);
        for (const change of entryComponentChanges) {
            if (change instanceof change_1.InsertChange) {
                entryComponentRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        tree.commitUpdate(entryComponentRecorder);
    }
}
exports.addDeclarationToNgModule = addDeclarationToNgModule;
function readIntoSourceFile(host, modulePath) {
    const text = host.read(modulePath);
    if (text === null) {
        throw new schematics_1.SchematicsException(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    return ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
}
//# sourceMappingURL=ast-utils.js.map