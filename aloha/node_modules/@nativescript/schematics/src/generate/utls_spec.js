"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const testing_1 = require("@angular-devkit/schematics/testing");
const utils_1 = require("../utils");
const utils_2 = require("./utils");
const project = 'leproj';
describe('Validation should trigger', () => {
    const defaultComponentOptions = { name: "fooComponent", project };
    const defaultModuleOptions = { name: "fooModule", project };
    const schematicRunner = new testing_1.SchematicTestRunner('nativescript-schematics', path_1.join(__dirname, '../collection.json'));
    describe('for component schematic, when', () => {
        it('both ns and web are disabled in ns-only project', () => {
            const tree = utils_1.createEmptyNsOnlyProject(project);
            const options = Object.assign({}, defaultComponentOptions, { nativescript: false, web: false });
            expect(() => schematicRunner.runSchematic('component', options, tree))
                .toThrowError("You shouldn't disable both --web and --nativescript flags");
        });
        it('both ns and web are disabled in ns+web project', () => {
            const tree = utils_1.createEmptySharedProject(project);
            const options = Object.assign({}, defaultComponentOptions, { nativescript: false, web: false });
            expect(() => schematicRunner.runSchematic('component', options, tree))
                .toThrowError("You shouldn't disable both --web and --nativescript flags");
        });
        it('using inline templates in ns+web project', () => {
            const tree = utils_1.createEmptySharedProject(project);
            const options = Object.assign({}, defaultComponentOptions, { inlineTemplate: true });
            expect(() => schematicRunner.runSchematic('component', options, tree))
                .toThrowError(/--inlineTemplate/);
        });
        it('using web-only schematic in ns-only project', () => {
            const tree = utils_1.createEmptyNsOnlyProject(project);
            const options = Object.assign({}, defaultComponentOptions, { web: true, nativescript: false });
            expect(() => schematicRunner.runSchematic('component', options, tree))
                .toThrowError("Project is not configured for Angular Web, while --nativescript is set to false");
        });
    });
    describe('for module schematic, when', () => {
        it('both ns and web are disabled in ns-only project', () => {
            const tree = utils_1.createEmptyNsOnlyProject(project);
            const options = Object.assign({}, defaultModuleOptions, { nativescript: false, web: false });
            expect(() => schematicRunner.runSchematic('module', options, tree))
                .toThrowError("You shouldn't disable both --web and --nativescript flags");
        });
        it('both ns and web are disabled in ns+web project', () => {
            const tree = utils_1.createEmptySharedProject(project);
            const options = Object.assign({}, defaultModuleOptions, { nativescript: false, web: false });
            expect(() => schematicRunner.runSchematic('module', options, tree))
                .toThrowError("You shouldn't disable both --web and --nativescript flags");
        });
        it('using web-only schematic in ns-only project', () => {
            const tree = utils_1.createEmptyNsOnlyProject(project);
            const options = Object.assign({}, defaultModuleOptions, { web: true, nativescript: false });
            expect(() => schematicRunner.runSchematic('module', options, tree))
                .toThrowError("Project is not configured for Angular Web, while --nativescript is set to false");
        });
    });
});
describe('getPlatformUse', () => {
    const nsOnlyProj = utils_1.createEmptyNsOnlyProject(project);
    const sharedProj = utils_1.createEmptySharedProject(project);
    const baseOpts = { name: "foo", project: "bar" };
    describe('for ns-only project', () => {
        it("should report ready only for NS", () => {
            const res = utils_2.getPlatformUse(nsOnlyProj, Object.assign({}, baseOpts));
            expect(res.webReady).toBeFalsy();
            expect(res.nsReady).toBeTruthy();
            expect(res.nsOnly).toBeTruthy();
        });
        it("should report correctly when ns:true web:true", () => {
            const res = utils_2.getPlatformUse(nsOnlyProj, Object.assign({}, baseOpts, { nativescript: true, web: true }));
            expect(res.useNs).toBeTruthy();
            expect(res.useWeb).toBeFalsy();
        });
        it("should report correctly when ns:true web:false", () => {
            const res = utils_2.getPlatformUse(nsOnlyProj, Object.assign({}, baseOpts, { nativescript: true, web: false }));
            expect(res.useNs).toBeTruthy();
            expect(res.useWeb).toBeFalsy();
        });
        it("should report correctly when ns:false web:true", () => {
            const res = utils_2.getPlatformUse(nsOnlyProj, Object.assign({}, baseOpts, { nativescript: false, web: true }));
            expect(res.useNs).toBeFalsy();
            expect(res.useWeb).toBeFalsy();
        });
    });
    describe('for ns+web project', () => {
        it("should report ready for both Web and NS", () => {
            const res = utils_2.getPlatformUse(sharedProj, Object.assign({}, baseOpts));
            expect(res.webReady).toBeTruthy();
            expect(res.nsReady).toBeTruthy();
            expect(res.nsOnly).toBeFalsy();
        });
        it("should report correctly when ns:true web:true", () => {
            const res = utils_2.getPlatformUse(sharedProj, Object.assign({}, baseOpts, { nativescript: true, web: true }));
            expect(res.useNs).toBeTruthy();
            expect(res.useWeb).toBeTruthy();
        });
        it("should report correctly when ns:true web:false", () => {
            const res = utils_2.getPlatformUse(sharedProj, Object.assign({}, baseOpts, { nativescript: true, web: false }));
            expect(res.useNs).toBeTruthy();
            expect(res.useWeb).toBeFalsy();
        });
        it("should report correctly when ns:false web:true", () => {
            const res = utils_2.getPlatformUse(sharedProj, Object.assign({}, baseOpts, { nativescript: false, web: true }));
            expect(res.useNs).toBeFalsy();
            expect(res.useWeb).toBeTruthy();
        });
    });
});
//# sourceMappingURL=utls_spec.js.map