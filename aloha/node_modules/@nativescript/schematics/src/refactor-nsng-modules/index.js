"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const schematics_1 = require("@angular-devkit/schematics");
const route_utils_1 = require("../route-utils");
const utils_1 = require("../utils");
const ast_utils_1 = require("../ast-utils");
const ts = require("typescript");
const exception_1 = require("@angular-devkit/schematics/src/exception/exception");
function default_1(options) {
    const { sourceDir } = options;
    return schematics_1.chain([
        (tree) => {
            const entry = getEntryModule(tree, sourceDir);
            const { rootModule, rootModulePath } = getBootstrappedModule(tree, entry, sourceDir);
            let animationModuleIsUsed = false;
            tree.visit(path => {
                if (path.startsWith('/node_modules') ||
                    path.startsWith('/platforms') ||
                    !path.endsWith('.ts') ||
                    path === `/${rootModulePath}`) {
                    return;
                }
                const ngModules = ast_utils_1.getDecoratedClasses(tree, path, 'NgModule');
                const metadataObjects = ngModules
                    .map(m => ({
                    metadataObject: ast_utils_1.getDecoratorMetadataFromClass(m, 'NgModule'),
                    classNode: m,
                }))
                    .filter(({ metadataObject }) => !!metadataObject);
                metadataObjects.forEach(({ metadataObject, classNode }) => {
                    const nativeScriptModuleRemoved = removeImportedNgModule(tree, path, metadataObject, 'NativeScriptModule');
                    if (nativeScriptModuleRemoved) {
                        metadataObject = refetchMetadata(tree, path, classNode);
                        importNgModule(tree, path, metadataObject, 'NativeScriptCommonModule', 'nativescript-angular/common');
                    }
                    metadataObject = refetchMetadata(tree, path, classNode);
                    const animationsModuleRemoved = removeImportedNgModule(tree, path, metadataObject, 'NativeScriptAnimationsModule');
                    animationModuleIsUsed = animationModuleIsUsed || animationsModuleRemoved;
                });
                return true;
            });
            if (animationModuleIsUsed) {
                const rootModuleMetadata = ast_utils_1.getDecoratorMetadataFromClass(rootModule, 'NgModule');
                importNgModule(tree, rootModulePath, rootModuleMetadata, 'NativeScriptAnimationsModule', 'nativescript-angular/animations');
            }
        }
    ]);
}
exports.default = default_1;
const getEntryModule = (tree, sourceDir) => {
    const innerPackageJson = utils_1.getJsonFile(tree, `${sourceDir}/package.json`);
    const entry = innerPackageJson.main;
    const tsEntry = entry.replace(/\.js$/i, '.ts');
    return `${sourceDir}/${tsEntry}`;
};
const getBootstrappedModule = (tree, path, sourceDir) => {
    const entrySource = utils_1.getSourceFile(tree, path);
    const bootstrappedModules = ast_utils_1.collectDeepNodes(entrySource, ts.SyntaxKind.CallExpression)
        .filter(node => ast_utils_1.filterByChildNode(node, (child) => child.kind === ts.SyntaxKind.PropertyAccessExpression &&
        ['bootstrapModule', 'bootstrapModuleNgFactory'].includes(child.name.getFullText())))
        .map((node) => node.arguments[0]);
    if (bootstrappedModules.length !== 1) {
        throw new exception_1.SchematicsException(`You should have exactly one bootstrapped module inside ${path}!`);
    }
    const moduleName = bootstrappedModules[0].getText();
    const imports = ast_utils_1.findImports(moduleName, entrySource);
    const lastImport = imports[imports.length - 1];
    const moduleSpecifier = lastImport.moduleSpecifier.getText();
    const moduleRelativePath = `${moduleSpecifier.replace(/"|'/g, '')}.ts`;
    const rootModulePath = path_1.join(sourceDir, moduleRelativePath);
    const rootModule = ast_utils_1.getDecoratedClasses(tree, rootModulePath, 'NgModule')
        .find(c => !!(c.name && c.name.getText() === moduleName));
    return { rootModule, rootModulePath };
};
const refetchMetadata = (tree, path, classNode) => {
    const newClassNode = ast_utils_1.getDecoratedClass(tree, path, 'NgModule', classNode.name.getText());
    const newMetadataObject = ast_utils_1.getDecoratorMetadataFromClass(newClassNode, 'NgModule');
    return newMetadataObject;
};
const importNgModule = (tree, path, metadataObject, name, importPath) => {
    const nodesToAdd = ast_utils_1.getSymbolsToAddToObject(path, metadataObject, 'imports', name);
    const recorder = tree.beginUpdate(path);
    nodesToAdd.forEach(change => {
        recorder.insertRight(change.pos, change.toAdd);
    });
    tree.commitUpdate(recorder);
    const source = utils_1.getSourceFile(tree, path);
    const newImport = route_utils_1.insertImport(source, path, name, importPath);
    const importRecorder = tree.beginUpdate(path);
    if (newImport.toAdd) {
        importRecorder.insertLeft(newImport.pos, newImport.toAdd);
    }
    tree.commitUpdate(importRecorder);
};
const removeImportedNgModule = (tree, path, metadataObject, name) => {
    const removed = removeNgModuleFromMetadata(tree, path, metadataObject, name);
    if (removed) {
        ast_utils_1.removeImport(tree, path, name);
    }
    return removed;
};
const removeNgModuleFromMetadata = (tree, path, metadataObject, name) => {
    const metadataImports = ast_utils_1.getNodesToRemoveFromNestedArray([metadataObject], 'imports', name);
    const isInMetadata = !!metadataImports.length;
    if (isInMetadata) {
        metadataImports.forEach(declaration => {
            utils_1.removeNode(declaration, path, tree);
        });
    }
    return isInMetadata;
};
//# sourceMappingURL=index.js.map