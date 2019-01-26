import { Injectable } from "@angular/core";
import * as fs from "tns-core-modules/file-system";

@Injectable()
export class FileService {

    public file: fs.File;
    public folder: fs.Folder;

    createFile(fileContent) {
        let documents = fs.knownFolders.documents();
        this.folder = documents.getFolder("aloha-appdata");
        this.file = this.folder.getFile("user-data.json");

        this.file.writeText(fileContent).then(result => {
           console.log("Saved file: aloha-appdata/user-data.json")
        }).catch(err => {
            console.log(err);
        });
    }

    readFile(): string {
        let documents = fs.knownFolders.documents();
        this.folder = documents.getFolder("aloha-appdata");
        this.file = this.folder.getFile("user-data.json");
        let response = null;
        this.file.readText().then(res => {
            response = res;
        }).catch(err => {
            response = err;
        });
        return response;
    }
    
}