/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { allowPreviousPlayerStylesMerge, balancePreviousStylesIntoKeyframes } from '../../util';
import { containsElement, hypenatePropsObject, invokeQuery, matchesElement, validateStyleProperty } from '../shared';
import { CssKeyframesPlayer } from './css_keyframes_player';
import { DirectStylePlayer } from './direct_style_player';
/** @type {?} */
const KEYFRAMES_NAME_PREFIX = 'gen_css_kf_';
/** @type {?} */
const TAB_SPACE = ' ';
export class CssKeyframesDriver {
    constructor() {
        this._count = 0;
        this._head = document.querySelector('head');
        this._warningIssued = false;
    }
    /**
     * @param {?} prop
     * @return {?}
     */
    validateStyleProperty(prop) { return validateStyleProperty(prop); }
    /**
     * @param {?} element
     * @param {?} selector
     * @return {?}
     */
    matchesElement(element, selector) {
        return matchesElement(element, selector);
    }
    /**
     * @param {?} elm1
     * @param {?} elm2
     * @return {?}
     */
    containsElement(elm1, elm2) { return containsElement(elm1, elm2); }
    /**
     * @param {?} element
     * @param {?} selector
     * @param {?} multi
     * @return {?}
     */
    query(element, selector, multi) {
        return invokeQuery(element, selector, multi);
    }
    /**
     * @param {?} element
     * @param {?} prop
     * @param {?=} defaultValue
     * @return {?}
     */
    computeStyle(element, prop, defaultValue) {
        return (/** @type {?} */ (((/** @type {?} */ (window.getComputedStyle(element))))[prop]));
    }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} keyframes
     * @return {?}
     */
    buildKeyframeElement(element, name, keyframes) {
        keyframes = keyframes.map(kf => hypenatePropsObject(kf));
        /** @type {?} */
        let keyframeStr = `@keyframes ${name} {\n`;
        /** @type {?} */
        let tab = '';
        keyframes.forEach(kf => {
            tab = TAB_SPACE;
            /** @type {?} */
            const offset = parseFloat(kf.offset);
            keyframeStr += `${tab}${offset * 100}% {\n`;
            tab += TAB_SPACE;
            Object.keys(kf).forEach(prop => {
                /** @type {?} */
                const value = kf[prop];
                switch (prop) {
                    case 'offset':
                        return;
                    case 'easing':
                        if (value) {
                            keyframeStr += `${tab}animation-timing-function: ${value};\n`;
                        }
                        return;
                    default:
                        keyframeStr += `${tab}${prop}: ${value};\n`;
                        return;
                }
            });
            keyframeStr += `${tab}}\n`;
        });
        keyframeStr += `}\n`;
        /** @type {?} */
        const kfElm = document.createElement('style');
        kfElm.innerHTML = keyframeStr;
        return kfElm;
    }
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @param {?=} scrubberAccessRequested
     * @return {?}
     */
    animate(element, keyframes, duration, delay, easing, previousPlayers = [], scrubberAccessRequested) {
        if (scrubberAccessRequested) {
            this._notifyFaultyScrubber();
        }
        /** @type {?} */
        const previousCssKeyframePlayers = (/** @type {?} */ (previousPlayers.filter(player => player instanceof CssKeyframesPlayer)));
        /** @type {?} */
        const previousStyles = {};
        if (allowPreviousPlayerStylesMerge(duration, delay)) {
            previousCssKeyframePlayers.forEach(player => {
                /** @type {?} */
                let styles = player.currentSnapshot;
                Object.keys(styles).forEach(prop => previousStyles[prop] = styles[prop]);
            });
        }
        keyframes = balancePreviousStylesIntoKeyframes(element, keyframes, previousStyles);
        /** @type {?} */
        const finalStyles = flattenKeyframesIntoStyles(keyframes);
        // if there is no animation then there is no point in applying
        // styles and waiting for an event to get fired. This causes lag.
        // It's better to just directly apply the styles to the element
        // via the direct styling animation player.
        if (duration == 0) {
            return new DirectStylePlayer(element, finalStyles);
        }
        /** @type {?} */
        const animationName = `${KEYFRAMES_NAME_PREFIX}${this._count++}`;
        /** @type {?} */
        const kfElm = this.buildKeyframeElement(element, animationName, keyframes);
        (/** @type {?} */ (document.querySelector('head'))).appendChild(kfElm);
        /** @type {?} */
        const player = new CssKeyframesPlayer(element, keyframes, animationName, duration, delay, easing, finalStyles);
        player.onDestroy(() => removeElement(kfElm));
        return player;
    }
    /**
     * @return {?}
     */
    _notifyFaultyScrubber() {
        if (!this._warningIssued) {
            console.warn('@angular/animations: please load the web-animations.js polyfill to allow programmatic access...\n', '  visit http://bit.ly/IWukam to learn more about using the web-animation-js polyfill.');
            this._warningIssued = true;
        }
    }
}
if (false) {
    /** @type {?} */
    CssKeyframesDriver.prototype._count;
    /** @type {?} */
    CssKeyframesDriver.prototype._head;
    /** @type {?} */
    CssKeyframesDriver.prototype._warningIssued;
}
/**
 * @param {?} keyframes
 * @return {?}
 */
