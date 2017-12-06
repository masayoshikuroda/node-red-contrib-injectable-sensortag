var SensorTag = require('sensortag');

exports.setTimeout = function(delay) {
  console.log('enter setTimeout(' + delay + ')');
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      console.log('leave setTimeout()');
      resolve();
    }, delay);
  });
}


exports.discoverPromise = function() {
  console.log('enter discoverPromise()');
  return new Promise(function(resolve, reject) {
    SensorTag.discover(function(tag) {
      addPromiseFunctions(tag);
      console.log('leave discoverPromise(tag)');
      resolve(tag);
    });
  });
}

function addPromiseFuncitons(tag) {
  tag.connectAndSetupPromise = function(tag) {
    console.log('enter connectAndSetupPromise()');
    return new Promise(function(resolve, reject) {
      console.log('leave connectAndSetupPromise()');
      resolve();
    });
  }
}

exports.connectAndSetup = function(tag) {
  console.log('enter connectAndSetup()');
  return new Promise(function(resolve, reject) {
    tag.connectAndSetup(function() {
      console.log('leave connectAndSetup()');
      resolve();
    });
  });
}

exports.disconnect = function(tag) {
  console.log('enter disconnect()');
  return new Promise(function(resolve, reject) {
    tag.disconnect(function() {
      console.log('leave disconnect()');
      resolve();
    });
  });
}

exports.onDisconnect = function(tag) {
  console.log('enter onDisconnect()');
  return new Promise(function(resolve, reject) {
    tag.on('disconnect', function() {
      console.log('leave onDisconnect()');
      resolve();
    });
  });
}

exports.readDeviceName = function(tag) {
  console.log('enter getDeviceName()');
  return new Promise(function(resolve, reject) {
    tag.readDeviceName(function(error, name) {
      if (error) throw error;
      console.log('leave readDeviceName()=' + name);
      resolve(name);
    });
  });
}

exports.readSystemId = function(tag) {
  console.log('readSystemId()');
  return new Promise(function(resolve, reject) {
    tag.readSystemId(function(error, id) {
      if (error) throw error;
      console.log('readSystemId()=' + id);
      resolve(id);
    });
  });
}

exports.readSerialNumber = function(tag) {
  console.log('enter readSerialNumber()');
  return new Promise(function(resolve, reject) {
    tag.readSerialNumber(function(error, number) {
      if (error) throw error;
      console.log('leave readSerialNumber()=' + number);
      resolve(number);
    });
  });
}

exports.readFirmwareRevision = function(tag) {
  console.log('enter readFirmwareRevision()');
  return new Promise(function(resolve, reject) {
    tag.readFirmwareRevision(function(error, revision) {
      if (error) throw error;
      console.log('leave readFirmwareRevision()=' + revision);
      resolve(revision);
    });
  });
}

exports.readHardwareRevision = function(tag) {
  console.log('enter readHardwareRevisionRpomise()');
  return new Promise(function(resolve, reject){
    tag.readHardwareRevision(function(error, revision) {
      if (error) throw error;
      console.log('leave readHardwareRevision()=' + revision);
      resolve(revision);
    });
  });
}

exports.readSoftwareRevision = function(tag) {
  console.log('enter readSoftwareRevision()');
  return new Promise(function(resolve, reject) {
    tag.readSoftwareRevision(function(error, revision) {
      if (error) throw error;
      console.log('leave readSoftwareRevision()=' + revision);
      resolve(revision);
    });
  });
}

exports.readBatteryLevel = function(tag) {
  console.log('enter readBatteryLevel()');
  return new Promise(function(resolve, reject) {
    tag.readBatteryLevel(function(error, level) {
      if (error) throw error;
      console.log('leave readBatteryLevel()=' + level);
      resolve(level);
    });
  });
}

exports.readManufactureName = function(tag) {
  console.log('enter readManufactureName()');
  return new Promise(function(resolve, reject) {
    tag.readManufacturerName(function(error, name) {
      if (error) throw error;
      console.log('leave readManufactureName()=' + name);
      resolve(name);
    });
  });
}

