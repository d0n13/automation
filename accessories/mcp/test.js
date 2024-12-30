const MCP23009 = require('./mcp23009');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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