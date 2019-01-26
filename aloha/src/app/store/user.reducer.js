"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = require("../models/user.model");
var user_actions_1 = require("./actions/user.actions");
function userReducer(state, action) {
    if (state === void 0) { state = user_model_1.initialState; }
    switch (action.type) {
        case user_actions_1.READ_USER:
            return Object.assign({}, state, action);
        case user_actions_1.WRITE_USER:
            return Object.assign({}, state, action.user);
        default:
            return Object.assign({}, state, action);
    }
}
exports.userReducer = userReducer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbURBQTBEO0FBQzFELHVEQUErRDtBQUkvRCxTQUFnQixXQUFXLENBQUMsS0FBMEIsRUFBRSxNQUErQjtJQUEzRCxzQkFBQSxFQUFBLFFBQWMseUJBQVk7SUFDbEQsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ2pCLEtBQUssd0JBQVM7WUFDVixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM1QyxLQUFLLHlCQUFVO1lBQ1gsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pEO1lBQ0ksT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDL0M7QUFDTCxDQUFDO0FBVEQsa0NBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tIFwiQG5ncngvc3RvcmVcIjtcclxuaW1wb3J0IHsgVXNlciwgaW5pdGlhbFN0YXRlIH0gZnJvbSBcIi4uL21vZGVscy91c2VyLm1vZGVsXCI7XHJcbmltcG9ydCB7IFJFQURfVVNFUiwgV1JJVEVfVVNFUiB9IGZyb20gXCIuL2FjdGlvbnMvdXNlci5hY3Rpb25zXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBVc2VyQWN0aW9ucyBmcm9tIFwiLi9hY3Rpb25zL3VzZXIuYWN0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVzZXJSZWR1Y2VyKHN0YXRlOiBVc2VyID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IFVzZXJBY3Rpb25zLlVzZXJBY3Rpb25zKSB7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBSRUFEX1VTRVI6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgYWN0aW9uKTtcclxuICAgICAgICBjYXNlIFdSSVRFX1VTRVI6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgYWN0aW9uLnVzZXIpO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgYWN0aW9uKTtcclxuICAgIH1cclxufSJdfQ==