# Plant watering system based on Raspberry Pi Zero and NodeJS


## Hardware requirements

- [Raspberry Pi Zero W](https://amzn.to/3yKlO7T)
- [MicroSD Card of 8GB or bigger](https://amzn.to/3xIDgsb)
- [Jumper wires: female-female, male-male, female-male](https://amzn.to/3m2ssTM)
- [Soil Moisture Sensor (this is a pack of 5, for this project you need just one)](https://amzn.to/3jQzQ1z)
- [5V relay 2 Channel](https://amzn.to/3CFJuNj)
- [Submersible water pump](https://amzn.to/3lXt1y1)
- [8mm Internal diameter Flexible PVC TUBING](https://amzn.to/3jT6cJ9)
- [USB male plug to 5-pin screw terminal](https://amzn.to/3jRGcxQ)
- [MicroUSB cable](https://www.amazon.co.uk/gp/search/ref=as_li_qf_sp_sr_il_tl?ie=UTF8&tag=micheledisa0d-21&keywords=micro%20usb%20cable&index=aps&camp=1634&creative=6738&linkCode=xm2&linkId=5eced105863dd061e585ed0b4120f13e) (if you don't have one)
- [A standard USB plug](https://www.amazon.co.uk/gp/search/ref=as_li_qf_sp_sr_il_tl?ie=UTF8&tag=micheledisa0d-21&keywords=USB%20plug&index=aps&camp=1634&creative=6738&linkCode=xm2&linkId=834a7dc8ad4e7522c07ff7061bab9e37) (if you don't have one)


## Connect all the hardware parts

### Raspberry Zero W Pins Schema

![Raspberry Zero W Pins Schema](https://github.com/micheledisalvatore/plant-watering-raspberry-pi-nodejs/blob/master/raspberrypi-zero-pins-schema.png?raw=true)

### Connect the humidity sensor to the Raspberry

| Sensor | Raspberry        |
|--------|------------------|
| VCC    | Pin 1 (3v3)      |
| GND    | Pin 9 (GND)      |
| D0     | Pin 11 (GPIO 17) |

[More details here](https://thepihut.com/blogs/raspberry-pi-tutorials/raspberry-pi-plant-pot-moisture-sensor-with-email-notification-tutorial)

### Connect the relay to the Raspberry

| Relay  | Raspberry        |
|--------|------------------|
| VCC    | Pin 2 (5V)       |
| GND    | Pin 14 (GND)     |
| 1      | Pin 16 (GPIO 23) |
| 2      | Pin 18 (GPIO 24) |

### Connect the water pump to the relay

Cut the USB terminal, strip the 2 small wires: a black wire and a red wire. Then connet the Water Pump to the Relay and the USB male plag

| | | |
|-|-|-|
|**Black** Pump Wire | ↔ | **Negative (-)** port of USB male plug|
|**Positive (+)** port of USB male plug | ↔ | **COM** port of relay Channel 1\
|**Red** Pump Wire | ↔ | **NO** port of relay Channel 1|

## Setup your Raspberry Pi Zero

1. Download [Raspberry Pi OS Lite](https://www.raspberrypi.org/software/operating-systems/)
2. Download [balenaEtcher](https://www.balena.io/etcher/)
3. Run *balenaEtcher* to install *Raspberry Pi OS Lite* on the MicorSD Card
4. Add the [wpa_supplicant.conf](https://github.com/micheledisalvatore/plant-watering-raspberry-pi-nodejs/blob/master/wpa_supplicant.conf?raw=true) file to the MicroSD with your wifi (2.4GHz) configuration
5. Add the [ssh](https://github.com/micheledisalvatore/plant-watering-raspberry-pi-nodejs/blob/master/ssh?raw=true) file to the MicroSD in order to connect to the Raspberry via ssh (the file is empty, it doesn't need any content)
6. Insert the MicroSD card into the Raspberry Pi
7. Connect the Micro USB cable to the power and to the Raspberry Pi


## The Raspberry OS CLI

Get the IP address of the Raspberry Pi, I found it checking the connected devices to the wifi router.

Connect via ssh using the Raspberry Pi IP address, mine was `192.168.1.155` and use `raspberry` as password:
```bash
ssh pi@192.168.1.155
```

Once connected, you can follow the steps below

### Install Git

From the command line

```bash
sudo apt update
sudo apt install git
```

### Install NodeJS

Select the latest version from [Unofficial NodeJS Builds](https://unofficial-builds.nodejs.org/download/release/) and copy the link of the `...-linux-armv6l.tar.gz` file

Then run the following commands:

```bash
wget -O downloaded-nodejs.tar.gz PASTE_HERE_THE_LINK_YOU_GOT
tar -xzf downloaded-nodejs.tar.gz
cd downloaded-nodejs
sudo cp -R * /usr/local
```

### Clone this project

Run this command in cli `git clone https://github.com/micheledisalvatore/plant-watering-raspberry-pi-nodejs.git`

### Install the project dependencies

Enter into the project directory `cd plant-watering-raspberry-pi-nodejs` and install the dependencies `npm install`

### Edit the running time

Edit the `index.js` file and set the time you prefer for when you want to run the script, the current configuration starts the script every day at 11.00 and it runs for 20 seconds (20000 ms). For more infor on how to set up you recurrence, check the [documentation of the node-schedule package](https://www.npmjs.com/package/node-schedule#user-content-recurrence-rule-scheduling)

### Run the script when the Raspberry Pi restarts (optional)

In order to automatically start this script any time the Raspberry Pi starts, follow the following steps:
https://github.com/micheledisalvatore/plant-watering-raspberry-pi-nodejs/blob/master/water_the_plants.service

1. copy the service configuration script `sudo cp water_the_plants.service /lib/systemd/system/water_the_plants.service`
2. restart the daemon `sudo systemctl daemon-reload`
3. start the service `sudo systemctl start water_the_plants`
4. enable the auto start `sudo systemctl enable water_the_plants`


## Credits
- [Watering Plants with a Raspberry Pi](https://medium.com/going-fullstack/watering-plants-with-a-raspberry-pi-36eac51b8d23)
- [Arduino - Control Pump](https://arduinogetstarted.com/tutorials/arduino-controls-pump)

