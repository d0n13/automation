import {Logging} from 'homebridge';
import mcp23009 from 'mcp23009';
import rpio from 'rpio';
import { runInThisContext } from 'vm';

const GPIO_GATE_LIGHTS = 11;
const GPIO_AUX_LIGHT = 29;
const MCP23009_ADDR = 0x27;
const IODIR = 0x00;
const START = 7;
const PEDS = 6;
const HOLD = 5;
const OPEN = 0x00;
const CLOSED = 0x01;
const SLEEP_TIME = 500000; // microseconds
const HIGH = 1;
const LOW = 0;

export class GateController {

  private readonly name ='Gate Controller';
  private readonly log: Logging;
  private readonly mcp: mcp23009;

  /**
   * Constructor
   * @param log homekit logging service
   */
  constructor(log: Logging) {
    this.log = log;
    this.mcp = new mcp23009({address: MCP23009_ADDR, device: 1, debug: false});

    // Initialise the gate and external lights (EXT)
    rpio.open(GPIO_GATE_LIGHTS, rpio.OUTPUT, LOW);
    rpio.open(GPIO_AUX_LIGHT, rpio.OUTPUT, LOW);

    this.log.info(this.name + ': Configuring MCP23009 IO directions');
    this.mcp.configRegister(IODIR, 0x1F);     // 0b00011111 - 5 inputs, 3 outputs

    this.mcp.pinWrite(START, LOW);
    this.mcp.pinWrite(PEDS, LOW);
    this.mcp.pinWrite(HOLD, HIGH);   // Hold is active low

    this.log.info(this.name + ': SEA controller initialised');
  }

  start(): void {

    this.log.info(this.name + ': Start Pulse');
    this.mcp.pinWrite(START, HIGH);
    rpio.usleep(SLEEP_TIME);
    this.mcp.pinWrite(START, LOW);
  }

  hold(onoff: boolean): void {

    // Logic is reversed as STOP state is active LOW - ie: STOP on CN1 is normally tied to ground
    const action = onoff? LOW: HIGH;
    const actionText = onoff? 'Holding': 'Normal';
    this.log.info(this.name + ' ' + actionText);
    this.mcp.pinWrite(HOLD, action);

    // Start the gate when hold is released but only if open
    setTimeout(() => {
      if (onoff === false) {
        if (!this.isClosed()) {
          this.start();
        }
      }
    }, 1000);
  }

  pedestrian(): void {

    this.log.info(this.name + ' Pedertrian');
    this.mcp.pinWrite(PEDS, HIGH);
    rpio.usleep(SLEEP_TIME);
    this.mcp.pinWrite(PEDS, LOW);
  }

  gatePostLights(onoff: boolean): void {

    rpio.write(GPIO_GATE_LIGHTS, onoff ? HIGH : LOW);
    const actionText = onoff ? 'Post Lights ON' : 'Post Lights OFF';
    this.log.info(this.name + ' ' + actionText);
  }

  auxiliaryLights(onoff: boolean): void {

    rpio.write(GPIO_AUX_LIGHT, onoff ? HIGH : LOW);
    const actionText = onoff ? 'Auxilary Lights ON' : 'Auxilary Lights OFF';
    this.log.info(this.name + ' ' + actionText);
  }

  isOpen(): boolean {

    return this.mcp.pinRead(OPEN);
  }

  isClosed(): boolean {

    return this.mcp.pinRead(CLOSED);
  }
}