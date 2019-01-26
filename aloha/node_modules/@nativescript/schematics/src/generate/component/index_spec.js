"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const testing_1 = require("@angular-devkit/schematics/testing");
const test_1 = require("@schematics/angular/utility/test");
const utils_1 = require("../../utils");
const utils_2 = require("../utils");
const test_utils_1 = require("../../test-utils");
describe('Component Schematic', () => {
    const name = 'foo';
    const project = 'leproj';
    const componentClassName = utils_1.toComponentClassName(name);
    const defaultOptions = { name, project };
    const schematicRunner = new testing_1.SchematicTestRunner('nativescript-schematics', path_1.join(__dirname, '../../collection.json'));
    const componentPath = `src/app/${name}/${name}.component.ts`;
    const rootModulePath = `src/app/app.module.ts`;
    const rootNsModulePath = `src/app/app.module.tns.ts`;
    const getTemplatePath = (extension) => `src/app/${name}/${name}.component${extension}.html`;
    const noExtensionTemplatePath = getTemplatePath('');
    const nsTemplatePath = getTemplatePath(utils_2.DEFAULT_SHARED_EXTENSIONS.ns);
    const webTemplatePath = getTemplatePath(utils_2.DEFAULT_SHARED_EXTENSIONS.web);
    const getStylesheetPath = (extension, styleExtension = 'css') => `src/app/${name}/${name}.component${extension}.${styleExtension}`;
    const noExtensionStylesheetPath = getStylesheetPath('');
    const nsStylesheetPath = getStylesheetPath(utils_2.DEFAULT_SHARED_EXTENSIONS.ns);
    const webStylesheetPath = getStylesheetPath(utils_2.DEFAULT_SHARED_EXTENSIONS.web);
    let appTree;
    const hasModuleId = () => {
        const content = test_1.getFileContent(appTree, componentPath);
        const matcher = test_utils_1.isInComponentMetadata(componentClassName, 'moduleId', 'module.id', false);
        return content.match(matcher);
    };
    const ensureWebTemplate = (tree, path) => {
        expect(tree.exists(path)).toBeTruthy();
        const content = test_1.getFileContent(tree, webTemplatePath);
        expect(content).toMatch(/\<p\>/);
    };
    const ensureNsTemplate = (tree, path) => {
        expect(tree.exists(path)).toBeTruthy();
        const content = test_1.getFileContent(tree, path);
        expect(content).toMatch(/Button/);
    };
    describe('when in ns-only project', () => {
        beforeAll(() => {
            appTree = utils_1.createEmptyNsOnlyProject(project);
            const options = Object.assign({}, defaultOptions, { nativescript: true, web: false });
            appTree = schematicRunner.runSchematic('component', options, appTree);
        });
        it('should create template without extension', () => expect(appTree.exists(noExtensionTemplatePath)).toBeTruthy());
        it('should not create template with {N} extension', () => expect(appTree.exists(nsTemplatePath)).toBeFalsy());
        it('should add {N}-specific markup in template', () => ensureNsTemplate(appTree, noExtensionTemplatePath));
        it('should create stylesheet without extension', () => expect(appTree.exists(noExtensionStylesheetPath)).toBeTruthy());
        it('should not create stylesheet with {N} extension', () => expect(appTree.exists(nsStylesheetPath)).toBeFalsy());
        it('should add module id', () => expect(hasModuleId()).toBeTruthy());
        it('should declare the component in the root NgModule for {N}', () => {
            const nsModuleContent = test_1.getFileContent(appTree, rootModulePath);
            expect(nsModuleContent).toMatch(test_utils_1.isInModuleMetadata('AppModule', 'declarations', componentClassName, true));
        });
    });
    describe('when in ns-only project, create a component in /home folder', () => {
        const homeDir = 'home';
        const componentName = `${homeDir}/${name}`;
        const componentPath = `src/app/${homeDir}/${name}/${name}.component.ts`;
        const templatePath = `src/app/${homeDir}/${name}/${name}.component.html`;
        beforeAll(() => {
            appTree = utils_1.createEmptyNsOnlyProject(project);
            const options = Object.assign({}, defaultOptions, { name: componentName, nativescript: true, web: false });
            appTree = schematicRunner.runSchematic('component', options, appTree);
        });
        it('should create component in the home folder', () => expect(appTree.exists(componentPath)).toBeTruthy());
        it('should create template in the home folder', () => expect(appTree.exists(templatePath)).toBeTruthy());
        it('should declare the component in the root NgModule for {N} using name FooComponent with the import to home/foo', () => {
            const nsModuleContent = test_1.getFileContent(appTree, rootModulePath);
            expect(nsModuleContent).toMatch(test_utils_1.isInModuleMetadata('AppModule', 'declarations', componentClassName, true));
        });
    });
    describe('when in ns+web project', () => {
        describe('executing ns+web schematic', () => {
            beforeAll(() => {
                appTree = utils_1.createEmptySharedProject(project);
                const options = Object.assign({}, defaultOptions, { web: true, nativescript: true });
                appTree = schematicRunner.runSchematic('component', options, appTree);
            });
            it('should add web-specific markup file', () => ensureWebTemplate(appTree, webTemplatePath));
            it('should add {N}-specific markup file', () => ensureNsTemplate(appTree, nsTemplatePath));
            it('should add web-specific stylesheet file', () => expect(appTree.exists(webStylesheetPath)).toBeTruthy());
            it('should add {N}-specific stylesheet file', () => expect(appTree.exists(nsStylesheetPath)).toBeTruthy());
            it('should add module id', () => expect(hasModuleId()).toBeFalsy());
            it('should declare the component in the the root NgModule for web', () => {
                const webModuleContent = test_1.getFileContent(appTree, rootModulePath);
                expect(webModuleContent).toMatch(test_utils_1.isInModuleMetadata('AppModule', 'declarations', componentClassName, true));
            });
            it('should declare the component in the root NgModule for {N}', () => {
                const nsModuleContent = test_1.getFileContent(appTree, rootNsModulePath);
                expect(nsModuleContent).toMatch(test_utils_1.isInModuleMetadata('AppModule', 'declarations', componentClassName, true));
            });
        });
        describe('executing ns-only schematic', () => {
            beforeAll(() => {
                appTree = utils_1.createEmptySharedProject(project);
                const options = Object.assign({}, defaultOptions, { web: false, nativescript: true });
                appTree = schematicRunner.runSchematic('component', options, appTree);
            });
            it('should add {N}-specific markup file', () => ensureNsTemplate(appTree, nsTemplatePath));
            it('should add {N}-specific stylesheet file', () => expect(appTree.exists(nsStylesheetPath)).toBeTruthy());
            it('should add module id', () => expect(hasModuleId()).toBeFalsy());
            it('should not declare the component in the the root NgModule for web', () => {
                const webModuleContent = test_1.getFileContent(appTree, rootModulePath);
                expect(webModuleContent).not.toMatch(test_utils_1.isInModuleMetadata('AppModule', 'declarations', componentClassName, true));
            });
            it('should declare the component in the root NgModule for {N}', () => {
                const nsModuleContent = test_1.getFileContent(appTree, rootNsModulePath);
                expect(nsModuleContent).toMatch(test_utils_1.isInModuleMetadata('AppModule', 'declarations', componentClassName, true));
            });
        });
        describe('executing web-only schematic', () => {
            beforeAll(() => {
                appTree = utils_1.createEmptySharedProject(project);
                const options = Object.assign({}, defaultOptions, { web: true, nativescript: false });
                appTree = schematicRunner.runSchematic('component', options, appTree);
            });
            it('should add web-specific markup file', () => ensureWebTemplate(appTree, webTemplatePath));
            it('should add module id', () => expect(hasModuleId()).toBeFalsy());
            it('should declare the component in the the root NgModule for web', () => {
                const webModuleContent = test_1.getFileContent(appTree, rootModulePath);
                expect(webModuleContent).toMatch(test_utils_1.isInModuleMetadata('AppModule', 'declarations', componentClassName, true));
            });
            it('should not declare the component in the root NgModule for {N}', () => {
                const nsModuleContent = test_1.getFileContent(appTree, rootNsModulePath);
                expect(nsModuleContent).not.toMatch(test_utils_1.isInModuleMetadata('AppModule', 'declarations', componentClassName, true));
            });
        });
    });
    describe('specifying custom extension', () => {
        describe('in ns only project', () => {
            const customExtension = '.mobile';
            beforeEach(() => {
                appTree = utils_1.createEmptyNsOnlyProject(project, customExtension);
            });
            it('should respect specified {N} extension', () => {
                const options = Object.assign({}, defaultOptions, { nsExtension: customExtension, nativescript: true });
                appTree = schematicRunner.runSchematic('component', options, appTree);
                const componentTemplatePath = getTemplatePath(customExtension);
                expect(appTree.exists(componentTemplatePath)).toBeTruthy();
                const componentStylesheetPath = getStylesheetPath(customExtension);
                expect(appTree.exists(componentStylesheetPath)).toBeTruthy();
            });
            it('should respect specified style extension', () => {
                const styleext = 'scss';
                const options = Object.assign({}, defaultOptions, { nsExtension: customExtension, styleext, nativescript: true });
                appTree = schematicRunner.runSchematic('component', options, appTree);
                const componentStylesheetPath = getStylesheetPath(customExtension, styleext);
                expect(appTree.exists(componentStylesheetPath)).toBeTruthy();
            });
        });
        describe('in ns+web project', () => {
            describe('when a custom web extension is specified', () => {
                const customExtension = '.web';
                const componentOptions = Object.assign({}, defaultOptions, { webExtension: customExtension, web: true });
                beforeEach(() => {
                    appTree = utils_1.createEmptySharedProject(project, customExtension, '.tns');
                });
                it('should create the files with this extension', () => {
                    const options = Object.assign({}, componentOptions);
                    appTree = schematicRunner.runSchematic('component', options, appTree);
                    const componentTemplatePath = getTemplatePath(customExtension);
                    expect(appTree.exists(componentTemplatePath)).toBeTruthy();
                });
                it('should declare in NgModule', () => {
                    const options = Object.assign({}, componentOptions);
                    appTree = schematicRunner.runSchematic('component', options, appTree);
                    const webModulePath = `src/app/app.module${customExtension}.ts`;
                    const nsModulePath = `src/app/app.module.tns.ts`;
                    const matcher = test_utils_1.isInModuleMetadata('AppModule', 'declarations', componentClassName, true);
                    const webModuleContent = test_1.getFileContent(appTree, webModulePath);
                    expect(webModuleContent).toMatch(matcher);
                    const nsModuleContent = test_1.getFileContent(appTree, nsModulePath);
                    expect(nsModuleContent).toMatch(matcher);
                });
                it('should respect the module option', () => {
                    const moduleName = 'random';
                    const webModulePath = `src/app/${moduleName}/${moduleName}.module${customExtension}.ts`;
                    const nsModulePath = `src/app/${moduleName}/${moduleName}.module.tns.ts`;
                    appTree = schematicRunner.runSchematic('module', {
                        project,
                        name: moduleName,
                        webExtension: customExtension,
                    }, appTree);
                    const options = Object.assign({}, componentOptions, { module: moduleName });
                    appTree = schematicRunner.runSchematic('component', options, appTree);
                    const matcher = test_utils_1.isInModuleMetadata('RandomModule', 'declarations', componentClassName, true);
                    const webModuleContent = test_1.getFileContent(appTree, webModulePath);
                    expect(webModuleContent).toMatch(matcher);
                    const nsModuleContent = test_1.getFileContent(appTree, nsModulePath);
                    expect(nsModuleContent).toMatch(matcher);
                });
            });
            describe('when a custom {N} extension is specified', () => {
                const customExtension = '.mobile';
                const componentOptions = Object.assign({}, defaultOptions, { nsExtension: customExtension, nativescript: true });
                beforeEach(() => {
                    appTree = utils_1.createEmptySharedProject(project, '', customExtension);
                });
                it('should create the files with this extension', () => {
                    const options = Object.assign({}, componentOptions);
                    appTree = schematicRunner.runSchematic('component', options, appTree);
                    const componentTemplatePath = getTemplatePath(customExtension);
                    expect(appTree.exists(componentTemplatePath)).toBeTruthy();
                    const componentStylesheetPath = getStylesheetPath(customExtension);
                    expect(appTree.exists(componentStylesheetPath)).toBeTruthy();
                });
                it('should declare in NgModule', () => {
                    const options = Object.assign({}, componentOptions);
                    appTree = schematicRunner.runSchematic('component', options, appTree);
                    const webModulePath = `src/app/app.module.ts`;
                    const nsModulePath = `src/app/app.module${customExtension}.ts`;
                    const matcher = test_utils_1.isInModuleMetadata('AppModule', 'declarations', componentClassName, true);
                    const webModuleContent = test_1.getFileContent(appTree, webModulePath);
                    expect(webModuleContent).toMatch(matcher);
                    const nsModuleContent = test_1.getFileContent(appTree, nsModulePath);
                    expect(nsModuleContent).toMatch(matcher);
                });
                it('should respect the module option', () => {
                    const moduleName = 'random';
                    const webModulePath = `src/app/${moduleName}/${moduleName}.module.ts`;
                    const nsModulePath = `src/app/${moduleName}/${moduleName}.module${customExtension}.ts`;
                    appTree = schematicRunner.runSchematic('module', {
                        project,
                        name: moduleName,
                        nsExtension: customExtension,
                    }, appTree);
                    const options = Object.assign({}, componentOptions, { module: moduleName });
                    appTree = schematicRunner.runSchematic('component', options, appTree);
                    const matcher = test_utils_1.isInModuleMetadata('RandomModule', 'declarations', componentClassName, true);
                    const webModuleContent = test_1.getFileContent(appTree, webModulePath);
                    expect(webModuleContent).toMatch(matcher);
                    const nsModuleContent = test_1.getFileContent(appTree, nsModulePath);
                    expect(nsModuleContent).toMatch(matcher);
                });
            });
            describe('when custom web and {N} extensions are specified', () => {
                const nsExtension = '.mobile';
                const webExtension = '.web';
                const componentOptions = Object.assign({}, defaultOptions, { nsExtension, webExtension, web: true, nativescript: true });
                beforeEach(() => {
                    appTree = utils_1.createEmptySharedProject(project, webExtension, nsExtension);
                });
                it('should create the files with these extensions', () => {
                    const options = Object.assign({}, componentOptions);
                    appTree = schematicRunner.runSchematic('component', options, appTree);
                    const nsTemplate = getTemplatePath(nsExtension);
                    const webTemplate = getTemplatePath(webExtension);
                    expect(appTree.exists(nsTemplate)).toBeTruthy();
                    expect(appTree.exists(webTemplate)).toBeTruthy();
                    const nsStylesheet = getStylesheetPath(nsExtension);
                    const webStylesheet = getStylesheetPath(webExtension);
                    expect(appTree.exists(nsStylesheet)).toBeTruthy();
                    expect(appTree.exists(webStylesheet)).toBeTruthy();
                });
                it('should declare in NgModule', () => {
                    const options = Object.assign({}, componentOptions);
                    appTree = schematicRunner.runSchematic('component', options, appTree);
                    const webModulePath = `src/app/app.module${webExtension}.ts`;
                    const nsModulePath = `src/app/app.module${nsExtension}.ts`;
                    const matcher = test_utils_1.isInModuleMetadata('AppModule', 'declarations', componentClassName, true);
                    const webModuleContent = test_1.getFileContent(appTree, webModulePath);
                    expect(webModuleContent).toMatch(matcher);
                    const nsModuleContent = test_1.getFileContent(appTree, nsModulePath);
                    expect(nsModuleContent).toMatch(matcher);
                });
                it('should respect the module option', () => {
                    const moduleName = 'random';
                    const webModulePath = `src/app/${moduleName}/${moduleName}.module${webExtension}.ts`;
                    const nsModulePath = `src/app/${moduleName}/${moduleName}.module${nsExtension}.ts`;
                    appTree = schematicRunner.runSchematic('module', {
                        project,
                        name: moduleName,
                        webExtension,
                        nsExtension,
                    }, appTree);
                    const options = Object.assign({}, componentOptions, { module: moduleName });
                    appTree = schematicRunner.runSchematic('component', options, appTree);
                    const matcher = test_utils_1.isInModuleMetadata('RandomModule', 'declarations', componentClassName, true);
                    const webModuleContent = test_1.getFileContent(appTree, webModulePath);
                    expect(webModuleContent).toMatch(matcher);
                    const nsModuleContent = test_1.getFileContent(appTree, nsModulePath);
                    expect(nsModuleContent).toMatch(matcher);
                });
            });
        });
    });
});
//# sourceMappingURL=index_spec.js.map