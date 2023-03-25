var rpio = require('rpio');

module.exports = (api) => {
		api.registerAccessory('Relay', LightbulbAccessory);
	};
	
	class LightbulbAccessory {
	
		constructor(log, config, api) {
				this.log = log;
				this.config = config;
				this.api = api;
	
				this.Service = this.api.hap.Service;
				this.Characteristic = this.api.hap.Characteristic;
	
				// extract name from config
				this.name = config.name;
	
				// create a new Lightbulb service
				this.service = new this.Service(this.Service.Lightbulb);
	
				// create handlers for required characteristics
				this.service.getCharacteristic(this.Characteristic.On)
					.on('get', this.handleOnGet.bind(this))
					.on('set', this.handleOnSet.bind(this));
				
				// your accessory must have an AccessoryInformation service
				this.informationService = new this.api.hap.Service.AccessoryInformation()
						.setCharacteristic(this.api.hap.Characteristic.Manufacturer, "Custom")
						.setCharacteristic(this.api.hap.Characteristic.Model, "Treehouse Relay")
						.setCharacteristic(this.api.hap.Characteristic.SerialNumber, "1.0");
		}
	
		getServices() {
				return [
					this.informationService,
					this.switchService,
				];
		}

		/**
		 * Handle requests to get the current value of the "On" characteristic
		 */
		handleOnGet(callback) {
				console.log("Reading Light State");
				var state = rpio.read(11);
				var status = state == 0 ? true : false;
				callback(null, status);
		}
	
		/**
		 * Handle requests to set the "On" characteristic
		 */
		handleOnSet(state, callback) {
				console.log("Setting Light State");
				rpio.write(11, Number(state));
				callback(null);
		}
	
	}