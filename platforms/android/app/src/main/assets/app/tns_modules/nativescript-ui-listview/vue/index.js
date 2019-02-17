Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("./..");
var component_1 = require("./component");
var RadListViewPlugin = {
    install: function (Vue, options) {
        Vue.registerElement('RadListView', function () { return __1.RadListView; }, {
            component: component_1.default,
        });
        Vue.registerElement('ListViewGridLayout', function () { return __1.ListViewGridLayout; });
        Vue.registerElement('ListViewLinearLayout', function () { return __1.ListViewLinearLayout; });
        Vue.registerElement('ListViewStaggeredLayout', function () { return __1.ListViewStaggeredLayout; });
        Vue.directive('tkListViewLayout', {
            inserted: function (el) {
                el.parentNode._nativeView.listViewLayout = el._nativeView;
            }
        });
    }
};
exports.default = RadListViewPlugin;
