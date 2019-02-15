"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_actions_1 = require("./user.actions");
function userReducer(state, action) {
    switch (action.type) {
        case user_actions_1.READ_USER_SUCCESS:
            return __assign({}, state, { user: action.user });
        case user_actions_1.UPDATE_USER_SUCCESS:
            return __assign({}, state, { user: action.user });
        default:
            return state;
    }
}
exports.userReducer = userReducer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQXFGO0FBSXJGLFNBQWdCLFdBQVcsQ0FBQyxLQUFlLEVBQUUsTUFBbUI7SUFDNUQsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ2pCLEtBQUssZ0NBQWlCO1lBQ2xCLG9CQUFZLEtBQUssSUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksSUFBRTtRQUMxQyxLQUFLLGtDQUFtQjtZQUNwQixvQkFBWSxLQUFLLElBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUU7UUFDMUM7WUFDSSxPQUFPLEtBQUssQ0FBQztLQUNwQjtBQUNMLENBQUM7QUFURCxrQ0FTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXJBY3Rpb25zLCBSRUFEX1VTRVJfU1VDQ0VTUywgVVBEQVRFX1VTRVJfU1VDQ0VTUyB9IGZyb20gXCIuL3VzZXIuYWN0aW9uc1wiO1xyXG5pbXBvcnQgeyBBcHBTdGF0ZSB9IGZyb20gXCIuLi9hcHAuc3RhdGVcIjtcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXNlclJlZHVjZXIoc3RhdGU6IEFwcFN0YXRlLCBhY3Rpb246IFVzZXJBY3Rpb25zKTogQXBwU3RhdGUge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgUkVBRF9VU0VSX1NVQ0NFU1M6XHJcbiAgICAgICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCB1c2VyOiBhY3Rpb24udXNlciB9XHJcbiAgICAgICAgY2FzZSBVUERBVEVfVVNFUl9TVUNDRVNTOlxyXG4gICAgICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSwgdXNlcjogYWN0aW9uLnVzZXIgfVxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxufSJdfQ==