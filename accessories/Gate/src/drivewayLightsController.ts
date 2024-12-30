import {Logging} from 'homebridge';


export class DrivewayController {

  private readonly log: Logging;

  /**
   * Constructor
   * @param log homekit logging service
   */
  constructor(log: Logging) {
    this.log = log;

    this.log.info('Driveway 1-wire lights controller initialised');
  }

  drivewayLights(on: boolean): void {

    this.log.info('Driveway lights: N/A (' + (on ? 'ON' : 'OFF') + ')');
  }
}