Object.defineProperty(exports, "__esModule", { value: true });
var viewModule = require("tns-core-modules/ui/core/view");
var observableArray = require("tns-core-modules/data/observable-array");
var observableModule = require("tns-core-modules/data/observable");
var weakEvents = require("tns-core-modules/ui/core/weak-event-listener");
var stackLayoutModule = require("tns-core-modules/ui/layouts/stack-layout");
var builder = require("tns-core-modules/ui/builder");
var view_1 = require("tns-core-modules/ui/core/view");
var label_1 = require("tns-core-modules/ui/label");
var builder_1 = require("tns-core-modules/ui/builder");
var color_1 = require("tns-core-modules/color");
exports.NG_VIEW = "ng_view";
var ListViewViewTypes;
(function (ListViewViewTypes) {
    ListViewViewTypes.HeaderView = "headerview";
    ListViewViewTypes.ItemView = "itemview";
    ListViewViewTypes.FooterView = "footerview";
    ListViewViewTypes.GroupView = "groupview";
    ListViewViewTypes.LoadOnDemandView = "loadondemandview";
    ListViewViewTypes.ItemSwipeView = "ItemSwipeView";
})(ListViewViewTypes = exports.ListViewViewTypes || (exports.ListViewViewTypes = {}));
var ListViewItemSnapMode;
(function (ListViewItemSnapMode) {
    ListViewItemSnapMode.Auto = "Auto";
    ListViewItemSnapMode.Start = "Start";
    ListViewItemSnapMode.End = "End";
    ListViewItemSnapMode.Center = "Center";
})(ListViewItemSnapMode = exports.ListViewItemSnapMode || (exports.ListViewItemSnapMode = {}));
var ListViewScrollDirection;
(function (ListViewScrollDirection) {
    ListViewScrollDirection.Vertical = "Vertical";
    ListViewScrollDirection.Horizontal = "Horizontal";
})(ListViewScrollDirection = exports.ListViewScrollDirection || (exports.ListViewScrollDirection = {}));
var ListViewScrollPosition;
(function (ListViewScrollPosition) {
    ListViewScrollPosition.None = "None";
    ListViewScrollPosition.Top = "Top";
    ListViewScrollPosition.CenteredVertically = "CenteredVertically";
    ListViewScrollPosition.CenteredHorizontally = "CenteredHorizontally";
    ListViewScrollPosition.Bottom = "Bottom";
    ListViewScrollPosition.Left = "Left";
    ListViewScrollPosition.Right = "Right";
})(ListViewScrollPosition = exports.ListViewScrollPosition || (exports.ListViewScrollPosition = {}));
var ListViewItemAlignment;
(function (ListViewItemAlignment) {
    ListViewItemAlignment.Stretch = "Stretch";
    ListViewItemAlignment.Left = "Left";
    ListViewItemAlignment.Center = "Center";
    ListViewItemAlignment.Right = "Right";
})(ListViewItemAlignment = exports.ListViewItemAlignment || (exports.ListViewItemAlignment = {}));
var ListViewReorderMode;
(function (ListViewReorderMode) {
    ListViewReorderMode.HoldAndDrag = "holdanddrag";
    ListViewReorderMode.Drag = "drag";
})(ListViewReorderMode = exports.ListViewReorderMode || (exports.ListViewReorderMode = {}));
var ListViewItemAnimation;
(function (ListViewItemAnimation) {
    ListViewItemAnimation.Default = "Default";
    ListViewItemAnimation.Fade = "Fade";
    ListViewItemAnimation.Scale = "Scale";
    ListViewItemAnimation.Slide = "Slide";
})(ListViewItemAnimation = exports.ListViewItemAnimation || (exports.ListViewItemAnimation = {}));
var ListViewLoadOnDemandMode;
(function (ListViewLoadOnDemandMode) {
    ListViewLoadOnDemandMode["None"] = "None";
    ListViewLoadOnDemandMode["Manual"] = "Manual";
    ListViewLoadOnDemandMode["Auto"] = "Auto";
})(ListViewLoadOnDemandMode = exports.ListViewLoadOnDemandMode || (exports.ListViewLoadOnDemandMode = {}));
var ListViewSelectionBehavior;
(function (ListViewSelectionBehavior) {
    ListViewSelectionBehavior.None = "None";
    ListViewSelectionBehavior.Press = "Press";
    ListViewSelectionBehavior.LongPress = "LongPress";
})(ListViewSelectionBehavior = exports.ListViewSelectionBehavior || (exports.ListViewSelectionBehavior = {}));
var PullToRefreshStyle = /** @class */ (function (_super) {
    __extends(PullToRefreshStyle, _super);
    function PullToRefreshStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PullToRefreshStyle.prototype.onIndicatorColorPropertyChanged = function (oldValue, newValue) {
    };
    PullToRefreshStyle.prototype.onIndicatorBackgroundColorPropertyChanged = function (oldValue, newValue) {
    };
    PullToRefreshStyle.indicatorColorProperty = new view_1.Property({
        name: "indicatorColor",
        defaultValue: undefined,
        valueConverter: function (value) { return new color_1.Color(value); },
        valueChanged: function (target, oldValue, newValue) {
            target.onIndicatorColorPropertyChanged(oldValue, newValue);
        }
    });
    PullToRefreshStyle.indicatorBackgroundColorProperty = new view_1.Property({
        name: "indicatorBackgroundColor",
        defaultValue: undefined,
        valueConverter: function (value) { return new color_1.Color(value); },
        valueChanged: function (target, oldValue, newValue) {
            target.onIndicatorBackgroundColorPropertyChanged(oldValue, newValue);
        }
    });
    return PullToRefreshStyle;
}(viewModule.ViewBase));
exports.PullToRefreshStyle = PullToRefreshStyle;
PullToRefreshStyle.indicatorColorProperty.register(PullToRefreshStyle);
PullToRefreshStyle.indicatorBackgroundColorProperty.register(PullToRefreshStyle);
var ReorderHandle = /** @class */ (function (_super) {
    __extends(ReorderHandle, _super);
    function ReorderHandle() {
        return _super.call(this) || this;
    }
    return ReorderHandle;
}(stackLayoutModule.StackLayout));
exports.ReorderHandle = ReorderHandle;
var ListViewScrollEventData = /** @class */ (function () {
    function ListViewScrollEventData() {
    }
    Object.defineProperty(ListViewScrollEventData.prototype, "object", {
        get: function () {
            return this._object;
        },
        set: function (value) {
            this._object = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewScrollEventData.prototype, "eventName", {
        get: function () {
            return this._eventName;
        },
        set: function (value) {
            this._eventName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewScrollEventData.prototype, "scrollOffset", {
        get: function () {
            return this._scrollOffset;
        },
        set: function (value) {
            this._scrollOffset = value;
        },
        enumerable: true,
        configurable: true
    });
    return ListViewScrollEventData;
}());
exports.ListViewScrollEventData = ListViewScrollEventData;
var ListViewEventData = /** @class */ (function () {
    function ListViewEventData() {
    }
    Object.defineProperty(ListViewEventData.prototype, "android", {
        get: function () {
            return this._android;
        },
        set: function (value) {
            this._android = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewEventData.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        set: function (value) {
            this._ios = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewEventData.prototype, "eventName", {
        get: function () {
            return this._eventName;
        },
        set: function (value) {
            this._eventName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewEventData.prototype, "object", {
        get: function () {
            return this._object;
        },
        set: function (value) {
            this._object = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewEventData.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (value) {
            this._index = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewEventData.prototype, "groupIndex", {
        get: function () {
            return this._groupIndex;
        },
        set: function (value) {
            this._groupIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewEventData.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewEventData.prototype, "returnValue", {
        get: function () {
            return this._returnValue;
        },
        set: function (value) {
            this._returnValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewEventData.prototype, "view", {
        get: function () {
            return this._view;
        },
        set: function (value) {
            this._view = value;
        },
        enumerable: true,
        configurable: true
    });
    return ListViewEventData;
}());
exports.ListViewEventData = ListViewEventData;
var LoadOnDemandListViewEventData = /** @class */ (function (_super) {
    __extends(LoadOnDemandListViewEventData, _super);
    function LoadOnDemandListViewEventData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LoadOnDemandListViewEventData;
}(ListViewEventData));
exports.LoadOnDemandListViewEventData = LoadOnDemandListViewEventData;
var SwipeActionsEventData = /** @class */ (function (_super) {
    __extends(SwipeActionsEventData, _super);
    function SwipeActionsEventData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SwipeActionsEventData.prototype, "mainView", {
        get: function () {
            return this._mainView;
        },
        set: function (value) {
            this._mainView = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwipeActionsEventData.prototype, "swipeView", {
        get: function () {
            return this._swipeView;
        },
        set: function (value) {
            this._swipeView = value;
        },
        enumerable: true,
        configurable: true
    });
    return SwipeActionsEventData;
}(ListViewEventData));
exports.SwipeActionsEventData = SwipeActionsEventData;
var ListViewLayoutBase = /** @class */ (function (_super) {
    __extends(ListViewLayoutBase, _super);
    function ListViewLayoutBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ListViewLayoutBase.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewLayoutBase.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    ListViewLayoutBase.prototype.onScrollDirectionPropertyChanged = function (oldValue, newValue) {
        this.onScrollDirectionChanged(oldValue, newValue);
    };
    ListViewLayoutBase.prototype.onScrollDirectionChanged = function (oldValue, newValue) {
    };
    ListViewLayoutBase.prototype.onItemInsertAnimationPropertyChanged = function (oldValue, newValue) {
        this.onItemInsertAnimationChanged(oldValue, newValue);
    };
    ListViewLayoutBase.prototype.onItemInsertAnimationChanged = function (oldValue, newValue) {
    };
    ListViewLayoutBase.prototype.onItemDeleteAnimationPropertyChanged = function (oldValue, newValue) {
        this.onItemDeleteAnimationChanged(oldValue, newValue);
    };
    ListViewLayoutBase.prototype.onItemDeleteAnimationChanged = function (oldValue, newValue) {
    };
    ListViewLayoutBase.prototype.onItemWidthPropertyChanged = function (oldValue, newValue) {
        this.onItemWidthChanged(oldValue, newValue);
    };
    ListViewLayoutBase.prototype.onItemWidthChanged = function (oldValue, newValue) {
    };
    ListViewLayoutBase.prototype.onItemHeightPropertyChanged = function (oldValue, newValue) {
        this.onItemHeightChanged(oldValue, newValue);
    };
    ListViewLayoutBase.prototype.onItemHeightChanged = function (oldValue, newValue) {
    };
    ListViewLayoutBase.prototype._onOwnerUICreated = function () {
    };
    ListViewLayoutBase.scrollDirectionProperty = new view_1.Property({
        name: "scrollDirection",
        defaultValue: ListViewScrollDirection.Vertical,
        valueChanged: function (target, oldValue, newValue) {
            target.onScrollDirectionPropertyChanged(oldValue, newValue);
        },
    });
    ListViewLayoutBase.itemInsertAnimationProperty = new view_1.Property({
        name: "itemInsertAnimation",
        defaultValue: ListViewItemAnimation.Default,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemInsertAnimationPropertyChanged(oldValue, newValue);
        },
    });
    ListViewLayoutBase.itemDeleteAnimationProperty = new view_1.Property({
        name: "itemDeleteAnimation",
        defaultValue: ListViewItemAnimation.Default,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemDeleteAnimationPropertyChanged(oldValue, newValue);
        },
    });
    ListViewLayoutBase.itemWidthProperty = new view_1.Property({
        name: "itemWidth",
        defaultValue: undefined,
        valueConverter: parseInt,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemWidthPropertyChanged(oldValue, newValue);
        },
    });
    ListViewLayoutBase.itemHeightProperty = new view_1.Property({
        name: "itemHeight",
        defaultValue: undefined,
        valueConverter: parseInt,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemHeightPropertyChanged(oldValue, newValue);
        },
    });
    return ListViewLayoutBase;
}(viewModule.ViewBase));
exports.ListViewLayoutBase = ListViewLayoutBase;
ListViewLayoutBase.scrollDirectionProperty.register(ListViewLayoutBase);
ListViewLayoutBase.itemInsertAnimationProperty.register(ListViewLayoutBase);
ListViewLayoutBase.itemDeleteAnimationProperty.register(ListViewLayoutBase);
ListViewLayoutBase.itemWidthProperty.register(ListViewLayoutBase);
ListViewLayoutBase.itemHeightProperty.register(ListViewLayoutBase);
function listViewLoadOnDemandModeConverter(value) {
    return ListViewLoadOnDemandMode[value];
}
var RadListView = /** @class */ (function (_super) {
    __extends(RadListView, _super);
    function RadListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._hasGroupingFunctionChanged = false;
        _this._isEventListenerAttached = false;
        _this._defaultTemplate = {
            key: "default",
            createView: function () {
                if (_this.itemTemplate) {
                    return builder_1.parse(_this.itemTemplate, _this);
                }
                return undefined;
            }
        };
        _this._itemTemplatesInternal = new Array(_this._defaultTemplate);
        _this._dataUpdatesSuspended = false;
        _this._itemTemplateSelectorBindable = new label_1.Label();
        return _this;
    }
    RadListView.prototype.onLoaded = function () {
        if (this.items && this.items instanceof observableModule.Observable) {
            weakEvents.addWeakEventListener(this.items, observableArray.ObservableArray.changeEvent, this.onSourceCollectionChangedInternal, this);
            this._isEventListenerAttached = true;
        }
        _super.prototype.onLoaded.call(this);
    };
    RadListView.prototype.onUnloaded = function () {
        if (this._isEventListenerAttached) {
            weakEvents.removeWeakEventListener(this.items, observableArray.ObservableArray.changeEvent, this.onSourceCollectionChangedInternal, this);
            this._isEventListenerAttached = false;
        }
        _super.prototype.onUnloaded.call(this);
    };
    Object.defineProperty(RadListView.prototype, "itemViewLoader", {
        get: function () {
            return this._itemViewLoader;
        },
        set: function (value) {
            if (this._itemViewLoader !== value) {
                this._itemViewLoader = value;
                this.onItemViewLoaderChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListView.prototype, "itemViewDisposer", {
        get: function () {
            return this._itemViewDisposer;
        },
        set: function (value) {
            if (this._itemViewDisposer !== value) {
                this._itemViewDisposer = value;
                this.onItemViewDisposerChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListView.prototype, "nativeScriptViewAdded", {
        get: function () {
            return this._nativeScriptViewAdded;
        },
        set: function (value) {
            if (this._nativeScriptViewAdded !== value) {
                this._nativeScriptViewAdded = value;
                this.onNativeScriptViewAddedChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListView.prototype, "isDataOperationsEnabled", {
        get: function () {
            var isFilteringEnabled = this.filteringFunction !== undefined ? true : false;
            var isSortingEnabled = this.sortingFunction !== undefined ? true : false;
            var isGroupingEnabled = this.groupingFunction !== undefined ? true : false;
            return isFilteringEnabled || isSortingEnabled || isGroupingEnabled;
        },
        enumerable: true,
        configurable: true
    });
    RadListView.prototype._reorderItemInSource = function (oldPosition, newPosition) {
        this.suspendUpdates();
        var ownerSource = this.items;
        var item = this.getItemAtIndex(oldPosition);
        ownerSource.splice(oldPosition, 1);
        ownerSource.splice(newPosition, 0, item);
        this.resumeUpdates(false);
    };
    RadListView.prototype.suspendUpdates = function () {
        this._dataUpdatesSuspended = true;
    };
    RadListView.prototype.resumeUpdates = function (refresh) {
        this._dataUpdatesSuspended = false;
        if (refresh === true) {
            this.refresh();
        }
    };
    RadListView.prototype.updatesSuspended = function () {
        return this._dataUpdatesSuspended;
    };
    RadListView.prototype.getItemAtIndex = function (index) {
        if (this.items && this.items.getItem) {
            return this.items.getItem(index);
        }
        return this.items[index];
    };
    RadListView.prototype.getIndexOf = function (item) {
        if (this.items && this.items.indexOf) {
            return this.items.indexOf(item);
        }
        console.log("Error: Cannot retrieve the index of '" + item + "'. Make sure that 'items' is set correctly.");
        return -1;
    };
    RadListView.prototype.selectItemAt = function (index) {
    };
    RadListView.prototype.deselectItemAt = function (index) {
    };
    RadListView.prototype.selectAll = function () {
        if (!this.multipleSelection) {
            throw new Error('Select all cannot be called unless multipleSelection is set to be true');
        }
    };
    RadListView.prototype.deselectAll = function () {
    };
    RadListView.prototype.isItemSelected = function (item) {
        return false;
    };
    RadListView.prototype.getSelectedItems = function () {
        return new Array();
    };
    RadListView.prototype.getViewForItem = function (item) {
        return null;
    };
    RadListView.prototype.resolveTemplateView = function (template) {
        return builder.parse(template, this);
    };
    RadListView.prototype.getViewForViewType = function (viewType, templateKey) {
        var newView = undefined;
        if (templateKey) {
            var template = this.getTemplateFromSelector(templateKey);
            newView = template.createView();
        }
        if (!newView && this._itemViewLoader !== undefined) {
            newView = this._itemViewLoader(viewType);
        }
        if (newView) {
            return newView;
        }
        var templateString = undefined;
        switch (viewType) {
            case ListViewViewTypes.ItemView:
                templateString = this.itemTemplate;
                if (templateString === undefined) {
                    return this._getDefaultItemContent();
                }
                break;
            case ListViewViewTypes.ItemSwipeView:
                templateString = this.itemSwipeTemplate;
                break;
            case ListViewViewTypes.LoadOnDemandView:
                templateString = this.loadOnDemandItemTemplate;
                break;
            case ListViewViewTypes.HeaderView: {
                templateString = this.headerItemTemplate;
                break;
            }
            case ListViewViewTypes.GroupView:
                if (this.groupingFunction) {
                    templateString = this.groupTemplate;
                    if (templateString === undefined) {
                        return this._getDefaultGroupContent();
                    }
                }
                break;
            case ListViewViewTypes.FooterView:
                templateString = this.footerItemTemplate;
                break;
        }
        return templateString === undefined ? undefined : this.resolveTemplateView(templateString);
    };
    RadListView.prototype.onGroupingFunctionPropertyChanged = function (oldValue, newValue) {
        this.onGroupingFunctionChanged(oldValue, newValue);
    };
    RadListView.prototype.onFilteringFunctionPropertyChanged = function (oldValue, newValue) {
        this.onFilteringFunctionChanged(oldValue, newValue);
    };
    RadListView.prototype.onSortingFunctionPropertyChanged = function (oldValue, newValue) {
        this.onSortingFunctionChanged(oldValue, newValue);
    };
    RadListView.prototype.onEnableCollapsibleGroupsPropertyChanged = function (oldValue, newValue) {
        this.onEnableCollapsibleGroupsChanged(oldValue, newValue);
    };
    RadListView.prototype._getDefaultItemContent = function () {
        var lbl = new label_1.Label();
        lbl.bind({
            targetProperty: "text",
            sourceProperty: "$value"
        });
        return lbl;
    };
    RadListView.prototype._getDefaultGroupContent = function () {
        var parentStack = new stackLayoutModule.StackLayout();
        var lbl = new label_1.Label();
        lbl.bind({
            targetProperty: "text",
            sourceProperty: "$value.category"
        });
        lbl.height = 50;
        lbl.backgroundColor = "white";
        lbl.padding = 15;
        parentStack.addChild(lbl);
        return parentStack;
    };
    RadListView.prototype.getTemplateFromSelector = function (templateKey) {
        for (var i = 0, length_1 = this._itemTemplatesInternal.length; i < length_1; i++) {
            if (this._itemTemplatesInternal[i].key.toLowerCase() === templateKey.toLowerCase()) {
                return this._itemTemplatesInternal[i];
            }
        }
        // This is the default template
        return this._itemTemplatesInternal[0];
    };
    RadListView.prototype.onPullToRefreshStylePropertyChanged = function (oldValue, newValue) {
        this.onPullToRefreshStyleChanged(oldValue, newValue);
    };
    RadListView.prototype.onHeaderItemTemplatePropertyChanged = function (oldValue, newValue) {
        this.onHeaderItemTemplateChanged(oldValue, newValue);
    };
    RadListView.prototype.onFooterItemTemplatePropertyChanged = function (oldValue, newValue) {
        this.onFooterItemTemplateChanged(oldValue, newValue);
    };
    RadListView.prototype.onLoadOnDemandItemTemplatePropertyChanged = function (oldValue, newValue) {
        this.onLoadOnDemandItemTemplateChanged(oldValue, newValue);
    };
    RadListView.prototype.onListViewReorderModePropertyChanged = function (oldValue, newValue) {
        this.onReorderModeChanged(oldValue, newValue);
    };
    RadListView.prototype.onLayoutPropertyChanged = function (oldValue, newValue) {
        this.onListViewLayoutChanged(oldValue, newValue);
    };
    RadListView.prototype.onItemTemplateSelectorPropertyChanged = function (oldValue, newValue) {
        this.onItemTemplateSelectorChanged(oldValue, newValue);
    };
    RadListView.prototype.onItemTemplatesPropertyChanged = function (oldValue, newValue) {
        this.onItemTemplatesChanged(oldValue, newValue);
    };
    RadListView.prototype.onItemTemplatePropertyChanged = function (oldValue, newValue) {
        this.onItemTemplateChanged(oldValue, newValue);
    };
    RadListView.prototype.onGroupTemplatePropertyChanged = function (oldValue, newValue) {
        this.onGroupTemplateChanged(oldValue, newValue);
    };
    RadListView.prototype.onItemSwipeTemplatePropertyChanged = function (oldValue, newValue) {
        this.onItemSwipeTemplateChanged(oldValue, newValue);
    };
    RadListView.prototype.onMultipleSelectionPropertyChanged = function (oldValue, newValue) {
        this.onMultipleSelectionChanged(oldValue, newValue);
    };
    RadListView.prototype.onItemReorderPropertyChanged = function (oldValue, newValue) {
        this.onItemReorderChanged(oldValue, newValue);
    };
    RadListView.prototype.onItemSwipePropertyChanged = function (oldValue, newValue) {
        this.onItemSwipeChanged(oldValue, newValue);
    };
    RadListView.prototype.onSwipeActionsPropertyChanged = function (oldValue, newValue) {
        this.onSwipeActionsChanged(oldValue, newValue);
    };
    RadListView.prototype.onPullToRefreshPropertyChanged = function (oldValue, newValue) {
        this.onPullToRefreshChanged(oldValue, newValue);
    };
    RadListView.prototype.onLoadOnDemandModePropertyChanged = function (oldValue, newValue) {
        this.onLoadOnDemandModeChanged(oldValue, newValue);
    };
    RadListView.prototype.onLoadOnDemandBufferSizePropertyChanged = function (oldValue, newValue) {
        this.onLoadOnDemandBufferSizeChanged(oldValue, newValue);
    };
    RadListView.prototype.onSelectionBehaviorPropertyChanged = function (oldValue, newValue) {
        this.onSelectionBehaviorChanged(oldValue, newValue);
    };
    RadListView.prototype.onItemsPropertyChanged = function (oldValue, newValue) {
        this.onItemsChanged(oldValue, newValue);
    };
    RadListView.prototype.onScrollPositionPropertyChanged = function (oldValue, newValue) {
        this.onScrollPositionChanged(oldValue, newValue);
    };
    RadListView.prototype.onItemViewLoaderChanged = function () {
    };
    RadListView.prototype.onItemViewDisposerChanged = function () {
    };
    RadListView.prototype.onNativeScriptViewAddedChanged = function () {
    };
    RadListView.prototype.onGroupingFunctionChanged = function (oldValue, newValue) {
        this._hasGroupingFunctionChanged = true;
    };
    RadListView.prototype.onFilteringFunctionChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onSortingFunctionChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onEnableCollapsibleGroupsChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onPullToRefreshStyleChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onHeaderItemTemplateChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onFooterItemTemplateChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onLoadOnDemandItemTemplateChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onReorderModeChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onListViewLayoutChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onItemTemplateSelectorChanged = function (oldValue, newValue) {
        var _this = this;
        if (typeof newValue === "string") {
            this._itemTemplateSelectorBindable.bind({
                sourceProperty: null,
                targetProperty: "templateKey",
                expression: newValue
            });
            this.itemTemplateSelector = function (item, index, items) {
                item["$index"] = index;
                _this._itemTemplateSelectorBindable.bindingContext = item;
                return _this._itemTemplateSelectorBindable.get("templateKey");
            };
        }
        else if (typeof newValue === "function") {
            this.itemTemplateSelector = newValue;
        }
    };
    RadListView.prototype.onItemTemplatesChanged = function (oldValue, newValue) {
        this._itemTemplatesInternal = new Array(this._defaultTemplate);
        var newKeyedTemplates = newValue;
        if (newKeyedTemplates) {
            this._itemTemplatesInternal = this._itemTemplatesInternal.concat(newKeyedTemplates);
        }
    };
    RadListView.prototype.onItemTemplateChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onGroupTemplateChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onItemSwipeTemplateChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onMultipleSelectionChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onItemReorderChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onItemSwipeChanged = function (oldValue, newValue) {
        console.log("Warning: 'itemSwipe' property is deprecated use 'swipeActions' property instead.");
    };
    RadListView.prototype.onSwipeActionsChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onPullToRefreshChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onLoadOnDemandModeChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onLoadOnDemandBufferSizeChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onSelectionBehaviorChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onSourceCollectionChangedInternal = function (args) {
        if (this._dataUpdatesSuspended === false) {
            this.onSourceCollectionChanged(args);
        }
    };
    RadListView.prototype.onItemsChangedInternal = function (oldValue, newValue) {
        if (!this.isLoaded) {
            return;
        }
        if (oldValue instanceof observableModule.Observable) {
            weakEvents.removeWeakEventListener(oldValue, observableArray.ObservableArray.changeEvent, this.onSourceCollectionChangedInternal, this);
            this._isEventListenerAttached = false;
        }
        if (newValue instanceof observableModule.Observable) {
            weakEvents.addWeakEventListener(newValue, observableArray.ObservableArray.changeEvent, this.onSourceCollectionChangedInternal, this);
            this._isEventListenerAttached = true;
        }
        this.refresh();
    };
    RadListView.prototype.onItemsChanged = function (oldValue, newValue) {
        this.onItemsChangedInternal(oldValue, newValue);
    };
    RadListView.prototype.onScrollPositionChanged = function (oldValue, newValue) {
    };
    RadListView.prototype.onSourceCollectionChanged = function (data) {
        this.refresh();
    };
    RadListView.prototype.refresh = function () {
    };
    RadListView.prototype.updateHeaderFooter = function () {
    };
    RadListView.prototype.getScrollOffset = function () {
        return 0;
    };
    RadListView.prototype.scrollToIndex = function (index, animate, snapMode) {
        if (animate === void 0) { animate = false; }
        if (snapMode === void 0) { snapMode = ListViewItemSnapMode.Auto; }
    };
    RadListView.prototype.scrollWithAmount = function (amount, animate) {
    };
    RadListView.prototype.notifyLoadOnDemandFinished = function (disableLoadOnDemand) {
    };
    RadListView.prototype.notifyPullToRefreshFinished = function () {
    };
    RadListView.prototype.notifySwipeToExecuteFinished = function () {
    };
    // TODO: get rid of such hacks. This is from code modules ListView implementation
    RadListView.knownFunctions = ["itemTemplateSelector"];
    RadListView.scrolledEvent = "scrolled";
    RadListView.scrollDragEndedEvent = "scrollDragEnded";
    RadListView.scrollStartedEvent = "scrollStarted";
    RadListView.scrollEndedEvent = "scrollEnded";
    RadListView.itemSelectingEvent = "itemSelecting";
    RadListView.itemDeselectingEvent = "itemDeselecting";
    RadListView.itemTapEvent = "itemTap";
    RadListView.itemHoldEvent = "itemHold";
    RadListView.itemSelectedEvent = "itemSelected";
    RadListView.itemDeselectedEvent = "itemDeselected";
    RadListView.itemReorderStartingEvent = "itemReorderStarting";
    RadListView.itemReorderedEvent = "itemReordered";
    RadListView.itemReorderStartedEvent = "itemReorderStarted";
    RadListView.itemSwipingEvent = "itemSwiping";
    RadListView.itemSwipeProgressChangedEvent = "itemSwipeProgressChanged";
    RadListView.itemSwipeProgressStartedEvent = "itemSwipeProgressStarted";
    RadListView.itemSwipeProgressEndedEvent = "itemSwipeProgressEnded";
    RadListView.loadMoreDataRequestedEvent = "loadMoreDataRequested";
    RadListView.pullToRefreshInitiatedEvent = "pullToRefreshInitiated";
    RadListView.itemLoadingEvent = "itemLoading";
    // Used internally by the custom Angular directives to setup the EmbeddedViewRef
    RadListView.itemLoadingInternalEvent = "itemLoadingInternal";
    RadListView.dataPopulatedEvent = "dataPopulated";
    RadListView.groupingFunctionProperty = new view_1.Property({
        name: "groupingFunction",
        valueChanged: function (target, oldValue, newValue) {
            target.onGroupingFunctionPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.filteringFunctionProperty = new view_1.Property({
        name: "filteringFunction",
        valueChanged: function (target, oldValue, newValue) {
            target.onFilteringFunctionPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.sortingFunctionProperty = new view_1.Property({
        name: "sortingFunction",
        valueChanged: function (target, oldValue, newValue) {
            target.onSortingFunctionPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.enableCollapsibleGroupsProperty = new view_1.Property({
        name: "enableCollapsibleGroups",
        defaultValue: false,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onEnableCollapsibleGroupsPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.pullToRefreshStyleProperty = new view_1.Property({
        name: "pullToRefreshStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onPullToRefreshStylePropertyChanged(oldValue, newValue);
        }
    });
    RadListView.headerItemTemplateProperty = new view_1.Property({
        name: "headerItemTemplate",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onHeaderItemTemplatePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.footerItemTemplateProperty = new view_1.Property({
        name: "footerItemTemplate",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onFooterItemTemplatePropertyChanged(oldValue, newValue);
        },
    });
    // TODO: Add valueConverter and change type
    RadListView.reorderModeProperty = new view_1.Property({
        name: "reorderMode",
        defaultValue: ListViewReorderMode.HoldAndDrag,
        valueChanged: function (target, oldValue, newValue) {
            target.onListViewReorderModePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.listViewLayoutProperty = new view_1.Property({
        name: "listViewLayout",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onLayoutPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.loadOnDemandItemTemplateProperty = new view_1.Property({
        name: "loadOnDemandItemTemplate",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onLoadOnDemandItemTemplatePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.itemTemplateSelectorProperty = new view_1.Property({
        name: "itemTemplateSelector",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemTemplateSelectorPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.itemTemplatesProperty = new view_1.Property({
        name: "itemTemplates",
        defaultValue: undefined,
        valueConverter: function (value) {
            if (typeof value === "string") {
                return builder_1.parseMultipleTemplates(value);
            }
            return value;
        },
        valueChanged: function (target, oldValue, newValue) {
            target.onItemTemplatesPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.itemTemplateProperty = new view_1.Property({
        name: "itemTemplate",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemTemplatePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.itemSwipeTemplateProperty = new view_1.Property({
        name: "itemSwipeTemplate",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemSwipeTemplatePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.groupTemplateProperty = new view_1.Property({
        name: "groupTemplate",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onGroupTemplatePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.multipleSelectionProperty = new view_1.Property({
        name: "multipleSelection",
        defaultValue: false,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onMultipleSelectionPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.itemReorderProperty = new view_1.Property({
        name: "itemReorder",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemReorderPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.itemSwipeProperty = new view_1.Property({
        name: "itemSwipe",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemSwipePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.swipeActionsProperty = new view_1.Property({
        name: "swipeActions",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onSwipeActionsPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.pullToRefreshProperty = new view_1.Property({
        name: "pullToRefresh",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onPullToRefreshPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.loadOnDemandModeProperty = new view_1.Property({
        name: "loadOnDemandMode",
        defaultValue: undefined,
        valueConverter: listViewLoadOnDemandModeConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onLoadOnDemandModePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.loadOnDemandBufferSizeProperty = new view_1.Property({
        name: "loadOnDemandBufferSize",
        defaultValue: undefined,
        valueConverter: parseInt,
        valueChanged: function (target, oldValue, newValue) {
            target.onLoadOnDemandBufferSizePropertyChanged(oldValue, newValue);
        },
    });
    RadListView.selectionBehaviorProperty = new view_1.Property({
        name: "selectionBehavior",
        defaultValue: ListViewSelectionBehavior.None,
        valueChanged: function (target, oldValue, newValue) {
            target.onSelectionBehaviorPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.itemsProperty = new view_1.Property({
        name: "items",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onItemsPropertyChanged(oldValue, newValue);
        },
    });
    RadListView.scrollPositionProperty = new view_1.Property({
        name: "scrollPosition",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onScrollPositionPropertyChanged(oldValue, newValue);
        },
    });
    return RadListView;
}(viewModule.ContainerView));
exports.RadListView = RadListView;
RadListView.enableCollapsibleGroupsProperty.register(RadListView);
RadListView.groupingFunctionProperty.register(RadListView);
RadListView.filteringFunctionProperty.register(RadListView);
RadListView.sortingFunctionProperty.register(RadListView);
RadListView.pullToRefreshStyleProperty.register(RadListView);
RadListView.headerItemTemplateProperty.register(RadListView);
RadListView.footerItemTemplateProperty.register(RadListView);
RadListView.reorderModeProperty.register(RadListView);
RadListView.listViewLayoutProperty.register(RadListView);
RadListView.loadOnDemandItemTemplateProperty.register(RadListView);
RadListView.itemTemplateSelectorProperty.register(RadListView);
RadListView.itemTemplateProperty.register(RadListView);
RadListView.groupTemplateProperty.register(RadListView);
RadListView.itemTemplatesProperty.register(RadListView);
RadListView.itemSwipeTemplateProperty.register(RadListView);
RadListView.multipleSelectionProperty.register(RadListView);
RadListView.itemReorderProperty.register(RadListView);
RadListView.itemSwipeProperty.register(RadListView);
RadListView.swipeActionsProperty.register(RadListView);
RadListView.pullToRefreshProperty.register(RadListView);
RadListView.loadOnDemandModeProperty.register(RadListView);
RadListView.loadOnDemandBufferSizeProperty.register(RadListView);
RadListView.selectionBehaviorProperty.register(RadListView);
RadListView.itemsProperty.register(RadListView);
RadListView.scrollPositionProperty.register(RadListView);
