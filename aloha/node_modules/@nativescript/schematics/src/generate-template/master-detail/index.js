"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const utils_1 = require("../../utils");
const path_1 = require("path");
function default_1(options) {
    return generateTemplate(options);
}
exports.default = default_1;
const generateTemplate = (options) => (tree, context) => {
    context.logger.info('Generating Master Detail template');
    const projectParams = getProjectInfo(tree);
    context.logger.info(`Project Params: ${JSON.stringify(projectParams, null, 2)}`);
    const templateOptions = {
        prefix: 'app',
        name: strings_1.dasherize(options.master),
        master: strings_1.dasherize(options.master),
        detail: strings_1.dasherize(options.detail),
        masterClassName: strings_1.classify(options.master),
        detailClassName: strings_1.classify(options.detail),
        nsext: projectParams.nsext
    };
    const templatePath = projectParams.shared ? './_files-shared' : './_files-nsonly';
    const templateSource = schematics_1.apply(schematics_1.url(templatePath), [
        schematics_1.template(templateOptions),
        schematics_1.move(projectParams.appPath)
    ]);
    return schematics_1.mergeWith(templateSource);
};
const getProjectInfo = (tree) => {
    if (tree.exists('nsconfig.json')) {
        const nsconfig = utils_1.getNsConfig(tree);
        return {
            shared: nsconfig.shared,
            appPath: path_1.join(nsconfig.appPath, 'app'),
            nsext: nsconfig.nsext
        };
    }
    return {
        shared: false,
        appPath: 'app',
        nsext: ''
    };
};
//# sourceMappingURL=index.js.map