function flattenKeyframesIntoStyles(keyframes) {
    /** @type {?} */
    let flatKeyframes = {};
    if (keyframes) {
        /** @type {?} */
        const kfs = Array.isArray(keyframes) ? keyframes : [keyframes];
        kfs.forEach(kf => {
            Object.keys(kf).forEach(prop => {
                if (prop == 'offset' || prop == 'easing')
                    return;
                flatKeyframes[prop] = kf[prop];
            });
        });
    }
    return flatKeyframes;
}
/**
 * @param {?} node
 * @return {?}
 */
function removeElement(node) {
    node.parentNode.removeChild(node);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzX2tleWZyYW1lc19kcml2ZXIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmltYXRpb25zL2Jyb3dzZXIvc3JjL3JlbmRlci9jc3Nfa2V5ZnJhbWVzL2Nzc19rZXlmcmFtZXNfZHJpdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFTQSxPQUFPLEVBQUMsOEJBQThCLEVBQUUsa0NBQWtDLEVBQWUsTUFBTSxZQUFZLENBQUM7QUFFNUcsT0FBTyxFQUFDLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRW5ILE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDOztNQUVsRCxxQkFBcUIsR0FBRyxhQUFhOztNQUNyQyxTQUFTLEdBQUcsR0FBRztBQUVyQixNQUFNLE9BQU8sa0JBQWtCO0lBQS9CO1FBQ1UsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNGLFVBQUssR0FBUSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELG1CQUFjLEdBQUcsS0FBSyxDQUFDO0lBb0dqQyxDQUFDOzs7OztJQWxHQyxxQkFBcUIsQ0FBQyxJQUFZLElBQWEsT0FBTyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUVwRixjQUFjLENBQUMsT0FBWSxFQUFFLFFBQWdCO1FBQzNDLE9BQU8sY0FBYyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7Ozs7SUFFRCxlQUFlLENBQUMsSUFBUyxFQUFFLElBQVMsSUFBYSxPQUFPLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0lBRXRGLEtBQUssQ0FBQyxPQUFZLEVBQUUsUUFB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QUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzlELEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDN0IsSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksSUFBSSxRQUFRO29CQUFFLE9BQU87Z0JBQ2pELGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztLQUNKO0lBQ0QsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQzs7Ozs7QUFFRCxTQUFTLGFBQWEsQ0FBQyxJQUFTO0lBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0FuaW1hdGlvblBsYXllciwgybVTdHlsZURhdGF9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQge2FsbG93UHJldmlvdXNQbGF5ZXJTdHlsZXNNZXJnZSwgYmFsYW5jZVByZXZpb3VzU3R5bGVzSW50b0tleWZyYW1lcywgY29tcHV0ZVN0eWxlfSBmcm9tICcuLi8uLi91dGlsJztcbmltcG9ydCB7QW5pbWF0aW9uRHJpdmVyfSBmcm9tICcuLi9hbmltYXRpb25fZHJpdmVyJztcbmltcG9ydCB7Y29udGFpbnNFbGVtZW50LCBoeXBlbmF0ZVByb3BzT2JqZWN0LCBpbnZva2VRdWVyeSwgbWF0Y2hlc0VsZW1lbnQsIHZhbGlkYXRlU3R5bGVQcm9wZXJ0eX0gZnJvbSAnLi4vc2hhcmVkJztcblxuaW1wb3J0IHtDc3NLZXlmcmFtZXNQbGF5ZXJ9IGZyb20gJy4vY3NzX2tleWZyYW1lc19wbGF5ZXInO1xuaW1wb3J0IHtEaXJlY3RTdHlsZVBsYXllcn0gZnJvbSAnLi9kaXJlY3Rfc3R5bGVfcGxheWVyJztcblxuY29uc3QgS0VZRlJBTUVTX05BTUVfUFJFRklYID0gJ2dlbl9jc3Nfa2ZfJztcbmNvbnN0IFRBQl9TUEFDRSA9ICcgJztcblxuZXhwb3J0IGNsYXNzIENzc0tleWZyYW1lc0RyaXZlciBpbXBsZW1lbnRzIEFuaW1hdGlvbkRyaXZlciB7XG4gIHByaXZhdGUgX2NvdW50ID0gMDtcbiAgcHJpdmF0ZSByZWFkb25seSBfaGVhZDogYW55ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpO1xuICBwcml2YXRlIF93YXJuaW5nSXNzdWVkID0gZmFsc2U7XG5cbiAgdmFsaWRhdGVTdHlsZVByb3BlcnR5KHByb3A6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gdmFsaWRhdGVTdHlsZVByb3BlcnR5KHByb3ApOyB9XG5cbiAgbWF0Y2hlc0VsZW1lbnQoZWxlbWVudDogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1hdGNoZXNFbGVtZW50KGVsZW1lbnQsIHNlbGVjdG9yKTtcbiAgfVxuXG4gIGNvbnRhaW5zRWxlbWVudChlbG0xOiBhbnksIGVsbTI6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gY29udGFpbnNFbGVtZW50KGVsbTEsIGVsbTIpOyB9XG5cbiAgcXVlcnkoZWxlbWVudDogYW55LCBzZWxlY3Rvcjogc3RyaW5nLCBtdWx0aTogYm9vbGVhbik6IGFueVtdIHtcbiAgICByZXR1cm4gaW52b2tlUXVlcnkoZWxlbWVudCwgc2VsZWN0b3IsIG11bHRpKTtcbiAgfVxuXG4gIGNvbXB1dGVTdHlsZShlbGVtZW50OiBhbnksIHByb3A6IHN0cmluZywgZGVmYXVsdFZhbHVlPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIGFzIGFueSlbcHJvcF0gYXMgc3RyaW5nO1xuICB9XG5cbiAgYnVpbGRLZXlmcmFtZUVsZW1lbnQoZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcsIGtleWZyYW1lczoge1trZXk6IHN0cmluZ106IGFueX1bXSk6IGFueSB7XG4gICAga2V5ZnJhbWVzID0ga2V5ZnJhbWVzLm1hcChrZiA9PiBoeXBlbmF0ZVByb3BzT2JqZWN0KGtmKSk7XG4gICAgbGV0IGtleWZyYW1lU3RyID0gYEBrZXlmcmFtZXMgJHtuYW1lfSB7XFxuYDtcbiAgICBsZXQgdGFiID0gJyc7XG4gICAga2V5ZnJhbWVzLmZvckVhY2goa2YgPT4ge1xuICAgICAgdGFiID0gVEFCX1NQQUNFO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gcGFyc2VGbG9hdChrZi5vZmZzZXQpO1xuICAgICAga2V5ZnJhbWVTdHIgKz0gYCR7dGFifSR7b2Zmc2V0ICogMTAwfSUge1xcbmA7XG4gICAgICB0YWIgKz0gVEFCX1NQQUNFO1xuICAgICAgT2JqZWN0LmtleXMoa2YpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0ga2ZbcHJvcF07XG4gICAgICAgIHN3aXRjaCAocHJvcCkge1xuICAgICAgICAgIGNhc2UgJ29mZnNldCc6XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgY2FzZSAnZWFzaW5nJzpcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICBrZXlmcmFtZVN0ciArPSBgJHt0YWJ9YW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogJHt2YWx1ZX07XFxuYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAga2V5ZnJhbWVTdHIgKz0gYCR7dGFifSR7cHJvcH06ICR7dmFsdWV9O1xcbmA7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAga2V5ZnJhbWVTdHIgKz0gYCR7dGFifX1cXG5gO1xuICAgIH0pO1xuICAgIGtleWZyYW1lU3RyICs9IGB9XFxuYDtcblxuICAgIGNvbnN0IGtmRWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBrZkVsbS5pbm5lckhUTUwgPSBrZXlmcmFtZVN0cjtcbiAgICByZXR1cm4ga2ZFbG07XG4gIH1cblxuICBhbmltYXRlKFxuICAgICAgZWxlbWVudDogYW55LCBrZXlmcmFtZXM6IMm1U3R5bGVEYXRhW10sIGR1cmF0aW9uOiBudW1iZXIsIGRlbGF5OiBudW1iZXIsIGVhc2luZzogc3RyaW5nLFxuICAgICAgcHJldmlvdXNQbGF5ZXJzOiBBbmltYXRpb25QbGF5ZXJbXSA9IFtdLCBzY3J1YmJlckFjY2Vzc1JlcXVlc3RlZD86IGJvb2xlYW4pOiBBbmltYXRpb25QbGF5ZXIge1xuICAgIGlmIChzY3J1YmJlckFjY2Vzc1JlcXVlc3RlZCkge1xuICAgICAgdGhpcy5fbm90aWZ5RmF1bHR5U2NydWJiZXIoKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2aW91c0Nzc0tleWZyYW1lUGxheWVycyA9IDxDc3NLZXlmcmFtZXNQbGF5ZXJbXT5wcmV2aW91c1BsYXllcnMuZmlsdGVyKFxuICAgICAgICBwbGF5ZXIgPT4gcGxheWVyIGluc3RhbmNlb2YgQ3NzS2V5ZnJhbWVzUGxheWVyKTtcblxuICAgIGNvbnN0IHByZXZpb3VzU3R5bGVzOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuXG4gICAgaWYgKGFsbG93UHJldmlvdXNQbGF5ZXJTdHlsZXNNZXJnZShkdXJhdGlvbiwgZGVsYXkpKSB7XG4gICAgICBwcmV2aW91c0Nzc0tleWZyYW1lUGxheWVycy5mb3JFYWNoKHBsYXllciA9PiB7XG4gICAgICAgIGxldCBzdHlsZXMgPSBwbGF5ZXIuY3VycmVudFNuYXBzaG90O1xuICAgICAgICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2gocHJvcCA9PiBwcmV2aW91c1N0eWxlc1twcm9wXSA9IHN0eWxlc1twcm9wXSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBrZXlmcmFtZXMgPSBiYWxhbmNlUHJldmlvdXNTdHlsZXNJbnRvS2V5ZnJhbWVzKGVsZW1lbnQsIGtleWZyYW1lcywgcHJldmlvdXNTdHlsZXMpO1xuICAgIGNvbnN0IGZpbmFsU3R5bGVzID0gZmxhdHRlbktleWZyYW1lc0ludG9TdHlsZXMoa2V5ZnJhbWVzKTtcblxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGFuaW1hdGlvbiB0aGVuIHRoZXJlIGlzIG5vIHBvaW50IGluIGFwcGx5aW5nXG4gICAgLy8gc3R5bGVzIGFuZCB3YWl0aW5nIGZvciBhbiBldmVudCB0byBnZXQgZmlyZWQuIFRoaXMgY2F1c2VzIGxhZy5cbiAgICAvLyBJdCdzIGJldHRlciB0byBqdXN0IGRpcmVjdGx5IGFwcGx5IHRoZSBzdHlsZXMgdG8gdGhlIGVsZW1lbnRcbiAgICAvLyB2aWEgdGhlIGRpcmVjdCBzdHlsaW5nIGFuaW1hdGlvbiBwbGF5ZXIuXG4gICAgaWYgKGR1cmF0aW9uID09IDApIHtcbiAgICAgIHJldHVybiBuZXcgRGlyZWN0U3R5bGVQbGF5ZXIoZWxlbWVudCwgZmluYWxTdHlsZXMpO1xuICAgIH1cblxuICAgIGNvbnN0IGFuaW1hdGlvbk5hbWUgPSBgJHtLRVlGUkFNRVNfTkFNRV9QUkVGSVh9JHt0aGlzLl9jb3VudCsrfWA7XG4gICAgY29uc3Qga2ZFbG0gPSB0aGlzLmJ1aWxkS2V5ZnJhbWVFbGVtZW50KGVsZW1lbnQsIGFuaW1hdGlvbk5hbWUsIGtleWZyYW1lcyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpICEuYXBwZW5kQ2hpbGQoa2ZFbG0pO1xuXG4gICAgY29uc3QgcGxheWVyID0gbmV3IENzc0tleWZyYW1lc1BsYXllcihcbiAgICAgICAgZWxlbWVudCwga2V5ZnJhbWVzLCBhbmltYXRpb25OYW1lLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgZmluYWxTdHlsZXMpO1xuXG4gICAgcGxheWVyLm9uRGVzdHJveSgoKSA9PiByZW1vdmVFbGVtZW50KGtmRWxtKSk7XG4gICAgcmV0dXJuIHBsYXllcjtcbiAgfVxuXG4gIHByaXZhdGUgX25vdGlmeUZhdWx0eVNjcnViYmVyKCkge1xuICAgIGlmICghdGhpcy5fd2FybmluZ0lzc3VlZCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdAYW5ndWxhci9hbmltYXRpb25zOiBwbGVhc2UgbG9hZCB0aGUgd2ViLWFuaW1hdGlvbnMuanMgcG9seWZpbGwgdG8gYWxsb3cgcHJvZ3JhbW1hdGljIGFjY2Vzcy4uLlxcbicsXG4gICAgICAgICAgJyAgdmlzaXQgaHR0cDovL2JpdC5seS9JV3VrYW0gdG8gbGVhcm4gbW9yZSBhYm91dCB1c2luZyB0aGUgd2ViLWFuaW1hdGlvbi1qcyBwb2x5ZmlsbC4nKTtcbiAgICAgIHRoaXMuX3dhcm5pbmdJc3N1ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmbGF0dGVuS2V5ZnJhbWVzSW50b1N0eWxlcyhcbiAgICBrZXlmcmFtZXM6IG51bGwgfCB7W2tleTogc3RyaW5nXTogYW55fSB8IHtba2V5OiBzdHJpbmddOiBhbnl9W10pOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIGxldCBmbGF0S2V5ZnJhbWVzOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuICBpZiAoa2V5ZnJhbWVzKSB7XG4gICAgY29uc3Qga2ZzID0gQXJyYXkuaXNBcnJheShrZXlmcmFtZXMpID8ga2V5ZnJhbWVzIDogW2tleWZyYW1lc107XG4gICAga2ZzLmZvckVhY2goa2YgPT4ge1xuICAgICAgT2JqZWN0LmtleXMoa2YpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgIGlmIChwcm9wID09ICdvZmZzZXQnIHx8IHByb3AgPT0gJ2Vhc2luZycpIHJldHVybjtcbiAgICAgICAgZmxhdEtleWZyYW1lc1twcm9wXSA9IGtmW3Byb3BdO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGZsYXRLZXlmcmFtZXM7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUVsZW1lbnQobm9kZTogYW55KSB7XG4gIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbn1cbiJdfQ==