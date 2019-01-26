/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function EffectNotification() { }
/** @type {?} */
EffectNotification.prototype.effect;
/** @type {?} */
EffectNotification.prototype.propertyName;
/** @type {?} */
EffectNotification.prototype.sourceName;
/** @type {?} */
EffectNotification.prototype.sourceInstance;
/** @type {?} */
EffectNotification.prototype.notification;
/**
 * @param {?} output
 * @param {?} reporter
 * @return {?}
 */
export function verifyOutput(output, reporter) {
    reportErrorThrown(output, reporter);
    reportInvalidActions(output, reporter);
}
/**
 * @param {?} output
 * @param {?} reporter
 * @return {?}
 */
function reportErrorThrown(output, reporter) {
    if (output.notification.kind === 'E') {
        reporter.handleError(output.notification.error);
    }
}
/**
 * @param {?} output
 * @param {?} reporter
 * @return {?}
 */
function reportInvalidActions(output, reporter) {
    if (output.notification.kind === 'N') {
        /** @type {?} */
        const action = output.notification.value;
        /** @type {?} */
        const isInvalidAction = !isAction(action);
        if (isInvalidAction) {
            reporter.handleError(new Error(`Effect ${getEffectName(output)} dispatched an invalid action: ${stringify(action)}`));
        }
    }
}
/**
 * @param {?} action
 * @return {?}
 */
function isAction(action) {
    return action && action.type && typeof action.type === 'string';
}
/**
 * @param {?} __0
 * @return {?}
 */
function getEffectName({ propertyName, sourceInstance, sourceName, }) {
    /** @type {?} */
    const isMethod = typeof sourceInstance[propertyName] === 'function';
    return `"${sourceName}.${propertyName}${isMethod ? '()' : ''}"`;
}
/**
 * @param {?} action
 * @return {?}
 */
