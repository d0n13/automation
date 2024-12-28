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

Run dev in a shell before einstalling the plugin code

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

Add or remove the plugin to homebridge. The plugin should now be available in the homebridge UI

```
hb-service add homebridge-sea-entrance-gate
hb-service remove homebridge-sea-entrance-gate
```
