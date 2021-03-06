/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export { BrowserModule, platformBrowser } from './browser';
export { Meta } from './browser/meta';
export { Title } from './browser/title';
export { disableDebugTools, enableDebugTools } from './browser/tools/tools';
export { BrowserTransferStateModule, TransferState, makeStateKey } from './browser/transfer_state';
export { By } from './dom/debug/by';
export { DOCUMENT } from './dom/dom_tokens';
export { EVENT_MANAGER_PLUGINS, EventManager } from './dom/events/event_manager';
export { HAMMER_GESTURE_CONFIG, HAMMER_LOADER, HammerGestureConfig } from './dom/events/hammer_gestures';
export { DomSanitizer } from './security/dom_sanitization_service';
export { ɵBROWSER_SANITIZATION_PROVIDERS, ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS, ɵinitDomAdapter, ɵBrowserDomAdapter, ɵBrowserPlatformLocation, ɵTRANSITION_ID, ɵBrowserGetTestability, ɵescapeHtml, ɵELEMENT_PROBE_PROVIDERS, ɵDomAdapter, ɵgetDOM, ɵsetRootDomAdapter, ɵDomRendererFactory2, ɵNAMESPACE_URIS, ɵflattenStyles, ɵshimContentAttribute, ɵshimHostAttribute, ɵDomEventsPlugin, ɵHammerGesturesPlugin, ɵKeyEventsPlugin, ɵDomSharedStylesHost, ɵSharedStylesHost, ɵDomSanitizerImpl } from './private_export';
export { VERSION } from './version';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0tYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL3BsYXRmb3JtLWJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsYUFBYSxFQUFFLGVBQWUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUN6RCxPQUFPLEVBQUMsSUFBSSxFQUFpQixNQUFNLGdCQUFnQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsMEJBQTBCLEVBQVksYUFBYSxFQUFFLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzNHLE9BQU8sRUFBQyxFQUFFLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDMUMsT0FBTyxFQUFDLHFCQUFxQixFQUFFLFlBQVksRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQy9FLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxhQUFhLEVBQUUsbUJBQW1CLEVBQWUsTUFBTSw4QkFBOEIsQ0FBQztBQUNySCxPQUFPLEVBQUMsWUFBWSxFQUF1RSxNQUFNLHFDQUFxQyxDQUFDO0FBRXZJLHVlQUFjLGtCQUFrQixDQUFDO0FBQ2pDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxXQUFXLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmV4cG9ydCB7QnJvd3Nlck1vZHVsZSwgcGxhdGZvcm1Ccm93c2VyfSBmcm9tICcuL2Jyb3dzZXInO1xuZXhwb3J0IHtNZXRhLCBNZXRhRGVmaW5pdGlvbn0gZnJvbSAnLi9icm93c2VyL21ldGEnO1xuZXhwb3J0IHtUaXRsZX0gZnJvbSAnLi9icm93c2VyL3RpdGxlJztcbmV4cG9ydCB7ZGlzYWJsZURlYnVnVG9vbHMsIGVuYWJsZURlYnVnVG9vbHN9IGZyb20gJy4vYnJvd3Nlci90b29scy90b29scyc7XG5leHBvcnQge0Jyb3dzZXJUcmFuc2ZlclN0YXRlTW9kdWxlLCBTdGF0ZUtleSwgVHJhbnNmZXJTdGF0ZSwgbWFrZVN0YXRlS2V5fSBmcm9tICcuL2Jyb3dzZXIvdHJhbnNmZXJfc3RhdGUnO1xuZXhwb3J0IHtCeX0gZnJvbSAnLi9kb20vZGVidWcvYnknO1xuZXhwb3J0IHtET0NVTUVOVH0gZnJvbSAnLi9kb20vZG9tX3Rva2Vucyc7XG5leHBvcnQge0VWRU5UX01BTkFHRVJfUExVR0lOUywgRXZlbnRNYW5hZ2VyfSBmcm9tICcuL2RvbS9ldmVudHMvZXZlbnRfbWFuYWdlcic7XG5leHBvcnQge0hBTU1FUl9HRVNUVVJFX0NPTkZJRywgSEFNTUVSX0xPQURFUiwgSGFtbWVyR2VzdHVyZUNvbmZpZywgSGFtbWVyTG9hZGVyfSBmcm9tICcuL2RvbS9ldmVudHMvaGFtbWVyX2dlc3R1cmVzJztcbmV4cG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlSHRtbCwgU2FmZVJlc291cmNlVXJsLCBTYWZlU2NyaXB0LCBTYWZlU3R5bGUsIFNhZmVVcmwsIFNhZmVWYWx1ZX0gZnJvbSAnLi9zZWN1cml0eS9kb21fc2FuaXRpemF0aW9uX3NlcnZpY2UnO1xuXG5leHBvcnQgKiBmcm9tICcuL3ByaXZhdGVfZXhwb3J0JztcbmV4cG9ydCB7VkVSU0lPTn0gZnJvbSAnLi92ZXJzaW9uJztcbiJdfQ==