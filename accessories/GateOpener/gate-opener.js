var rpio 	  = require('rpio');
var Service, Characteristic;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-gateopener", "GateOpener", SwitchAccessory);
}

function SwitchAccessory(log, config) {
    this.log = log;
    this.config = config;
    this.name = config["name"];

    rpio.open(19, rpio.OUTPUT, rpio.LOW);
    console.log("Configuring Gate Opener");

    this.service = new Service.Switch(this.name);
    this.service
        .getCharacteristic(Characteristic.On)
        .on('get', this.getOn.bind(this))
        .on('set', this.setOn.bind(this));

    this.infoService = new Service.AccessoryInformation();
    this.infoService
    .setCharacteristic(Characteristic.Manufacturer, "onetouch.ie")
    .setCharacteristic(Characteristic.Model, "Gate Switch")
    .setCharacteristic(Characteristic.SerialNumber, "3.00.000");
}

SwitchAccessory.prototype.getOn = function(callback) {

    console.log("Reading Gate State");
    var state = rpio.read(19);
    var status = state == 0 ? true : false;
    callback(null, status);
}

SwitchAccessory.prototype.setOn = function(on, callback) {

    flashLightsOnGateOnOpening();
    
    rpio.write(19, rpio.HIGH);
    rpio.msleep(100);
    rpio.write(19, rpio.LOW);
    callback(null, on);
}

SwitchAccessory.prototype.getServices = function() {
    return [this.infoService, this.service];
}

function flashLightsOnGateOnOpening() {
    
    var lightState = rpio.read(11);
    for (var i = 0; i < 10; i++)
    {
        rpio.write(11, Number(!lightState));
        rpio.msleep(50);
        rpio.write(11, Number(lightState));
        rpio.msleep(50);
    }
}
