"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const testing_1 = require("@angular-devkit/schematics/testing");
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("../../utils");
describe('Master-detail schematic', () => {
    const master = 'heroes';
    const detail = 'hero';
    const defaultOptions = {
        master,
        detail,
    };
    const schematicRunner = new testing_1.SchematicTestRunner('nativescript-schematics', path_1.join(__dirname, '../../collection.json'));
    let appTree;
    describe('When in {N}-only project', () => {
        beforeEach(() => {
            appTree = new testing_1.UnitTestTree(new schematics_1.HostTree);
            appTree = utils_1.createEmptyNsOnlyProject('some-project');
            appTree = schematicRunner.runSchematic('master-detail', Object.assign({}, defaultOptions), appTree);
        });
        it('should create all necessary files', () => {
            const { files } = appTree;
            expect(files.includes(`/app/${master}/${master}.module.ts`)).toBeTruthy();
            expect(files.includes(`/app/${master}/data.service.ts`)).toBeTruthy();
            expect(files.includes(`/app/${master}/${detail}-detail/${detail}-detail.component.ts`)).toBeTruthy();
            expect(files.includes(`/app/${master}/${detail}-detail/${detail}-detail.component.html`)).toBeTruthy();
            expect(files.includes(`/app/${master}/${master}/${master}.component.ts`)).toBeTruthy();
            expect(files.includes(`/app/${master}/${master}/${master}.component.html`)).toBeTruthy();
        });
    });
    describe('When in web+{N} project', () => {
        beforeEach(() => {
            appTree = new testing_1.UnitTestTree(new schematics_1.HostTree);
            appTree = utils_1.createEmptySharedProject('some-project');
            appTree = schematicRunner.runSchematic('master-detail', Object.assign({}, defaultOptions), appTree);
        });
        it('should create all necessary files', () => {
            const { files } = appTree;
            expect(files.includes(`/src/app/${master}/${master}.module.tns.ts`)).toBeTruthy();
            expect(files.includes(`/src/app/${master}/${master}.module.ts`)).toBeTruthy();
            expect(files.includes(`/src/app/${master}/${master}.common.ts`)).toBeTruthy();
            expect(files.includes(`/src/app/${master}/data.service.ts`)).toBeTruthy();
            expect(files.includes(`/src/app/${master}/${detail}-detail/${detail}-detail.component.ts`)).toBeTruthy();
            expect(files.includes(`/src/app/${master}/${detail}-detail/${detail}-detail.component.html`)).toBeTruthy();
            expect(files.includes(`/src/app/${master}/${detail}-detail/${detail}-detail.component.tns.html`)).toBeTruthy();
            expect(files.includes(`/src/app/${master}/${master}/${master}.component.ts`)).toBeTruthy();
            expect(files.includes(`/src/app/${master}/${master}/${master}.component.html`)).toBeTruthy();
            expect(files.includes(`/src/app/${master}/${master}/${master}.component.tns.html`)).toBeTruthy();
        });
    });
});
//# sourceMappingURL=index_spec.js.map