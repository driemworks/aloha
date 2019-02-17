import { Injectable } from "@angular/core";
import { User, initialState } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { of } from "rxjs";
var Sqlite = require("nativescript-sqlite");

@Injectable()
export class UserDataService {

    url = "https://users-1f06.restdb.io/rest/userdata";
    apiKey = '0caf33b16b7d17ee84d259335dbdceb33ae0b';
    _headers = {
        "content-type": "application/json",
        "x-apikey": this.apiKey,
        "cache-control": "no-cache"
    };
    constructor(private httpClient: HttpClient) { }

    writeUser(user: User)  {
        return this.modifyUser(user, this.url);
    }

    modifyUser(user: User, url: string) {
        console.log('Modifying user with url: ' + url);
        return this.httpClient.post(url, user, {headers: this._headers});
    }
    
    
    readUser(uuid) {
        let queryUrl = this.url + `?q={"uuid": "${uuid}"}`
        console.log('queryUrl: ' + queryUrl);
        return this.httpClient.get(queryUrl, {headers: this._headers});
    }

    updateUser(newUserData: User) {
        let _id = newUserData['_id'];
        let url = this.url + '/' + _id;
        return this.modifyUser(newUserData, url);
    }
}
