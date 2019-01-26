"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GroupState_model_1 = require("../models/GroupState.model");
var UserService = /** @class */ (function () {
    // constructor(private store: Store<AppState>) { }
    function UserService() {
    }
    // TODO - build this service
    UserService.prototype.getBridgeIp = function () {
        var _bridgeIp = "192.168.1.236";
        return _bridgeIp;
    };
    UserService.prototype.getUser = function () {
        var _username = "dOBMZLQEqwc08ab2saX8UT60qBv6vRPHTWi-2wi1";
        return _username;
    };
    UserService.prototype.getGroupStates = function () {
        return [new GroupState_model_1.GroupState("1", "O3MwvjfktgOHlRF"),
            new GroupState_model_1.GroupState("2", "X9MZ5qWaoQd8ZrX"),
            new GroupState_model_1.GroupState("3", "uVYKNKrZfxUQHHt")
        ];
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW1EO0FBQ25ELCtEQUF3RDtBQUt4RDtJQUVJLGtEQUFrRDtJQUNsRDtJQUFnQixDQUFDO0lBRWpCLDRCQUE0QjtJQUM1QixpQ0FBVyxHQUFYO1FBQ0ksSUFBSSxTQUFTLEdBQUcsZUFBZSxDQUFDO1FBQ2hDLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCw2QkFBTyxHQUFQO1FBQ0ksSUFBSSxTQUFTLEdBQUcsMENBQTBDLENBQUM7UUFDM0QsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELG9DQUFjLEdBQWQ7UUFDSSxPQUFPLENBQUMsSUFBSSw2QkFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQztZQUN0QyxJQUFJLDZCQUFVLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDO1lBQ3RDLElBQUksNkJBQVUsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUM7U0FDN0MsQ0FBQztJQUNOLENBQUM7SUFyQlEsV0FBVztRQUR2QixpQkFBVSxFQUFFOztPQUNBLFdBQVcsQ0FzQnZCO0lBQUQsa0JBQUM7Q0FBQSxBQXRCRCxJQXNCQztBQXRCWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEdyb3VwU3RhdGUgfSBmcm9tIFwiLi4vbW9kZWxzL0dyb3VwU3RhdGUubW9kZWxcIjtcclxuLy8gaW1wb3J0IHsgU3RvcmUgfSBmcm9tIFwiQG5ncngvc3RvcmVcIjtcclxuaW1wb3J0IHsgQXBwU3RhdGUgfSBmcm9tIFwiLi4vYXBwLnN0YXRlXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZSB7XHJcblxyXG4gICAgLy8gY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogU3RvcmU8QXBwU3RhdGU+KSB7IH1cclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgLy8gVE9ETyAtIGJ1aWxkIHRoaXMgc2VydmljZVxyXG4gICAgZ2V0QnJpZGdlSXAoKSB7XHJcbiAgICAgICAgbGV0IF9icmlkZ2VJcCA9IFwiMTkyLjE2OC4xLjIzNlwiO1xyXG4gICAgICAgIHJldHVybiBfYnJpZGdlSXA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlcigpIHtcclxuICAgICAgICBsZXQgX3VzZXJuYW1lID0gXCJkT0JNWkxRRXF3YzA4YWIyc2FYOFVUNjBxQnY2dlJQSFRXaS0yd2kxXCI7XHJcbiAgICAgICAgcmV0dXJuIF91c2VybmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cFN0YXRlcygpIHtcclxuICAgICAgICByZXR1cm4gW25ldyBHcm91cFN0YXRlKFwiMVwiLCBcIk8zTXd2amZrdGdPSGxSRlwiKSxcclxuICAgICAgICAgICAgICAgIG5ldyBHcm91cFN0YXRlKFwiMlwiLCBcIlg5TVo1cVdhb1FkOFpyWFwiKSxcclxuICAgICAgICAgICAgICAgIG5ldyBHcm91cFN0YXRlKFwiM1wiLCBcInVWWUtOS3JaZnhVUUhIdFwiKVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbn0iXX0=