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

import {DrivewayController} from './drivewayLightsController';
import { manafacturer, version } from './settings';

export class DrivewayLightsAccessory implements AccessoryPlugin {

  private readonly log: Logging;
  private switchOn = false;
  private name: string;

  private readonly switchService: Service;
  private readonly informationService: Service;
  private readonly driveway: DrivewayController;

  constructor(hap: HAP, log: Logging, name: string) {

    this.log = log;
    this.name = name;
    this.driveway = new DrivewayController(log);

    this.switchService = new hap.Service.Lightbulb(name);

    // Implement charastics
    this.switchService.getCharacteristic(hap.Characteristic.On)

      .on(CharacteristicEventTypes.GET, (callback: CharacteristicGetCallback) => {

        callback(undefined, this.switchOn);
      })
      .on(CharacteristicEventTypes.SET, (value: CharacteristicValue, callback: CharacteristicSetCallback) => {

        try {

          this.switchOn = !this.switchOn;
          this.driveway.drivewayLights(this.switchOn);

        } catch (error) {

          log.error('Driveway Exception: ' + error);
        }

        callback();
      });

    // Set accessory information
    this.informationService = new hap.Service.AccessoryInformation()
      .setCharacteristic(hap.Characteristic.Manufacturer, manafacturer)
      .setCharacteristic(hap.Characteristic.SerialNumber, '45cd9bba-8785-11ec-a3c5-9f1c143a0b96')
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