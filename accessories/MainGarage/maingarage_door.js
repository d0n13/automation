var rpio    = require("rpio");
var Service, Characteristic;

// These are wiringPi ping numbers
PIN = {
    Open  : 11,
    Close : 13,
}

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    
    homebridge.registerAccessory("homebridge-MainGarage", "MainGarage", MainGarageAccessory);
}

var currentDoorState = 1; // closed
var targetDoorState = 1; // closed

function MainGarageAccessory(log, config) {
    this.log = log;
    this.config = config;
    this.name = config["name"];

    rpio.open(PIN.Open, rpio.OUTPUT, rpio.LOW);
    rpio.open(PIN.Close, rpio.OUTPUT, rpio.LOW);
    console.log("Configuring Opener outputs");
    
    this.service = new Service.GarageDoorOpener(this.name);
    this.service
        .getCharacteristic(Characteristic.CurrentDoorState)
        .on('get', this.getCurrentDoorState.bind(this));
    this.service
        .getCharacteristic(Characteristic.TargetDoorState)
        .on('get', this.getTargetDoorState.bind(this))
        .on('set', this.setTargetDoorState.bind(this));
    this.service
        .getCharacteristic(Characteristic.ObstructionDetected)
        .on('get', this.getObstructionDetected.bind(this));
    
    this.infoService = new Service.AccessoryInformation();
    this.infoService
    .setCharacteristic(Characteristic.Manufacturer, "onetouch.ie")
    .setCharacteristic(Characteristic.Model, "Main Garage")
    .setCharacteristic(Characteristic.SerialNumber, "1.00.000");
}

MainGarageAccessory.prototype.getCurrentDoorState = function(callback) {
    
    console.log("Get current state");
    callback(null, currentDoorState);
}

MainGarageAccessory.prototype.getTargetDoorState = function(callback) {
    
    console.log("Get target state");
    callback(null, targetDoorState); // OPEN=0, CLOSED=1
}

MainGarageAccessory.prototype.setTargetDoorState = function(targetState, callback) {
    
    if(targetState == Characteristic.TargetDoorState.OPEN) {
        console.log("Opening");
        targetDoorState = targetState;
        rpio.write(PIN.Open, rpio.HIGH);
        rpio.msleep(500);
        rpio.write(PIN.Open, rpio.LOW);
        
        currentDoorState = 2;
        Characteristic.CurrentDoorState = currentDoorState;
        
        setTimeout(function() {
                   console.log("Open");
                   
                   currentDoorState = 0; // Open
                   Characteristic.CurrentDoorState = currentDoorState;
                   
                   }, 8000);
    }
    else if(targetState == Characteristic.TargetDoorState.CLOSED) {
        
        console.log("Closing");
        targetDoorState = targetState;
        rpio.write(PIN.Close, rpio.HIGH);
        rpio.msleep(500);
        rpio.write(PIN.Close, rpio.LOW);
        
        currentDoorState = 3;
        Characteristic.CurrentDoorState = currentDoorState; // Closing
        
        setTimeout(function() {
                   console.log("Closed");
                   
                   currentDoorState = 1; // Closed
                   Characteristic.CurrentDoorState = currentDoorState;
                   
                   }, 8000);
    }
    callback(null, targetState); // OPEN=0, CLOSED=1
}

MainGarageAccessory.prototype.getObstructionDetected = function(callback) {
    
   callback(null, Characteristic.ObstructionDetected.NO); // 0=NO, 1=YES
}

MainGarageAccessory.prototype.getServices = function() {
    return [this.infoService, this.service];
}
