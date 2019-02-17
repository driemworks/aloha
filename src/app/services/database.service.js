"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Sqlite = require("nativescript-sqlite");
var UserDataService = /** @class */ (function () {
    function UserDataService(httpClient) {
        this.httpClient = httpClient;
        this.url = "https://users-1f06.restdb.io/rest/userdata";
        this.apiKey = '0caf33b16b7d17ee84d259335dbdceb33ae0b';
        this._headers = {
            "content-type": "application/json",
            "x-apikey": this.apiKey,
            "cache-control": "no-cache"
        };
    }
    UserDataService.prototype.writeUser = function (user) {
        return this.modifyUser(user, this.url);
    };
    UserDataService.prototype.modifyUser = function (user, url) {
        console.log('Modifying user with url: ' + url);
        return this.httpClient.post(url, user, { headers: this._headers });
    };
    UserDataService.prototype.readUser = function (uuid) {
        var queryUrl = this.url + ("?q={\"uuid\": \"" + uuid + "\"}");
        console.log('queryUrl: ' + queryUrl);
        return this.httpClient.get(queryUrl, { headers: this._headers });
    };
    UserDataService.prototype.updateUser = function (newUserData) {
        var _id = newUserData['_id'];
        var url = this.url + '/' + _id;
        return this.modifyUser(newUserData, url);
    };
    UserDataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UserDataService);
    return UserDataService;
}());
exports.UserDataService = UserDataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGFiYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsNkNBQWtEO0FBR2xELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRzVDO0lBU0kseUJBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFQMUMsUUFBRyxHQUFHLDRDQUE0QyxDQUFDO1FBQ25ELFdBQU0sR0FBRyx1Q0FBdUMsQ0FBQztRQUNqRCxhQUFRLEdBQUc7WUFDUCxjQUFjLEVBQUUsa0JBQWtCO1lBQ2xDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTTtZQUN2QixlQUFlLEVBQUUsVUFBVTtTQUM5QixDQUFDO0lBQzRDLENBQUM7SUFFL0MsbUNBQVMsR0FBVCxVQUFVLElBQVU7UUFDaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELG9DQUFVLEdBQVYsVUFBVyxJQUFVLEVBQUUsR0FBVztRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBR0Qsa0NBQVEsR0FBUixVQUFTLElBQUk7UUFDVCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFHLHFCQUFnQixJQUFJLFFBQUksQ0FBQSxDQUFBO1FBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxvQ0FBVSxHQUFWLFVBQVcsV0FBaUI7UUFDeEIsSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUMvQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUEvQlEsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQVV1QixpQkFBVTtPQVRqQyxlQUFlLENBZ0MzQjtJQUFELHNCQUFDO0NBQUEsQUFoQ0QsSUFnQ0M7QUFoQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVXNlciwgaW5pdGlhbFN0YXRlIH0gZnJvbSBcIi4uL21vZGVscy91c2VyLm1vZGVsXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XHJcbmltcG9ydCB7IG9mIH0gZnJvbSBcInJ4anNcIjtcclxudmFyIFNxbGl0ZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc3FsaXRlXCIpO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVXNlckRhdGFTZXJ2aWNlIHtcclxuXHJcbiAgICB1cmwgPSBcImh0dHBzOi8vdXNlcnMtMWYwNi5yZXN0ZGIuaW8vcmVzdC91c2VyZGF0YVwiO1xyXG4gICAgYXBpS2V5ID0gJzBjYWYzM2IxNmI3ZDE3ZWU4NGQyNTkzMzVkYmRjZWIzM2FlMGInO1xyXG4gICAgX2hlYWRlcnMgPSB7XHJcbiAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgXCJ4LWFwaWtleVwiOiB0aGlzLmFwaUtleSxcclxuICAgICAgICBcImNhY2hlLWNvbnRyb2xcIjogXCJuby1jYWNoZVwiXHJcbiAgICB9O1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50KSB7IH1cclxuXHJcbiAgICB3cml0ZVVzZXIodXNlcjogVXNlcikgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RpZnlVc2VyKHVzZXIsIHRoaXMudXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2RpZnlVc2VyKHVzZXI6IFVzZXIsIHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ01vZGlmeWluZyB1c2VyIHdpdGggdXJsOiAnICsgdXJsKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3QodXJsLCB1c2VyLCB7aGVhZGVyczogdGhpcy5faGVhZGVyc30pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIHJlYWRVc2VyKHV1aWQpIHtcclxuICAgICAgICBsZXQgcXVlcnlVcmwgPSB0aGlzLnVybCArIGA/cT17XCJ1dWlkXCI6IFwiJHt1dWlkfVwifWBcclxuICAgICAgICBjb25zb2xlLmxvZygncXVlcnlVcmw6ICcgKyBxdWVyeVVybCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5nZXQocXVlcnlVcmwsIHtoZWFkZXJzOiB0aGlzLl9oZWFkZXJzfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVXNlcihuZXdVc2VyRGF0YTogVXNlcikge1xyXG4gICAgICAgIGxldCBfaWQgPSBuZXdVc2VyRGF0YVsnX2lkJ107XHJcbiAgICAgICAgbGV0IHVybCA9IHRoaXMudXJsICsgJy8nICsgX2lkO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGlmeVVzZXIobmV3VXNlckRhdGEsIHVybCk7XHJcbiAgICB9XHJcbn1cclxuIl19