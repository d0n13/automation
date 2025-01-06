## Install homebridge

Add the Homebridge Repository GPG key:

```
curl -sSfL https://repo.homebridge.io/KEY.gpg | sudo gpg --dearmor | sudo tee /usr/share/keyrings/homebridge.gpg  > /dev/null
```

Add the Homebridge Repository to the system sources:

```
echo "deb [signed-by=/usr/share/keyrings/homebridge.gpg] https://repo.homebridge.io stable main" | sudo tee /etc/apt/sources.list.d/homebridge.list > /dev/null
```

Step 2: Install Homebridge

```
sudo apt-get update -y
sudo apt-get install homebridge -y
sudo apt install git -y 
```

## Homebridge dev

Run dev in a shell before installing the plugin code

```
sudo hb-shell
```

Go to the homebridge home folder and install the repo
```
cd
git clone https://github.com/d0n13/automation.git 
cd automation/accessories/Gate
```

Modify the folder permissions so that you can edit the files in vscode

```
chmod -R ugo+rwx *
```

### Install the dev dependencies

Install the dependencies and build the plugin
```
npm install
npm run build
```

Link the dev folder to the homebride node_modules. The plugin should now be available in the homebridge UI

```
sudo ln -s /home/homebridge/automation/accessories/Gate /var/lib/homebridge/node_modules/homebridge-sea-entrance-gate
```
Restart the UI and the plugin should be available in the UI

Make changes and run the build to update the plugin. Restart the Child bridge to pick up changes in code
```
npm run build
```

