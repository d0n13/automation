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

export class AUXLightAccessory implements AccessoryPlugin {

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

          this.gate.auxiliaryLights(this.switchOn ? false : true);
          this.switchOn = value as boolean;
          log.info(name + ': ' + (this.switchOn ? 'ON' : 'OFF'));

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