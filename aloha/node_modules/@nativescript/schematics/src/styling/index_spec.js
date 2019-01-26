"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular-devkit/schematics/testing");
const test_1 = require("@schematics/angular/utility/test");
const path = require("path");
const schematics_1 = require("@angular-devkit/schematics");
describe('Styling Schematic', () => {
    const schematicRunner = new testing_1.SchematicTestRunner('nativescript-schematics', path.join(__dirname, '../collection.json'));
    const appPath = 'foo';
    const sourceDir = 'app';
    const defaultOptions = {
        appPath,
        sourceDir,
        extension: 'css',
        theme: true,
    };
    let appTree;
    beforeEach(() => {
        appTree = new schematics_1.VirtualTree();
        appTree.create(`${appPath}/package.json`, '{}');
    });
    describe('when css is used', () => {
        let extension;
        let stylingFile;
        beforeEach(() => {
            extension = 'css';
            stylingFile = `/${appPath}/${sourceDir}/app.css`;
        });
        it('should create app.css file', () => {
            const options = Object.assign({}, defaultOptions, { extension });
            const tree = schematicRunner.runSchematic('styling', options, appTree);
            expect(tree.exists(stylingFile));
        });
        it('should not add scss dependencies to package.json', () => {
            const options = Object.assign({}, defaultOptions, { extension });
            const tree = schematicRunner.runSchematic('styling', options, appTree);
            const content = test_1.getFileContent(tree, `${appPath}/package.json`);
            expect(content).not.toMatch('"nativescript-dev-sass": ');
        });
        it('should handle the theme flag', () => {
            const options = Object.assign({}, defaultOptions, { extension, theme: false });
            const tree = schematicRunner.runSchematic('styling', options, appTree);
            expect(test_1.getFileContent(tree, stylingFile))
                .not
                .toMatch(new RegExp('@import "~nativescript-theme-core/css/core.light.css";'));
        });
    });
    describe('when scss is used', () => {
        let extension;
        beforeEach(() => {
            extension = 'scss';
        });
        it('should create scss file', () => {
            const options = Object.assign({}, defaultOptions, { extension });
            const tree = schematicRunner.runSchematic('styling', options, appTree);
            expect(tree.exists(`${appPath}/${sourceDir}/app.android.scss`));
            expect(tree.exists(`${appPath}/${sourceDir}/app.ios.scss`));
            expect(tree.exists(`${appPath}/${sourceDir}/_app-common.scss`));
            expect(tree.exists(`${appPath}/${sourceDir}/_app-variables.scss`));
        });
        it('should add scss dependencies to package.json', () => {
            const options = Object.assign({}, defaultOptions, { extension });
            const tree = schematicRunner.runSchematic('styling', options, appTree);
            const content = test_1.getFileContent(tree, `${appPath}/package.json`);
            expect(content).toMatch('"nativescript-dev-sass": ');
        });
        it('should handle the theme flag', () => {
            const options = Object.assign({}, defaultOptions, { extension, theme: false });
            const tree = schematicRunner.runSchematic('styling', options, appTree);
            expect(test_1.getFileContent(tree, `${appPath}/${sourceDir}/app.android.scss`))
                .not
                .toMatch(new RegExp('@import \'~nativescript-theme-core/scss/index\';'));
            expect(test_1.getFileContent(tree, `${appPath}/${sourceDir}/app.android.scss`))
                .not
                .toMatch(new RegExp('@import \'~nativescript-theme-core/scss/platforms/index.android\';'));
            expect(test_1.getFileContent(tree, `${appPath}/${sourceDir}/app.ios.scss`))
                .not
                .toMatch(new RegExp('@import \'~nativescript-theme-core/scss/index\';'));
            expect(test_1.getFileContent(tree, `${appPath}/${sourceDir}/app.ios.scss`))
                .not
                .toMatch(new RegExp('@import \'~nativescript-theme-core/scss/platforms/index.ios\';'));
            expect(test_1.getFileContent(tree, `${appPath}/${sourceDir}/_app-variables.scss`))
                .not
                .toMatch(new RegExp('@import \'~nativescript-theme-core/scss/light\';'));
        });
    });
});
//# sourceMappingURL=index_spec.js.map