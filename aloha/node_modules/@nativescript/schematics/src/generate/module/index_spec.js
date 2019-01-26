"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const testing_1 = require("@angular-devkit/schematics/testing");
const test_1 = require("@schematics/angular/utility/test");
const utils_1 = require("../../utils");
const utils_2 = require("../utils");
const test_utils_1 = require("../../test-utils");
describe('Module Schematic', () => {
    const name = 'foo';
    const project = 'test';
    const moduleClassName = utils_1.toNgModuleClassName(name);
    const defaultOptions = {
        project,
        name
    };
    const schematicRunner = new testing_1.SchematicTestRunner('nativescript-schematics', path_1.join(__dirname, '../../collection.json'));
    const getModulePath = (extension) => `/src/app/${name}/${name}.module${extension}.ts`;
    const noExtensionModulePath = getModulePath('');
    const nsModulePath = getModulePath(utils_2.DEFAULT_SHARED_EXTENSIONS.ns);
    const webModulePath = getModulePath(utils_2.DEFAULT_SHARED_EXTENSIONS.web);
    const commonFilePath = `/src/app/${name}/${name}.common.ts`;
    const getRoutingModulePath = (extension) => `/src/app/${name}/${name}-routing.module${extension}.ts`;
    const noExtensionRoutingModulePath = getRoutingModulePath('');
    const nsRoutingModulePath = getRoutingModulePath(utils_2.DEFAULT_SHARED_EXTENSIONS.ns);
    const webRoutingModulePath = getRoutingModulePath(utils_2.DEFAULT_SHARED_EXTENSIONS.web);
    let appTree;
    describe('when in ns-only project', () => {
        beforeEach(() => {
            appTree = utils_1.createEmptyNsOnlyProject(project);
        });
        var tree;
        describe('with default options', () => {
            beforeEach(() => {
                tree = schematicRunner.runSchematic('module', defaultOptions, appTree);
            });
            it('should create tns module file with no extension', () => {
                expect(tree.exists(noExtensionModulePath)).toBeTruthy();
                expect(test_1.getFileContent(tree, noExtensionModulePath)).toContain('NativeScriptCommonModule');
                expect(test_1.getFileContent(tree, noExtensionModulePath)).toContain(`class ${moduleClassName}`);
            });
            it('should not create files with .tns extension', () => {
                expect(tree.exists(nsModulePath)).toBeFalsy();
            });
            it('should not create a common file', () => {
                expect(tree.exists(commonFilePath)).toBeFalsy();
            });
            it('should not have CommonModule imported', () => {
                const content = test_1.getFileContent(tree, noExtensionModulePath);
                expect(content).not.toMatch(`import { CommonModule } from '@angular/common'`);
                expect(content).not.toMatch(test_utils_1.isInModuleMetadata(moduleClassName, 'imports', 'CommonModule', true));
            });
            it('should have NativeScriptCommonModule imported', () => {
                const content = test_1.getFileContent(tree, noExtensionModulePath);
                expect(content).toMatch(`import { NativeScriptCommonModule } from 'nativescript-angular/common'`);
            });
            it('should have NO_ERRORS_SCHEMA imported', () => {
                const content = test_1.getFileContent(tree, noExtensionModulePath);
                expect(content).toMatch(/import { [^}]*NO_ERRORS_SCHEMA(.*)} from '@angular\/core';/);
            });
            it('should have NO_ERRORS_SCHEMA declared', () => {
                const content = test_1.getFileContent(tree, noExtensionModulePath);
                expect(content).toMatch(test_utils_1.isInModuleMetadata(moduleClassName, 'schemas', 'NO_ERRORS_SCHEMA', true));
            });
        });
        it('should respect passed extension', () => {
            const customExtension = '.mobile';
            const options = Object.assign({}, defaultOptions, { routing: true, nsExtension: customExtension });
            tree = schematicRunner.runSchematic('module', options, appTree);
            const modulePath = getModulePath(customExtension);
            expect(tree.exists(modulePath)).toBeTruthy();
            const routingModulePath = getRoutingModulePath(customExtension);
            expect(tree.exists(routingModulePath)).toBeTruthy();
        });
        it('should not have NativeScriptCommonModule imported if that is specified explicitly', () => {
            const options = Object.assign({}, defaultOptions, { commonModule: false });
            const tree = schematicRunner.runSchematic('module', options, appTree);
            const content = test_1.getFileContent(tree, noExtensionModulePath);
            expect(content).not.toMatch(`import { NativeScriptCommonModule } from 'nativescript-angular/common'`);
        });
        it('should not have RouterModule imported in the routing module', () => {
            const options = Object.assign({}, defaultOptions, { routing: true });
            const tree = schematicRunner.runSchematic('module', options, appTree);
            const content = test_1.getFileContent(tree, noExtensionModulePath);
            expect(content).not.toMatch(`import { RouterModule } from '@angular/router'`);
            expect(content).not.toMatch(test_utils_1.isInModuleMetadata(moduleClassName, 'exports', 'RouterModule.forChild', true));
            expect(content).not.toMatch(test_utils_1.isInModuleMetadata(moduleClassName, 'exports', 'RouterModule', true));
        });
        it('should have NativeScriptRouterModule imported', () => {
            const options = Object.assign({}, defaultOptions, { routing: true });
            const tree = schematicRunner.runSchematic('module', options, appTree);
            const content = test_1.getFileContent(tree, noExtensionRoutingModulePath);
            expect(content).toMatch(`import { NativeScriptRouterModule } from 'nativescript-angular/router'`);
        });
    });
    describe('when in ns+web project', () => {
        beforeEach(() => {
            appTree = utils_1.createEmptySharedProject(project);
        });
        describe('executing ns-only schematic', () => {
            const nsOnlyOptions = Object.assign({}, defaultOptions, { nativescript: true, web: false });
            it('should create ns module file', () => {
                const options = Object.assign({}, nsOnlyOptions);
                const tree = schematicRunner.runSchematic('module', options, appTree);
                expect(tree.files.indexOf(nsModulePath)).toBeGreaterThanOrEqual(0);
                expect(test_1.getFileContent(tree, nsModulePath)).toContain('CommonModule');
                expect(test_1.getFileContent(tree, nsModulePath)).toContain(`class ${moduleClassName}`);
            });
            it('should not create web module file', () => {
                const options = Object.assign({}, nsOnlyOptions);
                const tree = schematicRunner.runSchematic('module', options, appTree);
                expect(tree.exists(webModulePath)).toBeFalsy();
            });
            it('should not create a common file', () => {
                const options = Object.assign({}, nsOnlyOptions);
                const tree = schematicRunner.runSchematic('module', options, appTree);
                expect(tree.exists(commonFilePath)).toBeFalsy();
            });
            it('should respect passed extension', () => {
                const customExtension = '.mobile';
                const options = Object.assign({}, nsOnlyOptions, { nsExtension: customExtension, routing: true });
                const tree = schematicRunner.runSchematic('module', options, appTree);
                const modulePath = getModulePath(customExtension);
                expect(tree.exists(modulePath)).toBeTruthy();
                const routingModulePath = getRoutingModulePath(customExtension);
                expect(tree.exists(routingModulePath)).toBeTruthy();
            });
        });
        describe('executing web-only schematic', () => {
            const webOnlyOptions = Object.assign({}, defaultOptions, { nativescript: false, web: true });
            it('should create web module file', () => {
                const options = Object.assign({}, webOnlyOptions);
                const tree = schematicRunner.runSchematic('module', options, appTree);
                expect(tree.files.indexOf(webModulePath)).toBeGreaterThanOrEqual(0);
                expect(test_1.getFileContent(tree, webModulePath)).toContain('CommonModule');
                expect(test_1.getFileContent(tree, webModulePath)).toContain(`class ${moduleClassName}`);
            });
            it('should not create ns module file', () => {
                const options = Object.assign({}, webOnlyOptions);
                const tree = schematicRunner.runSchematic('module', options, appTree);
                expect(tree.exists(nsModulePath)).toBeFalsy();
            });
            it('should not create a common file', () => {
                const options = Object.assign({}, webOnlyOptions);
                const tree = schematicRunner.runSchematic('module', options, appTree);
                expect(tree.exists(commonFilePath)).toBeFalsy();
            });
            it('should respect passed extension', () => {
                const customExtension = '.web';
                const options = Object.assign({}, webOnlyOptions, { webExtension: customExtension, routing: true });
                const tree = schematicRunner.runSchematic('module', options, appTree);
                const modulePath = getModulePath(customExtension);
                expect(tree.exists(modulePath)).toBeTruthy();
                const routingModulePath = getRoutingModulePath(customExtension);
                expect(tree.exists(routingModulePath)).toBeTruthy();
            });
        });
        describe('executing web+ns schematic', () => {
            const nsWebOptions = Object.assign({}, defaultOptions, { nativescript: true, web: true });
            it('should generate both web and ns module files', () => {
                const options = Object.assign({}, nsWebOptions);
                const tree = schematicRunner.runSchematic('module', options, appTree);
                expect(tree.exists(nsModulePath)).toBeTruthy();
                expect(tree.exists(webModulePath)).toBeTruthy();
            });
            it('should not create a common file', () => {
                const options = Object.assign({}, nsWebOptions);
                const tree = schematicRunner.runSchematic('module', options, appTree);
                expect(tree.exists(commonFilePath)).toBeTruthy();
            });
            it('should create both routing modules when routing flag is passed', () => {
                const options = Object.assign({}, nsWebOptions, { routing: true });
                const tree = schematicRunner.runSchematic('module', options, appTree);
                expect(tree.exists(nsRoutingModulePath)).toBeTruthy();
                expect(tree.exists(webRoutingModulePath)).toBeTruthy();
            });
            it('should respect passed extension', () => {
                const nsExtension = '.mobile';
                const webExtension = '.web';
                const options = Object.assign({}, nsWebOptions, { nsExtension, webExtension, routing: true });
                const tree = schematicRunner.runSchematic('module', options, appTree);
                const webModulePath = getModulePath(webExtension);
                const nsModulePath = getModulePath(nsExtension);
                expect(tree.exists(webModulePath)).toBeTruthy();
                expect(tree.exists(nsModulePath)).toBeTruthy();
                const webRoutingModulePath = getRoutingModulePath(webExtension);
                const nsRoutingModulePath = getRoutingModulePath(nsExtension);
                expect(tree.exists(webRoutingModulePath)).toBeTruthy();
                expect(tree.exists(nsRoutingModulePath)).toBeTruthy();
            });
        });
    });
});
//# sourceMappingURL=index_spec.js.map