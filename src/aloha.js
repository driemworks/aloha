
var hue = require("node-hue-api"),

HueApi = hue.HueApi,

lightState = hue.lightState;

var ping = require('ping');
var bridgeJson = require('./../config/bridge-data.json');
var actionsJson = require('./../config/actions.json');

var host = bridgeJson.ip,
    username = bridgeJson.username,
    api;

var api = new HueApi(host, username);

state_off = lightState.create().turnOff();

var failure_threshold = 5;

getDict = (_ip, _name, _lights, _connected, _disconnectedCount) => {
    return {ip: _ip, name: _name, lights: _lights, connected: _connected, disconnectedCount: _disconnectedCount};
}

loadHosts = () =>  {
    console.log('Initializing hosts');
    var hostJson = require('./../config/hosts.json');
    var hosts = [];
    hostJson.forEach(host => {
        ping.sys.probe(host.ip, (isAlive) => {
            data = getDict(host.ip, host.name, host.allowedLights, isAlive, 0);
            console.log('loaded: ' + host.name);
            hosts.push(data);
        });
    });
    return hosts;
}

getConnectState = (hostName, light, isLightOn) => {
    if (actionsJson[hostName]["connect"][light]) {
        var colors = actionsJson[hostName]["connect"][light]["color"];
        if (colors) {
            if (isLightOn) {
                return lightState.create().rgb(colors.r, colors.g, colors.b);
            } 
            return lightState.create().turnOn().rgb(colors.r, colors.g, colors.b);
        }
    } 
    return lightState.create().turnOn();
}

onConnect = (host, hosts) => {
    host.lights.forEach(light => {
        api.lightStatus(light, (err, result) => {
            console.log('Welcome home ' + host.name);
            if (err) console.log(err);
            // only turn the light on if it was off
            if (!result.state.on) {
                api.setLightState(light, getConnectState(host.name, light, result.state.on), (err, lights) => {
                    console.log('Turning on light: ' + light);
                });
            } else if (findConnectedHosts(hosts, light).length > 1) {
                // if the light is already on, then we can just change the color
                api.setLightState(light, getConnectState('default', light, result.state.on), (err, lights) => {
                    console.log('Turning on light: ' + light);
                });
            }
        });
    });
}

onDisconnect = (host, hosts) => {
    console.log('Good bye ' + host.name);
    host.lights.forEach(light => {
        api.lightStatus(light, (err, result) => {
            if (err) console.log(err);
            // only turn light off if nobody else is connected, and the light is on
            var connectedHosts = findConnectedHosts(hosts, light);
            if (result.state.on) {
                // if the light is on and nobody else is connected, turn it off
                if (connectedHosts.length === 0) {
                    api.setLightState(light, state_off, (err, lights) => {
                        console.log('Turning off light ' + light);
                    });
                } 
            }
        });
    });
}

findConnectedHosts = (hosts, light) => {
    var hosts = [];
    hosts.forEach((host) => {
        if (host.lights.includes(light) && host.connected) {
            hosts.push(host);
        }
    });
    return hosts;
}

pingHosts = (hosts, onConnect, onDisconnect) => {
    hosts.forEach((host) => {
        ping.sys.probe(host.ip, (isAlive) => {
            if (isAlive) {
                // case: disconnected -> connected
                if (!host.connected) {
                    // set state to connected and reset the disconnect counter
                    host.connected = true;
                    host.disconnectedCount = 0;
                    onConnect(host, hosts);
                }
            } else {
                // case: connected -> disconnected
                if (host.connected) {
                    host.connected = false;
                }
                // want to check number of times it has been disconnected
                // if greater than threshold value, turn lights off (to avoid false disconnect)
                if (host.disconnectedCount === failure_threshold) {
                    onDisconnect(host, hosts);
                }
                host.disconnectedCount += 1;
            }
        });
    });
}

const promise = new Promise((resolve, reject) => {
    var hosts = loadHosts();
    if (hosts) {
        resolve(hosts);
    } else {
        reject();
    }
});

run = () => {
    promise.then((hosts) => {
        setTimeout(() => {
            pingHosts(hosts, onConnect, onDisconnect);
            run();
        }, 1000);
    }).catch((err) => {
        console.log(err);
    });
}

console.log('Listening for devices.');
run();
