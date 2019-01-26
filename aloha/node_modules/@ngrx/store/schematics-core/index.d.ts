/// <amd-module name="@ngrx/store/schematics-core" />
import { dasherize, decamelize, camelize, classify, underscore, group, capitalize, featurePath } from './utility/strings';
export { findNodes, getSourceNodes, getDecoratorMetadata, getContentOfKeyLiteral, insertAfterLastOccurrence, addBootstrapToModule, addDeclarationToModule, addExportToModule, addImportToModule, addProviderToModule, } from './utility/ast-utils';
export { Host, Change, NoopChange, InsertChange, RemoveChange, ReplaceChange, } from './utility/change';
export { AppConfig, getWorkspace, getWorkspacePath } from './utility/config';
export { findModule, findModuleFromOptions, buildRelativePath, ModuleOptions, } from './utility/find-module';
export { addReducerToState, addReducerToStateInterface, addReducerImportToNgModule, addReducerToActionReducerMap, omit, } from './utility/ngrx-utils';
export { getProjectPath, getProject, isLib } from './utility/project';
export { insertImport } from './utility/route-utils';
export declare const stringUtils: {
    dasherize: typeof dasherize;
    decamelize: typeof decamelize;
    camelize: typeof camelize;
    classify: typeof classify;
    underscore: typeof underscore;
    group: typeof group;
    capitalize: typeof capitalize;
    featurePath: typeof featurePath;
};
export { updatePackage } from './utility/update';
export { parseName } from './utility/parse-name';
export { addPackageToPackageJson } from './utility/package';
export { platformVersion } from './utility/libs-version';
