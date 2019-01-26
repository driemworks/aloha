(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core/utility/parse-name", ["require", "exports", "@angular-devkit/core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular-devkit/core");
    function parseName(path, name) {
        var nameWithoutPath = core_1.basename(name);
        var namePath = core_1.dirname((path + '/' + name));
        return {
            name: nameWithoutPath,
            path: core_1.normalize('/' + namePath),
        };
    }
    exports.parseName = parseName;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtbmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvcGFyc2UtbmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLDZDQUEwRTtJQU8xRSxTQUFnQixTQUFTLENBQUMsSUFBWSxFQUFFLElBQVk7UUFDbEQsSUFBTSxlQUFlLEdBQUcsZUFBUSxDQUFDLElBQVksQ0FBQyxDQUFDO1FBQy9DLElBQU0sUUFBUSxHQUFHLGNBQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFTLENBQUMsQ0FBQztRQUV0RCxPQUFPO1lBQ0wsSUFBSSxFQUFFLGVBQWU7WUFDckIsSUFBSSxFQUFFLGdCQUFTLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQztTQUNoQyxDQUFDO0lBQ0osQ0FBQztJQVJELDhCQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGF0aCwgYmFzZW5hbWUsIGRpcm5hbWUsIG5vcm1hbGl6ZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBMb2NhdGlvbiB7XG4gIG5hbWU6IHN0cmluZztcbiAgcGF0aDogUGF0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTmFtZShwYXRoOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IExvY2F0aW9uIHtcbiAgY29uc3QgbmFtZVdpdGhvdXRQYXRoID0gYmFzZW5hbWUobmFtZSBhcyBQYXRoKTtcbiAgY29uc3QgbmFtZVBhdGggPSBkaXJuYW1lKChwYXRoICsgJy8nICsgbmFtZSkgYXMgUGF0aCk7XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBuYW1lV2l0aG91dFBhdGgsXG4gICAgcGF0aDogbm9ybWFsaXplKCcvJyArIG5hbWVQYXRoKSxcbiAgfTtcbn1cbiJdfQ==