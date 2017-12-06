var SensorTag = require('./sensortagpromise');

address = process.argv[2]

console.log('start disconver')
SensorTag.discoverByAddressPromise(address)
.then(function(tag) {
  console.log('stop discover');

  tag.on('disconnect', function() {
    console.log('disconnected');
    process.exit(0);
  });


  Promise.resolve()
  .then(() => {
    console.log('start connectAndSetup');
    return tag.connectAndSetupPromise()
    .then(() => console.log('stop connectAndSetup'));
  }).then(() => {
    return tag.readSystemIdPromise()
    .then((id) => console.log('SystemID: ' + id));
  }).then(() => {
    return tag.readDeviceNamePromise()
    .then((name) => console.log('DeviceName:' + name));
  }).then(() => {
    return tag.readSerialNumberPromise()
    .then((serial) => console.log('SerialNumber: ' + serial));
  }).then(() => {
    return tag.readFirmwareRevisionPromise()
    .then((rev) => console.log('FirmwareRevision: ' + rev));
  }).then(() => {
    return tag.readHardwareRevisionPromise()
    .then((rev) => console.log('HardwareRevison: ' + rev));
  }).then(() => {
    return tag.readSoftwareRevisionPromise()
    .then((rev) => console.log('SoftwareRevision: ' + rev));
  }).then(() => {
    return tag.readBatteryLevelPromise()
    .then((level) => console.log('BatteryLevel: ' + level));
  }).then(() => {
    return tag.readManufactureNamePromise()
    .then((name) => console.log('ManufactureName: ' + name));
  })
  .then(() => tag.enableIrTemperaturePromise())
  .then(() => tag.enableHumidityPromise())
  .then(() => tag.enableBarometricPressurePromise())
  .then(() => tag.enableLuxometerPromise())
  .then(() => {
    console.log('start setTimeout');
    return SensorTag.setTimeoutPromise(1000)
    .then(() => console.log('stop setTimeout'));
  })
  .then(() => tag.readIrTemperaturePromise())
  .then((temp) => console.log('IrTemp: ' + temp.object + "," + temp.ambient)) 
  .then(() => tag.disableIrTemperaturePromise())
  .then(() => tag.readHumidityPromise())
  .then((humid) => console.log('Humid: ' + humid.temperature + ', ' + humid.humidity))
  .then(() => tag.disableHumidityPromise())
  .then(() => tag.readBarometricPressurePromise())
  .then((press) => console.log('Pressure: ' + press))
  .then(() => tag.disableBarometricPressurePromise())
  .then(() => tag.readLuxometerPromise())
  .then((lux) => console.log('Luxometer: ' + lux))
  .then(() => {
    return tag.notifySimpleKeyPromise()
    .then(() => console.log('start simpleKeyChange'));
  })
  .then(() => tag.onSimpleKeyChangePromise())
  .then((keys) => {
    console.log('start disconnect');
    return tag.disconnectPromise()
    .then(() => console.log('stop disconnect'));
  });
});
