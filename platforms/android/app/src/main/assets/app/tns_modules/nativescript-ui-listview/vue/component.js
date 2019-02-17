Object.defineProperty(exports, "__esModule", { value: true });
var observableModule = require("tns-core-modules/data/observable");
var page_1 = require("tns-core-modules/ui/page/page");
var __1 = require("../");
function extend(to, _from) {
    for (var key in _from) {
        to[key] = _from[key];
    }
    return to;
}
// Note: most of the code taken from nativescript-vue/platform/nativescript/runtime/components/list-view
// TODO: reuse code from list-view component instead of copying
var VUE_VIEW = '__vueVNodeRef__';
exports.default = {
    props: {
        items: {
            type: Array,
            required: true
        },
        '+alias': {
            type: String,
            default: 'item'
        },
        '+index': {
            type: String
        },
        layout: {
            type: String,
            default: 'linear',
        },
        orientation: {
            type: String,
            default: 'vertical',
        },
        gridSpanCount: {
            type: Number,
            default: 2,
        },
        itemHeight: {
            type: String,
            default: 'auto',
        },
        itemTemplateSelector: {
            type: Function,
            default: undefined,
        },
        itemInsertAnimation: {
            type: String,
            default: undefined,
        },
        itemDeleteAnimation: {
            type: String,
            default: undefined,
        },
    },
    template: "\n    <NativeRadListView\n      ref=\"listView\"\n      :items=\"items\"\n      height=\"100%\"\n      width=\"100%\"\n      v-bind=\"$attrs\"\n      v-on=\"listeners\"\n      @itemTap=\"onItemTap\"\n      @itemLoading=\"onItemLoading\"\n      @itemSelected=\"onItemSelected\"\n      @itemDeselected=\"onItemDeselected\"\n      @itemReorderStarting=\"onItemReorderStarting\"\n      @itemReordered=\"onItemReordered\"\n    >\n      <slot />\n\n      <ListViewLinearLayout\n        v-if=\"layout === 'linear'\"\n        v-tkListViewLayout\n        :scrollDirection=\"scrollDirection\"\n        :itemInsertAnimation=\"itemInsertAnimation\"\n        :itemDeleteAnimation=\"itemDeleteAnimation\"\n        :itemHeight=\"itemHeight\"></ListViewLinearLayout>\n      <ListViewGridLayout\n        v-if=\"layout === 'grid'\"\n        v-tkListViewLayout\n        :scrollDirection=\"scrollDirection\"\n        :spanCount=\"gridSpanCount\"\n        :itemInsertAnimation=\"itemInsertAnimation\"\n        :itemDeleteAnimation=\"itemDeleteAnimation\"\n        :itemHeight=\"itemHeight\"></ListViewGridLayout>\n      <ListViewStaggeredLayout\n        v-if=\"layout === 'staggered'\"\n        v-tkListViewLayout\n        :scrollDirection=\"scrollDirection\"\n        :itemInsertAnimation=\"itemInsertAnimation\"\n        :itemDeleteAnimation=\"itemDeleteAnimation\"\n        :itemHeight=\"itemHeight\"\n        :spanCount=\"gridSpanCount\"></ListViewStaggeredLayout>\n    </NativeRadListView>\n  ",
    computed: {
        scrollDirection: function () {
            return this.orientation !== 'vertical' ? 'Horizontal' : 'Vertical';
        },
    },
    watch: {
        items: {
            handler: function (newVal, oldVal) {
                // if oldVal is a Observable object, there is no need for watching it
                if (!(oldVal instanceof observableModule.Observable)) {
                    this.$refs.listView.setAttribute('items', newVal);
                    if (this.doRefreshOnWatch) {
                        this.refresh();
                    }
                }
            },
            deep: true
        }
    },
    created: function () {
        // we need to remove the itemTap handler from a clone of the $listeners
        // object because we are emitting the event ourselves with added data.
        var listeners = extend({}, this.$listeners);
        delete listeners.itemTap;
        this.listeners = listeners;
        this.doRefreshOnWatch = true;
        this.getItemContext = getItemContext.bind(this);
    },
    mounted: function () {
        var _this = this;
        this.listView = this.$refs.listView;
        this.listView.setAttribute('itemTemplates', this.$templates.getKeyedTemplates());
        var itemTemplateSelector = this.itemTemplateSelector
            ? this.itemTemplateSelector // custom template selector if any
            : function (item, index, items) {
                var isSelected = _this.listView.nativeView.isItemSelected(item);
                return _this.$templates.selectorFn(_this.getItemContext(item, index, isSelected));
            };
        this.listView.setAttribute('itemTemplateSelector', itemTemplateSelector);
        var availableTemplates = this.$templates.getAvailable();
        this.listView.setAttribute('itemViewLoader', function (itemType) {
            // TODO: add other itemTypes
            switch (itemType) {
                case 'headerview':
                    if (~availableTemplates.indexOf('header')) {
                        return _this.$templates.patchTemplate('header', _this.$parent);
                    }
                    break;
                case 'footerview':
                    if (~availableTemplates.indexOf('footer')) {
                        return _this.$templates.patchTemplate('footer', _this.$parent);
                    }
                    break;
                case 'ItemSwipeView':
                    if (~availableTemplates.indexOf('itemswipe')) {
                        return _this.$templates.patchTemplate('itemswipe', _this.$parent);
                    }
                    break;
            }
        });
    },
    methods: {
        onItemTap: function (args) {
            this.$emit('itemTap', extend({ item: this.items[args.index] }, args));
        },
        updateViewTemplate: function (args) {
            var index = args.index;
            var items = args.object.items;
            var currentItem = typeof items.getItem === 'function'
                ? items.getItem(index)
                : items[index];
            var name = args.object.itemTemplateSelector(currentItem, index, items);
            var isSelected = this.listView.nativeView.isItemSelected(currentItem);
            var context = this.getItemContext(currentItem, index, isSelected);
            var oldVnode = args.view && args.view[VUE_VIEW];
            args.view = this.$templates.patchTemplate(name, context, oldVnode);
        },
        onItemLoading: function (args) {
            this.updateViewTemplate(args);
        },
        onItemReorderStarting: function (args) {
            this.doRefreshOnWatch = false;
            this.$emit('itemReorderStarted', args);
        },
        onItemReordered: function (args) {
            this.doRefreshOnWatch = true;
            this.$emit('itemReordered', args);
        },
        onItemSelected: function (args) {
            this.updateViewTemplate(args);
        },
        onItemDeselected: function (args) {
            this.updateViewTemplate(args);
        },
        refresh: function () {
            this.listView.nativeView.refresh();
            // hack to force refreshing of header and footer
            // as they can have reactive data shown
            if (page_1.isAndroid) {
                this.listView.nativeView._updateHeader();
                this.listView.nativeView._updateFooter();
            }
            else {
                this.listView.nativeView.clearCellsAndUpdateHeaderFooter();
            }
        },
        scrollToIndex: function (index, animate, snapMode) {
            if (animate === void 0) { animate = false; }
            if (snapMode === void 0) { snapMode = __1.ListViewItemSnapMode.Auto; }
            this.listView.nativeView.scrollToIndex(index, animate, snapMode);
        },
        notifySwipeToExecuteFinished: function () {
            this.listView.nativeView.notifySwipeToExecuteFinished();
        },
        getSelectedItems: function () {
            return this.listView.nativeView.getSelectedItems();
        },
    }
};
function getItemContext(item, index, selected, alias, index_alias) {
    if (alias === void 0) { alias = this.$props['+alias']; }
    if (index_alias === void 0) { index_alias = this.$props['+index']; }
    var _a;
    return _a = {},
        _a[alias] = item,
        _a[index_alias || '$index'] = index,
        _a.$even = index % 2 === 0,
        _a.$odd = index % 2 !== 0,
        _a.$selected = selected,
        _a;
}
