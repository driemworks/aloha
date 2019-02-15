var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics/ng-add/index", ["require", "exports", "@angular-devkit/schematics", "@angular-devkit/schematics/tasks", "@ngrx/store/schematics-core", "@angular-devkit/core", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    var tasks_1 = require("@angular-devkit/schematics/tasks");
    var schematics_core_1 = require("@ngrx/store/schematics-core");
    var core_1 = require("@angular-devkit/core");
    var ts = require("typescript");
    function addImportToNgModule(options) {
        return function (host) {
            var e_1, _a;
            var modulePath = options.module;
            if (!modulePath) {
                return host;
            }
            if (!host.exists(modulePath)) {
                throw new Error('Specified module does not exist');
            }
            var text = host.read(modulePath);
            if (text === null) {
                throw new schematics_1.SchematicsException("File " + modulePath + " does not exist.");
            }
            var sourceText = text.toString('utf-8');
            var source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
            var statePath = "/" + options.path + "/" + options.statePath;
            var relativePath = schematics_core_1.buildRelativePath(modulePath, statePath);
            var _b = __read(schematics_core_1.addImportToModule(source, modulePath, 'StoreModule.forRoot(reducers, { metaReducers })', relativePath), 1), storeNgModuleImport = _b[0];
            var changes = [
                schematics_core_1.insertImport(source, modulePath, 'StoreModule', '@ngrx/store'),
                schematics_core_1.insertImport(source, modulePath, 'reducers, metaReducers', relativePath),
                storeNgModuleImport,
            ];
            var recorder = host.beginUpdate(modulePath);
            try {
                for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                    var change = changes_1_1.value;
                    if (change instanceof schematics_core_1.InsertChange) {
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
    function addNgRxStoreToPackageJson() {
        return function (host, context) {
            schematics_core_1.addPackageToPackageJson(host, 'dependencies', '@ngrx/store', schematics_core_1.platformVersion);
            context.addTask(new tasks_1.NodePackageInstallTask());
            return host;
        };
    }
    function default_1(options) {
        return function (host, context) {
            options.path = schematics_core_1.getProjectPath(host, options);
            var parsedPath = schematics_core_1.parseName(options.path, '');
            options.path = parsedPath.path;
            var statePath = "/" + options.path + "/" + options.statePath + "/index.ts";
            var srcPath = core_1.dirname(options.path);
            var environmentsPath = schematics_core_1.buildRelativePath(statePath, "/" + srcPath + "/environments/environment");
            if (options.module) {
                options.module = schematics_core_1.findModuleFromOptions(host, {
                    name: '',
                    module: options.module,
                    path: options.path,
                });
            }
            if (options.stateInterface && options.stateInterface !== 'State') {
                options.stateInterface = schematics_core_1.stringUtils.classify(options.stateInterface);
            }
            var templateSource = schematics_1.apply(schematics_1.url('./files'), [
                schematics_1.template(__assign({}, schematics_core_1.stringUtils, options, { environmentsPath: environmentsPath })),
                schematics_1.move(parsedPath.path),
            ]);
            return schematics_1.chain([
                schematics_1.branchAndMerge(schematics_1.chain([addImportToNgModule(options), schematics_1.mergeWith(templateSource)])),
                options && options.skipPackageJson ? schematics_1.noop() : addNgRxStoreToPackageJson(),
            ])(host, context);
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NjaGVtYXRpY3MvbmctYWRkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLHlEQWFvQztJQUNwQywwREFBMEU7SUFDMUUsK0RBV3FDO0lBQ3JDLDZDQUFxRDtJQUNyRCwrQkFBaUM7SUFHakMsU0FBUyxtQkFBbUIsQ0FBQyxPQUF5QjtRQUNwRCxPQUFPLFVBQUMsSUFBVTs7WUFDaEIsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUVsQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNmLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2FBQ3BEO1lBRUQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ2pCLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQyxVQUFRLFVBQVUscUJBQWtCLENBQUMsQ0FBQzthQUNyRTtZQUNELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFMUMsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUNoQyxVQUFVLEVBQ1YsVUFBVSxFQUNWLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUN0QixJQUFJLENBQ0wsQ0FBQztZQUVGLElBQU0sU0FBUyxHQUFHLE1BQUksT0FBTyxDQUFDLElBQUksU0FBSSxPQUFPLENBQUMsU0FBVyxDQUFDO1lBQzFELElBQU0sWUFBWSxHQUFH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QVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQ2pFO2dCQUNELE9BQU8sSUFBSSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxpQkFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixFQUFFO2FBQzFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQTFDRCw0QkEwQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxuICBUcmVlLFxuICBhcHBseSxcbiAgYnJhbmNoQW5kTWVyZ2UsXG4gIGNoYWluLFxuICBtZXJnZVdpdGgsXG4gIHRlbXBsYXRlLFxuICB1cmwsXG4gIG5vb3AsXG4gIG1vdmUsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7IE5vZGVQYWNrYWdlSW5zdGFsbFRhc2sgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcy90YXNrcyc7XG5pbXBvcnQge1xuICBJbnNlcnRDaGFuZ2UsXG4gIGFkZEltcG9ydFRvTW9kdWxlLFxuICBidWlsZFJlbGF0aXZlUGF0aCxcbiAgZmluZE1vZHVsZUZyb21PcHRpb25zLFxuICBnZXRQcm9qZWN0UGF0aCxcbiAgaW5zZXJ0SW1wb3J0LFxuICBzdHJpbmdVdGlscyxcbiAgYWRkUGFja2FnZVRvUGFja2FnZUpzb24sXG4gIHBsYXRmb3JtVmVyc2lvbixcbiAgcGFyc2VOYW1lLFxufSBmcm9tICdAbmdyeC9zdG9yZS9zY2hlbWF0aWNzLWNvcmUnO1xuaW1wb3J0IHsgUGF0aCwgZGlybmFtZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgU2NoZW1hIGFzIFJvb3RTdG9yZU9wdGlvbnMgfSBmcm9tICcuL3NjaGVtYSc7XG5cbmZ1bmN0aW9uIGFkZEltcG9ydFRvTmdNb2R1bGUob3B0aW9uczogUm9vdFN0b3JlT3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbiAgICBjb25zdCBtb2R1bGVQYXRoID0gb3B0aW9ucy5tb2R1bGU7XG5cbiAgICBpZiAoIW1vZHVsZVBhdGgpIHtcbiAgICAgIHJldHVybiBob3N0O1xuICAgIH1cblxuICAgIGlmICghaG9zdC5leGlzdHMobW9kdWxlUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3BlY2lmaWVkIG1vZHVsZSBkb2VzIG5vdCBleGlzdCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPSBob3N0LnJlYWQobW9kdWxlUGF0aCk7XG4gICAgaWYgKHRleHQgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKGBGaWxlICR7bW9kdWxlUGF0aH0gZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgfVxuICAgIGNvbnN0IHNvdXJjZVRleHQgPSB0ZXh0LnRvU3RyaW5nKCd1dGYtOCcpO1xuXG4gICAgY29uc3Qgc291cmNlID0gdHMuY3JlYXRlU291cmNlRmlsZShcbiAgICAgIG1vZHVsZVBhdGgsXG4gICAgICBzb3VyY2VUZXh0LFxuICAgICAgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgY29uc3Qgc3RhdGVQYXRoID0gYC8ke29wdGlvbnMucGF0aH0vJHtvcHRpb25zLnN0YXRlUGF0aH1gO1xuICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKG1vZHVsZVBhdGgsIHN0YXRlUGF0aCk7XG4gICAgY29uc3QgW3N0b3JlTmdNb2R1bGVJbXBvcnRdID0gYWRkSW1wb3J0VG9Nb2R1bGUoXG4gICAgICBzb3VyY2UsXG4gICAgICBtb2R1bGVQYXRoLFxuICAgICAgJ1N0b3JlTW9kdWxlLmZvclJvb3QocmVkdWNlcnMsIHsgbWV0YVJlZHVjZXJzIH0pJyxcbiAgICAgIHJlbGF0aXZlUGF0aFxuICAgICk7XG5cbiAgICBjb25zdCBjaGFuZ2VzID0gW1xuICAgICAgaW5zZXJ0SW1wb3J0KHNvdXJjZSwgbW9kdWxlUGF0aCwgJ1N0b3JlTW9kdWxlJywgJ0BuZ3J4L3N0b3JlJyksXG4gICAgICBpbnNlcnRJbXBvcnQoc291cmNlLCBtb2R1bGVQYXRoLCAncmVkdWNlcnMsIG1ldGFSZWR1Y2VycycsIHJlbGF0aXZlUGF0aCksXG4gICAgICBzdG9yZU5nTW9kdWxlSW1wb3J0LFxuICAgIF07XG4gICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKG1vZHVsZVBhdGgpO1xuXG4gICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xuICAgICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydENoYW5nZSkge1xuICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS50b0FkZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGhvc3QuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5mdW5jdGlvbiBhZGROZ1J4U3RvcmVUb1BhY2thZ2VKc29uKCkge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBhZGRQYWNrYWdlVG9QYWNrYWdlSnNvbihcbiAgICAgIGhvc3QsXG4gICAgICAnZGVwZW5kZW5jaWVzJyxcbiAgICAgICdAbmdyeC9zdG9yZScsXG4gICAgICBwbGF0Zm9ybVZlcnNpb25cbiAgICApO1xuICAgIGNvbnRleHQuYWRkVGFzayhuZXcgTm9kZVBhY2thZ2VJbnN0YWxsVGFzaygpKTtcbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uczogUm9vdFN0b3JlT3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBvcHRpb25zLnBhdGggPSBnZXRQcm9qZWN0UGF0aChob3N0LCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHBhcnNlZFBhdGggPSBwYXJzZU5hbWUob3B0aW9ucy5wYXRoLCAnJyk7XG4gICAgb3B0aW9ucy5wYXRoID0gcGFyc2VkUGF0aC5wYXRoO1xuXG4gICAgY29uc3Qgc3RhdGVQYXRoID0gYC8ke29wdGlvbnMucGF0aH0vJHtvcHRpb25zLnN0YXRlUGF0aH0vaW5kZXgudHNgO1xuICAgIGNvbnN0IHNyY1BhdGggPSBkaXJuYW1lKG9wdGlvbnMucGF0aCBhcyBQYXRoKTtcbiAgICBjb25zdCBlbnZpcm9ubWVudHNQYXRoID0gYnVpbGRSZWxhdGl2ZVBhdGgoXG4gICAgICBzdGF0ZVBhdGgsXG4gICAgICBgLyR7c3JjUGF0aH0vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50YFxuICAgICk7XG5cbiAgICBpZiAob3B0aW9ucy5tb2R1bGUpIHtcbiAgICAgIG9wdGlvbnMubW9kdWxlID0gZmluZE1vZHVsZUZyb21PcHRpb25zKGhvc3QsIHtcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIG1vZHVsZTogb3B0aW9ucy5tb2R1bGUsXG4gICAgICAgIHBhdGg6IG9wdGlvbnMucGF0aCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnN0YXRlSW50ZXJmYWNlICYmIG9wdGlvbnMuc3RhdGVJbnRlcmZhY2UgIT09ICdTdGF0ZScpIHtcbiAgICAgIG9wdGlvbnMuc3RhdGVJbnRlcmZhY2UgPSBzdHJpbmdVdGlscy5jbGFzc2lmeShvcHRpb25zLnN0YXRlSW50ZXJmYWNlKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZW1wbGF0ZVNvdXJjZSA9IGFwcGx5KHVybCgnLi9maWxlcycpLCBbXG4gICAgICB0ZW1wbGF0ZSh7XG4gICAgICAgIC4uLnN0cmluZ1V0aWxzLFxuICAgICAgICAuLi4ob3B0aW9ucyBhcyBvYmplY3QpLFxuICAgICAgICBlbnZpcm9ubWVudHNQYXRoLFxuICAgICAgfSBhcyBhbnkpLFxuICAgICAgbW92ZShwYXJzZWRQYXRoLnBhdGgpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIGNoYWluKFtcbiAgICAgIGJyYW5jaEFuZE1lcmdlKFxuICAgICAgICBjaGFpbihbYWRkSW1wb3J0VG9OZ01vZHVsZShvcHRpb25zKSwgbWVyZ2VXaXRoKHRlbXBsYXRlU291cmNlKV0pXG4gICAgICApLFxuICAgICAgb3B0aW9ucyAmJiBvcHRpb25zLnNraXBQYWNrYWdlSnNvbiA/IG5vb3AoKSA6IGFkZE5nUnhTdG9yZVRvUGFja2FnZUpzb24oKSxcbiAgICBdKShob3N0LCBjb250ZXh0KTtcbiAgfTtcbn1cbiJdfQ==