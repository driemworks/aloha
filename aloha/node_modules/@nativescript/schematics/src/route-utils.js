"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const change_1 = require("@schematics/angular/utility/change");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const ast_utils_2 = require("./ast-utils");
/**
* Add Import `import { symbolName } from fileName` if the import doesn't exit
* already. Assumes fileToEdit can be resolved and accessed.
* @param fileToEdit (file we want to add import to)
* @param symbolName (item to import)
* @param fileName (path to the file)
* @param quote (specifies the type of quotes that should be used)
* @param isDefault (if true, import follows style for importing default exports)
* @return Change
*/
function insertImport(source, fileToEdit, symbolName, fileName, quote = '\"', isDefault = false) {
    const rootNode = source;
    const allImports = ast_utils_1.findNodes(rootNode, ts.SyntaxKind.ImportDeclaration);
    // get nodes that map to import statements from the file fileName
    const relevantImports = allImports.filter(node => {
        // StringLiteral of the ImportDeclaration is the import file (fileName in this case).
        const importFiles = node.getChildren()
            .filter(child => child.kind === ts.SyntaxKind.StringLiteral)
            .map(n => n.text);
        return importFiles.filter(file => file === fileName).length === 1;
    });
    if (relevantImports.length > 0) {
        let importsAsterisk = false;
        // imports from import file
        const imports = [];
        relevantImports.forEach(n => {
            Array.prototype.push.apply(imports, ast_utils_1.findNodes(n, ts.SyntaxKind.Identifier));
            if (ast_utils_1.findNodes(n, ts.SyntaxKind.AsteriskToken).length > 0) {
                importsAsterisk = true;
            }
        });
        // if imports * from fileName, don't add symbolName
        if (importsAsterisk) {
            return new change_1.NoopChange();
        }
        const importTextNodes = imports.filter(n => n.text === symbolName);
        // insert import if it's not there
        if (importTextNodes.length === 0) {
            const fallbackPos = ast_utils_1.findNodes(relevantImports[0], ts.SyntaxKind.CloseBraceToken)[0].getStart() ||
                ast_utils_1.findNodes(relevantImports[0], ts.SyntaxKind.FromKeyword)[0].getStart();
            return ast_utils_2.insertBeforeFirstOccurence(imports, `, ${symbolName}`, fileToEdit, fallbackPos);
        }
        return new change_1.NoopChange();
    }
    // no such import declaration exists
    const useStrict = ast_utils_1.findNodes(rootNode, ts.SyntaxKind.StringLiteral)
        .filter((n) => n.text === 'use strict');
    let fallbackPos = 0;
    if (useStrict.length > 0) {
        fallbackPos = useStrict[0].end;
    }
    const open = isDefault ? '' : '{ ';
    const close = isDefault ? '' : ' }';
    const toInsert = `import ${open}${symbolName}${close}` +
        ` from ${quote}${fileName}${quote};\n`;
    return ast_utils_2.insertBeforeFirstOccurence(allImports, toInsert, fileToEdit, fallbackPos);
}
exports.insertImport = insertImport;
//# sourceMappingURL=route-utils.js.map