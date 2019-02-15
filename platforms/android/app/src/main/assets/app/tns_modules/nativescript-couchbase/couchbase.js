"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("utils/utils");
var Couchbase = (function () {
    function Couchbase(databaseName) {
        this.context = utils.ad.getApplicationContext();
        try {
            this.manager = new com.couchbase.lite.Manager(new com.couchbase.lite.android.AndroidContext(this.context), null);
            this.database = this.manager.getDatabase(databaseName);
        }
        catch (exception) {
            console.error("MANAGER ERROR:", exception.message);
        }
    }
    Couchbase.prototype.createDocument = function (data, documentId) {
        var document = documentId == null ? this.database.createDocument() : this.database.getDocument(documentId);
        var documentId = document.getId();
        try {
            document.putProperties(this.objectToMap(data));
        }
        catch (exception) {
            console.error("DOCUMENT ERROR:", exception.message);
        }
        return documentId;
    };
    Couchbase.prototype.getDocument = function (documentId) {
        var document = this.database.getDocument(documentId);
        return JSON.parse(this.mapToJson(document.getProperties()));
    };
    Couchbase.prototype.updateDocument = function (documentId, data) {
        var document = this.database.getDocument(documentId);
        var temp = JSON.parse(this.mapToJson(document.getProperties()));
        data._id = temp._id;
        data._rev = temp._rev;
        try {
            document.putProperties(this.objectToMap(data));
        }
        catch (exception) {
            console.error("DOCUMENT ERROR", exception.message);
        }
    };
    Couchbase.prototype.deleteDocument = function (documentId) {
        var document = this.database.getDocument(documentId);
        try {
            document.delete();
        }
        catch (exception) {
            console.error("DOCUMENT ERROR", exception.message);
        }
        return document.isDeleted();
    };
    Couchbase.prototype.destroyDatabase = function () {
        try {
            this.database.delete();
        }
        catch (exception) {
            console.error("DESTROY", exception.message);
        }
    };
    Couchbase.prototype.createView = function (viewName, viewRevision, callback) {
        var view = this.database.getView(viewName);
        var self = this;
        view.setMap(new com.couchbase.lite.Mapper({
            map: function (document, emitter) {
                var e = new Emitter(emitter);
                callback(JSON.parse(self.mapToJson(document)), e);
            }
        }), viewRevision);
    };
    Couchbase.prototype.executeQuery = function (viewName, options) {
        var query = this.database.getView(viewName).createQuery();
        if (options != null) {
            if (options.descending) {
                query.setDescending(options.descending);
            }
            if (options.limit) {
                query.setLimit(options.limit);
            }
            if (options.skip) {
                query.setSkip(options.skip);
            }
            if (options.startKey) {
                query.setStartKey(options.startKey);
            }
            if (options.endKey) {
                query.setEndKey(options.endKey);
            }
        }
        var result = query.run();
        var parsedResult = [];
        while (result.hasNext()) {
            var row = result.next();
            parsedResult.push(this.mapToObject(row.getValue()));
        }
        return parsedResult;
    };
    Couchbase.prototype.createPullReplication = function (remoteUrl) {
        var replication;
        try {
            replication = this.database.createPullReplication(new java.net.URL(remoteUrl));
        }
        catch (exception) {
            console.error("PULL ERROR", exception.message);
        }
        return new Replicator(replication);
    };
    Couchbase.prototype.createPushReplication = function (remoteUrl) {
        var replication;
        try {
            replication = this.database.createPushReplication(new java.net.URL(remoteUrl));
        }
        catch (exception) {
            console.error("PUSH ERROR", exception.message);
        }
        return new Replicator(replication);
    };
    Couchbase.prototype.addDatabaseChangeListener = function (callback) {
        try {
            this.database.addChangeListener(new com.couchbase.lite.Database.ChangeListener({
                changed: function (event) {
                    var changes = event.getChanges().toArray();
                    callback(changes);
                }
            }));
        }
        catch (exception) {
            console.error("DATABASE LISTENER ERROR", exception.message);
        }
    };
    Couchbase.prototype.objectToMap = function (data) {
        var gson = (new com.google.gson.GsonBuilder()).create();
        return gson.fromJson(JSON.stringify(data), (new java.util.HashMap).getClass());
    };
    Couchbase.prototype.mapToJson = function (data) {
        var gson = (new com.google.gson.GsonBuilder()).create();
        return gson.toJson(data);
    };
    Couchbase.prototype.mapToObject = function (data) {
        var gson = (new com.google.gson.GsonBuilder()).create();
        return JSON.parse(gson.toJson(data));
    };
    return Couchbase;
}());
exports.Couchbase = Couchbase;
var Replicator = (function () {
    function Replicator(replicator) {
        this.replicator = replicator;
    }
    Replicator.prototype.start = function () {
        this.replicator.start();
    };
    Replicator.prototype.stop = function () {
        this.replicator.stop();
    };
    Replicator.prototype.isRunning = function () {
        return this.replicator.isRunning;
    };
    Replicator.prototype.setContinuous = function (isContinuous) {
        this.replicator.setContinuous(isContinuous);
    };
    Replicator.prototype.setCookie = function (name, value, path, expirationDate, secure, httpOnly) {
        var date = new java.util.Date(expirationDate.getTime());
        this.replicator.setCookie(name, value, path, date, secure, httpOnly);
    };
    ;
    Replicator.prototype.deleteCookie = function (name) {
        this.replicator.deleteCookieNamed(name);
    };
    return Replicator;
}());
exports.Replicator = Replicator;
var Emitter = (function () {
    function Emitter(emitter) {
        this.emitter = emitter;
    }
    Emitter.prototype.emit = function (key, value) {
        if (typeof value === "object") {
            var gson = (new com.google.gson.GsonBuilder()).create();
            this.emitter.emit(key, gson.fromJson(JSON.stringify(value), (new java.util.HashMap).getClass()));
        }
        else {
            this.emitter.emit(key, value);
        }
    };
    return Emitter;
}());
exports.Emitter = Emitter;
