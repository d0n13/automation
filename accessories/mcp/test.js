const MCP23009 = require('./mcp23009');

<<<<<<< HEAD
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
  OLAT = 0x0A,
  HIGH = 1,
  LOW = 0,
  START = 7,
  PEDS = 6,
  STOP = 5;


=======
>>>>>>> a03b3a50a0604501d96251c1aede06f659034f46
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

<<<<<<< HEAD
const zeroPad = (num, places) => String(num).padStart(places, '0')

async function testMCP() {

  const OPEN = 0x00;
  const CLOSE = 0x01;

  // Create an instance of MCP23009
  const mcp = new MCP23009({address: 0x27, device: 1, debug: false});
  // mcp.configRegister(IOCON, 0b00010100);
  mcp.configRegister(IODIR, 0x1F);
  // mcp.configRegister(IPOL, 0b00000000);
  // mcp.configRegister(GPPU, 0b00000000);

  await sleep(100);
  
  mcp.pinWrite(STOP, LOW);
  mcp.pinWrite(PEDS, LOW);
  mcp.pinWrite(START, LOW);
  console.log('Setup');
  await sleep(2000);
  const delay = 400;

  // mcp.pinWrite(PEDS, HIGH);
  // mcp.byteRead(GPIO);
  // await sleep(delay);
  // mcp.pinWrite(PEDS, LOW);
  // mcp.byteRead(GPIO);

  // for (let i = 0; i < 5000; i++) {

  //   mcp.pinWrite(START, HIGH);
  //   mcp.byteRead(GPIO);
  //   await sleep(delay);
  //   mcp.pinWrite(START, LOW);
  //   mcp.byteRead(GPIO);
  //   await sleep(delay);
  //  }
}

testMCP();
=======
async function testPins() {

  const OPEN = 0x00;
  const CLOSE = 0x01;
  
  // Create an instance of MCP23009
  const mcp = new MCP23009({address: 0x27, device: 1, debug: false});

  // Test pinWrite method
  console.log('Testing pinWrite with HIGH value');
  mcp.pinWrite(0x07, mcp.HIGH);
  await sleep(300);
  console.log('Testing pinWrite with LOW value');
  mcp.pinWrite(0x07, mcp.LOW);

  for (var i = 0; i < 20; i++) {
    value = mcp.pinRead(OPEN);
    console.log('Open is: ', value);
    value = mcp.pinRead(CLOSE);
    console.log('Close is: ', value);
    await sleep(1000);
  }
}

testPins();
>>>>>>> a03b3a50a0604501d96251c1aede06f659034f46
