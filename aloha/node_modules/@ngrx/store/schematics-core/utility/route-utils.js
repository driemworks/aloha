(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core/utility/route-utils", ["require", "exports", "typescript", "@ngrx/store/schematics-core/utility/ast-utils", "@ngrx/store/schematics-core/utility/change"], factory);
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
    var ast_utils_1 = require("@ngrx/store/schematics-core/utility/ast-utils");
    var change_1 = require("@ngrx/store/schematics-core/utility/change");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NjaGVtYXRpY3MtY29yZS91dGlsaXR5L3JvdXRlLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUE7Ozs7OztPQU1HO0lBQ0gsK0JBQWlDO0lBQ2pDLDJFQUFtRTtJQUNuRSxxRUFBOEM7SUFFOUM7Ozs7Ozs7O09BUUc7SUFFSCxTQUFnQixZQUFZLENBQzFCLE1BQXFCLEVBQ3JCLFVBQWtCLEVBQ2xCLFVBQWtCLEVBQ2xCLFFBQWdCLEVBQ2hCLFNBQWlCO1FBQWpCLDBCQUFBLEVBQUEsaUJBQWlCO1FBRWpCLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN4QixJQUFNLFVBQVUsR0FBRyxxQkFBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFeEUsaUVBQWlFO1FBQ2pFLElBQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJO1lBQzVDLHFGQUFxRjtZQUNyRixJQUFNLFdBQVcsR0FBRyxJQUFJO2lCQUNyQixXQUFXLEVBQUU7aUJBQ2IsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBMUMsQ0FBMEMsQ0FBQztpQkFDM0QsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUMsQ0FBc0IsQ0FBQyxJQUFJLEVBQTVCLENBQTRCLENBQUMsQ0FBQztZQUUxQyxPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLEtBQUssUUFBUSxFQUFqQixDQUFpQixDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksZUFBZSxDQUFDLE1B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VSxDQUFDLGFBQWEsQ0FDNUIsQ0FBQztJQUNKLENBQUM7SUF4RkQsb0NBd0ZDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBmaW5kTm9kZXMsIGluc2VydEFmdGVyTGFzdE9jY3VycmVuY2UgfSBmcm9tICcuL2FzdC11dGlscyc7XG5pbXBvcnQgeyBDaGFuZ2UsIE5vb3BDaGFuZ2UgfSBmcm9tICcuL2NoYW5nZSc7XG5cbi8qKlxuICogQWRkIEltcG9ydCBgaW1wb3J0IHsgc3ltYm9sTmFtZSB9IGZyb20gZmlsZU5hbWVgIGlmIHRoZSBpbXBvcnQgZG9lc24ndCBleGl0XG4gKiBhbHJlYWR5LiBBc3N1bWVzIGZpbGVUb0VkaXQgY2FuIGJlIHJlc29sdmVkIGFuZCBhY2Nlc3NlZC5cbiAqIEBwYXJhbSBmaWxlVG9FZGl0IChmaWxlIHdlIHdhbnQgdG8gYWRkIGltcG9ydCB0bylcbiAqIEBwYXJhbSBzeW1ib2xOYW1lIChpdGVtIHRvIGltcG9ydClcbiAqIEBwYXJhbSBmaWxlTmFtZSAocGF0aCB0byB0aGUgZmlsZSlcbiAqIEBwYXJhbSBpc0RlZmF1bHQgKGlmIHRydWUsIGltcG9ydCBmb2xsb3dzIHN0eWxlIGZvciBpbXBvcnRpbmcgZGVmYXVsdCBleHBvcnRzKVxuICogQHJldHVybiBDaGFuZ2VcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0SW1wb3J0KFxuICBzb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIGZpbGVUb0VkaXQ6IHN0cmluZyxcbiAgc3ltYm9sTmFtZTogc3RyaW5nLFxuICBmaWxlTmFtZTogc3RyaW5nLFxuICBpc0RlZmF1bHQgPSBmYWxzZVxuKTogQ2hhbmdlIHtcbiAgY29uc3Qgcm9vdE5vZGUgPSBzb3VyY2U7XG4gIGNvbnN0IGFsbEltcG9ydHMgPSBmaW5kTm9kZXMocm9vdE5vZGUsIHRzLlN5bnRheEtpbmQuSW1wb3J0RGVjbGFyYXRpb24pO1xuXG4gIC8vIGdldCBub2RlcyB0aGF0IG1hcCB0byBpbXBvcnQgc3RhdGVtZW50cyBmcm9tIHRoZSBmaWxlIGZpbGVOYW1lXG4gIGNvbnN0IHJlbGV2YW50SW1wb3J0cyA9IGFsbEltcG9ydHMuZmlsdGVyKG5vZGUgPT4ge1xuICAgIC8vIFN0cmluZ0xpdGVyYWwgb2YgdGhlIEltcG9ydERlY2xhcmF0aW9uIGlzIHRoZSBpbXBvcnQgZmlsZSAoZmlsZU5hbWUgaW4gdGhpcyBjYXNlKS5cbiAgICBjb25zdCBpbXBvcnRGaWxlcyA9IG5vZGVcbiAgICAgIC5nZXRDaGlsZHJlbigpXG4gICAgICAuZmlsdGVyKGNoaWxkID0+IGNoaWxkLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbClcbiAgICAgIC5tYXAobiA9PiAobiBhcyB0cy5TdHJpbmdMaXRlcmFsKS50ZXh0KTtcblxuICAgIHJldHVybiBpbXBvcnRGaWxlcy5maWx0ZXIoZmlsZSA9PiBmaWxlID09PSBmaWxlTmFtZSkubGVuZ3RoID09PSAxO1xuICB9KTtcblxuICBpZiAocmVsZXZhbnRJbXBvcnRzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgaW1wb3J0c0FzdGVyaXNrID0gZmFsc2U7XG4gICAgLy8gaW1wb3J0cyBmcm9tIGltcG9ydCBmaWxlXG4gICAgY29uc3QgaW1wb3J0czogdHMuTm9kZVtdID0gW107XG4gICAgcmVsZXZhbnRJbXBvcnRzLmZvckVhY2gobiA9PiB7XG4gICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShcbiAgICAgICAgaW1wb3J0cyxcbiAgICAgICAgZmluZE5vZGVzKG4sIHRzLlN5bnRheEtpbmQuSWRlbnRpZmllcilcbiAgICAgICk7XG4gICAgICBpZiAoZmluZE5vZGVzKG4sIHRzLlN5bnRheEtpbmQuQXN0ZXJpc2tUb2tlbikubGVuZ3RoID4gMCkge1xuICAgICAgICBpbXBvcnRzQXN0ZXJpc2sgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gaWYgaW1wb3J0cyAqIGZyb20gZmlsZU5hbWUsIGRvbid0IGFkZCBzeW1ib2xOYW1lXG4gICAgaWYgKGltcG9ydHNBc3Rlcmlzaykge1xuICAgICAgcmV0dXJuIG5ldyBOb29wQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgaW1wb3J0VGV4dE5vZGVzID0gaW1wb3J0cy5maWx0ZXIoXG4gICAgICBuID0+IChuIGFzIHRzLklkZW50aWZpZXIpLnRleHQgPT09IHN5bWJvbE5hbWVcbiAgICApO1xuXG4gICAgLy8gaW5zZXJ0IGltcG9ydCBpZiBpdCdzIG5vdCB0aGVyZVxuICAgIGlmIChpbXBvcnRUZXh0Tm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zdCBmYWxsYmFja1BvcyA9XG4gICAgICAgIGZpbmROb2RlcyhcbiAgICAgICAgICByZWxldmFudEltcG9ydHNbMF0sXG4gICAgICAgICAgdHMuU3ludGF4S2luZC5DbG9zZUJyYWNlVG9rZW5cbiAgICAgICAgKVswXS5nZXRTdGFydCgpIHx8XG4gICAgICAgIGZpbmROb2RlcyhyZWxldmFudEltcG9ydHNbMF0sIHRzLlN5bnRheEtpbmQuRnJvbUtleXdvcmQpWzBdLmdldFN0YXJ0KCk7XG5cbiAgICAgIHJldHVybiBpbnNlcnRBZnRlckxhc3RPY2N1cnJlbmNlKFxuICAgICAgICBpbXBvcnRzLFxuICAgICAgICBgLCAke3N5bWJvbE5hbWV9YCxcbiAgICAgICAgZmlsZVRvRWRpdCxcbiAgICAgICAgZmFsbGJhY2tQb3NcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBOb29wQ2hhbmdlKCk7XG4gIH1cblxuICAvLyBubyBzdWNoIGltcG9ydCBkZWNsYXJhdGlvbiBleGlzdHNcbiAgY29uc3QgdXNlU3RyaWN0ID0gZmluZE5vZGVzKHJvb3ROb2RlLCB0cy5TeW50YXhLaW5kLlN0cmluZ0xpdGVyYWwpLmZpbHRlcihcbiAgICBuID0+IG4uZ2V0VGV4dCgpID09PSAndXNlIHN0cmljdCdcbiAgKTtcbiAgbGV0IGZhbGxiYWNrUG9zID0gMDtcbiAgaWYgKHVzZVN0cmljdC5sZW5ndGggPiAwKSB7XG4gICAgZmFsbGJhY2tQb3MgPSB1c2VTdHJpY3RbMF0uZW5kO1xuICB9XG4gIGNvbnN0IG9wZW4gPSBpc0RlZmF1bHQgPyAnJyA6ICd7ICc7XG4gIGNvbnN0IGNsb3NlID0gaXNEZWZhdWx0ID8gJycgOiAnIH0nO1xuICAvLyBpZiB0aGVyZSBhcmUgbm8gaW1wb3J0cyBvciAndXNlIHN0cmljdCcgc3RhdGVtZW50LCBpbnNlcnQgaW1wb3J0IGF0IGJlZ2lubmluZyBvZiBmaWxlXG4gIGNvbnN0IGluc2VydEF0QmVnaW5uaW5nID0gYWxsSW1wb3J0cy5sZW5ndGggPT09IDAgJiYgdXNlU3RyaWN0Lmxlbmd0aCA9PT0gMDtcbiAgY29uc3Qgc2VwYXJhdG9yID0gaW5zZXJ0QXRCZWdpbm5pbmcgPyAnJyA6ICc7XFxuJztcbiAgY29uc3QgdG9JbnNlcnQgPVxuICAgIGAke3NlcGFyYXRvcn1pbXBvcnQgJHtvcGVufSR7c3ltYm9sTmFtZX0ke2Nsb3NlfWAgK1xuICAgIGAgZnJvbSAnJHtmaWxlTmFtZX0nJHtpbnNlcnRBdEJlZ2lubmluZyA/ICc7XFxuJyA6ICcnfWA7XG5cbiAgcmV0dXJuIGluc2VydEFmdGVyTGFzdE9jY3VycmVuY2UoXG4gICAgYWxsSW1wb3J0cyxcbiAgICB0b0luc2VydCxcbiAgICBmaWxlVG9FZGl0LFxuICAgIGZhbGxiYWNrUG9zLFxuICAgIHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbFxuICApO1xufVxuIl19