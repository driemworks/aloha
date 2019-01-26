"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular-devkit/schematics/testing");
const path = require("path");
describe('Shared Application Schematic', () => {
    const schematicRunner = new testing_1.SchematicTestRunner('nativescript-schematics', path.join(__dirname, '../../collection.json'));
    const defaultOptions = {
        name: 'foo',
        prefix: '',
        sourceDir: 'src',
        style: 'css',
        theme: true,
        sample: false,
    };
    it('should create all files of an application', () => {
        const options = Object.assign({}, defaultOptions);
        const tree = schematicRunner.runSchematic('shared', options);
        const files = tree.files;
        expect(files.indexOf('/foo/angular.json')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/.gitignore')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/package.json')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/tsconfig.tns.json')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/package.json')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/main.tns.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/app/app.module.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/app/app.component.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/app/app.component.html')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/app/app.component.tns.html')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/app/home/home.component.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/app/home/home.component.html')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/app/home/home.component.css')).toBeGreaterThanOrEqual(0);
    });
    it('should create all sample files when the sample flag is provided', () => {
        const options = Object.assign({}, defaultOptions, { sample: true });
        const tree = schematicRunner.runSchematic('shared', options);
        const files = tree.files;
        expect(files.indexOf('/foo/src/app/barcelona/barcelona.common.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/app/barcelona/barcelona.module.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/app/barcelona/barcelona.module.tns.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/app/barcelona/player.service.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/app/barcelona/player.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/app/barcelona/players/players.component.html')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/app/barcelona/players/players.component.tns.html')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/app/barcelona/players/players.component.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/app/barcelona/player-detail/player-detail.component.html')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/app/barcelona/player-detail/player-detail.component.tns.html')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/foo/src/app/barcelona/player-detail/player-detail.component.ts')).toBeGreaterThanOrEqual(0);
    });
    it('should generate correct files when different style extension is specified', () => {
        const options = Object.assign({}, defaultOptions, { style: 'scss' });
        const tree = schematicRunner.runSchematic('application', options);
        const files = tree.files;
        expect(files.indexOf('/foo/src/app.css')).toEqual(-1);
        expect(files.indexOf('/foo/src/app.android.scss')).toBeGreaterThan(-1);
        expect(files.indexOf('/foo/src/app.ios.scss')).toBeGreaterThan(-1);
        expect(files.indexOf('/foo/src/home/home.component.css')).toEqual(-1);
        expect(files.indexOf('/foo/src/home/home.component.scss')).toBeGreaterThan(-1);
    });
});
//# sourceMappingURL=index_spec.js.map