import {Logging} from 'homebridge';
import mcp23009 from 'mcp23009';
import rpio from 'rpio';

const GPIO_GATE_LIGHTS = 11;
const GPIO_AUX_LIGHT = 29;
const MCP23009_ADDR = 0x27;
const START = 0x07;
const PEDS = 0x06;
const STOP = 0x05;
const SLEEP_TIME = 200000;

export class GateController {

  private readonly name ='Gate MCP';
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
    this.mcp.pinWrite(STOP, this.mcp.LOW);
    this.mcp.pinWrite(PEDS, this.mcp.LOW);

    this.log.info(this.name + ': SEA controller initialised');
  }

  start(): void {

    this.log.debug(this.name + ': Opening');
    this.mcp.pinWrite(START, this.mcp.HIGH);
    rpio.usleep(SLEEP_TIME);
    this.mcp.pinWrite(START, this.mcp.LOW);
  }

  stop(): void {

    this.log.debug(this.name + ': Stopping');
    this.mcp.pinWrite(STOP, this.mcp.HIGH);
    rpio.usleep(SLEEP_TIME);
    this.mcp.pinWrite(STOP, this.mcp.LOW);
  }

  pedestrian(): void {

    this.log.debug(this.name + ': Pedestrian opening');
    this.mcp.pinWrite(PEDS, this.mcp.HIGH);
    rpio.usleep(SLEEP_TIME);
    this.mcp.pinWrite(PEDS, this.mcp.LOW);
  }

  gatePostLights(onoff: boolean): void {

    rpio.write(GPIO_GATE_LIGHTS, onoff ? rpio.HIGH : rpio.LOW);
  }

  auxiliaryLights(onoff: boolean): void {

    rpio.write(GPIO_AUX_LIGHT, onoff ? rpio.HIGH : rpio.LOW);
  }
}