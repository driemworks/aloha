"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hue_actions_1 = require("./hue.actions");
function hueReducer(state, action) {
    switch (action.type) {
        // case UPDATE_LIGHT_STATE_SUCCESS: {
        //     return { ... state, lightState: action.payload };
        // }
        case hue_actions_1.GET_LIGHT_STATE_SUCCESS: {
            return __assign({}, state, { lightState: action.lightState });
        }
        default: {
            return state;
        }
    }
}
exports.hueReducer = hueReducer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVlLnJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodWUucmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDZDQUFnRztBQUVoRyxTQUFnQixVQUFVLENBQUMsS0FBZSxFQUFFLE1BQWtCO0lBRTFELFFBQU8sTUFBTSxDQUFDLElBQUksRUFBRTtRQUNoQixxQ0FBcUM7UUFDckMsd0RBQXdEO1FBQ3hELElBQUk7UUFDSixLQUFLLHFDQUF1QixDQUFDLENBQUM7WUFDMUIsb0JBQVksS0FBSyxJQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVSxJQUFFO1NBQ3JEO1FBQ0QsT0FBTyxDQUFDLENBQUM7WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNoQjtLQUNKO0FBRUwsQ0FBQztBQWRELGdDQWNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwU3RhdGUgfSBmcm9tIFwiLi4vYXBwLnN0YXRlXCI7XHJcbmltcG9ydCB7IFVQREFURV9MSUdIVF9TVEFURV9TVUNDRVNTLCBIdWVBY3Rpb25zLCBHRVRfTElHSFRfU1RBVEVfU1VDQ0VTUyB9IGZyb20gXCIuL2h1ZS5hY3Rpb25zXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaHVlUmVkdWNlcihzdGF0ZTogQXBwU3RhdGUsIGFjdGlvbjogSHVlQWN0aW9ucyk6IEFwcFN0YXRlIHtcclxuXHJcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICAvLyBjYXNlIFVQREFURV9MSUdIVF9TVEFURV9TVUNDRVNTOiB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiB7IC4uLiBzdGF0ZSwgbGlnaHRTdGF0ZTogYWN0aW9uLnBheWxvYWQgfTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgY2FzZSBHRVRfTElHSFRfU1RBVEVfU1VDQ0VTUzoge1xyXG4gICAgICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSwgbGlnaHRTdGF0ZTogYWN0aW9uLmxpZ2h0U3RhdGUgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59Il19