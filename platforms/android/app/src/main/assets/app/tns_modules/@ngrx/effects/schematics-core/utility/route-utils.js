(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/effects/schematics-core/utility/route-utils", ["require", "exports", "typescript", "@ngrx/effects/schematics-core/utility/ast-utils", "@ngrx/effects/schematics-core/utility/change"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var ts = require("typescript");
    var ast_utils_1 = require("@ngrx/effects/schematics-core/utility/ast-utils");
    var change_1 = require("@ngrx/effects/schematics-core/utility/change");
    /**
     * Add Import `import { symbolName } from fileName` if the import doesn't exit
     * already. Assumes fileToEdit can be resolved and accessed.
     * @param fileToEdit (file we want to add import to)
     * @param symbolName (item to import)
     * @param fileName (path to the file)
     * @param isDefault (if true, import follows style for importing default exports)
     * @return Change
     */
    function insertImport(source, fileToEdit, symbolName, fileName, isDefault) {
        if (isDefault === void 0) { isDefault = false; }
        var rootNode = source;
        var allImports = ast_utils_1.findNodes(rootNode, ts.SyntaxKind.ImportDeclaration);
        // get nodes that map to import statements from the file fileName
        var relevantImports = allImports.filter(function (node) {
            // StringLiteral of the ImportDeclaration is the import file (fileName in this case).
            var importFiles = node
                .getChildren()
                .filter(function (child) { return child.kind === ts.SyntaxKind.StringLiteral; })
                .map(function (n) { return n.text; });
            return importFiles.filter(function (file) { return file === fileName; }).length === 1;
        });
        if (relevantImports.length > 0) {
            var importsAsterisk_1 = false;
            // imports from import file
            var imports_1 = [];
            relevantImports.forEach(function (n) {
                Array.prototype.push.apply(imports_1, ast_utils_1.findNodes(n, ts.SyntaxKind.Identifier));
                if (ast_utils_1.findNodes(n, ts.SyntaxKind.AsteriskToken).length > 0) {
                    importsAsterisk_1 = true;
                }
            });
            // if imports * from fileName, don't add symbolName
            if (importsAsterisk_1) {
                return new change_1.NoopChange();
            }
            var importTextNodes = imports_1.filter(function (n) { return n.text === symbolName; });
            // insert import if it's not there
            if (importTextNodes.length === 0) {
                var fallbackPos_1 = ast_utils_1.findNodes(relevantImports[0], ts.SyntaxKind.CloseBraceToken)[0].getStart() ||
                    ast_utils_1.findNodes(relevantImports[0], ts.SyntaxKind.FromKeyword)[0].getStart();
                return ast_utils_1.insertAfterLastOccurrence(imports_1, ", " + symbolName, fileToEdit, fallbackPos_1);
            }
            return new change_1.NoopChange();
        }
        // no such import declaration exists
        var useStrict = ast_utils_1.findNodes(rootNode, ts.SyntaxKind.StringLiteral).filter(function (n) { return n.getText() === 'use strict'; });
        var fallbackPos = 0;
        if (useStrict.length > 0) {
            fallbackPos = useStrict[0].end;
        }
        var open = isDefault ? '' : '{ ';
        var close = isDefault ? '' : ' }';
        // if there are no imports or 'use strict' statement, insert import at beginning of file
        var insertAtBeginning = allImports.length === 0 && useStrict.length === 0;
        var separator = insertAtBeginning ? '' : ';\n';
        var toInsert = separator + "import " + open + symbolName + close +
            (" from '" + fileName + "'" + (insertAtBeginning ? ';\n' : ''));
        return ast_utils_1.insertAfterLastOccurrence(allImports, toInsert, fileToEdit, fallbackPos, ts.SyntaxKind.StringLiteral);
    }
    exports.insertImport = insertImport;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VmZmVjdHMvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvcm91dGUtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7O09BTUc7SUFDSCwrQkFBaUM7SUFDakMsNkVBQW1FO0lBQ25FLHVFQUE4QztJQUU5Qzs7Ozs7Ozs7T0FRRztJQUVILFNBQWdCLFlBQVksQ0FDMUIsTUFBcUIsRUFDckIsVUFBa0IsRUFDbEIsVUFBa0IsRUFDbEIsUUFBZ0IsRUFDaEIsU0FBaUI7UUFBakIsMEJBQUEsRUFBQSxpQkFBaUI7UUFFakIsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3hCLElBQU0sVUFBVSxHQUFHLHFCQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUV4RSxpRUFBaUU7UUFDakUsSUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUk7WUFDNUMscUZBQXFGO1lBQ3JGLElBQU0sV0FBVyxHQUFHLElBQUk7aUJBQ3JCLFdBQVcsRUFBRTtpQkFDYixNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUExQyxDQUEwQyxDQUFDO2lCQUMzRCxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQyxDQUFzQixDQUFDLElBQUksRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO1lBRTFDLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksS0FBSyxRQUFRLEVBQWpCLENBQWlCLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxlQUFlLENBQUMs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QUFVLENBQUMsYUFBYSxDQUM1QixDQUFDO0lBQ0osQ0FBQztJQXhGRCxvQ0F3RkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7IGZpbmROb2RlcywgaW5zZXJ0QWZ0ZXJMYXN0T2NjdXJyZW5jZSB9IGZyb20gJy4vYXN0LXV0aWxzJztcbmltcG9ydCB7IENoYW5nZSwgTm9vcENoYW5nZSB9IGZyb20gJy4vY2hhbmdlJztcblxuLyoqXG4gKiBBZGQgSW1wb3J0IGBpbXBvcnQgeyBzeW1ib2xOYW1lIH0gZnJvbSBmaWxlTmFtZWAgaWYgdGhlIGltcG9ydCBkb2Vzbid0IGV4aXRcbiAqIGFscmVhZHkuIEFzc3VtZXMgZmlsZVRvRWRpdCBjYW4gYmUgcmVzb2x2ZWQgYW5kIGFjY2Vzc2VkLlxuICogQHBhcmFtIGZpbGVUb0VkaXQgKGZpbGUgd2Ugd2FudCB0byBhZGQgaW1wb3J0IHRvKVxuICogQHBhcmFtIHN5bWJvbE5hbWUgKGl0ZW0gdG8gaW1wb3J0KVxuICogQHBhcmFtIGZpbGVOYW1lIChwYXRoIHRvIHRoZSBmaWxlKVxuICogQHBhcmFtIGlzRGVmYXVsdCAoaWYgdHJ1ZSwgaW1wb3J0IGZvbGxvd3Mgc3R5bGUgZm9yIGltcG9ydGluZyBkZWZhdWx0IGV4cG9ydHMpXG4gKiBAcmV0dXJuIENoYW5nZVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRJbXBvcnQoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgZmlsZVRvRWRpdDogc3RyaW5nLFxuICBzeW1ib2xOYW1lOiBzdHJpbmcsXG4gIGZpbGVOYW1lOiBzdHJpbmcsXG4gIGlzRGVmYXVsdCA9IGZhbHNlXG4pOiBDaGFuZ2Uge1xuICBjb25zdCByb290Tm9kZSA9IHNvdXJjZTtcbiAgY29uc3QgYWxsSW1wb3J0cyA9IGZpbmROb2Rlcyhyb290Tm9kZSwgdHMuU3ludGF4S2luZC5JbXBvcnREZWNsYXJhdGlvbik7XG5cbiAgLy8gZ2V0IG5vZGVzIHRoYXQgbWFwIHRvIGltcG9ydCBzdGF0ZW1lbnRzIGZyb20gdGhlIGZpbGUgZmlsZU5hbWVcbiAgY29uc3QgcmVsZXZhbnRJbXBvcnRzID0gYWxsSW1wb3J0cy5maWx0ZXIobm9kZSA9PiB7XG4gICAgLy8gU3RyaW5nTGl0ZXJhbCBvZiB0aGUgSW1wb3J0RGVjbGFyYXRpb24gaXMgdGhlIGltcG9ydCBmaWxlIChmaWxlTmFtZSBpbiB0aGlzIGNhc2UpLlxuICAgIGNvbnN0IGltcG9ydEZpbGVzID0gbm9kZVxuICAgICAgLmdldENoaWxkcmVuKClcbiAgICAgIC5maWx0ZXIoY2hpbGQgPT4gY2hpbGQua2luZCA9PT0gdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsKVxuICAgICAgLm1hcChuID0+IChuIGFzIHRzLlN0cmluZ0xpdGVyYWwpLnRleHQpO1xuXG4gICAgcmV0dXJuIGltcG9ydEZpbGVzLmZpbHRlcihmaWxlID0+IGZpbGUgPT09IGZpbGVOYW1lKS5sZW5ndGggPT09IDE7XG4gIH0pO1xuXG4gIGlmIChyZWxldmFudEltcG9ydHMubGVuZ3RoID4gMCkge1xuICAgIGxldCBpbXBvcnRzQXN0ZXJpc2sgPSBmYWxzZTtcbiAgICAvLyBpbXBvcnRzIGZyb20gaW1wb3J0IGZpbGVcbiAgICBjb25zdCBpbXBvcnRzOiB0cy5Ob2RlW10gPSBbXTtcbiAgICByZWxldmFudEltcG9ydHMuZm9yRWFjaChuID0+IHtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KFxuICAgICAgICBpbXBvcnRzLFxuICAgICAgICBmaW5kTm9kZXMobiwgdHMuU3ludGF4S2luZC5JZGVudGlmaWVyKVxuICAgICAgKTtcbiAgICAgIGlmIChmaW5kTm9kZXMobiwgdHMuU3ludGF4S2luZC5Bc3Rlcmlza1Rva2VuKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGltcG9ydHNBc3RlcmlzayA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBpZiBpbXBvcnRzICogZnJvbSBmaWxlTmFtZSwgZG9uJ3QgYWRkIHN5bWJvbE5hbWVcbiAgICBpZiAoaW1wb3J0c0FzdGVyaXNrKSB7XG4gICAgICByZXR1cm4gbmV3IE5vb3BDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbXBvcnRUZXh0Tm9kZXMgPSBpbXBvcnRzLmZpbHRlcihcbiAgICAgIG4gPT4gKG4gYXMgdHMuSWRlbnRpZmllcikudGV4dCA9PT0gc3ltYm9sTmFtZVxuICAgICk7XG5cbiAgICAvLyBpbnNlcnQgaW1wb3J0IGlmIGl0J3Mgbm90IHRoZXJlXG4gICAgaWYgKGltcG9ydFRleHROb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IGZhbGxiYWNrUG9zID1cbiAgICAgICAgZmluZE5vZGVzKFxuICAgICAgICAgIHJlbGV2YW50SW1wb3J0c1swXSxcbiAgICAgICAgICB0cy5TeW50YXhLaW5kLkNsb3NlQnJhY2VUb2tlblxuICAgICAgICApWzBdLmdldFN0YXJ0KCkgfHxcbiAgICAgICAgZmluZE5vZGVzKHJlbGV2YW50SW1wb3J0c1swXSwgdHMuU3ludGF4S2luZC5Gcm9tS2V5d29yZClbMF0uZ2V0U3RhcnQoKTtcblxuICAgICAgcmV0dXJuIGluc2VydEFmdGVyTGFzdE9jY3VycmVuY2UoXG4gICAgICAgIGltcG9ydHMsXG4gICAgICAgIGAsICR7c3ltYm9sTmFtZX1gLFxuICAgICAgICBmaWxlVG9FZGl0LFxuICAgICAgICBmYWxsYmFja1Bvc1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE5vb3BDaGFuZ2UoKTtcbiAgfVxuXG4gIC8vIG5vIHN1Y2ggaW1wb3J0IGRlY2xhcmF0aW9uIGV4aXN0c1xuICBjb25zdCB1c2VTdHJpY3QgPSBmaW5kTm9kZXMocm9vdE5vZGUsIHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbCkuZmlsdGVyKFxuICAgIG4gPT4gbi5nZXRUZXh0KCkgPT09ICd1c2Ugc3RyaWN0J1xuICApO1xuICBsZXQgZmFsbGJhY2tQb3MgPSAwO1xuICBpZiAodXNlU3RyaWN0Lmxlbmd0aCA+IDApIHtcbiAgICBmYWxsYmFja1BvcyA9IHVzZVN0cmljdFswXS5lbmQ7XG4gIH1cbiAgY29uc3Qgb3BlbiA9IGlzRGVmYXVsdCA/ICcnIDogJ3sgJztcbiAgY29uc3QgY2xvc2UgPSBpc0RlZmF1bHQgPyAnJyA6ICcgfSc7XG4gIC8vIGlmIHRoZXJlIGFyZSBubyBpbXBvcnRzIG9yICd1c2Ugc3RyaWN0JyBzdGF0ZW1lbnQsIGluc2VydCBpbXBvcnQgYXQgYmVnaW5uaW5nIG9mIGZpbGVcbiAgY29uc3QgaW5zZXJ0QXRCZWdpbm5pbmcgPSBhbGxJbXBvcnRzLmxlbmd0aCA9PT0gMCAmJiB1c2VTdHJpY3QubGVuZ3RoID09PSAwO1xuICBjb25zdCBzZXBhcmF0b3IgPSBpbnNlcnRBdEJlZ2lubmluZyA/ICcnIDogJztcXG4nO1xuICBjb25zdCB0b0luc2VydCA9XG4gICAgYCR7c2VwYXJhdG9yfWltcG9ydCAke29wZW59JHtzeW1ib2xOYW1lfSR7Y2xvc2V9YCArXG4gICAgYCBmcm9tICcke2ZpbGVOYW1lfScke2luc2VydEF0QmVnaW5uaW5nID8gJztcXG4nIDogJyd9YDtcblxuICByZXR1cm4gaW5zZXJ0QWZ0ZXJMYXN0T2NjdXJyZW5jZShcbiAgICBhbGxJbXBvcnRzLFxuICAgIHRvSW5zZXJ0LFxuICAgIGZpbGVUb0VkaXQsXG4gICAgZmFsbGJhY2tQb3MsXG4gICAgdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsXG4gICk7XG59XG4iXX0=