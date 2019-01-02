# Aloha
![license](https://img.shields.io/hexpm/l/plug.svg)
Aloha is a home automation tool to turn on phillips hue devices when you arrive home, and to turn them off when you leave. No scheduled routines or human intervention required.

# Getting Started
Before development, make sure that your phillips hue lights and bridge are functioning properly and that you're on the same wifi network.

To connect to the bridge, run ` node register.js` which creates a new user (the client) that is authorized to connect to the bridge. Press the button on the phillips hue bridge when prompted. 
The generated username and the bridge's ip address are stored in `bridge-data.json`
```json
{
    "ip": "192.168.1.xxx",
    "username": "8YfYx1Cff8sn44VFpMmkT955BsubREJVLnNo7GYX73"
}
```
# Usage
To start the client, run ``` node aloha.js```. This will monitor if your authorized devices are connecting or disconnecting from the wifi network. Arrival behavior is managed on a per user basis. 

Authorized users can be managed in `hosts.json`, where each entry contains an ip address, a name, and a list of allowed lights.
Ex: 
```json
[
    {
        "ip": "192.168.1.xxx",
        "name": "username",
        "allowedLights": [1, 4]
    }
]

```
And actions.json stores data about the action (so far, only the color) of a lamp when that user is connected to the network.
For example, the below configuration would lead to lamp 1 being turned to red when user1 connects to the network.
```json
{
    "user1": {
        "connect": {
            "1": {
                "color": {
                    "r": "255",
                    "g": "0",
                    "b": "0"
                }
            }
        }
    }
}
```
Refer to the json files in the config folder for examples.
# Planned Updates
- create user interface
- provide more control for real time updates to lights

# License
Aloha  is made available under the Apache 2 License.

See https://github.com/peter-murray/node-hue-api for a guide on getting started with the hue api.