exports.enableIrTemperature = function(tag) {
  console.log('enter enableIrTemperature()');
  return new Promise(function(resolve, reject) {
    tag.enableIrTemperature(function() {
      console.log('leave enableIrTemperature()');
      resolve();
    });
  });
}

exports.disableIrTemperature = function(tag) {
  console.log('enter disableIrTemperature()');
  return new Promise(function(resolve, reject) {
    tag.disableIrTemperature(function() {
      console.log('leave disableIrTemperature()');
      resolve();
    });
  });
}

exports.readIrTemperature = function(tag) {
  console.log('enter readIrTemperature()')
  return new Promise(function(resolve, reject) {
    tag.readIrTemperature(function(error, objectTemperature, ambientTemperature) {
      if (error) throw error;
      console.log('leave readIrTemperature()=' + objectTemperature + ', ' + ambientTemperature);
      resolve({ 'object': objectTemperature, 'ambient': ambientTemperature });
    });
  });
}

exports.enableHumidity = function(tag) {
  console.log('enter enableHumidity()');
  return new Promise(function(resolve, reject) {
    tag.enableHumidity(function() {
      console.log('leave enableHumidity()');
      resolve();
    });
  });
}

exports.disableHumidity = function(tag) {
  console.log('enter disableHumidity()');
  return new Promise(function(resolve, reject) {
    tag.disableHumidity(function() {
      console.log('leave disableHumidity()');
      resolve();
    });
  });
}

exports.readHumidity = function(tag) {
  console.log('enter readHumidity()');
  return new Promise(function(resolve, reject) {
    tag.readHumidity(function(error, temperature, humidity) {
      if (error) throw error;
      console.log('leave readHumidity()=' + temperature + ', ' + humidity);
      resolve({ 'temperature': temperature, 'humidity': humidity });
    });
  });
}

exports.enableBarometricPressure= function(tag) {
  console.log('enter enableBarometicPressure()');
  return new Promise(function(resolve, reject) {
    tag.enableBarometricPressure(function() {
      console.log('leave enableBarometricPressure()');
      resolve();
    });
  });
}

exports.disableBarometricPressure = function(tag) {
  console.log('enter disableBarimetricPressure()');
  return new Promise(function(resolve, reject) {
    tag.disableBarometricPressure(function() {
      console.log('leave disableBarometricPressure()');
      resolve();
    });
  });
}

exports.readBarometricPressure = function(tag) {
  console.log('enter readBarometricPressure()');
  return new Promise(function(resolve, result) {
    tag.readBarometricPressure(function(error, pressure) {
      if (error) throw error;
      console.log('leave readBarometricPressure()=' + pressure);
      resolve(pressure);
    });
  });
}

exports.enableLuxometer = function(tag) {
  console.log('enter enableLuxometer()');
  return new Promise(function(resolve, reject) {
    tag.enableLuxometer(function() {
      console.log('leave enableLuxometer()');
      resolve();
    });
  });
}

exports.disableLuxometer = function(tag) {
  console.log('enter disableLuxometer()');
  return new Promise(function(resolve, reject) {
    tag.disableLuxometer(function() {
      console.log('leave disableLuxometer()');
      resolve();
    });
  });
}

exports.readLuxometer = function(tag) {
  console.log('enter readLuxometer()');
  return new Promise(function(resolve, reject) {
    tag.readLuxometer(function(error, lux) {
      if (error) throw error;
      console.log('leave readLuxometer()=' + lux);
      resolve(lux);
    });
  });
}

exports.notifySimpleKey = function(tag) {
  return new Promise(function(resolve, reject) {
    tag.notifySimpleKey();
    resolve();
  });
}

exports.onSimpleKeyChange = function(tag) {
  console.log('enter onSimpleKeyChange()');
  return new Promise(function(resolve, reject) {
    tag.on('simpleKeyChange', function(left, right, reedRelay) {
      console.log('leave onSimpleKeychange()=' + left + ', ' + right  + ', ' + reedRelay);
      resolve({ 'left': left, 'right':right, 'reedRelay':reedRelay });
    });
  });
}
