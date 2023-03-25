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

    this.log.info(this.name + ' status: ' + this.gateState);

    return this.gateState;
  }

  handleTargetDoorStateGet() {
    // static readonly OPEN = 0;
    // static readonly CLOSED = 1;

    this.log.info(this.name + ' target state: ' + this.targetGateState);
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