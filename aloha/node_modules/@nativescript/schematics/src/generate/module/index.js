"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const utils_1 = require("../../utils");
const ast_utils_2 = require("../../ast-utils");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const utils_2 = require("../utils");
const parse_name_1 = require("@schematics/angular/utility/parse-name");
class ModuleInfo {
    constructor() {
        this.routingFilePath = '';
    }
}
let extensions;
function default_1(options) {
    let platformUse;
    let moduleInfo;
    return schematics_1.branchAndMerge(schematics_1.chain([
        // Filter existing modules with the same names so that they don't
        // cause merge conflicts before the files are renamed.
        schematics_1.filter(fileName => {
            const { moduleName, routingName } = getParsedName(options);
            return ![moduleName, routingName].some(modName => fileName.endsWith(modName));
        }),
        (tree) => {
            platformUse = utils_2.getPlatformUse(tree, options);
            if (platformUse.nsOnly && options.spec !== true) {
                options.spec = false;
            }
            utils_2.validateGenerateOptions(platformUse, options);
        },
        () => {
            let opts = utils_2.removeNsSchemaOptions(options);
            return schematics_1.externalSchematic('@schematics/angular', 'module', opts);
        },
        (tree) => {
            extensions = utils_2.getExtensions(tree, options);
            moduleInfo = parseModuleInfo(tree, options);
        },
        (tree) => {
            if (!platformUse.useNs) {
                return tree;
            }
            const updates = prepareNsModulesUpdates(moduleInfo);
            if (platformUse.useWeb) {
                // we need to copy the module files using .tns extension
                copyFiles(updates)(tree);
            }
            else {
                // we need to update module files to .tns extension
                renameFiles(updates)(tree);
            }
        },
        (tree) => (platformUse.useWeb && extensions.web)
            ? renameWebModules(moduleInfo)(tree) : tree,
        (tree) => {
            if (platformUse.useNs) {
                performNsModifications(moduleInfo, options)(tree);
            }
        },
        (tree) => shouldCreateCommonFile(platformUse, options.common) ?
            addCommonFile(moduleInfo) : tree
    ]));
}
exports.default = default_1;
;
const shouldCreateCommonFile = (platformUse, useCommon) => !!useCommon || // the common flag is raised or
    !platformUse.nsOnly && // it's a shared project
        platformUse.useWeb && platformUse.useNs; // and we generate a shared module
const addCommonFile = (moduleInfo) => {
    return schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./_files'), [
        schematics_1.template({
            name: moduleInfo.name
        }),
        schematics_1.move(moduleInfo.path)
    ]));
};
const getParsedName = (options) => {
    const parsedPath = parse_name_1.parseName(options.path || '', options.name);
    const name = strings_1.dasherize(parsedPath.name);
    return {
        name,
        moduleName: `/${name}.module.ts`,
        routingName: `/${name}-routing.module.ts`
    };
};
const parseModuleInfo = (tree, options) => {
    const { name, moduleName, routingName } = getParsedName(options);
    const moduleInfo = new ModuleInfo();
    moduleInfo.name = name;
    tree.actions.forEach(action => {
        if (action.path.endsWith(moduleName)) {
            const file = action.path;
            moduleInfo.moduleFilePath = file;
            moduleInfo.nsModuleFilePath = utils_2.addExtension(file, extensions.ns);
            moduleInfo.webModuleFilePath = utils_2.addExtension(file, extensions.web);
        }
        if (action.path.endsWith(routingName)) {
            const file = action.path;
            moduleInfo.routingFilePath = file;
            moduleInfo.nsRoutingFilePath = utils_2.addExtension(file, extensions.ns);
            moduleInfo.webRoutingFilePath = utils_2.addExtension(file, extensions.web);
        }
    });
    if (!moduleInfo.moduleFilePath) {
        throw new schematics_1.SchematicsException(`Failed to find generated module files from @schematics/angular. Please contact the @nativescript/schematics author.`);
    }
    moduleInfo.path = parse_name_1.parseName('', moduleInfo.moduleFilePath).path;
    return moduleInfo;
};
const renameWebModules = (moduleInfo) => (tree) => {
    const files = [{
            from: moduleInfo.moduleFilePath,
            to: moduleInfo.webModuleFilePath
        }];
    if (moduleInfo.nsRoutingFilePath) {
        files.push({
            from: moduleInfo.routingFilePath,
            to: moduleInfo.webRoutingFilePath
        });
    }
    renameFiles(files)(tree);
};
const prepareNsModulesUpdates = (moduleInfo) => {
    const updates = [];
    if (moduleInfo.moduleFilePath !== moduleInfo.nsModuleFilePath) {
        updates.push({
            from: moduleInfo.moduleFilePath,
            to: moduleInfo.nsModuleFilePath
        });
    }
    if (moduleInfo.routingFilePath && moduleInfo.routingFilePath !== moduleInfo.nsRoutingFilePath) {
        updates.push({
            from: moduleInfo.routingFilePath,
            to: moduleInfo.nsRoutingFilePath
        });
    }
    return updates;
};
const performNsModifications = (moduleInfo, options) => (tree) => {
    addSchema(moduleInfo.nsModuleFilePath)(tree);
    if (options.commonModule) {
        ensureCommonModule(moduleInfo.nsModuleFilePath)(tree);
    }
    if (options.nativescript && options.routing) {
        ensureNsRouting(tree, moduleInfo.nsRoutingFilePath);
    }
};
/**
 * Updates routing.module file
 * Changes all references from RouterModule to NativeScriptRouterModule
 * Additionally it updates imports for NativeScriptRouterModule
 */
