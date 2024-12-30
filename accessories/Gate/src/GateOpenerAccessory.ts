import {
  AccessoryPlugin,
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  HAP,
  Logging,
  Service,
  CharacteristicEventTypes,
  HAPServer,
} from 'homebridge';

import {GateController} from './gateController';
import { manafacturer, version } from './settings';

export class GateOpenerAccessory implements AccessoryPlugin {

  name: string;

  // var currentDoorState = 1; // closed
  // var targetDoorState = 1; // closed

  private readonly log: Logging;
  private readonly hap: HAP;
  private readonly gateService: Service;
  private readonly informationService: Service;
  private readonly gate: GateController;

  private currentState;
  private targetState;

  constructor(hap: HAP, log: Logging, name: string) {

    this.hap = hap;
    this.log = log;
    this.name = name;
    this.gate = new GateController(log);
    this.gateService = new hap.Service.GarageDoorOpener(name);
    this.currentState = hap.Characteristic.CurrentDoorState.CLOSED;
    this.targetState = hap.Characteristic.TargetDoorState.CLOSED;

    // create handlers for required characteristics
    this.gateService.getCharacteristic(hap.Characteristic.CurrentDoorState)
      .onGet(this.getCurrentGateState.bind(this));

    this.gateService.getCharacteristic(hap.Characteristic.TargetDoorState)
      .onGet(this.getTargetGateState.bind(this))
      .onSet(this.setTargetGateState.bind(this));

    this.gateService.getCharacteristic(hap.Characteristic.ObstructionDetected)
      .onGet(this.handleObstructionDetectedGet.bind(this));

    this.informationService = new hap.Service.AccessoryInformation()
      .setCharacteristic(hap.Characteristic.Manufacturer, manafacturer)
      .setCharacteristic(hap.Characteristic.SerialNumber, '3771fca0-8785-11ec-9a36-771ed0c01cd3')
      .setCharacteristic(hap.Characteristic.FirmwareRevision, version)
      .setCharacteristic(hap.Characteristic.Model, name);
  }

  getCurrentGateState() {

    switch (this.currentState) {
      case this.hap.Characteristic.CurrentDoorState.OPEN:
        this.log.debug('Reading current state OPEN');
        break;
      case this.hap.Characteristic.CurrentDoorState.CLOSED:
        this.log.debug('Reading current state CLOSED');
        break;
      case this.hap.Characteristic.CurrentDoorState.OPENING:
        this.log.debug('Reading current state OPENING');
        break;
      case this.hap.Characteristic.CurrentDoorState.CLOSING:
        this.log.debug('Reading current state CLOSING');
        break;
      case this.hap.Characteristic.CurrentDoorState.STOPPED:
        this.log.debug('Reading current state STOPPED');
        break;
      default:
        break;
    }

    return this.currentState;
  }

  getTargetGateState() {

    switch (this.targetState) {
      case this.hap.Characteristic.TargetDoorState.OPEN:
        this.log.debug('Reading target state OPEN');
        break;
      case this.hap.Characteristic.TargetDoorState.CLOSED:
        this.log.debug('Reading target state CLOSED');
        break;
    }
    return this.targetState ;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTargetGateState(targetState) {

    if(this.targetState === this.hap.Characteristic.TargetDoorState.OPEN) {
      this.log.info('Opening');
      this.targetState = targetState;
      this.currentState = this.hap.Characteristic.CurrentDoorState.OPENING;
      this.gate.start();

      this.gateService
        .getCharacteristic(this.hap.Characteristic.CurrentDoorState)
        .updateValue(this.currentState);

      setTimeout(() => {
        this.log.debug('Open');

        this.currentState = this.hap.Characteristic.CurrentDoorState.OPEN;
        this.gateService
          .getCharacteristic(this.hap.Characteristic.CurrentDoorState)
          .updateValue(this.currentState);

      }, 3000);

    } else if(targetState === this.hap.Characteristic.TargetDoorState.CLOSED) {

      this.log.info('Closing');
      this.targetState = targetState;
      this.currentState = this.hap.Characteristic.CurrentDoorState.CLOSING;
      this.gate.start();

      this.gateService.getCharacteristic(this.hap.Characteristic.CurrentDoorState)
        .updateValue(this.currentState);

      setTimeout(() => {
        this.log.debug('Closed');

        this.currentState = this.hap.Characteristic.CurrentDoorState.CLOSED;
        this.gateService
          .getCharacteristic(this.hap.Characteristic.CurrentDoorState)
          .updateValue(this.currentState);

      }, 3000);
    }
  }

  handleObstructionDetectedGet() {

    return false;
  }

  getServices(): Service[] {
    return [
      this.informationService,
      this.gateService,
    ];
  }
}

export class GateHoldAccessory implements AccessoryPlugin {

