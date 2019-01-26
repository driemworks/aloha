/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { computeStyle } from '../../util';
import { ElementAnimationStyleHandler } from './element_animation_style_handler';
/** @type {?} */
const DEFAULT_FILL_MODE = 'forwards';
/** @type {?} */
const DEFAULT_EASING = 'linear';
/** @type {?} */
const ANIMATION_END_EVENT = 'animationend';
/** @enum {number} */
const AnimatorControlState = {
    INITIALIZED: 1, STARTED: 2, FINISHED: 3, DESTROYED: 4,
};
export { AnimatorControlState };
export class CssKeyframesPlayer {
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} animationName
     * @param {?} _duration
     * @param {?} _delay
     * @param {?} easing
     * @param {?} _finalStyles
     */
    constructor(element, keyframes, animationName, _duration, _delay, easing, _finalStyles) {
        this.element = element;
        this.keyframes = keyframes;
        this.animationName = animationName;
        this._duration = _duration;
        this._delay = _delay;
        this._finalStyles = _finalStyles;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._onDestroyFns = [];
        this._started = false;
        this.currentSnapshot = {};
        this._state = 0;
        this.easing = easing || DEFAULT_EASING;
        this.totalTime = _duration + _delay;
        this._buildStyler();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onStart(fn) { this._onStartFns.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDone(fn) { this._onDoneFns.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDestroy(fn) { this._onDestroyFns.push(fn); }
    /**
     * @return {?}
     */
    destroy() {
        this.init();
        if (this._state >= 4 /* DESTROYED */)
            return;
        this._state = 4 /* DESTROYED */;
        this._styler.destroy();
        this._flushStartFns();
        this._flushDoneFns();
        this._onDestroyFns.forEach(fn => fn());
        this._onDestroyFns = [];
    }
    /**
     * @return {?}
     */
    _flushDoneFns() {
        this._onDoneFns.forEach(fn => fn());
        this._onDoneFns = [];
    }
    /**
     * @return {?}
     */
    _flushStartFns() {
        this._onStartFns.forEach(fn => fn());
        this._onStartFns = [];
    }
    /**
     * @return {?}
     */
    finish() {
        this.init();
        if (this._state >= 3 /* FINISHED */)
            return;
        this._state = 3 /* FINISHED */;
        this._styler.finish();
        this._flushStartFns();
        this._flushDoneFns();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setPosition(value) { this._styler.setPosition(value); }
    /**
     * @return {?}
     */
    getPosition() { return this._styler.getPosition(); }
    /**
     * @return {?}
     */
    hasStarted() { return this._state >= 2 /* STARTED */; }
    /**
     * @return {?}
     */
    init() {
        if (this._state >= 1 /* INITIALIZED */)
            return;
        this._state = 1 /* INITIALIZED */;
        /** @type {?} */
        const elm = this.element;
        this._styler.apply();
        if (this._delay) {
            this._styler.pause();
        }
    }
    /**
     * @return {?}
     */
    play() {
        this.init();
        if (!this.hasStarted()) {
            this._flushStartFns();
            this._state = 2 /* STARTED */;
        }
        this._styler.resume();
    }
    /**
     * @return {?}
     */
    pause() {
        this.init();
        this._styler.pause();
    }
    /**
     * @return {?}
     */
    restart() {
        this.reset();
        this.play();
    }
    /**
     * @return {?}
     */
    reset() {
        this._styler.destroy();
        this._buildStyler();
        this._styler.apply();
    }
    /**
     * @return {?}
     */
    _buildStyler() {
        this._styler = new ElementAnimationStyleHandler(this.element, this.animationName, this._duration, this._delay, this.easing, DEFAULT_FILL_MODE, () => this.finish());
    }
    /**
     * \@internal
     * @param {?} phaseName
     * @return {?}
     */
    triggerCallback(phaseName) {
        /** @type {?} */
        const methods = phaseName == 'start' ? this._onStartFns : this._onDoneFns;
        methods.forEach(fn => fn());
        methods.length = 0;
    }
    /**
     * @return {?}
     */
    beforeDestroy() {
        this.init();
        /** @type {?} */
        const styles = {};
        if (this.hasStarted()) {
            /** @type {?} */
            const finished = this._state >= 3 /* FINISHED */;
            Object.keys(this._finalStyles).forEach(prop => {
                if (prop != 'offset') {
                    styles[prop] = finished ? this._finalStyles[prop] : computeStyle(this.element, prop);
                }
            });
        }
        this.currentSnapshot = styles;
    }
}
if (false) {
    /** @type {?} */
    CssKeyframesPlayer.prototype._onDoneFns;
    /** @type {?} */
    CssKeyframesPlayer.prototype._onStartFns;
    /** @type {?} */
    CssKeyframesPlayer.prototype._onDestroyFns;
    /** @type {?} */
    CssKeyframesPlayer.prototype._started;
    /** @type {?} */
    CssKeyframesPlayer.prototype._styler;
    /** @type {?} */
    CssKeyframesPlayer.prototype.parentPlayer;
    /** @type {?} */
    CssKeyframesPlayer.prototype.totalTime;
    /** @type {?} */
    CssKeyframesPlayer.prototype.easing;
    /** @type {?} */
    CssKeyframesPlayer.prototype.currentSnapshot;
    /** @type {?} */
    CssKeyframesPlayer.prototype._state;
    /** @type {?} */
    CssKeyframesPlayer.prototype.element;
    /** @type {?} */
    CssKeyframesPlayer.prototype.keyframes;
    /** @type {?} */
    CssKeyframesPlayer.prototype.animationName;
    /** @type {?} */
    CssKeyframesPlayer.prototype._duration;
    /** @type {?} */
    CssKeyframesPlayer.prototype._delay;
    /** @type {?} */
    CssKeyframesPlayer.prototype._finalStyles;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzX2tleWZyYW1lc19wbGF5ZXIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmltYXRpb25zL2Jyb3dzZXIvc3JjL3JlbmRlci9jc3Nfa2V5ZnJhbWVzL2Nzc19rZXlmcmFtZXNfcGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFTQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBRXhDLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDOztNQUV6RSxpQkFBaUIsR0FBRyxVQUFVOztNQUM5QixjQUFjLEdBQUcsUUFBUTs7TUFDekIsbUJBQW1CLEdBQUcsY0FBYzs7O0lBRUYsY0FBZSxFQUFFLFVBQVcsRUFBRSxXQUFZLEVBQUUsWUFBYTs7O0FBRWpHLE1BQU0sT0FBTyxrQkFBa0I7Ozs7Ozs7Ozs7SUFpQjdCLFlBQ29CLE9BQVksRUFBa0IsU0FBNkMsRUFDM0UsYUFBcUIsRUFBbUIsU0FBaUIsRUFDeEQsTUFBYyxFQUFFLE1BQWMsRUFDOUIsWUFBa0M7UUFIbkMsWUFBTyxHQUFQLE9BQU8sQ0FBSztRQUFrQixjQUFTLEdBQVQsU0FBUyxDQUFvQztRQUMzRSxrQkFBYSxHQUFiLGFBQWEsQ0FBUTtRQUFtQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ3hELFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxpQkFBWSxHQUFaLFlBQVksQ0FBc0I7UUFwQi9DLGVBQVUsR0FBZSxFQUFFLENBQUM7UUFDNUIsZ0JBQVcsR0FBZSxFQUFFLENBQUM7UUFDN0Isa0JBQWEsR0FBZSxFQUFFLENBQUM7UUFFL0IsYUFBUSxHQUFHLEtBQUssQ0FBQztRQVFsQixvQkFBZSxHQUE0QixFQUFFLENBQUM7UUFFN0MsV0FBTSxHQUF5QixDQUFDLENBQUM7UUFPdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksY0FBYyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcs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QUU7O2tCQUNmLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxvQkFBaUM7WUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM1QyxJQUFJLElBQUksSUFBSSxRQUFRLEVBQUU7b0JBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN0RjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQztJQUNoQyxDQUFDO0NBQ0Y7OztJQTlIQyx3Q0FBb0M7O0lBQ3BDLHlDQUFxQzs7SUFDckMsMkNBQXVDOztJQUV2QyxzQ0FBeUI7O0lBRXpCLHFDQUFnRDs7SUFHaEQsMENBQXVDOztJQUN2Qyx1Q0FBa0M7O0lBQ2xDLG9DQUErQjs7SUFDL0IsNkNBQXFEOztJQUVyRCxvQ0FBeUM7O0lBR3JDLHFDQUE0Qjs7SUFBRSx1Q0FBNkQ7O0lBQzNGLDJDQUFxQzs7SUFBRSx1Q0FBa0M7O0lBQ3pFLG9DQUErQjs7SUFDL0IsMENBQW1EIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtBbmltYXRpb25QbGF5ZXJ9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQge2NvbXB1dGVTdHlsZX0gZnJvbSAnLi4vLi4vdXRpbCc7XG5cbmltcG9ydCB7RWxlbWVudEFuaW1hdGlvblN0eWxlSGFuZGxlcn0gZnJvbSAnLi9lbGVtZW50X2FuaW1hdGlvbl9zdHlsZV9oYW5kbGVyJztcblxuY29uc3QgREVGQVVMVF9GSUxMX01PREUgPSAnZm9yd2FyZHMnO1xuY29uc3QgREVGQVVMVF9FQVNJTkcgPSAnbGluZWFyJztcbmNvbnN0IEFOSU1BVElPTl9FTkRfRVZFTlQgPSAnYW5pbWF0aW9uZW5kJztcblxuZXhwb3J0IGNvbnN0IGVudW0gQW5pbWF0b3JDb250cm9sU3RhdGUge0lOSVRJQUxJWkVEID0gMSwgU1RBUlRFRCA9IDIsIEZJTklTSEVEID0gMywgREVTVFJPWUVEID0gNH1cblxuZXhwb3J0IGNsYXNzIENzc0tleWZyYW1lc1BsYXllciBpbXBsZW1lbnRzIEFuaW1hdGlvblBsYXllciB7XG4gIHByaXZhdGUgX29uRG9uZUZuczogRnVuY3Rpb25bXSA9IFtdO1xuICBwcml2YXRlIF9vblN0YXJ0Rm5zOiBGdW5jdGlvbltdID0gW107XG4gIHByaXZhdGUgX29uRGVzdHJveUZuczogRnVuY3Rpb25bXSA9IFtdO1xuXG4gIHByaXZhdGUgX3N0YXJ0ZWQgPSBmYWxzZTtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgX3N0eWxlciAhOiBFbGVtZW50QW5pbWF0aW9uU3R5bGVIYW5kbGVyO1xuXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwdWJsaWMgcGFyZW50UGxheWVyICE6IEFuaW1hdGlvblBsYXllcjtcbiAgcHVibGljIHJlYWRvbmx5IHRvdGFsVGltZTogbnVtYmVyO1xuICBwdWJsaWMgcmVhZG9ubHkgZWFzaW5nOiBzdHJpbmc7XG4gIHB1YmxpYyBjdXJyZW50U25hcHNob3Q6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG5cbiAgcHJpdmF0ZSBfc3RhdGU6IEFuaW1hdG9yQ29udHJvbFN0YXRlID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByZWFkb25seSBlbGVtZW50OiBhbnksIHB1YmxpYyByZWFkb25seSBrZXlmcmFtZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXJ9W10sXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgYW5pbWF0aW9uTmFtZTogc3RyaW5nLCBwcml2YXRlIHJlYWRvbmx5IF9kdXJhdGlvbjogbnVtYmVyLFxuICAgICAgcHJpdmF0ZSByZWFkb25seSBfZGVsYXk6IG51bWJlciwgZWFzaW5nOiBzdHJpbmcsXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IF9maW5hbFN0eWxlczoge1trZXk6IHN0cmluZ106IGFueX0pIHtcbiAgICB0aGlzLmVhc2luZyA9IGVhc2luZyB8fCBERUZBVUxUX0VBU0lORztcbiAgICB0aGlzLnRvdGFsVGltZSA9IF9kdXJhdGlvbiArIF9kZWxheTtcbiAgICB0aGlzLl9idWlsZFN0eWxlcigpO1xuICB9XG5cbiAgb25TdGFydChmbjogKCkgPT4gdm9pZCk6IHZvaWQgeyB0aGlzLl9vblN0YXJ0Rm5zLnB1c2goZm4pOyB9XG5cbiAgb25Eb25lKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX29uRG9uZUZucy5wdXNoKGZuKTsgfVxuXG4gIG9uRGVzdHJveShmbjogKCkgPT4gdm9pZCk6IHZvaWQgeyB0aGlzLl9vbkRlc3Ryb3lGbnMucHVzaChmbik7IH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIGlmICh0aGlzLl9zdGF0ZSA+PSBBbmltYXRvckNvbnRyb2xTdGF0ZS5ERVNUUk9ZRUQpIHJldHVybjtcbiAgICB0aGlzLl9zdGF0ZSA9IEFuaW1hdG9yQ29udHJvbFN0YXRlLkRFU1RST1lFRDtcbiAgICB0aGlzLl9zdHlsZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuX2ZsdXNoU3RhcnRGbnMoKTtcbiAgICB0aGlzLl9mbHVzaERvbmVGbnMoKTtcbiAgICB0aGlzLl9vbkRlc3Ryb3lGbnMuZm9yRWFjaChmbiA9PiBmbigpKTtcbiAgICB0aGlzLl9vbkRlc3Ryb3lGbnMgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZsdXNoRG9uZUZucygpIHtcbiAgICB0aGlzLl9vbkRvbmVGbnMuZm9yRWFjaChmbiA9PiBmbigpKTtcbiAgICB0aGlzLl9vbkRvbmVGbnMgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZsdXNoU3RhcnRGbnMoKSB7XG4gICAgdGhpcy5fb25TdGFydEZucy5mb3JFYWNoKGZuID0+IGZuKCkpO1xuICAgIHRoaXMuX29uU3RhcnRGbnMgPSBbXTtcbiAgfVxuXG4gIGZpbmlzaCgpIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgICBpZiAodGhpcy5fc3RhdGUgPj0gQW5pbWF0b3JDb250cm9sU3RhdGUuRklOSVNIRUQpIHJldHVybjtcbiAgICB0aGlzLl9zdGF0ZSA9IEFuaW1hdG9yQ29udHJvbFN0YXRlLkZJTklTSEVEO1xuICAgIHRoaXMuX3N0eWxlci5maW5pc2goKTtcbiAgICB0aGlzLl9mbHVzaFN0YXJ0Rm5zKCk7XG4gICAgdGhpcy5fZmx1c2hEb25lRm5zKCk7XG4gIH1cblxuICBzZXRQb3NpdGlvbih2YWx1ZTogbnVtYmVyKSB7IHRoaXMuX3N0eWxlci5zZXRQb3NpdGlvbih2YWx1ZSk7IH1cblxuICBnZXRQb3NpdGlvbigpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fc3R5bGVyLmdldFBvc2l0aW9uKCk7IH1cblxuICBoYXNTdGFydGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc3RhdGUgPj0gQW5pbWF0b3JDb250cm9sU3RhdGUuU1RBUlRFRDsgfVxuICBpbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zdGF0ZSA+PSBBbmltYXRvckNvbnRyb2xTdGF0ZS5JTklUSUFMSVpFRCkgcmV0dXJuO1xuICAgIHRoaXMuX3N0YXRlID0gQW5pbWF0b3JDb250cm9sU3RhdGUuSU5JVElBTElaRUQ7XG4gICAgY29uc3QgZWxtID0gdGhpcy5lbGVtZW50O1xuICAgIHRoaXMuX3N0eWxlci5hcHBseSgpO1xuICAgIGlmICh0aGlzLl9kZWxheSkge1xuICAgICAgdGhpcy5fc3R5bGVyLnBhdXNlKCk7XG4gICAgfVxuICB9XG5cbiAgcGxheSgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgICBpZiAoIXRoaXMuaGFzU3RhcnRlZCgpKSB7XG4gICAgICB0aGlzLl9mbHVzaFN0YXJ0Rm5zKCk7XG4gICAgICB0aGlzLl9zdGF0ZSA9IEFuaW1hdG9yQ29udHJvbFN0YXRlLlNUQVJURUQ7XG4gICAgfVxuICAgIHRoaXMuX3N0eWxlci5yZXN1bWUoKTtcbiAgfVxuXG4gIHBhdXNlKCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuX3N0eWxlci5wYXVzZSgpO1xuICB9XG4gIHJlc3RhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIHRoaXMucGxheSgpO1xuICB9XG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuX3N0eWxlci5kZXN0cm95KCk7XG4gICAgdGhpcy5fYnVpbGRTdHlsZXIoKTtcbiAgICB0aGlzLl9zdHlsZXIuYXBwbHkoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkU3R5bGVyKCkge1xuICAgIHRoaXMuX3N0eWxlciA9IG5ldyBFbGVtZW50QW5pbWF0aW9uU3R5bGVIYW5kbGVyKFxuICAgICAgICB0aGlzLmVsZW1lbnQsIHRoaXMuYW5pbWF0aW9uTmFtZSwgdGhpcy5fZHVyYXRpb24sIHRoaXMuX2RlbGF5LCB0aGlzLmVhc2luZyxcbiAgICAgICAgREVGQVVMVF9GSUxMX01PREUsICgpID0+IHRoaXMuZmluaXNoKCkpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICB0cmlnZ2VyQ2FsbGJhY2socGhhc2VOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBtZXRob2RzID0gcGhhc2VOYW1lID09ICdzdGFydCcgPyB0aGlzLl9vblN0YXJ0Rm5zIDogdGhpcy5fb25Eb25lRm5zO1xuICAgIG1ldGhvZHMuZm9yRWFjaChmbiA9PiBmbigpKTtcbiAgICBtZXRob2RzLmxlbmd0aCA9IDA7XG4gIH1cblxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIGNvbnN0IHN0eWxlczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICBpZiAodGhpcy5oYXNTdGFydGVkKCkpIHtcbiAgICAgIGNvbnN0IGZpbmlzaGVkID0gdGhpcy5fc3RhdGUgPj0gQW5pbWF0b3JDb250cm9sU3RhdGUuRklOSVNIRUQ7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLl9maW5hbFN0eWxlcykuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgaWYgKHByb3AgIT0gJ29mZnNldCcpIHtcbiAgICAgICAgICBzdHlsZXNbcHJvcF0gPSBmaW5pc2hlZCA/IHRoaXMuX2ZpbmFsU3R5bGVzW3Byb3BdIDogY29tcHV0ZVN0eWxlKHRoaXMuZWxlbWVudCwgcHJvcCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRTbmFwc2hvdCA9IHN0eWxlcztcbiAgfVxufVxuIl19