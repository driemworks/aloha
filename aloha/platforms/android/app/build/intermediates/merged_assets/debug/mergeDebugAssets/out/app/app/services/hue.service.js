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
        // remote api urls are like this.
        this.remoteApiBaseUrl = 'https://api.meethue.com/bridge';
    }
    HueService.prototype.createUser = function (bridgeIp) {
        var url = "http://" + bridgeIp + "/api/";
        return this.postApi(url, { 'devicetype': 'aloha#' }, null);
    };
    HueService.prototype.getTokenCode = function () {
        // todo 
        var url = 'https://account.meethue.com/get-token/?client_id=k4ADndV7XhGKLPlGDwROqZYb1YeO2Eff&response_type=code&state=xUvdhs&devicename=LGD85095b7d552&appid=aloha&deviceid=001788fffe662a1c&redirect_url_base=80%3A%2F%2F_&app_name=Aloha';
    };
    HueService.prototype.getAccessToken = function (code) {
        var url = "https://api.meethue.com/oauth2/token?code=" + code + "&grant_type=authorization_code";
        var authString = "Basic azRBRG5kVjdYaEdLTFBsR0R3Uk9xWlliMVllTzJFZmY6N2xoR0FlQUowa0o5R3NGRg==";
        console.log('Using: ' + authString);
        var headers = new http_1.HttpHeaders({ 'Authorization': authString });
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
    HueService.prototype.getScenes = function (bridgeIp, username) {
        var url = "http://" + bridgeIp + "/api/" + username + "/scenes";
        return this.getApi(url, null);
    };
    HueService.prototype.setGroupState = function (bridgeIp, username, groupId, groupState, accessToken) {
        var url = '';
        var headers = { 'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken };
        if (!accessToken) {
            url = "http://" + bridgeIp + "/api/" + username + "/groups/" + groupId + "/action";
        }
        else {
            url = ('https://api.meethue.com/bridge/dOBMZLQEqwc08ab2saX8UT60qBv6vRPHTWi-2wi1/groups/' + groupId + '/action').toString();
        }
        return this.putApi(url, groupState, headers);
    };
    HueService.prototype.putApi = function (url, content, headers) {
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
        }), operators_1.retry(1), operators_1.catchError(this.handleError));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE2RTtBQUM3RSxzQ0FBMkM7QUFDM0MsNkJBQWtEO0FBQ2xELDRDQUF3RjtBQUV4Rix1Q0FBb0M7QUFNcEM7SUFLSSxvQkFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUgxQyxpQ0FBaUM7UUFDakMscUJBQWdCLEdBQUcsZ0NBQWdDLENBQUE7SUFFTixDQUFDO0lBRTlDLCtCQUFVLEdBQVYsVUFBVyxRQUFRO1FBQ2YsSUFBSSxHQUFHLEdBQUcsWUFBVSxRQUFRLFVBQU8sQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUMsWUFBWSxFQUFFLFFBQVEsRUFBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxpQ0FBWSxHQUFaO1FBQ0ksUUFBUTtRQUNSLElBQUksR0FBRyxHQUFHLGlPQUFpTyxDQUFDO0lBQ2hQLENBQUM7SUFFRCxtQ0FBYyxHQUFkLFVBQWUsSUFBSTtRQUNmLElBQUksR0FBRyxHQUFHLCtDQUE2QyxJQUFJLG1DQUFnQyxDQUFDO1FBQzVGLElBQUksVUFBVSxHQUFHLDRFQUE0RSxDQUFDO1FBQzlGLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksT0FBTyxHQUFHLElBQUksa0JBQVcsQ0FBQyxFQUFDLGVBQWUsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO1FBQzdELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxzQ0FBaUIsR0FBakIsVUFBa0IsUUFBUSxFQUFFLFlBQVksRUFBRSxLQUFLO1FBQzNDLHVEQUF1RDtRQUN2RCx1RUFBdUU7UUFDdkUsMkNBQTJDO1FB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QUNkO1lBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2xDLENBQUMsQ0FBQyxFQUFFLGlCQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsc0JBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU8sZ0NBQVcsR0FBbkIsVUFBb0IsR0FBRztRQUNuQixPQUFPO1FBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsT0FBTyxpQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUE5RlEsVUFBVTtRQUR0QixpQkFBVSxFQUFFO3lDQU11QixpQkFBVTtPQUxqQyxVQUFVLENBZ0d0QjtJQUFELGlCQUFDO0NBQUEsQUFoR0QsSUFnR0M7QUFoR1ksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUmVzcG9uc2UsIEh0dHBIZWFkZXJzLCBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRocm93RXJyb3IsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgcmV0cnksIGNhdGNoRXJyb3IsIHJldHJ5V2hlbiwgbWVyZ2VNYXAsIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvaHR0cCc7XHJcbmltcG9ydCB7TWQ1fSBmcm9tICd0cy1tZDUvZGlzdC9tZDUnO1xyXG5cclxuaW1wb3J0ICogYXMgYmFzZTY0IGZyb20gJ2Jhc2UtNjQnO1xyXG5pbXBvcnQgKiBhcyB1dGY4IGZyb20gJ3V0ZjgnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHVlU2VydmljZSB7XHJcblxyXG4gICAgLy8gcmVtb3RlIGFwaSB1cmxzIGFyZSBsaWtlIHRoaXMuXHJcbiAgICByZW1vdGVBcGlCYXNlVXJsID0gJ2h0dHBzOi8vYXBpLm1lZXRodWUuY29tL2JyaWRnZSdcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQpIHt9XHJcblxyXG4gICAgY3JlYXRlVXNlcihicmlkZ2VJcCkge1xyXG4gICAgICAgIGxldCB1cmwgPSBgaHR0cDovLyR7YnJpZGdlSXB9L2FwaS9gO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RBcGkodXJsLCB7J2RldmljZXR5cGUnOiAnYWxvaGEjJ30sIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRva2VuQ29kZSgpIHtcclxuICAgICAgICAvLyB0b2RvIFxyXG4gICAgICAgIGxldCB1cmwgPSAnaHR0cHM6Ly9hY2NvdW50Lm1lZXRodWUuY29tL2dldC10b2tlbi8/Y2xpZW50X2lkPWs0QURuZFY3WGhHS0xQbEdEd1JPcVpZYjFZZU8yRWZmJnJlc3BvbnNlX3R5cGU9Y29kZSZzdGF0ZT14VXZkaHMmZGV2aWNlbmFtZT1MR0Q4NTA5NWI3ZDU1MiZhcHBpZD1hbG9oYSZkZXZpY2VpZD0wMDE3ODhmZmZlNjYyYTFjJnJlZGlyZWN0X3VybF9iYXNlPTgwJTNBJTJGJTJGXyZhcHBfbmFtZT1BbG9oYSc7ICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWNjZXNzVG9rZW4oY29kZSkge1xyXG4gICAgICAgIGxldCB1cmwgPSBgaHR0cHM6Ly9hcGkubWVldGh1ZS5jb20vb2F1dGgyL3Rva2VuP2NvZGU9JHtjb2RlfSZncmFudF90eXBlPWF1dGhvcml6YXRpb25fY29kZWA7ICAgICAgICBcclxuICAgICAgICBsZXQgYXV0aFN0cmluZyA9IFwiQmFzaWMgYXpSQlJHNWtWamRZYUVkTFRGQnNSMFIzVWs5eFdsbGlNVmxsVHpKRlptWTZOMnhvUjBGbFFVb3dhMG81UjNOR1JnPT1cIjtcclxuICAgICAgICBjb25zb2xlLmxvZygnVXNpbmc6ICcgKyBhdXRoU3RyaW5nKTtcclxuICAgICAgICB2YXIgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7J0F1dGhvcml6YXRpb24nOiBhdXRoU3RyaW5nfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdEFwaSh1cmwsIHt9LCBoZWFkZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxhdGVSZXNwb25zZShjbGllbnRJZCwgY2xpZW50U2VjcmV0LCBub25jZSkge1xyXG4gICAgICAgIC8vIHJlc3BvbnNlID0gTUQ1KEhBU0gxICsgJzonICsgJ05PTkNFJyArICc6JyArIEhBU0gyJylcclxuICAgICAgICAvLyB3aGVyZSBIQVNIMSA9IE1ENSgnQ0xJRU5USUQnICsgJzonICsgJ1JFQUxNJyArICc6JyArICdDTElFTlRTRUNSRVQnKVxyXG4gICAgICAgIC8vIGFuZCAgIEhBU0gyID0gTUQ1KCdWRVJCJyArICc6JyArICdQQVRIJylcclxuICAgICAgICBsZXQgSEFTSDEgPSBNZDUuaGFzaFN0cihjbGllbnRJZCArICc6IG9hdXRoMl9jbGllbnRAYXBpLm1lZXRodWUuY29tIDogJyArIGNsaWVudFNlY3JldCk7XHJcbiAgICAgICAgbGV0IEhBU0gyID0gTWQ1Lmhhc2hTdHIoJ1BPU1QgOiAvb2F1dGgyL3Rva2VuJyk7XHJcbiAgICAgICAgcmV0dXJuIE1kNS5oYXNoU3RyKEhBU0gxICsgJzonICsgbm9uY2UgKyAnOicgKyBIQVNIMik7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEJyaWRnZUlwKCkge1xyXG4gICAgICAgIC8vIGludGVybmFsaXBhZGRyZXNzXHJcbiAgICAgICAgbGV0IHVybCA9ICdodHRwczovL3d3dy5tZWV0aHVlLmNvbS9hcGkvbnVwbnAnO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEFwaSh1cmwsIHt9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTY2VuZXMoYnJpZGdlSXAsIHVzZXJuYW1lKSB7XHJcbiAgICAgICAgbGV0IHVybCA9IGBodHRwOi8vJHticmlkZ2VJcH0vYXBpLyR7dXNlcm5hbWV9L3NjZW5lc2A7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXBpKHVybCwgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0R3JvdXBTdGF0ZShicmlkZ2VJcCwgdXNlcm5hbWUsIGdyb3VwSWQsIGdyb3VwU3RhdGUsIGFjY2Vzc1Rva2VuKSB7XHJcbiAgICAgICAgbGV0IHVybCA9ICcnO1xyXG4gICAgICAgIHZhciBoZWFkZXJzID0geydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2FjY2Vzc1Rva2VufWB9O1xyXG4gICAgICAgIGlmICghYWNjZXNzVG9rZW4pIHtcclxuICAgICAgICAgICAgdXJsID0gYGh0dHA6Ly8ke2JyaWRnZUlwfS9hcGkvJHt1c2VybmFtZX0vZ3JvdXBzLyR7Z3JvdXBJZH0vYWN0aW9uYDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1cmwgPSAoJ2h0dHBzOi8vYXBpLm1lZXRodWUuY29tL2JyaWRnZS9kT0JNWkxRRXF3YzA4YWIyc2FYOFVUNjBxQnY2dlJQSFRXaS0yd2kxL2dyb3Vwcy8nICsgZ3JvdXBJZCArICcvYWN0aW9uJykudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHV0QXBpKHVybCwgZ3JvdXBTdGF0ZSwgaGVhZGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwdXRBcGkodXJsLCBjb250ZW50LCBoZWFkZXJzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wdXQodXJsLCBjb250ZW50LCB7aGVhZGVyczogaGVhZGVyc30pXHJcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBIdHRwUmVzcG9uc2U8YW55PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSgnW0VSUl0nKTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwb3N0QXBpKHVybCwgY29udGVudCwgaGVhZGVycykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdQT1NUICcgKyB1cmwpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucG9zdCh1cmwsIGNvbnRlbnQsIHtoZWFkZXJzOiBoZWFkZXJzfSlcclxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXM6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoJ1tFUlJdJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbiBcclxuICAgIHByaXZhdGUgZ2V0QXBpKHVybCwgaGVhZGVycykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0KHVybCwge2hlYWRlcnM6IGhlYWRlcnN9KVxyXG4gICAgICAgICAgICAucGlwZShtYXAoKHJlczogSHR0cFJlc3BvbnNlPGFueT4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoJ1tFUlJdJylcclxuICAgICAgICB9KSwgcmV0cnkoMSksIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyKSB7XHJcbiAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBTiBFUlJPUiBPQ0NVUlJFRCEnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycik7XHJcbiAgICB9XHJcblxyXG59Il19