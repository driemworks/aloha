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
        define("@ngrx/effects/schematics-core/utility/ngrx-utils", ["require", "exports", "typescript", "@ngrx/effects/schematics-core/utility/strings", "@ngrx/effects/schematics-core/utility/change", "@angular-devkit/schematics", "@angular-devkit/core", "@ngrx/effects/schematics-core/utility/find-module", "@ngrx/effects/schematics-core/utility/route-utils", "@ngrx/effects/schematics-core/utility/ast-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ts = require("typescript");
    var stringUtils = require("@ngrx/effects/schematics-core/utility/strings");
    var change_1 = require("@ngrx/effects/schematics-core/utility/change");
    var schematics_1 = require("@angular-devkit/schematics");
    var core_1 = require("@angular-devkit/core");
    var find_module_1 = require("@ngrx/effects/schematics-core/utility/find-module");
    var route_utils_1 = require("@ngrx/effects/schematics-core/utility/route-utils");
    var ast_utils_1 = require("@ngrx/effects/schematics-core/utility/ast-utils");
    function addReducerToState(options) {
        return function (host) {
            var e_1, _a;
            if (!options.reducers) {
                return host;
            }
            var reducersPath = core_1.normalize("/" + options.path + "/" + options.reducers);
            if (!host.exists(reducersPath)) {
                throw new Error("Specified reducers path " + reducersPath + " does not exist");
            }
            var text = host.read(reducersPath);
            if (text === null) {
                throw new schematics_1.SchematicsException("File " + reducersPath + " does not exist.");
            }
            var sourceText = text.toString('utf-8');
            var source = ts.createSourceFile(reducersPath, sourceText, ts.ScriptTarget.Latest, true);
            var reducerPath = "/" + options.path + "/" +
                (options.flat ? '' : stringUtils.dasherize(options.name) + '/') +
                (options.group ? 'reducers/' : '') +
                stringUtils.dasherize(options.name) +
                '.reducer';
            var relativePath = find_module_1.buildRelativePath(reducersPath, reducerPath);
            var reducerImport = route_utils_1.insertImport(source, reducersPath, "* as from" + stringUtils.classify(options.name), relativePath, true);
            var stateInterfaceInsert = addReducerToStateInterface(source, reducersPath, options);
            var reducerMapInsert = addReducerToActionReducerMap(source, reducersPath, options);
            var changes = [reducerImport, stateInterfaceInsert, reducerMapInsert];
            var recorder = host.beginUpdate(reducersPath);
            try {
                for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                    var change = changes_1_1.value;
                    if (change instanceof change_1.InsertChange) {
                        recorder.insertLeft(change.pos, change.toAdd);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (changes_1_1 && !changes_1_1.done && (_a = changes_1.return)) _a.call(changes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            host.commitUpdate(recorder);
            return host;
        };
    }
    exports.addReducerToState = addReducerToState;
    /**
     * Insert the reducer into the first defined top level interface
     */
    function addReducerToStateInterface(source, reducersPath, options) {
        var stateInterface = source.statements.find(function (stm) { return stm.kind === ts.SyntaxKind.InterfaceDeclaration; });
        var node = stateInterface;
        if (!node) {
            return new change_1.NoopChange();
        }
        var keyInsert = stringUtils.camelize(options.name) +
            ': from' +
            stringUtils.classify(options.name) +
            '.State;';
        var expr = node;
        var position;
        var toInsert;
        if (expr.members.length === 0) {
            position = expr.getEnd() - 1;
            toInsert = "  " + keyInsert + "\n";
        }
        else {
            node = expr.members[expr.members.length - 1];
            position = node.getEnd() + 1;
            // Get the indentation of the last element, if any.
            var text = node.getFullText(source);
            var matches = text.match(/^\r?\n+(\s*)/);
            if (matches.length > 0) {
                toInsert = "" + matches[1] + keyInsert + "\n";
            }
            else {
                toInsert = "\n" + keyInsert;
            }
        }
        return new change_1.InsertChange(reducersPath, position, toInsert);
    }
    exports.addReducerToStateInterface = addReducerToStateInterface;
    /**
     * Insert the reducer into the ActionReducerMap
     */
    function addReducerToActionReducerMap(source, reducersPath, options) {
        var initializer;
        var actionReducerMap = source.statements
            .filter(function (stm) { return stm.kind === ts.SyntaxKind.VariableStatement; })
            .filter(function (stm) { return !!stm.declarationList; })
            .map(function (stm) {
            var declarations = stm.declarationList.declarations;
            var variable = declarations.find(function (decl) { return decl.kind === ts.SyntaxKind.VariableDeclaration; });
            var type = variable ? variable.type : {};
            return { initializer: variable.initializer, type: type };
        })
            .find(function (_a) {
            var type = _a.type;
            return type.typeName.text === 'ActionReducerMap';
        });
        if (!actionReducerMap || !actionReducerMap.initializer) {
            return new change_1.NoopChange();
        }
        var node = actionReducerMap.initializer;
        var keyInsert = stringUtils.camelize(options.name) +
            ': from' +
            stringUtils.classify(options.name) +
            '.reducer,';
        var expr = node;
        var position;
        var toInsert;
        if (expr.properties.length === 0) {
            position = expr.getEnd() - 1;
            toInsert = "  " + keyInsert + "\n";
        }
        else {
            node = expr.properties[expr.properties.length - 1];
            position = node.getEnd() + 1;
            // Get the indentation of the last element, if any.
            var text = node.getFullText(source);
            var matches = text.match(/^\r?\n+(\s*)/);
            if (matches.length > 0) {
                toInsert = "\n" + matches[1] + keyInsert;
            }
            else {
                toInsert = "\n" + keyInsert;
            }
        }
        return new change_1.InsertChange(reducersPath, position, toInsert);
    }
    exports.addReducerToActionReducerMap = addReducerToActionReducerMap;
    /**
     * Add reducer feature to NgModule
     */
    function addReducerImportToNgModule(options) {
        return function (host) {
            var e_2, _a;
            if (!options.module) {
                return host;
            }
            var modulePath = options.module;
            if (!host.exists(options.module)) {
                throw new Error("Specified module path " + modulePath + " does not exist");
            }
            var text = host.read(modulePath);
            if (text === null) {
                throw new schematics_1.SchematicsException("File " + modulePath + " does not exist.");
            }
            var sourceText = text.toString('utf-8');
            var source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
            var commonImports = [
                route_utils_1.insertImport(source, modulePath, 'StoreModule', '@ngrx/store'),
            ];
            var reducerPath = "/" + options.path + "/" +
                (options.flat ? '' : stringUtils.dasherize(options.name) + '/') +
                (options.group ? 'reducers/' : '') +
                stringUtils.dasherize(options.name) +
                '.reducer';
            var relativePath = find_module_1.buildRelativePath(modulePath, reducerPath);
            var reducerImport = route_utils_1.insertImport(source, modulePath, "* as from" + stringUtils.classify(options.name), relativePath, true);
            var _b = __read(ast_utils_1.addImportToModule(source, modulePath, "StoreModule.forFeature('" + stringUtils.camelize(options.name) + "', from" + stringUtils.classify(options.name) + ".reducer)", relativePath), 1), storeNgModuleImport = _b[0];
            var changes = __spread(commonImports, [reducerImport, storeNgModuleImport]);
            var recorder = host.beginUpdate(modulePath);
            try {
                for (var changes_2 = __values(changes), changes_2_1 = changes_2.next(); !changes_2_1.done; changes_2_1 = changes_2.next()) {
                    var change = changes_2_1.value;
                    if (change instanceof change_1.InsertChange) {
                        recorder.insertLeft(change.pos, change.toAdd);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (changes_2_1 && !changes_2_1.done && (_a = changes_2.return)) _a.call(changes_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            host.commitUpdate(recorder);
            return host;
        };
    }
    exports.addReducerImportToNgModule = addReducerImportToNgModule;
    function omit(object, keyToRemove) {
        return Object.keys(object)
            .filter(function (key) { return key !== keyToRemove; })
            .reduce(function (result, key) {
            var _a;
            return Object.assign(result, (_a = {}, _a[key] = object[key], _a));
        }, {});
    }
    exports.omit = omit;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyeC11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS9uZ3J4LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsK0JBQWlDO0lBQ2pDLDJFQUF5QztJQUN6Qyx1RUFBNEQ7SUFDNUQseURBQTZFO0lBQzdFLDZDQUFpRDtJQUNqRCxpRkFBa0Q7SUFDbEQsaUZBQTZDO0lBQzdDLDZFQUFnRDtJQUVoRCxTQUFnQixpQkFBaUIsQ0FBQyxPQUFZO1FBQzVDLE9BQU8sVUFBQyxJQUFVOztZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtnQkFDckIsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELElBQU0sWUFBWSxHQUFHLGdCQUFTLENBQUMsTUFBSSxPQUFPLENBQUMsSUFBSSxTQUFJLE9BQU8sQ0FBQyxRQUFVLENBQUMsQ0FBQztZQUV2RSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBMkIsWUFBWSxvQkFBaUIsQ0FBQyxDQUFDO2FBQzNFO1lBRUQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNyQyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ2pCLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQyxVQUFRLFlBQVkscUJBQWtCLENBQUMsQ0FBQzthQUN2RTtZQUVELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFMUMsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUNoQyxZQUFZLEVBQ1osVUFBVSxFQUNWLEVBQUUsQ0FBQyxZQUFZLENB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LE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUMvQztpQkFDRjs7Ozs7Ozs7O1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU1QixPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7SUE3REQsZ0VBNkRDO0lBRUQsU0FBZ0IsSUFBSSxDQUNsQixNQUFTLEVBQ1QsV0FBb0I7UUFFcEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUN2QixNQUFNLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEtBQUssV0FBVyxFQUFuQixDQUFtQixDQUFDO2FBQ2xDLE1BQU0sQ0FBQyxVQUFDLE1BQU0sRUFBRSxHQUFHOztZQUFLLE9BQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLFlBQUksR0FBQyxHQUFHLElBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFHO1FBQTdDLENBQTZDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQVBELG9CQU9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgKiBhcyBzdHJpbmdVdGlscyBmcm9tICcuL3N0cmluZ3MnO1xuaW1wb3J0IHsgSW5zZXJ0Q2hhbmdlLCBDaGFuZ2UsIE5vb3BDaGFuZ2UgfSBmcm9tICcuL2NoYW5nZSc7XG5pbXBvcnQgeyBUcmVlLCBTY2hlbWF0aWNzRXhjZXB0aW9uLCBSdWxlIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHsgbm9ybWFsaXplIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgYnVpbGRSZWxhdGl2ZVBhdGggfSBmcm9tICcuL2ZpbmQtbW9kdWxlJztcbmltcG9ydCB7IGluc2VydEltcG9ydCB9IGZyb20gJy4vcm91dGUtdXRpbHMnO1xuaW1wb3J0IHsgYWRkSW1wb3J0VG9Nb2R1bGUgfSBmcm9tICcuL2FzdC11dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRSZWR1Y2VyVG9TdGF0ZShvcHRpb25zOiBhbnkpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlKSA9PiB7XG4gICAgaWYgKCFvcHRpb25zLnJlZHVjZXJzKSB7XG4gICAgICByZXR1cm4gaG9zdDtcbiAgICB9XG5cbiAgICBjb25zdCByZWR1Y2Vyc1BhdGggPSBub3JtYWxpemUoYC8ke29wdGlvbnMucGF0aH0vJHtvcHRpb25zLnJlZHVjZXJzfWApO1xuXG4gICAgaWYgKCFob3N0LmV4aXN0cyhyZWR1Y2Vyc1BhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNwZWNpZmllZCByZWR1Y2VycyBwYXRoICR7cmVkdWNlcnNQYXRofSBkb2VzIG5vdCBleGlzdGApO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPSBob3N0LnJlYWQocmVkdWNlcnNQYXRoKTtcbiAgICBpZiAodGV4dCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oYEZpbGUgJHtyZWR1Y2Vyc1BhdGh9IGRvZXMgbm90IGV4aXN0LmApO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZVRleHQgPSB0ZXh0LnRvU3RyaW5nKCd1dGYtOCcpO1xuXG4gICAgY29uc3Qgc291cmNlID0gdHMuY3JlYXRlU291cmNlRmlsZShcbiAgICAgIHJlZHVjZXJzUGF0aCxcbiAgICAgIHNvdXJjZVRleHQsXG4gICAgICB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBjb25zdCByZWR1Y2VyUGF0aCA9XG4gICAgICBgLyR7b3B0aW9ucy5wYXRofS9gICtcbiAgICAgIChvcHRpb25zLmZsYXQgPyAnJyA6IHN0cmluZ1V0aWxzLmRhc2hlcml6ZShvcHRpb25zLm5hbWUpICsgJy8nKSArXG4gICAgICAob3B0aW9ucy5ncm91cCA/ICdyZWR1Y2Vycy8nIDogJycpICtcbiAgICAgIHN0cmluZ1V0aWxzLmRhc2hlcml6ZShvcHRpb25zLm5hbWUpICtcbiAgICAgICcucmVkdWNlcic7XG5cbiAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBidWlsZFJlbGF0aXZlUGF0aChyZWR1Y2Vyc1BhdGgsIHJlZHVjZXJQYXRoKTtcbiAgICBjb25zdCByZWR1Y2VySW1wb3J0ID0gaW5zZXJ0SW1wb3J0KFxuICAgICAgc291cmNlLFxuICAgICAgcmVkdWNlcnNQYXRoLFxuICAgICAgYCogYXMgZnJvbSR7c3RyaW5nVXRpbHMuY2xhc3NpZnkob3B0aW9ucy5uYW1lKX1gLFxuICAgICAgcmVsYXRpdmVQYXRoLFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBjb25zdCBzdGF0ZUludGVyZmFjZUluc2VydCA9IGFkZFJlZHVjZXJUb1N0YXRlSW50ZXJmYWNlKFxuICAgICAgc291cmNlLFxuICAgICAgcmVkdWNlcnNQYXRoLFxuICAgICAgb3B0aW9uc1xuICAgICk7XG4gICAgY29uc3QgcmVkdWNlck1hcEluc2VydCA9IGFkZFJlZHVjZXJUb0FjdGlvblJlZHVjZXJNYXAoXG4gICAgICBzb3VyY2UsXG4gICAgICByZWR1Y2Vyc1BhdGgsXG4gICAgICBvcHRpb25zXG4gICAgKTtcblxuICAgIGNvbnN0IGNoYW5nZXMgPSBbcmVkdWNlckltcG9ydCwgc3RhdGVJbnRlcmZhY2VJbnNlcnQsIHJlZHVjZXJNYXBJbnNlcnRdO1xuICAgIGNvbnN0IHJlY29yZGVyID0gaG9zdC5iZWdpblVwZGF0ZShyZWR1Y2Vyc1BhdGgpO1xuICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbiAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbiAgICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuICAgICAgfVxuICAgIH1cbiAgICBob3N0LmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG5cbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBJbnNlcnQgdGhlIHJlZHVjZXIgaW50byB0aGUgZmlyc3QgZGVmaW5lZCB0b3AgbGV2ZWwgaW50ZXJmYWNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRSZWR1Y2VyVG9TdGF0ZUludGVyZmFjZShcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICByZWR1Y2Vyc1BhdGg6IHN0cmluZyxcbiAgb3B0aW9uczogeyBuYW1lOiBzdHJpbmcgfVxuKTogQ2hhbmdlIHtcbiAgY29uc3Qgc3RhdGVJbnRlcmZhY2UgPSBzb3VyY2Uuc3RhdGVtZW50cy5maW5kKFxuICAgIHN0bSA9PiBzdG0ua2luZCA9PT0gdHMuU3ludGF4S2luZC5JbnRlcmZhY2VEZWNsYXJhdGlvblxuICApO1xuICBsZXQgbm9kZSA9IHN0YXRlSW50ZXJmYWNlIGFzIHRzLlN0YXRlbWVudDtcblxuICBpZiAoIW5vZGUpIHtcbiAgICByZXR1cm4gbmV3IE5vb3BDaGFuZ2UoKTtcbiAgfVxuXG4gIGNvbnN0IGtleUluc2VydCA9XG4gICAgc3RyaW5nVXRpbHMuY2FtZWxpemUob3B0aW9ucy5uYW1lKSArXG4gICAgJzogZnJvbScgK1xuICAgIHN0cmluZ1V0aWxzLmNsYXNzaWZ5KG9wdGlvbnMubmFtZSkgK1xuICAgICcuU3RhdGU7JztcbiAgY29uc3QgZXhwciA9IG5vZGUgYXMgYW55O1xuICBsZXQgcG9zaXRpb247XG4gIGxldCB0b0luc2VydDtcblxuICBpZiAoZXhwci5tZW1iZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHBvc2l0aW9uID0gZXhwci5nZXRFbmQoKSAtIDE7XG4gICAgdG9JbnNlcnQgPSBgICAke2tleUluc2VydH1cXG5gO1xuICB9IGVsc2Uge1xuICAgIG5vZGUgPSBleHByLm1lbWJlcnNbZXhwci5tZW1iZXJzLmxlbmd0aCAtIDFdO1xuICAgIHBvc2l0aW9uID0gbm9kZS5nZXRFbmQoKSArIDE7XG4gICAgLy8gR2V0IHRoZSBpbmRlbnRhdGlvbiBvZiB0aGUgbGFzdCBlbGVtZW50LCBpZiBhbnkuXG4gICAgY29uc3QgdGV4dCA9IG5vZGUuZ2V0RnVsbFRleHQoc291cmNlKTtcbiAgICBjb25zdCBtYXRjaGVzID0gdGV4dC5tYXRjaCgvXlxccj9cXG4rKFxccyopLyk7XG5cbiAgICBpZiAobWF0Y2hlcyEubGVuZ3RoID4gMCkge1xuICAgICAgdG9JbnNlcnQgPSBgJHttYXRjaGVzIVsxXX0ke2tleUluc2VydH1cXG5gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b0luc2VydCA9IGBcXG4ke2tleUluc2VydH1gO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgSW5zZXJ0Q2hhbmdlKHJlZHVjZXJzUGF0aCwgcG9zaXRpb24sIHRvSW5zZXJ0KTtcbn1cblxuLyoqXG4gKiBJbnNlcnQgdGhlIHJlZHVjZXIgaW50byB0aGUgQWN0aW9uUmVkdWNlck1hcFxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkUmVkdWNlclRvQWN0aW9uUmVkdWNlck1hcChcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICByZWR1Y2Vyc1BhdGg6IHN0cmluZyxcbiAgb3B0aW9uczogeyBuYW1lOiBzdHJpbmcgfVxuKTogQ2hhbmdlIHtcbiAgbGV0IGluaXRpYWxpemVyOiBhbnk7XG4gIGNvbnN0IGFjdGlvblJlZHVjZXJNYXA6IGFueSA9IHNvdXJjZS5zdGF0ZW1lbnRzXG4gICAgLmZpbHRlcihzdG0gPT4gc3RtLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuVmFyaWFibGVTdGF0ZW1lbnQpXG4gICAgLmZpbHRlcigoc3RtOiBhbnkpID0+ICEhc3RtLmRlY2xhcmF0aW9uTGlzdClcbiAgICAubWFwKChzdG06IGFueSkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBkZWNsYXJhdGlvbnMsXG4gICAgICB9OiB7XG4gICAgICAgIGRlY2xhcmF0aW9uczogdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uTGlzdFtdO1xuICAgICAgfSA9IHN0bS5kZWNsYXJhdGlvbkxpc3Q7XG4gICAgICBjb25zdCB2YXJpYWJsZTogYW55ID0gZGVjbGFyYXRpb25zLmZpbmQoXG4gICAgICAgIChkZWNsOiBhbnkpID0+IGRlY2wua2luZCA9PT0gdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uXG4gICAgICApO1xuICAgICAgY29uc3QgdHlwZSA9IHZhcmlhYmxlID8gdmFyaWFibGUudHlwZSA6IHt9O1xuXG4gICAgICByZXR1cm4geyBpbml0aWFsaXplcjogdmFyaWFibGUuaW5pdGlhbGl6ZXIsIHR5cGUgfTtcbiAgICB9KVxuICAgIC5maW5kKCh7IHR5cGUgfSkgPT4gdHlwZS50eXBlTmFtZS50ZXh0ID09PSAnQWN0aW9uUmVkdWNlck1hcCcpO1xuXG4gIGlmICghYWN0aW9uUmVkdWNlck1hcCB8fCAhYWN0aW9uUmVkdWNlck1hcC5pbml0aWFsaXplcikge1xuICAgIHJldHVybiBuZXcgTm9vcENoYW5nZSgpO1xuICB9XG5cbiAgbGV0IG5vZGUgPSBhY3Rpb25SZWR1Y2VyTWFwLmluaXRpYWxpemVyO1xuXG4gIGNvbnN0IGtleUluc2VydCA9XG4gICAgc3RyaW5nVXRpbHMuY2FtZWxpemUob3B0aW9ucy5uYW1lKSArXG4gICAgJzogZnJvbScgK1xuICAgIHN0cmluZ1V0aWxzLmNsYXNzaWZ5KG9wdGlvbnMubmFtZSkgK1xuICAgICcucmVkdWNlciwnO1xuICBjb25zdCBleHByID0gbm9kZSBhcyBhbnk7XG4gIGxldCBwb3NpdGlvbjtcbiAgbGV0IHRvSW5zZXJ0O1xuXG4gIGlmIChleHByLnByb3BlcnRpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcG9zaXRpb24gPSBleHByLmdldEVuZCgpIC0gMTtcbiAgICB0b0luc2VydCA9IGAgICR7a2V5SW5zZXJ0fVxcbmA7XG4gIH0gZWxzZSB7XG4gICAgbm9kZSA9IGV4cHIucHJvcGVydGllc1tleHByLnByb3BlcnRpZXMubGVuZ3RoIC0gMV07XG4gICAgcG9zaXRpb24gPSBub2RlLmdldEVuZCgpICsgMTtcbiAgICAvLyBHZXQgdGhlIGluZGVudGF0aW9uIG9mIHRoZSBsYXN0IGVsZW1lbnQsIGlmIGFueS5cbiAgICBjb25zdCB0ZXh0ID0gbm9kZS5nZXRGdWxsVGV4dChzb3VyY2UpO1xuICAgIGNvbnN0IG1hdGNoZXMgPSB0ZXh0Lm1hdGNoKC9eXFxyP1xcbisoXFxzKikvKTtcblxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRvSW5zZXJ0ID0gYFxcbiR7bWF0Y2hlcyFbMV19JHtrZXlJbnNlcnR9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9JbnNlcnQgPSBgXFxuJHtrZXlJbnNlcnR9YDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IEluc2VydENoYW5nZShyZWR1Y2Vyc1BhdGgsIHBvc2l0aW9uLCB0b0luc2VydCk7XG59XG5cbi8qKlxuICogQWRkIHJlZHVjZXIgZmVhdHVyZSB0byBOZ01vZHVsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkUmVkdWNlckltcG9ydFRvTmdNb2R1bGUob3B0aW9uczogYW55KTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIGlmICghb3B0aW9ucy5tb2R1bGUpIHtcbiAgICAgIHJldHVybiBob3N0O1xuICAgIH1cblxuICAgIGNvbnN0IG1vZHVsZVBhdGggPSBvcHRpb25zLm1vZHVsZTtcbiAgICBpZiAoIWhvc3QuZXhpc3RzKG9wdGlvbnMubW9kdWxlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTcGVjaWZpZWQgbW9kdWxlIHBhdGggJHttb2R1bGVQYXRofSBkb2VzIG5vdCBleGlzdGApO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPSBob3N0LnJlYWQobW9kdWxlUGF0aCk7XG4gICAgaWYgKHRleHQgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKGBGaWxlICR7bW9kdWxlUGF0aH0gZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgfVxuICAgIGNvbnN0IHNvdXJjZVRleHQgPSB0ZXh0LnRvU3RyaW5nKCd1dGYtOCcpO1xuXG4gICAgY29uc3Qgc291cmNlID0gdHMuY3JlYXRlU291cmNlRmlsZShcbiAgICAgIG1vZHVsZVBhdGgsXG4gICAgICBzb3VyY2VUZXh0LFxuICAgICAgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgY29uc3QgY29tbW9uSW1wb3J0cyA9IFtcbiAgICAgIGluc2VydEltcG9ydChzb3VyY2UsIG1vZHVsZVBhdGgsICdTdG9yZU1vZHVsZScsICdAbmdyeC9zdG9yZScpLFxuICAgIF07XG5cbiAgICBjb25zdCByZWR1Y2VyUGF0aCA9XG4gICAgICBgLyR7b3B0aW9ucy5wYXRofS9gICtcbiAgICAgIChvcHRpb25zLmZsYXQgPyAnJyA6IHN0cmluZ1V0aWxzLmRhc2hlcml6ZShvcHRpb25zLm5hbWUpICsgJy8nKSArXG4gICAgICAob3B0aW9ucy5ncm91cCA/ICdyZWR1Y2Vycy8nIDogJycpICtcbiAgICAgIHN0cmluZ1V0aWxzLmRhc2hlcml6ZShvcHRpb25zLm5hbWUpICtcbiAgICAgICcucmVkdWNlcic7XG4gICAgY29uc3QgcmVsYXRpdmVQYXRoID0gYnVpbGRSZWxhdGl2ZVBhdGgobW9kdWxlUGF0aCwgcmVkdWNlclBhdGgpO1xuICAgIGNvbnN0IHJlZHVjZXJJbXBvcnQgPSBpbnNlcnRJbXBvcnQoXG4gICAgICBzb3VyY2UsXG4gICAgICBtb2R1bGVQYXRoLFxuICAgICAgYCogYXMgZnJvbSR7c3RyaW5nVXRpbHMuY2xhc3NpZnkob3B0aW9ucy5uYW1lKX1gLFxuICAgICAgcmVsYXRpdmVQYXRoLFxuICAgICAgdHJ1ZVxuICAgICk7XG4gICAgY29uc3QgW3N0b3JlTmdNb2R1bGVJbXBvcnRdID0gYWRkSW1wb3J0VG9Nb2R1bGUoXG4gICAgICBzb3VyY2UsXG4gICAgICBtb2R1bGVQYXRoLFxuICAgICAgYFN0b3JlTW9kdWxlLmZvckZlYXR1cmUoJyR7c3RyaW5nVXRpbHMuY2FtZWxpemUoXG4gICAgICAgIG9wdGlvbnMubmFtZVxuICAgICAgKX0nLCBmcm9tJHtzdHJpbmdVdGlscy5jbGFzc2lmeShvcHRpb25zLm5hbWUpfS5yZWR1Y2VyKWAsXG4gICAgICByZWxhdGl2ZVBhdGhcbiAgICApO1xuICAgIGNvbnN0IGNoYW5nZXMgPSBbLi4uY29tbW9uSW1wb3J0cywgcmVkdWNlckltcG9ydCwgc3RvcmVOZ01vZHVsZUltcG9ydF07XG4gICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKG1vZHVsZVBhdGgpO1xuICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbiAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbiAgICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuICAgICAgfVxuICAgIH1cbiAgICBob3N0LmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG5cbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9taXQ8VCBleHRlbmRzIHsgW2tleTogc3RyaW5nXTogYW55IH0+KFxuICBvYmplY3Q6IFQsXG4gIGtleVRvUmVtb3ZlOiBrZXlvZiBUXG4pOiBQYXJ0aWFsPFQ+IHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iamVjdClcbiAgICAuZmlsdGVyKGtleSA9PiBrZXkgIT09IGtleVRvUmVtb3ZlKVxuICAgIC5yZWR1Y2UoKHJlc3VsdCwga2V5KSA9PiBPYmplY3QuYXNzaWduKHJlc3VsdCwgeyBba2V5XTogb2JqZWN0W2tleV0gfSksIHt9KTtcbn1cbiJdfQ==