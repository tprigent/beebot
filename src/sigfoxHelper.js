const axios = require('axios');
const { publishAlert } = require('./discordHelper');
const { sigfoxParams } = require('./config');

const seqNumberMap = new Map();

function buildRequestPath(deviceID) {
  const messageRoute = `${sigfoxParams.apiEndpoint}devices/${deviceID}/messages`;
  return `https://${sigfoxParams.apiLogin}:${sigfoxParams.apiPassword}@${messageRoute}`;
}

async function getLastMessage(deviceID) {
  const requestURL = buildRequestPath(deviceID);
  let output = null;
  await axios.get(requestURL)
    .then((response) => {
      output = response.data.data[0];
    })
    .catch((error) => console.log(error));
  return output;
}

async function checkNewMessage(deviceID) {
  const lastMessages = await getLastMessage(deviceID);
  const storedSeqNumber = seqNumberMap.get(deviceID);
  const lastSeqNumber = lastMessages.seqNumber;
  seqNumberMap.set(deviceID, lastSeqNumber);
  return lastSeqNumber > storedSeqNumber;
}

async function checkNewMessages() {
  const devicesWithUpdate = [];
  for (let i = 0; i < sigfoxParams.devices.length; i++) {
    if (await checkNewMessage(sigfoxParams.devices[i].id)) {
      devicesWithUpdate.push(sigfoxParams.devices[i].id);
    }
  }
  return devicesWithUpdate;
}

function generateAlerts(client, devicesWithUpdate) {
  if (devicesWithUpdate) {
    for (let i = 0; i < devicesWithUpdate.length; i++) {
      publishAlert(client, devicesWithUpdate[i]);
    }
  }
}

async function unitMonitor(client) {
  const devicesWithUpdate = await checkNewMessages();
  generateAlerts(client, devicesWithUpdate);
}

module.exports = {
  unitMonitor,
};
