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

export class DrivewayLightsAccessory implements AccessoryPlugin {

  private readonly log: Logging;
  private switchOn = false;
  private name: string;

  private readonly switchService: Service;
  private readonly informationService: Service;
  private readonly gate: DrivewayController;

  constructor(hap: HAP, log: Logging, name: string) {

    this.log = log;
    this.name = name;
    this.gate = new DrivewayController(log);

    this.switchService = new hap.Service.Lightbulb(name);

    // Implement charastics
    this.switchService.getCharacteristic(hap.Characteristic.On)

      .on(CharacteristicEventTypes.GET, (callback: CharacteristicGetCallback) => {

        log.info(name + ' ' + (this.switchOn? 'ON': 'OFF'));
        callback(undefined, this.switchOn);
      })
      .on(CharacteristicEventTypes.SET, (value: CharacteristicValue, callback: CharacteristicSetCallback) => {

        try {

          this.switchOn = value as boolean;
          log.info(name + ': ' + (this.switchOn ? 'ON' : 'OFF'));

        } catch (error) {

          log.info('Driveway Exception: ' + error);
        }

        callback();
      });

    // Set accessory information
    this.informationService = new hap.Service.AccessoryInformation()
      .setCharacteristic(hap.Characteristic.Manufacturer, 'One Touch 2022')
      .setCharacteristic(hap.Characteristic.SerialNumber, '45cd9bba-8785-11ec-a3c5-9f1c143a0b96')
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