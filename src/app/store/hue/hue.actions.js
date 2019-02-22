"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';
exports.GET_ACCESS_TOKEN_SUCCESS = 'GET_ACCESS_TOKEN_SUCCESS';
exports.GET_ACCESS_TOKEN_FAILED = 'GET_ACCESS_TOKEN_FAILED';
exports.REFRESH_ACCESS_TOKEN = 'REFRESH_ACCESS_TOKEN';
exports.REFRESH_ACCESS_TOKEN_SUCCESS = 'REFRESH_ACCESS_TOKEN_SUCCESS';
exports.REFRESH_ACCESS_TOKEN_FAILED = 'REFRESH_ACCESS_TOKEN_FAILED';
exports.UPDATE_LIGHT_STATE = 'UPDATE_LIGHT_STATE';
exports.UPDATE_LIGHT_STATE_SUCCESS = 'UPDATE_LIGHT_STATE_SUCCESS';
exports.GET_LIGHT_STATE = 'GET_LIGHT_STATE';
exports.GET_LIGHT_STATE_SUCCESS = 'GET_LIGHT_STATE_SUCCESS';
var GetLightStateAction = /** @class */ (function () {
    function GetLightStateAction(bridgeIp, username) {
        this.bridgeIp = bridgeIp;
        this.username = username;
        this.type = exports.GET_LIGHT_STATE;
    }
    return GetLightStateAction;
}());
exports.GetLightStateAction = GetLightStateAction;
var GetLightStateSuccessAction = /** @class */ (function () {
    function GetLightStateSuccessAction(lightState) {
        this.lightState = lightState;
        this.type = exports.GET_LIGHT_STATE_SUCCESS;
    }
    return GetLightStateSuccessAction;
}());
exports.GetLightStateSuccessAction = GetLightStateSuccessAction;
var UpdateLightStateAction = /** @class */ (function () {
    function UpdateLightStateAction(user, isWifiConnection, turnOn) {
        this.user = user;
        this.isWifiConnection = isWifiConnection;
        this.turnOn = turnOn;
        this.type = exports.UPDATE_LIGHT_STATE;
    }
    return UpdateLightStateAction;
}());
exports.UpdateLightStateAction = UpdateLightStateAction;
var UpdateLightStateSuccessAction = /** @class */ (function () {
    function UpdateLightStateSuccessAction(result) {
        this.result = result;
        this.type = exports.UPDATE_LIGHT_STATE_SUCCESS;
    }
    return UpdateLightStateSuccessAction;
}());
exports.UpdateLightStateSuccessAction = UpdateLightStateSuccessAction;
var RequestRefreshTokenAction = /** @class */ (function () {
    function RequestRefreshTokenAction(refreshToken) {
        this.refreshToken = refreshToken;
        this.type = exports.REFRESH_ACCESS_TOKEN;
    }
    return RequestRefreshTokenAction;
}());
exports.RequestRefreshTokenAction = RequestRefreshTokenAction;
var RequestRefreshTokenSuccessAction = /** @class */ (function () {
    function RequestRefreshTokenSuccessAction(user) {
        this.user = user;
        this.type = exports.REFRESH_ACCESS_TOKEN_SUCCESS;
    }
    return RequestRefreshTokenSuccessAction;
}());
exports.RequestRefreshTokenSuccessAction = RequestRefreshTokenSuccessAction;
var GetAccessTokenAction = /** @class */ (function () {
    function GetAccessTokenAction(code, user) {
        this.code = code;
        this.user = user;
        this.type = exports.GET_ACCESS_TOKEN;
    }
    return GetAccessTokenAction;
}());
exports.GetAccessTokenAction = GetAccessTokenAction;
var GetAccessTokenSuccessAction = /** @class */ (function () {
    function GetAccessTokenSuccessAction(accessToken, refreshToken, user) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.user = user;
        this.type = exports.GET_ACCESS_TOKEN_SUCCESS;
    }
    return GetAccessTokenSuccessAction;
}());
exports.GetAccessTokenSuccessAction = GetAccessTokenSuccessAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVlLmFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodWUuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUthLFFBQUEsZ0JBQWdCLEdBQUcsa0JBQWtCLENBQUM7QUFDdEMsUUFBQSx3QkFBd0IsR0FBRywwQkFBMEIsQ0FBQztBQUN0RCxRQUFBLHVCQUF1QixHQUFHLHlCQUF5QixDQUFDO0FBRXBELFFBQUEsb0JBQW9CLEdBQUcsc0JBQXNCLENBQUM7QUFDOUMsUUFBQSw0QkFBNEIsR0FBRyw4QkFBOEIsQ0FBQztBQUM5RCxRQUFBLDJCQUEyQixHQUFHLDZCQUE2QixDQUFDO0FBRTVELFFBQUEsa0JBQWtCLEdBQUksb0JBQW9CLENBQUM7QUFDM0MsUUFBQSwwQkFBMEIsR0FBSSw0QkFBNEIsQ0FBQztBQUUzRCxRQUFBLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQztBQUNwQyxRQUFBLHVCQUF1QixHQUFHLHlCQUF5QixDQUFDO0FBRWpFO0lBRUksNkJBQW1CLFFBQWdCLEVBQVMsUUFBZ0I7UUFBekMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7UUFEbkQsU0FBSSxHQUFHLHVCQUFlLENBQUM7SUFDZ0MsQ0FBQztJQUNyRSwwQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksa0RBQW1CO0FBS2hDO0lBRUksb0NBQW1CLFVBQXdCO1FBQXhCLGVBQVUsR0FBVixVQUFVLENBQWM7UUFEbEMsU0FBSSxHQUFHLCtCQUF1QixDQUFDO0lBQ08sQ0FBQztJQUNwRCxpQ0FBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksZ0VBQTBCO0FBS3ZDO0lBRUksZ0NBQW1CLElBQVUsRUFBUyxnQkFBeUIsRUFBUyxNQUFlO1FBQXBFLFNBQUksR0FBSixJQUFJLENBQU07UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVM7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFTO1FBRDlFLFNBQUksR0FBRywwQkFBa0IsQ0FBQztJQUN1RCxDQUFDO0lBQy9GLDZCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSx3REFBc0I7QUFLbkM7SUFFSSx1Q0FBbUIsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFEeEIsU0FBSSxHQUFHLGtDQUEwQixDQUFDO0lBQ1AsQ0FBQztJQUN6QyxvQ0FBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksc0VBQTZCO0FBSzFDO0lBRUksbUNBQW1CLFlBQW9CO1FBQXBCLGlCQUFZLEdBQVosWUFBWSxDQUFRO1FBRDlCLFNBQUksR0FBRyw0QkFBb0IsQ0FBQztJQUNNLENBQUM7SUFDaEQsZ0NBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLDhEQUF5QjtBQUt0QztJQUVJLDBDQUFtQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQURwQixTQUFJLEdBQUcsb0NBQTRCLENBQUM7SUFDWixDQUFDO0lBQ3RDLHVDQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSw0RUFBZ0M7QUFLN0M7SUFFSSw4QkFBbUIsSUFBWSxFQUFTLElBQVU7UUFBL0IsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFEekMsU0FBSSxHQUFHLHdCQUFnQixDQUFDO0lBQ3FCLENBQUM7SUFDM0QsMkJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLG9EQUFvQjtBQUtqQztJQUVJLHFDQUFtQixXQUFtQixFQUFTLFlBQW9CLEVBQVMsSUFBVTtRQUFuRSxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUFTLGlCQUFZLEdBQVosWUFBWSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUQ3RSxTQUFJLEdBQUcsZ0NBQXdCLENBQUM7SUFDaUQsQ0FBQztJQUMvRixrQ0FBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksa0VBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIkBuZ3J4L3N0b3JlXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3VzZXIubW9kZWxcIjtcclxuaW1wb3J0IHsgTGlnaHRTdGF0ZSB9IGZyb20gXCJ+L2FwcC9tb2RlbHMvbGlnaHRzdGF0ZS5tb2RlbFwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBHRVRfQUNDRVNTX1RPS0VOID0gJ0dFVF9BQ0NFU1NfVE9LRU4nO1xyXG5leHBvcnQgY29uc3QgR0VUX0FDQ0VTU19UT0tFTl9TVUNDRVNTID0gJ0dFVF9BQ0NFU1NfVE9LRU5fU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBHRVRfQUNDRVNTX1RPS0VOX0ZBSUxFRCA9ICdHRVRfQUNDRVNTX1RPS0VOX0ZBSUxFRCc7XHJcblxyXG5leHBvcnQgY29uc3QgUkVGUkVTSF9BQ0NFU1NfVE9LRU4gPSAnUkVGUkVTSF9BQ0NFU1NfVE9LRU4nO1xyXG5leHBvcnQgY29uc3QgUkVGUkVTSF9BQ0NFU1NfVE9LRU5fU1VDQ0VTUyA9ICdSRUZSRVNIX0FDQ0VTU19UT0tFTl9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IFJFRlJFU0hfQUNDRVNTX1RPS0VOX0ZBSUxFRCA9ICdSRUZSRVNIX0FDQ0VTU19UT0tFTl9GQUlMRUQnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFVQREFURV9MSUdIVF9TVEFURSAgPSAnVVBEQVRFX0xJR0hUX1NUQVRFJztcclxuZXhwb3J0IGNvbnN0IFVQREFURV9MSUdIVF9TVEFURV9TVUNDRVNTICA9ICdVUERBVEVfTElHSFRfU1RBVEVfU1VDQ0VTUyc7XHJcblxyXG5leHBvcnQgY29uc3QgR0VUX0xJR0hUX1NUQVRFID0gJ0dFVF9MSUdIVF9TVEFURSc7XHJcbmV4cG9ydCBjb25zdCBHRVRfTElHSFRfU1RBVEVfU1VDQ0VTUyA9ICdHRVRfTElHSFRfU1RBVEVfU1VDQ0VTUyc7XHJcblxyXG5leHBvcnQgY2xhc3MgR2V0TGlnaHRTdGF0ZUFjdGlvbiBpbXBsZW1lbnRzIEFjdGlvbiB7XHJcbiAgICByZWFkb25seSB0eXBlID0gR0VUX0xJR0hUX1NUQVRFO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIGJyaWRnZUlwOiBTdHJpbmcsIHB1YmxpYyB1c2VybmFtZTogU3RyaW5nKSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEdldExpZ2h0U3RhdGVTdWNjZXNzQWN0aW9uIGltcGxlbWVudHMgQWN0aW9uIHtcclxuICAgIHJlYWRvbmx5IHR5cGUgPSBHRVRfTElHSFRfU1RBVEVfU1VDQ0VTUztcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBsaWdodFN0YXRlOiBMaWdodFN0YXRlW10pIHsgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVXBkYXRlTGlnaHRTdGF0ZUFjdGlvbiBpbXBsZW1lbnRzIEFjdGlvbiB7XHJcbiAgICByZWFkb25seSB0eXBlID0gVVBEQVRFX0xJR0hUX1NUQVRFO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHVzZXI6IFVzZXIsIHB1YmxpYyBpc1dpZmlDb25uZWN0aW9uOiBib29sZWFuLCBwdWJsaWMgdHVybk9uOiBib29sZWFuKSB7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVXBkYXRlTGlnaHRTdGF0ZVN1Y2Nlc3NBY3Rpb24gaW1wbGVtZW50cyBBY3Rpb24ge1xyXG4gICAgcmVhZG9ubHkgdHlwZSA9IFVQREFURV9MSUdIVF9TVEFURV9TVUNDRVNTO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlc3VsdDogc3RyaW5nKSB7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVxdWVzdFJlZnJlc2hUb2tlbkFjdGlvbiBpbXBsZW1lbnRzIEFjdGlvbiB7XHJcbiAgICByZWFkb25seSB0eXBlID0gUkVGUkVTSF9BQ0NFU1NfVE9LRU47XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVmcmVzaFRva2VuOiBzdHJpbmcpIHsgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVxdWVzdFJlZnJlc2hUb2tlblN1Y2Nlc3NBY3Rpb24gaW1wbGVtZW50cyBBY3Rpb24ge1xyXG4gICAgcmVhZG9ubHkgdHlwZSA9IFJFRlJFU0hfQUNDRVNTX1RPS0VOX1NVQ0NFU1M7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdXNlcjogVXNlcikgeyB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHZXRBY2Nlc3NUb2tlbkFjdGlvbiBpbXBsZW1lbnRzIEFjdGlvbiB7XHJcbiAgICByZWFkb25seSB0eXBlID0gR0VUX0FDQ0VTU19UT0tFTjtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjb2RlOiBTdHJpbmcsIHB1YmxpYyB1c2VyOiBVc2VyKSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEdldEFjY2Vzc1Rva2VuU3VjY2Vzc0FjdGlvbiBpbXBsZW1lbnRzIEFjdGlvbiB7XHJcbiAgICByZWFkb25seSB0eXBlID0gR0VUX0FDQ0VTU19UT0tFTl9TVUNDRVNTO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIGFjY2Vzc1Rva2VuOiBTdHJpbmcsIHB1YmxpYyByZWZyZXNoVG9rZW46IFN0cmluZywgcHVibGljIHVzZXI6IFVzZXIpIHsgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBIdWVBY3Rpb25zID0gR2V0QWNjZXNzVG9rZW5BY3Rpb24gfCBHZXRBY2Nlc3NUb2tlblN1Y2Nlc3NBY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgfCBSZXF1ZXN0UmVmcmVzaFRva2VuQWN0aW9uIHwgUmVxdWVzdFJlZnJlc2hUb2tlblN1Y2Nlc3NBY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgfCBVcGRhdGVMaWdodFN0YXRlQWN0aW9uIHwgVXBkYXRlTGlnaHRTdGF0ZVN1Y2Nlc3NBY3Rpb24gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgR2V0TGlnaHRTdGF0ZUFjdGlvbiB8IEdldExpZ2h0U3RhdGVTdWNjZXNzQWN0aW9uOyJdfQ==