function stringify(action) {
    try {
        return JSON.stringify(action);
    }
    catch (_a) {
        return action;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0X25vdGlmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zcmMvZWZmZWN0X25vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVlBLE1BQU0sVUFBVSxZQUFZLENBQzFCLE1BQTBCLEVBQzFCLFFBQXNCO0lBRXRCLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDeEM7Ozs7OztBQUVELFNBQVMsaUJBQWlCLENBQUMsTUFBMEIsRUFBRSxRQUFzQjtJQUMzRSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRTtRQUNwQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDakQ7Q0FDRjs7Ozs7O0FBRUQsU0FBUyxvQkFBb0IsQ0FDM0IsTUFBMEIsRUFDMUIsUUFBc0I7SUFFdEIsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUU7O1FBQ3BDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDOztRQUN6QyxNQUFNLGVBQWUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUxQyxJQUFJLGVBQWUsRUFBRTtZQUNuQixRQUFRLENBQUMsV0FBVyxDQUNsQixJQUFJLEtBQUssQ0FDUCxVQUFVLGFBQWEsQ0FDckIsTUFBTSxDQUNQLGtDQUFrQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDdkQsQ0FDRixDQUFDO1NBQ0g7S0FDRjtDQUNGOzs7OztBQUVELFNBQVMsUUFBUSxDQUFDLE1BQVc7SUFDM0IsT0FBTyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDO0NBQ2pFOzs7OztBQUVELFNBQVMsYUFBYSxDQUFDLEVBQ3JCLFlBQVksRUFDWixjQUFjLEVBQ2QsVUFBVSxHQUNTOztJQUNuQixNQUFNLFFBQVEsR0FBRyxPQUFPLGNBQWMsQ0FBQyxZQUFZLENBQUMsS0FBSyxVQUFVLENBQUM7SUFFcEUsT0FBTyxJQUFJLFVBQVUsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO0NBQ2pFOzs7OztBQUVELFNBQVMsU0FBUyxDQUFDLE1BQWlDO0lBQ2xELElBQUk7UUFDRixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDL0I7SUFBQyxXQUFNO1FBQ04sT0FBTyxNQUFNLENBQUM7S0FDZjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb24sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBFZmZlY3ROb3RpZmljYXRpb24ge1xuICBlZmZlY3Q6IE9ic2VydmFibGU8YW55PiB8ICgoKSA9PiBPYnNlcnZhYmxlPGFueT4pO1xuICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcbiAgc291cmNlTmFtZTogc3RyaW5nO1xuICBzb3VyY2VJbnN0YW5jZTogYW55O1xuICBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbjxBY3Rpb24gfCBudWxsIHwgdW5kZWZpbmVkPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeU91dHB1dChcbiAgb3V0cHV0OiBFZmZlY3ROb3RpZmljYXRpb24sXG4gIHJlcG9ydGVyOiBFcnJvckhhbmRsZXJcbikge1xuICByZXBvcnRFcnJvclRocm93bihvdXRwdXQsIHJlcG9ydGVyKTtcbiAgcmVwb3J0SW52YWxpZEFjdGlvbnMob3V0cHV0LCByZXBvcnRlcik7XG59XG5cbmZ1bmN0aW9uIHJlcG9ydEVycm9yVGhyb3duKG91dHB1dDogRWZmZWN0Tm90aWZpY2F0aW9uLCByZXBvcnRlcjogRXJyb3JIYW5kbGVyKSB7XG4gIGlmIChvdXRwdXQubm90aWZpY2F0aW9uLmtpbmQgPT09ICdFJykge1xuICAgIHJlcG9ydGVyLmhhbmRsZUVycm9yKG91dHB1dC5ub3RpZmljYXRpb24uZXJyb3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlcG9ydEludmFsaWRBY3Rpb25zKFxuICBvdXRwdXQ6IEVmZmVjdE5vdGlmaWNhdGlvbixcbiAgcmVwb3J0ZXI6IEVycm9ySGFuZGxlclxuKSB7XG4gIGlmIChvdXRwdXQubm90aWZpY2F0aW9uLmtpbmQgPT09ICdOJykge1xuICAgIGNvbnN0IGFjdGlvbiA9IG91dHB1dC5ub3RpZmljYXRpb24udmFsdWU7XG4gICAgY29uc3QgaXNJbnZhbGlkQWN0aW9uID0gIWlzQWN0aW9uKGFjdGlvbik7XG5cbiAgICBpZiAoaXNJbnZhbGlkQWN0aW9uKSB7XG4gICAgICByZXBvcnRlci5oYW5kbGVFcnJvcihcbiAgICAgICAgbmV3IEVycm9yKFxuICAgICAgICAgIGBFZmZlY3QgJHtnZXRFZmZlY3ROYW1lKFxuICAgICAgICAgICAgb3V0cHV0XG4gICAgICAgICAgKX0gZGlzcGF0Y2hlZCBhbiBpbnZhbGlkIGFjdGlvbjogJHtzdHJpbmdpZnkoYWN0aW9uKX1gXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGlzQWN0aW9uKGFjdGlvbjogYW55KTogYWN0aW9uIGlzIEFjdGlvbiB7XG4gIHJldHVybiBhY3Rpb24gJiYgYWN0aW9uLnR5cGUgJiYgdHlwZW9mIGFjdGlvbi50eXBlID09PSAnc3RyaW5nJztcbn1cblxuZnVuY3Rpb24gZ2V0RWZmZWN0TmFtZSh7XG4gIHByb3BlcnR5TmFtZSxcbiAgc291cmNlSW5zdGFuY2UsXG4gIHNvdXJjZU5hbWUsXG59OiBFZmZlY3ROb3RpZmljYXRpb24pIHtcbiAgY29uc3QgaXNNZXRob2QgPSB0eXBlb2Ygc291cmNlSW5zdGFuY2VbcHJvcGVydHlOYW1lXSA9PT0gJ2Z1bmN0aW9uJztcblxuICByZXR1cm4gYFwiJHtzb3VyY2VOYW1lfS4ke3Byb3BlcnR5TmFtZX0ke2lzTWV0aG9kID8gJygpJyA6ICcnfVwiYDtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFjdGlvbjogQWN0aW9uIHwgbnVsbCB8IHVuZGVmaW5lZCkge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhY3Rpb24pO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gYWN0aW9uO1xuICB9XG59XG4iXX0=