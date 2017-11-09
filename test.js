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
    return SensorTagPromise.readSystemId(tag)
    .then((id) => console.log('SystemID: ' + id));
  }).then(() => {
    return SensorTagPromise.readDeviceName(tag)
    .then((name) => console.log('DeviceName:' + name));
  }).then(() => {
    return SensorTagPromise.readSerialNumber(tag)
    .then((serial) => console.log('SerialNumber: ' + serial));
  }).then(() => {
    return SensorTagPromise.readFirmwareRevision(tag)
    .then((rev) => console.log('FirmwareRevision: ' + rev));
  }).then(() => {
    return SensorTagPromise.readHardwareRevision(tag)
    .then((rev) => console.log('HardwareRevison: ' + rev));
  }).then(() => {
    return SensorTagPromise.readSoftwareRevision(tag)
    .then((rev) => console.log('SoftwareRevision: ' + rev));
  }).then(() => {
    return SensorTagPromise.readBatteryLevel(tag)
    .then((level) => console.log('BatteryLevel: ' + level));
  }).then(() => {
    return SensorTagPromise.readManufactureName(tag)
    .then((name) => console.log('ManufactureName: ' + name));
  })
  .then(() => SensorTagPromise.enableIrTemperature(tag))
  .then(() => SensorTagPromise.enableHumidity(tag))
  .then(() => SensorTagPromise.enableBarometricPressure(tag))
  .then(() => SensorTagPromise.enableLuxometer(tag))
  .then(() => {
    console.log('start setTimeout');
    return SensorTagPromise.setTimeout(1000)
    .then(() => console.log('stop setTimeout'));
  })
  .then(() => SensorTagPromise.readIrTemperature(tag))
  .then((temp) => console.log('IrTemp: ' + temp.object + "," + temp.ambient)) 
  .then(() => SensorTagPromise.disableIrTemperature(tag))
  .then(() => SensorTagPromise.readHumidity(tag))
  .then((humid) => console.log('Humid: ' + humid.temperature + ', ' + humid.humidity))
  .then(() => SensorTagPromise.disableHumidity(tag))
  .then(() => SensorTagPromise.readBarometricPressure(tag))
  .then((press) => console.log('Pressure: ' + press))
  .then(() => SensorTagPromise.disableBarometricPressure(tag))
  .then(() => SensorTagPromise.readLuxometer(tag))
  .then((lux) => console.log('Luxometer: ' + lux))
  .then(() => {
    tag.notifySimpleKey();
    console.log('start simpleKeyChange');
    return SensorTagPromise.onSimpleKeyChange(tag)
    .then((keys) => {
      console.log('stop simpleKeyChange');
      console.log('start disconnect');
      return SensorTagPromise.disconnect(tag)
      .then(() => console.log('stop disconnect'));
    });
  });
});
