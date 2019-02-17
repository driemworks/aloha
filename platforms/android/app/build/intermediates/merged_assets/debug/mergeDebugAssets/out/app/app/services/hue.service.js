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
        }), operators_1.catchError(this.handleError));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE2RTtBQUM3RSxzQ0FBMkM7QUFDM0MsNkJBQWtEO0FBQ2xELDRDQUF3RjtBQUN4Rix1Q0FBb0M7QUFHcEM7SUFLSSxvQkFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUgxQyxzQkFBc0I7UUFDdEIscUJBQWdCLEdBQUcsZ0NBQWdDLENBQUE7SUFFTixDQUFDO0lBRTlDLCtCQUFVLEdBQVYsVUFBVyxRQUFRO1FBQ2YsSUFBSSxHQUFHLEdBQUcsWUFBVSxRQUFRLFVBQU8sQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUMsWUFBWSxFQUFFLFFBQVEsRUFBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxtQ0FBYyxHQUFkLFVBQWUsSUFBSTtRQUNmLElBQUksR0FBRyxHQUFHLCtDQUE2QyxJQUFJLG1DQUFnQyxDQUFDO1FBQzVGLElBQUksVUFBVSxHQUFHLDRFQUE0RSxDQUFDO1FBQzlGLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksT0FBTyxHQUFHLEVBQUMsZUFBZSxFQUFFLFVBQVUsRUFBQyxDQUFDO1FBQzVDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxzQ0FBaUIsR0FBakIsVUFBa0IsUUFBUSxFQUFFLFlBQVksRUFBRSxLQUFLO1FBQzNDLHVEQUF1RDtRQUN2RCx1RUFBdUU7UUFDdkUsMkNBQTJDO1FBQzNDLElBQUksS0FBSyxHQUFHLFNBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLG9DQUFvQyxHQUFHLFlBQVksQ0FBQyxDQUFDO1FBQ3hGLElBQUksS0FB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QVcsR0FBbkIsVUFBb0IsR0FBRztRQUNuQixPQUFPO1FBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsT0FBTyxpQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFwSFEsVUFBVTtRQUR0QixpQkFBVSxFQUFFO3lDQU11QixpQkFBVTtPQUxqQyxVQUFVLENBc0h0QjtJQUFELGlCQUFDO0NBQUEsQUF0SEQsSUFzSEM7QUF0SFksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUmVzcG9uc2UsIEh0dHBIZWFkZXJzLCBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRocm93RXJyb3IsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgcmV0cnksIGNhdGNoRXJyb3IsIHJldHJ5V2hlbiwgbWVyZ2VNYXAsIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtNZDV9IGZyb20gJ3RzLW1kNS9kaXN0L21kNSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIdWVTZXJ2aWNlIHtcclxuXHJcbiAgICAvLyByZW1vdGUgYXBpIGJhc2UgdXJsXHJcbiAgICByZW1vdGVBcGlCYXNlVXJsID0gJ2h0dHBzOi8vYXBpLm1lZXRodWUuY29tL2JyaWRnZSdcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQpIHt9XHJcblxyXG4gICAgY3JlYXRlVXNlcihicmlkZ2VJcCkge1xyXG4gICAgICAgIGxldCB1cmwgPSBgaHR0cDovLyR7YnJpZGdlSXB9L2FwaS9gO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RBcGkodXJsLCB7J2RldmljZXR5cGUnOiAnYWxvaGEjJ30sIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFjY2Vzc1Rva2VuKGNvZGUpIHtcclxuICAgICAgICBsZXQgdXJsID0gYGh0dHBzOi8vYXBpLm1lZXRodWUuY29tL29hdXRoMi90b2tlbj9jb2RlPSR7Y29kZX0mZ3JhbnRfdHlwZT1hdXRob3JpemF0aW9uX2NvZGVgOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGF1dGhTdHJpbmcgPSBcIkJhc2ljIGF6UkJSRzVrVmpkWWFFZExURkJzUjBSM1VrOXhXbGxpTVZsbFR6SkZabVk2TjJ4b1IwRmxRVW93YTBvNVIzTkdSZz09XCI7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1VzaW5nOiAnICsgYXV0aFN0cmluZyk7XHJcbiAgICAgICAgdmFyIGhlYWRlcnMgPSB7J0F1dGhvcml6YXRpb24nOiBhdXRoU3RyaW5nfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3N0QXBpKHVybCwge30sIGhlYWRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZVJlc3BvbnNlKGNsaWVudElkLCBjbGllbnRTZWNyZXQsIG5vbmNlKSB7XHJcbiAgICAgICAgLy8gcmVzcG9uc2UgPSBNRDUoSEFTSDEgKyAnOicgKyAnTk9OQ0UnICsgJzonICsgSEFTSDInKVxyXG4gICAgICAgIC8vIHdoZXJlIEhBU0gxID0gTUQ1KCdDTElFTlRJRCcgKyAnOicgKyAnUkVBTE0nICsgJzonICsgJ0NMSUVOVFNFQ1JFVCcpXHJcbiAgICAgICAgLy8gYW5kICAgSEFTSDIgPSBNRDUoJ1ZFUkInICsgJzonICsgJ1BBVEgnKVxyXG4gICAgICAgIGxldCBIQVNIMSA9IE1kNS5oYXNoU3RyKGNsaWVudElkICsgJzogb2F1dGgyX2NsaWVudEBhcGkubWVldGh1ZS5jb20gOiAnICsgY2xpZW50U2VjcmV0KTtcclxuICAgICAgICBsZXQgSEFTSDIgPSBNZDUuaGFzaFN0cignUE9TVCA6IC9vYXV0aDIvdG9rZW4nKTtcclxuICAgICAgICByZXR1cm4gTWQ1Lmhhc2hTdHIoSEFTSDEgKyAnOicgKyBub25jZSArICc6JyArIEhBU0gyKTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kQnJpZGdlSXAoKSB7XHJcbiAgICAgICAgLy8gaW50ZXJuYWxpcGFkZHJlc3NcclxuICAgICAgICBsZXQgdXJsID0gJ2h0dHBzOi8vd3d3Lm1lZXRodWUuY29tL2FwaS9udXBucCc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXBpKHVybCwge30pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExpZ2h0cyhicmlkZ2VJcCwgdXNlcm5hbWUpIHtcclxuICAgICAgICBsZXQgdXJsID0gYGh0dHA6Ly8ke2JyaWRnZUlwfS9hcGkvJHt1c2VybmFtZX0vbGlnaHRzYDtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRBcGkodXJsLCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTY2VuZXMoYnJpZGdlSXAsIHVzZXJuYW1lKSB7XHJcbiAgICAgICAgbGV0IHVybCA9IGBodHRwOi8vJHticmlkZ2VJcH0vYXBpLyR7dXNlcm5hbWV9L3NjZW5lc2A7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXBpKHVybCwgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBzKGJyaWRnZUlwLCB1c2VybmFtZSkge1xyXG4gICAgICAgIGxldCB1cmwgPSBgaHR0cDovLyR7YnJpZGdlSXB9L2FwaS8ke3VzZXJuYW1lfS9ncm91cHNgO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEFwaSh1cmwsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwQnlJZChicmlkZ2VJcCwgdXNlcm5hbWUsIGdyb3VwSWQpIHtcclxuICAgICAgICBsZXQgdXJsID0gYGh0dHA6Ly8ke2JyaWRnZUlwfS9hcGkvJHt1c2VybmFtZX0vZ3JvdXBzLyR7Z3JvdXBJZH1gO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEFwaSh1cmwsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEdyb3VwU3RhdGUoYnJpZGdlSXAsIHVzZXJuYW1lLCBncm91cElkLCBncm91cFN0YXRlLCBhY2Nlc3NUb2tlbiwgbm90Q29ubmVjdGVkKSB7XHJcbiAgICAgICAgbGV0IHVybCA9ICcnO1xyXG4gICAgICAgIHZhciBoZWFkZXJzID0geydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2FjY2Vzc1Rva2VufWB9O1xyXG4gICAgICAgIGlmICghYWNjZXNzVG9rZW4gJiYgIW5vdENvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICB1cmwgPSBgaHR0cDovLyR7YnJpZGdlSXB9L2FwaS8ke3VzZXJuYW1lfS9ncm91cHMvJHtncm91cElkfS9hY3Rpb25gO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHVybCA9IGBodHRwczovL2FwaS5tZWV0aHVlLmNvbS9icmlkZ2UvJHt1c2VybmFtZX0vZ3JvdXBzLyR7Z3JvdXBJZH0vYWN0aW9uYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coZ3JvdXBTdGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHV0QXBpKHVybCwgZ3JvdXBTdGF0ZSwgaGVhZGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaEFjY2Vzc1Rva2VuKHJlZnJlc2hUb2tlbikge1xyXG4gICAgICAgIGxldCB1cmwgPSAnaHR0cHM6Ly9hcGkubWVldGh1ZS5jb20vb2F1dGgyL3JlZnJlc2g/Z3JhbnRfdHlwZT1yZWZyZXNoX3Rva2VuJztcclxuICAgICAgICB2YXIgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuICAgICAgICAgICAgJ2F1dGhvcml6YXRpb24nOiAnQmFzaWMgYXpSQlJHNWtWamRZYUVkTFRGQnNSMFIzVWs5eFdsbGlNVmxsVHpKRlptWTZOMnhvUjBGbFFVb3dhMG81UjNOR1JnPT0nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGJvZHkgPSB7J3JlZnJlc2hfdG9rZW4nOiByZWZyZXNoVG9rZW59O1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RBcGkodXJsLCBib2R5LCBoZWFkZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHB1dEFwaSh1cmwsIGNvbnRlbnQsIGhlYWRlcnMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnUFVUICcgKyB1cmwpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucHV0KHVybCwgY29udGVudCwge2hlYWRlcnM6IGhlYWRlcnN9KVxyXG4gICAgICAgICAgICAucGlwZShtYXAoKHJlczogSHR0cFJlc3BvbnNlPGFueT4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoJ1tFUlJdJyk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcG9zdEFwaSh1cmwsIGNvbnRlbnQsIGhlYWRlcnMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnUE9TVCAnICsgdXJsKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3QodXJsLCBjb250ZW50LCB7aGVhZGVyczogaGVhZGVyc30pXHJcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBIdHRwUmVzcG9uc2U8YW55PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKCdbRVJSXScpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwcml2YXRlIGdldEFwaSh1cmwsIGhlYWRlcnMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LmdldCh1cmwsIHtoZWFkZXJzOiBoZWFkZXJzfSlcclxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXM6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKCdbRVJSXScpXHJcbiAgICAgICAgfSksIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyKSB7XHJcbiAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBTiBFUlJPUiBPQ0NVUlJFRCEnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycik7XHJcbiAgICB9XHJcblxyXG59Il19