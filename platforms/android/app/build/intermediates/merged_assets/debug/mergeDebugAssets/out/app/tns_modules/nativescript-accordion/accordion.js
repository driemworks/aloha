"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("tns-core-modules/color");
var common = require("./accordion.common");
var accordion_common_1 = require("./accordion.common");
var observable_1 = require("tns-core-modules/data/observable");
var layout_base_1 = require("tns-core-modules/ui/layouts/layout-base");
var proxy_view_container_1 = require("tns-core-modules/ui/proxy-view-container");
var stack_layout_1 = require("tns-core-modules/ui/layouts/stack-layout");
var profiling_1 = require("tns-core-modules/profiling");
var NG_VIEW = '_ngViewRef';
function notifyForItemAtIndex(owner, nativeView, view, eventName, parentIndex, childIndex) {
    var args = {
        eventName: eventName,
        object: owner,
        index: parentIndex,
        childIndex: childIndex,
        view: view,
        ios: undefined,
        android: nativeView
    };
    owner.notify(args);
    return args;
}
function notifyForHeaderOrFooterAtIndex(owner, nativeView, view, eventName, parentIndex) {
    var args = {
        eventName: eventName,
        object: owner,
        index: parentIndex,
        view: view,
        ios: undefined,
        android: nativeView
    };
    owner.notify(args);
    return args;
}
function notifyForHeaderOrFooterStartAtIndex(owner, eventName, parentIndex) {
    var args = { eventName: eventName, object: owner, parentIndex: parentIndex };
    owner.notify(args);
    return args;
}
function notifyForItemStartAtIndex(owner, eventName, parentIndex, childIndex) {
    var args = { eventName: eventName, object: owner, parentIndex: parentIndex, childIndex: childIndex };
    owner.notify(args);
    return args;
}
global.moduleMerge(common, exports);
var Accordion = (function (_super) {
    __extends(Accordion, _super);
    function Accordion() {
        var _this = _super.call(this) || this;
        _this._previousGroup = -1;
        _this._androidViewId = -1;
        _this._realizedItems = new Map();
        _this._realizedHeaderTemplates = new Map();
        _this._realizedItemHeaderTemplates = new Map();
        _this._realizedItemContentTemplates = new Map();
        _this._realizedFooterTemplates = new Map();
        _this._itemsMap = new Map();
        _this._headerMap = new Map();
        _this._itemsMap = new Map();
        _this._expandedViews = new Map();
        return _this;
    }
    Accordion.prototype.expandAll = function () {
        var length = this.items.length;
        for (var i = 0; i < length; i++) {
            this.expandItem(i);
        }
    };
    Accordion.prototype.collapseAll = function () {
        var length = this.items.length;
        for (var i = 0; i < length; i++) {
            this.collapseItem(i);
        }
    };
    Object.defineProperty(Accordion.prototype, "android", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });
    Accordion.prototype.createNativeView = function () {
        var nativeView = new android.widget.ExpandableListView(this._context);
        nativeView.setDivider(new android.graphics.drawable.ColorDrawable(new color_1.Color('transparent').android));
        nativeView.setDividerHeight(1);
        if (this.separatorColor) {
            nativeView.setDivider(new android.graphics.drawable.ColorDrawable(new color_1.Color(this.separatorColor).android));
            nativeView.setDividerHeight(1);
        }
        return nativeView;
    };
    Accordion.prototype.initNativeView = function () {
        var _this = this;
        _super.prototype.initNativeView.call(this);
        var that = new WeakRef(this);
        this.nativeView.setOnGroupClickListener(new android.widget.ExpandableListView.OnGroupClickListener({
            onGroupClick: function (listView, view, groupPosition, id) {
                var owner = that.get();
                var data = owner._getParentData(groupPosition);
                var args = {
                    eventName: accordion_common_1.AccordionBase.itemHeaderTapEvent,
                    data: data,
                    object: owner,
                    index: groupPosition,
                    view: null,
                    ios: null,
                    android: view
                };
                owner.notify(args);
                return false;
            }
        }));
        this.nativeView.setOnChildClickListener(new android.widget.ExpandableListView.OnChildClickListener({
            onChildClick: function (listView, view, groupPosition, childPosition, id) {
                var owner = that.get();
                var data = owner._getChildData(groupPosition, childPosition);
                var args = {
                    eventName: accordion_common_1.AccordionBase.itemContentTapEvent,
                    data: data,
                    object: owner,
                    childIndex: childPosition,
                    index: groupPosition,
                    view: null,
                    ios: null,
                    android: view
                };
                owner.notify(args);
                return false;
            }
        }));
        this.nativeView.setGroupIndicator(null);
        this.nativeView.setOnGroupExpandListener(new android.widget.ExpandableListView.OnGroupExpandListener({
            onGroupExpand: function (groupPosition) {
                var owner = that.get();
                owner._expandedViews.set(groupPosition, true);
                owner.itemExpanded(groupPosition);
                var allowMultiple = String(owner.allowMultiple) === 'true';
                if (!allowMultiple) {
                    if ((owner._previousGroup !== -1) && (groupPosition !== owner._previousGroup)) {
                        owner.android.collapseGroup(owner._previousGroup);
                    }
                    owner._previousGroup = groupPosition;
                }
                var oldIndexes = owner.selectedIndexes.slice();
                oldIndexes.push(groupPosition);
                var newIndexes = Array.from(new Set(oldIndexes));
                accordion_common_1.selectedIndexesProperty.nativeValueChange(owner, newIndexes);
            }
        }));
        this.nativeView.setOnGroupCollapseListener(new android.widget.ExpandableListView.OnGroupCollapseListener({
            onGroupCollapse: function (groupPosition) {
                var owner = that.get();
                owner._expandedViews.set(groupPosition, false);
                owner.itemCollapsed(groupPosition);
                var oldIndexes = owner.selectedIndexes.slice();
                var newIndexes = oldIndexes.filter(function (item) {
                    if (item !== groupPosition) {
                        return item;
                    }
                });
                accordion_common_1.selectedIndexesProperty.nativeValueChange(owner, newIndexes);
            }
        }));
        this._listAdapter = new AccordionListAdapter(new WeakRef(this));
        this.nativeView.setAdapter(this._listAdapter);
        if (this.selectedIndexes) {
            this.selectedIndexes.forEach(function (item) {
                _this.nativeView.expandGroup(item);
            });
        }
        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this.nativeView.setId(this._androidViewId);
    };
    Accordion.prototype.disposeNativeView = function () {
        var nativeView = this.nativeViewProtected;
        nativeView.setAdapter(new EmptyListAdapter());
        this.clearRealizedCells();
        _super.prototype.disposeNativeView.call(this);
    };
    Accordion.prototype.eachChildView = function (callback) {
        this._realizedItems.forEach(function (view, nativeView) {
            if (view.parent instanceof Accordion) {
                callback(view);
            }
            else {
                if (view.parent) {
                    callback(view.parent);
                }
            }
        });
    };
    Accordion.prototype.refresh = function () {
        if (!this.nativeView || !this.nativeView.getExpandableListAdapter()) {
            return;
        }
        this._realizedItems.forEach(function (view, nativeView) {
            if (!(view.bindingContext instanceof observable_1.Observable)) {
                view.bindingContext = null;
            }
        });
        this._listAdapter.notifyDataSetChanged();
    };
    Accordion.prototype.updateNativeIndexes = function (oldIndexes, newIndexes) {
    };
    Accordion.prototype[accordion_common_1.selectedIndexesProperty.getDefault] = function () {
        return [];
    };
    Accordion.prototype[accordion_common_1.selectedIndexesProperty.setNative] = function (value) {
        var _this = this;
        if (value) {
            value.forEach(function (item) {
                _this.nativeView.expandGroup(item);
            });
        }
    };
    Accordion.prototype.updateNativeItems = function (oldItems, newItems) {
    };
    Accordion.prototype._selectedIndexUpdatedFromNative = function (newIndex) {
        accordion_common_1.selectedIndexesProperty.nativeValueChange(this, newIndex);
    };
    Accordion.prototype.itemExpanded = function (index) {
        this.notify({
            eventName: 'itemExpanded',
            object: observable_1.fromObject({
                value: index
            })
        });
    };
    Accordion.prototype.itemCollapsed = function (index) {
        this.notify({
            eventName: 'itemCollapsed',
            object: observable_1.fromObject({
                value: index
            })
        });
    };
    Accordion.prototype.expandItem = function (id) {
        this.nativeView.expandGroup(id, true);
    };
    Accordion.prototype.collapseItem = function (id) {
        this.nativeView.collapseGroup(id);
    };
    Accordion.prototype.itemIsExpanded = function (id) {
        return this.nativeView.isGroupExpanded(id);
    };
    Accordion.prototype.clearRealizedCells = function () {
        var _this = this;
        this._realizedItems.forEach(function (view, nativeView) {
            if (view.parent) {
                if (!(view.parent instanceof Accordion)) {
                    _this._removeView(view.parent);
                }
                view.parent._removeView(view);
            }
        });
        this._realizedItems.clear();
        this._realizedItemContentTemplates.clear();
        this._realizedItemHeaderTemplates.clear();
        this._realizedHeaderTemplates.clear();
        this._realizedFooterTemplates.clear();
    };
    Accordion.prototype[accordion_common_1.headerTemplatesProperty.getDefault] = function () {
        return null;
    };
    Accordion.prototype[accordion_common_1.headerTemplatesProperty.setNative] = function (value) {
        this._headerTemplatesInternal = new Array(this._defaultHeaderTemplate);
        if (value) {
            this._headerTemplatesInternal = this._headerTemplatesInternal.concat(value);
        }
        this.refresh();
    };
    Accordion.prototype[accordion_common_1.itemHeaderTemplatesProperty.getDefault] = function () {
        return null;
    };
    Accordion.prototype[accordion_common_1.itemHeaderTemplatesProperty.setNative] = function (value) {
        this._itemHeaderTemplatesInternal = new Array(this._defaultItemHeaderTemplate);
        if (value) {
            this._itemHeaderTemplatesInternal = this._itemHeaderTemplatesInternal.concat(value);
        }
        this.refresh();
    };
    Accordion.prototype[accordion_common_1.itemContentTemplatesProperty.getDefault] = function () {
        return null;
    };
    Accordion.prototype[accordion_common_1.itemContentTemplatesProperty.setNative] = function (value) {
        this._itemContentTemplatesInternal = new Array(this._defaultItemContentTemplate);
        if (value) {
            this._itemContentTemplatesInternal = this._itemContentTemplatesInternal.concat(value);
        }
        this.refresh();
    };
    Accordion.prototype[accordion_common_1.headerTemplatesProperty.getDefault] = function () {
        return null;
    };
    Accordion.prototype[accordion_common_1.headerTemplatesProperty.setNative] = function (value) {
        this._headerTemplatesInternal = new Array(this._defaultHeaderTemplate);
        if (value) {
            this._headerTemplatesInternal = this._headerTemplatesInternal.concat(value);
        }
        this.refresh();
    };
    Accordion.prototype[accordion_common_1.footerTemplatesProperty.getDefault] = function () {
        return null;
    };
    Accordion.prototype[accordion_common_1.footerTemplatesProperty.setNative] = function (value) {
        this._footerTemplatesInternal = new Array(this._defaultFooterTemplate);
        if (value) {
            this._footerTemplatesInternal = this._footerTemplatesInternal.concat(value);
        }
        this.refresh();
    };
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Accordion.prototype, "createNativeView", null);
    return Accordion;
}(accordion_common_1.AccordionBase));
exports.Accordion = Accordion;
var EmptyListAdapter = (function (_super) {
    __extends(EmptyListAdapter, _super);
    function EmptyListAdapter() {
        var _this = _super.call(this) || this;
        return global.__native(_this);
    }
    EmptyListAdapter.prototype.getChild = function (i, childPosition) {
        return null;
    };
    EmptyListAdapter.prototype.getGroupId = function (i) {
        return 0;
    };
    EmptyListAdapter.prototype.getGroup = function (i) {
        return null;
    };
    EmptyListAdapter.prototype.hasStableIds = function () {
        return true;
    };
    EmptyListAdapter.prototype.getGroupView = function (groupPosition, isExpanded, convertView, parent) {
        return convertView;
    };
    EmptyListAdapter.prototype.getGroupCount = function () {
        return 0;
    };
    EmptyListAdapter.prototype.getChildView = function (groupPosition, childPosition, isLastChild, convertView, parent) {
        return convertView;
    };
    EmptyListAdapter.prototype.getChildId = function (i, childPosition) {
        return 0;
    };
    EmptyListAdapter.prototype.getChildrenCount = function (groupPosition) {
        return 0;
    };
    EmptyListAdapter.prototype.isChildSelectable = function (groupPosition, childPosition) {
        return false;
    };
    return EmptyListAdapter;
}(android.widget.BaseExpandableListAdapter));
var AccordionListAdapter = (function (_super) {
    __extends(AccordionListAdapter, _super);
    function AccordionListAdapter(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    AccordionListAdapter.prototype.getChild = function (i, childPosition) {
        var owner = this.owner ? this.owner.get() : null;
        if (!owner) {
            return false;
        }
        if (owner.items && i < owner.items.length) {
            var getItem = owner._getChildData(i, childPosition);
            var item = typeof getItem === 'function' ? getItem.call(owner.items, i) : owner.items[i];
            if (item) {
                var childItems = item[owner.childItems];
                if (!childItems)
                    return null;
                var childItem = childItems.getItem;
                return childItem ? childItem.call(childItems, childPosition) : childItems[childPosition];
            }
            return null;
        }
        return null;
    };
    AccordionListAdapter.prototype.getGroupId = function (i) {
        var owner = this.owner ? this.owner.get() : null;
        var item = this.getGroup(i);
        var id = i;
        if (owner && item && owner.items) {
            id = owner.itemIdGenerator(item, i, owner.items);
        }
        return long(id);
    };
    AccordionListAdapter.prototype.getGroup = function (i) {
        var owner = this.owner ? this.owner.get() : null;
        if (!owner) {
            return false;
        }
        if (owner.items && i < owner.items.length) {
            var getItem = owner.items.getItem;
            return getItem ? getItem.call(owner.items, i) : owner.items[i];
        }
        return null;
    };
    AccordionListAdapter.prototype.hasStableIds = function () {
        return true;
    };
    AccordionListAdapter.prototype.getGroupView = function (groupPosition, isExpanded, convertView, parent) {
        var owner = this.owner ? this.owner.get() : null;
        if (!owner) {
            return null;
        }
        var totalItemCount = owner.items ? owner.items.length : 0;
        if (groupPosition === (totalItemCount - 1)) {
            owner.notify({ eventName: accordion_common_1.AccordionBase.loadMoreItemsEvent, object: owner });
        }
        var template = owner._getItemHeaderTemplate(groupPosition);
        var view;
        if (convertView) {
            var cachedItemHeader = owner._realizedItemHeaderTemplates.get(template.key);
            view = cachedItemHeader ? cachedItemHeader.get(convertView) : null;
            if (!view) {
                view = template.createView();
            }
        }
        else {
            view = template.createView();
        }
        var args = notifyForHeaderOrFooterAtIndex(owner, view ? view.nativeView : null, view, accordion_common_1.AccordionBase.itemHeaderLoadingEvent, groupPosition);
        owner.notify(args);
        if (!args.view) {
            args.view = owner._getDefaultItemHeaderContent(groupPosition);
        }
        if (args.view) {
            if (owner._effectiveItemHeaderRowHeight > -1) {
                args.view.height = owner.itemHeaderRowHeight;
            }
            owner._prepareItemHeader(args.view, groupPosition);
            if (!args.view.parent) {
                if (args.view instanceof layout_base_1.LayoutBase &&
                    !(args.view instanceof proxy_view_container_1.ProxyViewContainer)) {
                    owner._addView(args.view);
                    convertView = args.view.nativeViewProtected;
                }
                else {
                    var sp = new stack_layout_1.StackLayout();
                    sp.addChild(args.view);
                    owner._addView(sp);
                    convertView = sp.nativeViewProtected;
                }
            }
            var realizedItemsForTemplateKey = owner._realizedItemHeaderTemplates.get(template.key);
            if (!realizedItemsForTemplateKey) {
                realizedItemsForTemplateKey = new Map();
                owner._realizedItemHeaderTemplates.set(template.key, realizedItemsForTemplateKey);
            }
            realizedItemsForTemplateKey.set(convertView, args.view);
            owner._realizedItems.set(convertView, args.view);
        }
        return convertView;
    };
    AccordionListAdapter.prototype.getGroupCount = function () {
        var owner = this.owner ? this.owner.get() : null;
        return owner.items && owner.items.length ? owner.items.length : 0;
    };
    AccordionListAdapter.prototype.getChildView = function (groupPosition, childPosition, isLastChild, convertView, parent) {
        var owner = this.owner ? this.owner.get() : null;
        if (!owner) {
            return null;
        }
        var totalItemCount = (owner.items ? owner.items.length : 0) + (owner._getHasHeader() ? 1 : 0) + (owner._getHasFooter() ? 1 : 0);
        if (groupPosition === (totalItemCount - 1)) {
            owner.notify({ eventName: accordion_common_1.AccordionBase.loadMoreItemsEvent, object: owner });
        }
        if (childPosition === 0 && owner._getHasHeader()) {
            var template_1 = owner._getHeaderTemplate(groupPosition);
            var view_1;
            if (convertView) {
                var cachedHeader = owner._realizedHeaderTemplates.get(template_1.key);
                view_1 = cachedHeader ? cachedHeader.get(convertView) : null;
                if (!view_1) {
                    view_1 = template_1.createView();
                }
            }
            else {
                view_1 = template_1.createView();
            }
            var args_1 = notifyForHeaderOrFooterAtIndex(owner, view_1 ? view_1.nativeView : null, view_1, accordion_common_1.AccordionBase.headerLoadingEvent, groupPosition);
            owner.notify(args_1);
            if (!args_1.view) {
                args_1.view = owner._getDefaultHeaderContent(groupPosition);
            }
            if (args_1.view) {
                if (owner._effectiveHeaderRowHeight > -1) {
                    args_1.view.height = owner.footerRowHeight;
                }
                owner._prepareHeaderItem(args_1.view, groupPosition);
                if (!args_1.view.parent) {
                    if (args_1.view instanceof layout_base_1.LayoutBase &&
                        !(args_1.view instanceof proxy_view_container_1.ProxyViewContainer)) {
                        owner._addView(args_1.view);
                        convertView = args_1.view.nativeViewProtected;
                    }
                    else {
                        var sp = new stack_layout_1.StackLayout();
                        sp.addChild(args_1.view);
                        owner._addView(sp);
                        convertView = sp.nativeViewProtected;
                    }
                }
                var realizedItemsForTemplateKey = owner._realizedHeaderTemplates.get(template_1.key);
                if (!realizedItemsForTemplateKey) {
                    realizedItemsForTemplateKey = new Map();
                    owner._realizedHeaderTemplates.set(template_1.key, realizedItemsForTemplateKey);
                }
                realizedItemsForTemplateKey.set(convertView, args_1.view);
                owner._realizedItems.set(convertView, args_1.view);
            }
            return convertView;
        }
        if (isLastChild && owner._getHasFooter()) {
            var template_2 = owner._getFooterTemplate(groupPosition);
            var view_2;
            if (convertView) {
                var cachedFooter = owner._realizedFooterTemplates.get(template_2.key);
                view_2 = cachedFooter ? cachedFooter.get(convertView) : null;
                if (!view_2) {
                    view_2 = template_2.createView();
                }
            }
            else {
                view_2 = template_2.createView();
            }
            var args_2 = notifyForHeaderOrFooterAtIndex(owner, view_2 ? view_2.nativeView : null, view_2, accordion_common_1.AccordionBase.footerLoadingEvent, groupPosition);
            owner.notify(args_2);
            if (!args_2.view) {
                args_2.view = owner._getDefaultFooterContent(groupPosition);
            }
            if (args_2.view) {
                if (owner._effectiveFooterRowHeight > -1) {
                    args_2.view.height = owner.itemContentRowHeight;
                }
                owner._prepareFooterItem(args_2.view, groupPosition);
                if (!args_2.view.parent) {
                    if (args_2.view instanceof layout_base_1.LayoutBase &&
                        !(args_2.view instanceof proxy_view_container_1.ProxyViewContainer)) {
                        owner._addView(args_2.view);
                        convertView = args_2.view.nativeViewProtected;
                    }
                    else {
                        var sp = new stack_layout_1.StackLayout();
                        sp.addChild(args_2.view);
                        owner._addView(sp);
                        convertView = sp.nativeViewProtected;
                    }
                }
                var realizedItemsForTemplateKey = owner._realizedFooterTemplates.get(template_2.key);
                if (!realizedItemsForTemplateKey) {
                    realizedItemsForTemplateKey = new Map();
                    owner._realizedFooterTemplates.set(template_2.key, realizedItemsForTemplateKey);
                }
                realizedItemsForTemplateKey.set(convertView, args_2.view);
                owner._realizedItems.set(convertView, args_2.view);
            }
            return convertView;
        }
        var template = owner._getItemContentTemplate(groupPosition, childPosition);
        var view;
        if (convertView) {
            var cacheContent = owner._realizedItemContentTemplates.get(template.key);
            view = cacheContent ? cacheContent.get(convertView) : null;
            if (!view) {
                view = template.createView();
            }
        }
        else {
            view = template.createView();
        }
        var args = notifyForItemAtIndex(owner, view ? view.nativeView : null, view, accordion_common_1.AccordionBase.itemContentLoadingEvent, groupPosition, (childPosition - (owner._getHasHeader() ? 1 : 0)));
        owner.notify(args);
        if (!args.view) {
            args.view = owner._getDefaultItemContentContent(groupPosition, childPosition);
        }
        if (args.view) {
            if (owner._effectiveItemContentRowHeight > -1) {
                args.view.height = owner.itemContentRowHeight;
            }
            owner._prepareItemContent(args.view, groupPosition, childPosition);
            if (!args.view.parent) {
                if (args.view instanceof layout_base_1.LayoutBase &&
                    !(args.view instanceof proxy_view_container_1.ProxyViewContainer)) {
                    owner._addView(args.view);
                    convertView = args.view.nativeViewProtected;
                }
                else {
                    var sp = new stack_layout_1.StackLayout();
                    sp.addChild(args.view);
                    owner._addView(sp);
                    convertView = sp.nativeViewProtected;
                }
            }
            var realizedItemsForTemplateKey = owner._realizedItemContentTemplates.get(template.key);
            if (!realizedItemsForTemplateKey) {
                realizedItemsForTemplateKey = new Map();
                owner._realizedItemContentTemplates.set(template.key, realizedItemsForTemplateKey);
            }
            realizedItemsForTemplateKey.set(convertView, args.view);
            owner._realizedItems.set(convertView, args.view);
        }
        return convertView;
    };
    AccordionListAdapter.prototype.getChildId = function (i, childPosition) {
        var owner = this.owner ? this.owner.get() : null;
        var item = this.getChild(i, childPosition);
        var id = parseInt("" + i + childPosition);
        if (owner && item && owner.items) {
            id = owner.childIdGenerator(item, i, childPosition, owner.items);
        }
        return long(id);
    };
    AccordionListAdapter.prototype.getChildrenCount = function (groupPosition) {
        var owner = this.owner ? this.owner.get() : null;
        if (owner && owner.items && owner._getParentData(groupPosition)) {
            if (typeof owner._getParentData(groupPosition).get === 'function') {
                return owner._getParentData(groupPosition).get(owner.childItems).length + (owner._getHasHeader() ? 1 : 0) + (owner._getHasFooter() ? 1 : 0);
            }
            else {
                return owner._getParentData(groupPosition)[owner.childItems].length + (owner._getHasHeader() ? 1 : 0) + (owner._getHasFooter() ? 1 : 0);
            }
        }
        return 0;
    };
    AccordionListAdapter.prototype.isChildSelectable = function (groupPosition, childPosition) {
        return true;
    };
    return AccordionListAdapter;
}(android.widget.BaseExpandableListAdapter));
//# sourceMappingURL=accordion.js.map