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

async function checkNewMessages() {
  const lastMessages = [];

  // iterate over all devices by ID according to config
  for (let i = 0; i < sigfoxParams.devices.length; i++) {

    // get last message for each device
    const deviceID = sigfoxParams.devices[i].id;
    const lastMessage = await getLastMessage(deviceID);

    // check if new message
    const storedSeqNumber = seqNumberMap.get(deviceID);
    const lastSeqNumber = lastMessage.seqNumber;
    seqNumberMap.set(deviceID, lastSeqNumber);

    // if so, save the message
    if (lastSeqNumber > storedSeqNumber) {
      lastMessages.push(lastMessage);
    }

  }
  return lastMessages;
}

module.exports = {
  checkNewMessages,
};
