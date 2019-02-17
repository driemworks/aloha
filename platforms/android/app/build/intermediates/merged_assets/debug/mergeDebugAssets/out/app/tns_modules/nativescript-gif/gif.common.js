"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("ui/core/view");
var GifCommon = (function (_super) {
    __extends(GifCommon, _super);
    function GifCommon() {
        return _super.call(this) || this;
    }
    return GifCommon;
}(view_1.View));
exports.GifCommon = GifCommon;
exports.srcProperty = new view_1.Property({
    name: 'src',
    defaultValue: ''
});
exports.srcProperty.register(GifCommon);
exports.headersProperty = new view_1.Property({
    name: 'headers'
});
exports.headersProperty.register(GifCommon);
exports.isLoadingProperty = new view_1.Property({
    name: 'isLoading',
    defaultValue: false
});
exports.isLoadingProperty.register(GifCommon);
//# sourceMappingURL=gif.common.js.map