const Gpio = require('onoff').Gpio;
const schedule = require('node-schedule');

const pumpRelay = new Gpio(23, 'high');
const humiditySensor = new Gpio(17, 'in');

const checkIsWet = async () => {
  const humidityStatus = await new Promise((resolve, reject) => {
    humiditySensor.read(async (error, status) => {
      if (error) {
        return reject(new Error(`There was an error getting the humidity sensor status: ${error}`));
      }

      return resolve(status);
    });
  })

  return humidityStatus === 0
}

const checkIsWatering = async () => {
  const relayStatus = await  new Promise((resolve, reject) => {
    pumpRelay.read((error, status) => {
      if (error) {
        return reject(new Error(`There was an error getting the pump relay status: ${error}`));
      }

      return resolve(status)
    });
  });

  return relayStatus === 0
}

const startWatering = async () => {
  const isWatering = await checkIsWatering()
  if (!isWatering) {
    pumpRelay.writeSync(0)
  }
}

const stopWatering = async () => {
  const isWatering = await checkIsWatering()
  if (isWatering) {
    pumpRelay.writeSync(1);
  }
}

const sleep = async (time = 1000) => await new Promise(resolve => setTimeout(resolve, time));

const waterThePlant = async () => {
  const isWet = await checkIsWet()
  const isWatering = await checkIsWatering()
  console.log('isWet', isWet)
  console.log('isWatering', isWatering)
  if (!isWet && !isWatering) {
    console.log('starting watering')
    await startWatering()
    console.log('watering')
    await sleep(1500)
    await stopWatering()
    console.log('stopped watering')
  }
}

const init = () => {
  schedule.scheduleJob('0 7 * * *', async () => {
    await waterThePlant()
  });
};
 
// init();
setInterval(() => waterThePlant(), 3000)
