import { groupCollapsed } from 'console';
import {
  AccessoryPlugin,
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  HAP,
  Logging,
  Service,
  CharacteristicEventTypes,
  Characteristic,
} from 'homebridge';
import {GateController} from './gateController';

export class GateOpenerAccessory implements AccessoryPlugin {

  name: string;

  private gateState;
  private targetGateState;

  private readonly log: Logging;
  private readonly hap: HAP;
  private readonly gateService: Service;
  private readonly informationService: Service;
  private readonly gate: GateController;

  constructor(hap: HAP, log: Logging, name: string) {

    this.hap = hap;
    this.log = log;
    this.name = name;
    this.gate = new GateController(log);
    this.gateService = new hap.Service.GarageDoorOpener(name);
    this.gateState = hap.Characteristic.CurrentDoorState.CLOSED;
    this.targetGateState = hap.Characteristic.TargetDoorState.CLOSED;

    // create handlers for required characteristics
    this.gateService.getCharacteristic(hap.Characteristic.CurrentDoorState)
      .onGet(this.handleCurrentDoorStateGet.bind(this));

    this.gateService.getCharacteristic(hap.Characteristic.TargetDoorState)
      .onGet(this.handleTargetDoorStateGet.bind(this))
      .onSet(this.handleTargetDoorStateSet.bind(this));

    this.gateService.getCharacteristic(hap.Characteristic.ObstructionDetected)
      .onGet(this.handleObstructionDetectedGet.bind(this));

    this.informationService = new hap.Service.AccessoryInformation()
      .setCharacteristic(hap.Characteristic.Manufacturer, 'One Touch 2022')
      .setCharacteristic(hap.Characteristic.SerialNumber, '3771fca0-8785-11ec-9a36-771ed0c01cd3')
      .setCharacteristic(hap.Characteristic.FirmwareRevision, '2022.1.2')
      .setCharacteristic(hap.Characteristic.Model, name);
  }

  handleCurrentDoorStateGet() {
    // static readonly OPEN = 0;
    // static readonly CLOSED = 1;
    // static readonly OPENING = 2;
    // static readonly CLOSING = 3;
    // static readonly STOPPED = 4;

    // Handle reading the gate controller to determine the current state
    if (this.hap.Characteristic.TargetDoorState.CLOSED) {

      this.gate.isClosed() ? this.gateState = this.hap.Characteristic.CurrentDoorState.CLOSED :
        this.gateState = this.hap.Characteristic.CurrentDoorState.CLOSING;
    } else {

      this.gate.isOpen() ? this.gateState = this.hap.Characteristic.CurrentDoorState.OPEN :
        this.gateState = this.hap.Characteristic.CurrentDoorState.OPENING;
    }

    return this.gateState;
  }

  handleTargetDoorStateGet() {
    // static readonly OPEN = 0;
    // static readonly CLOSED = 1;
    const gateState = this.targetGateState ? 'CLOSED' : 'OPEN';
    this.log.info(this.name + ' target state: ' + gateState);
    return this.targetGateState ;
  }

  handleTargetDoorStateSet(value) {

    if(value === this.hap.Characteristic.TargetDoorState.OPEN) {

      this.log.info(this.name + ': Opening');

    } else {

      this.log.info(this.name + ': Closing');
    }

    // this.log.info(this.name + ': ' + (this.targetGateState == ? 'ON' : 'OFF'));
    this.gate.start();
  }

  handleObstructionDetectedGet() {

    this.log.info(this.name + ' obstruction check request');
    return false;
  }

  /*
       * This method is called directly after creation of this instance.
       * It should return all services which should be added to the accessory.
       */
  getServices(): Service[] {
    return [
      this.informationService,
      this.gateService,
    ];
  }
}

export class GateHoldAccessory implements AccessoryPlugin {

  private readonly log: Logging;
  private switchOn = false;
  private name: string;

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

        log.info(name + ' ' + (this.switchOn? 'ON': 'OFF'));
        callback(undefined, this.switchOn);
      })
      .on(CharacteristicEventTypes.SET, (value: CharacteristicValue, callback: CharacteristicSetCallback) => {

        try {

          this.switchOn = !this.switchOn;
          this.gate.hold(this.switchOn ? true : false);

        } catch (error) {

          log.info('rpio failed: ' + error);
        }

        callback();
      });

    this.informationService = new hap.Service.AccessoryInformation()
      .setCharacteristic(hap.Characteristic.Manufacturer, 'One Touch 2022')
      .setCharacteristic(hap.Characteristic.SerialNumber, '4f909710-8785-11ec-a437-473ed6a28ef8')
      .setCharacteristic(hap.Characteristic.FirmwareRevision, '2022.1.2')
      .setCharacteristic(hap.Characteristic.Model, name);

    log.info('\'%s\' switch created!', name);
  }

  /*
       * This method is called directly after creation of this instance.
       * It should return all services which should be added to the accessory.
       */
  getServices(): Service[] {
    return [
      this.informationService,
      this.switchService,
    ];
  }
}

export class GatePedestrianAccessory implements AccessoryPlugin {

  private readonly log: Logging;
  private switchOn = false;
  private name: string;

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

        log.info(name + ' ' + (this.switchOn? 'ON': 'OFF'));
        callback(undefined, this.switchOn);
      })
      .on(CharacteristicEventTypes.SET, (value: CharacteristicValue, callback: CharacteristicSetCallback) => {

        try {
          this.switchOn = !this.switchOn;
          this.gate.pedestrian(this.switchOn ? true : false);

        } catch (error) {

          log.info('rpio failed: ' + error);
        }

        callback();
      });

    this.informationService = new hap.Service.AccessoryInformation()
      .setCharacteristic(hap.Characteristic.Manufacturer, 'One Touch 2022')
      .setCharacteristic(hap.Characteristic.SerialNumber, '4f909710-8785-11ec-a437-473ed6a28ef8')
      .setCharacteristic(hap.Characteristic.FirmwareRevision, '2022.1.2')
      .setCharacteristic(hap.Characteristic.Model, name);

    log.info('\'%s\' switch created!', name);
  }

  /*
       * This method is called directly after creation of this instance.
       * It should return all services which should be added to the accessory.
       */
  getServices(): Service[] {
    return [
      this.informationService,
      this.switchService,
    ];
  }
}