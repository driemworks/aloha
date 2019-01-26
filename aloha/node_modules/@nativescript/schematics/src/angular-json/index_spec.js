"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const testing_1 = require("@angular-devkit/schematics/testing");
const test_1 = require("@schematics/angular/utility/test");
describe('Angular JSON Config Schematic', () => {
    const schematicRunner = new testing_1.SchematicTestRunner('nativescript-schematics', path.join(__dirname, '../collection.json'));
    const projName = 'leproj';
    const defaultOptions = {
        name: projName,
    };
    const configPath = `/angular.json`;
    describe('with default options (name only)', () => {
        let tree;
        beforeAll(() => {
            tree = schematicRunner.runSchematic('angular-json', defaultOptions);
        });
        it('should create angular.json files', () => {
            expect(tree.files.indexOf(configPath)).toBeGreaterThanOrEqual(0);
        });
        it('should insert the project name', () => {
            expect(test_1.getFileContent(tree, configPath)).toContain(`"${projName}":`);
        });
        it('should insert "." as sourceRoot', () => {
            expect(test_1.getFileContent(tree, configPath)).toContain(`"sourceRoot": "."`);
        });
    });
    it('should insert the prefix option', () => {
        const prefix = 'custom-prefix';
        const tree = schematicRunner.runSchematic('angular-json', Object.assign({}, defaultOptions, { prefix }));
        expect(test_1.getFileContent(tree, configPath)).toContain(`"prefix": "${prefix}"`);
    });
    it('should insert the sourceRoot option', () => {
        const sourceRoot = 'src';
        const tree = schematicRunner.runSchematic('angular-json', Object.assign({}, defaultOptions, { sourceRoot }));
        expect(test_1.getFileContent(tree, configPath)).toContain(`"sourceRoot": "${sourceRoot}"`);
    });
    it('should create files inside path when specified', () => {
        const path = '/path/to/my/app';
        const appJsonPath = `${path}/angular.json`;
        const options = Object.assign({}, defaultOptions, { path });
        const tree = schematicRunner.runSchematic('angular-json', options);
        expect(tree.files.indexOf(appJsonPath)).toBeGreaterThanOrEqual(0);
    });
});
//# sourceMappingURL=index_spec.js.map