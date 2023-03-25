var rpio 	  = require('rpio');
var Service, Characteristic;

// These are physical pin numbers
PIN = {
    Light  : 15, // Relay 1
    pin2   : 19  // Relay 2 - not used
}

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-garage", "PiLight", LedAccessory);
}

function LedAccessory(log, config) {

    this.log = log;
    this.config = config;
    this.name = config["name"];

    rpio.open(PIN.Light, rpio.OUTPUT, rpio.LOW);
    console.log("Configuring Light");

    this.service = new Service.Lightbulb(this.name);
    this.service
        .getCharacteristic(Characteristic.On)
        .on('get', this.getOn.bind(this))
        .on('set', this.setOn.bind(this));

    this.infoService = new Service.AccessoryInformation();
    this.infoService
    .setCharacteristic(Characteristic.Manufacturer, "onetouch.ie")
    .setCharacteristic(Characteristic.Model, "Main Garage Light")
    .setCharacteristic(Characteristic.SerialNumber, "2.00.000");
}

LedAccessory.prototype.getOn = function(callback) {

    console.log("Reading Light State");
    var state = rpio.read(PIN.Light);
    var status = state == 0 ? true : false;
    callback(null, status);
}

LedAccessory.prototype.setOn = function(on, callback) {

    rpio.write(PIN.Light, Number(on));
    callback(null, on);
}

LedAccessory.prototype.getServices = function() {
    return [this.infoService, this.service];
}
