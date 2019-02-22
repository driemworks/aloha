import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, of } from 'rxjs';
import { map, retry, catchError, retryWhen, mergeMap, take, tap } from 'rxjs/operators';
import {Md5} from 'ts-md5/dist/md5';

@Injectable()
export class HueService {

    // remote api base url
    remoteApiBaseUrl = 'https://api.meethue.com/bridge'

    constructor(private httpClient: HttpClient) {}

    createUser(bridgeIp) {
        let url = `http://${bridgeIp}/api/`;
        return this.postApi(url, {'devicetype': 'aloha#'}, null);
    }

    getAccessToken(code) {
        let url = `https://api.meethue.com/oauth2/token?code=${code}&grant_type=authorization_code`;        
        let authString = "Basic azRBRG5kVjdYaEdLTFBsR0R3Uk9xWlliMVllTzJFZmY6N2xoR0FlQUowa0o5R3NGRg==";
        console.log('Using: ' + authString);
        var headers = {'Authorization': authString};
        return this.postApi(url, {}, headers);
    }

    calculateResponse(clientId, clientSecret, nonce) {
        // response = MD5(HASH1 + ':' + 'NONCE' + ':' + HASH2')
        // where HASH1 = MD5('CLIENTID' + ':' + 'REALM' + ':' + 'CLIENTSECRET')
        // and   HASH2 = MD5('VERB' + ':' + 'PATH')
        let HASH1 = Md5.hashStr(clientId + ': oauth2_client@api.meethue.com : ' + clientSecret);
        let HASH2 = Md5.hashStr('POST : /oauth2/token');
        return Md5.hashStr(HASH1 + ':' + nonce + ':' + HASH2);
    }

    findBridgeIp() {
        // internalipaddress
        let url = 'https://www.meethue.com/api/nupnp';
        return this.getApi(url, {});
    }

    getLights(bridgeIp, username) {
        let url = `http://${bridgeIp}/api/${username}/lights`;
        return this.getApi(url, null);
    }

    getScenes(bridgeIp, username) {
        let url = `http://${bridgeIp}/api/${username}/scenes`;
        return this.getApi(url, null);
    }

    getGroups(bridgeIp, username) {
        let url = `http://${bridgeIp}/api/${username}/groups`;
        return this.getApi(url, null);
    }

    getGroupById(bridgeIp, username, groupId) {
        let url = `http://${bridgeIp}/api/${username}/groups/${groupId}`;
        return this.getApi(url, null);
    }

    setGroupState(bridgeIp, username, groupId, groupState, accessToken, notConnected) {
        let url = '';
        var headers = {'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`};
        if (!accessToken && !notConnected) {
            url = `http://${bridgeIp}/api/${username}/groups/${groupId}/action`;
        } else {
            url = `https://api.meethue.com/bridge/${username}/groups/${groupId}/action`;
        }
        console.log(groupState);
        return this.putApi(url, groupState, headers);
    }

    refreshAccessToken(refreshToken) {
        let url = 'https://api.meethue.com/oauth2/refresh?grant_type=refresh_token';
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'authorization': 'Basic azRBRG5kVjdYaEdLTFBsR0R3Uk9xWlliMVllTzJFZmY6N2xoR0FlQUowa0o5R3NGRg=='
        });
        let body = {'refresh_token': refreshToken};
        return this.postApi(url, body, headers);
    }

    private putApi(url, content, headers) {
        console.log('PUT ' + url);
        return this.httpClient.put(url, content, {headers: headers})
            .pipe(map((res: HttpResponse<any>) => {
                if (res) {
                    return res;
                }
                return JSON.parse('[ERR]');
        }));
    }

    private postApi(url, content, headers) {
        console.log('POST ' + url);
        return this.httpClient.post(url, content, {headers: headers})
            .pipe(map((res: HttpResponse<any>) => {
                if (res) {
                    return res;
                } else {
                    return JSON.parse('[ERR]')
                }
        }));
    }
 
    private getApi(url, headers) {
        return this.httpClient.get(url, {headers: headers})
            .pipe(map((res: HttpResponse<any>) => {
                if (res) {
                    return res;
                }
                return JSON.parse('[ERR]')
        }), retry(3), catchError(this.handleError));
    }

    private handleError(err) {
        // TODO
        console.log('AN ERROR OCCURRED!');
        console.log(err);
        return throwError(err);
    }

}