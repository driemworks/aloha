"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
function default_1(options) {
    return schematics_1.branchAndMerge(schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./_files'), [
        schematics_1.template({
            name: options.name
        }),
        // move to path, if one provided, otherwise skip
        (options.path) ? schematics_1.move(options.path) : schematics_1.noop
    ])));
}
exports.default = default_1;
//# sourceMappingURL=index.js.map