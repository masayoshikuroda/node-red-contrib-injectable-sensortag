var SensorTag = require('./sensortagpromise');
var ctx = { state: 0, nodes: {}, data: {} };

function addNode(node) {
  console.log('enter: addNode');
  if (isNodeEmpty()) {
    startDiscovery();
  }
  ctx.nodes[node.id] = node;
  onStateChange();
}

function removeNode(node) {
  console.log('enter: removeNode');
  delete ctx.nodes[node.id];
  if (isNodeEmpty()) {
    stopConnection();
  }
}

function isNodeEmpty() {
  return Object.keys(ctx.nodes).length === 0;
}

function setState(newState) {
  ctx.state = newState;
  onStateChange();
}

function onStateChange() {
  for (id in ctx.nodes) {
    node = ctx.nodes[id];
    setNodeStatus(node);
  }
}

function setNodeStatus(node) {
  node.status({fill: getStatusColor(), shape:"dot", text: getStatusMessage()});
}

function getStatusMessage() {
  switch (ctx.state) {
    case 0: return 'idle.';
    case 1: return 'discovering...';
    case 2: return 'connecting...';
    case 3: return 'ready';
    case 4: return 'scanning...';
    case 5: return 'disconnecting...';
    default: return '';
  }
}

function getStatusColor() {
  switch (ctx.state) {
    case 0: return 'gray';
    case 1: return 'blue';
    case 2: return 'blue';
    case 3: return 'green';
    case 4: return 'red';
    case 5: return 'blue';
    default: return 'white';
  }
}

function isStatusReady() {
  return ctx.state === 3;
}

function startDiscovery() {
  console.log('enter: startDiscovery');
  setState(1);
  SensorTag.discoverPromise()
  .then(function(tag) {
    console.log('discovered');
    ctx.tag = tag;
    setState(2);
    tag.on('disconnect', disconnected);
    return tag.connectAndSetupPromise()
      .then(() => tag.notifySimpleKey(ctx.tag))
      .then(() => {
        tag.on('simpleKeyChange', simpleKeyChanged);
        setState(3);
      });
  }).catch(function(error) {
    console.log(error);
  });
}

function simpleKeyChanged(left, right, reedRelay) {
  console.log('simpleKeyChanged');

  if(left) {
   ctx.tag.disconnect(function() {
      console.log('stopped manually');
    }) 
  }

  if(right && isStatusReady()) {
    console.log('right button pushed!');
  }
}

function disconnected() {
  console.log('disconnectd');
  setState(0);
  ctx.tag = null;
  startDiscovery();
}

function getDeviceInformation(config) {
  console.log('getDeviceInformation')
  var data = { };
  setState(4);

  tag = ctx.tag
  return Promise.resolve()
  .then(function() {
    if (config.devname) {
      return tag.readDeviceNamePromise()
      .then(function(name) { data.DeviceName = name; });
    }
  }).then(function() {
    if (config.systemid) {
      return tag.readSystemIdPromise()
      .then(function(id) { data.SystemId = id; });
    }
  }).then(function() {
    if (config.serial) {
      return tag.readSerialNumberPromise()
      .then(function(number) { data.SerialNumber = number; });
    }
  }).then(function() {
    if (config.firmrev) {
      return SensorTagPromise.readFirmwareRevisionPromise()
      .then(function(revision) { data.FirmwareRevison = revision; });
    }
  }).then(function() {
    if(config.hardrev) {
      return tag.readHardwareRevisionPromise()
      .then(function(revision) { data.HardwareRevison = revision; });
    }
  }).then(function() {
    if (config.softrev) {
      return tag.readSoftwareRevisionPromise()
      .then(function(revision) { data.SoftwareRevison = revision; });
    }
  }).then(function() {
    if (config.manufac) {
      return SensorTagPromise.readManufactureName(ctx.tag)
      .then(function(name) { data.ManufactureName = name; });
    }
  }).then(function() {
    if (config.battery) {
      return tag.readBatteryLevelPromise()
      .then(function(level) { data.BatteryLevel = level; });
    }
  }).then(function() {
    if (config.temperature) {
      return tag.enableIrTemperaturePromise();
    }
  }).then(function() {
    if (config.humidity) {
      return tag.enableHumidityPromise();
    }
  }).then(function() {
    if (config.pressure) {
      return tag.enableBarometricPressurePromise();
    }
  }).then(function() {
    if (config.luxometer) {
      return tag.enableLuxometerPromise();
    }
  }).then(function() {
    return SensorTag.setTimeoutPromise(config.delay);
  }).then(function() {
    if (config.temperature) {
      return tag.readIrTemperaturePromise()
      .then(function(temp) {
          data.ObjectTemperature = temp.object;
          data.AmbientTemperature = temp.ambient;
      }).then(function() {
        return tag.disableIrTemperaturePromise();
      });
    }
  }).then(function() {
    if (config.humidity) {
      return tag.readHumidityPromise()
      .then(function(humid) {
          data.Temperature = humid.temperature;
          data.Humidity = humid.humidity;
      }).then(function() {
        return tag.disableHumidityPromise();
      });
    }
  }).then(function() {
    if (config.pressure) {
      return tag.readBarometricPressurePromise()
      .then(function(pressure) {
          data.BarometricPressure = pressure;
      }).then(function() {
        return tag.disableBarometricPressurePromise();
      });
    }
  }).then(function() {
    if (config.luxometer) {
      return tag.readLuxometerPromise()
      .then(function(lux) {
          data.Lux = lux;
      }).then(function() {
        return tag.disableLuxometerPromise();
      });
    }
  }).then(function() {
      setState(3);
      return data;
  }).catch(function(error) {
    console.log(error);
    setState(3);
  });
}

module.exports = function(RED) {
  "use strict";
  function InjectableSensorTagNode(config) {
    console.log('enter: SensorTag2Node');
    RED.nodes.createNode(this, config);
    console.log('    id: ' + this.id);
    addNode(this);
    var node = this;
    node.on('input', function(msg) {
      if (!isStatusReady()) {
        node.debug('not connected or busy. skipped.');
        return;
      }

      getDeviceInformation(config).then(function(data) {
        if (config.topic) {
          msg.topic = data.SystemId;
        }
        msg.payload = data;
        node.send(msg);
      })
      .catch(function(error) {
         node.error('catch: ' + error);
      });
    });
    node.on('close', function(removed, done) {
        if (removed) {
          removeNode(this);
        }
        done();
    });
  }

  RED.nodes.registerType("InjectableSensorTag", InjectableSensorTagNode);
}
