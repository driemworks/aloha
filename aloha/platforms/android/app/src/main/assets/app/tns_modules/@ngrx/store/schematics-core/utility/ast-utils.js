var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core/utility/ast-utils", ["require", "exports", "typescript", "@ngrx/store/schematics-core/utility/change", "@ngrx/store/schematics-core/utility/route-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /* istanbul ignore file */
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var ts = require("typescript");
    var change_1 = require("@ngrx/store/schematics-core/utility/change");
    var route_utils_1 = require("@ngrx/store/schematics-core/utility/route-utils");
    /**
     * Find all nodes from the AST in the subtree of node of SyntaxKind kind.
     * @param node
     * @param kind
     * @param max The maximum number of items to return.
     * @return all nodes of kind, or [] if none is found
     */
    function findNodes(node, kind, max) {
        if (max === void 0) { max = Infinity; }
        var e_1, _a;
        if (!node || max == 0) {
            return [];
        }
        var arr = [];
        if (node.kind === kind) {
            arr.push(node);
            max--;
        }
        if (max > 0) {
            try {
                for (var _b = __values(node.getChildren()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    findNodes(child, kind, max).forEach(function (node) {
                        if (max > 0) {
                            arr.push(node);
                        }
                        max--;
                    });
                    if (max <= 0) {
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return arr;
    }
    exports.findNodes = findNodes;
    /**
     * Get all the nodes from a source.
     * @param sourceFile The source file object.
     * @returns {Observable<ts.Node>} An observable of all the nodes in the source.
     */
    function getSourceNodes(sourceFile) {
        var nodes = [sourceFile];
        var result = [];
        while (nodes.length > 0) {
            var node = nodes.shift();
            if (node) {
                result.push(node);
                if (node.getChildCount(sourceFile) >= 0) {
                    nodes.unshift.apply(nodes, __spread(node.getChildren()));
                }
            }
        }
        return result;
    }
    exports.getSourceNodes = getSourceNodes;
    /**
     * Helper for sorting nodes.
     * @return function to sort nodes in increasing order of position in sourceFile
     */
    function nodesByPosition(first, second) {
        return first.pos - second.pos;
    }
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
    function insertAfterLastOccurrence(nodes, toInsert, file, fallbackPos, syntaxKind) {
        var lastItem = nodes.sort(nodesByPosition).pop();
        if (!lastItem) {
            throw new Error();
        }
        if (syntaxKind) {
            lastItem = findNodes(lastItem, syntaxKind)
                .sort(nodesByPosition)
                .pop();
        }
        if (!lastItem && fallbackPos == undefined) {
            throw new Error("tried to insert " + toInsert + " as first occurence with no fallback position");
        }
        var lastItemPosition = lastItem ? lastItem.end : fallbackPos;
        return new change_1.InsertChange(file, lastItemPosition, toInsert);
    }
    exports.insertAfterLastOccurrence = insertAfterLastOccurrence;
    function getContentOfKeyLiteral(_source, node) {
        if (node.kind == ts.SyntaxKind.Identifier) {
            return node.text;
        }
        else if (node.kind == ts.SyntaxKind.StringLiteral) {
            return node.text;
        }
        else {
            return null;
        }
    }
    exports.getContentOfKeyLiteral = getContentOfKeyLiteral;
    function _angularImportsFromNode(node, _sourceFile) {
        var _a;
        var ms = node.moduleSpecifier;
        var modulePath;
        switch (ms.kind) {
            case ts.SyntaxKind.StringLiteral:
                modulePath = ms.text;
                break;
            default:
                return {};
        }
        if (!modulePath.startsWith('@angular/')) {
            return {};
        }
        if (node.importClause) {
            if (node.importClause.name) {
                // This is of the form `import Name from 'path'`. Ignore.
                return {};
            }
            else if (node.importClause.namedBindings) {
                var nb = node.importClause.namedBindings;
                if (nb.kind == ts.SyntaxKind.NamespaceImport) {
                    // This is of the form `import * as name from 'path'`. Return `name.`.
                    return _a = {},
                        _a[nb.name.text + '.'] = modulePath,
                        _a;
                }
                else {
                    // This is of the form `import {a,b,c} from 'path'`
                    var namedImports = nb;
                    return namedImports.elements
                        .map(function (is) {
                        return is.propertyName ? is.propertyName.text : is.name.text;
                    })
                        .reduce(function (acc, curr) {
                        acc[curr] = modulePath;
                        return acc;
                    }, {});
                }
            }
            return {};
        }
        else {
            // This is of the form `import 'path';`. Nothing to do.
            return {};
        }
    }
    function getDecoratorMetadata(source, identifier, module) {
        var angularImports = findNodes(source, ts.SyntaxKind.ImportDeclaration)
            .map(function (node) { return _angularImportsFromNode(node, source); })
            .reduce(function (acc, current) {
            var e_2, _a;
            try {
                for (var _b = __values(Object.keys(current)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    acc[key] = current[key];
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return acc;
        }, {});
        return getSourceNodes(source)
            .filter(function (node) {
            return (node.kind == ts.SyntaxKind.Decorator &&
                node.expression.kind == ts.SyntaxKind.CallExpression);
        })
            .map(function (node) { return node.expression; })
            .filter(function (expr) {
            if (expr.expression.kind == ts.SyntaxKind.Identifier) {
                var id = expr.expression;
                return (id.getFullText(source) == identifier &&
                    angularImports[id.getFullText(source)] === module);
            }
            else if (expr.expression.kind == ts.SyntaxKind.PropertyAccessExpression) {
                // This covers foo.NgModule when importing * as foo.
                var paExpr = expr.expression;
                // If the left expression is not an identifier, just give up at that point.
                if (paExpr.expression.kind !== ts.SyntaxKind.Identifier) {
                    return false;
                }
                var id = paExpr.name.text;
                var moduleId = paExpr.expression.getText(source);
                return id === identifier && angularImports[moduleId + '.'] === module;
            }
            return false;
        })
            .filter(function (expr) {
            return expr.arguments[0] &&
                expr.arguments[0].kind == ts.SyntaxKind.ObjectLiteralExpression;
        })
            .map(function (expr) { return expr.arguments[0]; });
    }
    exports.getDecoratorMetadata = getDecoratorMetadata;
    function _addSymbolToNgModuleMetadata(source, ngModulePath, metadataField, symbolName, importPath) {
        var nodes = getDecoratorMetadata(source, 'NgModule', '@angular/core');
        var node = nodes[0]; // tslint:disable-line:no-any
        // Find the decorator declaration.
        if (!node) {
            return [];
        }
        // Get all the children property assignment of object literals.
        var matchingProperties = node.properties
            .filter(function (prop) { return prop.kind == ts.SyntaxKind.PropertyAssignment; })
            // Filter out every fields that's not "metadataField". Also handles string literals
            // (but not expressions).
            .filter(function (prop) {
            var name = prop.name;
            switch (name.kind) {
                case ts.SyntaxKind.Identifier:
                    return name.getText(source) == metadataField;
                case ts.SyntaxKind.StringLiteral:
                    return name.text == metadataField;
            }
            return false;
        });
        // Get the last node of the array literal.
        if (!matchingProperties) {
            return [];
        }
        if (matchingProperties.length == 0) {
            // We haven't found the field in the metadata declaration. Insert a new field.
            var expr = node;
            var position_1;
            var toInsert_1;
            if (expr.properties.length == 0) {
                position_1 = expr.getEnd() - 1;
                toInsert_1 = "  " + metadataField + ": [" + symbolName + "]\n";
            }
            else {
                node = expr.properties[expr.properties.length - 1];
                position_1 = node.getEnd();
                // Get the indentation of the last element, if any.
                var text = node.getFullText(source);
                var matches = text.match(/^\r?\n\s*/);
                if (matches.length > 0) {
                    toInsert_1 = "," + matches[0] + metadataField + ": [" + symbolName + "]";
                }
                else {
                    toInsert_1 = ", " + metadataField + ": [" + symbolName + "]";
                }
            }
            var newMetadataProperty = new change_1.InsertChange(ngModulePath, position_1, toInsert_1);
            var newMetadataImport = route_utils_1.insertImport(source, ngModulePath, symbolName.replace(/\..*$/, ''), importPath);
            return [newMetadataProperty, newMetadataImport];
        }
        var assignment = matchingProperties[0];
        // If it's not an array, nothing we can do really.
        if (assignment.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
            return [];
        }
        var arrLiteral = assignment.initializer;
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
            var nodeArray = node;
            var symbolsArray = nodeArray.map(function (node) { return node.getText(); });
            if (symbolsArray.includes(symbolName)) {
                return [];
            }
            node = node[node.length - 1];
            var effectsModule = nodeArray.find(function (node) {
                return (node.getText().includes('EffectsModule.forRoot') &&
                    symbolName.includes('EffectsModule.forRoot')) ||
                    (node.getText().includes('EffectsModule.forFeature') &&
                        symbolName.includes('EffectsModule.forFeature'));
            });
            if (effectsModule && symbolName.includes('EffectsModule')) {
                var effectsArgs = effectsModule.arguments.shift();
                if (effectsArgs &&
                    effectsArgs.kind === ts.SyntaxKind.ArrayLiteralExpression) {
                    var effectsElements = effectsArgs
                        .elements;
                    var _a = __read(symbolName.match(/\[(.*)\]/), 2), effectsSymbol = _a[1];
                    var epos = void 0;
                    if (effectsElements.length === 0) {
                        epos = effectsArgs.getStart() + 1;
                        return [new change_1.InsertChange(ngModulePath, epos, effectsSymbol)];
                    }
                    else {
                        var lastEffect = effectsElements[effectsElements.length - 1];
                        epos = lastEffect.getEnd();
                        // Get the indentation of the last element, if any.
                        var text = lastEffect.getFullText(source);
                        var effectInsert = void 0;
                        if (text.match('^\r?\r?\n')) {
                            effectInsert = "," + text.match(/^\r?\n\s+/)[0] + effectsSymbol;
                        }
                        else {
                            effectInsert = ", " + effectsSymbol;
                        }
                        return [new change_1.InsertChange(ngModulePath, epos, effectInsert)];
                    }
                }
                else {
                    return [];
                }
            }
        }
        var toInsert;
        var position = node.getEnd();
        if (node.kind == ts.SyntaxKind.ObjectLiteralExpression) {
            // We haven't found the field in the metadata declaration. Insert a new
            // field.
            var expr = node;
            if (expr.properties.length == 0) {
                position = expr.getEnd() - 1;
                toInsert = "  " + metadataField + ": [" + symbolName + "]\n";
            }
            else {
                node = expr.properties[expr.properties.length - 1];
                position = node.getEnd();
                // Get the indentation of the last element, if any.
                var text = node.getFullText(source);
                if (text.match('^\r?\r?\n')) {
                    toInsert = "," + text.match(/^\r?\n\s+/)[0] + metadataField + ": [" + symbolName + "]";
                }
                else {
                    toInsert = ", " + metadataField + ": [" + symbolName + "]";
                }
            }
        }
        else if (node.kind == ts.SyntaxKind.ArrayLiteralExpression) {
            // We found the field but it's empty. Insert it just before the `]`.
            position--;
            toInsert = "" + symbolName;
        }
        else {
            // Get the indentation of the last element, if any.
            var text = node.getFullText(source);
            if (text.match(/^\r?\n/)) {
                toInsert = "," + text.match(/^\r?\n(\r?)\s+/)[0] + symbolName;
            }
            else {
                toInsert = ", " + symbolName;
            }
        }
        var insert = new change_1.InsertChange(ngModulePath, position, toInsert);
        var importInsert = route_utils_1.insertImport(source, ngModulePath, symbolName.replace(/\..*$/, ''), importPath);
        return [insert, importInsert];
    }
    /**
     * Custom function to insert a declaration (component, pipe, directive)
     * into NgModule declarations. It also imports the component.
     */
    function addDeclarationToModule(source, modulePath, classifiedName, importPath) {
        return _addSymbolToNgModuleMetadata(source, modulePath, 'declarations', classifiedName, importPath);
    }
    exports.addDeclarationToModule = addDeclarationToModule;
    /**
     * Custom function to insert a declaration (component, pipe, directive)
     * into NgModule declarations. It also imports the component.
     */
    function addImportToModule(source, modulePath, classifiedName, importPath) {
        return _addSymbolToNgModuleMetadata(source, modulePath, 'imports', classifiedName, importPath);
    }
    exports.addImportToModule = addImportToModule;
    /**
     * Custom function to insert a provider into NgModule. It also imports it.
     */
    function addProviderToModule(source, modulePath, classifiedName, importPath) {
        return _addSymbolToNgModuleMetadata(source, modulePath, 'providers', classifiedName, importPath);
    }
    exports.addProviderToModule = addProviderToModule;
    /**
     * Custom function to insert an export into NgModule. It also imports it.
     */
    function addExportToModule(source, modulePath, classifiedName, importPath) {
        return _addSymbolToNgModuleMetadata(source, modulePath, 'exports', classifiedName, importPath);
    }
    exports.addExportToModule = addExportToModule;
    /**
     * Custom function to insert an export into NgModule. It also imports it.
     */
    function addBootstrapToModule(source, modulePath, classifiedName, importPath) {
        return _addSymbolToNgModuleMetadata(source, modulePath, 'bootstrap', classifiedName, importPath);
    }
    exports.addBootstrapToModule = addBootstrapToModule;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0LXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS9hc3QtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSwwQkFBMEI7SUFDMUI7Ozs7OztPQU1HO0lBQ0gsK0JBQWlDO0lBQ2pDLHFFQUFnRDtJQUNoRCwrRUFBNkM7SUFFN0M7Ozs7OztPQU1HO0lBQ0gsU0FBZ0IsU0FBUyxDQUN2QixJQUFhLEVBQ2IsSUFBbUIsRUFDbkIsR0FBYztRQUFkLG9CQUFBLEVBQUEsY0FBYzs7UUFFZCxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDckIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELElBQU0sR0FBRyxHQUFjLEVBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZixHQUFHLEVBQUUsQ0FBQztTQUNQO1FBQ0QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFOztnQkFDWCxLQUFvQixJQUFBLEtBQUEsU0FBQSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUEsZ0JBQUEsNEJBQUU7b0JBQW5DLElBQU0sS0FBSyxXQUFBO29CQUNkLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7d0JBQ3RDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTs0QkFDWCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUNoQjt3QkFDRCxHQUFHLEVBQUUsQ0FBQztvQkFDUixDQUFDLENBQUMsQ0FBQztvQkFFSCxJQUFJLEdBQUcsSUFBSSxDQUFDLEVB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QUNsQixjQUFzQixFQUN0QixVQUFrQjtRQUVsQixPQUFPLDRCQUE0QixDQUNqQyxNQUFNLEVBQ04sVUFBVSxFQUNWLFNBQVMsRUFDVCxjQUFjLEVBQ2QsVUFBVSxDQUNYLENBQUM7SUFDSixDQUFDO0lBYkQsOENBYUM7SUFFRDs7T0FFRztJQUNILFNBQWdCLG1CQUFtQixDQUNqQyxNQUFxQixFQUNyQixVQUFrQixFQUNsQixjQUFzQixFQUN0QixVQUFrQjtRQUVsQixPQUFPLDRCQUE0QixDQUNqQyxNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFDWCxjQUFjLEVBQ2QsVUFBVSxDQUNYLENBQUM7SUFDSixDQUFDO0lBYkQsa0RBYUM7SUFFRDs7T0FFRztJQUNILFNBQWdCLGlCQUFpQixDQUMvQixNQUFxQixFQUNyQixVQUFrQixFQUNsQixjQUFzQixFQUN0QixVQUFrQjtRQUVsQixPQUFPLDRCQUE0QixDQUNqQyxNQUFNLEVBQ04sVUFBVSxFQUNWLFNBQVMsRUFDVCxjQUFjLEVBQ2QsVUFBVSxDQUNYLENBQUM7SUFDSixDQUFDO0lBYkQsOENBYUM7SUFFRDs7T0FFRztJQUNILFNBQWdCLG9CQUFvQixDQUNsQyxNQUFxQixFQUNyQixVQUFrQixFQUNsQixjQUFzQixFQUN0QixVQUFrQjtRQUVsQixPQUFPLDRCQUE0QixDQUNqQyxNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFDWCxjQUFjLEVBQ2QsVUFBVSxDQUNYLENBQUM7SUFDSixDQUFDO0lBYkQsb0RBYUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBpc3RhbmJ1bCBpZ25vcmUgZmlsZSAqL1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBDaGFuZ2UsIEluc2VydENoYW5nZSB9IGZyb20gJy4vY2hhbmdlJztcbmltcG9ydCB7IGluc2VydEltcG9ydCB9IGZyb20gJy4vcm91dGUtdXRpbHMnO1xuXG4vKipcbiAqIEZpbmQgYWxsIG5vZGVzIGZyb20gdGhlIEFTVCBpbiB0aGUgc3VidHJlZSBvZiBub2RlIG9mIFN5bnRheEtpbmQga2luZC5cbiAqIEBwYXJhbSBub2RlXG4gKiBAcGFyYW0ga2luZFxuICogQHBhcmFtIG1heCBUaGUgbWF4aW11bSBudW1iZXIgb2YgaXRlbXMgdG8gcmV0dXJuLlxuICogQHJldHVybiBhbGwgbm9kZXMgb2Yga2luZCwgb3IgW10gaWYgbm9uZSBpcyBmb3VuZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZE5vZGVzKFxuICBub2RlOiB0cy5Ob2RlLFxuICBraW5kOiB0cy5TeW50YXhLaW5kLFxuICBtYXggPSBJbmZpbml0eVxuKTogdHMuTm9kZVtdIHtcbiAgaWYgKCFub2RlIHx8IG1heCA9PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgYXJyOiB0cy5Ob2RlW10gPSBbXTtcbiAgaWYgKG5vZGUua2luZCA9PT0ga2luZCkge1xuICAgIGFyci5wdXNoKG5vZGUpO1xuICAgIG1heC0tO1xuICB9XG4gIGlmIChtYXggPiAwKSB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLmdldENoaWxkcmVuKCkpIHtcbiAgICAgIGZpbmROb2RlcyhjaGlsZCwga2luZCwgbWF4KS5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICBpZiAobWF4ID4gMCkge1xuICAgICAgICAgIGFyci5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIG1heC0tO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChtYXggPD0gMCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG4vKipcbiAqIEdldCBhbGwgdGhlIG5vZGVzIGZyb20gYSBzb3VyY2UuXG4gKiBAcGFyYW0gc291cmNlRmlsZSBUaGUgc291cmNlIGZpbGUgb2JqZWN0LlxuICogQHJldHVybnMge09ic2VydmFibGU8dHMuTm9kZT59IEFuIG9ic2VydmFibGUgb2YgYWxsIHRoZSBub2RlcyBpbiB0aGUgc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U291cmNlTm9kZXMoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSk6IHRzLk5vZGVbXSB7XG4gIGNvbnN0IG5vZGVzOiB0cy5Ob2RlW10gPSBbc291cmNlRmlsZV07XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlIChub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzLnNoaWZ0KCk7XG5cbiAgICBpZiAobm9kZSkge1xuICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICBpZiAobm9kZS5nZXRDaGlsZENvdW50KHNvdXJjZUZpbGUpID49IDApIHtcbiAgICAgICAgbm9kZXMudW5zaGlmdCguLi5ub2RlLmdldENoaWxkcmVuKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogSGVscGVyIGZvciBzb3J0aW5nIG5vZGVzLlxuICogQHJldHVybiBmdW5jdGlvbiB0byBzb3J0IG5vZGVzIGluIGluY3JlYXNpbmcgb3JkZXIgb2YgcG9zaXRpb24gaW4gc291cmNlRmlsZVxuICovXG5mdW5jdGlvbiBub2Rlc0J5UG9zaXRpb24oZmlyc3Q6IHRzLk5vZGUsIHNlY29uZDogdHMuTm9kZSk6IG51bWJlciB7XG4gIHJldHVybiBmaXJzdC5wb3MgLSBzZWNvbmQucG9zO1xufVxuXG4vKipcbiAqIEluc2VydCBgdG9JbnNlcnRgIGFmdGVyIHRoZSBsYXN0IG9jY3VyZW5jZSBvZiBgdHMuU3ludGF4S2luZFtub2Rlc1tpXS5raW5kXWBcbiAqIG9yIGFmdGVyIHRoZSBsYXN0IG9mIG9jY3VyZW5jZSBvZiBgc3ludGF4S2luZGAgaWYgdGhlIGxhc3Qgb2NjdXJlbmNlIGlzIGEgc3ViIGNoaWxkXG4gKiBvZiB0cy5TeW50YXhLaW5kW25vZGVzW2ldLmtpbmRdIGFuZCBzYXZlIHRoZSBjaGFuZ2VzIGluIGZpbGUuXG4gKlxuICogQHBhcmFtIG5vZGVzIGluc2VydCBhZnRlciB0aGUgbGFzdCBvY2N1cmVuY2Ugb2Ygbm9kZXNcbiAqIEBwYXJhbSB0b0luc2VydCBzdHJpbmcgdG8gaW5zZXJ0XG4gKiBAcGFyYW0gZmlsZSBmaWxlIHRvIGluc2VydCBjaGFuZ2VzIGludG9cbiAqIEBwYXJhbSBmYWxsYmFja1BvcyBwb3NpdGlvbiB0byBpbnNlcnQgaWYgdG9JbnNlcnQgaGFwcGVucyB0byBiZSB0aGUgZmlyc3Qgb2NjdXJlbmNlXG4gKiBAcGFyYW0gc3ludGF4S2luZCB0aGUgdHMuU3ludGF4S2luZCBvZiB0aGUgc3ViY2hpbGRyZW4gdG8gaW5zZXJ0IGFmdGVyXG4gKiBAcmV0dXJuIENoYW5nZSBpbnN0YW5jZVxuICogQHRocm93IEVycm9yIGlmIHRvSW5zZXJ0IGlzIGZpcnN0IG9jY3VyZW5jZSBidXQgZmFsbCBiYWNrIGlzIG5vdCBzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEFmdGVyTGFzdE9jY3VycmVuY2UoXG4gIG5vZGVzOiB0cy5Ob2RlW10sXG4gIHRvSW5zZXJ0OiBzdHJpbmcsXG4gIGZpbGU6IHN0cmluZyxcbiAgZmFsbGJhY2tQb3M6IG51bWJlcixcbiAgc3ludGF4S2luZD86IHRzLlN5bnRheEtpbmRcbik6IENoYW5nZSB7XG4gIGxldCBsYXN0SXRlbSA9IG5vZGVzLnNvcnQobm9kZXNCeVBvc2l0aW9uKS5wb3AoKTtcbiAgaWYgKCFsYXN0SXRlbSkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9XG4gIGlmIChzeW50YXhLaW5kKSB7XG4gICAgbGFzdEl0ZW0gPSBmaW5kTm9kZXMobGFzdEl0ZW0sIHN5bnRheEtpbmQpXG4gICAgICAuc29ydChub2Rlc0J5UG9zaXRpb24pXG4gICAgICAucG9wKCk7XG4gIH1cbiAgaWYgKCFsYXN0SXRlbSAmJiBmYWxsYmFja1BvcyA9PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgdHJpZWQgdG8gaW5zZXJ0ICR7dG9JbnNlcnR9IGFzIGZpcnN0IG9jY3VyZW5jZSB3aXRoIG5vIGZhbGxiYWNrIHBvc2l0aW9uYFxuICAgICk7XG4gIH1cbiAgY29uc3QgbGFzdEl0ZW1Qb3NpdGlvbjogbnVtYmVyID0gbGFzdEl0ZW0gPyBsYXN0SXRlbS5lbmQgOiBmYWxsYmFja1BvcztcblxuICByZXR1cm4gbmV3IEluc2VydENoYW5nZShmaWxlLCBsYXN0SXRlbVBvc2l0aW9uLCB0b0luc2VydCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZW50T2ZLZXlMaXRlcmFsKFxuICBfc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBub2RlOiB0cy5Ob2RlXG4pOiBzdHJpbmcgfCBudWxsIHtcbiAgaWYgKG5vZGUua2luZCA9PSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gKG5vZGUgYXMgdHMuSWRlbnRpZmllcikudGV4dDtcbiAgfSBlbHNlIGlmIChub2RlLmtpbmQgPT0gdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsKSB7XG4gICAgcmV0dXJuIChub2RlIGFzIHRzLlN0cmluZ0xpdGVyYWwpLnRleHQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2FuZ3VsYXJJbXBvcnRzRnJvbU5vZGUoXG4gIG5vZGU6IHRzLkltcG9ydERlY2xhcmF0aW9uLFxuICBfc291cmNlRmlsZTogdHMuU291cmNlRmlsZVxuKTogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0ge1xuICBjb25zdCBtcyA9IG5vZGUubW9kdWxlU3BlY2lmaWVyO1xuICBsZXQgbW9kdWxlUGF0aDogc3RyaW5nO1xuICBzd2l0Y2ggKG1zLmtpbmQpIHtcbiAgICBjYXNlIHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbDpcbiAgICAgIG1vZHVsZVBhdGggPSAobXMgYXMgdHMuU3RyaW5nTGl0ZXJhbCkudGV4dDtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4ge307XG4gIH1cblxuICBpZiAoIW1vZHVsZVBhdGguc3RhcnRzV2l0aCgnQGFuZ3VsYXIvJykpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBpZiAobm9kZS5pbXBvcnRDbGF1c2UpIHtcbiAgICBpZiAobm9kZS5pbXBvcnRDbGF1c2UubmFtZSkge1xuICAgICAgLy8gVGhpcyBpcyBvZiB0aGUgZm9ybSBgaW1wb3J0IE5hbWUgZnJvbSAncGF0aCdgLiBJZ25vcmUuXG4gICAgICByZXR1cm4ge307XG4gICAgfSBlbHNlIGlmIChub2RlLmltcG9ydENsYXVzZS5uYW1lZEJpbmRpbmdzKSB7XG4gICAgICBjb25zdCBuYiA9IG5vZGUuaW1wb3J0Q2xhdXNlLm5hbWVkQmluZGluZ3M7XG4gICAgICBpZiAobmIua2luZCA9PSB0cy5TeW50YXhLaW5kLk5hbWVzcGFjZUltcG9ydCkge1xuICAgICAgICAvLyBUaGlzIGlzIG9mIHRoZSBmb3JtIGBpbXBvcnQgKiBhcyBuYW1lIGZyb20gJ3BhdGgnYC4gUmV0dXJuIGBuYW1lLmAuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgWyhuYiBhcyB0cy5OYW1lc3BhY2VJbXBvcnQpLm5hbWUudGV4dCArICcuJ106IG1vZHVsZVBhdGgsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUaGlzIGlzIG9mIHRoZSBmb3JtIGBpbXBvcnQge2EsYixjfSBmcm9tICdwYXRoJ2BcbiAgICAgICAgY29uc3QgbmFtZWRJbXBvcnRzID0gbmIgYXMgdHMuTmFtZWRJbXBvcnRzO1xuXG4gICAgICAgIHJldHVybiBuYW1lZEltcG9ydHMuZWxlbWVudHNcbiAgICAgICAgICAubWFwKFxuICAgICAgICAgICAgKGlzOiB0cy5JbXBvcnRTcGVjaWZpZXIpID0+XG4gICAgICAgICAgICAgIGlzLnByb3BlcnR5TmFtZSA/IGlzLnByb3BlcnR5TmFtZS50ZXh0IDogaXMubmFtZS50ZXh0XG4gICAgICAgICAgKVxuICAgICAgICAgIC5yZWR1Y2UoKGFjYzogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0sIGN1cnI6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgYWNjW2N1cnJdID0gbW9kdWxlUGF0aDtcblxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICB9LCB7fSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHt9O1xuICB9IGVsc2Uge1xuICAgIC8vIFRoaXMgaXMgb2YgdGhlIGZvcm0gYGltcG9ydCAncGF0aCc7YC4gTm90aGluZyB0byBkby5cbiAgICByZXR1cm4ge307XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlY29yYXRvck1ldGFkYXRhKFxuICBzb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIGlkZW50aWZpZXI6IHN0cmluZyxcbiAgbW9kdWxlOiBzdHJpbmdcbik6IHRzLk5vZGVbXSB7XG4gIGNvbnN0IGFuZ3VsYXJJbXBvcnRzOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSA9IGZpbmROb2RlcyhcbiAgICBzb3VyY2UsXG4gICAgdHMuU3ludGF4S2luZC5JbXBvcnREZWNsYXJhdGlvblxuICApXG4gICAgLm1hcChub2RlID0+IF9hbmd1bGFySW1wb3J0c0Zyb21Ob2RlKG5vZGUgYXMgdHMuSW1wb3J0RGVjbGFyYXRpb24sIHNvdXJjZSkpXG4gICAgLnJlZHVjZShcbiAgICAgIChcbiAgICAgICAgYWNjOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSxcbiAgICAgICAgY3VycmVudDogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH1cbiAgICAgICkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhjdXJyZW50KSkge1xuICAgICAgICAgIGFjY1trZXldID0gY3VycmVudFtrZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sXG4gICAgICB7fVxuICAgICk7XG5cbiAgcmV0dXJuIGdldFNvdXJjZU5vZGVzKHNvdXJjZSlcbiAgICAuZmlsdGVyKG5vZGUgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgbm9kZS5raW5kID09IHRzLlN5bnRheEtpbmQuRGVjb3JhdG9yICYmXG4gICAgICAgIChub2RlIGFzIHRzLkRlY29yYXRvcikuZXhwcmVzc2lvbi5raW5kID09IHRzLlN5bnRheEtpbmQuQ2FsbEV4cHJlc3Npb25cbiAgICAgICk7XG4gICAgfSlcbiAgICAubWFwKG5vZGUgPT4gKG5vZGUgYXMgdHMuRGVjb3JhdG9yKS5leHByZXNzaW9uIGFzIHRzLkNhbGxFeHByZXNzaW9uKVxuICAgIC5maWx0ZXIoZXhwciA9PiB7XG4gICAgICBpZiAoZXhwci5leHByZXNzaW9uLmtpbmQgPT0gdHMuU3ludGF4S2luZC5JZGVudGlmaWVyKSB7XG4gICAgICAgIGNvbnN0IGlkID0gZXhwci5leHByZXNzaW9uIGFzIHRzLklkZW50aWZpZXI7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBpZC5nZXRGdWxsVGV4dChzb3VyY2UpID09IGlkZW50aWZpZXIgJiZcbiAgICAgICAgICBhbmd1bGFySW1wb3J0c1tpZC5nZXRGdWxsVGV4dChzb3VyY2UpXSA9PT0gbW9kdWxlXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBleHByLmV4cHJlc3Npb24ua2luZCA9PSB0cy5TeW50YXhLaW5kLlByb3BlcnR5QWNjZXNzRXhwcmVzc2lvblxuICAgICAgKSB7XG4gICAgICAgIC8vIFRoaXMgY292ZXJzIGZvby5OZ01vZHVsZSB3aGVuIGltcG9ydGluZyAqIGFzIGZvby5cbiAgICAgICAgY29uc3QgcGFFeHByID0gZXhwci5leHByZXNzaW9uIGFzIHRzLlByb3BlcnR5QWNjZXNzRXhwcmVzc2lvbjtcbiAgICAgICAgLy8gSWYgdGhlIGxlZnQgZXhwcmVzc2lvbiBpcyBub3QgYW4gaWRlbnRpZmllciwganVzdCBnaXZlIHVwIGF0IHRoYXQgcG9pbnQuXG4gICAgICAgIGlmIChwYUV4cHIuZXhwcmVzc2lvbi5raW5kICE9PSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpZCA9IHBhRXhwci5uYW1lLnRleHQ7XG4gICAgICAgIGNvbnN0IG1vZHVsZUlkID0gKHBhRXhwci5leHByZXNzaW9uIGFzIHRzLklkZW50aWZpZXIpLmdldFRleHQoc291cmNlKTtcblxuICAgICAgICByZXR1cm4gaWQgPT09IGlkZW50aWZpZXIgJiYgYW5ndWxhckltcG9ydHNbbW9kdWxlSWQgKyAnLiddID09PSBtb2R1bGU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KVxuICAgIC5maWx0ZXIoXG4gICAgICBleHByID0+XG4gICAgICAgIGV4cHIuYXJndW1lbnRzWzBdICYmXG4gICAgICAgIGV4cHIuYXJndW1lbnRzWzBdLmtpbmQgPT0gdHMuU3ludGF4S2luZC5PYmplY3RMaXRlcmFsRXhwcmVzc2lvblxuICAgIClcbiAgICAubWFwKGV4cHIgPT4gZXhwci5hcmd1bWVudHNbMF0gYXMgdHMuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24pO1xufVxuXG5mdW5jdGlvbiBfYWRkU3ltYm9sVG9OZ01vZHVsZU1ldGFkYXRhKFxuICBzb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIG5nTW9kdWxlUGF0aDogc3RyaW5nLFxuICBtZXRhZGF0YUZpZWxkOiBzdHJpbmcsXG4gIHN5bWJvbE5hbWU6IHN0cmluZyxcbiAgaW1wb3J0UGF0aDogc3RyaW5nXG4pOiBDaGFuZ2VbXSB7XG4gIGNvbnN0IG5vZGVzID0gZ2V0RGVjb3JhdG9yTWV0YWRhdGEoc291cmNlLCAnTmdNb2R1bGUnLCAnQGFuZ3VsYXIvY29yZScpO1xuICBsZXQgbm9kZTogYW55ID0gbm9kZXNbMF07IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tYW55XG5cbiAgLy8gRmluZCB0aGUgZGVjb3JhdG9yIGRlY2xhcmF0aW9uLlxuICBpZiAoIW5vZGUpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvLyBHZXQgYWxsIHRoZSBjaGlsZHJlbiBwcm9wZXJ0eSBhc3NpZ25tZW50IG9mIG9iamVjdCBsaXRlcmFscy5cbiAgY29uc3QgbWF0Y2hpbmdQcm9wZXJ0aWVzOiB0cy5PYmplY3RMaXRlcmFsRWxlbWVudFtdID0gKG5vZGUgYXMgdHMuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24pLnByb3BlcnRpZXNcbiAgICAuZmlsdGVyKHByb3AgPT4gcHJvcC5raW5kID09IHRzLlN5bnRheEtpbmQuUHJvcGVydHlBc3NpZ25tZW50KVxuICAgIC8vIEZpbHRlciBvdXQgZXZlcnkgZmllbGRzIHRoYXQncyBub3QgXCJtZXRhZGF0YUZpZWxkXCIuIEFsc28gaGFuZGxlcyBzdHJpbmcgbGl0ZXJhbHNcbiAgICAvLyAoYnV0IG5vdCBleHByZXNzaW9ucykuXG4gICAgLmZpbHRlcigocHJvcDogYW55KSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0gcHJvcC5uYW1lO1xuICAgICAgc3dpdGNoIChuYW1lLmtpbmQpIHtcbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXI6XG4gICAgICAgICAgcmV0dXJuIChuYW1lIGFzIHRzLklkZW50aWZpZXIpLmdldFRleHQoc291cmNlKSA9PSBtZXRhZGF0YUZpZWxkO1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbDpcbiAgICAgICAgICByZXR1cm4gKG5hbWUgYXMgdHMuU3RyaW5nTGl0ZXJhbCkudGV4dCA9PSBtZXRhZGF0YUZpZWxkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgLy8gR2V0IHRoZSBsYXN0IG5vZGUgb2YgdGhlIGFycmF5IGxpdGVyYWwuXG4gIGlmICghbWF0Y2hpbmdQcm9wZXJ0aWVzKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmIChtYXRjaGluZ1Byb3BlcnRpZXMubGVuZ3RoID09IDApIHtcbiAgICAvLyBXZSBoYXZlbid0IGZvdW5kIHRoZSBmaWVsZCBpbiB0aGUgbWV0YWRhdGEgZGVjbGFyYXRpb24uIEluc2VydCBhIG5ldyBmaWVsZC5cbiAgICBjb25zdCBleHByID0gbm9kZSBhcyB0cy5PYmplY3RMaXRlcmFsRXhwcmVzc2lvbjtcbiAgICBsZXQgcG9zaXRpb246IG51bWJlcjtcbiAgICBsZXQgdG9JbnNlcnQ6IHN0cmluZztcbiAgICBpZiAoZXhwci5wcm9wZXJ0aWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICBwb3NpdGlvbiA9IGV4cHIuZ2V0RW5kKCkgLSAxO1xuICAgICAgdG9JbnNlcnQgPSBgICAke21ldGFkYXRhRmllbGR9OiBbJHtzeW1ib2xOYW1lfV1cXG5gO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gZXhwci5wcm9wZXJ0aWVzW2V4cHIucHJvcGVydGllcy5sZW5ndGggLSAxXTtcbiAgICAgIHBvc2l0aW9uID0gbm9kZS5nZXRFbmQoKTtcbiAgICAgIC8vIEdldCB0aGUgaW5kZW50YXRpb24gb2YgdGhlIGxhc3QgZWxlbWVudCwgaWYgYW55LlxuICAgICAgY29uc3QgdGV4dCA9IG5vZGUuZ2V0RnVsbFRleHQoc291cmNlKTtcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSB0ZXh0Lm1hdGNoKC9eXFxyP1xcblxccyovKTtcbiAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdG9JbnNlcnQgPSBgLCR7bWF0Y2hlc1swXX0ke21ldGFkYXRhRmllbGR9OiBbJHtzeW1ib2xOYW1lfV1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9JbnNlcnQgPSBgLCAke21ldGFkYXRhRmllbGR9OiBbJHtzeW1ib2xOYW1lfV1gO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBuZXdNZXRhZGF0YVByb3BlcnR5ID0gbmV3IEluc2VydENoYW5nZShcbiAgICAgIG5nTW9kdWxlUGF0aCxcbiAgICAgIHBvc2l0aW9uLFxuICAgICAgdG9JbnNlcnRcbiAgICApO1xuICAgIGNvbnN0IG5ld01ldGFkYXRhSW1wb3J0ID0gaW5zZXJ0SW1wb3J0KFxuICAgICAgc291cmNlLFxuICAgICAgbmdNb2R1bGVQYXRoLFxuICAgICAgc3ltYm9sTmFtZS5yZXBsYWNlKC9cXC4uKiQvLCAnJyksXG4gICAgICBpbXBvcnRQYXRoXG4gICAgKTtcblxuICAgIHJldHVybiBbbmV3TWV0YWRhdGFQcm9wZXJ0eSwgbmV3TWV0YWRhdGFJbXBvcnRdO1xuICB9XG5cbiAgY29uc3QgYXNzaWdubWVudCA9IG1hdGNoaW5nUHJvcGVydGllc1swXSBhcyB0cy5Qcm9wZXJ0eUFzc2lnbm1lbnQ7XG5cbiAgLy8gSWYgaXQncyBub3QgYW4gYXJyYXksIG5vdGhpbmcgd2UgY2FuIGRvIHJlYWxseS5cbiAgaWYgKGFzc2lnbm1lbnQuaW5pdGlhbGl6ZXIua2luZCAhPT0gdHMuU3ludGF4S2luZC5BcnJheUxpdGVyYWxFeHByZXNzaW9uKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgYXJyTGl0ZXJhbCA9IGFzc2lnbm1lbnQuaW5pdGlhbGl6ZXIgYXMgdHMuQXJyYXlMaXRlcmFsRXhwcmVzc2lvbjtcbiAgaWYgKGFyckxpdGVyYWwuZWxlbWVudHMubGVuZ3RoID09IDApIHtcbiAgICAvLyBGb3J3YXJkIHRoZSBwcm9wZXJ0eS5cbiAgICBub2RlID0gYXJyTGl0ZXJhbDtcbiAgfSBlbHNlIHtcbiAgICBub2RlID0gYXJyTGl0ZXJhbC5lbGVtZW50cztcbiAgfVxuXG4gIGlmICghbm9kZSkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJ05vIGFwcCBtb2R1bGUgZm91bmQuIFBsZWFzZSBhZGQgeW91ciBuZXcgY2xhc3MgdG8geW91ciBjb21wb25lbnQuJ1xuICAgICk7XG5cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgIGNvbnN0IG5vZGVBcnJheSA9IChub2RlIGFzIHt9KSBhcyBBcnJheTx0cy5Ob2RlPjtcbiAgICBjb25zdCBzeW1ib2xzQXJyYXkgPSBub2RlQXJyYXkubWFwKG5vZGUgPT4gbm9kZS5nZXRUZXh0KCkpO1xuICAgIGlmIChzeW1ib2xzQXJyYXkuaW5jbHVkZXMoc3ltYm9sTmFtZSkpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBub2RlID0gbm9kZVtub2RlLmxlbmd0aCAtIDFdO1xuXG4gICAgY29uc3QgZWZmZWN0c01vZHVsZSA9IG5vZGVBcnJheS5maW5kKFxuICAgICAgbm9kZSA9PlxuICAgICAgICAobm9kZS5nZXRUZXh0KCkuaW5jbHVkZXMoJ0VmZmVjdHNNb2R1bGUuZm9yUm9vdCcpICYmXG4gICAgICAgICAgc3ltYm9sTmFtZS5pbmNsdWRlcygnRWZmZWN0c01vZHVsZS5mb3JSb290JykpIHx8XG4gICAgICAgIChub2RlLmdldFRleHQoKS5pbmNsdWRlcygnRWZmZWN0c01vZHVsZS5mb3JGZWF0dXJlJykgJiZcbiAgICAgICAgICBzeW1ib2xOYW1lLmluY2x1ZGVzKCdFZmZlY3RzTW9kdWxlLmZvckZlYXR1cmUnKSlcbiAgICApO1xuXG4gICAgaWYgKGVmZmVjdHNNb2R1bGUgJiYgc3ltYm9sTmFtZS5pbmNsdWRlcygnRWZmZWN0c01vZHVsZScpKSB7XG4gICAgICBjb25zdCBlZmZlY3RzQXJncyA9IChlZmZlY3RzTW9kdWxlIGFzIGFueSkuYXJndW1lbnRzLnNoaWZ0KCk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgZWZmZWN0c0FyZ3MgJiZcbiAgICAgICAgZWZmZWN0c0FyZ3Mua2luZCA9PT0gdHMuU3ludGF4S2luZC5BcnJheUxpdGVyYWxFeHByZXNzaW9uXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgZWZmZWN0c0VsZW1lbnRzID0gKGVmZmVjdHNBcmdzIGFzIHRzLkFycmF5TGl0ZXJhbEV4cHJlc3Npb24pXG4gICAgICAgICAgLmVsZW1lbnRzO1xuICAgICAgICBjb25zdCBbLCBlZmZlY3RzU3ltYm9sXSA9ICg8YW55PnN5bWJvbE5hbWUpLm1hdGNoKC9cXFsoLiopXFxdLyk7XG5cbiAgICAgICAgbGV0IGVwb3M7XG4gICAgICAgIGlmIChlZmZlY3RzRWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgZXBvcyA9IGVmZmVjdHNBcmdzLmdldFN0YXJ0KCkgKyAxO1xuICAgICAgICAgIHJldHVybiBbbmV3IEluc2VydENoYW5nZShuZ01vZHVsZVBhdGgsIGVwb3MsIGVmZmVjdHNTeW1ib2wpXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBsYXN0RWZmZWN0ID0gZWZmZWN0c0VsZW1lbnRzW1xuICAgICAgICAgICAgZWZmZWN0c0VsZW1lbnRzLmxlbmd0aCAtIDFcbiAgICAgICAgICBdIGFzIHRzLkV4cHJlc3Npb247XG4gICAgICAgICAgZXBvcyA9IGxhc3RFZmZlY3QuZ2V0RW5kKCk7XG4gICAgICAgICAgLy8gR2V0IHRoZSBpbmRlbnRhdGlvbiBvZiB0aGUgbGFzdCBlbGVtZW50LCBpZiBhbnkuXG4gICAgICAgICAgY29uc3QgdGV4dDogYW55ID0gbGFzdEVmZmVjdC5nZXRGdWxsVGV4dChzb3VyY2UpO1xuXG4gICAgICAgICAgbGV0IGVmZmVjdEluc2VydDogc3RyaW5nO1xuICAgICAgICAgIGlmICh0ZXh0Lm1hdGNoKCdeXFxyP1xccj9cXG4nKSkge1xuICAgICAgICAgICAgZWZmZWN0SW5zZXJ0ID0gYCwke3RleHQubWF0Y2goL15cXHI/XFxuXFxzKy8pWzBdfSR7ZWZmZWN0c1N5bWJvbH1gO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlZmZlY3RJbnNlcnQgPSBgLCAke2VmZmVjdHNTeW1ib2x9YDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gW25ldyBJbnNlcnRDaGFuZ2UobmdNb2R1bGVQYXRoLCBlcG9zLCBlZmZlY3RJbnNlcnQpXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxldCB0b0luc2VydDogc3RyaW5nO1xuICBsZXQgcG9zaXRpb24gPSBub2RlLmdldEVuZCgpO1xuICBpZiAobm9kZS5raW5kID09IHRzLlN5bnRheEtpbmQuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24pIHtcbiAgICAvLyBXZSBoYXZlbid0IGZvdW5kIHRoZSBmaWVsZCBpbiB0aGUgbWV0YWRhdGEgZGVjbGFyYXRpb24uIEluc2VydCBhIG5ld1xuICAgIC8vIGZpZWxkLlxuICAgIGNvbnN0IGV4cHIgPSBub2RlIGFzIHRzLk9iamVjdExpdGVyYWxFeHByZXNzaW9uO1xuICAgIGlmIChleHByLnByb3BlcnRpZXMubGVuZ3RoID09IDApIHtcbiAgICAgIHBvc2l0aW9uID0gZXhwci5nZXRFbmQoKSAtIDE7XG4gICAgICB0b0luc2VydCA9IGAgICR7bWV0YWRhdGFGaWVsZH06IFske3N5bWJvbE5hbWV9XVxcbmA7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUgPSBleHByLnByb3BlcnRpZXNbZXhwci5wcm9wZXJ0aWVzLmxlbmd0aCAtIDFdO1xuICAgICAgcG9zaXRpb24gPSBub2RlLmdldEVuZCgpO1xuICAgICAgLy8gR2V0IHRoZSBpbmRlbnRhdGlvbiBvZiB0aGUgbGFzdCBlbGVtZW50LCBpZiBhbnkuXG4gICAgICBjb25zdCB0ZXh0ID0gbm9kZS5nZXRGdWxsVGV4dChzb3VyY2UpO1xuICAgICAgaWYgKHRleHQubWF0Y2goJ15cXHI/XFxyP1xcbicpKSB7XG4gICAgICAgIHRvSW5zZXJ0ID0gYCwke1xuICAgICAgICAgIHRleHQubWF0Y2goL15cXHI/XFxuXFxzKy8pWzBdXG4gICAgICAgIH0ke21ldGFkYXRhRmllbGR9OiBbJHtzeW1ib2xOYW1lfV1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9JbnNlcnQgPSBgLCAke21ldGFkYXRhRmllbGR9OiBbJHtzeW1ib2xOYW1lfV1gO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChub2RlLmtpbmQgPT0gdHMuU3ludGF4S2luZC5BcnJheUxpdGVyYWxFeHByZXNzaW9uKSB7XG4gICAgLy8gV2UgZm91bmQgdGhlIGZpZWxkIGJ1dCBpdCdzIGVtcHR5LiBJbnNlcnQgaXQganVzdCBiZWZvcmUgdGhlIGBdYC5cbiAgICBwb3NpdGlvbi0tO1xuICAgIHRvSW5zZXJ0ID0gYCR7c3ltYm9sTmFtZX1gO1xuICB9IGVsc2Uge1xuICAgIC8vIEdldCB0aGUgaW5kZW50YXRpb24gb2YgdGhlIGxhc3QgZWxlbWVudCwgaWYgYW55LlxuICAgIGNvbnN0IHRleHQgPSBub2RlLmdldEZ1bGxUZXh0KHNvdXJjZSk7XG4gICAgaWYgKHRleHQubWF0Y2goL15cXHI/XFxuLykpIHtcbiAgICAgIHRvSW5zZXJ0ID0gYCwke3RleHQubWF0Y2goL15cXHI/XFxuKFxccj8pXFxzKy8pWzBdfSR7c3ltYm9sTmFtZX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b0luc2VydCA9IGAsICR7c3ltYm9sTmFtZX1gO1xuICAgIH1cbiAgfVxuICBjb25zdCBpbnNlcnQgPSBuZXcgSW5zZXJ0Q2hhbmdlKG5nTW9kdWxlUGF0aCwgcG9zaXRpb24sIHRvSW5zZXJ0KTtcbiAgY29uc3QgaW1wb3J0SW5zZXJ0OiBDaGFuZ2UgPSBpbnNlcnRJbXBvcnQoXG4gICAgc291cmNlLFxuICAgIG5nTW9kdWxlUGF0aCxcbiAgICBzeW1ib2xOYW1lLnJlcGxhY2UoL1xcLi4qJC8sICcnKSxcbiAgICBpbXBvcnRQYXRoXG4gICk7XG5cbiAgcmV0dXJuIFtpbnNlcnQsIGltcG9ydEluc2VydF07XG59XG5cbi8qKlxuICogQ3VzdG9tIGZ1bmN0aW9uIHRvIGluc2VydCBhIGRlY2xhcmF0aW9uIChjb21wb25lbnQsIHBpcGUsIGRpcmVjdGl2ZSlcbiAqIGludG8gTmdNb2R1bGUgZGVjbGFyYXRpb25zLiBJdCBhbHNvIGltcG9ydHMgdGhlIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZERlY2xhcmF0aW9uVG9Nb2R1bGUoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgbW9kdWxlUGF0aDogc3RyaW5nLFxuICBjbGFzc2lmaWVkTmFtZTogc3RyaW5nLFxuICBpbXBvcnRQYXRoOiBzdHJpbmdcbik6IENoYW5nZVtdIHtcbiAgcmV0dXJuIF9hZGRTeW1ib2xUb05nTW9kdWxlTWV0YWRhdGEoXG4gICAgc291cmNlLFxuICAgIG1vZHVsZVBhdGgsXG4gICAgJ2RlY2xhcmF0aW9ucycsXG4gICAgY2xhc3NpZmllZE5hbWUsXG4gICAgaW1wb3J0UGF0aFxuICApO1xufVxuXG4vKipcbiAqIEN1c3RvbSBmdW5jdGlvbiB0byBpbnNlcnQgYSBkZWNsYXJhdGlvbiAoY29tcG9uZW50LCBwaXBlLCBkaXJlY3RpdmUpXG4gKiBpbnRvIE5nTW9kdWxlIGRlY2xhcmF0aW9ucy4gSXQgYWxzbyBpbXBvcnRzIHRoZSBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRJbXBvcnRUb01vZHVsZShcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBtb2R1bGVQYXRoOiBzdHJpbmcsXG4gIGNsYXNzaWZpZWROYW1lOiBzdHJpbmcsXG4gIGltcG9ydFBhdGg6IHN0cmluZ1xuKTogQ2hhbmdlW10ge1xuICByZXR1cm4gX2FkZFN5bWJvbFRvTmdNb2R1bGVNZXRhZGF0YShcbiAgICBzb3VyY2UsXG4gICAgbW9kdWxlUGF0aCxcbiAgICAnaW1wb3J0cycsXG4gICAgY2xhc3NpZmllZE5hbWUsXG4gICAgaW1wb3J0UGF0aFxuICApO1xufVxuXG4vKipcbiAqIEN1c3RvbSBmdW5jdGlvbiB0byBpbnNlcnQgYSBwcm92aWRlciBpbnRvIE5nTW9kdWxlLiBJdCBhbHNvIGltcG9ydHMgaXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRQcm92aWRlclRvTW9kdWxlKFxuICBzb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIG1vZHVsZVBhdGg6IHN0cmluZyxcbiAgY2xhc3NpZmllZE5hbWU6IHN0cmluZyxcbiAgaW1wb3J0UGF0aDogc3RyaW5nXG4pOiBDaGFuZ2VbXSB7XG4gIHJldHVybiBfYWRkU3ltYm9sVG9OZ01vZHVsZU1ldGFkYXRhKFxuICAgIHNvdXJjZSxcbiAgICBtb2R1bGVQYXRoLFxuICAgICdwcm92aWRlcnMnLFxuICAgIGNsYXNzaWZpZWROYW1lLFxuICAgIGltcG9ydFBhdGhcbiAgKTtcbn1cblxuLyoqXG4gKiBDdXN0b20gZnVuY3Rpb24gdG8gaW5zZXJ0IGFuIGV4cG9ydCBpbnRvIE5nTW9kdWxlLiBJdCBhbHNvIGltcG9ydHMgaXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRFeHBvcnRUb01vZHVsZShcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBtb2R1bGVQYXRoOiBzdHJpbmcsXG4gIGNsYXNzaWZpZWROYW1lOiBzdHJpbmcsXG4gIGltcG9ydFBhdGg6IHN0cmluZ1xuKTogQ2hhbmdlW10ge1xuICByZXR1cm4gX2FkZFN5bWJvbFRvTmdNb2R1bGVNZXRhZGF0YShcbiAgICBzb3VyY2UsXG4gICAgbW9kdWxlUGF0aCxcbiAgICAnZXhwb3J0cycsXG4gICAgY2xhc3NpZmllZE5hbWUsXG4gICAgaW1wb3J0UGF0aFxuICApO1xufVxuXG4vKipcbiAqIEN1c3RvbSBmdW5jdGlvbiB0byBpbnNlcnQgYW4gZXhwb3J0IGludG8gTmdNb2R1bGUuIEl0IGFsc28gaW1wb3J0cyBpdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEJvb3RzdHJhcFRvTW9kdWxlKFxuICBzb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIG1vZHVsZVBhdGg6IHN0cmluZyxcbiAgY2xhc3NpZmllZE5hbWU6IHN0cmluZyxcbiAgaW1wb3J0UGF0aDogc3RyaW5nXG4pOiBDaGFuZ2VbXSB7XG4gIHJldHVybiBfYWRkU3ltYm9sVG9OZ01vZHVsZU1ldGFkYXRhKFxuICAgIHNvdXJjZSxcbiAgICBtb2R1bGVQYXRoLFxuICAgICdib290c3RyYXAnLFxuICAgIGNsYXNzaWZpZWROYW1lLFxuICAgIGltcG9ydFBhdGhcbiAgKTtcbn1cbiJdfQ==