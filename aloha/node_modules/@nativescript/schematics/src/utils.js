"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const ts = require("typescript");
const testing_1 = require("@angular-devkit/schematics/testing");
const test_1 = require("@schematics/angular/utility/test");
const PACKAGE_JSON = 'package.json';
class FileNotFoundException extends Error {
    constructor(fileName) {
        const message = `File ${fileName} not found!`;
        super(message);
    }
}
exports.schematicRunner = new testing_1.SchematicTestRunner('nativescript-schematics', path_1.join(__dirname, 'collection.json'));
exports.getSourceFile = (host, path) => {
    const buffer = host.read(path);
    if (!buffer) {
        throw new schematics_1.SchematicsException(`Could not find file at ${path}. See https://github.com/NativeScript/nativescript-schematics/issues/172.`);
    }
    const content = buffer.toString();
    const source = ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
    return source;
};
exports.removeNode = (node, filePath, tree) => {
    const recorder = tree.beginUpdate(filePath);
    const start = node.getFullStart();
    const end = node.getEnd();
    recorder.remove(start, end - start);
    tree.commitUpdate(recorder);
};
exports.copy = (tree, from, to) => {
    const file = tree.get(from);
    if (!file) {
        throw new Error(`File ${from} does not exist!`);
    }
    tree.create(to, file.content);
};
exports.addDependency = (tree, dependency, packageJsonDir) => {
    const path = packageJsonDir ?
        `${packageJsonDir}/package.json` :
        'package.json';
    const packageJson = exports.getJsonFile(tree, path);
    if (dependency.type === 'dependency') {
        const dependenciesMap = Object.assign({}, packageJson.dependecies);
        packageJson.dependecies = setDependency(dependenciesMap, dependency);
    }
    else {
        const dependenciesMap = Object.assign({}, packageJson.devDependencies);
        packageJson.devDependencies = setDependency(dependenciesMap, dependency);
    }
    tree.overwrite(path, JSON.stringify(packageJson, null, 2));
};
const setDependency = (dependenciesMap, { name, version }) => Object.assign(dependenciesMap, { [name]: version });
exports.getPackageJson = (tree, workingDirectory = '') => {
    const url = path_1.join(workingDirectory, PACKAGE_JSON);
    return exports.getJsonFile(tree, url);
};
exports.overwritePackageJson = (tree, content, workingDirectory = '') => {
    const url = path_1.join(workingDirectory, PACKAGE_JSON);
    tree.overwrite(url, JSON.stringify(content, null, 2));
};
exports.getJsonFile = (tree, path) => {
    const file = tree.get(path);
    if (!file) {
        throw new FileNotFoundException(path);
    }
    try {
        const content = JSON.parse(file.content.toString());
        return content;
    }
    catch (e) {
        throw new schematics_1.SchematicsException(`File ${path} could not be parsed!`);
    }
};
exports.getNsConfig = (tree) => {
    return exports.getJsonFile(tree, '/nsconfig.json');
};
exports.getFileContents = (tree, filePath) => {
    const buffer = tree.read(filePath) || '';
    return buffer.toString();
};
exports.renameFiles = (paths) => (tree) => paths.forEach(({ from, to }) => tree.rename(from, to));
exports.renameFilesForce = (paths) => (tree) => paths.forEach(({ from, to }) => {
    const content = exports.getFileContents(tree, from);
    tree.create(to, content);
    tree.delete(from);
});
function createEmptyNsOnlyProject(projectName, extension = '') {
    let appTree = exports.schematicRunner.runSchematic('angular-json', { name: projectName, sourceRoot: 'src' });
    appTree = test_1.createAppModule(appTree, `/src/app/app.module${extension}.ts`);
    appTree.create('/package.json', JSON.stringify({
        nativescript: { id: 'proj' },
        dependencies: {
            '@angular/core': '^6.1.0'
        },
        devDependencies: {
            '@angular/cli': '^6.2.0'
        },
    }));
    return appTree;
}
exports.createEmptyNsOnlyProject = createEmptyNsOnlyProject;
function createEmptySharedProject(projectName, webExtension = '', nsExtension = '.tns') {
    let tree = createEmptyNsOnlyProject(projectName, nsExtension);
    const appTree = test_1.createAppModule(tree, `/src/app/app.module${webExtension}.ts`);
    appTree.create('/nsconfig.json', JSON.stringify({
        'appResourcesPath': 'App_Resources',
        'appPath': 'src',
        'nsext': '.tns',
        'webext': '',
        'shared': true
    }));
    return appTree;
}
exports.createEmptySharedProject = createEmptySharedProject;
/**
 * Sanitizes a given string by removing all characters that
 * are not letters or digits.
 *
 ```javascript
 sanitize('nativescript-app');  // 'nativescriptapp'
 sanitize('action_name');       // 'actioname'
 sanitize('css-class-name');    // 'cssclassname'
 sanitize('my favorite items'); // 'myfavoriteitems'
 ```

 @method sanitize
 @param {String} str The string to sanitize.
 @return {String} the sanitized string.
*/
exports.sanitize = (str) => str
    .split('')
    .filter(char => /[a-zA-Z0-9]/.test(char))
    .join('');