const ensureNsRouting = (tree, path) => {
    const source = utils_1.getSourceFile(tree, path);
    const fileText = source.getText();
    const importFrom = `, NativeScriptRouterModule } from '@angular/router';`;
    const importTo = ` } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';`;
    const newText = fileText.replace(/RouterModule/g, 'NativeScriptRouterModule')
        .replace(importFrom, importTo);
    const recorder = tree.beginUpdate(path);
    recorder.remove(0, fileText.length);
    recorder.insertLeft(0, newText);
    tree.commitUpdate(recorder);
};
const copyFiles = (paths) => (tree) => paths.forEach(({ from, to }) => utils_1.copy(tree, from, to));
const renameFiles = (paths) => (tree) => paths.forEach(({ from, to }) => tree.rename(from, to));
/*
const ensureRouting = (routingModulePath: string) =>
  (tree: Tree) => {
    removeNGRouterModule(tree, routingModulePath);
    addNSRouterModule(tree, routingModulePath);

    return tree;
  };
const removeNGRouterModule = (tree: Tree, routingModulePath: string) => {
    const moduleToRemove = 'RouterModule';

    removeImport(tree, routingModulePath, moduleToRemove);
    removeMetadataArrayValue(tree, routingModulePath, 'imports', `${moduleToRemove}.forChild(routes)`);
    removeMetadataArrayValue(tree, routingModulePath, 'exports', moduleToRemove);
};

const addNSRouterModule = (tree: Tree, routingModulePath: string) => {
  let moduleSource = getSourceFile(tree, routingModulePath);
  const moduleName = 'NativeScriptRouterModule';

  const addedImport = addSymbolToNgModuleMetadata(
    moduleSource, routingModulePath,
    'imports', `${moduleName}.forChild(routes)`,
    'nativescript-angular/router'
  );
  const importRecorder = tree.beginUpdate(routingModulePath);

  addedImport.forEach((change: InsertChange) =>
    importRecorder.insertRight(change.pos, change.toAdd)
  );
  tree.commitUpdate(importRecorder);

  // refetch new content after the update
  moduleSource = getSourceFile(tree, routingModulePath);
  const addedExport = addSymbolToNgModuleMetadata(
    moduleSource, routingModulePath,
    'exports', moduleName
  );
  const exportRecorder = tree.beginUpdate(routingModulePath);
  addedExport.forEach((change: InsertChange) =>
    exportRecorder.insertRight(change.pos, change.toAdd)
  );
  tree.commitUpdate(exportRecorder);

  return tree;
};
*/
const ensureCommonModule = (modulePath) => (tree) => {
    addNSCommonModule(tree, modulePath);
    removeNGCommonModule(tree, modulePath);
    return tree;
};
const addSchema = (modulePath) => (tree) => {
    const moduleSource = utils_1.getSourceFile(tree, modulePath);
    const recorder = tree.beginUpdate(modulePath);
    const metadataChange = ast_utils_1.addSymbolToNgModuleMetadata(moduleSource, modulePath, 'schemas', 'NO_ERRORS_SCHEMA', '@angular/core');
    metadataChange.forEach((change) => recorder.insertRight(change.pos, change.toAdd));
    tree.commitUpdate(recorder);
    return tree;
};
const removeNGCommonModule = (tree, modulePath) => {
    const moduleName = 'CommonModule';
    ast_utils_2.removeImport(tree, modulePath, moduleName);
    ast_utils_2.removeMetadataArrayValue(tree, modulePath, 'imports', moduleName);
    return tree;
};
const addNSCommonModule = (tree, modulePath) => {
    const moduleSource = utils_1.getSourceFile(tree, modulePath);
    const recorder = tree.beginUpdate(modulePath);
    const metadataChange = ast_utils_1.addSymbolToNgModuleMetadata(moduleSource, modulePath, 'imports', 'NativeScriptCommonModule', 'nativescript-angular/common');
    metadataChange.forEach((change) => recorder.insertRight(change.pos, change.toAdd));
    tree.commitUpdate(recorder);
    return tree;
};
//# sourceMappingURL=index.js.map