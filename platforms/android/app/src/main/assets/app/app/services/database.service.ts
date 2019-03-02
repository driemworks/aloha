import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import properties from '../../resources/properties.json';

@Injectable()
export class UserDataService {

    url: string;
    apiKey: string;
    _headers = {
        "content-type": "application/json",
        "x-apikey": this.apiKey,
        "cache-control": "no-cache"
    };
    constructor(private httpClient: HttpClient) {
        console.log(JSON.stringify(properties));
        this.apiKey = properties["restdb"]["apiKey"];
        let table = properties["restdb"]["tables"]["users"];
        this.url = "https://" + JSON.stringify(table) + ".restdb.io/rest/userdata";
    }

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
