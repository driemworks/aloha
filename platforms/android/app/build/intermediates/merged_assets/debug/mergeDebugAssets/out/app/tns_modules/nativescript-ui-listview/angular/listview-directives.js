Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var renderer_1 = require("nativescript-angular/renderer");
var __1 = require("./../");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var ListItemContext = /** @class */ (function (_super) {
    __extends(ListItemContext, _super);
    function ListItemContext($implicit, item, index, even, odd, category) {
        var _this = _super.call(this, item) || this;
        _this.$implicit = $implicit;
        _this.item = item;
        _this.index = index;
        _this.even = even;
        _this.odd = odd;
        _this.category = category;
        return _this;
    }
    return ListItemContext;
}(core_1.ElementRef));
exports.ListItemContext = ListItemContext;
var RadListViewComponent = /** @class */ (function () {
    function RadListViewComponent(_elementRef, _iterableDiffers, _renderer) {
        var _this = this;
        this._elementRef = _elementRef;
        this._iterableDiffers = _iterableDiffers;
        this._renderer = _renderer;
        this._itemReordering = false;
        this.setupItemView = new core_1.EventEmitter();
        this._listView = _elementRef.nativeElement;
        // We should consider setting this default value in the RadListView constructor.
        this._listView.listViewLayout = new __1.ListViewLinearLayout();
        var component = this;
        this._listView.itemViewDisposer = function () {
            _this.loader.clear();
        };
        this._listView.nativeScriptViewAdded = function (parent, child) {
            // Consider exposing this in nativescript-angular as public API
            _this._renderer.viewUtil.insertChild(parent, child);
        };
        this._listView.itemViewLoader = function (viewType) {
            switch (viewType) {
                case __1.ListViewViewTypes.ItemView:
                    if (component._itemTemplate && _this.loader) {
                        var nativeItem = _this.loader.createEmbeddedView(component._itemTemplate, new ListItemContext(), 0);
                        var typedView = getItemViewRoot(nativeItem);
                        typedView[__1.NG_VIEW] = nativeItem;
                        return typedView;
                    }
                    break;
                case __1.ListViewViewTypes.ItemSwipeView:
                    if (component._itemSwipeTemplate && _this.loader) {
                        var nativeItem = _this.loader.createEmbeddedView(component._itemSwipeTemplate, new ListItemContext(), 0);
                        var typedView = getItemViewRoot(nativeItem);
                        typedView[__1.NG_VIEW] = nativeItem;
                        return typedView;
                    }
                    break;
                case __1.ListViewViewTypes.LoadOnDemandView:
                    if (component._loadOnDemandTemplate && _this.loader) {
                        var viewRef = _this.loader.createEmbeddedView(component._loadOnDemandTemplate, new ListItemContext(), 0);
                        _this.detectChangesOnChild(viewRef, -1);
                        var nativeView = getItemViewRoot(viewRef);
                        nativeView[__1.NG_VIEW] = viewRef;
                        return nativeView;
                    }
                    break;
                case __1.ListViewViewTypes.HeaderView:
                    if (!_this._listView.groupingFunction && _this._listView._hasGroupingFunctionChanged) {
                        break;
                    }
                    if (component._headerTemplate && _this.loader) {
                        var viewRef = _this.loader.createEmbeddedView(component._headerTemplate, new ListItemContext(), 0);
                        _this.detectChangesOnChild(viewRef, -1);
                        var nativeView = getItemViewRoot(viewRef);
                        nativeView[__1.NG_VIEW] = viewRef;
                        return nativeView;
                    }
                    break;
                case __1.ListViewViewTypes.GroupView:
                    if (!_this._listView.groupingFunction && _this._listView._hasGroupingFunctionChanged) {
                        break;
                    }
                    if (component._groupTemplate && _this.loader) {
                        var viewRef = _this.loader.createEmbeddedView(component._groupTemplate, new ListItemContext(), 0);
                        _this.detectChangesOnChild(viewRef, -1);
                        var nativeView = getItemViewRoot(viewRef);
                        nativeView[__1.NG_VIEW] = viewRef;
                        return nativeView;
                    }
                    break;
                case __1.ListViewViewTypes.FooterView:
                    if (component._footerTemplate && _this.loader) {
                        var viewRef = _this.loader.createEmbeddedView(component._footerTemplate, new ListItemContext(), 0);
                        _this.detectChangesOnChild(viewRef, -1);
                        var nativeView = getItemViewRoot(viewRef);
                        nativeView[__1.NG_VIEW] = viewRef;
                        return nativeView;
                    }
                    break;
            }
        };
    }
    RadListViewComponent.prototype.ngAfterContentInit = function () {
        this.setItemTemplates();
    };
    Object.defineProperty(RadListViewComponent.prototype, "nativeElement", {
        get: function () {
            return this._listView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListViewComponent.prototype, "listView", {
        get: function () {
            return this._listView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListViewComponent.prototype, "loadOnDemandTemplate", {
        set: function (value) {
            this._loadOnDemandTemplate = value;
            this._listView.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListViewComponent.prototype, "headerTemplate", {
        set: function (value) {
            this._headerTemplate = value;
            if (this._listView.ios) {
                this._listView.updateHeaderFooter();
            }
            else if (this._listView.android) {
                this._listView['_updateHeader']();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListViewComponent.prototype, "groupTemplate", {
        set: function (value) {
            this._groupTemplate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListViewComponent.prototype, "footerTemplate", {
        set: function (value) {
            this._footerTemplate = value;
            if (this._listView.ios) {
                this._listView.updateHeaderFooter();
            }
            else if (this._listView.android) {
                this._listView['_updateFooter']();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListViewComponent.prototype, "itemTemplate", {
        set: function (value) {
            this._itemTemplate = value;
            this._listView.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListViewComponent.prototype, "itemSwipeTemplate", {
        set: function (value) {
            this._itemSwipeTemplate = value;
            this._listView.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadListViewComponent.prototype, "items", {
        set: function (value) {
            this._items = value;
            var needDiffer = true;
            if (value instanceof observable_array_1.ObservableArray) {
                needDiffer = false;
            }
            if (needDiffer && !this._differ && core_1.ɵisListLikeIterable(value)) {
                this._differ = this._iterableDiffers.find(this._items).create(function (index, item) { return item; });
            }
            this._listView.items = this._items;
        },
        enumerable: true,
        configurable: true
    });
    RadListViewComponent.prototype.ngDoCheck = function () {
        if (this._differ) {
            var changes = this._differ.diff(this._items);
            if (changes) {
                this._listView.refresh();
            }
        }
    };
    RadListViewComponent.prototype.onItemLoadingInternal = function (args) {
        var index = args.index;
        var currentItem = args.view.bindingContext;
        var ngView = args.view[__1.NG_VIEW];
        if (ngView) {
            this.setupViewRef(ngView, currentItem, index);
            this.detectChangesOnChild(ngView, index);
        }
    };
    RadListViewComponent.prototype.setupViewRef = function (viewRef, data, index) {
        var context = viewRef.context;
        context.$implicit = data;
        context.item = data;
        context.category = data ? data.category : "";
        context.index = index;
        context.even = (index % 2 === 0);
        context.odd = !context.even;
        this.setupItemView.next({ view: viewRef, data: data, index: index, context: context });
        // this.detectChangesOnChild(viewRef, -1);
    };
    RadListViewComponent.prototype.setLayout = function (layout) {
        this._listView.listViewLayout = layout;
    };
    RadListViewComponent.prototype.detectChangesOnChild = function (viewRef, index) {
        // Manually detect changes in child view ref
        // TODO: Is there a better way of getting viewRef's change detector
        var childChangeDetector = viewRef;
        childChangeDetector.markForCheck();
        childChangeDetector.detectChanges();
    };
    RadListViewComponent.prototype.setItemTemplates = function () {
        // The itemTemplateQuery may be changed after list items are added that contain <template> inside,
        // so cache and use only the original template to avoid errors.
        this.itemTemplate = this.itemTemplateQuery;
        if (this._templateMap) {
            var templates_1 = [];
            this._templateMap.forEach(function (value) {
                templates_1.push(value);
            });
            this.listView.itemTemplates = templates_1;
        }
    };
    RadListViewComponent.prototype.registerTemplate = function (key, template) {
        var _this = this;
        if (!this._templateMap) {
            this._templateMap = new Map();
        }
        var keyedTemplate = {
            key: key,
            createView: function () {
                var viewRef = _this.loader.createEmbeddedView(template, new ListItemContext(), 0);
                var resultView = getItemViewRoot(viewRef);
                resultView[__1.NG_VIEW] = viewRef;
                return resultView;
            }
        };
        this._templateMap.set(key, keyedTemplate);
    };
    __decorate([
        core_1.ViewChild("loader", { read: core_1.ViewContainerRef }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], RadListViewComponent.prototype, "loader", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], RadListViewComponent.prototype, "setupItemView", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], RadListViewComponent.prototype, "itemTemplateQuery", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], RadListViewComponent.prototype, "items", null);
    __decorate([
        core_1.HostListener("itemLoadingInternal", ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [__1.ListViewEventData]),
        __metadata("design:returntype", void 0)
    ], RadListViewComponent.prototype, "onItemLoadingInternal", null);
    RadListViewComponent = __decorate([
        core_1.Component({
            selector: "RadListView",
            template: "\n        <DetachedContainer>\n            <Placeholder #loader></Placeholder>\n        </DetachedContainer>",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __param(1, core_1.Inject(core_1.IterableDiffers)),
        __param(2, core_1.Inject(renderer_1.NativeScriptRendererFactory)),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.IterableDiffers,
            renderer_1.NativeScriptRendererFactory])
    ], RadListViewComponent);
    return RadListViewComponent;
}());
exports.RadListViewComponent = RadListViewComponent;
var ListViewLinearLayoutDirective = /** @class */ (function () {
    function ListViewLinearLayoutDirective() {
    }
    ListViewLinearLayoutDirective = __decorate([
        core_1.Directive({
            selector: "ListViewLinearLayout"
        }),
        __metadata("design:paramtypes", [])
    ], ListViewLinearLayoutDirective);
    return ListViewLinearLayoutDirective;
}());
exports.ListViewLinearLayoutDirective = ListViewLinearLayoutDirective;
var ListViewGridLayoutDirective = /** @class */ (function () {
    function ListViewGridLayoutDirective() {
    }
    ListViewGridLayoutDirective = __decorate([
        core_1.Directive({
            selector: "ListViewGridLayout"
        }),
        __metadata("design:paramtypes", [])
    ], ListViewGridLayoutDirective);
    return ListViewGridLayoutDirective;
}());
exports.ListViewGridLayoutDirective = ListViewGridLayoutDirective;
var ListViewStaggeredLayoutDirective = /** @class */ (function () {
    function ListViewStaggeredLayoutDirective() {
    }
    ListViewStaggeredLayoutDirective = __decorate([
        core_1.Directive({
            selector: "ListViewStaggeredLayout"
        }),
        __metadata("design:paramtypes", [])
    ], ListViewStaggeredLayoutDirective);
    return ListViewStaggeredLayoutDirective;
}());
exports.ListViewStaggeredLayoutDirective = ListViewStaggeredLayoutDirective;
var ReorderHandleDirective = /** @class */ (function () {
    function ReorderHandleDirective() {
    }
    ReorderHandleDirective = __decorate([
        core_1.Directive({
            selector: "ReorderHandle"
        }),
        __metadata("design:paramtypes", [])
    ], ReorderHandleDirective);
    return ReorderHandleDirective;
}());
exports.ReorderHandleDirective = ReorderHandleDirective;
var TKListViewHeaderDirective = /** @class */ (function () {
    function TKListViewHeaderDirective(owner, template) {
        this.owner = owner;
        this.template = template;
    }
    TKListViewHeaderDirective.prototype.ngOnInit = function () {
        this.owner.headerTemplate = this.template;
    };
    TKListViewHeaderDirective = __decorate([
        core_1.Directive({
            selector: "[tkListViewHeader]"
        }),
        __param(0, core_1.Inject(RadListViewComponent)),
        __param(1, core_1.Inject(core_1.TemplateRef)),
        __metadata("design:paramtypes", [RadListViewComponent,
            core_1.TemplateRef])
    ], TKListViewHeaderDirective);
    return TKListViewHeaderDirective;
}());
exports.TKListViewHeaderDirective = TKListViewHeaderDirective;
var TKListViewFooterDirective = /** @class */ (function () {
    function TKListViewFooterDirective(owner, template) {
        this.owner = owner;
        this.template = template;
    }
    TKListViewFooterDirective.prototype.ngOnInit = function () {
        this.owner.footerTemplate = this.template;
    };
    TKListViewFooterDirective = __decorate([
        core_1.Directive({
            selector: "[tkListViewFooter]"
        }),
        __param(0, core_1.Inject(RadListViewComponent)),
        __param(1, core_1.Inject(core_1.TemplateRef)),
        __metadata("design:paramtypes", [RadListViewComponent,
            core_1.TemplateRef])
    ], TKListViewFooterDirective);
    return TKListViewFooterDirective;
}());
exports.TKListViewFooterDirective = TKListViewFooterDirective;
var TKListViewItemSwipeDirective = /** @class */ (function () {
    function TKListViewItemSwipeDirective(owner, template) {
        this.owner = owner;
        this.template = template;
    }
    TKListViewItemSwipeDirective.prototype.ngOnInit = function () {
        this.owner.itemSwipeTemplate = this.template;
    };
    TKListViewItemSwipeDirective = __decorate([
        core_1.Directive({
            selector: "[tkListItemSwipeTemplate]"
        }),
        __param(0, core_1.Inject(RadListViewComponent)),
        __param(1, core_1.Inject(core_1.TemplateRef)),
        __metadata("design:paramtypes", [RadListViewComponent,
            core_1.TemplateRef])
    ], TKListViewItemSwipeDirective);
    return TKListViewItemSwipeDirective;
}());
exports.TKListViewItemSwipeDirective = TKListViewItemSwipeDirective;
var TKListViewItemDirective = /** @class */ (function () {
    function TKListViewItemDirective(owner, template) {
        this.owner = owner;
        this.template = template;
    }
    TKListViewItemDirective.prototype.ngOnInit = function () {
        this.owner.itemTemplate = this.template;
    };
    TKListViewItemDirective = __decorate([
        core_1.Directive({
            selector: "[tkListItemTemplate]"
        }),
        __param(0, core_1.Inject(RadListViewComponent)),
        __param(1, core_1.Inject(core_1.TemplateRef)),
        __metadata("design:paramtypes", [RadListViewComponent,
            core_1.TemplateRef])
    ], TKListViewItemDirective);
    return TKListViewItemDirective;
}());
exports.TKListViewItemDirective = TKListViewItemDirective;
var TKGroupTemplateDirective = /** @class */ (function () {
    function TKGroupTemplateDirective(owner, template) {
        this.owner = owner;
        this.template = template;
    }
    TKGroupTemplateDirective.prototype.ngOnInit = function () {
        this.owner.groupTemplate = this.template;
    };
    TKGroupTemplateDirective = __decorate([
        core_1.Directive({
            selector: "[tkGroupTemplate]"
        }),
        __param(0, core_1.Inject(RadListViewComponent)),
        __param(1, core_1.Inject(core_1.TemplateRef)),
        __metadata("design:paramtypes", [RadListViewComponent,
            core_1.TemplateRef])
    ], TKGroupTemplateDirective);
    return TKGroupTemplateDirective;
}());
exports.TKGroupTemplateDirective = TKGroupTemplateDirective;
var TKTemplateKeyDirective = /** @class */ (function () {
    function TKTemplateKeyDirective(templateRef, owner) {
        this.templateRef = templateRef;
        this.owner = owner;
    }
    Object.defineProperty(TKTemplateKeyDirective.prototype, "tkTemplateKey", {
        set: function (value) {
            if (this.owner && this.templateRef) {
                this.owner.registerTemplate(value, this.templateRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TKTemplateKeyDirective.prototype, "tkTemplateKey", null);
    TKTemplateKeyDirective = __decorate([
        core_1.Directive({
            selector: "[tkTemplateKey]"
        }),
        __param(1, core_1.Host()),
        __metadata("design:paramtypes", [core_1.TemplateRef,
            RadListViewComponent])
    ], TKTemplateKeyDirective);
    return TKTemplateKeyDirective;
}());
exports.TKTemplateKeyDirective = TKTemplateKeyDirective;
var TKListViewLoadOnDemandDirective = /** @class */ (function () {
    function TKListViewLoadOnDemandDirective(owner, template) {
        this.owner = owner;
        this.template = template;
    }
    TKListViewLoadOnDemandDirective.prototype.ngOnInit = function () {
        this.owner.loadOnDemandTemplate = this.template;
    };
    TKListViewLoadOnDemandDirective = __decorate([
        core_1.Directive({
            selector: "[tkListLoadOnDemandTemplate]"
        }),
        __param(0, core_1.Inject(RadListViewComponent)),
        __param(1, core_1.Inject(core_1.TemplateRef)),
        __metadata("design:paramtypes", [RadListViewComponent,
            core_1.TemplateRef])
    ], TKListViewLoadOnDemandDirective);
    return TKListViewLoadOnDemandDirective;
}());
exports.TKListViewLoadOnDemandDirective = TKListViewLoadOnDemandDirective;
var TKListViewLayoutDirective = /** @class */ (function () {
    function TKListViewLayoutDirective(owner, _elementRef) {
        this.owner = owner;
        this._elementRef = _elementRef;
    }
    TKListViewLayoutDirective.prototype.ngOnInit = function () {
        var layout = this._elementRef.nativeElement;
        this.owner.setLayout(layout);
    };
    TKListViewLayoutDirective = __decorate([
        core_1.Directive({
            selector: "[tkListViewLayout]"
        }),
        __param(0, core_1.Inject(RadListViewComponent)),
        __param(1, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [RadListViewComponent,
            core_1.ElementRef])
    ], TKListViewLayoutDirective);
    return TKListViewLayoutDirective;
}());
exports.TKListViewLayoutDirective = TKListViewLayoutDirective;
function getItemViewRoot(viewRef, rootLocator) {
    if (rootLocator === void 0) { rootLocator = element_registry_1.getSingleViewRecursive; }
    return rootLocator(viewRef.rootNodes, 0);
}
exports.getItemViewRoot = getItemViewRoot;
exports.LISTVIEW_DIRECTIVES = [RadListViewComponent, TKListViewItemDirective, TKListViewItemSwipeDirective, TKListViewHeaderDirective, TKListViewFooterDirective, TKListViewLoadOnDemandDirective, TKListViewLayoutDirective, ListViewGridLayoutDirective, ListViewStaggeredLayoutDirective, ReorderHandleDirective, ListViewLinearLayoutDirective, TKTemplateKeyDirective, TKGroupTemplateDirective];
if (!global.isListViewRegistered) {
    element_registry_1.registerElement("RadListView", function () { return __1.RadListView; });
    element_registry_1.registerElement("ListViewLinearLayout", function () { return __1.ListViewLinearLayout; });
    element_registry_1.registerElement("ListViewGridLayout", function () { return __1.ListViewGridLayout; });
    element_registry_1.registerElement("ListViewStaggeredLayout", function () { return __1.ListViewStaggeredLayout; });
    element_registry_1.registerElement("ReorderHandle", function () { return __1.ReorderHandle; });
    global.isListViewRegistered = true;
}
var NativeScriptUIListViewModule = /** @class */ (function () {
    function NativeScriptUIListViewModule() {
    }
    NativeScriptUIListViewModule = __decorate([
        core_1.NgModule({
            declarations: [exports.LISTVIEW_DIRECTIVES],
            exports: [exports.LISTVIEW_DIRECTIVES],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], NativeScriptUIListViewModule);
    return NativeScriptUIListViewModule;
}());
exports.NativeScriptUIListViewModule = NativeScriptUIListViewModule;
