# General Info
Small garage door to side of main garage. Runs on `rpi-grgsmall.local`

# Clone repo
```bash
git clone git@bitbucket.org:donie/raspberrypi-automation.git
```

# Install prerequisites for homebridge
```bash
sudo apt-get install nodejs
sudo apt-get install libavahi-compat-libdnssd-dev
sudo apt-get install npm
```

# Install Homebridge
```bash
sudo npm install -g --unsafe-perm
```

# Enable auto start of homebridge
```bash
sudo cp -R raspberrypi-automation/unix/init.d/homebridge /etc/init.d
sudo systemctl enable homebridge
```

# Run Homebridge (to test)
```bash
homebridge (will not work until you install the modules below but will create the config.json in ~/.homebridge)
```

# Install rpio module
```bash
sudo npm -g install rpio
```

# Install garage door module
```bash
sudo npm install -g  ~/raspberrypi-automation/accessories/SmallGarage/smallgarage_accessory.js
```

# Edit config.json as required. (Sample below)
```json
{
	"bridge": {
		"name": "HomebridgeGarage",
		"username": "CC:22:3D:E3:CE:35",
		"port": 51826,
		"pin": "001-33-001"
	},

	"description": "Small Garage door opener",

	"accessories": [
	{
		"accessory": "SmallGarage",
    "name": "Small Garage"
	}]
}
```

# Run Homebridge (Should load the small garage accessory)
```bash
homebridge
```

# Add accessory to iPhone app
You will need to reboot the phone for the new homebridge to appear usually
