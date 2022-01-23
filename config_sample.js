//SigFox config
let sigfoxAPI = 'api.sigfox.com/v2/';
let deviceID = "001DAE67";      // format XXXXXXXX, unique id of your SigFox module
let messageRoute = sigfoxAPI + 'devices/'+ deviceID + '/messages';

let APIlogin = "";
let APIpassword = "";

const url = 'https://' + APIlogin + ':' + APIpassword + '@' + messageRoute;

//Discord config
let botToken = '';
let channelName = 'alertes'; // channel where notifications will be send
let debugChannelName = 'alertes-debug'; // in order not to pollute the main channel

//Bot config
let frequency = 5; // update frequency (in seconds)
let debug = true;

module.exports.url = url;
module.exports.botToken = botToken;
module.exports.channelName = channelName;
module.exports.debugChannelName = debugChannelName;
module.exports.frequency = frequency;
module.exports.debug = debug;