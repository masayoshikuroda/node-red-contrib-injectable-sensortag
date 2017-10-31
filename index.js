var SensorTag = require('sensortag');
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
  SensorTag.discover(onDiscover);
  setState(1);

}

function onDiscover(tag) {
  console.log('enter: onDiscover');
  setState(2);

  Promise.resolve()
  .then(function() {
    return new Promise(function(resolve, reject) {
      tag.connectAndSetup(function(error) {
        if (error) throw error;
        resolve();
      });
    });
  }).then(function() {
    return new Promise(function(resolve, reject) {
      tag.notifySimpleKey(function(error) {
        if (error) throw error;
        resolve();
      });
    });
  }).then(function() {
    tag.on('simpleKeyChange', onSimpleKeyChange);
  }).then(function() {
    ctx.tag = tag;
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

function getDeviceNamePromise(tag) {
  return new Promise(function(resolve, reject) {
    tag.readDeviceName(function(error, name) {
      if (error) throw error;
      resolve(name);
    });
  });
}

function getSystemIdPromise(tag) {
  return new Promise(function(resolve, reject) {
    tag.readSystemId(function(error, id) {
      if (error) throw error;
      resolve(id);
    });
  });
}

function getSerialNumberPromise(tag) {
  return new Promise(function(resolve, reject) {
    tag.readSerialNumber(function(error, number) {
      if (error) throw error;
      resolve(number);
    });
  });
}

function getFirmwareRevisionPromise(tag) {
  return new Promise(function(resolve, reject) {
    tag.readFirmwareRevision(function(error, revision) {
      if (error) throw error;
      resolve(revision);
    });
  });
}

function getHardwareRevisionPromise(tag) {
  return new Promise(function(resolve, reject){
    tag.readHardwareRevision(function(error, revision) {
      if (error) throw error;
      resolve(revision);
    });
  });
}

function getSoftwareRevisionPromise(tag) {
  return new Promise(function(resolve, reject) {
    tag.readSoftwareRevision(function(error, revision) {
      if (error) throw error;
      resolve(revision);
    });
  });
}

function getBatteryLevelPromise(tag) {
  return new Promise(function(resolve, reject) {
    tag.readBatteryLevel(function(error, level) {
      if (error) throw error;
      resolve(level);
    });
  });
}

function getManufacturerNamePromise(tag) {
  return new Promise(function(resolve, reject) {
    tag.readManufacturerName(function(error, name){
      if (error) throw error;
      resolve(name);
    });
  });
}

function getDeviceInformation(config) {
  var data = { };
  return Promise.resolve(ctx.tag)
  .then(function(tag) {
    setState(4);
    return tag;
  }).then(function(tag) {
    if (config.devname) {
      return getDeviceNamePromise(tag).then(function(name) {
        data.DeviceName = name;
        return tag;
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if (config.systemid) {
      return getSystemIdPromise(tag).then(function(id) {
        data.SystemId = id;
        return tag;
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if (config.serial) {
      return getSerialNumberPromise(tag).then(function(number) {
        data.SerialNumber = number;
        return tag;
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if (config.firmrev) {
      return getFirmwareRevisionPromise(tag).then(function(revision) {
        data.FirmwareRevison = revision;
        return tag;
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if(config.hardrev) {
      return getHardwareRevisionPromise(tag).then(function(revision) {
        data.HardwareRevison = revision;
        return tag;
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if (config.softrev) {
      return getSoftwareRevisionPromise(tag).then(function(revision) {
        data.SoftwareRevison = revision;
        return tag;
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if (config.manufac) {
      return getManufacturerNamePromise(tag).then(function(name){
        data.ManufacturerName = name;
        return tag;
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if (config.battery) {
      return getBatteryLevelPromise(tag).then(function(level) {
        data.BatteryLevel = level;
        return tag;
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if (config.temperature) {
      return new Promise(function(resolve, reject) {
        tag.enableIrTemperature(resolve(tag));
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if (config.humidity) {
      return new Promise(function(resolve, reject) {
        tag.enableHumidity(resolve(tag));
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if (config.pressure) {
      return new Promise(function(resolve, reject) {
        tag.enableBarometricPressure(resolve(tag));
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if (config.luxometer) {
      return new Promise(function(resolve, reject) {
        tag.enableLuxometer(resolve(tag));
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    return new Promise(function(resolve, reject) {
      setTimeout(resolve(tag), 1000);
    })
  }).then(function(tag) {
    if (config.temperature) {
      return new Promise(function(resolve, reject) {
        tag.readIrTemperature(function(error, objectTemperature, ambientTemperature) {
          if (error) throw error;
          data.ObjectTemperature = objectTemperature;
          data.AmbientTemperature = ambientTemperature;
          resolve(tag);
        });
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if (config.temperature) {
      return new Promise(function(resolve, reject) {
        tag.disableIrTemperature(resolve(tag));
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if (config.humidity) {
      return new Promise(function(resolve, reject) {
        tag.readHumidity(function(error, temperature, humidity) {
          if (error) throw error;
          data.Temperature = temperature;
          data.Humidity = humidity;
          resolve(tag);
        });
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if (config.humidity) {
      return new Promise(function(resolve, reject) {
        tag.disableHumidity(resolve(tag));
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if (config.pressure) {
      return new Promise(function(resolve, reject) {
        tag.readBarometricPressure(function(error, pressure) {
          if (error) throw error;
          data.BarometricPressure = pressure;
          resolve(tag);
        });
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if (config.pressure) {
      return new Promise(function(resolve, reject) {
        tag.disableBarometricPressure(resolve(tag));
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if (config.luxometer) {
      return new Promise(function(resolve, reject) {
        tag.readLuxometer(function(error, lux) {
          if (error) throw error;
          data.Lux = lux;
          resolve(tag);
        });
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    if (config.luxometer) {
      return new Promise(function(resolve, reject) {
        tag.disableLuxometer(resolve(tag));
      });
    } else {
      return tag;
    }
  }).then(function(tag) {
    return new Promise(function(resolve, reject) {
      setState(3);
      resolve(tag);
    });
  }).then(function(tag) {
    return data;
  }).catch(function(error) {
    console.log(error);
    setState(3);
  });
}

module.exports = function(RED) {
  "use strict";
  function SensorTag2Node(config) {
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

  RED.nodes.registerType("SensorTag2", SensorTag2Node);
}
