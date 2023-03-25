Latest homebridge install with UI

# Install node.js, npm and wiring pi
```
sudo apt install nodejs npm 
sudo npm install -g --unsafe-perm homebridge homebridge-config-ui-x
sudo hb-service install --user homebridge
sudo apt-get install wiringpi
```

# Install GPIO plugin
```
sudo npm install -g homebridge-gpio-device --unsafe-perm
```

# See here to use gpio-device plugin
https://www.npmjs.com/package/homebridge-gpio-device

# Add config to web interface at
http://rpi-treehouse.local:8581

# Add this accessory to the homebridge.config. Note pin 17 is BCM pinout. Actually physical pin 11
```
{
    "accessory": "GPIODevice",
    "name": "Treehouse Light",
    "type": "Lightbulb",
    "pin": 17
}
```