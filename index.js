var SensorTagPromise = require('./sensortagpromise');
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
  SensorTagPromise.discover()
  .then(function(tag) {
    console.log('enter: onDiscover');
    ctx.tag = tag;
    setState(2);
    return SensorTagPromise.connectAndSetup(ctx.tag);
  }).then(function() {
    return SensorTagPromise.notifySimpleKey(ctx.tag);
  }).then(function() {
    ctx.tag.on('simpleKeyChange', onSimpleKeyChange);
    setState(3);
  }).catch(function(error) {
    console.log(error);
  });
}

function onSimpleKeyChange(left, right, reedRelay) {
  console.log('enter: onSimpleKeyChage');

  if(left) {
    stopConnection();
  }

  if(right && isStatusReady()) {
    getDeviceInformation().then(function(data) {
      console.log(data);
    });
  }
}

function stopConnection() {
  console.log('enter: stopConnection');
  setState(5);
  ctx.tag.disconnect(onDisconnect);
}

function onDisconnect() {
  console.log('enter: onDisconnect');
  setState(0);
  ctx.tag = null;
}

function getDeviceInformation(config) {
  var data = { };
  setState(4);


  return Promise.resolve(ctx.tag)
  .then(function() {
    if (config.devname) {
      return SensortagPromise.readDeviceName(ctx.tag)
      .then(function(name) { data.DeviceName = name; });
    }
  }).then(function() {
    if (config.systemid) {
      return SensorTagPromise.readSystemId(ctx.tag)
      .then(function(id) { data.SystemId = id; });
    }
  }).then(function() {
    if (config.serial) {
      return SensorTagPromise.readSerialNumber(ctx.tag)
      .then(function(number) { data.SerialNumber = number; });
    }
  }).then(function() {
    if (config.firmrev) {
      return SensorTagPromise.readFirmwareRevision(ctx.tag)
      .then(function(revision) { data.FirmwareRevison = revision; });
    }
  }).then(function() {
    if(config.hardrev) {
      return SensorTagPromise.readHardwareRevision(ctx.tag)
      .then(function(revision) { data.HardwareRevison = revision; });
    }
  }).then(function() {
    if (config.softrev) {
      return SensorTagPromise.readSoftwareRevision(ctx.tag)
      .then(function(revision) { data.SoftwareRevison = revision; });
    }
  }).then(function() {
    if (config.manufac) {
      return SensorTagPromise.readManufacturerName(ctx.tag)
      .then(function(name) { data.ManufacturerName = name; });
    }
  }).then(function() {
    if (config.battery) {
      return SensorTagPromise.readBatteryLevel(ctx.tag)
      .then(function(level) { data.BatteryLevel = level; });
    }
  }).then(function() {
    if (config.temperature) {
      return SensorTagPromise.enableIrTemperature(ctx.tag);
    }
  }).then(function() {
    if (config.humidity) {
      return SensorTagPromise.enableHumidity(ctx.tag);
    }
  }).then(function() {
    if (config.pressure) {
      return SensorTagPromise.enableBarometricPressure(ctx.tag);
    }
  }).then(function(tag) {
    if (config.luxometer) {
      return SensorTagPromise.enableLuxometer(ctx.tag);
    }
  }).then(function(tag) {
    return SensorTagPromise.setTimeout(2000);
  }).then(function() {
    if (config.temperature) {
      return SensorTagPromise.readIrTemperature(ctx.tag)
      .then(function(temp) {
          data.ObjectTemperature = temp.object;
          data.AmbientTemperature = temp.ambient;
      }).then(function() {
        return SensorTagPromise.disableIrTemperature(ctx.tag);
      });
    }
  }).then(function(tag) {
    if (config.humidity) {
      return SensorTagPromise.readHumidity(ctx.tag)
      .then(function(humid) {
          data.Temperature = humid.temperature;
          data.Humidity = humid.humidity;
      }).then(function() {
        return SensorTagPromise.disableHumidity(ctx.tag);
      });
    }
  }).then(function(tag) {
    if (config.pressure) {
      return SensorTagPromise.readBarometricPressure(ctx.tag)
      .then(function(pressure) {
          data.BarometricPressure = pressure;
      }).then(function() {
        return SensorTagPromise.disableBarometricPressure(ctx.tag);
      });
    }
  }).then(function(tag) {
    if (config.luxometer) {
      return SensorTagPromise.readLuxometer(ctx.tag)
      .then(function(lux) {
          data.Lux = lux;
      }).then(function() {
        return SensorTagPromise.disableLuxometer(ctx.tag);
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
