import { API, HAP, StaticPlatformPlugin, Logging, AccessoryPlugin, PlatformConfig, Service, Characteristic } from 'homebridge';

// import { SEAGatePlatformControlAccessory } from './platformAccessory';
// import { SEAGatePlatformLightAccessory } from './platformLightsAccessory';
// import { SEAGatePlatform1wireLightAccessory } from './platform1WireLightsAccessory';
import { GateLightAccessory } from './GateLightAccessory';
import { DrivewayLightsAccessory } from './DrivewayLightsAccessory';
import { AUXLightAccessory } from './AUXLightsAccessory';
import { GateOpenerAccessory, GatePedestrianAccessory, GateHoldAccessory} from './GateOpenerAccessory';

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
      new GateHoldAccessory(this.hap, this.log, 'Gate Hold'),
      new GatePedestrianAccessory(this.hap, this.log, 'Pedestrian Hold'),
    ]);
  }
}