  private readonly log: Logging;
  private holdSwitch = false;
  private name: string;

  private readonly switchService: Service;
  private readonly informationService: Service;
  private readonly gate: GateController;

  constructor(hap: HAP, log: Logging, name: string) {

    this.log = log;
    this.name = name;
    this.gate = new GateController(log);

    this.switchService = new hap.Service.Switch(name);

    this.switchService.getCharacteristic(hap.Characteristic.On)
      .on(CharacteristicEventTypes.GET, (callback: CharacteristicGetCallback) => {

        this.log.debug('Gate hold is ' + this.holdSwitch? 'OFF': 'ON');
        callback(undefined, this.holdSwitch);
      })
      .on(CharacteristicEventTypes.SET, (value: CharacteristicValue, callback: CharacteristicSetCallback) => {

        try {

          this.holdSwitch = !this.holdSwitch;
          this.log.debug('Setting Gate hold to ' + this.holdSwitch? 'ON': 'OFF');
          this.gate.hold(this.holdSwitch);

        } catch (error) {

          log.error('rpio failed: ' + error);
        }

        callback();
      });

    this.informationService = new hap.Service.AccessoryInformation()
      .setCharacteristic(hap.Characteristic.Manufacturer, manafacturer)
      .setCharacteristic(hap.Characteristic.SerialNumber, '4f909710-8785-11ec-a437-473ed6a28ef8')
      .setCharacteristic(hap.Characteristic.FirmwareRevision, version)
      .setCharacteristic(hap.Characteristic.Model, name);
  }

  getServices(): Service[] {
    return [
      this.informationService,
      this.switchService,
    ];
  }
}

export class GatePedestrianAccessory implements AccessoryPlugin {

  private readonly log: Logging;
  private pedestrianOn = false;
  private name: string;

  private readonly switchService: Service;
  private readonly informationService: Service;
  private readonly gate: GateController;

  constructor(hap: HAP, log: Logging, name: string) {

    this.log = log;
    this.name = name;
    this.gate = new GateController(log);

    this.switchService = new hap.Service.Switch(name);

    this.switchService.getCharacteristic(hap.Characteristic.On)
      .on(CharacteristicEventTypes.GET, (callback: CharacteristicGetCallback) => {

        callback(undefined, this.pedestrianOn);
      })
      .on(CharacteristicEventTypes.SET, (value: CharacteristicValue, callback: CharacteristicSetCallback) => {

        try {
          this.pedestrianOn = true;
          this.gate.pedestrian();

          setTimeout(() => {
            this.pedestrianOn = false;
            this.switchService.getCharacteristic(hap.Characteristic.On)
              .updateValue(this.pedestrianOn);
          }, 6000);

        } catch (error) {

          log.error('rpio failed: ' + error);
        }

        callback();
      });

    this.informationService = new hap.Service.AccessoryInformation()
      .setCharacteristic(hap.Characteristic.Manufacturer, manafacturer)
      .setCharacteristic(hap.Characteristic.SerialNumber, '4f909710-8785-11ec-a437-473ed6a28ef8')
      .setCharacteristic(hap.Characteristic.FirmwareRevision, version)
      .setCharacteristic(hap.Characteristic.Model, name);
  }

  getServices(): Service[] {
    return [
      this.informationService,
      this.switchService,
    ];
  }
}

export class GateLightAccessory implements AccessoryPlugin {

  private readonly log: Logging;
  private switchOn = false;
  name: string;

  private readonly switchService: Service;
  private readonly informationService: Service;
  private readonly gate: GateController;

  constructor(hap: HAP, log: Logging, name: string) {

    this.log = log;
    this.name = name;
    this.gate = new GateController(log);

    this.switchService = new hap.Service.Lightbulb(name);

    this.switchService.getCharacteristic(hap.Characteristic.On)
      .on(CharacteristicEventTypes.GET, (callback: CharacteristicGetCallback) => {

        callback(undefined, this.switchOn);
      })
      .on(CharacteristicEventTypes.SET, (value: CharacteristicValue, callback: CharacteristicSetCallback) => {

        try {

          this.switchOn = !this.switchOn;
          this.gate.gatePostLights(this.switchOn ? true : false);

        } catch (error) {

          log.error('rpio failed: ' + error);
        }

        callback();
      });

    this.informationService = new hap.Service.AccessoryInformation()
      .setCharacteristic(hap.Characteristic.Manufacturer, manafacturer)
      .setCharacteristic(hap.Characteristic.SerialNumber, '3c12f5e2-83c6-11ec-9a02-4b0f2f5da8e6')
      .setCharacteristic(hap.Characteristic.FirmwareRevision, version)
      .setCharacteristic(hap.Characteristic.Model, name);
  }

  getServices(): Service[] {
    return [
      this.informationService,
      this.switchService,
    ];
  }
}