var hue = require("node-hue-api");
var HueApi = hue.HueApi;
var hueApiImpl = new HueApi();
var fs = require("fs");

createUser = (result) => {
    ip = result[0].ipaddress;
    console.log(ip);
    hueApiImpl.createUser(ip, function(err, user) {
        if (err) throw err;
        user = user;
        console.log(user);
        var writeStream = fs.createWriteStream("./config/bridge-data.json");
        writeStream.write("{\"username\": \"" + user + "\, \"ip\":\"" + ip + "\"}");
        writeStream.end();
    }); 
}

hue.nupnpSearch().then(result => {
    console.log("Press the button on the hue bridge.");
    // sleeping to give user time to push button
    await sleep(5000);
    createUser(result);
}).done();
