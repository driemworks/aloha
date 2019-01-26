"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("../../utils");
function default_1(options) {
    const templateOptions = getTemplateOptions(options);
    return schematics_1.chain([
        schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./_files'), [
            schematics_1.template(templateOptions),
            schematics_1.move(options.name),
        ])),
        options.sample ?
            schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./_sample-files'), [
                schematics_1.template(templateOptions),
                schematics_1.move(path_1.join(options.name, options.sourceDir, 'app')),
            ])) : schematics_1.noop(),
        runAppResourcesSchematic({
            path: options.name
        }),
        runStylingSchematic({
            appPath: options.name,
            sourceDir: options.sourceDir,
            extension: options.style,
            theme: options.theme,
        })
    ]);
}
exports.default = default_1;
const getTemplateOptions = (options) => ({
    utils: utils_1.stringUtils,
    name: options.name,
    sourcedir: options.sourceDir,
    prefix: options.prefix,
    dot: '.',
    theme: options.theme,
    style: options.style,
    sample: options.sample,
});
const runAppResourcesSchematic = (options) => schematics_1.schematic('app-resources', options);
const runStylingSchematic = (options) => schematics_1.schematic('styling', options);
//# sourceMappingURL=index.js.map