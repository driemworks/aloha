"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const change_1 = require("@schematics/angular/utility/change");
const schematics_1 = require("@angular-devkit/schematics");
const ts = require("typescript");
const utils_1 = require("./utils");
class RemoveContent {
    constructor(pos, end) {
        this.pos = pos;
        this.end = end;
    }
    getStart() {
        return this.pos;
    }
    getFullStart() {
        return this.pos;
    }
    getEnd() {
        return this.end;
    }
}
// Almost identical to addSymbolToNgModuleMetadata from @schematics/angular/utility/ast-utils
// the method can be refactored so that it can be used with custom decorators
function addSymbolToDecoratorMetadata(source, componentPath, metadataField, symbolName, decoratorName, decoratorPackage) {
    const nodes = ast_utils_1.getDecoratorMetadata(source, decoratorName, decoratorPackage);
    let node = nodes[0]; // tslint:disable-line:no-any
    // Find the decorator declaration.
    if (!node) {
        return [];
    }
    return getSymbolsToAddToObject(componentPath, node, metadataField, symbolName);
}
exports.addSymbolToDecoratorMetadata = addSymbolToDecoratorMetadata;
function getSymbolsToAddToObject(path, node, metadataField, symbolName) {
    // Get all the children property assignment of object literals.
    const matchingProperties = node.properties
        .filter(prop => prop.kind == ts.SyntaxKind.PropertyAssignment)
        // Filter out every fields that's not 'metadataField'. Also handles string literals
        // (but not expressions).
        .filter((prop) => {
        const name = prop.name;
        switch (name.kind) {
            case ts.SyntaxKind.Identifier:
                return name.getText() == metadataField;
            case ts.SyntaxKind.StringLiteral:
                return name.text == metadataField;
        }
        return false;
    });
    // Get the last node of the array literal.
    if (!matchingProperties) {
        return [];
    }
    if (matchingProperties.length === 0) {
        // We haven't found the field in the metadata declaration. Insert a new field.
        const expr = node;
        let position;
        let toInsert;
        if (expr.properties.length == 0) {
            position = expr.getEnd() - 1;
            toInsert = `  ${metadataField}: [${symbolName}],\n`;
        }
        else {
            node = expr.properties[expr.properties.length - 1];
            position = node.getEnd();
            // Get the indentation of the last element, if any.
            const text = node.getFullText();
            const matches = text.match(/^\r?\n\s*/);
            if (matches && matches.length > 0) {
                toInsert = `,${matches[0]}${metadataField}: ${symbolName},`;
            }
            else {
                toInsert = `, ${metadataField}: ${symbolName},`;
            }
        }
        return [new change_1.InsertChange(path, position, toInsert)];
    }
    const assignment = matchingProperties[0];
    // If it's not an array, keep the original value.
    if (assignment.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
        return [];
    }
    const arrLiteral = assignment.initializer;
    if (arrLiteral.elements.length == 0) {
        // Forward the property.
        node = arrLiteral;
    }
    else {
        node = arrLiteral.elements;
    }
    if (!node) {
        console.log('No app module found. Please add your new class to your component.');
        return [];
    }
    if (Array.isArray(node)) {
        const nodeArray = node;
        const symbolsArray = nodeArray.map(node => node.getText());
        if (symbolsArray.indexOf(symbolName) !== -1) {
            return [];
        }
        node = node[node.length - 1];
    }
    let toInsert;
    let position = node.getEnd();
    if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
        // We haven't found the field in the metadata declaration. Insert a new
        // field.
        const expr = node;
        if (expr.properties.length == 0) {
            position = expr.getEnd() - 1;
            toInsert = `  ${metadataField}: [${symbolName}],\n`;
        }
        else {
            node = expr.properties[expr.properties.length - 1];
            position = node.getEnd();
            // Get the indentation of the last element, if any.
            const text = node.getFullText();
            if (text.match('^\r?\r?\n')) {
                toInsert = `,${text.match(/^\r?\n\s+/)[0]}${metadataField}: [${symbolName},]`;
            }
            else {
                toInsert = `, ${metadataField}: [${symbolName},]`;
            }
        }
    }
    else if (node.kind == ts.SyntaxKind.ArrayLiteralExpression) {
        // We found the field but it's empty. Insert it just before the `]`.
        position--;
        toInsert = `${symbolName}`;
    }
    else {
        // Get the indentation of the last element, if any.
        const text = node.getFullText();
        if (text.match(/^\r?\n/)) {
            toInsert = `,${text.match(/^\r?\n(\r?)\s+/)[0]}${symbolName},`;
        }
        else {
            toInsert = `, ${symbolName},`;
        }
    }
    return [new change_1.InsertChange(path, position, toInsert)];
}
exports.getSymbolsToAddToObject = getSymbolsToAddToObject;
function findFullImports(importName, source) {
    const allImports = collectDeepNodes(source, ts.SyntaxKind.ImportDeclaration);
    return allImports
        // Filter out import statements that are either `import 'XYZ'` or `import * as X from 'XYZ'`.
        .filter(({ importClause: clause }) => clause && !clause.name && clause.namedBindings &&
        clause.namedBindings.kind === ts.SyntaxKind.NamedImports)
        .reduce((imports, importDecl) => {
        const importClause = importDecl.importClause;
        const namedImports = importClause.namedBindings;
        namedImports.elements.forEach((importSpec) => {
            const importId = importSpec.name;
            if (!(importId.text === importName)) {
                return;
            }
            if (namedImports.elements.length === 1) {
                imports.push(importDecl);
            }
            else {
                const toRemove = normalizeNodeToRemove(importSpec, source);
                imports.push(toRemove);
            }
        });
        return imports;
    }, []);
}
exports.findFullImports = findFullImports;
function findImports(importName, source) {
    const allImports = collectDeepNodes(source, ts.SyntaxKind.ImportDeclaration);
    return allImports
        .filter(({ importClause: clause }) => clause && !clause.name && clause.namedBindings &&
        clause.namedBindings.kind === ts.SyntaxKind.NamedImports)
        .reduce((imports, importDecl) => {
        const importClause = importDecl.importClause;
        const namedImports = importClause.namedBindings;
        namedImports.elements.forEach((importSpec) => {
            const importId = importSpec.name;
            if (importId.text === importName) {
                imports.push(importDecl);
            }
        });
        return imports;
    }, []);
}
exports.findImports = findImports;
function findMetadataValueInArray(source, property, value) {
    const decorators = collectDeepNodes(source, ts.SyntaxKind.Decorator);
    return getNodesToRemoveFromNestedArray(decorators, property, value);
}
exports.findMetadataValueInArray = findMetadataValueInArray;
function getNodesToRemoveFromNestedArray(nodes, property, value) {
    const valuesNode = nodes
        .reduce((nodes, current) => [
        ...nodes,
        ...collectDeepNodes(current, ts.SyntaxKind.PropertyAssignment)
    ], [])
        .find(assignment => {
        let isValueForProperty = false;
        ts.forEachChild(assignment, (child) => {
            if (child.kind === ts.SyntaxKind.Identifier && child.getText() === property) {
                isValueForProperty = true;
            }
        });
        return isValueForProperty;
    });
    if (!valuesNode) {
        return [];
    }
    let arrayLiteral;
    ts.forEachChild(valuesNode, (child) => {
        if (child.kind === ts.SyntaxKind.ArrayLiteralExpression) {
            arrayLiteral = child;
        }
    });
    if (!arrayLiteral) {
        return [];
    }
    const values = [];
    ts.forEachChild(arrayLiteral, (child) => {
        if (child.getText() === value) {
            const toRemove = normalizeNodeToRemove(child, arrayLiteral);
            values.push(toRemove);
        }
    });
    return values;
}
exports.getNodesToRemoveFromNestedArray = getNodesToRemoveFromNestedArray;
/**
 *
 * @param node The node that should be removed
 * @param source The source file that we are removing from
 * This method ensures that if there's a comma before or after the node,
 * it will be removed, too.
 */
