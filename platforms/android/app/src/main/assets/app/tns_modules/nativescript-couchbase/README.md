# Couchbase Lite Plugin for Telerik NativeScript

Couchbase Lite is a NoSQL embedded database for mobile devices.  It is a replacement for common database technologies like SQLite and Core Data.

## Configuration

To add this plugin to your Angular or vanilla JavaScript NativeScript project, execute the following from the Terminal or Command Prompt:

```
tns plugin add nativescript-couchbase
```

If you wish to try either of the demo applications that are bundled with this project, execute the following after cloning the repository:

```
npm install
npm run deploy-android-angular
```

For the third line, the list of options are:

```
npm run deploy-android-angular
npm run deploy-android-vanilla
npm run deploy-ios-angular
npm run deploy-ios-vanilla
```

If you're using TypeScript and wish to make use of the type definitions for this plugin, add the following line to your project's **references.d.ts** file:

```
/// <reference path="./node_modules/nativescript-couchbase/couchbase.d.ts" />
```

Without the above line included, your TypeScript compiler may throw errors during the build.

## Usage

### Including the Plugin in Your Project

```javascript
var couchbaseModule = require("nativescript-couchbase");
```

### Creating or Opening an Existing Database

```javascript
var database = new couchbaseModule.Couchbase("test-database");
```

### Managing the Data with CRUD Operations

#### Creating a New Document

```javascript
var documentId = database.createDocument({
    "firstname": "Nic",
    "lastname": "Raboy",
    "address": {
        "city": "San Francisco",
        "state": "CA",
        "country": "USA"
    }
    "twitter": "https://www.twitter.com/nraboy"
});
```

#### Retrieving an Existing Document

```javascript
var person = database.getDocument(documentId);
```

#### Updating an Existing Document

```javascript
database.updateDocument(documentId, {
    "firstname": "Nicolas",
    "lastname": "Raboy",
    "twitter": "https://www.twitter.com/nraboy"
});
```

#### Deleting a Document

```javascript
var isDeleted = database.deleteDocument(documentId);
```

### Querying with MapReduce Views

Knowing the document id isn't always an option.  With this in mind, multiple documents can be queried using criteria defined in a view.

#### Creating a MapReduce View

A MapReduce View will emit a key-value pair.  Logic can be placed around the **emitter** to make the views more specific.

```javascript
database.createView("people", "1", function(document, emitter) {
    emitter.emit(document._id, document);
});
```

#### Querying a MapReduce View

```javascript
var rows = database.executeQuery("people");
for(var i = 0; i < rows.length; i++) {
    personList.push(rows[i]);
}
```

## Synchronization with Couchbase Sync Gateway and Couchbase Server

Couchbase Lite can work in combination with Couchbase Sync Gateway to offer synchronization support between devices and platforms.  Couchbase Sync Gateway **is not** a requirement to use Couchbase Lite if the goal is to only use it for offline purposes.

Couchbase Sync Gateway can be downloaded via the [Couchbase Downloads Portal](http://www.couchbase.com/downloads) in the mobile section.

A demo configuration file for Sync Gateway is included in the **demo** directory.  It can be started by executing the following from a Command Prompt or Terminal:

```
/path/to/sync/gateway/bin/sync_gateway /path/to/demo/sync-gateway-config.json
```

In the demo configuration file, Couchbase Server is not used, but instead an in-memory database good for prototyping.  It can be accessed via **http://localhost:4985/_admin/** in your web browser.

To replicate between the local device and server, the following must be added to your project:

```javascript
var couchbaseModule = require("nativescript-couchbase");
database = new couchbaseModule.Couchbase("test-database");

var push = database.createPushReplication("http://sync-gateway-host:4984/test-database");
var pull = database.createPullReplication("http://sync-gateway-host:4984/test-database");
push.setContinuous(true);
pull.setContinuous(true);
push.start();
pull.start();
```

Data will now continuously be replicated between the local device and Sync Gateway.

### Listening for Changes

```javascript
database.addDatabaseChangeListener(function(changes) {
    for(var i = 0; i < changes.length; i++) {
        console.log(changes[i].getDocumentId());
    }
});
```

## Plugin Development

The Couchbase NativeScript plugin is under active development.  Changes to the API are infrequent in the underlying Couchbase Android and Couchbase iOS SDKs so as a result changes are infrequent in the JavaScript wrapper for NativeScript.

If you feel something is missing or you've found a bug, open a ticket so it can be corrected or submit a pull request and be recognized for your contributions.