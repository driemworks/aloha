/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { identifierName } from '../compile_metadata';
import { mapLiteral } from '../output/map_util';
import * as o from '../output/output_ast';
import { compileFactoryFunction } from './r3_factory';
import { Identifiers as R3 } from './r3_identifiers';
import { convertMetaToOutput, mapToMapExpression } from './util';
/**
 * Construct an `R3NgModuleDef` for the given `R3NgModuleMetadata`.
 */
export function compileNgModule(meta) {
    const { type: moduleType, bootstrap, declarations, imports, exports } = meta;
    const expression = o.importExpr(R3.defineNgModule).callFn([mapToMapExpression({
            type: moduleType,
            bootstrap: o.literalArr(bootstrap.map(ref => ref.value)),
            declarations: o.literalArr(declarations.map(ref => ref.value)),
            imports: o.literalArr(imports.map(ref => ref.value)),
            exports: o.literalArr(exports.map(ref => ref.value)),
        })]);
    const type = new o.ExpressionType(o.importExpr(R3.NgModuleDefWithMeta, [
        new o.ExpressionType(moduleType), tupleTypeOf(declarations), tupleTypeOf(imports),
        tupleTypeOf(exports)
    ]));
    const additionalStatements = [];
    return { expression, type, additionalStatements };
}
export function compileInjector(meta) {
    const result = compileFactoryFunction({
        name: meta.name,
        type: meta.type,
        deps: meta.deps,
        injectFn: R3.inject,
        extraStatementFn: null,
    });
    const expression = o.importExpr(R3.defineInjector).callFn([mapToMapExpression({
            factory: result.factory,
            providers: meta.providers,
            imports: meta.imports,
        })]);
    const type = new o.ExpressionType(o.importExpr(R3.InjectorDef, [new o.ExpressionType(meta.type)]));
    return { expression, type, statements: result.statements };
}
// TODO(alxhub): integrate this with `compileNgModule`. Currently the two are separate operations.
export function compileNgModuleFromRender2(ctx, ngModule, injectableCompiler) {
    const className = identifierName(ngModule.type);
    const rawImports = ngModule.rawImports ? [ngModule.rawImports] : [];
    const rawExports = ngModule.rawExports ? [ngModule.rawExports] : [];
    const injectorDefArg = mapLiteral({
        'factory': injectableCompiler.factoryFor({ type: ngModule.type, symbol: ngModule.type.reference }, ctx),
        'providers': convertMetaToOutput(ngModule.rawProviders, ctx),
        'imports': convertMetaToOutput([...rawImports, ...rawExports], ctx),
    });
    const injectorDef = o.importExpr(R3.defineInjector).callFn([injectorDefArg]);
    ctx.statements.push(new o.ClassStmt(
    /* name */ className, 
    /* parent */ null, 
    /* fields */ [new o.ClassField(
        /* name */ 'ngInjectorDef', 
        /* type */ o.INFERRED_TYPE, 
        /* modifiers */ [o.StmtModifier.Static], 
        /* initializer */ injectorDef)], 
    /* getters */ [], 
    /* constructorMethod */ new o.ClassMethod(null, [], []), 
    /* methods */ []));
}
function accessExportScope(module) {
    const selectorScope = new o.ReadPropExpr(module, 'ngModuleDef');
    return new o.ReadPropExpr(selectorScope, 'exported');
}
function tupleTypeOf(exp) {
    const types = exp.map(ref => o.typeofExpr(ref.type));
    return exp.length > 0 ? o.expressionType(o.literalArr(types)) : o.NONE_TYPE;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfbW9kdWxlX2NvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLyIsInNvdXJjZXMiOlsicGFja2FnZXMvY29tcGlsZXIvc3JjL3JlbmRlcjMvcjNfbW9kdWxlX2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBK0IsY0FBYyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFakYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sS0FBSyxDQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFHMUMsT0FBTyxFQUF1QixzQkFBc0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMxRSxPQUFPLEVBQUMsV0FBVyxJQUFJLEVBQUUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ25ELE9BQU8sRUFBYyxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQTZDNUU7O0dBRUc7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUFDLElBQXdCO0lBQ3RELE1BQU0sRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBQyxHQUFHLElBQUksQ0FBQztJQUMzRSxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztZQUM1RSxJQUFJLEVBQUUsVUFBVTtZQUNoQixTQUFTLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hELFlBQVksRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFD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QUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQzlFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcGlsZVNoYWxsb3dNb2R1bGVNZXRhZGF0YSwgaWRlbnRpZmllck5hbWV9IGZyb20gJy4uL2NvbXBpbGVfbWV0YWRhdGEnO1xuaW1wb3J0IHtJbmplY3RhYmxlQ29tcGlsZXJ9IGZyb20gJy4uL2luamVjdGFibGVfY29tcGlsZXInO1xuaW1wb3J0IHttYXBMaXRlcmFsfSBmcm9tICcuLi9vdXRwdXQvbWFwX3V0aWwnO1xuaW1wb3J0ICogYXMgbyBmcm9tICcuLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge091dHB1dENvbnRleHR9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQge1IzRGVwZW5kZW5jeU1ldGFkYXRhLCBjb21waWxlRmFjdG9yeUZ1bmN0aW9ufSBmcm9tICcuL3IzX2ZhY3RvcnknO1xuaW1wb3J0IHtJZGVudGlmaWVycyBhcyBSM30gZnJvbSAnLi9yM19pZGVudGlmaWVycyc7XG5pbXBvcnQge1IzUmVmZXJlbmNlLCBjb252ZXJ0TWV0YVRvT3V0cHV0LCBtYXBUb01hcEV4cHJlc3Npb259IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNOZ01vZHVsZURlZiB7XG4gIGV4cHJlc3Npb246IG8uRXhwcmVzc2lvbjtcbiAgdHlwZTogby5UeXBlO1xuICBhZGRpdGlvbmFsU3RhdGVtZW50czogby5TdGF0ZW1lbnRbXTtcbn1cblxuLyoqXG4gKiBNZXRhZGF0YSByZXF1aXJlZCBieSB0aGUgbW9kdWxlIGNvbXBpbGVyIHRvIGdlbmVyYXRlIGEgYG5nTW9kdWxlRGVmYCBmb3IgYSB0eXBlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFIzTmdNb2R1bGVNZXRhZGF0YSB7XG4gIC8qKlxuICAgKiBBbiBleHByZXNzaW9uIHJlcHJlc2VudGluZyB0aGUgbW9kdWxlIHR5cGUgYmVpbmcgY29tcGlsZWQuXG4gICAqL1xuICB0eXBlOiBvLkV4cHJlc3Npb247XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGV4cHJlc3Npb25zIHJlcHJlc2VudGluZyB0aGUgYm9vdHN0cmFwIGNvbXBvbmVudHMgc3BlY2lmaWVkIGJ5IHRoZSBtb2R1bGUuXG4gICAqL1xuICBib290c3RyYXA6IFIzUmVmZXJlbmNlW107XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGV4cHJlc3Npb25zIHJlcHJlc2VudGluZyB0aGUgZGlyZWN0aXZlcyBhbmQgcGlwZXMgZGVjbGFyZWQgYnkgdGhlIG1vZHVsZS5cbiAgICovXG4gIGRlY2xhcmF0aW9uczogUjNSZWZlcmVuY2VbXTtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZXhwcmVzc2lvbnMgcmVwcmVzZW50aW5nIHRoZSBpbXBvcnRzIG9mIHRoZSBtb2R1bGUuXG4gICAqL1xuICBpbXBvcnRzOiBSM1JlZmVyZW5jZVtdO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBleHByZXNzaW9ucyByZXByZXNlbnRpbmcgdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZS5cbiAgICovXG4gIGV4cG9ydHM6IFIzUmVmZXJlbmNlW107XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gZW1pdCB0aGUgc2VsZWN0b3Igc2NvcGUgdmFsdWVzIChkZWNsYXJhdGlvbnMsIGltcG9ydHMsIGV4cG9ydHMpIGlubGluZSBpbnRvIHRoZVxuICAgKiBtb2R1bGUgZGVmaW5pdGlvbiwgb3IgdG8gZ2VuZXJhdGUgYWRkaXRpb25hbCBzdGF0ZW1lbnRzIHdoaWNoIHBhdGNoIHRoZW0gb24uIElubGluZSBlbWlzc2lvblxuICAgKiBkb2VzIG5vdCBhbGxvdyBjb21wb25lbnRzIHRvIGJlIHRyZWUtc2hha2VuLCBidXQgaXMgdXNlZnVsIGZvciBKSVQgbW9kZS5cbiAgICovXG4gIGVtaXRJbmxpbmU6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQ29uc3RydWN0IGFuIGBSM05nTW9kdWxlRGVmYCBmb3IgdGhlIGdpdmVuIGBSM05nTW9kdWxlTWV0YWRhdGFgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZU5nTW9kdWxlKG1ldGE6IFIzTmdNb2R1bGVNZXRhZGF0YSk6IFIzTmdNb2R1bGVEZWYge1xuICBjb25zdCB7dHlwZTogbW9kdWxlVHlwZSwgYm9vdHN0cmFwLCBkZWNsYXJhdGlvbnMsIGltcG9ydHMsIGV4cG9ydHN9ID0gbWV0YTtcbiAgY29uc3QgZXhwcmVzc2lvbiA9IG8uaW1wb3J0RXhwcihSMy5kZWZpbmVOZ01vZHVsZSkuY2FsbEZuKFttYXBUb01hcEV4cHJlc3Npb24oe1xuICAgIHR5cGU6IG1vZHVsZVR5cGUsXG4gICAgYm9vdHN0cmFwOiBvLmxpdGVyYWxBcnIoYm9vdHN0cmFwLm1hcChyZWYgPT4gcmVmLnZhbHVlKSksXG4gICAgZGVjbGFyYXRpb25zOiBvLmxpdGVyYWxBcnIoZGVjbGFyYXRpb25zLm1hcChyZWYgPT4gcmVmLnZhbHVlKSksXG4gICAgaW1wb3J0czogby5saXRlcmFsQXJyKGltcG9ydHMubWFwKHJlZiA9PiByZWYudmFsdWUpKSxcbiAgICBleHBvcnRzOiBvLmxpdGVyYWxBcnIoZXhwb3J0cy5tYXAocmVmID0+IHJlZi52YWx1ZSkpLFxuICB9KV0pO1xuXG4gIGNvbnN0IHR5cGUgPSBuZXcgby5FeHByZXNzaW9uVHlwZShvLmltcG9ydEV4cHIoUjMuTmdNb2R1bGVEZWZXaXRoTWV0YSwgW1xuICAgIG5ldyBvLkV4cHJlc3Npb25UeXBlKG1vZHVsZVR5cGUpLCB0dXBsZVR5cGVPZihkZWNsYXJhdGlvbnMpLCB0dXBsZVR5cGVPZihpbXBvcnRzKSxcbiAgICB0dXBsZVR5cGVPZihleHBvcnRzKVxuICBdKSk7XG5cbiAgY29uc3QgYWRkaXRpb25hbFN0YXRlbWVudHM6IG8uU3RhdGVtZW50W10gPSBbXTtcbiAgcmV0dXJuIHtleHByZXNzaW9uLCB0eXBlLCBhZGRpdGlvbmFsU3RhdGVtZW50c307XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNJbmplY3RvckRlZiB7XG4gIGV4cHJlc3Npb246IG8uRXhwcmVzc2lvbjtcbiAgdHlwZTogby5UeXBlO1xuICBzdGF0ZW1lbnRzOiBvLlN0YXRlbWVudFtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzSW5qZWN0b3JNZXRhZGF0YSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZTogby5FeHByZXNzaW9uO1xuICBkZXBzOiBSM0RlcGVuZGVuY3lNZXRhZGF0YVtdfG51bGw7XG4gIHByb3ZpZGVyczogby5FeHByZXNzaW9uO1xuICBpbXBvcnRzOiBvLkV4cHJlc3Npb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlSW5qZWN0b3IobWV0YTogUjNJbmplY3Rvck1ldGFkYXRhKTogUjNJbmplY3RvckRlZiB7XG4gIGNvbnN0IHJlc3VsdCA9IGNvbXBpbGVGYWN0b3J5RnVuY3Rpb24oe1xuICAgIG5hbWU6IG1ldGEubmFtZSxcbiAgICB0eXBlOiBtZXRhLnR5cGUsXG4gICAgZGVwczogbWV0YS5kZXBzLFxuICAgIGluamVjdEZuOiBSMy5pbmplY3QsXG4gICAgZXh0cmFTdGF0ZW1lbnRGbjogbnVsbCxcbiAgfSk7XG4gIGNvbnN0IGV4cHJlc3Npb24gPSBvLmltcG9ydEV4cHIoUjMuZGVmaW5lSW5qZWN0b3IpLmNhbGxGbihbbWFwVG9NYXBFeHByZXNzaW9uKHtcbiAgICBmYWN0b3J5OiByZXN1bHQuZmFjdG9yeSxcbiAgICBwcm92aWRlcnM6IG1ldGEucHJvdmlkZXJzLFxuICAgIGltcG9ydHM6IG1ldGEuaW1wb3J0cyxcbiAgfSldKTtcbiAgY29uc3QgdHlwZSA9XG4gICAgICBuZXcgby5FeHByZXNzaW9uVHlwZShvLmltcG9ydEV4cHIoUjMuSW5qZWN0b3JEZWYsIFtuZXcgby5FeHByZXNzaW9uVHlwZShtZXRhLnR5cGUpXSkpO1xuICByZXR1cm4ge2V4cHJlc3Npb24sIHR5cGUsIHN0YXRlbWVudHM6IHJlc3VsdC5zdGF0ZW1lbnRzfTtcbn1cblxuLy8gVE9ETyhhbHhodWIpOiBpbnRlZ3JhdGUgdGhpcyB3aXRoIGBjb21waWxlTmdNb2R1bGVgLiBDdXJyZW50bHkgdGhlIHR3byBhcmUgc2VwYXJhdGUgb3BlcmF0aW9ucy5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlTmdNb2R1bGVGcm9tUmVuZGVyMihcbiAgICBjdHg6IE91dHB1dENvbnRleHQsIG5nTW9kdWxlOiBDb21waWxlU2hhbGxvd01vZHVsZU1ldGFkYXRhLFxuICAgIGluamVjdGFibGVDb21waWxlcjogSW5qZWN0YWJsZUNvbXBpbGVyKTogdm9pZCB7XG4gIGNvbnN0IGNsYXNzTmFtZSA9IGlkZW50aWZpZXJOYW1lKG5nTW9kdWxlLnR5cGUpICE7XG5cbiAgY29uc3QgcmF3SW1wb3J0cyA9IG5nTW9kdWxlLnJhd0ltcG9ydHMgPyBbbmdNb2R1bGUucmF3SW1wb3J0c10gOiBbXTtcbiAgY29uc3QgcmF3RXhwb3J0cyA9IG5nTW9kdWxlLnJhd0V4cG9ydHMgPyBbbmdNb2R1bGUucmF3RXhwb3J0c10gOiBbXTtcblxuICBjb25zdCBpbmplY3RvckRlZkFyZyA9IG1hcExpdGVyYWwoe1xuICAgICdmYWN0b3J5JzpcbiAgICAgICAgaW5qZWN0YWJsZUNvbXBpbGVyLmZhY3RvcnlGb3Ioe3R5cGU6IG5nTW9kdWxlLnR5cGUsIHN5bWJvbDogbmdNb2R1bGUudHlwZS5yZWZlcmVuY2V9LCBjdHgpLFxuICAgICdwcm92aWRlcnMnOiBjb252ZXJ0TWV0YVRvT3V0cHV0KG5nTW9kdWxlLnJhd1Byb3ZpZGVycywgY3R4KSxcbiAgICAnaW1wb3J0cyc6IGNvbnZlcnRNZXRhVG9PdXRwdXQoWy4uLnJhd0ltcG9ydHMsIC4uLnJhd0V4cG9ydHNdLCBjdHgpLFxuICB9KTtcblxuICBjb25zdCBpbmplY3RvckRlZiA9IG8uaW1wb3J0RXhwcihSMy5kZWZpbmVJbmplY3RvcikuY2FsbEZuKFtpbmplY3RvckRlZkFyZ10pO1xuXG4gIGN0eC5zdGF0ZW1lbnRzLnB1c2gobmV3IG8uQ2xhc3NTdG10KFxuICAgICAgLyogbmFtZSAqLyBjbGFzc05hbWUsXG4gICAgICAvKiBwYXJlbnQgKi8gbnVsbCxcbiAgICAgIC8qIGZpZWxkcyAqL1tuZXcgby5DbGFzc0ZpZWxkKFxuICAgICAgICAgIC8qIG5hbWUgKi8gJ25nSW5qZWN0b3JEZWYnLFxuICAgICAgICAgIC8qIHR5cGUgKi8gby5JTkZFUlJFRF9UWVBFLFxuICAgICAgICAgIC8qIG1vZGlmaWVycyAqL1tvLlN0bXRNb2RpZmllci5TdGF0aWNdLFxuICAgICAgICAgIC8qIGluaXRpYWxpemVyICovIGluamVjdG9yRGVmLCApXSxcbiAgICAgIC8qIGdldHRlcnMgKi9bXSxcbiAgICAgIC8qIGNvbnN0cnVjdG9yTWV0aG9kICovIG5ldyBvLkNsYXNzTWV0aG9kKG51bGwsIFtdLCBbXSksXG4gICAgICAvKiBtZXRob2RzICovW10pKTtcbn1cblxuZnVuY3Rpb24gYWNjZXNzRXhwb3J0U2NvcGUobW9kdWxlOiBvLkV4cHJlc3Npb24pOiBvLkV4cHJlc3Npb24ge1xuICBjb25zdCBzZWxlY3RvclNjb3BlID0gbmV3IG8uUmVhZFByb3BFeHByKG1vZHVsZSwgJ25nTW9kdWxlRGVmJyk7XG4gIHJldHVybiBuZXcgby5SZWFkUHJvcEV4cHIoc2VsZWN0b3JTY29wZSwgJ2V4cG9ydGVkJyk7XG59XG5cbmZ1bmN0aW9uIHR1cGxlVHlwZU9mKGV4cDogUjNSZWZlcmVuY2VbXSk6IG8uVHlwZSB7XG4gIGNvbnN0IHR5cGVzID0gZXhwLm1hcChyZWYgPT4gby50eXBlb2ZFeHByKHJlZi50eXBlKSk7XG4gIHJldHVybiBleHAubGVuZ3RoID4gMCA/IG8uZXhwcmVzc2lvblR5cGUoby5saXRlcmFsQXJyKHR5cGVzKSkgOiBvLk5PTkVfVFlQRTtcbn1cbiJdfQ==