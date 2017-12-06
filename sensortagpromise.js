var SensorTag = require('sensortag');

exports.setTimeoutPromise = function(delay) {
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

exports.discoverByIdPromise = function(id) {
 console.log('enter discoverbyIdPromise(' + id + ')');
  return new Promise(function(resolve, reject) {
    SensorTag.discoverById(id, function(tag) {
      addPromiseFunctions(tag);
      console.log('leave discoverByIdPromise(' + id + ')');
      resolve(tag);
    });
  });
}

exports.discoverByAddressPromise = function(address) {
 console.log('enter discoverByAddressPromise(' + address + ')');
  return new Promise(function(resolve, reject) {
    SensorTag.discoverByAddress(address, function(tag) {
      addPromiseFunctions(tag);
      console.log('leave discoverByAddressPromise(' + address + ')');
      resolve(tag);
    });
  });
}

function addPromiseFunctions(tag) {
  console.log('enter addPromiseFunctions()');

  tag.disconnectPromise = function() {
    console.log('enter disconnectPromise()');
    return new Promise(function(resolve, reject) {
      tag.disconnect(function() {
        console.log('leave disconnectPromise()');
        resolve();
      });
    });
  }

  tag.connectAndSetupPromise = function() {
    console.log('enter connectAndSetupPromise()');
    return new Promise(function(resolve, reject) {
      tag.connectAndSetup(function(error) {
	if (error) throw error;
	console.log('leave connectAndSetupPromise()');
        resolve();
      });
    });
  }

  tag.readDeviceNamePromise = function() {
    console.log('enter getDeviceNamePromise()');
    return new Promise(function(resolve, reject) {
      console.log('leave getDevicenamePromise()');
      tag.readDeviceName(function(error, name) {
        if (error) throw error;
        console.log('leave readDeviceNamePromise()=' + name);
        resolve(name);
      });
    });
  }

  tag.readSystemIdPromise = function() {
    console.log('enter readSystemIdPromise()');
    return new Promise(function(resolve, reject) {
      tag.readSystemId(function(error, id) {
        if (error) throw error;
        console.log('leave readSystemIdPromise()=' + id);
        resolve(id);
      });
    });
  }

  tag.readSerialNumberPromise = function() {
    console.log('enter readSerialNumberPromise()');
    return new Promise(function(resolve, reject) {
      tag.readSerialNumber(function(error, number) {
        if (error) throw error;
        console.log('leave readSerialNumber()=' + number);
        resolve(number);
      });
    });
  }

  tag.readFirmwareRevisionPromise = function() {
    console.log('enter readFirmwareRevisionPromise()');
    return new Promise(function(resolve, reject) {
      tag.readFirmwareRevision(function(error, revision) {
        if (error) throw error;
        console.log('leave readFirmwareRevisionPromise()=' + revision);
        resolve(revision);
      });
    });
  }

  tag.readHardwareRevisionPromise = function() {
    console.log('enter readHardwareRevisionRpomise()');
    return new Promise(function(resolve, reject){
      tag.readHardwareRevision(function(error, revision) {
        if (error) throw error;
        console.log('leave readHardwareRevisionPromise()=' + revision);
        resolve(revision);
      });
    });
  }

  tag.readSoftwareRevisionPromise = function() {
    console.log('enter readSoftwareRevisionPromise()');
    return new Promise(function(resolve, reject) {
      tag.readSoftwareRevision(function(error, revision) {
        if (error) throw error;
        console.log('leave readSoftwareRevisionPromise()=' + revision);
        resolve(revision);
      });
    });
  }

  tag.readBatteryLevelPromise = function() {
    console.log('enter readBatteryLevelPromise()');
    return new Promise(function(resolve, reject) {
      tag.readBatteryLevel(function(error, level) {
        if (error) throw error;
        console.log('leave readBatteryLevelPromise()=' + level);
        resolve(level);
      });
    });
  }

  tag.readManufactureNamePromise = function() {
    console.log('enter readManufactureName()');
    return new Promise(function(resolve, reject) {
      tag.readManufacturerName(function(error, name) {
        if (error) throw error;
        console.log('leave readManufactureNamePromise()=' + name);
        resolve(name);
      });
    });
  }

  tag.enableIrTemperaturePromise = function() {
  console.log('enter enableIrTemperaturePromise()');
    return new Promise(function(resolve, reject) {
      tag.enableIrTemperature(function() {
        console.log('leave enableIrTemperaturePromise()');
        resolve();
      });
    });
  }

  tag.disableIrTemperaturePromise = function() {
    console.log('enter disableIrTemperaturePromise()');
    return new Promise(function(resolve, reject) {
      tag.disableIrTemperature(function() {
        console.log('leave disableIrTemperaturePromise()');
        resolve();
      });
    });
  }

  tag.readIrTemperaturePromise = function() {
    console.log('enter readIrTemperaturePromise()')
    return new Promise(function(resolve, reject) {
      tag.readIrTemperature(function(error, objectTemperature, ambientTemperature) {
        if (error) throw error;
        console.log('leave readIrTemperaturePromise()=' + objectTemperature + ', ' + ambientTemperature);
        resolve({ 'object': objectTemperature, 'ambient': ambientTemperature });
      });
    });
  }

  tag.enableHumidityPromise = function() {
    console.log('enter enableHumidityPromise()');
    return new Promise(function(resolve, reject) {
      tag.enableHumidity(function() {
        console.log('leave enableHumidityPromise()');
        resolve();
      });
    });
  }

  tag.disableHumidityPromise = function() {
    console.log('enter disableHumidityPromise()');
    return new Promise(function(resolve, reject) {
      tag.disableHumidity(function() {
        console.log('leave disableHumidityPromise()');
        resolve();
      });
    });
  }

  tag.readHumidityPromise = function() {
    console.log('enter readHumidityPromise()');
    return new Promise(function(resolve, reject) {
      tag.readHumidity(function(error, temperature, humidity) {
        if (error) throw error;
        console.log('leave readHumidityiPromise()=' + temperature + ', ' + humidity);
        resolve({ 'temperature': temperature, 'humidity': humidity });
      });
    });
  }

  tag.enableBarometricPressurePromise = function() {
    console.log('enter enableBarometicPressureProimse()');
    return new Promise(function(resolve, reject) {
      tag.enableBarometricPressure(function() {
        console.log('leave enableBarometricPressurePromise()');
        resolve();
      });
    });
  }

  tag.disableBarometricPressurePromise = function() {
    console.log('enter disableBarimetricPressure()');
    return new Promise(function(resolve, reject) {
      tag.disableBarometricPressure(function() {
        console.log('leave disableBarometricPressurePromise()');
        resolve();
      });
    });
  }

  tag.readBarometricPressurePromise = function() {
    console.log('enter readBarometricPressurePromise()');
    return new Promise(function(resolve, result) {
      tag.readBarometricPressure(function(error, pressure) {
        if (error) throw error;
        console.log('leave readBarometricPressurePromise()=' + pressure);
        resolve(pressure);
      });
    });
  }

  tag.enableLuxometerPromise = function() {
    console.log('enter enableLuxometerPromise()');
    return new Promise(function(resolve, reject) {
      tag.enableLuxometer(function() {
        console.log('leave enableLuxometerPromise()');
        resolve();
      });
    });
  }

  tag.disableLuxometerPromise = function() {
    console.log('enter disableLuxometerPromise()');
    return new Promise(function(resolve, reject) {
      tag.disableLuxometer(function() {
        console.log('leave disableLuxometerPromise()');
        resolve();
      });
    });
  }

  tag.readLuxometerPromise = function() {
  console.log('enter readLuxometePromiser()');
    return new Promise(function(resolve, reject) {
      tag.readLuxometer(function(error, lux) {
        if (error) throw error;
        console.log('leave readLuxometerPromise()=' + lux);
        resolve(lux);
      });
    });
  }

  tag.notifySimpleKeyPromise = function() {
    return new Promise(function(resolve, reject) {
      tag.notifySimpleKey();
      resolve();
    });
  }

  tag.onSimpleKeyChangePromise = function() {
    console.log('enter onSimpleKeyChangePromise()');
    return new Promise(function(resolve, reject) {
      tag.on('simpleKeyChange', function(left, right, reedRelay) {
        console.log('leave onSimpleKeychangePromise()=' + left + ', ' + right  + ', ' + reedRelay);
        resolve({ 'left': left, 'right':right, 'reedRelay':reedRelay });
      });
    });
  }

  console.log('leave addPromiseFunctions()');
}
