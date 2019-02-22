"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var builder_1 = require("tns-core-modules/ui/builder");
var observable_1 = require("tns-core-modules/data/observable");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var weak_event_listener_1 = require("tns-core-modules/ui/core/weak-event-listener");
var label_1 = require("tns-core-modules/ui/label");
var platform_1 = require("tns-core-modules/platform");
var autoEffectiveRowHeight = -1;
var knownCollections;
(function (knownCollections) {
    knownCollections.items = 'items';
})(knownCollections = exports.knownCollections || (exports.knownCollections = {}));
var knownTemplates;
(function (knownTemplates) {
    knownTemplates.itemHeaderTemplate = 'itemHeaderTemplate';
    knownTemplates.itemContentTemplate = 'itemContentTemplate';
    knownTemplates.headerTemplate = 'headerTemplate';
    knownTemplates.footerTemplate = 'footerTemplate';
})(knownTemplates = exports.knownTemplates || (exports.knownTemplates = {}));
var knownMultiTemplates;
(function (knownMultiTemplates) {
    knownMultiTemplates.itemHeaderTemplates = 'itemHeaderTemplates';
    knownMultiTemplates.itemContentTemplates = 'itemContentTemplates';
    knownMultiTemplates.headerTemplates = 'headerTemplates';
    knownMultiTemplates.footerTemplates = 'footerTemplates';
})(knownMultiTemplates = exports.knownMultiTemplates || (exports.knownMultiTemplates = {}));
var AccordionBase = (function (_super) {
    __extends(AccordionBase, _super);
    function AccordionBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._allowMultiple = false;
        _this._effectiveHeaderRowHeight = autoEffectiveRowHeight;
        _this._effectiveItemHeaderRowHeight = autoEffectiveRowHeight;
        _this._effectiveItemContentRowHeight = autoEffectiveRowHeight;
        _this._effectiveFooterRowHeight = autoEffectiveRowHeight;
        _this.childItems = 'items';
        _this._itemIdGenerator = function (_item, index) { return index; };
        _this._childIdGenerator = function (_item, index) { return index; };
        _this._headerTemplateSelectorBindable = new label_1.Label();
        _this._defaultHeaderTemplate = {
            key: 'default',
            createView: function () {
                if (_this.headerTemplate) {
                    return builder_1.parse(_this.headerTemplate, _this);
                }
                return undefined;
            }
        };
        _this._headerTemplatesInternal = new Array(_this._defaultHeaderTemplate);
        _this._itemHeaderTemplateSelectorBindable = new label_1.Label();
        _this._defaultItemHeaderTemplate = {
            key: 'default',
            createView: function () {
                if (_this.itemHeaderTemplate) {
                    return builder_1.parse(_this.itemHeaderTemplate, _this);
                }
                return undefined;
            }
        };
        _this._itemHeaderTemplatesInternal = new Array(_this._defaultItemHeaderTemplate);
        _this._itemContentTemplateSelectorBindable = new label_1.Label();
        _this._defaultItemContentTemplate = {
            key: 'default',
            createView: function () {
                if (_this.itemContentTemplate) {
                    return builder_1.parse(_this.itemContentTemplate, _this);
                }
                return undefined;
            }
        };
        _this._itemContentTemplatesInternal = new Array(_this._defaultItemContentTemplate);
        _this._footerTemplateSelectorBindable = new label_1.Label();
        _this._defaultFooterTemplate = {
            key: 'default',
            createView: function () {
                if (_this.footerTemplate) {
                    return builder_1.parse(_this.footerTemplate, _this);
                }
                return undefined;
            }
        };
        _this._footerTemplatesInternal = new Array(_this._defaultFooterTemplate);
        _this._getHasHeader = function () {
            var contains = _this._headerTemplatesInternal && _this._headerTemplatesInternal.length > 1;
            return !!(_this.headerTemplate || contains);
        };
        _this._getHasFooter = function () {
            var contains = _this._footerTemplatesInternal && _this._footerTemplatesInternal.length > 1;
            return !!(_this.footerTemplate || contains);
        };
        return _this;
    }
    Object.defineProperty(AccordionBase.prototype, "itemIdGenerator", {
        get: function () {
            return this._itemIdGenerator;
        },
        set: function (generatorFn) {
            this._itemIdGenerator = generatorFn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionBase.prototype, "childIdGenerator", {
        get: function () {
            return this._itemIdGenerator;
        },
        set: function (generatorFn) {
            this._childIdGenerator = generatorFn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionBase.prototype, "headerTemplateSelector", {
        get: function () {
            return this._headerTemplateSelector;
        },
        set: function (value) {
            var _this = this;
            if (typeof value === 'string') {
                this._headerTemplateSelectorBindable.bind({
                    sourceProperty: null,
                    targetProperty: 'templateKey',
                    expression: value
                });
                this._headerTemplateSelector = function (item, index, items) {
                    item['$index'] = index;
                    _this._headerTemplateSelectorBindable.bindingContext = item;
                    return _this._headerTemplateSelectorBindable.get('templateKey');
                };
            }
            else if (typeof value === 'function') {
                this._headerTemplateSelector = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionBase.prototype, "itemHeaderTemplateSelector", {
        get: function () {
            return this._itemHeaderTemplateSelector;
        },
        set: function (value) {
            var _this = this;
            if (typeof value === 'string') {
                this._itemHeaderTemplateSelectorBindable.bind({
                    sourceProperty: null,
                    targetProperty: 'templateKey',
                    expression: value
                });
                this._itemHeaderTemplateSelector = function (item, index, items) {
                    item['$index'] = index;
                    _this._itemHeaderTemplateSelectorBindable.bindingContext = item;
                    return _this._itemHeaderTemplateSelectorBindable.get('templateKey');
                };
            }
            else if (typeof value === 'function') {
                this._itemHeaderTemplateSelector = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionBase.prototype, "itemContentTemplateSelector", {
        get: function () {
            return this._itemContentTemplateSelector;
        },
        set: function (value) {
            var _this = this;
            if (typeof value === 'string') {
                this._itemContentTemplateSelectorBindable.bind({
                    sourceProperty: null,
                    targetProperty: 'templateKey',
                    expression: value
                });
                this._itemContentTemplateSelector = function (item, parentIndex, index, items) {
                    item['$index'] = index;
                    item['$parentIndex'] = parentIndex;
                    _this._itemContentTemplateSelectorBindable.bindingContext = item;
                    return _this._itemContentTemplateSelectorBindable.get('templateKey');
                };
            }
            else if (typeof value === 'function') {
                this._itemContentTemplateSelector = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionBase.prototype, "footerTemplateSelector", {
        get: function () {
            return this._footerTemplateSelector;
        },
        set: function (value) {
            var _this = this;
            if (typeof value === 'string') {
                this._footerTemplateSelectorBindable.bind({
                    sourceProperty: null,
                    targetProperty: 'templateKey',
                    expression: value
                });
                this._footerTemplateSelector = function (item, index, items) {
                    item['$index'] = index;
                    _this._footerTemplateSelectorBindable.bindingContext = item;
                    return _this._footerTemplateSelectorBindable.get('templateKey');
                };
            }
            else if (typeof value === 'function') {
                this._footerTemplateSelector = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    AccordionBase.prototype._getHeaderTemplate = function (index) {
        var templateKey = 'default';
        if (this.headerTemplateSelector) {
            var dataItem = this._getParentData(index);
            templateKey = this._headerTemplateSelector(dataItem, index, this.items);
        }
        for (var i = 0, length_1 = this._headerTemplatesInternal.length; i < length_1; i++) {
            if (this._headerTemplatesInternal[i].key === templateKey) {
                return this._headerTemplatesInternal[i];
            }
        }
        return this._headerTemplatesInternal[0];
    };
    AccordionBase.prototype._getItemHeaderTemplate = function (index) {
        var templateKey = 'default';
        if (this.itemHeaderTemplateSelector) {
            var dataItem = this._getParentData(index);
            templateKey = this._itemHeaderTemplateSelector(dataItem, index, this.items);
        }
        for (var i = 0, length_2 = this._itemHeaderTemplatesInternal.length; i < length_2; i++) {
            if (this._itemHeaderTemplatesInternal[i].key === templateKey) {
                return this._itemHeaderTemplatesInternal[i];
            }
        }
        return this._itemHeaderTemplatesInternal[0];
    };
    AccordionBase.prototype._getItemContentTemplate = function (index, childIndex) {
        var templateKey = 'default';
        if (this.itemContentTemplateSelector) {
            var _childIndex = (platform_1.isIOS ? childIndex - 1 : childIndex);
            var dataItem = this._getChildData(index, this._getHasHeader() ? _childIndex - 1 : _childIndex);
            var items = this.items.getItem ? this.items.getItem(index)[this.childItems] : this.items[this.childItems];
            templateKey = this._itemContentTemplateSelector(dataItem, index, childIndex, items);
        }
        for (var i = 0, length_3 = this._itemContentTemplatesInternal.length; i < length_3; i++) {
            if (this._itemContentTemplatesInternal[i].key === templateKey) {
                return this._itemContentTemplatesInternal[i];
            }
        }
        return this._itemContentTemplatesInternal[0];
    };
    AccordionBase.prototype._getFooterTemplate = function (index) {
        var templateKey = 'default';
        if (this.footerTemplateSelector) {
            var dataItem = this._getParentData(index);
            templateKey = this._footerTemplateSelector(dataItem, index, this.items);
        }
        for (var i = 0, length_4 = this._footerTemplatesInternal.length; i < length_4; i++) {
            if (this._footerTemplatesInternal[i].key === templateKey) {
                return this._footerTemplatesInternal[i];
            }
        }
        return this._footerTemplatesInternal[0];
    };
    AccordionBase.prototype._getDefaultHeaderContent = function (index) {
        var lbl = new label_1.Label();
        lbl.bind({
            targetProperty: 'text',
            sourceProperty: '$value'
        });
        return lbl;
    };
    AccordionBase.prototype._getDefaultItemHeaderContent = function (index) {
        var lbl = new label_1.Label();
        lbl.bind({
            targetProperty: 'text',
            sourceProperty: '$value'
        });
        return lbl;
    };
    AccordionBase.prototype._getDefaultItemContentContent = function (index, childIndex) {
        var lbl = new label_1.Label();
        lbl.bind({
            targetProperty: 'text',
            sourceProperty: '$value'
        });
        return lbl;
    };
    AccordionBase.prototype._getDefaultFooterContent = function (index) {
        var lbl = new label_1.Label();
        lbl.bind({
            targetProperty: 'text',
            sourceProperty: '$value'
        });
        return lbl;
    };
    AccordionBase.prototype._prepareHeaderItem = function (item, index) {
        if (item) {
            item.bindingContext = this._getParentData(index);
        }
    };
    AccordionBase.prototype._prepareItemHeader = function (item, index) {
        if (item) {
            item.bindingContext = this._getParentData(index);
        }
    };
    AccordionBase.prototype._prepareItemContent = function (item, index, childIndex) {
        if (item) {
            item.bindingContext = this._getChildData(index, childIndex);
        }
    };
    AccordionBase.prototype._prepareFooterItem = function (item, index) {
        if (item) {
            item.bindingContext = this._getParentData(index);
        }
    };
    AccordionBase.prototype._onHeaderRowHeightPropertyChanged = function (oldValue, newValue) {
        this.refresh();
    };
    AccordionBase.prototype._onItemHeaderRowHeightPropertyChanged = function (oldValue, newValue) {
        this.refresh();
    };
    AccordionBase.prototype._onItemContentRowHeightPropertyChanged = function (oldValue, newValue) {
        this.refresh();
    };
    AccordionBase.prototype._onFooterRowHeightPropertyChanged = function (oldValue, newValue) {
        this.refresh();
    };
    AccordionBase.prototype.updateEffectiveItemHeaderRowHeight = function () {
        exports.itemHeaderRowHeightProperty.coerce(this);
    };
    AccordionBase.prototype.updateEffectiveItemContentRowHeight = function () {
        exports.itemContentRowHeightProperty.coerce(this);
    };
    AccordionBase.prototype._getParentData = function (parentIndex) {
        var items = this.items;
        return items.getItem ? items.getItem(parentIndex) : items[parentIndex];
    };
    AccordionBase.prototype._getChildData = function (parentIndex, childIndex) {
        var items = this.items;
        return items.getItem ? items.getItem(parentIndex)[this.childItems][childIndex] : items[parentIndex][this.childItems][childIndex];
    };
    Object.defineProperty(AccordionBase.prototype, "allowMultiple", {
        get: function () {
            return this._allowMultiple;
        },
        set: function (value) {
            this._allowMultiple = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionBase.prototype, "separatorColor", {
        get: function () {
            return this.style.separatorColor;
        },
        set: function (value) {
            this.style.separatorColor = value;
        },
        enumerable: true,
        configurable: true
    });
    AccordionBase.prototype._onItemsChanged = function (args) {
        this.refresh();
    };
    AccordionBase.headerLoadingEvent = 'headerLoading';
    AccordionBase.footerLoadingEvent = 'footerLoading';
    AccordionBase.itemHeaderLoadingEvent = 'itemHeaderLoading';
    AccordionBase.itemContentLoadingEvent = 'itemContentLoading';
    AccordionBase.itemHeaderTapEvent = 'itemHeaderTap';
    AccordionBase.itemContentTapEvent = 'itemContentTap';
    AccordionBase.loadMoreItemsEvent = 'loadMoreItems';
    AccordionBase.selectedIndexesChangedEvent = 'selectedIndexesChanged';
    AccordionBase.knownFunctions = ['itemHeaderTemplateSelector', 'itemContentTemplateSelector', 'headerTemplateSelector',
        'footerTemplateSelector', 'itemIdGenerator', 'childIdGenerator'];
    AccordionBase = __decorate([
        view_1.CSSType('Accordion')
    ], AccordionBase);
    return AccordionBase;
}(view_1.ContainerView));
exports.AccordionBase = AccordionBase;
exports.separatorColorProperty = new view_1.CssProperty({
    name: 'separatorColor',
    cssName: 'separator-color',
    valueConverter: function (v) { return String(v); }
});
exports.separatorColorProperty.register(view_1.Style);
exports.headerTemplateProperty = new view_1.Property({
    name: 'headerTemplate',
    affectsLayout: true,
    valueChanged: function (target) {
        target.refresh();
    }
});
exports.headerTemplateProperty.register(AccordionBase);
exports.headerTemplatesProperty = new view_1.Property({
    name: 'headerTemplates', valueConverter: function (value) {
        if (typeof value === 'string') {
            return builder_1.parseMultipleTemplates(value);
        }
        return value;
    }
});
exports.headerTemplatesProperty.register(AccordionBase);
exports.itemHeaderTemplateProperty = new view_1.Property({
    name: 'itemHeaderTemplate',
    affectsLayout: true,
    valueChanged: function (target) {
        target.refresh();
    }
});
exports.itemHeaderTemplateProperty.register(AccordionBase);
exports.itemHeaderTemplatesProperty = new view_1.Property({
    name: 'itemHeaderTemplates', valueConverter: function (value) {
        if (typeof value === 'string') {
            return builder_1.parseMultipleTemplates(value);
        }
        return value;
    }
});
exports.itemHeaderTemplatesProperty.register(AccordionBase);
exports.itemContentTemplateProperty = new view_1.Property({
    name: 'itemContentTemplate',
    affectsLayout: true,
    valueChanged: function (target) {
        target.refresh();
    }
});
exports.itemContentTemplateProperty.register(AccordionBase);
exports.itemContentTemplatesProperty = new view_1.Property({
    name: 'itemContentTemplates', valueConverter: function (value) {
        if (typeof value === 'string') {
            return builder_1.parseMultipleTemplates(value);
        }
        return value;
    }
});
exports.itemContentTemplatesProperty.register(AccordionBase);
exports.footerTemplateProperty = new view_1.Property({
    name: 'footerTemplate',
    affectsLayout: true,
    valueChanged: function (target) {
        target.refresh();
    }
});
exports.footerTemplateProperty.register(AccordionBase);
exports.footerTemplatesProperty = new view_1.Property({
    name: 'footerTemplates', valueConverter: function (value) {
        if (typeof value === 'string') {
            return builder_1.parseMultipleTemplates(value);
        }
        return value;
    }
});
exports.footerTemplatesProperty.register(AccordionBase);
exports.itemsProperty = new view_1.Property({
    name: 'items',
    affectsLayout: true,
    valueChanged: function (target, oldValue, newValue) {
        if (oldValue instanceof observable_1.Observable) {
            weak_event_listener_1.removeWeakEventListener(oldValue, observable_array_1.ObservableArray.changeEvent, target._onItemsChanged, target);
        }
        if (newValue instanceof observable_1.Observable) {
            weak_event_listener_1.addWeakEventListener(newValue, observable_array_1.ObservableArray.changeEvent, target._onItemsChanged, target);
        }
        target.refresh();
    }
});
exports.itemsProperty.register(AccordionBase);
exports.selectedIndexesProperty = new view_1.Property({
    name: 'selectedIndexes',
    defaultValue: [],
    valueChanged: function (target, oldValue, newValue) {
        target.notify({
            eventName: AccordionBase.selectedIndexesChangedEvent,
            object: target,
            oldIndex: oldValue,
            newIndex: newValue
        });
        target.updateNativeIndexes(oldValue, newValue);
    }
});
exports.selectedIndexesProperty.register(AccordionBase);
var defaultRowHeight = 'auto';
exports.headerRowHeightProperty = new view_1.CoercibleProperty({
    name: 'headerRowHeight', defaultValue: defaultRowHeight, equalityComparer: view_1.Length.equals,
    coerceValue: function (target, value) {
        return target.nativeViewProtected ? value : defaultRowHeight;
    },
    valueChanged: function (target, oldValue, newValue) {
        target._effectiveHeaderRowHeight = view_1.Length.toDevicePixels(newValue, autoEffectiveRowHeight);
        target._onHeaderRowHeightPropertyChanged(oldValue, newValue);
    }, valueConverter: view_1.Length.parse
});
exports.headerRowHeightProperty.register(AccordionBase);
exports.itemHeaderRowHeightProperty = new view_1.CoercibleProperty({
    name: 'itemHeaderRowHeight', defaultValue: defaultRowHeight, equalityComparer: view_1.Length.equals,
    coerceValue: function (target, value) {
        return target.nativeViewProtected ? value : defaultRowHeight;
    },
    valueChanged: function (target, oldValue, newValue) {
        target._effectiveItemHeaderRowHeight = view_1.Length.toDevicePixels(newValue, autoEffectiveRowHeight);
        target._onItemHeaderRowHeightPropertyChanged(oldValue, newValue);
    }, valueConverter: view_1.Length.parse
});
exports.itemHeaderRowHeightProperty.register(AccordionBase);
exports.itemContentRowHeightProperty = new view_1.CoercibleProperty({
    name: 'itemContentRowHeight', defaultValue: defaultRowHeight, equalityComparer: view_1.Length.equals,
    coerceValue: function (target, value) {
        return target.nativeViewProtected ? value : defaultRowHeight;
    },
    valueChanged: function (target, oldValue, newValue) {
        target._effectiveItemContentRowHeight = view_1.Length.toDevicePixels(newValue, autoEffectiveRowHeight);
        target._onItemContentRowHeightPropertyChanged(oldValue, newValue);
    }, valueConverter: view_1.Length.parse
});
exports.itemContentRowHeightProperty.register(AccordionBase);
exports.footerRowHeightProperty = new view_1.CoercibleProperty({
    name: 'footerRowHeight', defaultValue: defaultRowHeight, equalityComparer: view_1.Length.equals,
    coerceValue: function (target, value) {
        return target.nativeViewProtected ? value : defaultRowHeight;
    },
    valueChanged: function (target, oldValue, newValue) {
        target._effectiveFooterRowHeight = view_1.Length.toDevicePixels(newValue, autoEffectiveRowHeight);
        target._onFooterRowHeightPropertyChanged(oldValue, newValue);
    }, valueConverter: view_1.Length.parse
});
exports.footerRowHeightProperty.register(AccordionBase);
exports.iosEstimatedHeaderRowHeightProperty = new view_1.Property({
    name: 'iosEstimatedHeaderRowHeight', valueConverter: function (v) { return view_1.Length.parse(v); }
});
exports.iosEstimatedHeaderRowHeightProperty.register(AccordionBase);
exports.iosEstimatedItemHeaderRowHeightProperty = new view_1.Property({
    name: 'iosEstimatedItemHeaderRowHeight', valueConverter: function (v) { return view_1.Length.parse(v); }
});
exports.iosEstimatedItemHeaderRowHeightProperty.register(AccordionBase);
exports.iosEstimatedItemContentRowHeightProperty = new view_1.Property({
    name: 'iosEstimatedItemContentRowHeight', valueConverter: function (v) { return view_1.Length.parse(v); }
});
exports.iosEstimatedItemContentRowHeightProperty.register(AccordionBase);
exports.iosEstimatedFooterRowHeightProperty = new view_1.Property({
    name: 'iosEstimatedFooterRowHeight', valueConverter: function (v) { return view_1.Length.parse(v); }
});
exports.iosEstimatedFooterRowHeightProperty.register(AccordionBase);
//# sourceMappingURL=accordion.common.js.map