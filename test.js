var SensorTagPromise = require('./sensortagpromise');

console.log('start disconver')
SensorTagPromise.discoverPromise()
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
    return SensorTagPromise.connectAndSetupPromise(tag)
    .then(() => console.log('stop connectAndSetup'));
  }).then(() => {
    return SensorTagPromise.getSystemIdPromise(tag)
    .then((id) => console.log('SystemID: ' + id));
  }).then(() => {
    return SensorTagPromise.getDeviceNamePromise(tag)
    .then((name) => console.log('DeviceName:' + name));
  }).then(() => {
    return SensorTagPromise.getSerialNumberPromise(tag)
    .then((serial) => console.log('SerialNumber: ' + serial));
  }).then(() => {
    return SensorTagPromise.getFirmwareRevisionPromise(tag)
    .then((rev) => console.log('FirmwareRevision: ' + rev));
  }).then(() => {
    return SensorTagPromise.getHardwareRevisionPromise(tag)
    .then((rev) => console.log('HardwareRevison: ' + rev));
//  }).then(() => {
//    return SensorTagPromise.getSoftwareRevisonPromise(tag)
//    .then((rev) => console.log('SoftwareRevision: ' + rev));
  }).then(() => {
    return SensorTagPromise.getBatteryLevelPromise(tag)
    .then((level) => console.log('BatteryLevel: ' + level));
  }).then(() => {
    return SensorTagPromise.getManufactureNamePromise(tag)
    .then((name) => console.log('ManufactureName: ' + name));
  }).then(() => {
    console.log('start setTimeout');
    return SensorTagPromise.setTimeoutPromise(6000)
    .then(() => console.log('stop setTimeout'));
  }).then(() => {
    tag.notifySimpleKey();
    console.log('start simpleKeyChange');
    return SensorTagPromise.onSimpleKeyChangePromise(tag)
    return SensorTagPromise.onSimpleKeyChangePromise(tag)
    .then((left, right, reedRelay) => {
      console.log('stop simpleKeyChange');
      console.log('start disconnect');
      return SensorTagPromise.disconnectPromise(tag)
      .then(() => console.log('stop disconnect'));
    });
  });
});
