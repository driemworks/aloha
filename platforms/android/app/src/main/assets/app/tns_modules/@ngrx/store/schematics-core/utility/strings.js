(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core/utility/strings", ["require", "exports"], factory);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvc3RyaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILElBQU0sdUJBQXVCLEdBQUcsT0FBTyxDQUFDO0lBQ3hDLElBQU0sd0JBQXdCLEdBQUcsbUJBQW1CLENBQUM7SUFDckQsSUFBTSxzQkFBc0IsR0FBRyxtQkFBbUIsQ0FBQztJQUNuRCxJQUFNLDBCQUEwQixHQUFHLG9CQUFvQixDQUFDO0lBQ3hELElBQU0sMEJBQTBCLEdBQUcsUUFBUSxDQUFDO0lBRTVDOzs7Ozs7Ozs7T0FTRztJQUNILFNBQWdCLFVBQVUsQ0FBQyxHQUFXO1FBQ3BDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0RSxDQUFDO0lBRkQsZ0NBRUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxTQUFnQixTQUFTLENBQUMsR0FBWTtRQUNwQyxPQUFPLFVBQVUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFGRCw4QkFFQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxTQUFnQixRQUFRLENBQUMsR0FBVztRQUNsQyxPQUFPLEdBQUc7YUFDUCxPQUFPLENBQ04sc0JBQXNCLEVBQ3RCLFVBQUMsTUFBYyxFQUFFLFVBQWtCLEVBQUUsR0FBVztZQUM5QyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdEMsQ0FBQyxDQUNGO2FBQ0EsT0FBTyxDQUFDLFVBQVUsRUFBRSxVQUFDLEtBQWEsSUFBSyxPQUFBLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFURCw0QkFTQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFNBQWdCLFFBQVEsQ0FBQyxHQUFXO1FBQ2xDLE9BQU8sR0FBRzthQUNQLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQTFCLENBQTBCLENBQUM7YUFDdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUxELDRCQUtDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQWdCLFVBQVUsQ0FBQyxHQUFXO1FBQ3BDLE9BQU8sR0FBRzthQUNQLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxPQUFPLENBQUM7YUFDNUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLEdBQUcsQ0FBQzthQUN4QyxXQUFXLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBTEQsZ0NBS0M7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxTQUFnQixVQUFVLENBQUMsR0FBVztRQUNwQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRkQsZ0NBRUM7SUFFRCxTQUFnQixLQUFLLENBQUMsSUFBWSxFQUFFLEtBQXlCO1FBQzNELE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBSSxLQUFLLFNBQUksSUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDM0MsQ0FBQztJQUZELHNCQUVDO0lBRUQsU0FBZ0IsV0FBVyxDQUN6QixLQUEwQixFQUMxQixJQUF5QixFQUN6QixJQUFZLEVBQ1osSUFBWTtRQUVaLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2xCLE9BQU8sV0FBUyxJQUFJLFNBQUksSUFBSSxNQUFHLENBQUM7U0FDakM7UUFFRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBTSxJQUFJLE1BQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3RDLENBQUM7SUFYRCxrQ0FXQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmNvbnN0IFNUUklOR19EQVNIRVJJWkVfUkVHRVhQID0gL1sgX10vZztcbmNvbnN0IFNUUklOR19ERUNBTUVMSVpFX1JFR0VYUCA9IC8oW2EtelxcZF0pKFtBLVpdKS9nO1xuY29uc3QgU1RSSU5HX0NBTUVMSVpFX1JFR0VYUCA9IC8oLXxffFxcLnxcXHMpKyguKT8vZztcbmNvbnN0IFNUUklOR19VTkRFUlNDT1JFX1JFR0VYUF8xID0gLyhbYS16XFxkXSkoW0EtWl0rKS9nO1xuY29uc3QgU1RSSU5HX1VOREVSU0NPUkVfUkVHRVhQXzIgPSAvLXxcXHMrL2c7XG5cbi8qKlxuICogQ29udmVydHMgYSBjYW1lbGl6ZWQgc3RyaW5nIGludG8gYWxsIGxvd2VyIGNhc2Ugc2VwYXJhdGVkIGJ5IHVuZGVyc2NvcmVzLlxuICpcbiBgYGBqYXZhc2NyaXB0XG4gZGVjYW1lbGl6ZSgnaW5uZXJIVE1MJyk7ICAgICAgICAgLy8gJ2lubmVyX2h0bWwnXG4gZGVjYW1lbGl6ZSgnYWN0aW9uX25hbWUnKTsgICAgICAgLy8gJ2FjdGlvbl9uYW1lJ1xuIGRlY2FtZWxpemUoJ2Nzcy1jbGFzcy1uYW1lJyk7ICAgIC8vICdjc3MtY2xhc3MtbmFtZSdcbiBkZWNhbWVsaXplKCdteSBmYXZvcml0ZSBpdGVtcycpOyAvLyAnbXkgZmF2b3JpdGUgaXRlbXMnXG4gYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNhbWVsaXplKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKFNUUklOR19ERUNBTUVMSVpFX1JFR0VYUCwgJyQxXyQyJykudG9Mb3dlckNhc2UoKTtcbn1cblxuLyoqXG4gUmVwbGFjZXMgdW5kZXJzY29yZXMsIHNwYWNlcywgb3IgY2FtZWxDYXNlIHdpdGggZGFzaGVzLlxuXG4gYGBgamF2YXNjcmlwdFxuIGRhc2hlcml6ZSgnaW5uZXJIVE1MJyk7ICAgICAgICAgLy8gJ2lubmVyLWh0bWwnXG4gZGFzaGVyaXplKCdhY3Rpb25fbmFtZScpOyAgICAgICAvLyAnYWN0aW9uLW5hbWUnXG4gZGFzaGVyaXplKCdjc3MtY2xhc3MtbmFtZScpOyAgICAvLyAnY3NzLWNsYXNzLW5hbWUnXG4gZGFzaGVyaXplKCdteSBmYXZvcml0ZSBpdGVtcycpOyAvLyAnbXktZmF2b3JpdGUtaXRlbXMnXG4gYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkYXNoZXJpemUoc3RyPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGRlY2FtZWxpemUoc3RyIHx8ICcnKS5yZXBsYWNlKFNUUklOR19EQVNIRVJJWkVfUkVHRVhQLCAnLScpO1xufVxuXG4vKipcbiBSZXR1cm5zIHRoZSBsb3dlckNhbWVsQ2FzZSBmb3JtIG9mIGEgc3RyaW5nLlxuXG4gYGBgamF2YXNjcmlwdFxuIGNhbWVsaXplKCdpbm5lckhUTUwnKTsgICAgICAgICAgLy8gJ2lubmVySFRNTCdcbiBjYW1lbGl6ZSgnYWN0aW9uX25hbWUnKTsgICAgICAgIC8vICdhY3Rpb25OYW1lJ1xuIGNhbWVsaXplKCdjc3MtY2xhc3MtbmFtZScpOyAgICAgLy8gJ2Nzc0NsYXNzTmFtZSdcbiBjYW1lbGl6ZSgnbXkgZmF2b3JpdGUgaXRlbXMnKTsgIC8vICdteUZhdm9yaXRlSXRlbXMnXG4gY2FtZWxpemUoJ015IEZhdm9yaXRlIEl0ZW1zJyk7ICAvLyAnbXlGYXZvcml0ZUl0ZW1zJ1xuIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FtZWxpemUoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc3RyXG4gICAgLnJlcGxhY2UoXG4gICAgICBTVFJJTkdfQ0FNRUxJWkVfUkVHRVhQLFxuICAgICAgKF9tYXRjaDogc3RyaW5nLCBfc2VwYXJhdG9yOiBzdHJpbmcsIGNocjogc3RyaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiBjaHIgPyBjaHIudG9VcHBlckNhc2UoKSA6ICcnO1xuICAgICAgfVxuICAgIClcbiAgICAucmVwbGFjZSgvXihbQS1aXSkvLCAobWF0Y2g6IHN0cmluZykgPT4gbWF0Y2gudG9Mb3dlckNhc2UoKSk7XG59XG5cbi8qKlxuIFJldHVybnMgdGhlIFVwcGVyQ2FtZWxDYXNlIGZvcm0gb2YgYSBzdHJpbmcuXG5cbiBgYGBqYXZhc2NyaXB0XG4gJ2lubmVySFRNTCcuY2xhc3NpZnkoKTsgICAgICAgICAgLy8gJ0lubmVySFRNTCdcbiAnYWN0aW9uX25hbWUnLmNsYXNzaWZ5KCk7ICAgICAgICAvLyAnQWN0aW9uTmFtZSdcbiAnY3NzLWNsYXNzLW5hbWUnLmNsYXNzaWZ5KCk7ICAgICAvLyAnQ3NzQ2xhc3NOYW1lJ1xuICdteSBmYXZvcml0ZSBpdGVtcycuY2xhc3NpZnkoKTsgIC8vICdNeUZhdm9yaXRlSXRlbXMnXG4gYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFzc2lmeShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzdHJcbiAgICAuc3BsaXQoJy4nKVxuICAgIC5tYXAocGFydCA9PiBjYXBpdGFsaXplKGNhbWVsaXplKHBhcnQpKSlcbiAgICAuam9pbignLicpO1xufVxuXG4vKipcbiBNb3JlIGdlbmVyYWwgdGhhbiBkZWNhbWVsaXplLiBSZXR1cm5zIHRoZSBsb3dlclxcX2Nhc2VcXF9hbmRcXF91bmRlcnNjb3JlZFxuIGZvcm0gb2YgYSBzdHJpbmcuXG5cbiBgYGBqYXZhc2NyaXB0XG4gJ2lubmVySFRNTCcudW5kZXJzY29yZSgpOyAgICAgICAgICAvLyAnaW5uZXJfaHRtbCdcbiAnYWN0aW9uX25hbWUnLnVuZGVyc2NvcmUoKTsgICAgICAgIC8vICdhY3Rpb25fbmFtZSdcbiAnY3NzLWNsYXNzLW5hbWUnLnVuZGVyc2NvcmUoKTsgICAgIC8vICdjc3NfY2xhc3NfbmFtZSdcbiAnbXkgZmF2b3JpdGUgaXRlbXMnLnVuZGVyc2NvcmUoKTsgIC8vICdteV9mYXZvcml0ZV9pdGVtcydcbiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuZGVyc2NvcmUoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc3RyXG4gICAgLnJlcGxhY2UoU1RSSU5HX1VOREVSU0NPUkVfUkVHRVhQXzEsICckMV8kMicpXG4gICAgLnJlcGxhY2UoU1RSSU5HX1VOREVSU0NPUkVfUkVHRVhQXzIsICdfJylcbiAgICAudG9Mb3dlckNhc2UoKTtcbn1cblxuLyoqXG4gUmV0dXJucyB0aGUgQ2FwaXRhbGl6ZWQgZm9ybSBvZiBhIHN0cmluZ1xuXG4gYGBgamF2YXNjcmlwdFxuICdpbm5lckhUTUwnLmNhcGl0YWxpemUoKSAgICAgICAgIC8vICdJbm5lckhUTUwnXG4gJ2FjdGlvbl9uYW1lJy5jYXBpdGFsaXplKCkgICAgICAgLy8gJ0FjdGlvbl9uYW1lJ1xuICdjc3MtY2xhc3MtbmFtZScuY2FwaXRhbGl6ZSgpICAgIC8vICdDc3MtY2xhc3MtbmFtZSdcbiAnbXkgZmF2b3JpdGUgaXRlbXMnLmNhcGl0YWxpemUoKSAvLyAnTXkgZmF2b3JpdGUgaXRlbXMnXG4gYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zdWJzdHIoMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncm91cChuYW1lOiBzdHJpbmcsIGdyb3VwOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgcmV0dXJuIGdyb3VwID8gYCR7Z3JvdXB9LyR7bmFtZX1gIDogbmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVQYXRoKFxuICBncm91cDogYm9vbGVhbiB8IHVuZGVmaW5lZCxcbiAgZmxhdDogYm9vbGVhbiB8IHVuZGVmaW5lZCxcbiAgcGF0aDogc3RyaW5nLFxuICBuYW1lOiBzdHJpbmdcbikge1xuICBpZiAoZ3JvdXAgJiYgIWZsYXQpIHtcbiAgICByZXR1cm4gYC4uLy4uLyR7cGF0aH0vJHtuYW1lfS9gO1xuICB9XG5cbiAgcmV0dXJuIGdyb3VwID8gYC4uLyR7cGF0aH0vYCA6ICcuLyc7XG59XG4iXX0=