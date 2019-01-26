"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const ast_utils_1 = require("./ast-utils");
const utils_1 = require("./utils");
const findDecoratorNode = (source, className, decoratorName) => {
    // Remove @ in case @Component or @NgModule provided
    const safeDecoratorName = decoratorName.replace('@', '');
    const node = ast_utils_1.findNode(source, [
        { kind: ts.SyntaxKind.ClassDeclaration, name: className },
        { kind: ts.SyntaxKind.Decorator, name: safeDecoratorName },
    ]);
    return node;
};
/**
* Can be used to retrieve the metada from @Component, @NgModule etc. decorators
* @param source source node, use => getSourceFile(tree, filePath)
* @param className name of the parent class
* @param decoratorName name of the decorator. No need to add the @ symbol
* @param propertyName name of the property to be extracted from the decorator
* @returns node containing the property value. You can parse it to either ArrayLiteralExpression or StringLiteral
*/
exports.findDecoratorPropertyNode = (source, className, decoratorName, propertyName) => {
    const decoratorNode = findDecoratorNode(source, className, decoratorName);
    const propertyNodes = ast_utils_1.findMatchingNodes(decoratorNode, [
        { kind: ts.SyntaxKind.PropertyAssignment, name: propertyName },
    ]);
    if (propertyNodes.length === 0) {
        console.log(`Couldn't find Property ${propertyName} for
 Class: ${className}
 Decorator: ${decoratorName}
 in ${source.getSourceFile().fileName}`);
        return null;
    }
    return propertyNodes[0].initializer;
};
exports.getNgModuleProperties = (modulePath, className, propertyName, tree) => {
    const source = utils_1.getSourceFile(tree, modulePath);
    const node = exports.findDecoratorPropertyNode(source, className, 'NgModule', propertyName);
    if (node === null || !ts.isArrayLiteralExpression(node)) {
        // property not found
        return [];
    }
    const items = node.elements.filter(ts.isIdentifier).map(element => element.text);
    return items.map(className => {
        return {
            name: className,
            importPath: ast_utils_1.findImportPath(source, className)
        };
    });
    // const spreadOperator: string[] = node.elements.filter(ts.isSpreadElement).map(element => element.getText());
};
//# sourceMappingURL=decorator-utils.js.map