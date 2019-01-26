"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("../utils");
const extensionFilesMap = {
    css: '_css-files',
    scss: '_scss-files',
};
function default_1(options) {
    const files = extensionFilesMap[options.extension];
    return schematics_1.chain([
        schematics_1.mergeWith(schematics_1.apply(schematics_1.url(files), [
            schematics_1.template(Object.assign({}, options)),
            schematics_1.move(`${options.appPath}/${options.sourceDir}`)
        ])),
        options.extension === 'scss' ?
            (tree) => {
                const sassDependency = {
                    name: 'nativescript-dev-sass',
                    version: '~1.6.0',
                    type: 'devDependency',
                };
                utils_1.addDependency(tree, sassDependency, options.appPath);
            } :
            schematics_1.noop()
    ]);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map