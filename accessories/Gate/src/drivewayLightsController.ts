import {Logging} from 'homebridge';


export class DrivewayController {

  private readonly log: Logging;

  /**
   * Constructor
   * @param log homekit logging service
   */
  constructor(log: Logging) {
    this.log = log;

    this.log('driveway lights controller initialised');
  }
}