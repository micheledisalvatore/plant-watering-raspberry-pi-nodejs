# Plant watering system based on Raspberry Pi Zero and NodeJS


## Hardware requirements

- Raspberry Pi Zero W
- MicroSD Card of 8GB or bigger


## Setup requirements

1. Download [Raspberry Pi OS Lite](https://www.raspberrypi.org/software/operating-systems/)
2. Download [balenaEtcher](https://www.balena.io/etcher/)
3. Run balenaEtcher to install Raspberry Pi OS Lite on the MicorSD Card
4. Add the [wpa_supplicant.conf](https://github.com/micheledisalvatore/plant-watering-raspberry-pi-nodejs/blob/master/wpa_supplicant.conf?raw=true) file to the MicroSD with your wifi (2.4GHz) configuration
5. add the [ssh](https://github.com/micheledisalvatore/plant-watering-raspberry-pi-nodejs/blob/master/ssh?raw=true) file to the MicroSD in order to connect to the Raspberry via ssh (the file is empty, it doesn't need any content)


## Software requirements

### NodeJS 16

Copy the latest `...-linux-armv6l.tar.gz` version from the [Unofficial NodeJS Builds](https://unofficial-builds.nodejs.org/download/release/)

Then run the following commands:

```bash
wget -O downloaded-nodejs.tar.gz https://unofficial-builds.nodejs.org/download/release/v16.6.2/node-v16.6.2-linux-armv6l.tar.gz
tar -xzf downloaded-nodejs.tar.gz
cd downloaded-nodejs
sudo cp -R * /usr/local
```


## Raspberry Zero W Pins Schema

![Raspberry Zero W Pins Schema](https://github.com/micheledisalvatore/plant-watering-raspberry-pi-nodejs/blob/master/raspberrypi-zero-pins-schema.png?raw=true)

