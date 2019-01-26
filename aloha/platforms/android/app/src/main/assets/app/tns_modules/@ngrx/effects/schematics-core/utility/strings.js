(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/effects/schematics-core/utility/strings", ["require", "exports"], factory);
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
    var STRING_DASHERIZE_REGEXP = /[ _]/g;
    var STRING_DECAMELIZE_REGEXP = /([a-z\d])([A-Z])/g;
    var STRING_CAMELIZE_REGEXP = /(-|_|\.|\s)+(.)?/g;
    var STRING_UNDERSCORE_REGEXP_1 = /([a-z\d])([A-Z]+)/g;
    var STRING_UNDERSCORE_REGEXP_2 = /-|\s+/g;
    /**
     * Converts a camelized string into all lower case separated by underscores.
     *
     ```javascript
     decamelize('innerHTML');         // 'inner_html'
     decamelize('action_name');       // 'action_name'
     decamelize('css-class-name');    // 'css-class-name'
     decamelize('my favorite items'); // 'my favorite items'
     ```
     */
    function decamelize(str) {
        return str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase();
    }
    exports.decamelize = decamelize;
    /**
     Replaces underscores, spaces, or camelCase with dashes.
    
     ```javascript
     dasherize('innerHTML');         // 'inner-html'
     dasherize('action_name');       // 'action-name'
     dasherize('css-class-name');    // 'css-class-name'
     dasherize('my favorite items'); // 'my-favorite-items'
     ```
     */
    function dasherize(str) {
        return decamelize(str || '').replace(STRING_DASHERIZE_REGEXP, '-');
    }
    exports.dasherize = dasherize;
    /**
     Returns the lowerCamelCase form of a string.
    
     ```javascript
     camelize('innerHTML');          // 'innerHTML'
     camelize('action_name');        // 'actionName'
     camelize('css-class-name');     // 'cssClassName'
     camelize('my favorite items');  // 'myFavoriteItems'
     camelize('My Favorite Items');  // 'myFavoriteItems'
     ```
     */
    function camelize(str) {
        return str
            .replace(STRING_CAMELIZE_REGEXP, function (_match, _separator, chr) {
            return chr ? chr.toUpperCase() : '';
        })
            .replace(/^([A-Z])/, function (match) { return match.toLowerCase(); });
    }
    exports.camelize = camelize;
    /**
     Returns the UpperCamelCase form of a string.
    
     ```javascript
     'innerHTML'.classify();          // 'InnerHTML'
     'action_name'.classify();        // 'ActionName'
     'css-class-name'.classify();     // 'CssClassName'
     'my favorite items'.classify();  // 'MyFavoriteItems'
     ```
     */
    function classify(str) {
        return str
            .split('.')
            .map(function (part) { return capitalize(camelize(part)); })
            .join('.');
    }
    exports.classify = classify;
    /**
     More general than decamelize. Returns the lower\_case\_and\_underscored
     form of a string.
    
     ```javascript
     'innerHTML'.underscore();          // 'inner_html'
     'action_name'.underscore();        // 'action_name'
     'css-class-name'.underscore();     // 'css_class_name'
     'my favorite items'.underscore();  // 'my_favorite_items'
     ```
     */
    function underscore(str) {
        return str
            .replace(STRING_UNDERSCORE_REGEXP_1, '$1_$2')
            .replace(STRING_UNDERSCORE_REGEXP_2, '_')
            .toLowerCase();
    }
    exports.underscore = underscore;
    /**
     Returns the Capitalized form of a string
    
     ```javascript
     'innerHTML'.capitalize()         // 'InnerHTML'
     'action_name'.capitalize()       // 'Action_name'
     'css-class-name'.capitalize()    // 'Css-class-name'
     'my favorite items'.capitalize() // 'My favorite items'
     ```
     */
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }
    exports.capitalize = capitalize;
    function group(name, group) {
        return group ? group + "/" + name : name;
    }
    exports.group = group;
    function featurePath(group, flat, path, name) {
        if (group && !flat) {
            return "../../" + path + "/" + name + "/";
        }
        return group ? "../" + path + "/" : './';
    }
    exports.featurePath = featurePath;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS9zdHJpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUE7Ozs7OztPQU1HO0lBQ0gsSUFBTSx1QkFBdUIsR0FBRyxPQUFPLENBQUM7SUFDeEMsSUFBTSx3QkFBd0IsR0FBRyxtQkFBbUIsQ0FBQztJQUNyRCxJQUFNLHNCQUFzQixHQUFHLG1CQUFtQixDQUFDO0lBQ25ELElBQU0sMEJBQTBCLEdBQUcsb0JBQW9CLENBQUM7SUFDeEQsSUFBTSwwQkFBMEIsR0FBRyxRQUFRLENBQUM7SUFFNUM7Ozs7Ozs7OztPQVNHO0lBQ0gsU0FBZ0IsVUFBVSxDQUFDLEdBQVc7UUFDcEMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RFLENBQUM7SUFGRCxnQ0FFQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFNBQWdCLFNBQVMsQ0FBQyxHQUFZO1FBQ3BDLE9BQU8sVUFBVSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUZELDhCQUVDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQWdCLFFBQVEsQ0FBQyxHQUFXO1FBQ2xDLE9BQU8sR0FBRzthQUNQLE9BQU8sQ0FDTixzQkFBc0IsRUFDdEIsVUFBQyxNQUFjLEVBQUUsVUFBa0IsRUFBRSxHQUFXO1lBQzlDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN0QyxDQUFDLENBQ0Y7YUFDQSxPQUFPLENBQUMsVUFBVSxFQUFFLFVBQUMsS0FBYSxJQUFLLE9BQUEsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFuQixDQUFtQixDQUFDLENBQUM7SUFDakUsQ0FBQztJQVRELDRCQVNDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsU0FBZ0IsUUFBUSxDQUFDLEdBQVc7UUFDbEMsT0FBTyxHQUFHO2FBQ1AsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQzthQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixDQUFDO0lBTEQsNEJBS0M7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsU0FBZ0IsVUFBVSxDQUFDLEdBQVc7UUFDcEMsT0FBTyxHQUFHO2FBQ1AsT0FBTyxDQUFDLDBCQUEwQixFQUFFLE9BQU8sQ0FBQzthQUM1QyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxDQUFDO2FBQ3hDLFdBQVcsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFMRCxnQ0FLQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFNBQWdCLFVBQVUsQ0FBQyxHQUFXO1FBQ3BDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFGRCxnQ0FFQztJQUVELFNBQWdCLEtBQUssQ0FBQyxJQUFZLEVBQUUsS0FBeUI7UUFDM0QsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFJLEtBQUssU0FBSSxJQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMzQyxDQUFDO0lBRkQsc0JBRUM7SUFFRCxTQUFnQixXQUFXLENBQ3pCLEtBQTBCLEVBQzFCLElBQXlCLEVBQ3pCLElBQVksRUFDWixJQUFZO1FBRVosSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbEIsT0FBTyxXQUFTLElBQUksU0FBSSxJQUFJLE1BQUcsQ0FBQztTQUNqQztRQUVELE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFNLElBQUksTUFBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdEMsQ0FBQztJQVhELGtDQVdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuY29uc3QgU1RSSU5HX0RBU0hFUklaRV9SRUdFWFAgPSAvWyBfXS9nO1xuY29uc3QgU1RSSU5HX0RFQ0FNRUxJWkVfUkVHRVhQID0gLyhbYS16XFxkXSkoW0EtWl0pL2c7XG5jb25zdCBTVFJJTkdfQ0FNRUxJWkVfUkVHRVhQID0gLygtfF98XFwufFxccykrKC4pPy9nO1xuY29uc3QgU1RSSU5HX1VOREVSU0NPUkVfUkVHRVhQXzEgPSAvKFthLXpcXGRdKShbQS1aXSspL2c7XG5jb25zdCBTVFJJTkdfVU5ERVJTQ09SRV9SRUdFWFBfMiA9IC8tfFxccysvZztcblxuLyoqXG4gKiBDb252ZXJ0cyBhIGNhbWVsaXplZCBzdHJpbmcgaW50byBhbGwgbG93ZXIgY2FzZSBzZXBhcmF0ZWQgYnkgdW5kZXJzY29yZXMuXG4gKlxuIGBgYGphdmFzY3JpcHRcbiBkZWNhbWVsaXplKCdpbm5lckhUTUwnKTsgICAgICAgICAvLyAnaW5uZXJfaHRtbCdcbiBkZWNhbWVsaXplKCdhY3Rpb25fbmFtZScpOyAgICAgICAvLyAnYWN0aW9uX25hbWUnXG4gZGVjYW1lbGl6ZSgnY3NzLWNsYXNzLW5hbWUnKTsgICAgLy8gJ2Nzcy1jbGFzcy1uYW1lJ1xuIGRlY2FtZWxpemUoJ215IGZhdm9yaXRlIGl0ZW1zJyk7IC8vICdteSBmYXZvcml0ZSBpdGVtcydcbiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlY2FtZWxpemUoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoU1RSSU5HX0RFQ0FNRUxJWkVfUkVHRVhQLCAnJDFfJDInKS50b0xvd2VyQ2FzZSgpO1xufVxuXG4vKipcbiBSZXBsYWNlcyB1bmRlcnNjb3Jlcywgc3BhY2VzLCBvciBjYW1lbENhc2Ugd2l0aCBkYXNoZXMuXG5cbiBgYGBqYXZhc2NyaXB0XG4gZGFzaGVyaXplKCdpbm5lckhUTUwnKTsgICAgICAgICAvLyAnaW5uZXItaHRtbCdcbiBkYXNoZXJpemUoJ2FjdGlvbl9uYW1lJyk7ICAgICAgIC8vICdhY3Rpb24tbmFtZSdcbiBkYXNoZXJpemUoJ2Nzcy1jbGFzcy1uYW1lJyk7ICAgIC8vICdjc3MtY2xhc3MtbmFtZSdcbiBkYXNoZXJpemUoJ215IGZhdm9yaXRlIGl0ZW1zJyk7IC8vICdteS1mYXZvcml0ZS1pdGVtcydcbiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhc2hlcml6ZShzdHI/OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gZGVjYW1lbGl6ZShzdHIgfHwgJycpLnJlcGxhY2UoU1RSSU5HX0RBU0hFUklaRV9SRUdFWFAsICctJyk7XG59XG5cbi8qKlxuIFJldHVybnMgdGhlIGxvd2VyQ2FtZWxDYXNlIGZvcm0gb2YgYSBzdHJpbmcuXG5cbiBgYGBqYXZhc2NyaXB0XG4gY2FtZWxpemUoJ2lubmVySFRNTCcpOyAgICAgICAgICAvLyAnaW5uZXJIVE1MJ1xuIGNhbWVsaXplKCdhY3Rpb25fbmFtZScpOyAgICAgICAgLy8gJ2FjdGlvbk5hbWUnXG4gY2FtZWxpemUoJ2Nzcy1jbGFzcy1uYW1lJyk7ICAgICAvLyAnY3NzQ2xhc3NOYW1lJ1xuIGNhbWVsaXplKCdteSBmYXZvcml0ZSBpdGVtcycpOyAgLy8gJ215RmF2b3JpdGVJdGVtcydcbiBjYW1lbGl6ZSgnTXkgRmF2b3JpdGUgSXRlbXMnKTsgIC8vICdteUZhdm9yaXRlSXRlbXMnXG4gYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW1lbGl6ZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzdHJcbiAgICAucmVwbGFjZShcbiAgICAgIFNUUklOR19DQU1FTElaRV9SRUdFWFAsXG4gICAgICAoX21hdGNoOiBzdHJpbmcsIF9zZXBhcmF0b3I6IHN0cmluZywgY2hyOiBzdHJpbmcpID0+IHtcbiAgICAgICAgcmV0dXJuIGNociA/IGNoci50b1VwcGVyQ2FzZSgpIDogJyc7XG4gICAgICB9XG4gICAgKVxuICAgIC5yZXBsYWNlKC9eKFtBLVpdKS8sIChtYXRjaDogc3RyaW5nKSA9PiBtYXRjaC50b0xvd2VyQ2FzZSgpKTtcbn1cblxuLyoqXG4gUmV0dXJucyB0aGUgVXBwZXJDYW1lbENhc2UgZm9ybSBvZiBhIHN0cmluZy5cblxuIGBgYGphdmFzY3JpcHRcbiAnaW5uZXJIVE1MJy5jbGFzc2lmeSgpOyAgICAgICAgICAvLyAnSW5uZXJIVE1MJ1xuICdhY3Rpb25fbmFtZScuY2xhc3NpZnkoKTsgICAgICAgIC8vICdBY3Rpb25OYW1lJ1xuICdjc3MtY2xhc3MtbmFtZScuY2xhc3NpZnkoKTsgICAgIC8vICdDc3NDbGFzc05hbWUnXG4gJ215IGZhdm9yaXRlIGl0ZW1zJy5jbGFzc2lmeSgpOyAgLy8gJ015RmF2b3JpdGVJdGVtcydcbiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsYXNzaWZ5KHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHN0clxuICAgIC5zcGxpdCgnLicpXG4gICAgLm1hcChwYXJ0ID0+IGNhcGl0YWxpemUoY2FtZWxpemUocGFydCkpKVxuICAgIC5qb2luKCcuJyk7XG59XG5cbi8qKlxuIE1vcmUgZ2VuZXJhbCB0aGFuIGRlY2FtZWxpemUuIFJldHVybnMgdGhlIGxvd2VyXFxfY2FzZVxcX2FuZFxcX3VuZGVyc2NvcmVkXG4gZm9ybSBvZiBhIHN0cmluZy5cblxuIGBgYGphdmFzY3JpcHRcbiAnaW5uZXJIVE1MJy51bmRlcnNjb3JlKCk7ICAgICAgICAgIC8vICdpbm5lcl9odG1sJ1xuICdhY3Rpb25fbmFtZScudW5kZXJzY29yZSgpOyAgICAgICAgLy8gJ2FjdGlvbl9uYW1lJ1xuICdjc3MtY2xhc3MtbmFtZScudW5kZXJzY29yZSgpOyAgICAgLy8gJ2Nzc19jbGFzc19uYW1lJ1xuICdteSBmYXZvcml0ZSBpdGVtcycudW5kZXJzY29yZSgpOyAgLy8gJ215X2Zhdm9yaXRlX2l0ZW1zJ1xuIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5kZXJzY29yZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzdHJcbiAgICAucmVwbGFjZShTVFJJTkdfVU5ERVJTQ09SRV9SRUdFWFBfMSwgJyQxXyQyJylcbiAgICAucmVwbGFjZShTVFJJTkdfVU5ERVJTQ09SRV9SRUdFWFBfMiwgJ18nKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufVxuXG4vKipcbiBSZXR1cm5zIHRoZSBDYXBpdGFsaXplZCBmb3JtIG9mIGEgc3RyaW5nXG5cbiBgYGBqYXZhc2NyaXB0XG4gJ2lubmVySFRNTCcuY2FwaXRhbGl6ZSgpICAgICAgICAgLy8gJ0lubmVySFRNTCdcbiAnYWN0aW9uX25hbWUnLmNhcGl0YWxpemUoKSAgICAgICAvLyAnQWN0aW9uX25hbWUnXG4gJ2Nzcy1jbGFzcy1uYW1lJy5jYXBpdGFsaXplKCkgICAgLy8gJ0Nzcy1jbGFzcy1uYW1lJ1xuICdteSBmYXZvcml0ZSBpdGVtcycuY2FwaXRhbGl6ZSgpIC8vICdNeSBmYXZvcml0ZSBpdGVtcydcbiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnN1YnN0cigxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwKG5hbWU6IHN0cmluZywgZ3JvdXA6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICByZXR1cm4gZ3JvdXAgPyBgJHtncm91cH0vJHtuYW1lfWAgOiBuYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZVBhdGgoXG4gIGdyb3VwOiBib29sZWFuIHwgdW5kZWZpbmVkLFxuICBmbGF0OiBib29sZWFuIHwgdW5kZWZpbmVkLFxuICBwYXRoOiBzdHJpbmcsXG4gIG5hbWU6IHN0cmluZ1xuKSB7XG4gIGlmIChncm91cCAmJiAhZmxhdCkge1xuICAgIHJldHVybiBgLi4vLi4vJHtwYXRofS8ke25hbWV9L2A7XG4gIH1cblxuICByZXR1cm4gZ3JvdXAgPyBgLi4vJHtwYXRofS9gIDogJy4vJztcbn1cbiJdfQ==