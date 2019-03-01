# ALOHA
<hr>
<img src="https://img.shields.io/hexpm/l/plug.svg" />

<b>Aloha</b> is a Home/Away mobile app based on wifi network, rather than location. Currently, it only supports [Philips Hue](https://www2.meethue.com/en-us).

# Installation
For the moment, the only way to install Aloha is by cloning this repository and following the <b>Development</b> section.

# Development

## Current status of development:
- [x] register device with bridge
- [x] remote authentication
- [ ] access token refresh
- [x] view and manage scenes stored on the Hue Bridge
- [ ] UI design improvements/enhancements
- [ ] increase code coverage
- [x] test on android
- [ ] test on iOS

# Getting Started
To run Aloha locally, you must either be connected to the same wifi network as a Philips Hue Bridge, or run an emulator (like [this one](https://www.npmjs.com/package/hue-simulator)).

### Pre-Requisites

Aloha is developed with:

- the angular flavor of nativescript. Using npm, install [Nativescript](https://docs.nativescript.org/start/introduction)

```bash
npm i -g nativescript
```
- [restdb](https://restdb.io/) to store data. You'll need to get an api key (it's free up to a certain number of requests/month). 

# Usage
Run on android using 
```bash
tns run android
```
Run on iOS with
```bash
tns run ios
```
Note: This project has never been built for iOS, so no guarantee everything will work smoothly.In fact it almost definitely won't.

# License
Aloha  is made available under the Apache 2 License.
