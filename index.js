const Gpio = require('onoff').Gpio;
const schedule = require('node-schedule');

const pumpRelay = new Gpio(23, 'out');
const humiditySensor = new Gpio(17, 'in');

const RECURRENCE_RULE = new schedule.RecurrenceRule();
RECURRENCE_RULE.hour = 11;

const WATERING_DURATION = 20000

const checkIsWet = () => {
  const isWet = humiditySensor.readSync() === 0
  console.log('The soil is', isWet ? 'wet' : 'dry')

  return isWet
}

const checkIsWatering = () => {
  const isWatering =  pumpRelay.readSync() === 1
  console.log('The water pump is', isWatering ? 'active' : 'inactive')

  return isWatering
}

const startWatering = () => {
  console.log('Turning pump on')
  pumpRelay.writeSync(1)
}

const stopWatering = async () => {
  console.log('Turning pump off')
  pumpRelay.writeSync(0);
}

const sleep = async (time = 1000) => {
  console.log('Executing time', time)

  return await new Promise(resolve => setTimeout(resolve, time));
}

const waterThePlant = async () => {
  console.group('Water the plant')
  
  try {
    const isWet = checkIsWet()
    const isWatering = checkIsWatering()
    
    if (!isWet && !isWatering) {
      startWatering()
     
      await sleep(WATERING_DURATION)
      
      stopWatering()
    }
  } catch (e) {
    console.error(e)
  }
  
  console.groupEnd()
}

const init = () => {
  schedule.scheduleJob(RECURRENCE_RULE, async () => {
    await waterThePlant()
  });
};

process.stdin.resume();//so the program will not close instantly

function exitHandler(options) {
  stopWatering()
  if (options.exit) {
    process.exit();
  }
}

process.on('exit', exitHandler.bind(null,{cleanup:true}));
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

init();
