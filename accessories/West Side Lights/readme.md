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
http://rpi-sidelights.local:8581

Add this accessory to the homebridge.config. Note pin 17 is BCM pinout. Actually physical pin 11
```
{
	"accessory": "GPIODevice",
	"name": "West Side Lights",
	"type": "Lightbulb",
	"pin": 17
} 
```
# SD Card
Create a copy of an SD card backup with homekit installed. Image has hostname set to rpi-jacuzzi.local

https://jaimyn.com.au/the-fastest-way-to-clone-sd-card-macos/

## Get list of disks
```
diskutil list # user r in front of disk numbers to use raw (faster)
```

## Make backup
```
sudo gdd if=/dev/rdisk4 of=raspberry_homebridge_SD.dmg status=progress bs=16M
```
## New card image
Image new SD card by putting into reader and unmounting before writing to it
```
sudo diskutil unmountDisk /dev/disk4
sudo gdd of=/dev/rdisk4 if=raspberry_homebridge_SD.dmg status=progress bs=16M
```