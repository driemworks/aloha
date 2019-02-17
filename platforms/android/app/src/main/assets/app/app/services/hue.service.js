"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var md5_1 = require("ts-md5/dist/md5");
var HueService = /** @class */ (function () {
    function HueService(httpClient) {
        this.httpClient = httpClient;
        // remote api base url
        this.remoteApiBaseUrl = 'https://api.meethue.com/bridge';
    }
    HueService.prototype.createUser = function (bridgeIp) {
        var url = "http://" + bridgeIp + "/api/";
        return this.postApi(url, { 'devicetype': 'aloha#' }, null);
    };
    HueService.prototype.getAccessToken = function (code) {
        var url = "https://api.meethue.com/oauth2/token?code=" + code + "&grant_type=authorization_code";
        var authString = "Basic azRBRG5kVjdYaEdLTFBsR0R3Uk9xWlliMVllTzJFZmY6N2xoR0FlQUowa0o5R3NGRg==";
        console.log('Using: ' + authString);
        var headers = { 'Authorization': authString };
        return this.postApi(url, {}, headers);
    };
    HueService.prototype.calculateResponse = function (clientId, clientSecret, nonce) {
        // response = MD5(HASH1 + ':' + 'NONCE' + ':' + HASH2')
        // where HASH1 = MD5('CLIENTID' + ':' + 'REALM' + ':' + 'CLIENTSECRET')
        // and   HASH2 = MD5('VERB' + ':' + 'PATH')
        var HASH1 = md5_1.Md5.hashStr(clientId + ': oauth2_client@api.meethue.com : ' + clientSecret);
        var HASH2 = md5_1.Md5.hashStr('POST : /oauth2/token');
        return md5_1.Md5.hashStr(HASH1 + ':' + nonce + ':' + HASH2);
    };
    HueService.prototype.findBridgeIp = function () {
        // internalipaddress
        var url = 'https://www.meethue.com/api/nupnp';
        return this.getApi(url, {});
    };
    HueService.prototype.getLights = function (bridgeIp, username) {
        var url = "http://" + bridgeIp + "/api/" + username + "/lights";
        return this.getApi(url, null);
    };
    HueService.prototype.getScenes = function (bridgeIp, username) {
        var url = "http://" + bridgeIp + "/api/" + username + "/scenes";
        return this.getApi(url, null);
    };
    HueService.prototype.getGroups = function (bridgeIp, username) {
        var url = "http://" + bridgeIp + "/api/" + username + "/groups";
        return this.getApi(url, null);
    };
    HueService.prototype.getGroupById = function (bridgeIp, username, groupId) {
        var url = "http://" + bridgeIp + "/api/" + username + "/groups/" + groupId;
        return this.getApi(url, null);
    };
    HueService.prototype.setGroupState = function (bridgeIp, username, groupId, groupState, accessToken, notConnected) {
        var url = '';
        var headers = { 'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken };
        if (!accessToken && !notConnected) {
            url = "http://" + bridgeIp + "/api/" + username + "/groups/" + groupId + "/action";
        }
        else {
            url = "https://api.meethue.com/bridge/" + username + "/groups/" + groupId + "/action";
        }
        console.log(groupState);
        return this.putApi(url, groupState, headers);
    };
    HueService.prototype.refreshAccessToken = function (refreshToken) {
        var url = 'https://api.meethue.com/oauth2/refresh?grant_type=refresh_token';
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'authorization': 'Basic azRBRG5kVjdYaEdLTFBsR0R3Uk9xWlliMVllTzJFZmY6N2xoR0FlQUowa0o5R3NGRg=='
        });
        var body = { 'refresh_token': refreshToken };
        return this.postApi(url, body, headers);
    };
    HueService.prototype.putApi = function (url, content, headers) {
        console.log('PUT ' + url);
        return this.httpClient.put(url, content, { headers: headers })
            .pipe(operators_1.map(function (res) {
            if (res) {
                return res;
            }
            return JSON.parse('[ERR]');
        }));
    };
    HueService.prototype.postApi = function (url, content, headers) {
        console.log('POST ' + url);
        return this.httpClient.post(url, content, { headers: headers })
            .pipe(operators_1.map(function (res) {
            if (res) {
                return res;
            }
            else {
                return JSON.parse('[ERR]');
            }
        }));
    };
    HueService.prototype.getApi = function (url, headers) {
        return this.httpClient.get(url, { headers: headers })
            .pipe(operators_1.map(function (res) {
            if (res) {
                return res;
            }
            return JSON.parse('[ERR]');
        }), operators_1.retry(3), operators_1.catchError(this.handleError));
    };
    HueService.prototype.handleError = function (err) {
        // TODO
        console.log('AN ERROR OCCURRED!');
        console.log(err);
        return rxjs_1.throwError(err);
    };
    HueService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], HueService);
    return HueService;
}());
exports.HueService = HueService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE2RTtBQUM3RSxzQ0FBMkM7QUFDM0MsNkJBQWtEO0FBQ2xELDRDQUF3RjtBQUN4Rix1Q0FBb0M7QUFHcEM7SUFLSSxvQkFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUgxQyxzQkFBc0I7UUFDdEIscUJBQWdCLEdBQUcsZ0NBQWdDLENBQUE7SUFFTixDQUFDO0lBRTlDLCtCQUFVLEdBQVYsVUFBVyxRQUFRO1FBQ2YsSUFBSSxHQUFHLEdBQUcsWUFBVSxRQUFRLFVBQU8sQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUMsWUFBWSxFQUFFLFFBQVEsRUFBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxtQ0FBYyxHQUFkLFVBQWUsSUFBSTtRQUNmLElBQUksR0FBRyxHQUFHLCtDQUE2QyxJQUFJLG1DQUFnQyxDQUFDO1FBQzVGLElBQUksVUFBVSxHQUFHLDRFQUE0RSxDQUFDO1FBQzlGLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksT0FBTyxHQUFHLEVBQUMsZUFBZSxFQUFFLFVBQVUsRUFBQyxDQUFDO1FBQzVDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxzQ0FBaUIsR0FBakIsVUFBa0IsUUFBUSxFQUFFLFlBQVksRUFBRSxLQUFLO1FBQzNDLHVEQUF1RDtRQUN2RCx1RUFBdUU7UUFDdkUsMkNBQTJDO1FBQzNDLElBQUksS0FBSyxHQUFHLFNBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLG9DQUFvQyxHQUFHLFlBQVksQ0FBQyxDQUFDO1FBQ3hGLElBQUksS0FB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QyxDQUFDO0lBQ2hELENBQUM7SUFFTyxnQ0FBVyxHQUFuQixVQUFvQixHQUFHO1FBQ25CLE9BQU87UUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixPQUFPLGlCQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQXBIUSxVQUFVO1FBRHRCLGlCQUFVLEVBQUU7eUNBTXVCLGlCQUFVO09BTGpDLFVBQVUsQ0FzSHRCO0lBQUQsaUJBQUM7Q0FBQSxBQXRIRCxJQXNIQztBQXRIWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBSZXNwb25zZSwgSHR0cEhlYWRlcnMsIEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdGhyb3dFcnJvciwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCByZXRyeSwgY2F0Y2hFcnJvciwgcmV0cnlXaGVuLCBtZXJnZU1hcCwgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge01kNX0gZnJvbSAndHMtbWQ1L2Rpc3QvbWQ1JztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEh1ZVNlcnZpY2Uge1xyXG5cclxuICAgIC8vIHJlbW90ZSBhcGkgYmFzZSB1cmxcclxuICAgIHJlbW90ZUFwaUJhc2VVcmwgPSAnaHR0cHM6Ly9hcGkubWVldGh1ZS5jb20vYnJpZGdlJ1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCkge31cclxuXHJcbiAgICBjcmVhdGVVc2VyKGJyaWRnZUlwKSB7XHJcbiAgICAgICAgbGV0IHVybCA9IGBodHRwOi8vJHticmlkZ2VJcH0vYXBpL2A7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdEFwaSh1cmwsIHsnZGV2aWNldHlwZSc6ICdhbG9oYSMnfSwgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWNjZXNzVG9rZW4oY29kZSkge1xyXG4gICAgICAgIGxldCB1cmwgPSBgaHR0cHM6Ly9hcGkubWVldGh1ZS5jb20vb2F1dGgyL3Rva2VuP2NvZGU9JHtjb2RlfSZncmFudF90eXBlPWF1dGhvcml6YXRpb25fY29kZWA7ICAgICAgICBcclxuICAgICAgICBsZXQgYXV0aFN0cmluZyA9IFwiQmFzaWMgYXpSQlJHNWtWamRZYUVkTFRGQnNSMFIzVWs5eFdsbGlNVmxsVHpKRlptWTZOMnhvUjBGbFFVb3dhMG81UjNOR1JnPT1cIjtcclxuICAgICAgICBjb25zb2xlLmxvZygnVXNpbmc6ICcgKyBhdXRoU3RyaW5nKTtcclxuICAgICAgICB2YXIgaGVhZGVycyA9IHsnQXV0aG9yaXphdGlvbic6IGF1dGhTdHJpbmd9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RBcGkodXJsLCB7fSwgaGVhZGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlUmVzcG9uc2UoY2xpZW50SWQsIGNsaWVudFNlY3JldCwgbm9uY2UpIHtcclxuICAgICAgICAvLyByZXNwb25zZSA9IE1ENShIQVNIMSArICc6JyArICdOT05DRScgKyAnOicgKyBIQVNIMicpXHJcbiAgICAgICAgLy8gd2hlcmUgSEFTSDEgPSBNRDUoJ0NMSUVOVElEJyArICc6JyArICdSRUFMTScgKyAnOicgKyAnQ0xJRU5UU0VDUkVUJylcclxuICAgICAgICAvLyBhbmQgICBIQVNIMiA9IE1ENSgnVkVSQicgKyAnOicgKyAnUEFUSCcpXHJcbiAgICAgICAgbGV0IEhBU0gxID0gTWQ1Lmhhc2hTdHIoY2xpZW50SWQgKyAnOiBvYXV0aDJfY2xpZW50QGFwaS5tZWV0aHVlLmNvbSA6ICcgKyBjbGllbnRTZWNyZXQpO1xyXG4gICAgICAgIGxldCBIQVNIMiA9IE1kNS5oYXNoU3RyKCdQT1NUIDogL29hdXRoMi90b2tlbicpO1xyXG4gICAgICAgIHJldHVybiBNZDUuaGFzaFN0cihIQVNIMSArICc6JyArIG5vbmNlICsgJzonICsgSEFTSDIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRCcmlkZ2VJcCgpIHtcclxuICAgICAgICAvLyBpbnRlcm5hbGlwYWRkcmVzc1xyXG4gICAgICAgIGxldCB1cmwgPSAnaHR0cHM6Ly93d3cubWVldGh1ZS5jb20vYXBpL251cG5wJztcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRBcGkodXJsLCB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGlnaHRzKGJyaWRnZUlwLCB1c2VybmFtZSkge1xyXG4gICAgICAgIGxldCB1cmwgPSBgaHR0cDovLyR7YnJpZGdlSXB9L2FwaS8ke3VzZXJuYW1lfS9saWdodHNgO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEFwaSh1cmwsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNjZW5lcyhicmlkZ2VJcCwgdXNlcm5hbWUpIHtcclxuICAgICAgICBsZXQgdXJsID0gYGh0dHA6Ly8ke2JyaWRnZUlwfS9hcGkvJHt1c2VybmFtZX0vc2NlbmVzYDtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRBcGkodXJsLCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cHMoYnJpZGdlSXAsIHVzZXJuYW1lKSB7XHJcbiAgICAgICAgbGV0IHVybCA9IGBodHRwOi8vJHticmlkZ2VJcH0vYXBpLyR7dXNlcm5hbWV9L2dyb3Vwc2A7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXBpKHVybCwgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBCeUlkKGJyaWRnZUlwLCB1c2VybmFtZSwgZ3JvdXBJZCkge1xyXG4gICAgICAgIGxldCB1cmwgPSBgaHR0cDovLyR7YnJpZGdlSXB9L2FwaS8ke3VzZXJuYW1lfS9ncm91cHMvJHtncm91cElkfWA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXBpKHVybCwgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R3JvdXBTdGF0ZShicmlkZ2VJcCwgdXNlcm5hbWUsIGdyb3VwSWQsIGdyb3VwU3RhdGUsIGFjY2Vzc1Rva2VuLCBub3RDb25uZWN0ZWQpIHtcclxuICAgICAgICBsZXQgdXJsID0gJyc7XHJcbiAgICAgICAgdmFyIGhlYWRlcnMgPSB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YH07XHJcbiAgICAgICAgaWYgKCFhY2Nlc3NUb2tlbiAmJiAhbm90Q29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHVybCA9IGBodHRwOi8vJHticmlkZ2VJcH0vYXBpLyR7dXNlcm5hbWV9L2dyb3Vwcy8ke2dyb3VwSWR9L2FjdGlvbmA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXJsID0gYGh0dHBzOi8vYXBpLm1lZXRodWUuY29tL2JyaWRnZS8ke3VzZXJuYW1lfS9ncm91cHMvJHtncm91cElkfS9hY3Rpb25gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhncm91cFN0YXRlKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wdXRBcGkodXJsLCBncm91cFN0YXRlLCBoZWFkZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoQWNjZXNzVG9rZW4ocmVmcmVzaFRva2VuKSB7XHJcbiAgICAgICAgbGV0IHVybCA9ICdodHRwczovL2FwaS5tZWV0aHVlLmNvbS9vYXV0aDIvcmVmcmVzaD9ncmFudF90eXBlPXJlZnJlc2hfdG9rZW4nO1xyXG4gICAgICAgIHZhciBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG4gICAgICAgICAgICAnYXV0aG9yaXphdGlvbic6ICdCYXNpYyBhelJCUkc1a1ZqZFlhRWRMVEZCc1IwUjNVazl4V2xsaU1WbGxUekpGWm1ZNk4yeG9SMEZsUVVvd2EwbzVSM05HUmc9PSdcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgYm9keSA9IHsncmVmcmVzaF90b2tlbic6IHJlZnJlc2hUb2tlbn07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdEFwaSh1cmwsIGJvZHksIGhlYWRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHV0QXBpKHVybCwgY29udGVudCwgaGVhZGVycykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdQVVQgJyArIHVybCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wdXQodXJsLCBjb250ZW50LCB7aGVhZGVyczogaGVhZGVyc30pXHJcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBIdHRwUmVzcG9uc2U8YW55PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSgnW0VSUl0nKTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwb3N0QXBpKHVybCwgY29udGVudCwgaGVhZGVycykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdQT1NUICcgKyB1cmwpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucG9zdCh1cmwsIGNvbnRlbnQsIHtoZWFkZXJzOiBoZWFkZXJzfSlcclxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXM6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoJ1tFUlJdJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbiBcclxuICAgIHByaXZhdGUgZ2V0QXBpKHVybCwgaGVhZGVycykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0KHVybCwge2hlYWRlcnM6IGhlYWRlcnN9KVxyXG4gICAgICAgICAgICAucGlwZShtYXAoKHJlczogSHR0cFJlc3BvbnNlPGFueT4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoJ1tFUlJdJylcclxuICAgICAgICB9KSwgcmV0cnkoMyksIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyKSB7XHJcbiAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBTiBFUlJPUiBPQ0NVUlJFRCEnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycik7XHJcbiAgICB9XHJcblxyXG59Il19