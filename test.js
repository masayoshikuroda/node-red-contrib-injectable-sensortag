var SensorTagPromise = require('./sensortagpromise');

console.log('start disconver')
SensorTagPromise.discover()
.then(function(tag) {
  console.log('stop discover');

  console.log('start ondDisconnect');
  SensorTagPromise.onDisconnect(tag)
  .then(() => {
    console.log('stop onDisconnect');
    process.exit(0);
  });


  Promise.resolve()
  .then(() => {
    console.log('start connectAndSetup');
    return SensorTagPromise.connectAndSetup(tag)
    .then(() => console.log('stop connectAndSetup'));
  }).then(() => {
    return SensorTagPromise.getSystemId(tag)
    .then((id) => console.log('SystemID: ' + id));
  }).then(() => {
    return SensorTagPromise.getDeviceName(tag)
    .then((name) => console.log('DeviceName:' + name));
  }).then(() => {
    return SensorTagPromise.getSerialNumber(tag)
    .then((serial) => console.log('SerialNumber: ' + serial));
  }).then(() => {
    return SensorTagPromise.getFirmwareRevision(tag)
    .then((rev) => console.log('FirmwareRevision: ' + rev));
  }).then(() => {
    return SensorTagPromise.getHardwareRevision(tag)
    .then((rev) => console.log('HardwareRevison: ' + rev));
  }).then(() => {
    return SensorTagPromise.getSoftwareRevison(tag)
    .then((rev) => console.log('SoftwareRevision: ' + rev));
  }).then(() => {
    return SensorTagPromise.getBatteryLevel(tag)
    .then((level) => console.log('BatteryLevel: ' + level));
  }).then(() => {
    return SensorTagPromise.getManufactureName(tag)
    .then((name) => console.log('ManufactureName: ' + name));
  }).then(() => {
    console.log('start setTimeout');
    return SensorTagPromise.setTimeout(6000)
    .then(() => console.log('stop setTimeout'));
  }).then(() => {
    tag.notifySimpleKey();
    console.log('start simpleKeyChange');
    return SensorTagPromise.onSimpleKeyChange(tag)
    return SensorTagPromise.onSimpleKeyChange(tag)
    .then((keys) => {
      console.log('stop simpleKeyChange');
      console.log('start disconnect');
      return SensorTagPromise.disconnectPromise(tag)
      .then(() => console.log('stop disconnect'));
    });
  });
});
