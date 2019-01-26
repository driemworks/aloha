import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, of } from 'rxjs';
import { map, retry, catchError, retryWhen, mergeMap, take, tap } from 'rxjs/operators';
import { request } from 'tns-core-modules/http';
import {Md5} from 'ts-md5/dist/md5';

import * as base64 from 'base-64';
import * as utf8 from 'utf8';

@Injectable()
export class HueService {

    // remote api urls are like this.
    remoteApiBaseUrl = 'https://api.meethue.com/bridge'

    constructor(private httpClient: HttpClient) {}

    createUser(bridgeIp) {
        let url = `http://${bridgeIp}/api/`;
        return this.postApi(url, {'devicetype': 'aloha#'}, null);
    }

    getTokenCode() {
        // todo 
        let url = 'https://account.meethue.com/get-token/?client_id=k4ADndV7XhGKLPlGDwROqZYb1YeO2Eff&response_type=code&state=xUvdhs&devicename=LGD85095b7d552&appid=aloha&deviceid=001788fffe662a1c&redirect_url_base=80%3A%2F%2F_&app_name=Aloha';   
    }

    getAccessToken(code) {
        let url = `https://api.meethue.com/oauth2/token?code=${code}&grant_type=authorization_code`;        
        let authString = "Basic azRBRG5kVjdYaEdLTFBsR0R3Uk9xWlliMVllTzJFZmY6N2xoR0FlQUowa0o5R3NGRg==";
        console.log('Using: ' + authString);
        var headers = new HttpHeaders({'Authorization': authString});
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

    getScenes(bridgeIp, username) {
        let url = `http://${bridgeIp}/api/${username}/scenes`;
        return this.getApi(url, null);
    }

    setGroupState(bridgeIp, username, groupId, groupState, accessToken) {
        let url = '';
        var headers = {'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`};
        if (!accessToken) {
            url = `http://${bridgeIp}/api/${username}/groups/${groupId}/action`;
        } else {
            url = ('https://api.meethue.com/bridge/dOBMZLQEqwc08ab2saX8UT60qBv6vRPHTWi-2wi1/groups/' + groupId + '/action').toString();
        }
        return this.putApi(url, groupState, headers);
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
        }), retry(1), catchError(this.handleError));
    }

    private handleError(err) {
        // TODO
        console.log('AN ERROR OCCURRED!');
        console.log(err);
        return throwError(err);
    }

}