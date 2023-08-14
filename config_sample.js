// SigFox config
const sigfoxAPI = 'api.sigfox.com/v2/';
const deviceID = '001DAE67'; // format XXXXXXXX, unique id of your SigFox module
const messageRoute = `${sigfoxAPI}devices/${deviceID}/messages`;

const APIlogin = '';
const APIpassword = '';

const url = `https://${APIlogin}:${APIpassword}@${messageRoute}`;

// Discord config
const botToken = '';
const channelName = 'alertes'; // channel where notifications will be send
const debugChannelName = 'alertes-debug'; // in order not to pollute the main channel

// Bot config
const frequency = 5; // update frequency (in seconds)
const debug = true;

module.exports.url = url;
module.exports.botToken = botToken;
module.exports.channelName = channelName;
module.exports.debugChannelName = debugChannelName;
module.exports.frequency = frequency;
module.exports.debug = debug;
