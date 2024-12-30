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
Restart the UI and the plugin should be available in the UI. Restart the Child bridge to pick up changes in code


## Create an AP Bridge

To create an access point on WiFi bridged to Ethernet on Raspberry Pi OS, follow these steps:

**Update and upgrade your system:**
```
sudo apt update
sudo apt upgrade -y
```

**Install necessary packages:**
```
sudo apt install -y hostapd bridge-utils
```

**Stop the `hostapd` service until configured:**
```
sudo systemctl stop hostapd
```

**Create a bridge interface:**
Edit the `dhcpcd.conf` file:
```
sudo nano /etc/dhcpcd.conf
```
Add the following lines at the end:
```
denyinterfaces wlan0
denyinterfaces eth0
```

**Configure the network interfaces:**
Edit the `network interfaces` file:
```
sudo nano /etc/network/interfaces
```
Add the following lines:
```
auto br0
iface br0 inet dhcp
bridge_ports eth0 wlan0
```

**Configure the access point host software (hostapd):**
Create a new configuration file:
```
sudo nano /etc/hostapd/hostapd.conf
```
Add the following lines:
```
interface=wlan0
bridge=br0
driver=nl80211
ssid=YourNetworkName
hw_mode=g
channel=7
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_passphrase=YourPassword
wpa_key_mgmt=WPA-PSK
rsn_pairwise=CCMP
```

**Point to the `hostapd` configuration file:**
Edit the `hostapd` default file:
```
sudo nano /etc/default/hostapd
```
Uncomment and set the configuration file path:
```
DAEMON_CONF="/etc/hostapd/hostapd.conf"
```

**Enable IP forwarding:**
Edit the `sysctl.conf` file:
```
sudo nano /etc/sysctl.conf
```
Uncomment the following line:
```
net.ipv4.ip_forward=1
```

**Add a masquerade for outbound traffic on eth0:**
```
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"
```

**Configure the `rc.local` file to load the rules on boot:**
Edit the `rc.local` file:
```
sudo nano /etc/rc.local
```
Add the following line just above `exit 0`:
```
iptables-restore < /etc/iptables.ipv4.nat
```

**Start and enable the services:**
```
sudo systemctl start hostapd
sudo systemctl enable hostapd
```

**Reboot the Raspberry Pi:**
```
sudo reboot
```

After rebooting, your Raspberry Pi should be configured as a WiFi access point bridged to the Ethernet port, allowing devices connected to the WiFi network to access the network through the Ethernet connection.