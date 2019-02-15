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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGFiYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsNkNBQWtEO0FBR2xELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRzVDO0lBU0kseUJBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFQMUMsUUFBRyxHQUFHLDRDQUE0QyxDQUFDO1FBQ25ELFdBQU0sR0FBRyx1Q0FBdUMsQ0FBQztRQUNqRCxhQUFRLEdBQUc7WUFDUCxjQUFjLEVBQUUsa0JBQWtCO1lBQ2xDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTTtZQUN2QixlQUFlLEVBQUUsVUFBVTtTQUM5QixDQUFDO0lBQzRDLENBQUM7SUFFL0MsbUNBQVMsR0FBVCxVQUFVLElBQVU7UUFDaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELG9DQUFVLEdBQVYsVUFBVyxJQUFVLEVBQUUsR0FBVztRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBR0Qsa0NBQVEsR0FBUixVQUFTLElBQUk7UUFDVCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFHLHFCQUFnQixJQUFJLFFBQUksQ0FBQSxDQUFBO1FBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxvQ0FBVSxHQUFWLFVBQVcsV0FBaUI7UUFDeEIsSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUMvQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUEvQlEsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQVV1QixpQkFBVTtPQVRqQyxlQUFlLENBZ0MzQjtJQUFELHNCQUFDO0NBQUEsQUFoQ0QsSUFnQ0M7QUFoQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9tb2RlbHMvdXNlci5tb2RlbFwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5pbXBvcnQgeyBvZiB9IGZyb20gXCJyeGpzXCI7XHJcbnZhciBTcWxpdGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFVzZXJEYXRhU2VydmljZSB7XHJcblxyXG4gICAgdXJsID0gXCJodHRwczovL3VzZXJzLTFmMDYucmVzdGRiLmlvL3Jlc3QvdXNlcmRhdGFcIjtcclxuICAgIGFwaUtleSA9ICcwY2FmMzNiMTZiN2QxN2VlODRkMjU5MzM1ZGJkY2ViMzNhZTBiJztcclxuICAgIF9oZWFkZXJzID0ge1xyXG4gICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIFwieC1hcGlrZXlcIjogdGhpcy5hcGlLZXksXHJcbiAgICAgICAgXCJjYWNoZS1jb250cm9sXCI6IFwibm8tY2FjaGVcIlxyXG4gICAgfTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCkgeyB9XHJcblxyXG4gICAgd3JpdGVVc2VyKHVzZXI6IFVzZXIpICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kaWZ5VXNlcih1c2VyLCB0aGlzLnVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kaWZ5VXNlcih1c2VyOiBVc2VyLCB1cmw6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdNb2RpZnlpbmcgdXNlciB3aXRoIHVybDogJyArIHVybCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0KHVybCwgdXNlciwge2hlYWRlcnM6IHRoaXMuX2hlYWRlcnN9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICByZWFkVXNlcih1dWlkKSB7XHJcbiAgICAgICAgbGV0IHF1ZXJ5VXJsID0gdGhpcy51cmwgKyBgP3E9e1widXVpZFwiOiBcIiR7dXVpZH1cIn1gXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3F1ZXJ5VXJsOiAnICsgcXVlcnlVcmwpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0KHF1ZXJ5VXJsLCB7aGVhZGVyczogdGhpcy5faGVhZGVyc30pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVVzZXIobmV3VXNlckRhdGE6IFVzZXIpIHtcclxuICAgICAgICBsZXQgX2lkID0gbmV3VXNlckRhdGFbJ19pZCddO1xyXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLnVybCArICcvJyArIF9pZDtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RpZnlVc2VyKG5ld1VzZXJEYXRhLCB1cmwpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==