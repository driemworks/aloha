"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var layout_base_1 = require("tns-core-modules/ui/layouts/layout-base");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var profiling_1 = require("tns-core-modules/profiling");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement('Accordion', function () { return require('../').Accordion; });
var NG_VIEW = '_ngViewRef';
var ItemContext = (function () {
    function ItemContext($implicit, item, index, even, odd) {
        this.$implicit = $implicit;
        this.item = item;
        this.index = index;
        this.even = even;
        this.odd = odd;
    }
    return ItemContext;
}());
exports.ItemContext = ItemContext;
var ChildItemContext = (function () {
    function ChildItemContext($implicit, item, parentIndex, index, even, odd) {
        this.$implicit = $implicit;
        this.item = item;
        this.parentIndex = parentIndex;
        this.index = index;
        this.even = even;
        this.odd = odd;
    }
    return ChildItemContext;
}());
exports.ChildItemContext = ChildItemContext;
var AccordionItemsComponent = (function () {
    function AccordionItemsComponent(_elementRef, _iterableDiffers) {
        this._iterableDiffers = _iterableDiffers;
        this.setupItemView = new core_1.EventEmitter();
        this.accordionItemsView = _elementRef.nativeElement;
        this.accordionItemsView.on('headerLoading', this.onHeaderLoading, this);
        this.accordionItemsView.on('itemHeaderLoading', this.onItemHeaderLoading, this);
        this.accordionItemsView.on('itemContentLoading', this.onItemContentLoading, this);
        this.accordionItemsView.on('footerLoading', this.onFooterLoading, this);
    }
    Object.defineProperty(AccordionItemsComponent.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            this._items = value;
            var needDiffer = true;
            if (value instanceof observable_array_1.ObservableArray) {
                needDiffer = false;
            }
            if (needDiffer && !this._differ && core_1.ɵisListLikeIterable(value)) {
                this._differ = this._iterableDiffers.find(this._items)
                    .create(function (_index, item) {
                    return item;
                });
            }
            this.accordionItemsView.items = this._items;
        },
        enumerable: true,
        configurable: true
    });
    AccordionItemsComponent.prototype.ngAfterContentInit = function () {
        this.setItemTemplates();
    };
    AccordionItemsComponent.prototype.ngOnDestroy = function () {
        this.accordionItemsView.off('headerLoading', this.onHeaderLoading, this);
        this.accordionItemsView.off('itemHeaderLoading', this.onItemHeaderLoading, this);
        this.accordionItemsView.off('itemContentLoading', this.onItemContentLoading, this);
        this.accordionItemsView.off('footerLoading', this.onFooterLoading, this);
    };
    AccordionItemsComponent.prototype.setItemTemplates = function () {
        this.itemHeaderTemplate = this.itemTemplateQuery;
        this.accordionItemsView._getHasHeader = function () {
            return false;
        };
        this.accordionItemsView._getHasFooter = function () {
            return false;
        };
        if (this._templateHeaderMap) {
            var templates_1 = [];
            this._templateHeaderMap.forEach(function (value) {
                templates_1.push(value);
            });
            if (templates_1.length === 1) {
                this.accordionItemsView.headerTemplateSelector = function (item, index, items) {
                    return 'header';
                };
            }
            if (templates_1.length > 0) {
                this.accordionItemsView._getHasHeader = function () {
                    return true;
                };
            }
            this.accordionItemsView.headerTemplates = templates_1;
        }
        if (this._templateItemHeaderMap) {
            var templates_2 = [];
            this._templateItemHeaderMap.forEach(function (value) {
                templates_2.push(value);
            });
            this.accordionItemsView.itemHeaderTemplates = templates_2;
            if (templates_2.length === 1) {
                this.accordionItemsView.itemHeaderTemplateSelector = function (item, index, items) {
                    return 'title';
                };
            }
        }
        else {
            this.getItemTemplateViewFactory(this.itemHeaderTemplate);
        }
        if (this._templateItemContentMap) {
            var templates_3 = [];
            this._templateItemContentMap.forEach(function (value) {
                templates_3.push(value);
            });
            if (templates_3.length === 1) {
                this.accordionItemsView.itemContentTemplateSelector = function (item, parentIndex, index, items) {
                    return 'content';
                };
            }
            this.accordionItemsView.itemContentTemplates = templates_3;
        }
        if (this._templateFooterMap) {
            var templates_4 = [];
            this._templateFooterMap.forEach(function (value) {
                templates_4.push(value);
            });
            if (templates_4.length === 1) {
                this.accordionItemsView.footerTemplateSelector = function (item, index, items) {
                    return 'footer';
                };
            }
            if (templates_4.length > 0) {
                this.accordionItemsView._getHasFooter = function () {
                    return true;
                };
            }
            this.accordionItemsView.footerTemplates = templates_4;
        }
    };
    AccordionItemsComponent.prototype.registerTemplate = function (key, template) {
        if (key === 'header' || key.startsWith('header-')) {
            if (!this._templateHeaderMap) {
                this._templateHeaderMap = new Map();
            }
            var keyedTemplate = {
                key: key,
                createView: this.getItemTemplateViewFactory(template)
            };
            this._templateHeaderMap.set(key, keyedTemplate);
        }
        if (key === 'title' || key.startsWith('title-')) {
            if (!this._templateItemHeaderMap) {
                this._templateItemHeaderMap = new Map();
            }
            var keyedTemplate = {
                key: key,
                createView: this.getItemTemplateViewFactory(template)
            };
            this._templateItemHeaderMap.set(key, keyedTemplate);
        }
        if (key === 'content' || key.startsWith('content-')) {
            if (!this._templateItemContentMap) {
                this._templateItemContentMap = new Map();
            }
            var keyedTemplate = {
                key: key,
                createView: this.getChildItemTemplateViewFactory(template)
            };
            this._templateItemContentMap.set(key, keyedTemplate);
        }
        if (key === 'footer' || key.startsWith('footer-')) {
            if (!this._templateFooterMap) {
                this._templateFooterMap = new Map();
            }
            var keyedTemplate = {
                key: key,
                createView: this.getItemTemplateViewFactory(template)
            };
            this._templateFooterMap.set(key, keyedTemplate);
        }
    };
    AccordionItemsComponent.prototype.onHeaderLoading = function (args) {
        if (!args.view && !this.headerTemplate) {
            return;
        }
        var index = args.index;
        var items = args.object.items;
        var currentItem = typeof items.getItem === 'function' ? items.getItem(index) : items[index];
        var viewRef;
        if (args.view) {
            viewRef = args.view[NG_VIEW];
            if (!viewRef && args.view instanceof layout_base_1.LayoutBase && args.view.getChildrenCount() > 0) {
                viewRef = args.view.getChildAt(0)[NG_VIEW];
            }
        }
        if (!viewRef) {
            viewRef = this.loader.createEmbeddedView(this.headerTemplate, new ItemContext(), 0);
            args.view = getItemViewRoot(viewRef);
            args.view[NG_VIEW] = viewRef;
        }
        this.setupViewRef(viewRef, currentItem, index);
        this.detectChangesOnChild(viewRef, index);
    };
    AccordionItemsComponent.prototype.onItemHeaderLoading = function (args) {
        if (!args.view && !this.itemHeaderTemplate) {
            return;
        }
        var index = args.index;
        var items = args.object.items;
        var currentItem = typeof items.getItem === 'function' ? items.getItem(index) : items[index];
        var viewRef;
        if (args.view) {
            viewRef = args.view[NG_VIEW];
            if (!viewRef && args.view instanceof layout_base_1.LayoutBase && args.view.getChildrenCount() > 0) {
                viewRef = args.view.getChildAt(0)[NG_VIEW];
            }
        }
        if (!viewRef) {
            viewRef = this.loader.createEmbeddedView(this.itemHeaderTemplate, new ItemContext(), 0);
            args.view = getItemViewRoot(viewRef);
            args.view[NG_VIEW] = viewRef;
        }
        this.setupViewRef(viewRef, currentItem, index);
        this.detectChangesOnChild(viewRef, index);
    };
    AccordionItemsComponent.prototype.onItemContentLoading = function (args) {
        if (!args.view && !this.itemContentTemplate) {
            return;
        }
        var index = args.index;
        var childIndex = args.childIndex;
        var childItems = this.accordionItemsView.childItems;
        var items = args.object.items;
        var currentItem = typeof items.getItem === 'function' ? items.getItem(index)[childItems][childIndex] : items[index][childItems][childIndex];
        var viewRef;
        if (args.view) {
            viewRef = args.view[NG_VIEW];
            if (!viewRef && args.view instanceof layout_base_1.LayoutBase && args.view.getChildrenCount() > 0) {
                viewRef = args.view.getChildAt(0)[NG_VIEW];
            }
        }
        if (!viewRef) {
            viewRef = this.loader.createEmbeddedView(this.itemContentTemplate, new ChildItemContext(), 0);
            args.view = getItemViewRoot(viewRef);
            args.view[NG_VIEW] = viewRef;
        }
        this.setupChildViewRef(viewRef, currentItem, index, childIndex);
        this.detectChangesOnChild(viewRef, index);
    };
    AccordionItemsComponent.prototype.onFooterLoading = function (args) {
        if (!args.view && !this.footerTemplate) {
            return;
        }
        var index = args.index;
        var items = args.object.items;
        var currentItem = typeof items.getItem === 'function' ? items.getItem(index) : items[index];
        var viewRef;
        if (args.view) {
            viewRef = args.view[NG_VIEW];
            if (!viewRef && args.view instanceof layout_base_1.LayoutBase && args.view.getChildrenCount() > 0) {
                viewRef = args.view.getChildAt(0)[NG_VIEW];
            }
        }
        if (!viewRef) {
            viewRef = this.loader.createEmbeddedView(this.footerTemplate, new ItemContext(), 0);
            args.view = getItemViewRoot(viewRef);
            args.view[NG_VIEW] = viewRef;
        }
        this.setupViewRef(viewRef, currentItem, index);
        this.detectChangesOnChild(viewRef, index);
    };
    AccordionItemsComponent.prototype.setupViewRef = function (viewRef, data, index) {
        var context = viewRef.context;
        context.$implicit = data;
        context.item = data;
        context.index = index;
        context.even = (index % 2 === 0);
        context.odd = !context.even;
        this.setupItemView.next({ view: viewRef, data: data, index: index, context: context });
    };
    AccordionItemsComponent.prototype.setupChildViewRef = function (viewRef, data, parentIndex, index) {
        var context = viewRef.context;
        context.$implicit = data;
        context.item = data;
        context.parentIndex = parentIndex;
        context.index = index;
        context.even = (index % 2 === 0);
        context.odd = !context.even;
        this.setupItemView.next({ view: viewRef, data: data, index: index, context: context });
    };
    AccordionItemsComponent.prototype.getItemTemplateViewFactory = function (template) {
        var _this = this;
        return function () {
            var viewRef = _this.loader.createEmbeddedView(template, new ItemContext(), 0);
            var resultView = getItemViewRoot(viewRef);
            resultView[NG_VIEW] = viewRef;
            return resultView;
        };
    };
    AccordionItemsComponent.prototype.getChildItemTemplateViewFactory = function (template) {
        var _this = this;
        return function () {
            var viewRef = _this.loader.createEmbeddedView(template, new ChildItemContext(), 0);
            var resultView = getItemViewRoot(viewRef);
            resultView[NG_VIEW] = viewRef;
            return resultView;
        };
    };
    AccordionItemsComponent.prototype.detectChangesOnChild = function (viewRef, index) {
        viewRef.markForCheck();
        viewRef.detectChanges();
    };
    AccordionItemsComponent.prototype.ngDoCheck = function () {
        if (this._differ) {
            var changes = this._differ.diff(this._items);
            if (changes) {
                this.accordionItemsView.refresh();
            }
        }
    };
    AccordionItemsComponent.propDecorators = {
        loader: [{ type: core_1.ViewChild, args: ['loader', { read: core_1.ViewContainerRef },] }],
        setupItemView: [{ type: core_1.Output }],
        itemTemplateQuery: [{ type: core_1.ContentChild, args: [core_1.TemplateRef,] }],
        items: [{ type: core_1.Input }]
    };
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AccordionItemsComponent.prototype, "onHeaderLoading", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AccordionItemsComponent.prototype, "onItemHeaderLoading", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AccordionItemsComponent.prototype, "onItemContentLoading", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AccordionItemsComponent.prototype, "onFooterLoading", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [core_1.EmbeddedViewRef, Number]),
        __metadata("design:returntype", void 0)
    ], AccordionItemsComponent.prototype, "detectChangesOnChild", null);
    return AccordionItemsComponent;
}());
exports.AccordionItemsComponent = AccordionItemsComponent;
function getItemViewRoot(viewRef, rootLocator) {
    if (rootLocator === void 0) { rootLocator = element_registry_1.getSingleViewRecursive; }
    var rootView = rootLocator(viewRef.rootNodes, 0);
    return rootView;
}
exports.getItemViewRoot = getItemViewRoot;
exports.ACCORDION_ITEMS_COMPONENT = new core_1.InjectionToken('AccordionItemsComponent');
var TemplateKeyDirective = (function () {
    function TemplateKeyDirective(templateRef, comp) {
        this.templateRef = templateRef;
        this.comp = comp;
    }
    Object.defineProperty(TemplateKeyDirective.prototype, "acTemplateKey", {
        set: function (value) {
            if (this.comp && this.templateRef) {
                this.comp.registerTemplate(value, this.templateRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    TemplateKeyDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[acTemplateKey]' },] },
    ];
    TemplateKeyDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef },
        { type: AccordionItemsComponent, decorators: [{ type: core_1.Inject, args: [exports.ACCORDION_ITEMS_COMPONENT,] }, { type: core_1.Host }] }
    ]; };
    TemplateKeyDirective.propDecorators = {
        acTemplateKey: [{ type: core_1.Input }]
    };
    return TemplateKeyDirective;
}());
exports.TemplateKeyDirective = TemplateKeyDirective;
var AccordionComponent = (function (_super) {
    __extends(AccordionComponent, _super);
    function AccordionComponent(_elementRef, _iterableDiffers) {
        return _super.call(this, _elementRef, _iterableDiffers) || this;
    }
    Object.defineProperty(AccordionComponent.prototype, "nativeElement", {
        get: function () {
            return this.accordionItemsView;
        },
        enumerable: true,
        configurable: true
    });
    AccordionComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'Accordion',
                    template: "\n\t\t<DetachedContainer>\n\t\t\t<Placeholder #loader></Placeholder>\n\t\t</DetachedContainer>",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    providers: [{ provide: exports.ACCORDION_ITEMS_COMPONENT, useExisting: core_1.forwardRef(function () { return AccordionComponent; }) }]
                },] },
    ];
    AccordionComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.IterableDiffers }
    ]; };
    return AccordionComponent;
}(AccordionItemsComponent));
exports.AccordionComponent = AccordionComponent;
var AccordionModule = (function () {
    function AccordionModule() {
    }
    AccordionModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [AccordionComponent, TemplateKeyDirective],
                    exports: [AccordionComponent, TemplateKeyDirective],
                    schemas: [core_1.NO_ERRORS_SCHEMA]
                },] },
    ];
    return AccordionModule;
}());
exports.AccordionModule = AccordionModule;
//# sourceMappingURL=index.js.map