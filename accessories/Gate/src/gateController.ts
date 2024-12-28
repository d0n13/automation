import {Logging} from 'homebridge';
import mcp23009 from 'mcp23009';
import rpio from 'rpio';

const GPIO_GATE_LIGHTS = 11;
const GPIO_AUX_LIGHT = 29;
const MCP23009_ADDR = 0x27;
const START = 0x07;
const PEDS = 0x06;
const HOLD = 0x05;
const OPEN = 0x01;
const CLOSE = 0x02;
const SLEEP_TIME = 200000; // microseconds

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
    rpio.open(GPIO_GATE_LIGHTS, rpio.OUTPUT, rpio.LOW);
    rpio.open(GPIO_AUX_LIGHT, rpio.OUTPUT, rpio.LOW);

    this.log.debug(this.name + ': Configuring MCP23009 IO directions');
    this.mcp.configDirectionRegister(0b00000011);
    this.mcp.configPolarityRegister(0b00000011);

    this.mcp.pinWrite(START, this.mcp.LOW);
    this.mcp.pinWrite(HOLD, this.mcp.LOW);
    this.mcp.pinWrite(PEDS, this.mcp.LOW);

    this.log.info(this.name + ': SEA controller initialised');
  }

  start(): void {

    this.log.debug(this.name + ': Opening');
    this.mcp.pinWrite(START, this.mcp.HIGH);
    rpio.usleep(SLEEP_TIME);
    this.mcp.pinWrite(START, this.mcp.LOW);
  }

  hold(onoff: boolean): void {

    const action = onoff? this.mcp.HIGH : this.mcp.LOW;
    const actionText = onoff? 'Holding': 'Releasing';
    this.log.debug(this.name + ' ' + actionText);
    this.mcp.pinWrite(HOLD, action);
  }

  pedestrian(onoff: boolean): void {

    const action = onoff? this.mcp.HIGH : this.mcp.LOW;
    const actionText = onoff? 'Pedestrian Hold': 'Releasing Pedestrian Hold';
    this.log.debug(this.name + ' ' + actionText);
    this.mcp.pinWrite(PEDS, action);
  }

  gatePostLights(onoff: boolean): void {

    rpio.write(GPIO_GATE_LIGHTS, onoff ? rpio.HIGH : rpio.LOW);
  }

  auxiliaryLights(onoff: boolean): void {

    rpio.write(GPIO_AUX_LIGHT, onoff ? rpio.HIGH : rpio.LOW);
  }

  isOpen(): boolean {
    // const state = this.mcp.pinRead(OPEN);
    // const stateText = state ? 'gate open' : 'position unknown';
    // this.log.debug(this.name + ' detected ' + stateText);
    // return state;
    return true;
  }

  isClosed(): boolean {
    // const state = this.mcp.pinRead(CLOSE);
    // const stateText = state ? 'gate closed' : 'position unknown';
    // this.log.debug(this.name + ' detected ' + stateText);
    // return state;
    return true;
  }
}