"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const schematics_1 = require("@angular-devkit/schematics");
const path_1 = require("path");
;
exports.DEFAULT_SHARED_EXTENSIONS = {
    web: '',
    ns: '.tns'
};
const isNs = (tree) => {
    const packageJson = utils_1.getPackageJson(tree);
    return !!packageJson.nativescript;
};
const isWeb = (tree) => {
    if (!tree.exists('nsconfig.json')) {
        console.log(`nsconfig.json not found. Assuming this is a {N} only project`);
        return false;
    }
    const config = utils_1.getNsConfig(tree);
    return config.webext != null;
};
exports.getPlatformUse = (tree, options) => {
    const nsReady = isNs(tree);
    const webReady = isWeb(tree);
    const nsOnly = nsReady && !webReady;
    const webOnly = webReady && !nsReady;
    const useNs = !!options.nativescript && nsReady;
    const useWeb = !!options.web && webReady;
    return {
        nsReady,
        webReady,
        nsOnly,
        webOnly,
        useNs,
        useWeb
    };
};
exports.getExtensions = (tree, options) => {
    let ns = options.nsExtension;
    let web = options.webExtension;
    if (isWeb(tree)) {
        const nsconfig = utils_1.getNsConfig(tree);
        ns = ns || nsconfig.nsext;
        web = web || nsconfig.webext;
        if (ns === web) {
            ns = exports.DEFAULT_SHARED_EXTENSIONS.ns;
            web = exports.DEFAULT_SHARED_EXTENSIONS.web;
        }
    }
    return {
        ns: parseExtension(ns || ''),
        web: parseExtension(web || '')
    };
};
const parseExtension = (ext) => {
    // don't change, if the extension is empty or it already starts with a .
    if (ext === '' || ext.startsWith('.')) {
        return ext;
    }
    return '.' + ext;
};
exports.getNsConfigExtension = (tree) => {
    if (!tree.exists('nsconfig.json')) {
        console.warn('nsconfig not found, using .tns as a default extension for NativeScript files');
        return {
            ns: '.tns',
            web: ''
        };
    }
    const nsconfig = utils_1.getNsConfig(tree);
    return {
        ns: nsconfig.nsext || '.tns',
        web: nsconfig.webext || ''
    };
};
exports.removeNsSchemaOptions = (options) => {
    const duplicate = Object.assign({}, options);
    delete duplicate['web'];
    delete duplicate['nativescript'];
    delete duplicate['nsExtension'];
    delete duplicate['webExtension'];
    delete duplicate['common'];
    return duplicate;
};
exports.addExtension = (fileName, ext) => {
    const fileExtension = path_1.extname(fileName);
    return fileName.replace(fileExtension, `${ext}${fileExtension}`);
};
exports.validateGenerateOptions = (platformUse, options) => {
    if (!options.nativescript && !options.web) {
        throw new schematics_1.SchematicsException(`You shouldn't disable both --web and --nativescript flags`);
    }
    if (!platformUse.useNs && !platformUse.useWeb) {
        if (options.nativescript) {
            throw new schematics_1.SchematicsException(`Project is not configured for NativeScript, while --web is set to false`);
        }
        if (options.web) {
            throw new schematics_1.SchematicsException(`Project is not configured for Angular Web, while --nativescript is set to false`);
        }
    }
};
//# sourceMappingURL=utils.js.map