"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var fs = require("tns-core-modules/file-system");
var FileService = /** @class */ (function () {
    function FileService() {
    }
    FileService.prototype.createFile = function (fileContent) {
        var documents = fs.knownFolders.documents();
        this.folder = documents.getFolder("aloha-appdata");
        this.file = this.folder.getFile("user-data.json");
        this.file.writeText(fileContent).then(function (result) {
            console.log("Saved file: aloha-appdata/user-data.json");
        }).catch(function (err) {
            console.log(err);
        });
    };
    FileService.prototype.readFile = function () {
        var documents = fs.knownFolders.documents();
        this.folder = documents.getFolder("aloha-appdata");
        this.file = this.folder.getFile("user-data.json");
        var response = null;
        this.file.readText().then(function (res) {
            response = res;
        }).catch(function (err) {
            response = err;
        });
        return response;
    };
    FileService = __decorate([
        core_1.Injectable()
    ], FileService);
    return FileService;
}());
exports.FileService = FileService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLGlEQUFtRDtBQUduRDtJQUFBO0lBOEJBLENBQUM7SUF6QkcsZ0NBQVUsR0FBVixVQUFXLFdBQVc7UUFDbEIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO1FBQzFELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEdBQUc7WUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDhCQUFRLEdBQVI7UUFDSSxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUN6QixRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEdBQUc7WUFDUixRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQTVCUSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7T0FDQSxXQUFXLENBOEJ2QjtJQUFELGtCQUFDO0NBQUEsQUE5QkQsSUE4QkM7QUE5Qlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZpbGVTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgZmlsZTogZnMuRmlsZTtcclxuICAgIHB1YmxpYyBmb2xkZXI6IGZzLkZvbGRlcjtcclxuXHJcbiAgICBjcmVhdGVGaWxlKGZpbGVDb250ZW50KSB7XHJcbiAgICAgICAgbGV0IGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcclxuICAgICAgICB0aGlzLmZvbGRlciA9IGRvY3VtZW50cy5nZXRGb2xkZXIoXCJhbG9oYS1hcHBkYXRhXCIpO1xyXG4gICAgICAgIHRoaXMuZmlsZSA9IHRoaXMuZm9sZGVyLmdldEZpbGUoXCJ1c2VyLWRhdGEuanNvblwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5maWxlLndyaXRlVGV4dChmaWxlQ29udGVudCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2F2ZWQgZmlsZTogYWxvaGEtYXBwZGF0YS91c2VyLWRhdGEuanNvblwiKVxyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVhZEZpbGUoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgIHRoaXMuZm9sZGVyID0gZG9jdW1lbnRzLmdldEZvbGRlcihcImFsb2hhLWFwcGRhdGFcIik7XHJcbiAgICAgICAgdGhpcy5maWxlID0gdGhpcy5mb2xkZXIuZ2V0RmlsZShcInVzZXItZGF0YS5qc29uXCIpO1xyXG4gICAgICAgIGxldCByZXNwb25zZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5maWxlLnJlYWRUZXh0KCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IHJlcztcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IGVycjtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9XHJcbiAgICBcclxufSJdfQ==