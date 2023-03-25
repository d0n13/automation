
// See https://developers.homebridge.io/#/service/GarageDoorOpener for door opener template for HomeBridge
// See https://github.com/jperkin/node-rpio for rpio library docs
//
// Written by Donie Kelly 2022

var rpio 	 = require('rpio');
var MCP23009 = require('mcp23009');

const MCP23009_ADDR = 0x27;
const START = 0x07;
const PEDS = 0x06;
const STOP = 0x05;
const GPIO_AUX_LIGHT = 29
const SLEEP_TIME = 200000

// Initialise the external lights (EXT)
rpio.open(GPIO_AUX_LIGHT, rpio.OUTPUT, rpio.LOW);

var mcp = new MCP23009({
    address: MCP23009_ADDR, //default: 0x20
    device: 1, // '/dev/i2c-1' on model B | '/dev/i2c-0' on model A
    debug: true //default: false
  });

  mcp.log("Configuring MCP23009 IO directions")
  mcp.configDirectionRegister(0b00000011)
  mcp.configPolarityRegister(0b00000011)

  mcp.pinWrite(START, mcp.HIGH)
  rpio.usleep(SLEEP_TIME)
  mcp.pinWrite(START, mcp.LOW)

  mcp.pinWrite(PEDS, mcp.HIGH)
  rpio.usleep(SLEEP_TIME)
  mcp.pinWrite(PEDS, mcp.LOW)

  mcp.pinWrite(STOP, mcp.HIGH)
  rpio.usleep(SLEEP_TIME)
  mcp.pinWrite(STOP, mcp.LOW)

  mcp.pinWrite(START, mcp.LOW)
  mcp.pinWrite(PEDS, mcp.LOW)
  mcp.pinWrite(STOP, mcp.LOW)

  for (let i = 0; i < 20; i++) { 
    // mcp.readGPIO()
    mcp.pinWrite(START, mcp.HIGH)
    rpio.usleep(SLEEP_TIME)
    mcp.pinWrite(START, mcp.LOW)
    rpio.usleep(SLEEP_TIME)
  }

  rpio.write(GPIO_AUX_LIGHT, rpio.HIGH);
  rpio.sleep(2)
  rpio.write(GPIO_AUX_LIGHT, rpio.LOW);