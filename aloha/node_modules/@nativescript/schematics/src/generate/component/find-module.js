"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const core_1 = require("@angular-devkit/core");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
function findModule(tree, options, path, extension) {
    if (options.module) {
        return findExplicitModule(tree, path, extension, options.module);
    }
    else {
        const pathToCheck = (path || '')
            + (options.flat ? '' : '/' + strings_1.dasherize(options.name));
        return findImplicitModule(tree, pathToCheck, extension);
    }
}
exports.findModule = findModule;
function findExplicitModule(tree, path, extension, moduleName) {
    while (path && path !== '/') {
        const modulePath = core_1.normalize(`/${path}/${moduleName}`);
        const moduleBaseName = core_1.normalize(modulePath).split('/').pop();
        if (tree.exists(modulePath)) {
            return core_1.normalize(modulePath);
        }
        else if (tree.exists(modulePath + extension + '.ts')) {
            return core_1.normalize(modulePath + extension + '.ts');
        }
        else if (tree.exists(modulePath + '.module' + extension + '.ts')) {
            return core_1.normalize(modulePath + '.module' + extension + '.ts');
        }
        else if (tree.exists(modulePath + '/' + moduleBaseName + '.module' + extension + '.ts')) {
            return core_1.normalize(modulePath + '/' + moduleBaseName + '.module' + extension + '.ts');
        }
        path = path_1.dirname(path);
    }
    throw new Error('Specified module does not exist');
}
function findImplicitModule(tree, path, extension) {
    let dir = tree.getDir(`/${path}`);
    const moduleRe = new RegExp(`.module${extension}.ts`);
    const routingModuleRe = new RegExp(`-routing.module${extension}.ts`);
    while (dir && dir.path && dir.path !== '/') {
        const matches = dir.subfiles.filter(p => moduleRe.test(p) && !routingModuleRe.test(p));
        if (matches.length == 1) {
            return core_1.join(dir.path, matches[0]);
        }
        else if (matches.length > 1) {
            throw new Error('More than one module matches. Use skip-import option to skip importing '
                + 'the component into the closest module.');
        }
        dir = dir.parent;
    }
    throw new Error('Could not find an NgModule. Use the skip-import '
        + 'option to skip importing in NgModule.');
}
//# sourceMappingURL=find-module.js.map