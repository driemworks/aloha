"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInModuleMetadata = (moduleName, property, value, inArray) => exports.isInDecoratorMetadata(moduleName, property, value, 'NgModule', inArray);
exports.isInComponentMetadata = (componentName, property, value, inArray) => exports.isInDecoratorMetadata(componentName, property, value, 'Component', inArray);
exports.isInDecoratorMetadata = (moduleName, property, value, decoratorName, inArray) => new RegExp(`@${decoratorName}\\(\\{([^}]*)` +
    objectContaining(property, value, inArray) +
    '[^}]*\\}\\)' +
    '\\s*' +
    `(export )?class ${moduleName}`);
const objectContaining = (property, value, inArray) => inArray ?
    keyValueInArray(property, value) :
    keyValueString(property, value);
const keyValueInArray = (property, value) => `${property}: \\[` +
    nonLastValueInArrayMatcher +
    `${value},?` +
    nonLastValueInArrayMatcher +
    lastValueInArrayMatcher +
    `\\s*]`;
const nonLastValueInArrayMatcher = `(\\s*|(\\s*(\\w+,)*)\\s*)*`;
const lastValueInArrayMatcher = `(\\s*|(\\s*(\\w+)*)\\s*)?`;
const keyValueString = (property, value) => `${property}: ${value}`;
//# sourceMappingURL=test-utils.js.map