/// <amd-module name="@ngrx/store/schematics-core/utility/package" />
import { Tree } from '@angular-devkit/schematics';
/**
 * Adds a package to the package.json
 */
export declare function addPackageToPackageJson(host: Tree, type: string, pkg: string, version: string): Tree;
