"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("../../utils");
function default_1(options) {
    const appPath = options.name;
    const sourcedir = options.sourceDir;
    return schematics_1.chain([
        schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./_files'), [
            schematics_1.template(Object.assign({}, options, { utils: utils_1.stringUtils, sourcedir, dot: '.', theme: options.theme })),
            schematics_1.move(appPath),
        ])),
        runAngularJsonSchematic({
            path: options.name,
            name: options.name,
            prefix: options.prefix
        }),
        runAppResourcesSchematic({
            path: `${appPath}/${sourcedir}`,
        }),
        runStylingSchematic({
            appPath,
            sourceDir: sourcedir,
            extension: options.style,
            theme: options.theme,
        })
    ]);
}
exports.default = default_1;
const runAngularJsonSchematic = (options) => schematics_1.schematic('angular-json', options);
const runAppResourcesSchematic = (options) => schematics_1.schematic('app-resources', options);
const runStylingSchematic = (options) => schematics_1.schematic('styling', options);
//# sourceMappingURL=index.js.map