exports.stringUtils = Object.assign({}, core_1.strings, { sanitize: exports.sanitize });
exports.toComponentClassName = (name) => `${exports.stringUtils.classify(name)}Component`;
exports.toNgModuleClassName = (name) => `${exports.stringUtils.classify(name)}Module`;
exports.findMissingJsonProperties = (to, from, resolveConflict = (_key) => { }) => {
    if (!to) {
        return from;
    }
    const result = {};
    for (let key in from) {
        if (!to[key]) {
            result[key] = from[key];
        }
        else if (to[key] !== from[key]) {
            resolveConflict(key);
        }
    }
    return result;
};
/**
* Example: source: abc.123.def , text: -x-, where: .123 => abc-x-.123.def
*/
exports.insertTextWhere = (source, text, where) => {
    const index = source.indexOf(where);
    return source.substring(0, index) + text + source.substring(index);
};
exports.addExtension = (path, extension) => {
    const index = path.lastIndexOf('.');
    const newPath = path.slice(0, index) + extension + path.slice(index);
    return newPath;
};
/**
 * Find relative path, and remove .tns (to make it an import path)
 * @param from path to the importing file
 * @param to path to the imported file
 */
exports.findRelativeImportPath = (from, to) => {
    let relativePath = path_1.relative(from, to);
    // if starts with ../../ then relative is going to skip one folder too many
    if (relativePath.startsWith('../../')) {
        relativePath = relativePath.replace('../../', '../');
    }
    else if (relativePath.startsWith('../')) {
        relativePath = relativePath.replace('../', './');
    }
    else if (relativePath === '') {
        relativePath = './';
    }
    return relativePath.replace(/.ts$/, '');
};
function safeGet(object, ...properties) {
    if (properties.length === 0) {
        return object;
    }
    if (!object) {
        return;
    }
    const firstProperty = properties.shift();
    const value = object[firstProperty];
    if (!value) {
        return;
    }
    return safeGet(value, ...properties);
}
exports.safeGet = safeGet;
/**
 * Move the sources of a tree from a specified directory to the root.
 * Example: move the application of a project to root level,
 * so we can call schematics that depend on being executed inside a project.
 */
exports.moveToRoot = (schematicRunner, tree, from) => callRuleSync(schematicRunner, () => schematics_1.move(from, '.'), tree);
function callRuleSync(schematicRunner, rule, tree) {
    let newTree;
    schematicRunner.callRule(rule, tree).subscribe(tree => newTree = tree);
    if (newTree === undefined) {
        throw new schematics_1.SchematicsException('The provided rule is asyncronous! Use with `callRule` instead!');
    }
    return newTree;
}
//# sourceMappingURL=utils.js.map