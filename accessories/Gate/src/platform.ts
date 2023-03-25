import { API, HAP, StaticPlatformPlugin, Logging, AccessoryPlugin, PlatformConfig, Service, Characteristic } from 'homebridge';

import { PLATFORM_NAME, PLUGIN_NAME } from './settings';
// import { SEAGatePlatformControlAccessory } from './platformAccessory';
// import { SEAGatePlatformLightAccessory } from './platformLightsAccessory';
// import { SEAGatePlatform1wireLightAccessory } from './platform1WireLightsAccessory';
import { GateLightAccessory } from './GateLightAccessory';
import { DrivewayLightsAccessory } from './DrivewayLightsAccessory';
import { AUXLightAccessory } from './AUXLightsAccessory';
import { GateOpenerAccessory } from './GateOpenerAccessory';

/**
 * HomebridgePlatform
 * This class is the main constructor for your plugin, this is where you should
 * parse the user config and discover/register accessories with Homebridge.
 */
export class SEAGateHomebridgePlatform implements StaticPlatformPlugin {

  private readonly log: Logging;
  private readonly hap: HAP;

  // public readonly Service: typeof Service = hap.Service;
  // public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;


  // this is used to track restored cached accessories
  // public readonly accessories: PlatformAccessory[] = [];

  constructor(log: Logging, config: PlatformConfig, api: API) {
    this.log = log;
    this.hap = api.hap;

    log.info('SEA Gate System and lights initialised');
  }

  /*
   * This method is called to retrieve all accessories exposed by the platform.
   * The Platform can delay the response my invoking the callback at a later time,
   * it will delay the bridge startup though, so keep it to a minimum.
   * The set of exposed accessories CANNOT change over the lifetime of the plugin!
   */
  accessories(callback: (foundAccessories: AccessoryPlugin[]) => void): void {
    callback([

      new GateLightAccessory(this.hap, this.log, 'Gate Lights'),
      new DrivewayLightsAccessory(this.hap, this.log, 'Driveway Lights'),
      new AUXLightAccessory(this.hap, this.log, 'Auxiliary Lights'),
      new GateOpenerAccessory(this.hap, this.log, 'Gate'),
    ]);
  }

  // /**
  //  * This function is invoked when homebridge restores cached accessories from disk at startup.
  //  * It should be used to setup event handlers for characteristics and update respective values.
  //  */
  // configureAccessory(accessory: PlatformAccessory) {
  //   this.log.info('Loading accessory from cache:', accessory.displayName);

  //   // add the restored accessory to the accessories cache so we can track if it has already been registered
  //   this.accessories.push(accessory);


  /**
   * This is an example method showing how to register discovered accessories.
   * Accessories must only be registered once, previously created accessories
   * must not be registered again to prevent "duplicate UUID" errors.
   */
  // discoverDevices() {

  //   // A real plugin you would discover accessories from the local network, cloud services
  //   // or a user-defined array in the platform config.
  //   const gateDevices = [
  //     {
  //       uuid: '9a5d64ce-839a-11ec-bfb0-67f1568199ba',
  //       displayName: 'Gate Control',
  //       accessoryType: SEAGatePlatformControlAccessory,
  //     },
  //     {
  //       uuid: 'f2dff84c-8399-11ec-9d18-fbe15571bc4b',
  //       displayName: 'Gate Post Lights',
  //       accessoryType: SEAGatePlatformLightAccessory,
  //     },
  //     {
  //       uuid: 'EF00f7a696-839a-11ec-b525-f30c852b21f6GH',
  //       displayName: 'External Lights',
  //       accessoryType: SEAGatePlatformLightAccessory,
  //     },
  //     {
  //       uuid: '9f62280a-839b-11ec-86f5-33f8659fd8ee',
  //       displayName: 'DriveWay Lights',
  //       accessoryType: SEAGatePlatform1wireLightAccessory,
  //     },
  //   ];

  //   // loop over the discovered devices and register each one if it has not already been registered
  //   for (const device of gateDevices) {

  //     // generate a unique id for the accessory this should be generated from
  //     // something globally unique, but constant, for example, the device serial
  //     // number or MAC address
  //     const uuid = this.api.hap.uuid.generate(device.uuid);

  //     // see if an accessory with the same uuid has already been registered and restored from
  //     // the cached devices we stored in the `configureAccessory` method above
  //     const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

  //     if (existingAccessory) {
  //       // the accessory already exists
  //       this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);

  //       // if you need to update the accessory.context then you should run `api.updatePlatformAccessories`. eg.:
  //       // existingAccessory.context.device = device;
  //       // this.api.updatePlatformAccessories([existingAccessory]);

  //       // create the accessory handler for the restored accessory
  //       // this is imported from `platformAccessory.ts`
  //       // new device.accessoryType(this, existingAccessory);
  //       new SEAGatePlatformLightAccessory(this, existingAccessory);

  //       // it is possible to remove platform accessories at any time using `api.unregisterPlatformAccessories`, eg.:
  //       // remove platform accessories when no longer present
  //       // this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [existingAccessory]);
  //       // this.log.info('Removing existing accessory from cache:', existingAccessory.displayName);
  //     } else {
  //       // the accessory does not yet exist, so we need to create it
  //       this.log.info('Adding new accessory:', device.displayName);

  //       // create a new accessory
  //       const accessory = new this.api.platformAccessory(device.displayName, uuid);

  //       // store a copy of the device object in the `accessory.context`
  //       // the `context` property can be used to store any data about the accessory you may need
  //       accessory.context.device = device;

  //       // create the accessory handler for the newly create accessory
  //       // this is imported from `platformAccessory.ts`
  //       // new device.accessoryType(this, accessory);
  //       new SEAGatePlatformLightAccessory(this, accessory);

  //       // link the accessory to your platform
  //       this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
  //     }
  //   }
  // }
}