function normalizeNodeToRemove(node, source) {
    const content = source.getText();
    const nodeStart = node.getFullStart();
    const nodeEnd = node.getEnd();
    const start = nodeStart - source.getFullStart();
    const symbolBefore = content.substring(start - 1, start);
    if (symbolBefore === ',') {
        return new RemoveContent(nodeStart - 1, nodeEnd);
    }
    else {
        return new RemoveContent(nodeStart, nodeEnd + 1);
    }
}
function addBootstrapToNgModule(modulePath, rootComponentName) {
    return (host) => {
        const content = host.read(modulePath);
        if (!content) {
            throw new schematics_1.SchematicsException(`File ${modulePath} does not exist.`);
        }
        const sourceText = content.toString('utf-8');
        const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        const componentModule = `./${rootComponentName}.component`;
        const rootComponentClassName = utils_1.toComponentClassName(rootComponentName);
        const importChanges = ast_utils_1.addImportToModule(source, modulePath, 'NativeScriptModule', 'nativescript-angular/nativescript.module');
        const bootstrapChanges = ast_utils_1.addBootstrapToModule(source, modulePath, rootComponentClassName, componentModule);
        const declarationChanges = ast_utils_1.addSymbolToNgModuleMetadata(source, modulePath, 'declarations', rootComponentClassName);
        const changes = [
            ...importChanges,
            ...bootstrapChanges,
            ...declarationChanges,
        ];
        const recorder = host.beginUpdate(modulePath);
        for (const change of changes) {
            if (change instanceof change_1.InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
exports.addBootstrapToNgModule = addBootstrapToNgModule;
function collectDeepNodes(node, kind) {
    const nodes = [];
    const helper = (child) => {
        if (child.kind === kind) {
            nodes.push(child);
        }
        ts.forEachChild(child, helper);
    };
    ts.forEachChild(node, helper);
    return nodes;
}
exports.collectDeepNodes = collectDeepNodes;
function filterByChildNode(root, condition) {
    let matches = false;
    const helper = (child) => {
        if (condition(child)) {
            matches = true;
            return;
        }
    };
    ts.forEachChild(root, helper);
    return matches;
}
exports.filterByChildNode = filterByChildNode;
exports.getDecoratedClass = (tree, filePath, decoratorName, className) => {
    return exports.getDecoratedClasses(tree, filePath, decoratorName)
        .find(c => !!(c.name && c.name.getText() === className));
};
exports.getDecoratedClasses = (tree, filePath, decoratorName) => {
    const moduleSource = utils_1.getSourceFile(tree, filePath);
    const classes = collectDeepNodes(moduleSource, ts.SyntaxKind.ClassDeclaration);
    return classes.filter(c => !!getDecorator(c, decoratorName));
};
exports.getDecoratorMetadataFromClass = (classNode, decoratorName) => {
    const decorator = getDecorator(classNode, decoratorName);
    if (!decorator) {
        return;
    }
    return decorator.expression.arguments[0];
};
const getDecorator = (node, name) => {
    return node.decorators && node.decorators.find((decorator) => decorator.expression.kind === ts.SyntaxKind.CallExpression &&
        decorator.expression.expression.getText() === name);
};
exports.removeMetadataArrayValue = (tree, filePath, property, value) => {
    const source = utils_1.getSourceFile(tree, filePath);
    const nodesToRemove = findMetadataValueInArray(source, property, value);
    nodesToRemove.forEach(declaration => utils_1.removeNode(declaration, filePath, tree));
};
exports.removeImport = (tree, filePath, importName) => {
    const source = utils_1.getSourceFile(tree, filePath);
    const importsToRemove = findFullImports(importName, source);
    importsToRemove.forEach(declaration => utils_1.removeNode(declaration, filePath, tree));
};
/**
 * Insert `toInsert` after the last occurence of `ts.SyntaxKind[nodes[i].kind]`
 * or after the last of occurence of `syntaxKind` if the last occurence is a sub child
 * of ts.SyntaxKind[nodes[i].kind] and save the changes in file.
 *
 * @param nodes insert after the last occurence of nodes
 * @param toInsert string to insert
 * @param file file to insert changes into
 * @param fallbackPos position to insert if toInsert happens to be the first occurence
 * @param syntaxKind the ts.SyntaxKind of the subchildren to insert after
 * @return Change instance
 * @throw Error if toInsert is first occurence but fall back is not set
 */
function insertBeforeFirstOccurence(nodes, toInsert, file, fallbackPos, syntaxKind) {
    let firstItem = nodes.sort(nodesByPosition).shift();
    if (!firstItem) {
        throw new Error();
    }
    if (syntaxKind) {
        firstItem = ast_utils_1.findNodes(firstItem, syntaxKind).sort(nodesByPosition).shift();
    }
    if (!firstItem && fallbackPos == undefined) {
        throw new Error(`tried to insert ${toInsert} as first occurence with no fallback position`);
    }
    const firstItemPosition = firstItem ? firstItem.getStart() : fallbackPos;
    return new change_1.InsertChange(file, firstItemPosition, toInsert);
}
exports.insertBeforeFirstOccurence = insertBeforeFirstOccurence;
/**
 * Helper for sorting nodes.
 * @return function to sort nodes in increasing order of position in sourceFile
 */
function nodesByPosition(first, second) {
    return first.getStart() - second.getStart();
}
function findNode(node, searchParams, filter = '') {
    const matchingNodes = findMatchingNodes(node, searchParams);
    if (matchingNodes.length === 0) {
        //TODO: This might require a better error message.
        const nodesText = searchParams
            .map(item => item.name || item.kind)
            .reduce((name, result) => name + ' => ' + result);
        throw new schematics_1.SchematicsException(`Failed to find ${nodesText} in ${node.getSourceFile().fileName}.`);
    }
    const result = matchingNodes.filter(node => node.getText().includes(filter));
    if (result.length !== 1) {
        const nodesText = searchParams
            .map(item => item.name)
            .reduce((name, result) => name + ' => ' + result);
        if (result.length === 0) {
            if (filter !== '') {
                throw new schematics_1.SchematicsException(`Failed to find ${filter} for ${nodesText} in ${node.getSourceFile().fileName}.`);
            }
            else {
                throw new schematics_1.SchematicsException(`Failed to find ${nodesText} in ${node.getSourceFile().fileName}.`);
            }
        }
        else {
            throw new schematics_1.SchematicsException(`Found too many [${result.length} / expected 1] ${nodesText} in ${node.getSourceFile().fileName}.`);
        }
    }
    return result[0];
}
exports.findNode = findNode;
function findMatchingNodes(node, searchParams, index = 0) {
    const searchParam = searchParams[index];
    const nodes = [];
    const helper = (child) => {
        if (isMatchingNode(child, searchParam)) {
            if (index === searchParams.length - 1) {
                nodes.push(child);
            }
            else {
                nodes.push(...findMatchingNodes(child, searchParams, index + 1));
            }
        }
        else {
            if (child.getChildCount() > 0) {
                ts.forEachChild(child, helper);
            }
        }
    };
    ts.forEachChild(node, helper);
    return nodes;
}
exports.findMatchingNodes = findMatchingNodes;
/**
* Check if the node.kind matches the searchParam.kind
* Also, if name provided, then check if we got the node with the right param name
*/
function isMatchingNode(node, searchParam) {
    if (node.kind !== searchParam.kind) {
        return false;
    }
    // If name provided the run it through checkNameForKind check
    // otherwise just return true
    return (searchParam.name) ? checkNameForKind(node, searchParam) : true;
}
function checkNameForKind(node, searchParam) {
    if (!searchParam.name) {
        throw new schematics_1.SchematicsException(`checkNameForKind shouldn't be called without a name. Object => ${JSON.stringify(searchParam)} `);
    }
    let child;
    switch (searchParam.kind) {
        case ts.SyntaxKind.VariableDeclaration:
        case ts.SyntaxKind.PropertyAssignment:
            child = node.getChildAt(0);
            break;
        case ts.SyntaxKind.CallExpression:
            const callExpression = node;
            const expression = callExpression.expression;
            // if function is an object's property - i.e. parent.fname()
            if (ts.isPropertyAccessExpression(expression)) {
                child = expression.name;
            }
            else {
                child = expression;
            }
            break;
        case ts.SyntaxKind.Identifier:
            child = node;
            break;
        case ts.SyntaxKind.NewExpression:
            const newExpression = node;
            child = newExpression.expression;
            break;
        case ts.SyntaxKind.ImportDeclaration:
            const importDeclaration = node;
            if (!importDeclaration.importClause || !importDeclaration.importClause.namedBindings) {
                return false;
            }
            const namedBindings = importDeclaration.importClause.namedBindings;
            // for imports like: import { a, b } from 'path'
            // import names [a,b] are at: node.importClause.namedBindings.elements
            if (ts.isNamedImports(namedBindings)) {
                const elements = namedBindings.elements;
                return elements.some(element => element.getText() === searchParam.name);
            }
            // otherwise, it is an import like: import * as abc from 'path'
            // import name [abc] is at: node.importClause.namedBindings.name
            child = namedBindings.name;
            break;
        case ts.SyntaxKind.ClassDeclaration:
            const classDeclaration = node;
            if (!classDeclaration.name) {
                return false;
            }
            child = classDeclaration.name;
            break;
        case ts.SyntaxKind.Decorator:
            const decorator = node;
            const decoratorCallExpression = decorator.expression;
            child = decoratorCallExpression.expression;
            break;
        default:
            throw new schematics_1.SchematicsException(`compareNameForKind: not prepared for this [${node.kind}] ts.SyntaxKind`);
    }
    return child.getText() === searchParam.name;
}
function findImportPath(source, name) {
    const node = findNode(source, [
        { kind: ts.SyntaxKind.ImportDeclaration, name },
    ]);
    const moduleSpecifier = node.moduleSpecifier;
    return moduleSpecifier.text;
}
exports.findImportPath = findImportPath;
exports.updateNodeText = (tree, node, newText) => {
    const recorder = tree.beginUpdate(node.getSourceFile().fileName);
    recorder.remove(node.getStart(), node.getText().length);
    recorder.insertLeft(node.getStart(), newText);
    tree.commitUpdate(recorder);
};
exports.replaceTextInNode = (tree, node, oldText, newText) => {
    const index = node.getStart() + node.getText().indexOf(oldText);
    const recorder = tree.beginUpdate(node.getSourceFile().fileName);
    recorder.remove(index, oldText.length);
    recorder.insertLeft(index, newText);
    tree.commitUpdate(recorder);
};
//# sourceMappingURL=ast-utils.js.map