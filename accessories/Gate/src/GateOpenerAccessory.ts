import {
  AccessoryPlugin,
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  HAP,
  Logging,
  Service,
  CharacteristicEventTypes,
} from 'homebridge';

import {GateController} from './gateController';
import { manafacturer, version } from './settings';

export class GateOpenerAccessory implements AccessoryPlugin {

  name: string;

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

    this.monitorValue();

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

  private monitorValue() {

    setInterval(() => {

      enum GateState {
        OPEN = 1,
        CLOSED = 2,
        UNKNOWN
      }

      let state = this.gate.isOpen() ? GateState.OPEN : GateState.UNKNOWN;
      if (state === GateState.UNKNOWN) {
        state = this.gate.isClosed() ? GateState.CLOSED : GateState.UNKNOWN;
      }

      // Only log if the state has changed
      if (state === GateState.OPEN) {
        this.log.debug('Gate is open');
        this.currentState = this.hap.Characteristic.CurrentDoorState.OPEN;
      }

      if (state === GateState.CLOSED) {
        this.log.debug('Gate is closed');
        this.currentState = this.hap.Characteristic.CurrentDoorState.CLOSED;
      }

      if (state !== GateState.UNKNOWN) {
        this.gateService
          .getCharacteristic(this.hap.Characteristic.CurrentDoorState)
          .updateValue(this.currentState);

        this.getCurrentGateState(); // Update the current state
      }
    }, 1000); // Check every second
  }

  getCurrentGateState() {

    switch (this.currentState) {
      case this.hap.Characteristic.CurrentDoorState.OPEN:
        this.log.debug('Current state OPEN');
        break;
      case this.hap.Characteristic.CurrentDoorState.CLOSED:
        this.log.debug('Current state CLOSED');
        break;
      case this.hap.Characteristic.CurrentDoorState.OPENING:
        this.log.debug('Current state OPENING');
        break;
      case this.hap.Characteristic.CurrentDoorState.CLOSING:
        this.log.debug('Current state CLOSING');
        break;
      case this.hap.Characteristic.CurrentDoorState.STOPPED:
        this.log.debug('Current state STOPPED');
        break;
      default:
        break;
    }

    return this.currentState;
  }

  getTargetGateState() {

    return this.targetState ;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTargetGateState() {

    if (this.currentState === this.hap.Characteristic.CurrentDoorState.CLOSED) {

      this.log.info('Gate is Opening');
      this.currentState = this.hap.Characteristic.CurrentDoorState.OPENING;
      this.gate.start();

      this.gateService.getCharacteristic(this.hap.Characteristic.CurrentDoorState)
        .updateValue(this.currentState);

    } else if(this.currentState === this.hap.Characteristic.CurrentDoorState.OPEN) {

      this.log.info('Gate is Closing');

      this.currentState = this.hap.Characteristic.CurrentDoorState.CLOSING;
      this.gate.start();

      this.gateService.getCharacteristic(this.hap.Characteristic.CurrentDoorState)
        .updateValue(this.currentState);
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

// export class GatePedestrianAccessory implements AccessoryPlugin {

//   private readonly log: Logging;
//   private pedestrianOn = false;
//   private name: string;

//   private readonly switchService: Service;
//   private readonly informationService: Service;
//   private readonly gate: GateController;

//   constructor(hap: HAP, log: Logging, name: string) {

//     this.log = log;
//     this.name = name;
//     this.gate = new GateController(log);

//     this.switchService = new hap.Service.Switch(name);

//     this.switchService.getCharacteristic(hap.Characteristic.On)
//       .on(CharacteristicEventTypes.GET, (callback: CharacteristicGetCallback) => {

//         callback(undefined, this.pedestrianOn);
//       })
//       .on(CharacteristicEventTypes.SET, (value: CharacteristicValue, callback: CharacteristicSetCallback) => {

//         try {
//           this.pedestrianOn = true;
//           this.gate.pedestrian();

//           setTimeout(() => {
//             this.pedestrianOn = false;
//             this.switchService.getCharacteristic(hap.Characteristic.On)
//               .updateValue(this.pedestrianOn);
//           }, 6000);

//         } catch (error) {

//           log.error('rpio failed: ' + error);
//         }

//         callback();
//       });

//     this.informationService = new hap.Service.AccessoryInformation()
//       .setCharacteristic(hap.Characteristic.Manufacturer, manafacturer)
//       .setCharacteristic(hap.Characteristic.SerialNumber, '4f909710-8785-11ec-a437-473ed6a28ef8')
//       .setCharacteristic(hap.Characteristic.FirmwareRevision, version)
//       .setCharacteristic(hap.Characteristic.Model, name);
//   }

//   getServices(): Service[] {
//     return [
//       this.informationService,
//       this.switchService,
//     ];
//   }
// }

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