# NativeScript UUID

This is a plugin for Nativescript that allows you to get a UUID (Universal Unique Identifier) for a device.

Inspired from [`StackOverflow: How to preserve identifierForVendor in ios after uninstalling ios app on device?`] (http://stackoverflow.com/questions/21878560/how-to-preserve-identifierforvendor-in-ios-after-uninstalling-ios-app-on-device).

Uses [`SSKeychain Cocoa Pod`](https://cocoapods.org/pods/SSKeychain).

## Installation
`tns plugin add nativescript-uuid`

## Usage
```
var plugin = require("nativescript-uuid");
var uuid = plugin.getUUID();
console.log("The device UUID is " + uuid);
```
