"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const testing_1 = require("@angular-devkit/schematics/testing");
const schematics_1 = require("@angular-devkit/schematics");
const test_1 = require("@schematics/angular/utility/test");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const utils_1 = require("../utils");
const test_utils_1 = require("../test-utils");
describe('Migrate module Schematic', () => {
    const project = 'some-project';
    const moduleName = 'admin';
    const defaultOptions = {
        name: moduleName,
        project,
        style: true
    };
    const nsModulePath = '/src/app/admin/admin.module.tns.ts';
    const webModulePath = '/src/app/admin/admin.module.ts';
    const schematicRunner = new testing_1.SchematicTestRunner('nativescript-schematics', path_1.join(__dirname, '../collection.json'));
    let appTree;
    beforeEach(() => {
        appTree = new testing_1.UnitTestTree(new schematics_1.HostTree);
        appTree = setupProject(appTree, schematicRunner, project, moduleName);
    });
    describe('When the name of existing module is provided', () => {
        beforeEach(() => {
            const options = Object.assign({}, defaultOptions);
            appTree = schematicRunner.runSchematic('migrate-module', options, appTree);
        });
        it('should create a mobile module file', () => {
            expect(appTree.files.includes('/src/app/admin/admin.module.tns.ts')).toBeTruthy();
        });
        it('should create a common file', () => {
            expect(appTree.files.includes('/src/app/admin/admin.common.ts')).toBeTruthy();
        });
    });
    describe('When a custom mobile extension is provided', () => {
        beforeEach(() => {
            const options = Object.assign({}, defaultOptions, { nsext: 'mobile' });
            appTree = schematicRunner.runSchematic('migrate-module', options, appTree);
        });
        it('should create the module file with that extension', () => {
            expect(appTree.files.includes('/src/app/admin/admin.module.mobile.ts')).toBeTruthy();
        });
        it('should create a common file without the extension', () => {
            expect(appTree.files.includes('/src/app/admin/admin.common.ts')).toBeTruthy();
        });
    });
    describe('When the module has a component', () => {
        let originalWebModuleContent;
        beforeEach(() => {
            appTree = schematicRunner.runSchematic('component', {
                name: 'a',
                module: moduleName,
                project,
                nativescript: false,
            }, appTree);
            originalWebModuleContent = test_1.getFileContent(appTree, webModulePath);
            const options = Object.assign({}, defaultOptions);
            appTree = schematicRunner.runSchematic('migrate-module', options, appTree);
        });
        it('should keep the web module untouched', () => {
            expect(appTree.files.includes(webModulePath)).toBeTruthy();
            expect(test_1.getFileContent(appTree, webModulePath)).toEqual(originalWebModuleContent);
        });
        it('should declare the component in the mobile module', () => {
            expect(appTree.files.includes(nsModulePath)).toBeTruthy();
            const content = test_1.getFileContent(appTree, nsModulePath);
            const matcher = test_utils_1.isInModuleMetadata('AdminModule', 'declarations', 'AComponent', true);
            expect(content).toMatch(matcher);
        });
    });
    describe('When the module has a provider', () => {
        const provider = 'SomeProvider';
        let originalWebModuleContent;
        beforeEach(() => {
            appTree = insertProviderInMetadata(appTree, webModulePath, provider);
            originalWebModuleContent = test_1.getFileContent(appTree, webModulePath);
            const options = Object.assign({}, defaultOptions);
            appTree = schematicRunner.runSchematic('migrate-module', options, appTree);
        });
        it('should keep the web module untouched', () => {
            expect(appTree.files.includes(webModulePath)).toBeTruthy();
            expect(test_1.getFileContent(appTree, webModulePath)).toEqual(originalWebModuleContent);
        });
        it('should provide the service in the mobile module', () => {
            expect(appTree.files.includes(nsModulePath)).toBeTruthy();
            const content = test_1.getFileContent(appTree, nsModulePath);
            const matcher = test_utils_1.isInModuleMetadata('AdminModule', 'providers', provider, true);
            expect(content).toMatch(matcher);
        });
    });
});
const setupProject = (appTree, schematicRunner, project, moduleName) => {
    appTree = schematicRunner.runSchematic('shared', {
        name: project,
        prefix: '',
        sourceDir: 'src',
        style: 'css',
        theme: true,
        sample: false,
    }, appTree);
    appTree = utils_1.moveToRoot(schematicRunner, appTree, project);
    appTree = schematicRunner.runSchematic('module', {
        name: moduleName,
        nativescript: false,
        web: true,
        project,
    }, appTree);
    return appTree;
};
const insertProviderInMetadata = (tree, path, providerName) => {
    const source = utils_1.getSourceFile(tree, path);
    const recorder = tree.beginUpdate(path);
    // Insert a provider in the NgModule metadata
    const metadataChange = ast_utils_1.addSymbolToNgModuleMetadata(source, path, 'providers', providerName, 'somepath');
    metadataChange.forEach((change) => recorder.insertRight(change.pos, change.toAdd));
    tree.commitUpdate(recorder);
    return tree;
};
//# sourceMappingURL=index_spec.js.map