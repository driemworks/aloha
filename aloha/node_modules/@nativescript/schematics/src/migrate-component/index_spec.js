"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const testing_1 = require("@angular-devkit/schematics/testing");
const schematics_1 = require("@angular-devkit/schematics");
const test_1 = require("@schematics/angular/utility/test");
const test_utils_1 = require("../test-utils");
const utils_1 = require("../utils");
describe('Migrate component schematic', () => {
    const project = 'some-project';
    const schematicRunner = new testing_1.SchematicTestRunner('nativescript-schematics', path_1.join(__dirname, '../collection.json'));
    let appTree;
    beforeEach(() => {
        appTree = new testing_1.UnitTestTree(new schematics_1.HostTree());
        appTree = setupProject(appTree, schematicRunner, project);
    });
    describe('When the name of existing component is provided', () => {
        const componentName = 'a';
        const options = {
            project,
            name: componentName,
            style: true
        };
        const htmlComponentPath = `/src/app/${componentName}/${componentName}.component.html`;
        const xmlComponentPath = `/src/app/${componentName}/${componentName}.component.tns.html`;
        beforeEach(() => {
            appTree = schematicRunner.runSchematic('component', {
                name: componentName,
                nativescript: false,
                web: true,
                project,
            }, appTree);
            appTree = schematicRunner.runSchematic('migrate-component', options, appTree);
        });
        it('should create an {N} markup file for the component', () => {
            expect(appTree.files.includes(xmlComponentPath)).toBeTruthy();
        });
        it('should declare the component in the correct NgModule', () => {
            const nsModulePath = `/src/app/app.module.tns.ts`;
            const content = test_1.getFileContent(appTree, nsModulePath);
            const matcher = test_utils_1.isInModuleMetadata('AppModule', 'declarations', 'AComponent', true);
            expect(content).toMatch(matcher);
        });
        it('should put the original web template in the {N} markup file', () => {
            const html = test_1.getFileContent(appTree, htmlComponentPath);
            const xml = test_1.getFileContent(appTree, xmlComponentPath);
            expect(xml.includes(html)).toBeTruthy();
        });
    });
    describe('When component imported in another module is provided', () => {
        const componentName = 'a';
        const moduleName = 'b';
        const options = {
            project,
            name: componentName,
            module: moduleName,
            style: true
        };
        const htmlComponentPath = `/src/app/${componentName}/${componentName}.component.html`;
        const xmlComponentPath = `/src/app/${componentName}/${componentName}.component.tns.html`;
        beforeEach(() => {
            appTree = schematicRunner.runSchematic('module', {
                project,
                name: moduleName,
            }, appTree);
            appTree = schematicRunner.runSchematic('component', {
                project,
                nativescript: false,
                web: true,
                name: componentName,
                module: moduleName,
            }, appTree);
            appTree = schematicRunner.runSchematic('migrate-component', Object.assign({}, options), appTree);
        });
        it('should create an {N} markup file for the component', () => {
            expect(appTree.files.includes(xmlComponentPath)).toBeTruthy();
        });
        it('should declare the component in the correct NgModule', () => {
            const nsModulePath = `/src/app/${moduleName}/${moduleName}.module.tns.ts`;
            const content = test_1.getFileContent(appTree, nsModulePath);
            const matcher = test_utils_1.isInModuleMetadata("BModule", 'declarations', 'AComponent', true);
            expect(content).toMatch(matcher);
        });
        it('should put the original web template in the {N} markup file', () => {
            const html = test_1.getFileContent(appTree, htmlComponentPath);
            const xml = test_1.getFileContent(appTree, xmlComponentPath);
            expect(xml.includes(html)).toBeTruthy();
        });
    });
});
const setupProject = (appTree, schematicRunner, project) => {
    appTree = schematicRunner.runSchematic('shared', {
        name: project,
        prefix: '',
        sourceDir: 'src',
        style: 'css',
        theme: true,
        sample: false,
    }, appTree);
    appTree = utils_1.moveToRoot(schematicRunner, appTree, project);
    return appTree;
};
//# sourceMappingURL=index_spec.js.map