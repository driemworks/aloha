var device = require('../tns-core-modules/platform/platform').device;

function getUUID() {
  return device.uuid;
}

exports.getUUID = getUUID;