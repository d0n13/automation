//
// See https://ww1.microchip.com/downloads/en/DeviceDoc/20002121C.pdf for chip datasheet
//

var i2c = require('i2c-bus');

// List of mcp23009 registers
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
  OLAT = 0x0A;

// Used to zero pad binary represenations in logs
const zeroPad = (num, places) => String(num).padStart(places, '0')

var MCP23009 = (function () {

  MCP23009.prototype.HIGH = 1;
  MCP23009.prototype.LOW = 0;

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
  MCP23009.prototype.configDirectionRegister = function (value) {

    this.registerWrite(IODIR, value);
  }

  /**
   * Setup whether polarity is reversed or not. 
   * This register allows the user to configure the polarity on the corresponding GPIO port bits.
   * If a bit is set, the corresponding GPIO register bit will reflect the inverted value on the pin.
   * Value is passed as a byte ie: 0x03 or 0b00000011
   * 
   * @value Bitmask signifying whetehr to reverse polarity (1) or not (0)
   */
  MCP23009.prototype.configPolarityRegister = function (value) {

    this.registerWrite(IPOL, value);
  }

  /**
   * Write to a PIN
   * 
   * @pin  The PIN to write to from 0 to 7
   * @value Boolean HIGH or LOW
   */
  MCP23009.prototype.pinWrite = function (pin, value) {

    // Read the current GPIO state
    var gpio_state = this.registerRead(GPIO);
    if (value === this.HIGH) {

      gpio_state |= value << pin // Shift the 1 bit into place and OR with existing value
      
    } else {

      gpio_state &= ~(0x01 << pin) // invert a 1 and SHIFT into place and AND with existing
    }
    
    this.registerWrite(OLAT, gpio_state);
  }

  /**
   * Write to a PIN
   * 
   * @pin  The PIN to write to from 0 to 7
   * @value Boolean HIGH or LOW
   */
  MCP23009.prototype.pinRead = function (pin) {

    // Read the current GPIO state
    var gpio_state = this.registerRead(GPIO);
    return (gpio_state & (1 << pin)) !== 0;
  }

  /**
   * Read from any of the registers; namely, 
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
   * @register The specified register to read from
   */
  MCP23009.prototype.registerRead = function (register) {

    var buf = Buffer.alloc(1);
    this.wire.readI2cBlockSync(this.address, register, 1, buf);
    var binary = buf[0].toString(2)
    this.log(_stringForRegister(register) + " READ : " + zeroPad(binary, 8));
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

    var buf = Buffer.from([0x00]);

    this.wire.readI2cBlockSync(this.address, register, 1, buf);
    var binary = buf[0].toString(2)
    this.log(_stringForRegister(register) + " BEFORE  : " + zeroPad(binary, 8));
    
    buf = Buffer.from([value]);
    this.wire.writeI2cBlockSync(this.address, register, buf.length, buf);
    binary = value.toString(2)
    this.log(_stringForRegister(register) + " WRITE   : " + zeroPad(binary, 8));

    this.wire.readI2cBlockSync(this.address, register, 1, buf);
    binary = binary = buf[0].toString(2)
    this.log(_stringForRegister(register) + " CONFIRM : " + zeroPad(binary, 8));
  }

  /**
   * Log a message to the console if debugging is enabled
   * @msg The string to write
   */
  MCP23009.prototype.log = function (msg) {
    if (this.debug) {
      console.log(msg);
    }
  };

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