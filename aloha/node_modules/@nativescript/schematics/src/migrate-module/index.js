"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("../utils");
const module_info_utils_1 = require("./module-info-utils");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const utils_2 = require("../generate/utils");
let nsext;
let moduleInfo;
function default_1(options) {
    return schematics_1.chain([
        (tree) => {
            const nsconfigExtensions = utils_2.getNsConfigExtension(tree);
            nsext = options.nsext || nsconfigExtensions.ns;
            if (!nsext.startsWith('.')) {
                nsext = '.' + nsext;
            }
        },
        (tree, context) => {
            moduleInfo = module_info_utils_1.parseModuleInfo(options)(tree, context);
        },
        addModuleFile(options.name, options.project),
        (tree, context) => migrateComponents(moduleInfo, options)(tree, context),
        migrateProviders()
    ]);
}
exports.default = default_1;
const addModuleFile = (name, project) => (tree, context) => schematics_1.schematic('module', {
    name,
    project,
    nsExtension: nsext,
    flat: false,
    web: false,
    spec: false,
    common: true,
})(tree, context);
const migrateComponents = (moduleInfo, options) => {
    const components = moduleInfo.declarations.filter(d => d.name.endsWith('Component'));
    return schematics_1.chain(components.map(component => {
        const convertComponentOptions = {
            name: component.name,
            modulePath: moduleInfo.modulePath,
            nsext,
            project: options.project,
            style: options.style
        };
        return schematics_1.schematic('migrate-component', convertComponentOptions);
    }));
};
const migrateProviders = () => (tree) => {
    moduleInfo.providers.forEach(provider => {
        addProvider(provider.name, provider.importPath)(tree);
    });
};
const addProvider = (providerClassName, providerPath) => (tree) => {
    const nsModulePath = utils_1.addExtension(moduleInfo.modulePath, nsext);
    // check if the {N} version of the @NgModule exists
    if (!tree.exists(nsModulePath)) {
        throw new schematics_1.SchematicsException(`Module file [${nsModulePath}] doesn't exist.
Create it if you want the schematic to add ${moduleInfo.className} to its module providers,
or if you just want to update the component without updating its module, then rerun this command with --skip-module flag`);
    }
    // Get the changes required to update the @NgModule
    const changes = ast_utils_1.addProviderToModule(utils_1.getSourceFile(tree, nsModulePath), 
    // nsModulePath, // <- this doesn't look like it is in use
    '', providerClassName, providerPath
    // findRelativeImportPath(nsModulePath, providerPath)
    );
    // Save changes
    const recorder = tree.beginUpdate(nsModulePath);
    changes.forEach((change) => recorder.insertRight(change.pos, change.toAdd));
    tree.commitUpdate(recorder);
};
//# sourceMappingURL=index.js.map