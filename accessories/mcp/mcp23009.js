//
// See https://ww1.microchip.com/downloads/en/DeviceDoc/20002121C.pdf for chip datasheet
//

var i2c = require('i2c-bus');

//  // List of mcp23009 registers
var
  IODIR = 0x00,
  IPOL = 0x01,
  GPINTEN = 0x02,
  DEFVAL = 0x03,
  INTCON = 0x04,
  IOCON = 0x05,
  GPPU = 0x06,
  INTF = 0x07,
  INTCAP = 0x08,
  GPIO = 0x09,
  OLAT = 0x0A,
  HIGH = 1,
  LOW = 0;
    
// Used to zero pad binary represenations in logs
const zeroPad = (num, places) => String(num).padStart(places, '0')

var MCP23009 = (function () {
  
  /**
   * Init wit a config
   * 
   * @config Override optional values in config
   */
  function MCP23009(config) {
    this.address = config.address;
    this.debug = config.debug === true ? true : false;
    this.device = config.device !== null ? config.device : 1;
    this.wire = i2c.openSync(this.device);
  }

  /**
   * Setup whether pins input or outputs (1 = input, 0 = output)
   * 
   * @value Bitmask to signify input or outout
   */
  // MCP23009.prototype.configDirectionRegister = function (value) {

  //   this.registerWrite(IODIR, value);
  // }

  MCP23009.prototype.configRegister = function(register, value) {

    this.registerWrite(register, value);
  }

  /**
   * Write to a PIN
   * 
   * @pin  The PIN to write to from 0 to 7
   * @value Boolean HIGH or LOW
   */
  MCP23009.prototype.pinWrite = function(bitPosition, bitValue) {

    if (bitPosition < 0 || bitPosition > 7) {
      throw new Error("Position must be between 0 and 7");
    }

    // Read the current byte value from the MCP output register
    let byteValue = this.registerRead(GPIO); 

    // Set or clear the bit at the specified position
    if (bitValue) {
      byteValue |= (1 << bitPosition); // Set the bit to 1
    } else {
      byteValue &= ~(1 << bitPosition); // Clear the bit to 0
    }

    // Write the new byte value back to the MCP output register
    // console.log("GPIO STATE: " + zeroPad(byteValue.toString(2), 8));
    this.registerWrite(OLAT, byteValue);
  }

  MCP23009.prototype.byteWrite = function(value) {
    
    this.registerWrite(OLAT, value);

    var gpio_state = this.registerRead(GPIO);
    // console.log("GPIO STATE: " + zeroPad(gpio_state.toString(2), 8));
  }

  MCP23009.prototype.byteRead = function() {

    // Read the current GPIO state
    var gpio_state = this.registerRead(GPIO);
    // console.log("GPIO STATE: " + zeroPad(gpio_state.toString(2), 8));
    return gpio_state;
  }

  /**
   * Write to a PIN
   * 
   * @pin  The PIN to write to from 0 to 7
   * @value Boolean HIGH or LOW
   */
  MCP23009.prototype.pinRead= function (pin) {

    // Read the current GPIO state
    var gpio_state = this.registerRead(GPIO);
    // console.log("GPIO STATE: " + zeroPad(gpio_state.toString(2), 8));
    return (gpio_state & (1 << pin)) !== 0;
  }

  /**
   * @register The specified register to read from
   */
  MCP23009.prototype.registerRead = function (register) {

    var buf = Buffer.alloc(1);
    this.wire.readI2cBlockSync(this.address, register, 1, buf);
    var binary = buf[0].toString(2)
    // console.log(_stringForRegister(register) + " READ : " + zeroPad(binary, 8));
    return buf[0];
  }

  /**
   * Write to any of the registers; namely, 
   * IODIR = 0x00
   * IPOL = 0x01
   * GPINTEN = 0x02
   * DEFVAL = 0x03
   * INTCON = 0x04
   * IOCON = 0x05
   * GPPU = 0x06
   * INTF = 0x07
   * INTCAP = 0x08
   * GPIO = 0x09
   * OLAT = 0x0A
   * 
   * @register The specified register to write to
   * @value The byte to write
   */
  MCP23009.prototype.registerWrite = function (register, value) {

    var buf = Buffer.alloc(1);

    // this.wire.readI2cBlockSync(this.address, register, 1, buf);
    // console.log(_stringForRegister(register) + " BEFORE  : " + zeroPad(buf[0].toString(2), 8));
    
    buf[0] = value;
    this.wire.writeI2cBlockSync(this.address, register, buf.length, buf);
    // console.log(_stringForRegister(register) + " WRITE   : " + zeroPad(buf[0].toString(2), 8));

    // this.wire.readI2cBlockSync(this.address, register, 1, buf);
    // console.log(_stringForRegister(register) + " CONFIRM : " + zeroPad(buf[0].toString(2), 8))
  }

  /**
   * Map name string to register address for logging
   * 
   * @register Return string name of passed register
   */
  _stringForRegister = function (register) {

    switch (register) {
      case IODIR:
        return "IODIR";
        break;
      case IPOL:
        return "IPOL";
        break;
      case GPINTEN:
        return "GPINTEN";
        break;
      case DEFVAL:
        return "DEFVAL";
        break;
      case INTCON:
        return "INTCON";
        break;
      case GPPU:
        return "GPPU";
        break;
      case IOCON:
        return "IOCON";
        break;
      case INTF:
        return "INTF";
        break;
      case INTCAP:
        return "INTCAP";
        break;
      case GPIO:
        return "GPIO";
        break;
      case OLAT:
        return "OLAT";
        break;
    }
  }

  return MCP23009;

})();

module.exports = MCP23009;